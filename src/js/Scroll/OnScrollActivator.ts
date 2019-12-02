import { isNumber } from "util";

export class OnScrollActivator {
    scrollElements: ScrollSensitiveElement[];
    callback: (element: Element) => void;

    constructor(
        elements: Element[],
        offset: number | number[],
        callback: (element: Element) => void
    ) {
        this.scrollElements = [];
        this.callback = callback;
        this.FillArray(elements, offset);

        document.addEventListener("scroll", this.CheckAll.bind(this));

        setTimeout(this.CheckAll.bind(this), 0);
    }

    private FillArray(elementList: Element[], offset: number | number[]) {
        elementList.forEach((element, i) => {
            let scrollElement: ScrollSensitiveElement = {
                DOM: element,
                isTriggered: false,
                top: null,
                offset: isNumber(offset) ? offset : offset[i]
            };
            this.scrollElements.push(scrollElement);
        });
    }

    private CheckAll() {
        this.scrollElements.forEach(this.CheckElement.bind(this));
    }

    private CheckElement(element: ScrollSensitiveElement) {
        if (!element.isTriggered) {
            element.top =
                element.DOM.getBoundingClientRect().top - window.innerHeight;
            if (element.top <= -element.offset) {
                this.callback(element.DOM);
                element.isTriggered = true;
            }
        }
    }
}

export type ScrollSensitiveElement = {
    DOM: Element;
    isTriggered: boolean;
    top: number;
    offset: number;
};
