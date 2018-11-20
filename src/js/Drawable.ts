import { Style, Size, Palette, Point, tiltedSquareSettings } from "./CustomTypes";
import { MathFunc } from "./Utils";

export namespace DrawnElement {

    export interface Drawable {
        Draw(ctx: CanvasRenderingContext2D): void;
        style: Style;
        size: number;
    }

    export class TiltedSquare implements Drawable {

        position: Point;
        style: Style;
        size: number;
        strokeSize: number;
        angle: number;
        speed: number;

        constructor(squareSettings: tiltedSquareSettings) {
            this.position = squareSettings.position;
            this.style = Palette.SquareDark;
            this.size = squareSettings.size;
            this.strokeSize = squareSettings.strokeSize;
            this.angle = squareSettings.angle;
            this.speed = squareSettings.speed;
        }

        public Draw(ctx: CanvasRenderingContext2D) {
            this.angle += this.speed;
            ctx.save();

            // Rotate the canvas matrix
            // ATTENTION : this affect the draw location until restore()
            this.Rotate(ctx);
            ctx.strokeStyle = this.style;
            ctx.lineWidth = this.strokeSize;
            ctx.strokeRect(-this.size/2, -this.size/2, this.size, this.size);
            ctx.restore();
        }



        private Rotate(ctx: CanvasRenderingContext2D) {
            ctx.translate(this.position.x, this.position.y);
            ctx.rotate(this.angle);
        }

    }


    export class StraightSquare implements Drawable {

        style: Style;
        size: number;

        constructor(size: number) {
            this.style = Palette.SquareLight;
            this.size = size;
        }

        public Draw(ctx: CanvasRenderingContext2D) {
        }
    }


    export class Grid implements Drawable {

        style: Style;
        size: number;
        remainingSpace: number;
        canvasSize: Size;

        constructor(canvasSize: Size, style: Style) {
            this.style = style;
            this.canvasSize = canvasSize;
            this.size = Math.floor(MathFunc.easeInOutSine(this.canvasSize.width, 40, 24, 1920));
            this.remainingSpace = this.canvasSize.width % this.size;
        }

        public Draw(ctx: CanvasRenderingContext2D) {
            for (let i = 0; i <= this.canvasSize.width; i += this.size) {
                this.DrawVerticalLine(i + this.remainingSpace/2, ctx);
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
