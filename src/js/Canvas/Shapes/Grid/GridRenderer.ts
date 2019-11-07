import { RendererInterface } from "../../Core/Abstract/RendererInterface";
import { GridState } from "./GridState";
import { Canvas } from "../../Canvas";

export class GridRenderer implements RendererInterface {
    
    public Render(gridState: GridState, ctx: CanvasRenderingContext2D) {
        const { size, style } = gridState;
        const canvasSize = Canvas.getSize();

        for (let x = 0; x <= canvasSize.width; x += size) {
            ctx.strokeStyle = style;
            ctx.beginPath();
            ctx.moveTo(x + (canvasSize.width % size) / 2, 0);
            ctx.lineTo(x + (canvasSize.width % size) / 2, canvasSize.height);
            ctx.stroke();
        }

        for (let y = 0; y < canvasSize.height; y += size) {
            ctx.strokeStyle = style;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvasSize.width, y);
            ctx.stroke();
        }
    }
}