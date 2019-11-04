import { Style } from "../../../CustomTypes/Style";
import { StateObjectInterface } from "../../Core/Abstract/StateObjectInterface";

export class FillRectState implements FillRectStateInterface, StateObjectInterface {
    style: Style;

    constructor(data: FillRectStateInterface) {
        this.style = data.style;
    }

    public Clone() {
        return new FillRectState(this);
    }
}

interface FillRectStateInterface {
    style: Style
}