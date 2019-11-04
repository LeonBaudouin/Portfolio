import { StateObjectInterface } from "../../Core/Abstract/StateObjectInterface";
import { Point } from "../../Core/CustomTypes/Point";
import Color from "../../Core/CustomTypes/Color";
import { OneDimensionSizeState, PositionState } from "../../Core/Abstract/BaseStates";

export default class CircleState implements StateObjectInterface, CircleStateParams {

    public color: Color;
    public size: number;
    public position: Point;

    constructor({color, size, position}: CircleStateParams) {
        this.color = color;
        this.size = size;
        this.position = {...position};
    }

    Clone(): CircleState {
        return new CircleState(this);
    }


}

export interface CircleStateParams extends OneDimensionSizeState, PositionState {
    color: Color
}
