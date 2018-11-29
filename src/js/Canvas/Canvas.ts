import { Size, Palette, Style, tiltedSquareSettings } from "../CustomTypes";
import { DrawnElement } from "./Drawable";
import { MathFunc } from "../Utils";

class Canvas {
  private element: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public size: Size;

  private backgroundStyle: Style = Palette.BackgroundDark;

  private drawnElement: DrawnElement.Drawable[] = [];
  private mousemoveElement: DrawnElement.MouseSensible[] = [];

  constructor(uniqueSelector: string) {
    this.element = document.querySelector(uniqueSelector);
    this.context = this.element.getContext("2d");

    this.onResize();

    window.addEventListener("resize", () => {
      this.onResize();
    });

    window.addEventListener("mousemove", e => {
      this.mousemoveElement.forEach(element => {
        if (element) {
          element.UpdateFromCursor(e);
        }
      });
    });
  }

  public Update(): void {
    this.DrawBG();
    this.drawnElement.forEach(element => {
      element.Draw(this.context);
    });
    this.DrawGradient();

    requestAnimationFrame(() => this.Update());
  }

  private onResize(): void {

    this.drawnElement = [];
    this.mousemoveElement = [];

    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;

    this.size = { width: this.element.width, height: this.element.height };

    this.SetupSquare();
    this.drawnElement.push(new DrawnElement.Grid(this.size, Palette.GridDark));
  }

  private DrawBG(): void {
    this.context.fillStyle = this.backgroundStyle;
    this.context.fillRect(0, 0, this.size.width, this.size.height);
  }

  private DrawGradient(): void {
    let gradient: CanvasGradient = this.context.createRadialGradient(
      this.size.width / 2,
      this.size.height / 2,
      this.size.width / 2,
      this.size.width / 2,
      this.size.height / 2,
      0
    );

    gradient.addColorStop(0.0, "rgba(0, 0, 0, 0.250)");
    gradient.addColorStop(1.0, "rgba(0, 0, 0, 0.000)");

    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.size.width, this.size.height);
  }




  private SetupSquare() {
    let settings: tiltedSquareSettings = {
      position: { x: this.size.width / 2, y: this.size.height / 2 },
      size: this.size.height - 200,
      strokeSize: 25,
    };

    let FTS = new DrawnElement.FollowingTiltedSquare(settings, Math.PI/4, 0.05);

    this.drawnElement.push(FTS);
    this.mousemoveElement.push(FTS);

    settings.strokeSize = 3;

    for (let i = 0; i < 4; i++) {
      settings.size = this.size.height - 300 - 100 * i;
      let obj = new DrawnElement.FollowingTiltedSquare(settings, Math.PI/4, 0.045 - 0.005 * i);
      this.drawnElement.push(obj);
      this.mousemoveElement.push(obj);
    }


    // settings = {
    //   position: { x: this.size.width / 2, y: this.size.height / 2 },
    //   size: 600,
    //   strokeSize: 25
    // };

    // let routines = [
    //   {
    //     distance: 0,
    //     angle: Math.PI / 4,
    //     speed: 0.001
    //   }
    // ]

    // this.drawnElement.push(new DrawnElement.RotatingTiltedSquare(settings, routines));

    // settings = {
    //   position: { x: this.size.width / 2, y: this.size.height / 2 },
    //   size: 150,
    //   strokeSize: 3
    // };

    // routines = [
    //   {
    //     distance: 0,
    //     angle: (10 * Math.PI) / 180,
    //     speed: 0.005
    //   },
    //   {
    //     distance: 425,
    //     angle: 0,
    //     speed: 0.001
    //   }
    // ]

    // this.drawnElement.push(new DrawnElement.RotatingTiltedSquare(settings, routines));
    // routines[1].angle = Math.PI / 2;
    // this.drawnElement.push(new DrawnElement.RotatingTiltedSquare(settings, routines));
    // routines[1].angle = (2 * Math.PI) / 2;
    // this.drawnElement.push(new DrawnElement.RotatingTiltedSquare(settings, routines));
    // routines[1].angle = (3 * Math.PI) / 2;
    // this.drawnElement.push(new DrawnElement.RotatingTiltedSquare(settings, routines));
  }
}

export default Canvas;
