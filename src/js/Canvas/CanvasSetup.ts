import { MathFunc } from "../Utils/UtilsFunctions";
import { GradientData } from "./StyleData";
import { Palette } from "./Palette";
import { BaseDrawable } from "./DrawnObject/BaseDrawable";
import { SquareState } from "./State/SquareState";
import { SquareRenderer } from "./Renderer/SquareRenderer";
import { FollowAngle } from "./Controller/Square/FollowAngle";
import { HoverMove } from "./Controller/Square/HoverMove";
import { FillRectState } from "./State/FIllRectState";
import { FillRectRenderer } from "./Renderer/FillRectRenderer";
import { GridState } from "./State/GridState";
import { GridRenderer } from "./Renderer/GridRenderer";
import { Canvas } from "./Canvas";


export function CanvasSetup() {

    const htmlCanvas = document.querySelector('canvas');
    const context = htmlCanvas.getContext('2d');

    const drawnObject = [
        new BaseDrawable(
            new FillRectState({
                style: Palette.BackgroundDark
            }),
            new FillRectRenderer()
        ),
        new BaseDrawable(
            new SquareState({
                size: window.innerHeight - 200,
                position: {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2
                },
                angle: Math.PI/4,
                strokeSize: 25,
                style: Palette.SquareDark
            }),
            new SquareRenderer(),
            [
                new FollowAngle({
                    speed: 0.05
                }),
                new HoverMove({
                    amount: 0.08,
                    speed: 0.05,
                    selector: '.js-hovered-element'
                })
            ]
        ),
        new BaseDrawable(
            new SquareState({
                size: window.innerHeight - 300,
                position: {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2
                },
                angle: Math.PI/4,
                strokeSize: 3,
                style: Palette.SquareDark
            }),
            new SquareRenderer(),
            [
                new FollowAngle({
                    speed: 0.045
                }),
                new HoverMove({
                    amount: 0.12,
                    speed: 0.05,
                    selector: '.js-hovered-element'
                })
            ]
        ),
        new BaseDrawable(
            new SquareState({
                size: window.innerHeight - 400,
                position: {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2
                },
                angle: Math.PI/4,
                strokeSize: 3,
                style: Palette.SquareDark
            }),
            new SquareRenderer(),
            [
                new FollowAngle({
                    speed: 0.04
                }),
                new HoverMove({
                    amount: 0.16,
                    speed: 0.05,
                    selector: '.js-hovered-element'
                })
            ]
        ),
        new BaseDrawable(
            new SquareState({
                size: window.innerHeight - 500,
                position: {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2
                },
                angle: Math.PI/4,
                strokeSize: 3,
                style: Palette.SquareDark
            }),
            new SquareRenderer(),
            [
                new FollowAngle({
                    speed: 0.035
                }),
                new HoverMove({
                    amount: 0.20,
                    speed: 0.05,
                    selector: '.js-hovered-element'
                })
            ]
        ),
        new BaseDrawable(
            new GridState({
                style: Palette.GridDark,
                size: MathFunc.easeInOutSine(window.innerWidth, 40, 24, 1920)
            }),
            new GridRenderer()
        ),
        new BaseDrawable(
            new FillRectState({
                style: generateGradient({
                    startCenter: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
                    startRadius: window.innerWidth / 2,
                    endCenter: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
                    endRadius: 0,
                    gradientStop: [
                        { start: 0.0, color: 'rgba(0, 0, 0, 0.250)' },
                        { start: 1.0, color: 'rgba(0, 0, 0, 0.000)' }
                    ]
                }, context)
            }),
            new FillRectRenderer()
        )
    ]

    return new Canvas(drawnObject, htmlCanvas, context);
}

function generateGradient(gradientData: GradientData, context: CanvasRenderingContext2D) {
    
    const gradient = context.createRadialGradient(
        gradientData.startCenter.x,
        gradientData.startCenter.y,
        gradientData.startRadius,
        gradientData.endCenter.x,
        gradientData.endCenter.y,
        gradientData.endRadius
    );

    gradientData.gradientStop.forEach(colorStop => {
        gradient.addColorStop(colorStop.start, colorStop.color);
    });

    return gradient;
}