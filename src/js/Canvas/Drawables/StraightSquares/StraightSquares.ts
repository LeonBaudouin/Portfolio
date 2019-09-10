import { Drawable } from "../Drawable";
import { Style, Palette, Point, Size } from "../../../Utils/CustomTypes";

export class StraightSquare implements Drawable {
    style: Style;
    size: Size;
    position: Point = {x: 0, y: 0};
    offset: number;
    canvasSize: Size;

    constructor(size: Size, canvasSize: Size, anchorPoint: Point, cellPosition: Point) {
      this.style = Palette.SquareLight;
      this.size = size;
      this.canvasSize = canvasSize;
      
      this.offset = (canvasSize.width % this.size.width) / 2;

      this.SetPosition(anchorPoint, cellPosition);
    }

    private SetPosition(anchorPoint: Point, cellPosition: Point) {
        if(anchorPoint.x < 0) {
            this.position.x = cellPosition.x * this.size.width + this.offset;
        } else {
            this.position.x = this.canvasSize.width - this.offset - (cellPosition.x + 1) * this.size.width;
        }

        if(anchorPoint.y < 0) {
            this.position.y = cellPosition.y * this.size.height;
        } else {
            for (this.position.y; this.position.y < this.canvasSize.height; this.position.y += this.size.height) {}
            this.position.y -= (cellPosition.y + 1) * this.size.height;
        }
    }

    public Update() {};

    public Draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.style;
        ctx.beginPath();
        ctx.rect(this.position.x, this.position.y, this.size.width, this.size.height);
        ctx.fill();
    }
}