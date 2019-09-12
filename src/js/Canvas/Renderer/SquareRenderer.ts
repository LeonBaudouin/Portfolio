import { RendererInterface } from "./RendererInterface";
import { SquareState } from "../State/SquareState";

export class SquareRenderer implements RendererInterface {

    Render(state: SquareState, ctx: CanvasRenderingContext2D): void {

        const { position, angle, style, strokeSize, size } = state;

        ctx.save();
  
        ctx.translate(
          position.x,
          position.y
        );
        ctx.rotate(angle);
        
        ctx.strokeStyle = style;
        ctx.lineWidth = strokeSize;
        
        ctx.strokeRect(- size / 2, - size / 2, size, size);
    
        ctx.restore();
    }

}