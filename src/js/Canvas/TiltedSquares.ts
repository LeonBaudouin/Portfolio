import { Drawable } from "./Drawable";
import { Point, Style, tiltedSquareSettings, Palette } from "../Utils/CustomTypes";

export class TiltedSquare implements Drawable {
                // Center of the whole animation

  style: Style;
  size: number;
  strokeSize: number;

  defaultAngle: number;
  currentAngle: number;
  focusAngle: number;

  defaultPosition: Point;    
  currentPosition: Point;           // The real square center after the whole process
  focusPosition: Point;


  constructor(squareSettings: tiltedSquareSettings) {
    this.defaultPosition = Object.assign({}, squareSettings.position);
    this.currentPosition = Object.assign({}, squareSettings.position);

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

  public SetFocusAngle(newAngle: number) {
  
    let previousAngle = this.focusAngle;
    let delta = newAngle - previousAngle  + this.defaultAngle;

    while(Math.abs(delta) > Math.PI/4) {
      if(delta > 0) {
        this.defaultAngle -= Math.PI/2;
      } else {
        this.defaultAngle += Math.PI/2;
      }
      delta = newAngle - previousAngle  + this.defaultAngle;
    }

    this.focusAngle += delta;
  }
}