import { StateObjectInterface } from "../../Core/Abstract/StateObjectInterface";
import { Point } from "../../Core/CustomTypes/Point";
import { Size } from "../../Core/CustomTypes/Size";
import { PositionState, TwoDimensionSizeState } from "../../Core/Abstract/BaseStates";
import Color from "../../Core/CustomTypes/Color";

export default class RectangleState implements StateObjectInterface, RectangleStateParams {

    position: Point;
    size: Size;
    color: Color;

    constructor({position, size, color}: RectangleStateParams) {
        this.position = {...position};
        this.size = {...size};
        this.color = color;
    } 

    Clone(): RectangleState {
        return new RectangleState(this);
    }
    
}

interface RectangleStateParams extends PositionState, TwoDimensionSizeState {
    color: Color
}
