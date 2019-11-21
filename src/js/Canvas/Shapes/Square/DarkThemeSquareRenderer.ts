import { DarkThemeSquareState } from "./DarkThemeSquareState";
import { RendererInterface } from "../../Core/Abstract/RendererInterface";
import { Canvas } from "../../Canvas";

export class DarkThemeSquareRenderer implements RendererInterface {

    public Render(state: DarkThemeSquareState, ctx: CanvasRenderingContext2D): void {

        const { position, angle, strokeColor, strokeSize, size, image } = state;

        ctx.save();
  
        ctx.translate(
          position.x,
          position.y
        );
        ctx.rotate(angle);

        if (image != null) {
            this.RenderImage(state, ctx);
        }
        
        ctx.strokeStyle = strokeColor.toString();
        ctx.lineWidth = strokeSize;
        
        ctx.strokeRect(- size / 2, - size / 2, size, size);
    
        ctx.restore();
    }
    
    private RenderImage(state: DarkThemeSquareState, ctx: CanvasRenderingContext2D): void {

        const { angle, strokeSize, size, image, imageOpacity } = state;
        const { height } = Canvas.getSize()
        const { width: imageWidth, height: imageHeight } = image

        const width = height * imageWidth / imageHeight;

        ctx.beginPath();
        const clipSize = size + strokeSize;
        ctx.rect(- clipSize / 2, - clipSize / 2, clipSize, clipSize);
        ctx.clip();

        ctx.rotate(- angle);
        ctx.globalAlpha = imageOpacity;

        ctx.drawImage(image, - width / 2, - height / 2, width, height);
        ctx.globalAlpha = 1;
        ctx.rotate(angle);
    }

}