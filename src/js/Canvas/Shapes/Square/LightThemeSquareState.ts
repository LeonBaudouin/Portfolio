import { StateObjectInterface } from "../../Core/Abstract/StateObjectInterface";
import { PositionState, OneDimensionSizeState } from "../../Core/Abstract/BaseStates";
import Color from "../../Core/CustomTypes/Color";
import ImageState from "../../BaseStates/ImageState";
import { Point } from "../../../CustomTypes/Point";

export default class LightThemeSquareState implements StateObjectInterface, LightThemeSquareStateInterface {

    public position: Point;
    public size: number;
    public image: HTMLImageElement;
    public imageOpacity: number;
    public fillColor: Color;

    constructor({position, size, image, imageOpacity, fillColor: {r, g, b, a}} : LightThemeSquareStateInterface) {
        this.position = {...position};
        this.size = size;
        this.image = image;
        this.imageOpacity = imageOpacity;
        this.fillColor = new Color(r, g, b, a);
    }

    public Clone() : StateObjectInterface {
        return new LightThemeSquareState(this);
    }
}

interface LightThemeSquareStateInterface extends
    PositionState,
    OneDimensionSizeState,
    ImageState
{
    fillColor: Color
}