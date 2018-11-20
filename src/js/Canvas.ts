import { Size, Palette, Style, tiltedSquareSettings } from "./CustomTypes";
import { DrawnElement } from "./Drawable";

class Canvas {

    private element: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public size: Size;

    private backgroundStyle: Style = Palette.BackgroundDark;

    private drawnElement: DrawnElement.Drawable[] = [];

    constructor(uniqueSelector: string) {

        this.element = document.querySelector(uniqueSelector);
        this.context = this.element.getContext("2d");

        this.Resize();

        window.addEventListener("resize", () => {
            this.Resize();
        });
        this.SetupSquare();
        this.drawnElement.push(new DrawnElement.Grid(this.size, Palette.GridDark));
    }


    public Update(): void {
        this.DrawBG();
        this.drawnElement.forEach((element) => {
            element.Draw(this.context)
        });
        this.DrawGradient();

        requestAnimationFrame(() => this.Update());
    }












    private Resize(): void {
        this.element.width = window.innerWidth;
        this.element.height = window.innerHeight;

        this.size = { width: this.element.width, height: this.element.height };
    }



    private DrawBG(): void {
        this.context.fillStyle = this.backgroundStyle;
        this.context.fillRect(0, 0, this.size.width, this.size.height);
    }

    private DrawGradient(): void {
        let gradient: CanvasGradient = this.context.createRadialGradient(this.size.width / 2, this.size.height / 2, this.size.width / 2, this.size.width / 2, this.size.height / 2, 0);

        gradient.addColorStop(0.000, 'rgba(0, 0, 0, 0.250)');
        gradient.addColorStop(1.000, 'rgba(0, 0, 0, 0.000)');

        this.context.fillStyle = gradient;
        this.context.fillRect(0, 0, this.size.width, this.size.height);
    }

    private SetupSquare() {
        let settings: tiltedSquareSettings = {
            position: {x: this.size.width/2, y: this.size.height/2},
            size: 636,
            strokeSize: 25,
            angle: Math.PI/4,
            speed: 0.005
        };
        this.drawnElement.push(new DrawnElement.TiltedSquare(settings));
        settings.strokeSize = 3;

        for (let i = 0; i < 4; i++) {
            settings.size = 500 - i*50;
            this.drawnElement.push(new DrawnElement.TiltedSquare(settings));
        }

    }
}

export default Canvas;