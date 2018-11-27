export class ScrollManager {
    bodyClassList: DOMTokenList;
    currentSlideIndex : number;
    slideNumber: number;

    constructor(slideNumber: number) {
        this.currentSlideIndex = 0;
        this.slideNumber = slideNumber;
        
        this.bodyClassList = document.querySelector("body").classList;

        window.addEventListener("wheel", (e) => {
            this.ProcessScroll(e.deltaY);
        })
    }
 
    ProcessScroll(direction: number) {

        if(direction > 0 && this.currentSlideIndex < this.slideNumber - 1) {

            this.bodyClassList.remove("scroll-index-" + this.currentSlideIndex);
            this.currentSlideIndex++;
            this.bodyClassList.add("scroll-index-" + this.currentSlideIndex);

        } else if(direction < 0 && this.currentSlideIndex > 0) {

            this.bodyClassList.remove("scroll-index-" + this.currentSlideIndex);
            this.currentSlideIndex--;
            this.bodyClassList.add("scroll-index-" + this.currentSlideIndex);

        }
    }
}