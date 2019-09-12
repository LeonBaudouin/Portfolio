import { OnePageScroll } from "./OnePageScroll";
import { SwipeHandler } from "./SwipeHandler";
import { GetWindowHeight } from "../Utils/UtilsFunctions";
import { DesactivateAll } from "../Miscellaneous/DesactivateAll";
import { Point } from "../CustomTypes/Point";

export class SwipeLink {

    onePageScroll: OnePageScroll;
    swipeHandler: SwipeHandler;
    linkArray: string[];

    constructor(onePageScroll: OnePageScroll, linkArray: string[]) {
        this.linkArray = linkArray;
        this.onePageScroll = onePageScroll;
        this.swipeHandler =
            new SwipeHandler(() => {this.onHorizontalSwipe()},
                            (p) => this.swipeCondition(p))
    }

    onHorizontalSwipe() {
        const targetSection = this.linkArray[this.onePageScroll.currentSlideIndex];
        if(targetSection != null) {
            DesactivateAll();
            window.setTimeout(() => {
                window.location.href = "./" + targetSection;
            }, 1000)
        }
    }

    swipeCondition({x, y}: Point) {
        let yFraction = Math.abs(y / GetWindowHeight());
        let xFraction = Math.abs(x / window.innerWidth);
        return xFraction > 0.2 && yFraction < 0.2 && x > 0;
    }
}