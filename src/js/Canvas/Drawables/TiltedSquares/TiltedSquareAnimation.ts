import { TiltedSquare } from "./TiltedSquare";
import { Point } from "../../../Utils/CustomTypes";

export interface TiltedSquareAnimator {
    tiltedSquare: TiltedSquare;
    Update(): void;
}

export abstract class TiltedSquareAnimation implements TiltedSquareAnimator {

    tiltedSquare: TiltedSquare;

    constructor(tiltedSquare: TiltedSquare) {
        this.tiltedSquare = tiltedSquare;
    }

    abstract Update(): void

    set defaultPosition(value: Point) {
        this.tiltedSquare.defaultPosition = value;
    }
    get defaultPosition() : Point {
        return this.tiltedSquare.defaultPosition;
    }

    set currentPosition(value: Point) {
        this.tiltedSquare.currentPosition = value;
    }
    get currentPosition() : Point {
        return this.tiltedSquare.currentPosition;
    }

    set focusPosition(value: Point) {
        this.tiltedSquare.focusPosition = value;
    }
    get focusPosition() : Point {
        return this.tiltedSquare.focusPosition;
    }

    set defaultAngle(value: number) {
        this.tiltedSquare.defaultAngle = value;
    }
    get defaultAngle(): number {    
        return this.tiltedSquare.defaultAngle;
    }

    set currentAngle(value: number) {
        this.tiltedSquare.currentAngle = value;
    }
    get currentAngle(): number {    
        return this.tiltedSquare.currentAngle;
    }
    
    set focusAngle(value: number) {
        this.tiltedSquare.focusAngle = value;
    }
    get focusAngle(): number {    
        return this.tiltedSquare.focusAngle;
    }
    
}