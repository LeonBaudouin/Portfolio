import { Drawable } from "./Drawables/Drawable";

class Canvas {

    drawnObjects : Drawable[];
    htmlElement : HTMLCanvasElement;
    context : CanvasRenderingContext2D;

    constructor(drawnObjects : Drawable[], htmlElement : HTMLCanvasElement, context : CanvasRenderingContext2D) {
        this.drawnObjects = drawnObjects;
        this.htmlElement = htmlElement;
        this.context = context;

        this.resize();    
    
        window.addEventListener("resize", () => {
          this.resize();
        });
    }

    private resize(): void {
      this.drawnObjects = [];
  
      this.htmlElement.width = window.innerWidth;
      this.htmlElement.height = window.innerHeight;
    }

    public Loop() : void {
        this.drawnObjects.forEach(element => {
            element.Update();
        });

        this.drawnObjects.forEach(element => {
            element.Draw(this.context);
        });

        requestAnimationFrame(() => this.Loop());
    }
    
}