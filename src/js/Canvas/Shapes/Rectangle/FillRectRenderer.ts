import { FillRectState } from "./FIllRectState";
import { RendererInterface } from "../../Core/Abstract/RendererInterface";

export class FillRectRenderer implements RendererInterface {

    Render(state: FillRectState, ctx: CanvasRenderingContext2D): void {

        const { style } = state;

        ctx.fillStyle = style;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

}