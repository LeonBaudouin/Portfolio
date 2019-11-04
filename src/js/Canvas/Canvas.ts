import { Size } from "../CustomTypes/Size";
import { DrawableInterface } from "./Core/Abstract/DrawableInterface";

export class Canvas {

    static instance : Canvas;
    drawnObjects : DrawableInterface[];
    htmlElement : HTMLCanvasElement;
    context : CanvasRenderingContext2D;

    constructor(drawnObjects : DrawableInterface[], htmlElement : HTMLCanvasElement, context : CanvasRenderingContext2D) {
        Canvas.instance = this; 
        this.drawnObjects = drawnObjects;
        this.htmlElement = htmlElement;
        this.context = context;
        this.Loop();
        this.Resize();
    }

    private Resize(): void {
      this.htmlElement.width = window.innerWidth;
      this.htmlElement.height = window.innerHeight;
    }

    public Loop() : void {
        this.context.clearRect(0, 0, this.htmlElement.width, this.htmlElement.height);
        this.drawnObjects.forEach(element => {
            element.Update();
        });

        this.drawnObjects.forEach(element => {
            element.Draw(this.context);
        });

        requestAnimationFrame(() => this.Loop());
    }

    public static getSize() : Size {
        return <Size>Canvas.instance.htmlElement;
    }

    public static getContext() : CanvasRenderingContext2D {
        return Canvas.instance.context;
    }
    
}