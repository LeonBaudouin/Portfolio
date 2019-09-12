import { RendererInterface } from "./RendererInterface";
import { FillRectState } from "../State/FIllRectState";

export class FillRectRenderer implements RendererInterface {

    Render(state: FillRectState, ctx: CanvasRenderingContext2D): void {

        const { style } = state;

        ctx.fillStyle = style;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

}