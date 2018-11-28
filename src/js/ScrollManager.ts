import { Point } from "./CustomTypes";
import { ActivationButton } from "./ActivationButton";


export class ScrollManager {

    bodyClassList: DOMTokenList;
    currentSlideIndex : number;
    slideNumber: number;
    dragOrigin: Point;
    dragDelta: Point;
    cooldown: number;
    isEnable: boolean;
    menu: ActivationButton;

    constructor(slideNumber: number, coolDown: number, burgerMenu: ActivationButton) {

        this.cooldown = coolDown;
        this.isEnable = true;
        this.menu = burgerMenu;

        this.currentSlideIndex = 0;
        this.slideNumber = slideNumber;
        
        this.bodyClassList = document.querySelector("body").classList;

        this.InitEvent()
    }


    InitEvent(): void {
        window.addEventListener("wheel", (e: WheelEvent) => {
            this.ProcessScroll(e.deltaY);
        })
        window.addEventListener("touchstart", (e: TouchEvent) => {
            this.dragOrigin = {x: e.touches[0].screenX, y: e.touches[0].screenY};
        })

        window.addEventListener("touchmove", (e: TouchEvent) => {
            this.dragDelta = {  x: this.dragOrigin.x - e.touches[0].screenX,
                                y: this.dragOrigin.y - e.touches[0].screenY };
        })

        window.addEventListener("touchend", () => {
            this.DragEnd();
        })
    }

    DragEnd(): void {

        let fraction = Math.abs(this.dragDelta.y / window.innerHeight);

        if(fraction > 0.2) {

            this.ProcessScroll(this.dragDelta.y);

        } else {

            this.VisualResponse(this.dragDelta.y);

        }

        this.dragDelta = null;
    }
 

    ProcessScroll(direction: number) {

        if(this.CanScroll) {

            if(direction > 0 && this.currentSlideIndex < this.slideNumber - 1) {
            
                this.Next();
            
            } else if(direction < 0 && this.currentSlideIndex > 0) {
            
                this.Previous();
            
            } else {
            
                this.VisualResponse(direction);
            
            }
        }
    }


    VisualResponse(direction: number) {

        if(this.CanScroll) {

            if(direction < 0) {
                
                this.bodyClassList.add("scroll-tilt-up");
                setTimeout((
                    () => this.bodyClassList.remove("scroll-tilt-up")
                    ), 500)
                    
            } else {

            this.bodyClassList.add("scroll-tilt-down");
            setTimeout((
                () => this.bodyClassList.remove("scroll-tilt-down")
                ), 500)
                
            }
        }
    }
        

    Next(): void {

        this.bodyClassList.remove("scroll-index-" + this.currentSlideIndex);
        this.currentSlideIndex++;
        this.bodyClassList.add("scroll-index-" + this.currentSlideIndex);
        this.Timeout();

    }

    Previous(): void {

        this.bodyClassList.remove("scroll-index-" + this.currentSlideIndex);
        this.currentSlideIndex--;
        this.bodyClassList.add("scroll-index-" + this.currentSlideIndex);
        this.Timeout();

    }

    Timeout(): void {
        this.isEnable = false;
        setTimeout(
            (() => this.isEnable = true),
            this.cooldown);
    }

    get CanScroll() {
        return this.isEnable && this.menu.isActivated;
    }
}