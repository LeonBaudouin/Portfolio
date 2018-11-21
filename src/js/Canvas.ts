import { Size, Palette, Style, tiltedSquareSettings } from "./CustomTypes";
import { DrawnElement } from "./Drawable";
import { MathFunc } from "./Utils";

class Canvas {
  private element: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public size: Size;

  private backgroundStyle: Style = Palette.BackgroundDark;

  private drawnElement: DrawnElement.Drawable[];

  constructor(uniqueSelector: string) {
    this.element = document.querySelector(uniqueSelector);
    this.context = this.element.getContext("2d");

    this.onResize();

    window.addEventListener("resize", () => {
      this.onResize();
    });

    window.addEventListener("mousemove", e => {
      this.drawnElement.forEach(element => {
        if (element.mouseSensible) {
          element.UpdateFromCursor(e, this.context);
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
    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;

    this.size = { width: this.element.width, height: this.element.height };

    this.drawnElement = [];
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
      size: 600,
      strokeSize: 25,
      mouseSensible: true
    };

    this.drawnElement.push(new DrawnElement.TiltedSquare(settings));

    // let settings: tiltedSquareSettings = {
    //   position: { x: this.size.width / 2, y: this.size.height / 2 },
    //   size: 600,
    //   strokeSize: 25,
    //   routines: [
    //     {
    //       distance: 0,
    //       angle: Math.PI / 4,
    //       speed: 0.001
    //     }
    //   ]
    // };

    // this.drawnElement.push(new DrawnElement.TiltedSquare(settings));

    // settings = {
    //   position: { x: this.size.width / 2, y: this.size.height / 2 },
    //   size: 150,
    //   strokeSize: 3,
    //   routines: [
    //     {
    //       distance: 0,
    //       angle: (10 * Math.PI) / 180,
    //       speed: 0.005
    //     },
    //     {
    //       distance: 425,
    //       angle: 0,
    //       speed: 0.001
    //     }
    //   ]
    // };

    // this.drawnElement.push(new DrawnElement.TiltedSquare(settings));
    // settings.routines[1].angle = Math.PI / 2;
    // this.drawnElement.push(new DrawnElement.TiltedSquare(settings));
    // settings.routines[1].angle = (2 * Math.PI) / 2;
    // this.drawnElement.push(new DrawnElement.TiltedSquare(settings));
    // settings.routines[1].angle = (3 * Math.PI) / 2;
    // this.drawnElement.push(new DrawnElement.TiltedSquare(settings));
  }
}

export default Canvas;
