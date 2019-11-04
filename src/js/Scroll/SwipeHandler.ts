import { Point } from "../CustomTypes/Point";

export class SwipeHandler {

    dragOrigin: Point;
    dragDelta: Point;
    swipeCallback: (p : Point) => void;
    conditionFunction: (p : Point) => boolean;
    xTreshold: number;
    yTreshold: number;

    constructor(
        swipeCallback: (p: Point) => void,
        conditionFunction: (p: Point) => boolean = () => true
    ) {
        this.swipeCallback = swipeCallback;
        this.conditionFunction = conditionFunction;
        this.InitEvents();
    }

    InitEvents() {
        window.addEventListener("touchstart", (e: TouchEvent) => {
            this.dragOrigin = {x: e.touches[0].screenX, y: e.touches[0].screenY};
            this.dragDelta = {x: 0, y: 0};
        });

        window.addEventListener("touchmove", (e: TouchEvent) => {
            e.stopPropagation();
            this.dragDelta = {  x: this.dragOrigin.x - e.touches[0].screenX,
                                y: this.dragOrigin.y - e.touches[0].screenY };
        });

        window.addEventListener("touchend", () => {
            
            if(this.conditionFunction(this.dragDelta)) {
                this.swipeCallback(this.dragDelta);
            }

            this.dragDelta = null;
        });
    }

}