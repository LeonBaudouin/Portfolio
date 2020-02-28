import { SwipeHandler } from "./SwipeHandler";
import { MathFunc, GetWindowHeight } from "../Utils/UtilsFunctions";
import { addWheelListener } from "../Utils/AddWheelListener.js";
import { ExitFullScreen } from "../Utils/NonTSFriendlyFuncs";
import { Point } from "../CustomTypes/Point";

type ScrollCallback = (i: number) => void;

export class OnePageScroll {
    bodyClassList: DOMTokenList = document.querySelector("body").classList;
    container: HTMLElement = document.querySelector(".container");
    currentSlideIndex: number = 0;
    isScrolling: boolean = false;

    slideNumber: number;
    swipeHandler: SwipeHandler;
    scrollAmount: number;
    cooldown: number;
    scrollCallbacks: ScrollCallback[];

    constructor(
        slideNumber: number,
        coolDown: number,
        scrollAmount: number,
        scrollCallbacks: ScrollCallback[] = []
    ) {
        this.cooldown = coolDown;
        this.scrollAmount = scrollAmount;
        this.slideNumber = slideNumber;
        this.scrollCallbacks = scrollCallbacks;
        this.bodyClassList.add("scroll-index-0");
        console.log(slideNumber);

        this.InitEvent();
    }

    private swipeCondition({ x, y }: Point): boolean {
        let yFraction = Math.abs(y / GetWindowHeight());
        let xFraction = Math.abs(x / window.innerWidth);
        return yFraction > 0.05 && xFraction < 0.35;
    }

    private InitEvent(): void {
        this.swipeHandler = new SwipeHandler(
            p => this.DirectionScroll(p.y),
            p => this.swipeCondition(p)
        );

        addWheelListener(this.container, (e: WheelEvent) => {
            let distance: number;
            e.preventDefault();

            if (e.deltaMode === 1) {
                distance = e.deltaY * 50;
            } else {
                distance = e.deltaY;
            }

            if (Math.abs(distance) > 80) {
                this.DirectionScroll(distance);
            }
        });

        document
            .querySelectorAll(".sideButton")
            .forEach(el =>
                el.addEventListener("touchmove", e => e.preventDefault())
            );

        document
            .querySelector(".loading-screen")
            .addEventListener("touchmove", e => e.preventDefault());

        this.container.addEventListener("touchmove", e => {
            e.preventDefault();
        });
    }

    private DirectionScroll(direction: number) {
        if (direction > 0 && this.currentSlideIndex < this.slideNumber - 1) {
            this.Next();
        } else if (direction < 0 && this.currentSlideIndex > 0) {
            this.Previous();
        }
    }

    public Next(): void {
        if (this.CanScroll && this.currentSlideIndex + 1 < this.slideNumber) {
            this.Timeout();
            this.MoveTo(this.currentSlideIndex + 1);
        }
    }

    public Previous(): void {
        if (this.CanScroll && this.currentSlideIndex > 0) {
            this.Timeout();
            this.MoveTo(this.currentSlideIndex - 1);
        }
    }

    public MoveTo(destination: number) {
        let currentScroll = this.scrollAmount * this.currentSlideIndex;
        let animationDistance = this.scrollAmount * destination - currentScroll;

        this.scrollCallbacks.forEach(func => func(destination));
        this.AnimationScroll(currentScroll, 0, animationDistance, 24);

        this.bodyClassList.remove("scroll-index-" + this.currentSlideIndex);
        this.currentSlideIndex = destination;
        this.bodyClassList.add("scroll-index-" + this.currentSlideIndex);
    }

    private Timeout(): void {
        this.isScrolling = true;
        setTimeout(() => (this.isScrolling = false), this.cooldown);
    }

    private AnimationScroll(
        currentScroll: number,
        currentTime: number,
        scrollDistance: number,
        animationDuration: number
    ) {
        if (animationDuration > currentTime) {
            currentTime++;
            let factor = MathFunc.easeInOutQuad(
                currentTime / animationDuration
            );
            window.scroll(0, currentScroll + scrollDistance * factor);

            window.requestAnimationFrame(() =>
                this.AnimationScroll(
                    currentScroll,
                    currentTime,
                    scrollDistance,
                    animationDuration
                )
            );
        }
    }

    get CanScroll(): boolean {
        return !this.isScrolling;
    }
}
