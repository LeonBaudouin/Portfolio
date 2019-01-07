export interface Point {
    x: number;
    y: number;
}

export interface Size {
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

export interface rotationRoutine {
    distance: number;
    angle: number;
    speed: number;
}

export interface tiltedSquareSettings {
    position: Point;
    size: number;
    strokeSize: number;
}

export interface scrollSensitiveElement {
    DOM: Element;
    classes: DOMTokenList;
    isActive: boolean;
    top: number;
}