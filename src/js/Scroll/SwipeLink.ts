import { SwipeHandler } from "./SwipeHandler";
import { GetWindowHeight } from "../Utils/UtilsFunctions";
import { DesactivateAll } from "../Miscellaneous/DesactivateAll";
import { Point } from "../CustomTypes/Point";

export class SwipeLink {

    swipeHandler: SwipeHandler;
    linkArray: string[];
    currentSlideIndex: number;

    constructor(linkArray: string[]) {
        this.linkArray = linkArray;
        this.swipeHandler = new SwipeHandler(
                () => {this.onHorizontalSwipe()},
                (p) => this.swipeCondition(p)
        )
    }

    onHorizontalSwipe() {
        const targetSection = this.linkArray[this.currentSlideIndex];
        if(targetSection != null) {
            DesactivateAll();
            window.location.href = targetSection;
        }
    }

    swipeCondition({x, y}: Point) {
        let yFraction = Math.abs(y / GetWindowHeight());
        let xFraction = Math.abs(x / window.innerWidth);
        return xFraction > 0.2 && yFraction < 0.2 && x > 0;
    }

    public updateSlideIndex(i: number) {
        this.currentSlideIndex = i;
    }
}