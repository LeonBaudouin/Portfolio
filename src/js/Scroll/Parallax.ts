//WIP

export class Parallax {

    DOM: HTMLElement;
    transform: string;
    clientRect: ClientRect;
    translate: number;
    offsetMax: number;

    constructor(element: HTMLElement, offsetMax: number) {
        this.DOM = element;
        this.transform = this.DOM.style.transform;

        this.clientRect = this.DOM.getBoundingClientRect();

        this.offsetMax = offsetMax;

        this.translate = 0;

        document.addEventListener("scroll", this.Offset.bind(this));
    }

    Offset() {
        console.log(this.clientRect.top);
        console.log(window.scrollY);
    }
}