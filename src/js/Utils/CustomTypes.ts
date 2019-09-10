export type Point = {
    x: number;
    y: number;
}

export type Size = {
    width: number;
    height: number;
}

export type Style = string | CanvasGradient | CanvasPattern;

export enum Palette {
    BackgroundDark = "#3f3f3f",
    BackgroundLight = "#c4c4c4",
    GridDark = "#333131",
    GridLight = "#979797",
    SquareDark = "#464646",
    SquareLight = "#b5b5b5"
}

export type RotationRoutine = {
    distance: number;
    angle: number;
    speed: number;
}

export type TiltedSquareSettings = {
    defaultPosition: Point;
    defaultAngle: number;
    speed: number;
    size: Size;
    strokeSize: number;
}

export type ScrollSensitiveElement = {
    DOM: Element;
    classes: DOMTokenList;
    isActive: boolean;
    top: number;
}