import { Drawable } from "../Drawable";
import { Point, Style, TiltedSquareSettings, Palette } from "../../../Utils/CustomTypes";
import { TiltedSquareAnimation } from "./TiltedSquareAnimation";

export class TiltedSquare implements Drawable {
  
  style: Style;
  size: number;
  speed: number;
  strokeSize: number;

  defaultAngle: number;
  currentAngle: number;
  focusAngle: number;

  defaultPosition: Point;    
  currentPosition: Point;           // The real square center after the whole process
  focusPosition: Point;

  animations: TiltedSquareAnimation[] = [];


  constructor(squareSettings: TiltedSquareSettings) {

    this.defaultPosition = {...squareSettings.defaultPosition};
    this.currentPosition = {...squareSettings.defaultPosition};
    this.focusPosition = {...squareSettings.defaultPosition};

    this.defaultAngle = squareSettings.defaultAngle;
    this.currentAngle = squareSettings.defaultAngle;
    this.focusAngle = squareSettings.defaultAngle;

    this.style = Palette.SquareDark;
    this.size = squareSettings.size;
    this.speed = squareSettings.speed;
    this.strokeSize = squareSettings.strokeSize;
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

  public Draw(ctx: CanvasRenderingContext2D) {

    ctx.save();
  
    ctx.translate(
      this.currentPosition.x,
      this.currentPosition.y
    );
    ctx.rotate(this.currentAngle);
    
    ctx.strokeStyle = this.style;
    ctx.lineWidth = this.strokeSize;
    
    ctx.strokeRect(- this.size / 2, - this.size / 2, this.size, this.size);

    ctx.restore();
  }

  
  public Update() {
    this.animations.forEach(animation => {
      animation.Update();
    })

    this.currentAngle += (this.focusAngle - this.currentAngle) * this.speed;
    this.currentPosition.x += (this.focusPosition.x - this.currentPosition.x) * this.speed;
    this.currentPosition.y += (this.focusPosition.y - this.currentPosition.y) * this.speed;
  }
}