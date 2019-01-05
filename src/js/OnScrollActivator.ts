import { scrollSensitiveElement } from "./CustomTypes";

class OnScrollActivator {

    scrollElements: scrollSensitiveElement[];
    scrollOffset: number;

    constructor(selector: string, offset: number) {

        this.scrollOffset = offset;

        document.addEventListener("scroll", this.CheckAll);
    }

    private FillArray(elementList: NodeListOf<Element>) {
        elementList.forEach(element => {
            let scrollElement: scrollSensitiveElement = {
                element: element,
                state: false,
                top: element.getBoundingClientRect().top - window.innerHeight
            } 
        });
    }

    private CheckAll() {

    }

    private CheckElement(element: Element) {

    }

}

