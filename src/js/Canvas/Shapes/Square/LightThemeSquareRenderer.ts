import { RendererInterface } from "../../Core/Abstract/RendererInterface";
import LightThemeSquareState from "./LightThemeSquareState";
import { Canvas } from "../../Canvas";

export class LightThemeSquareRenderer implements RendererInterface {

    public Render({fillColor, size, position: {x, y}, image, imageOpacity}: LightThemeSquareState, ctx: CanvasRenderingContext2D): void {
        const {width: canvasWitdth, height: canvasHeight} = Canvas.getSize();
        ctx.fillStyle = fillColor.toString();
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
        if (image) {
            const { width: imageWidth, height: imageHeight } = image
            const width = canvasHeight * imageWidth / imageHeight;
            ctx.save();
            ctx.beginPath();
            ctx.rect(x - size / 2, y - size / 2, size, size);   
            ctx.clip();
            ctx.globalAlpha = imageOpacity;
            ctx.drawImage(image, (canvasWitdth - width) / 2 - size, (canvasHeight - canvasHeight) / 2);
            ctx.globalAlpha = 1; 
            ctx.restore();
        }
    }

}