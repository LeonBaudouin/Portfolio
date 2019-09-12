import { ScrollSensitiveElement } from "../CustomTypes/ScrollSensitiveElement";

export class OnScrollActivator {

    scrollElements: ScrollSensitiveElement[];
    scrollOffset: number;

    constructor(selector: string, offset: number) {

        this.scrollOffset = offset;
        this.scrollElements = [];

        let elementList = document.querySelectorAll(selector);
        this.FillArray(elementList);

        document.addEventListener("scroll", this.CheckAll.bind(this));

        setTimeout(this.CheckAll.bind(this), 0);
    }

    private FillArray(elementList: NodeListOf<Element>) {
        elementList.forEach(element => {
            let scrollElement: ScrollSensitiveElement = {
                DOM: element,
                classes: element.classList,
                isActive: false,
                top: null
            }
            this.scrollElements.push(scrollElement);
        });
    }

    private CheckAll() {
        this.scrollElements.forEach(
            this.CheckElement.bind(this)
        );
    }

    private CheckElement(element: ScrollSensitiveElement) {
        if(!element.isActive) {
            element.top = element.DOM.getBoundingClientRect().top - window.innerHeight;
            if(element.top <= -this.scrollOffset) {
                element.classes.add("active");
                element.isActive = true;
            }
        }
    }

}

