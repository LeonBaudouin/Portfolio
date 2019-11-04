import { ControllerInterface } from "../Core/Abstract/ControllerInterface";
import { StateObjectInterface } from "../Core/Abstract/StateObjectInterface";
import Color from "../Core/CustomTypes/Color";

type ColorStateType = StateObjectInterface & {fillColor: Color}

export default class OpacityOverTime implements ControllerInterface {

    public offset: number;
    public overTimeFunc: OverTimeFunc;
    private timer: number = 0;

    constructor({offset, overTimeFunc}: OpacityOverTimeParams) {
        this.offset = offset;
        this.overTimeFunc = overTimeFunc;
    }

    Update(currentState: ColorStateType, defaultState: ColorStateType): ColorStateType {
        const newState = <ColorStateType>currentState.Clone();
        newState.fillColor.a = this.overTimeFunc(this.offset, this.timer);
        this.timer++;
        return newState;
    }
}

type OverTimeFunc = (offset: number, time: number) => number

interface OpacityOverTimeParams {
    offset: number,
    overTimeFunc: OverTimeFunc
}