import { HandleHover } from "../Drawable";

export class HoveredElement {
    
    element: HTMLElement;
    isMouseHover: boolean = false;
    boundingRect: ClientRect;
    hoverHandler: HandleHover;

    constructor(element: HTMLElement, hoverHandler: HandleHover) {
        this.element = element;
        this.boundingRect = element.getBoundingClientRect();
        this.hoverHandler = hoverHandler

        this.element.addEventListener("mouseenter", (e: MouseEvent) => {
            this.isMouseHover = true;
            this.hoverHandler.OnHoverEnter(e, this.boundingRect);
        })

        this.element.addEventListener("mousemove", (e: MouseEvent) => {
            this.hoverHandler.OnHoverMove(e, this.boundingRect);
        })

        this.element.addEventListener("mouseleave", (e: MouseEvent) => {
            this.isMouseHover = false;
            this.hoverHandler.OnHoverExit(e, this.boundingRect);
        })
    }
}