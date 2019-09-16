import { RendererInterface } from "./RendererInterface";
import { SquareState } from "../State/SquareState";

export class SquareRenderer implements RendererInterface {

    public Render(state: SquareState, ctx: CanvasRenderingContext2D): void {

        const { position, angle, style, strokeSize, size, image } = state;

        ctx.save();
  
        ctx.translate(
          position.x,
          position.y
        );
        ctx.rotate(angle);

        if (image != null) {
            this.RenderImage(state, ctx);
        }
        
        ctx.strokeStyle = style;
        ctx.lineWidth = strokeSize;
        
        ctx.strokeRect(- size / 2, - size / 2, size, size);
    
        ctx.restore();
    }
    
    private RenderImage(state: SquareState, ctx: CanvasRenderingContext2D): void {

        const { angle, strokeSize, size, image, imageOpacity } = state;

        ctx.beginPath();
        const clipSize = size + strokeSize;
        ctx.rect(- clipSize / 2, - clipSize / 2, clipSize, clipSize);
        ctx.clip();

        ctx.rotate(- angle);
        ctx.globalAlpha = imageOpacity;

        ctx.drawImage(image, - image.width / 2, - image.height / 2);
        ctx.globalAlpha = 1;
        ctx.rotate(angle);
    }

}