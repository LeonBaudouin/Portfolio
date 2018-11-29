import { Point } from "./CustomTypes";
import { ActivationButton } from "./ActivationButton";
import { MathFunc } from "./Utils";


export class ScrollManager {

    bodyClassList: DOMTokenList;
    container: HTMLElement;
    
    dragOrigin: Point;
    dragDelta: Point;
    
    currentSlideIndex : number;
    slideNumber: number;

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
        this.container = document.querySelector(".container");
        
        this.InitEvent()
    }


    InitEvent(): void {
        
        document.querySelector(".nav").addEventListener("wheel", (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();
        })
        
        document.querySelector(".nav").addEventListener("touchmove", (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();
        })

        this.container.addEventListener("wheel", (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();
            this.ProcessScroll(e.deltaY);
        })

        window.addEventListener("touchstart", (e: TouchEvent) => {
            this.dragOrigin = {x: e.touches[0].screenX, y: e.touches[0].screenY};
            this.dragDelta = {x: 0, y: 0};
        })

        this.container.addEventListener("touchmove", (e: TouchEvent) => {
            e.preventDefault();
            e.stopPropagation();
            this.dragDelta = {  x: this.dragOrigin.x - e.touches[0].screenX,
                                y: this.dragOrigin.y - e.touches[0].screenY };
        })

        window.addEventListener("touchend", () => {
            let fraction = Math.abs(this.dragDelta.y / this.WindowHeight);
            if(fraction > 0.05) {this.ProcessScroll(this.dragDelta.y);}
            this.dragDelta = null;
        })
    }

    ProcessScroll(direction: number) {

        if(this.CanScroll) {

            if(direction > 0 && this.currentSlideIndex < this.slideNumber - 1) {
            
                this.Next();
            
            } else if(direction < 0 && this.currentSlideIndex > 0) {
            
                this.Previous();
            
            }
        }
    }
        

    Next(): void {

        this.AnimationScroll(this.WindowHeight * this.currentSlideIndex, 0, this.WindowHeight, 24);
        this.bodyClassList.remove("scroll-index-" + this.currentSlideIndex);
        this.currentSlideIndex++;
        this.bodyClassList.add("scroll-index-" + this.currentSlideIndex);
        this.Timeout();

    }

    Previous(): void {

        this.AnimationScroll(this.WindowHeight * this.currentSlideIndex, 0, -this.WindowHeight, 24);
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


    AnimationScroll(currentScroll: number, currentTime: number, scrollDistance: number, animationDuration: number) {

        if(animationDuration > currentTime) {

            currentTime++;
            let factor = MathFunc.easeInOutQuad(currentTime/animationDuration)
            window.scroll(0, currentScroll + scrollDistance * factor);
            
            window.requestAnimationFrame( () => this.AnimationScroll(currentScroll, currentTime, scrollDistance, animationDuration) );
        }
    }


    get CanScroll() {
        return this.isEnable && this.menu.isActivated;
    }

    get WindowHeight() {
        return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    }
}