import { Size, BackgroundColor } from "./CustomTypes";
import { DrawnElement } from "./Drawable";

class Canvas {

    private element: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public size: Size;
    private grid: DrawnElement.Grid;

    constructor(uniqueSelector: string) {

        this.element = document.querySelector(uniqueSelector);
        this.context = this.element.getContext("2d");
        

        this.Resize();

        window.addEventListener("resize", () => {
            this.Resize();
        });

        this.grid = new DrawnElement.Grid(this.size);
    }


    public Update(): void {
        this.DrawBG();
        this.grid.Draw(this.context);
        this.DrawGradient();

        requestAnimationFrame(() => this.Update());
    }



    private Resize(): void {
        this.element.width = window.innerWidth;
        this.element.height = window.innerHeight;

        this.size = { width: this.element.width, height: this.element.height };
    }

    private DrawBG(): void {
        this.context.fillStyle = BackgroundColor.Dark;
        this.context.fillRect(0, 0, this.size.width, this.size.height);
    }

    private DrawGradient(): void {
        let gradient: CanvasGradient = this.context.createRadialGradient(this.size.width / 2, this.size.height / 2, this.size.width/2, this.size.width / 2, this.size.height / 2, 0);

        gradient.addColorStop(0.000, 'rgba(0, 0, 0, 0.250)');
        gradient.addColorStop(1.000, 'rgba(0, 0, 0, 0.000)');

        this.context.fillStyle = gradient;
        this.context.fillRect(0, 0, this.size.width, this.size.height);
    }
}

export default Canvas;