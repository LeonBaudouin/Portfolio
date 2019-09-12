import { Point } from "../CustomTypes/Point";

export interface GradientStop {
    start: number,
    color: string
}

export interface GradientData {
    startCenter: Point,
    startRadius: number,
    endCenter: Point,
    endRadius: number,
    gradientStop: GradientStop[]
}