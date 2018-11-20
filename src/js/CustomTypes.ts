export interface Point {
    x: number;
    y: number;
}

interface PolarPoint {
    
}

export interface Size {
    width: number;
    height: number;
}

export type Style = string | CanvasGradient | CanvasPattern;

export enum BackgroundColor {
    Dark = "#3f3f3f",
    Light = "#c4c4c4"
}