import { Size, Palette, Style, tiltedSquareSettings } from "../Utils/CustomTypes";
import { Drawable, Interactive } from "./Drawable";
import { MathFunc } from "../Utils/UtilsFunctions";
import { Grid } from "./Grid";
import { StraightSquare } from "./StraightSquares";
import { InteractiveTiltedSquare } from "./InteractiveTiltedSquare";
import { HoverTiltedSquare } from "./HoverTiltedSquare";

class Canvas {
  private element: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public size: Size;

  private backgroundStyle: Style;

  private drawnElement: Drawable[] = [];
  private interactiveElement: Interactive[] = [];
  private isLight: boolean;

  constructor(uniqueSelector: string, isLight: boolean = false) {
    
    this.element = document.querySelector(uniqueSelector);
    this.context = this.element.getContext("2d");
    this.isLight = isLight;
    this.backgroundStyle = this.isLight ? Palette.BackgroundLight : Palette.BackgroundDark;

    this.onResize();


    window.addEventListener("resize", () => {
      this.onResize();
    });


    window.addEventListener("mousemove", (e : MouseEvent) => {
      this.interactiveElement.forEach(element => {
        if (element) {
          element.UpdateFromCursor(e);
        }
      });
    });


    window.addEventListener("deviceorientation", (e : DeviceOrientationEvent) => {
      this.interactiveElement.forEach(element => {
        if (element) {
          element.UpdateFromOrientation(e);
        }
      });
    });

  }

  public Update(): void {

    this.DrawBG();

    this.drawnElement.forEach(element => {
      element.Update();
      element.Draw(this.context);
    });

    this.DrawGradient();

    requestAnimationFrame(() => this.Update());
  }

  private onResize(): void {

    this.drawnElement = [];
    this.interactiveElement = [];

    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;

    this.size = { width: this.element.width, height: this.element.height };

    this.SetupElements();
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

    if(this.isLight) {
      gradient.addColorStop(0.0, "rgba(0, 0, 0, 0.1)");
    } else {
      gradient.addColorStop(0.0, "rgba(0, 0, 0, 0.250)");
    }
    gradient.addColorStop(1.0, "rgba(0, 0, 0, 0.000)");

    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.size.width, this.size.height);
  }

  private SetupElements() {

    let gridSize = Math.floor(
      MathFunc.easeInOutSine(this.size.width, 40, 24, 1920)
    );

    if(this.isLight) {
      
      this.SetupStraightSquares(gridSize);
      this.SetupGrid(gridSize, Palette.GridLight);
      
    } else {

      this.SetupTiltedSquares();
      this.SetupGrid(gridSize, Palette.GridDark);

    }
  }

  private SetupGrid(gridSize: number, style: Style) {
    this.drawnElement.push(new Grid(gridSize, this.size, style));
  }

  private SetupStraightSquares(gridSize: number) {
    //  Top Left
    this.drawnElement.push(new StraightSquare(gridSize, this.size, {x: -1, y: -1}, {x: 1, y: 0}));
    this.drawnElement.push(new StraightSquare(gridSize, this.size, {x: -1, y: -1}, {x: 0, y: 2}));
    
    //  Top Right
    this.drawnElement.push(new StraightSquare(gridSize, this.size, {x: 1, y: -1}, {x: 0, y: 0}));
    this.drawnElement.push(new StraightSquare(gridSize, this.size, {x: 1, y: -1}, {x: 3, y: 0}));
    this.drawnElement.push(new StraightSquare(gridSize, this.size, {x: 1, y: -1}, {x: 2, y: 1}));
    this.drawnElement.push(new StraightSquare(gridSize, this.size, {x: 1, y: -1}, {x: 2, y: 2}));
    this.drawnElement.push(new StraightSquare(gridSize, this.size, {x: 1, y: -1}, {x: 1, y: 3}));
    this.drawnElement.push(new StraightSquare(gridSize, this.size, {x: 1, y: -1}, {x: 2, y: 3}));
    this.drawnElement.push(new StraightSquare(gridSize, this.size, {x: 1, y: -1}, {x: 0, y: 5}));
    this.drawnElement.push(new StraightSquare(gridSize, this.size, {x: 1, y: -1}, {x: 4, y: 1}));
    this.drawnElement.push(new StraightSquare(gridSize, this.size, {x: 1, y: -1}, {x: 5, y: 1}));
    this.drawnElement.push(new StraightSquare(gridSize, this.size, {x: 1, y: -1}, {x: 0, y: 2}));

    // Bottom Right
    this.drawnElement.push(new StraightSquare(gridSize, this.size, {x: 1, y: 1}, {x: 0, y: 0}));
    this.drawnElement.push(new StraightSquare(gridSize, this.size, {x: 1, y: 1}, {x: 0, y: 1}));
    this.drawnElement.push(new StraightSquare(gridSize, this.size, {x: 1, y: 1}, {x: 1, y: 2}));
    
    //  Bottom Left
    this.drawnElement.push(new StraightSquare(gridSize, this.size, {x: -1, y: 1}, {x: 0, y: 1}));
    this.drawnElement.push(new StraightSquare(gridSize, this.size, {x: -1, y: 1}, {x: 0, y: 4}));
    this.drawnElement.push(new StraightSquare(gridSize, this.size, {x: -1, y: 1}, {x: 2, y: 5}));
    this.drawnElement.push(new StraightSquare(gridSize, this.size, {x: -1, y: 1}, {x: 1, y: 2}));
  }

  private SetupTiltedSquares() : void {

    const hoveredHTMLElements = <HTMLElement[]>[...document.querySelectorAll(".js-hovered-element")];
    
    let settings: tiltedSquareSettings = {

      position: {
        x: this.size.width / 2,
        y: this.size.height / 2
      },

      size: this.size.height - 200,
      
      strokeSize: 25,
      
    };

    const FTS = new HoverTiltedSquare(settings, Math.PI/4, 0.05, hoveredHTMLElements, 0.5);

    this.drawnElement.push(FTS);
    this.interactiveElement.push(FTS);

    settings.strokeSize = 3;

    for (let i = 0; i < 3; i++) {
      settings.size = this.size.height - 300 - 100 * i;
      let obj = new HoverTiltedSquare(settings, Math.PI/4, 0.045 - 0.005 * i, hoveredHTMLElements, 0.5);
      this.drawnElement.push(obj);
      this.interactiveElement.push(obj);
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

    // this.drawnElement.push(new RotatingTiltedSquare(settings, routines));

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

    // this.drawnElement.push(new RotatingTiltedSquare(settings, routines));
    // routines[1].angle = Math.PI / 2;
    // this.drawnElement.push(new RotatingTiltedSquare(settings, routines));
    // routines[1].angle = (2 * Math.PI) / 2;
    // this.drawnElement.push(new RotatingTiltedSquare(settings, routines));
    // routines[1].angle = (3 * Math.PI) / 2;
    // this.drawnElement.push(new RotatingTiltedSquare(settings, routines));
  }
}

export default Canvas;
