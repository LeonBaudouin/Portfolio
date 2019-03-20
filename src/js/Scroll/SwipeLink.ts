import { OnePageScroll } from "./OnePageScroll";
import { SwipeHandler } from "./SwipeHandler";
import { Point } from "../Utils/CustomTypes";
import { GetWindowHeight } from "../Utils/UtilsFunctions";

export class SwipeLink {

    onePageScroll: OnePageScroll;
    swipeHandler: SwipeHandler;
    linkArray: string[];

    constructor(onePageScroll: OnePageScroll, linkArray: string[]) {
        this.linkArray = linkArray;
        this.onePageScroll = onePageScroll;
        this.swipeHandler =
            new SwipeHandler((p) => {this.onHorizontalSwipe()},
                            (p) => this.swipeCondition(p))
    }

    onHorizontalSwipe() {
        const targetSection = this.linkArray[this.onePageScroll.currentSlideIndex];
        if(targetSection != null) {
            window.location.href = "./" + targetSection;
        }
    }

    swipeCondition({x, y}: Point) {
        let yFraction = Math.abs(y / GetWindowHeight());
        let xFraction = Math.abs(x / window.innerWidth);
        return xFraction > 0.2 && yFraction < 0.2 && x > 0;
    }
}