import { Style, Size } from "./CustomTypes";
import { MathFunc } from "./Utils";
import Canvas from "./Canvas";

export namespace DrawnElement {

    interface Drawable {
        Draw(ctx: CanvasRenderingContext2D): void;
        style: Style;
        size: number;
    }



    export class TiltedSquare implements Drawable {

        style: Style;
        size: number;

        constructor(size: number) {
            this.style = "#464646";
            this.size = size;
        }

        public Draw(ctx: CanvasRenderingContext2D) {
        }
    }


    export class StraightSquare implements Drawable {

        style: Style;
        size: number;

        constructor(size: number) {
            this.style = "#b5b5b5";
            this.size = size;
        }

        public Draw(ctx: CanvasRenderingContext2D) {
        }
    }


    export class Grid implements Drawable {

        style: Style;
        size: number;
        canvasSize: Size;

        constructor(canvasSize: Size) {
            this.style = "#333131"
            this.canvasSize = canvasSize;
            this.size = MathFunc.easeInOutSine(this.canvasSize.width, 40, 24, 1920);
        }

        public Draw(ctx: CanvasRenderingContext2D) {
            for (let i = 0; i < this.canvasSize.width; i += this.size) {
                this.DrawVerticalLine(i, ctx);
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
    }
}
