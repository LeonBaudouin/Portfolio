import { Drawable } from "./Drawable";
import { Style, Size } from "../../Utils/CustomTypes";

class Background implements Drawable {

    public style: Style;
    public size: Size;

    public constructor(style : Style, size : Size)
    {
        this.style = style;
        this.size = size;
    }

    Draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.style;
        ctx.fillRect(0, 0, this.size.width, this.size.height);
    }
    
    Update(): void {}

}