import {
  Style,
  Size,
  Palette,
  Point,
  tiltedSquareSettings,
  rotationRoutine
} from "./CustomTypes";
import { MathFunc } from "./Utils";

export namespace DrawnElement {
  export interface Drawable {
    Draw(ctx: CanvasRenderingContext2D): void;
    UpdateFromCursor(e: MouseEvent, ctx?: CanvasRenderingContext2D): void;
    style: Style;
    size: number;
    mouseSensible: boolean;
  }

  export class TiltedSquare implements Drawable {
    
    mouseSensible: boolean;

    position: Point;                    // Center of the whole animation

    style: Style;
    size: number;
    strokeSize: number;

    rotationRoutine: rotationRoutine[] = [];

    processedPosition: Point;           // The real square center after the whole process


    constructor(squareSettings: tiltedSquareSettings) {
      this.position = Object.assign({}, squareSettings.position);
      this.processedPosition = Object.assign({}, squareSettings.position);

      this.style = Palette.SquareDark;
      this.size = squareSettings.size;
      this.strokeSize = squareSettings.strokeSize;

      this.mouseSensible = squareSettings.mouseSensible ? squareSettings.mouseSensible : false; 
      
      if(squareSettings.routines) {
        squareSettings.routines.forEach(routine => {
              this.rotationRoutine.push(Object.assign({}, routine));
         });
      }
    }

    public Draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      
      ctx.strokeStyle = this.style;
      ctx.lineWidth = this.strokeSize;

      // the rotate() method cause the canvas matrix to rotate
      // ATTENTION : this affect the draw location until restore()
      if(this.rotationRoutine.length > 0) {
        this.Rotate(ctx);
      }

      ctx.restore();
    }



    public UpdateFromCursor(e: MouseEvent, ctx: CanvasRenderingContext2D) {
        let angle = MathFunc.getAngle(this.position, {x: e.clientX, y: e.clientY});
        ctx.translate(
          this.processedPosition.x,
          this.processedPosition.y
        );
        ctx.rotate(angle);
    }



    private Rotate(ctx: CanvasRenderingContext2D) {
      this.PrimaryRotation(ctx);
      if(this.rotationRoutine.length == 2) {
        this.SecondaryRotation();
      }

      ctx.strokeRect(- this.size/2, - this.size/2, this.size, this.size);
    }

    private SecondaryRotation() {
      this.processedPosition.x =
        this.position.x +
        this.rotationRoutine[1].distance * Math.cos(this.rotationRoutine[1].angle);

      this.processedPosition.y =
        this.position.y +
        this.rotationRoutine[1].distance * Math.sin(this.rotationRoutine[1].angle);

      this.rotationRoutine[1].angle += this.rotationRoutine[1].speed;
    }

    private PrimaryRotation(ctx: CanvasRenderingContext2D) {
      ctx.translate(
        this.processedPosition.x,
        this.processedPosition.y
      );
      ctx.rotate(this.rotationRoutine[0].angle);
      this.rotationRoutine[0].angle += this.rotationRoutine[0].speed;
    }
  }

  export class StraightSquare implements Drawable {
    style: Style;
    size: number;
    mouseSensible: boolean;

    constructor(size: number) {
      this.style = Palette.SquareLight;
      this.size = size;
    }

    public Draw(ctx: CanvasRenderingContext2D) {}
    public UpdateFromCursor(e: MouseEvent, ctx: CanvasRenderingContext2D) {}
  }

  export class Grid implements Drawable {
    
    style: Style;
    size: number;

    mouseSensible: boolean = false;

    remainingSpace: number;
    canvasSize: Size;

    constructor(canvasSize: Size, style: Style) {
      this.style = style;
      this.canvasSize = canvasSize;
      this.size = Math.floor(
        MathFunc.easeInOutSine(this.canvasSize.width, 40, 24, 1920)
      );
      this.remainingSpace = this.canvasSize.width % this.size;
    }

    public Draw(ctx: CanvasRenderingContext2D) {
      for (let i = 0; i <= this.canvasSize.width; i += this.size) {
        this.DrawVerticalLine(i + this.remainingSpace / 2, ctx);
      }
      for (let j = 0; j < this.canvasSize.height; j += this.size) {
        this.DrawHorizontalLine(j, ctx);
      }
    }

    private DrawVerticalLine(x: number, ctx: CanvasRenderingContext2D) {
      ctx.strokeStyle = this.style;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.canvasSize.height);
      ctx.stroke();
    }

    private DrawHorizontalLine(y: number, ctx: CanvasRenderingContext2D) {
      ctx.strokeStyle = this.style;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.canvasSize.width, y);
      ctx.stroke();
    }

    public UpdateFromCursor(e: MouseEvent, ctx: CanvasRenderingContext2D) {}
  }
}
