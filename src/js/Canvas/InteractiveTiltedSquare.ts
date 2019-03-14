import { TiltedSquare } from "./TiltedSquares";
import { Interactive } from "./Drawable";
import { tiltedSquareSettings, Point } from "../Utils/CustomTypes";
import { MathFunc } from "../Utils/UtilsFunctions";

export class InteractiveTiltedSquare extends TiltedSquare implements Interactive {

    speed: number;
  
    constructor(squareSettings: tiltedSquareSettings, defaultAngle: number, speed: number) {
      super(squareSettings);
  
      this.defaultAngle = defaultAngle;
      this.currentAngle = defaultAngle;
      this.focusAngle = defaultAngle;
      this.speed = speed;
    }
  
    public UpdateFromCursor(e: MouseEvent) : void {
      let angle = MathFunc.getAngle(this.defaultPosition, { x: e.clientX, y: e.clientY });
      this.SetFocusAngle(angle);
    }
  
    public UpdateFromOrientation(e : DeviceOrientationEvent) : void {
      this.SetFocusAngle(e.alpha * Math.PI / 180);
    }

    public Update() {
      super.Update();
      this.currentAngle += (this.focusAngle - this.currentAngle) * this.speed;
    }

    public Draw(ctx: CanvasRenderingContext2D) {
  
      ctx.save();
    
      ctx.translate(
        this.currentPosition.x,
        this.currentPosition.y
      );
      ctx.rotate(this.currentAngle);
      
      super.Draw(ctx);
  
      ctx.restore();
    }
    
  }