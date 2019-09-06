import { SwipeHandler } from "./SwipeHandler";
import { AddClassButton } from "../Buttons/ActivationButton";
import { MathFunc, GetWindowHeight } from "../Utils/UtilsFunctions";
import { ProjectCarousel } from "../Buttons/ProjectDisplayer";
import { addWheelListener } from "../Utils/AddWheelListener.js";
import { Point } from "../Utils/CustomTypes";
import { ExitFullScreen } from "../Utils/NonTSFriendlyFuncs";

export class OnePageScroll {

    bodyClassList: DOMTokenList;
    container: HTMLElement;
    pages: NodeListOf<Element>;
    
    currentSlideIndex : number;
    slideNumber: number;

    swipeHandler: SwipeHandler;

    cooldown: number;

    isScrolling: boolean;

    menu: AddClassButton;
    displayers: ProjectCarousel[];

    constructor(slideNumber: number, coolDown: number, burgerMenu: AddClassButton, projDisp: ProjectCarousel[]) {
        
        this.cooldown = coolDown;
        this.isScrolling = false;

        this.menu = burgerMenu;
        this.displayers = projDisp;
        
        this.currentSlideIndex = 0;
        this.slideNumber = slideNumber;
        
        this.pages = document.querySelectorAll(".page");
        this.bodyClassList = document.querySelector("body").classList;
        this.container = document.querySelector(".container");
        
        this.swipeHandler =
            new SwipeHandler((p) => {this.onVerticalSwipe(p)},
                            (p) => this.swipeCondition(p));

        this.InitEvent()
    }


    InitEvent(): void {
        addWheelListener( this.container, (e : WheelEvent) => {
            let distance : number;
            e.preventDefault();

            if(e.deltaMode === 1) {
                distance = e.deltaY * 50;
            } else {
                distance = e.deltaY;
            }

            if(Math.abs(distance) > 80 ) {
                this.DirectionScroll(distance);
            }
        })

        document.addEventListener("scroll", (e) => {
            ExitFullScreen();
        })

        this.container.addEventListener("touchmove", (e) => {
            e.preventDefault();
        })
    }

    swipeCondition({x, y}: Point): boolean {
        let yFraction = Math.abs(y / GetWindowHeight());
        let xFraction = Math.abs(x / window.innerWidth);
        return yFraction > 0.05 && xFraction < 0.35;
    }

    onVerticalSwipe({x, y}: Point) {
        this.DirectionScroll(y);
    }

    DirectionScroll(direction: number) {

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

    public MoveTo(destination: number) {

        let currentScroll = GetWindowHeight() * this.currentSlideIndex;
        let animationDistance = GetWindowHeight() * destination - currentScroll;

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
            if(this.displayers[this.currentSlideIndex]) {
                this.displayers[this.currentSlideIndex].Activate();
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
        return !this.isScrolling && this.menu.hasClass;
    }
}