import { Drawable } from "./Drawable";
import { Style, Size } from "../../Utils/CustomTypes";

export class Grid implements Drawable {

    style: Style;
    size: Size;

    mouseSensible: boolean = false;

    remainingSpace: number;
    canvasSize: Size;

    constructor(size: Size, canvasSize: Size, style: Style) {
      this.style = style;
      this.canvasSize = canvasSize;
      this.size = size;
      this.remainingSpace = this.canvasSize.width % this.size.width;
    }

    public Update() {};

    public Draw(ctx: CanvasRenderingContext2D) {
      for (let i = 0; i <= this.canvasSize.width; i += this.size.width) {
        this.DrawVerticalLine(i + this.remainingSpace / 2, ctx);
      }
      for (let j = 0; j < this.canvasSize.height; j += this.size.height) {
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
  }
