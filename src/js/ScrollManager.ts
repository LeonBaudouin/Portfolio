import { Point } from "./CustomTypes";
import { ActivationButton } from "./ActivationButton";
import { MathFunc } from "./Utils";
import { ProjectDisplayer } from "./ProjectDisplayer";


export class ScrollManager {

    bodyClassList: DOMTokenList;
    container: HTMLElement;
    pages: NodeListOf<Element>;
    
    dragOrigin: Point;
    dragDelta: Point;
    
    currentSlideIndex : number;
    slideNumber: number;

    cooldown: number;

    isScrolling: boolean;

    menu: ActivationButton;
    projectDisplayer: ProjectDisplayer;

    constructor(slideNumber: number, coolDown: number, burgerMenu: ActivationButton, projDisp: ProjectDisplayer) {
        
        this.cooldown = coolDown;
        this.isScrolling = false;

        this.menu = burgerMenu;
        this.projectDisplayer = projDisp;
        
        this.currentSlideIndex = 0;
        this.slideNumber = slideNumber;
        
        this.pages = document.querySelectorAll(".page");
        this.bodyClassList = document.querySelector("body").classList;
        this.container = document.querySelector(".container");
        
        this.InitEvent()
    }


    InitEvent(): void {
        
        document.querySelector(".nav").addEventListener("wheel", (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();
        });
        
        document.querySelector(".nav").addEventListener("touchmove", (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();
        });

        this.container.addEventListener("mousewheel", (e: WheelEvent) => {
            console.log(e);
            e.preventDefault();
            e.stopPropagation();
            if(Math.abs(e.deltaY) > 50 ) {
                this.ProcessScroll(e.deltaY);
            }
        });

        window.addEventListener("touchstart", (e: TouchEvent) => {
            this.dragOrigin = {x: e.touches[0].screenX, y: e.touches[0].screenY};
            this.dragDelta = {x: 0, y: 0};
        });

        this.container.addEventListener("touchmove", (e: TouchEvent) => {   
            e.preventDefault();
            e.stopPropagation();
            this.dragDelta = {  x: this.dragOrigin.x - e.touches[0].screenX,
                                y: this.dragOrigin.y - e.touches[0].screenY };
        });

        window.addEventListener("touchend", (e) => {
            console.log(e);
            let fraction = Math.abs(this.dragDelta.y / this.WindowHeight);
            if(fraction > 0.05) {this.ProcessScroll(this.dragDelta.y);}
            this.dragDelta = null;
        });
    }

    ProcessScroll(direction: number) {

        if(direction > 0 && this.currentSlideIndex < this.slideNumber - 1) {
            
            this.Next();
            
        } else if(direction < 0 && this.currentSlideIndex > 0) {
            
            this.Previous();
            
        }
    }
        

    public Next(): void {

        if(this.CanScroll) {
            
            this.Timeout();
            this.MoveTo(this.currentSlideIndex + 1);
        }

    }


    Previous(): void {

        if(this.CanScroll) {
            
            this.Timeout();
            this.MoveTo(this.currentSlideIndex - 1);
        }

    }

    MoveTo(destination: number) {

        let currentScroll = this.WindowHeight * this.currentSlideIndex;
        let animationDistance = this.WindowHeight * destination - currentScroll;

        this.AnimationScroll(currentScroll, 0, animationDistance, 24);

        this.bodyClassList.remove("scroll-index-" + this.currentSlideIndex);
        this.currentSlideIndex = destination;
        this.bodyClassList.add("scroll-index-" + this.currentSlideIndex);
        this.ActivatePage();
    }



    ActivatePage(): void {

        let classList: DOMTokenList = this.pages[this.currentSlideIndex].classList;

        if(!classList.contains("active")) {
            classList.add("active");
            if(this.currentSlideIndex == 2) {
                this.projectDisplayer.CycleChange(0);
            }
        }

    }


    Timeout(): void {
        this.isScrolling = true;
        setTimeout(
            (() => this.isScrolling = false),
            this.cooldown);
    }


    AnimationScroll(currentScroll: number, currentTime: number, scrollDistance: number, animationDuration: number) {

        if(animationDuration > currentTime) {

            currentTime++;
            let factor = MathFunc.easeInOutQuad(currentTime/animationDuration);
            window.scroll(0, currentScroll + scrollDistance * factor);
            
            window.requestAnimationFrame( () => this.AnimationScroll(currentScroll, currentTime, scrollDistance, animationDuration) );
        }
    }


    get CanScroll(): boolean {
        return !this.isScrolling && this.menu.isActivated;
    }

    get WindowHeight() {
        return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    }
}