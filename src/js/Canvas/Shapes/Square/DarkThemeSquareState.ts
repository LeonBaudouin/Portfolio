import { Point } from "../../../CustomTypes/Point";
import { StateObjectInterface } from "../../Core/Abstract/StateObjectInterface";
import { OneDimensionSizeState, PositionState, AngleState } from "../../Core/Abstract/BaseStates";
import ImageState from "../../BaseStates/ImageState";
import StrokeState from "../../BaseStates/StrokeState";
import Color from "../../Core/CustomTypes/Color";

export class DarkThemeSquareState implements SquareStateInterface, StateObjectInterface {
    
    size: number;
    position: Point;
    angle: number;
    strokeSize: number;
    strokeColor: Color;
    image: HTMLImageElement;
    imageOpacity: number;

    constructor(data: SquareStateInterface) {
        const {r, g, b} = data.strokeColor;
        this.size = data.size;
        this.angle = data.angle;
        this.strokeSize = data.strokeSize;
        this.position = {...data.position};
        this.strokeColor = new Color(r, g, b);
        this.image = data.image;
        this.imageOpacity = data.imageOpacity
    }

    public Clone() {
        return new DarkThemeSquareState(this);
    }
}


interface SquareStateInterface extends 
    OneDimensionSizeState,
    PositionState,
    AngleState,
    ImageState,
    StrokeState
{}