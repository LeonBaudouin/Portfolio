import { OnePageScroll } from "./OnePageScroll";
import { Point } from "../Utils/CustomTypes";

export class SwipeLink {

    onePageScroll: OnePageScroll;
    touchPosition: Point;

    constructor(onePageScroll: OnePageScroll) {
        this.onePageScroll = onePageScroll;

        window.addEventListener("touchstart",
            ({touches: [{clientX, clientY}]}: TouchEvent) => {
                this.touchPosition = {x: clientX, y: clientY};
            }
        );
    }

}