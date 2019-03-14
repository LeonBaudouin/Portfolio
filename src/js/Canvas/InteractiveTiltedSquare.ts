import { TiltedSquare } from "./TiltedSquares";
import { Interactive } from "./Drawable";
import { tiltedSquareSettings } from "../Utils/CustomTypes";
import { MathFunc } from "../Utils/UtilsFunctions";

export class InteractiveTiltedSquare extends TiltedSquare implements Interactive {

    offsetAngle: number;
    focusAngle: number;
    squareAngle: number;
    speed: number;
  
    constructor(squareSettings: tiltedSquareSettings, defaultAngle: number, speed: number) {
      super(squareSettings);
  
      this.offsetAngle = defaultAngle;
      this.squareAngle = defaultAngle;
      this.focusAngle = defaultAngle;
      this.speed = speed;
    }
  
    public UpdateFromCursor(e: MouseEvent) : void {
      let angle = MathFunc.getAngle(this.position, { x: e.clientX, y: e.clientY });
      this.UpdateAngle(angle);
    }
  
    public UpdateFromOrientation(e : DeviceOrientationEvent) : void {
      this.UpdateAngle(e.alpha * Math.PI / 180);
    }
  
    public UpdateAngle(newAngle: number) {
  
      let previousAngle = this.focusAngle;
      let delta = newAngle - previousAngle  + this.offsetAngle;
  
      while(Math.abs(delta) > Math.PI/4) {
        if(delta > 0) {
          this.offsetAngle -= Math.PI/2;
        } else {
          this.offsetAngle += Math.PI/2;
        }
        delta = newAngle - previousAngle  + this.offsetAngle;
      }
  
      this.focusAngle += delta;
    }

    public Update() {
      super.Update();
      this.squareAngle += (this.focusAngle - this.squareAngle) * this.speed;
    }

    public Draw(ctx: CanvasRenderingContext2D) {
  
      ctx.save();
    
      ctx.translate(
        this.processedPosition.x,
        this.processedPosition.y
      );
      ctx.rotate(this.squareAngle);
      
      super.Draw(ctx);
  
      ctx.restore();
    }
    
  }