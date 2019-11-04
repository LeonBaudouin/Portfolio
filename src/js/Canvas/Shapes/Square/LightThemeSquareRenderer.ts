import { RendererInterface } from "../../Core/Abstract/RendererInterface";
import LightThemeSquareState from "./LightThemeSquareState";

export class LightThemeSquareRenderer implements RendererInterface {

    public Render({fillColor, size, position: {x, y}}: LightThemeSquareState, ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = fillColor.toString();
        ctx.fillRect(x - size / 2, y - size / 2, size, size);    
    }
}