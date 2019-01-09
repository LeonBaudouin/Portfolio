import { Drawable, Interactive } from "./Drawable";
import { Point, Style, tiltedSquareSettings, Palette, rotationRoutine } from "../Utils/CustomTypes";
import { MathFunc } from "../Utils/UtilsFunctions";

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

  public Draw(ctx: CanvasRenderingContext2D) {

    ctx.strokeStyle = this.style;
    ctx.lineWidth = this.strokeSize;
    
    ctx.strokeRect(- this.size / 2, - this.size / 2, this.size, this.size);
  }
}




export class InteractiveTiltedSquare extends TiltedSquare implements Interactive {

  offsetAngle: number;
  cursorAngle: number;
  squareAngle: number;
  sensitivity: number;

  constructor(squareSettings: tiltedSquareSettings, defaultAngle: number, sensitivity: number) {
    super(squareSettings);

    this.offsetAngle = defaultAngle;
    this.squareAngle = defaultAngle;
    this.cursorAngle = defaultAngle;
    this.sensitivity = sensitivity;
  }

  public UpdateFromCursor(e: MouseEvent) : void {
    let angle = MathFunc.getAngle(this.position, { x: e.clientX, y: e.clientY });
    this.UpdateAngle(angle);
  }

  public UpdateFromOrientation(e : DeviceOrientationEvent) : void {
    this.UpdateAngle(e.alpha * Math.PI / 180);
  }



  public UpdateAngle(newAngle: number) {

    let previousAngle = this.cursorAngle;
    let delta = newAngle - previousAngle  + this.offsetAngle;

    while(Math.abs(delta) > Math.PI/4) {
      if(delta > 0) {
        this.offsetAngle -= Math.PI/2;
      } else {
        this.offsetAngle += Math.PI/2;
      }
      delta = newAngle - previousAngle  + this.offsetAngle;
    }

    this.cursorAngle += delta;
  }

  public Draw(ctx: CanvasRenderingContext2D) {
    this.squareAngle += (this.cursorAngle - this.squareAngle) * this.sensitivity;

    ctx.save();

    ctx.strokeStyle = this.style;
    ctx.lineWidth = this.strokeSize;

    ctx.translate(
      this.processedPosition.x,
      this.processedPosition.y
    );
    ctx.rotate(this.squareAngle);
    
    ctx.strokeRect(- this.size / 2, - this.size / 2, this.size, this.size);

    ctx.restore();
  }
  
}





export class RotatingTiltedSquare extends TiltedSquare implements Drawable{

  rotationRoutines: rotationRoutine[] = [];

  constructor(squareSettings: tiltedSquareSettings, rotationRoutines: rotationRoutine[]) {

    super(squareSettings);

    rotationRoutines.forEach(routine => {
      this.rotationRoutines.push(Object.assign({}, routine));
    });
  }

  public Draw(ctx: CanvasRenderingContext2D) {
    
    ctx.save();

    ctx.strokeStyle = this.style;
    ctx.lineWidth = this.strokeSize;

    // the rotate() method cause the canvas matrix to rotate
    // ATTENTION : this affect the draw location until restore()
    if (this.rotationRoutines.length > 0) {
      this.Rotate(ctx);
    }

    ctx.strokeRect(- this.size / 2, - this.size / 2, this.size, this.size);

    ctx.restore();
  }

  private Rotate(ctx: CanvasRenderingContext2D) {
    this.PrimaryRotation(ctx);
    if (this.rotationRoutines.length == 2) {
      this.SecondaryRotation();
    }
  }

  private SecondaryRotation() {
    this.processedPosition.x =
      this.position.x +
      this.rotationRoutines[1].distance * Math.cos(this.rotationRoutines[1].angle);

    this.processedPosition.y =
      this.position.y +
      this.rotationRoutines[1].distance * Math.sin(this.rotationRoutines[1].angle);

    this.rotationRoutines[1].angle += this.rotationRoutines[1].speed;
  }

  private PrimaryRotation(ctx: CanvasRenderingContext2D) {
    ctx.translate(
      this.processedPosition.x,
      this.processedPosition.y
    );
    ctx.rotate(this.rotationRoutines[0].angle);
    this.rotationRoutines[0].angle += this.rotationRoutines[0].speed;
  }

}