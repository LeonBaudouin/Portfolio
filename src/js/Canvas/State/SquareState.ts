import { Point } from "../../CustomTypes/Point";
import { Style } from "../../CustomTypes/Style";
import { StateObjectInterface } from "./StateObjectInterface";

export class SquareState implements SquareStateInterface, StateObjectInterface {
    
    size: number;
    position: Point;
    angle: number;
    strokeSize: number;
    style: Style;

    constructor(data: SquareStateInterface) {
        this.size = data.size;
        this.angle = data.angle;
        this.strokeSize = data.strokeSize;
        this.position = {...data.position};
        this.style = data.style;
    }

    public Clone() {
        return new SquareState(this);
    }
}


interface SquareStateInterface {
    size: number,
    position: Point,
    angle: number,
    strokeSize: number,
    style: Style
}