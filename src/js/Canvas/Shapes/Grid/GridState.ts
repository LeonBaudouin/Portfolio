import { Style } from "../../../CustomTypes/Style";
import { StateObjectInterface } from "../../Core/Abstract/StateObjectInterface";

export class GridState implements GridStateInterface, StateObjectInterface {
    style: Style;
    size: number;

    constructor(data: GridStateInterface) {
        this.style = data.style;
        this.size = data.size;
    }

    public Clone() {
        return new GridState(this);
    }
}

interface GridStateInterface {
    style: Style,
    size: number
}