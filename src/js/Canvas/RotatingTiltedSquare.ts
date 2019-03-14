import { Drawable } from "./Drawable";
import { tiltedSquareSettings, rotationRoutine } from "../Utils/CustomTypes";
import { TiltedSquare } from "./TiltedSquares";

export class RotatingTiltedSquare extends TiltedSquare {

    rotationRoutines: rotationRoutine[] = [];
  
    constructor(squareSettings: tiltedSquareSettings, rotationRoutines: rotationRoutine[]) {
  
      super(squareSettings);
  
      rotationRoutines.forEach(routine => {
        this.rotationRoutines.push(Object.assign({}, routine));
      });
    }

    public Update() {
      this.rotationRoutines[0].angle += this.rotationRoutines[0].speed;
    }
  
    public Draw(ctx: CanvasRenderingContext2D) {
      
      ctx.save();
    
      // the rotate() method cause the canvas matrix to rotate
      // ATTENTION : this affect the draw location until restore()
      if (this.rotationRoutines.length > 0) {
        this.Rotate(ctx);
      }
  
      super.Draw(ctx);

      ctx.restore();
    }
  
    private Rotate(ctx: CanvasRenderingContext2D) {
      this.PrimaryRotation(ctx);
      if (this.rotationRoutines.length == 2) {
        this.SecondaryRotation();
      }
    }
  
    private SecondaryRotation() {
      this.currentPosition.x =
        this.defaultPosition.x +
        this.rotationRoutines[1].distance * Math.cos(this.rotationRoutines[1].angle);
  
      this.currentPosition.y =
        this.defaultPosition.y +
        this.rotationRoutines[1].distance * Math.sin(this.rotationRoutines[1].angle);
  
      this.rotationRoutines[1].angle += this.rotationRoutines[1].speed;
    }
  
    private PrimaryRotation(ctx: CanvasRenderingContext2D) {
      ctx.translate(
        this.currentPosition.x,
        this.currentPosition.y
      );
      ctx.rotate(this.rotationRoutines[0].angle);
    }
  
  }