import { Drawable } from "../Drawable";
import { Style, Palette, Point, Size } from "../../../Utils/CustomTypes";

export class StraightSquare implements Drawable {
    style: Style;
    size: number;
    position: Point = {x: 0, y: 0};
    offset: number;
    canvasSize: Size;

    constructor(size: number, canvasSize: Size, anchorPoint: Point, cellPosition: Point) {
      this.style = Palette.SquareLight;
      this.size = size;
      this.canvasSize = canvasSize;
      
      this.offset = (canvasSize.width % this.size) / 2;

      this.SetPosition(anchorPoint, cellPosition);
    }

    private SetPosition(anchorPoint: Point, cellPosition: Point) {
        if(anchorPoint.x < 0) {

            this.position.x = cellPosition.x * this.size + this.offset;
            
        } else {

            this.position.x = this.canvasSize.width - this.offset - (cellPosition.x + 1) * this.size;

        }

        if(anchorPoint.y < 0) {

            this.position.y = cellPosition.y * this.size;
            
        } else {

            for (this.position.y; this.position.y < this.canvasSize.height; this.position.y += this.size) {}
            this.position.y -= (cellPosition.y + 1) * this.size;

        }
    }

    public Update() {};

    public Draw(ctx: CanvasRenderingContext2D) {
        // ctx.fillStyle = "red";
        // ctx.beginPath();
        // ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI);
        // ctx.fill();

        
        ctx.fillStyle = this.style;
        ctx.beginPath();
        ctx.rect(this.position.x, this.position.y, this.size, this.size);
        ctx.fill();
    }
}