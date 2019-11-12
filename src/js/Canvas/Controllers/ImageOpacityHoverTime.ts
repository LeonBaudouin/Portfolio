import { ControllerInterface } from "../Core/Abstract/ControllerInterface";
import { StateObjectInterface } from "../Core/Abstract/StateObjectInterface";
import ImageState from "../BaseStates/ImageState";

type ImageStateType = StateObjectInterface & ImageState

export default class ImageOpacityOverTime implements ControllerInterface {

    public offset: number;
    public overTimeFunc: OverTimeFunc;
    private timer: number = 0;

    constructor({offset, overTimeFunc}: OpacityOverTimeParams) {
        this.offset = offset;
        this.overTimeFunc = overTimeFunc;
    }

    Update(currentState: ImageStateType, defaultState: ImageStateType): ImageStateType {
        const newState = <ImageStateType>currentState.Clone();
        newState.imageOpacity = currentState.imageOpacity * (0.5 + this.overTimeFunc(this.offset, this.timer) / 2);
        this.timer++;
        return newState;
    }
}

type OverTimeFunc = (offset: number, time: number) => number

interface OpacityOverTimeParams {
    offset: number,
    overTimeFunc: OverTimeFunc
}