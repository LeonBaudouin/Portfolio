import { Drawable } from "./Drawable";
import { Point, Style, tiltedSquareSettings, Palette } from "../Utils/CustomTypes";

export class TiltedSquare implements Drawable {

  position: Point;                    // Center of the whole animation

  style: Style;
  size: number;
  strokeSize: number;

  processedPosition: Point;           // The real square center after the whole process

  constructor(squareSettings: tiltedSquareSettings) {
    this.position = Object.assign({}, squareSettings.position);
    this.processedPosition = Object.assign({}, squareSettings.position);

    this.style = Palette.SquareDark;
    this.size = squareSettings.size;
    this.strokeSize = squareSettings.strokeSize;
  }

  public Update() {};

  public Draw(ctx: CanvasRenderingContext2D) {

    ctx.strokeStyle = this.style;
    ctx.lineWidth = this.strokeSize;
    
    ctx.strokeRect(- this.size / 2, - this.size / 2, this.size, this.size);
  }
}