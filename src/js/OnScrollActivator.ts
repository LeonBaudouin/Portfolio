import { scrollSensitiveElement } from "./CustomTypes";

export class OnScrollActivator {

    scrollElements: scrollSensitiveElement[];
    scrollOffset: number;

    constructor(selector: string, offset: number) {

        this.scrollOffset = offset;
        this.scrollElements = [];

        let elementList = document.querySelectorAll(selector);
        this.FillArray(elementList);

        document.addEventListener("scroll", this.CheckAll.bind(this));
    }

    private FillArray(elementList: NodeListOf<Element>) {
        elementList.forEach(element => {
            let scrollElement: scrollSensitiveElement = {
                DOM: element,
                classes: element.classList,
                isActive: false,
                top: null
            }
            this.scrollElements.push(scrollElement);
        });
    }

    private CheckAll(e: MouseEvent) {
        this.scrollElements.forEach(
            this.CheckElement.bind(this)
        );
    }

    private CheckElement(element: scrollSensitiveElement) {
        if(!element.isActive) {
            element.top = element.DOM.getBoundingClientRect().top - window.innerHeight;
            console.log(element.top);
            if(element.top <= -this.scrollOffset) {
                element.classes.add("active");
                element.isActive = true;
            }
        }
    }

}

