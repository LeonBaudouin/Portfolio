import { Size } from "./ReusableTypes";
import { BackgroundColor } from "./Enum";

class Canvas {

    private element: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public size: Size;

    constructor(uniqueSelector: string) {

        this.element = document.querySelector(uniqueSelector);
        this.element.width = window.innerWidth;
        this.element.height = window.innerHeight;

        this.context = this.element.getContext("2d");

        this.size = { width: this.element.width, height: this.element.height };
    }

    public Update(): void {
        this.DrawBG();
        this.DrawGradient();
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