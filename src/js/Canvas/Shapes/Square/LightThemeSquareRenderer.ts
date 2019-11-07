import { RendererInterface } from "../../Core/Abstract/RendererInterface";
import LightThemeSquareState from "./LightThemeSquareState";

export class LightThemeSquareRenderer implements RendererInterface {

    public Render({fillColor, size, position: {x, y}, image, imageOpacity}: LightThemeSquareState, ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = fillColor.toString();
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
        if (image) {
            console.log(image);
            ctx.beginPath();
            ctx.rect(x - size / 2, y - size / 2, size, size);   
            ctx.clip();
            ctx.globalAlpha = imageOpacity;
            ctx.drawImage(image, - image.width / 2, - image.height / 2);
            ctx.globalAlpha = 1; 
        }
    }

}