import { ListenEvent } from "./SimpleEventListener";

export class HoverElementListener implements ListenEvent {

    private static instances : Map<string, HoverElementListener>;

    private elements : Element[];

    private hoveredElement : Element[] = [];

    private constructor(selector: string) {
        this.elements = [...document.querySelectorAll(selector)];
        this.elements.forEach(element => {
            element.addEventListener('mouseenter', () => this.addToHovered(element));
            element.addEventListener('mouseleave', () => this.RemoveFromHovered(element));
        });
    }

    public static getInstance(selector: string) : HoverElementListener {
        if (HoverElementListener.instances == null) {
            HoverElementListener.instances = new Map<string,HoverElementListener>();
        }
        if (!HoverElementListener.instances.has(selector)) {
            HoverElementListener.instances.set(selector, new HoverElementListener(selector))
        }
        return HoverElementListener.instances.get(selector);
    }
    
    private addToHovered(element: Element) {
        this.hoveredElement.push(element);
    }
    
    private RemoveFromHovered(element: Element) {
        const index = this.hoveredElement.indexOf(element);
        if (index > -1) {
          this.hoveredElement.splice(index, 1);
        }
    }

    public getValue() : Element[] {
        return this.hoveredElement;
    }

}