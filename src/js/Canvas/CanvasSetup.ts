import { MathFunc } from "../Utils/UtilsFunctions";
import { Palette } from "./Palette";
import { FollowAngle } from "./Controllers/FollowAngle";
import { HoverMove } from "./Controllers/HoverMove";
import { FillRectState } from "./Shapes/Rectangle/FIllRectState";
import { FillRectRenderer } from "./Shapes/Rectangle/FillRectRenderer";
import { GridState } from "./Shapes/Grid/GridState";
import { GridRenderer } from "./Shapes/Grid/GridRenderer";
import { Canvas } from "./Canvas";
import { SectionImage } from "./Controllers/SectionImage";
import { DarkThemeSquareState } from "./Shapes/Square/DarkThemeSquareState";
import Color from "./Core/CustomTypes/Color";
import { GradientData } from "./StyleData";
import { DarkThemeSquareRenderer } from "./Shapes/Square/DarkThemeSquareRenderer";
import LightThemeSquareState from "./Shapes/Square/LightThemeSquareState";
import { LightThemeSquareRenderer } from "./Shapes/Square/LightThemeSquareRenderer";
import { DrawableInterface } from "./Core/Abstract/DrawableInterface";
import BaseDrawable from "./Core/Abstract/BaseDrawable";
import Noise from "./Noise";
import { Point } from "./Core/CustomTypes/Point";
import { easeInOutExpo, easeOutQuad, easeInQuad } from "./Core/CustomTypes/Easing";
import OpacityOverTime from "./Controllers/OpacityOverTime";
import ImageOpacityOverTime from "./Controllers/ImageOpacityHoverTime";
import ResetImageOpacity from "./Controllers/ResetImageOpacity";

export function CanvasSetup(image: HTMLImageElement = null) {

    const htmlCanvas = document.querySelector('canvas');
    const context = htmlCanvas.getContext('2d');

    const imageController = image ? new ResetImageOpacity() : new SectionImage({duration: 12, maxOpacity: 0.5})

    const drawnObject = [
        // Background
        new BaseDrawable(
            new FillRectState({
                style: Palette.BackgroundDark
            }),
            new FillRectRenderer()
        ),
        // Rect 4
        new BaseDrawable(
            new DarkThemeSquareState({
                size: window.innerHeight - 500,
                position: {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2
                },
                angle: Math.PI/4,
                strokeSize: 3,
                strokeColor: Color.fromHex(Palette.SquareDark),
                image: null,
                imageOpacity: 0
            }),
            new DarkThemeSquareRenderer(),
            [],
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
        // Rect 3
        new BaseDrawable(
            new DarkThemeSquareState({
                size: window.innerHeight - 400,
                position: {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2
                },
                angle: Math.PI/4,
                strokeSize: 3,
                strokeColor: Color.fromHex(Palette.SquareDark),
                image: null,
                imageOpacity: 0
            }),
            new DarkThemeSquareRenderer(),
            [],
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
        // Rect 2
        new BaseDrawable(
            new DarkThemeSquareState({
                size: window.innerHeight - 300,
                position: {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2
                },
                angle: Math.PI/4,
                strokeSize: 3,
                strokeColor: Color.fromHex(Palette.SquareDark),
                image: null,
                imageOpacity: 0
            }),
            new DarkThemeSquareRenderer(),
            [],
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
        // Rect 1
        new BaseDrawable(
            new DarkThemeSquareState({
                size: window.innerHeight - 200,
                position: {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2
                },
                angle: Math.PI/4,
                strokeSize: 25,
                strokeColor: Color.fromHex(Palette.SquareDark),
                image,
                imageOpacity: 0.5
            }),
            new DarkThemeSquareRenderer(),
            [],
            [
                new FollowAngle({
                    speed: 0.05
                }),
                new HoverMove({
                    amount: 0.08,
                    speed: 0.05,
                    selector: '.js-hovered-element'
                }),
                imageController
            ]
        ),
        // Grid
        new BaseDrawable(
            new GridState({
                style: Palette.GridDark,
                size: MathFunc.easeInOutSine(window.innerWidth, 40, 24, 1920)
            }),
            new GridRenderer()
        ),
        // Gradient
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

export function LightCanvasSetup(image: HTMLImageElement = null) {

    const htmlCanvas = document.querySelector('canvas');
    const context = htmlCanvas.getContext('2d');

    const gridSize = MathFunc.easeInOutSine(window.innerWidth, 40, 24, 1920);

    const rowsNumber = Math.ceil(window.innerWidth / gridSize) + 1;
    const colsNumber = Math.ceil(window.innerHeight / gridSize) + 1;
    const squares : DrawableInterface[] = [];
    for (let i = 0; i < rowsNumber; i++) {
        for (let j = 0; j < colsNumber; j++) {
            squares.push(generateLightSquare(i, j, gridSize, image))
        }        
    }

    const drawnObject = [
        // Background
        new BaseDrawable(
            new FillRectState({
                style: Palette.BackgroundLight
            }),
            new FillRectRenderer()
        ),
        ...squares,
        // Grid
        new BaseDrawable(
            new GridState({
                style: Palette.GridLight,
                size: gridSize
            }),
            new GridRenderer()
        ),
        // Gradient
        new BaseDrawable(
            new FillRectState({
                style: generateGradient({
                    startCenter: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
                    startRadius: window.innerWidth / 2,
                    endCenter: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
                    endRadius: 0,
                    gradientStop: [
                        { start: 0.0, color: 'rgba(0, 0, 0, 0.1)' },
                        { start: 1.0, color: 'rgba(0, 0, 0, 0.000)' }
                    ]
                }, context)
            }),
            new FillRectRenderer()
        )
    ]

    return new Canvas(drawnObject, htmlCanvas, context);

}

function generateLightSquare(row: number, col: number, size: number, image: HTMLImageElement = null): DrawableInterface {
    const noise = Noise.getSimplex().noise2D(row / 4, col / 4) + 0.2;
    const noiseVar = noise;
    const position = {x: (row - 1) * size + (window.innerWidth % size) / 2 + size / 2, y: col * size + size / 2};
    
    const offsetY = window.innerWidth * 0.15625;
    const offsetX = window.innerHeight * 0.105;
    const radius =  window.innerWidth / 2.25 + 100;

    const points = [
        {x: - offsetX, y: - offsetY},
        {x: window.innerWidth + offsetX, y: - offsetY},
        {x: - offsetX, y: window.innerHeight +  offsetY},
        {x: window.innerWidth + offsetX, y: window.innerHeight +  offsetY}
    ]

    const regularRadiusFactor = points.reduce((acc, cur) => {
        const distToPoint = Point.getDistance(position, cur);
        return acc + (distToPoint > radius ? 0 : easeOutQuad(1 - (distToPoint / radius), 0, 1, 1));
    }, 0)

    const proba = regularRadiusFactor * 0.6 + noiseVar * 0.4;

    let controllers = [];
    if (regularRadiusFactor > 0.3 && proba > 0.3) {
        controllers.push(
            new OpacityOverTime({
                offset: easeInOutExpo(proba, 0, 1, 1),
                overTimeFunc: (offset, time) => Math.sin(offset * Math.PI * 2 + time / 100)
            })
        );
    }

    const imageRadius = window.innerWidth / 4 + window.innerHeight / 2;
    const centerDist = Point.getDistance(position, {x: window.innerWidth / 2, y: window.innerHeight / 2});
    const imageRadiusFactor = centerDist > imageRadius ? 0 : easeInQuad(1 - (centerDist / imageRadius), 0, 1, 1)
    const imageProba = imageRadiusFactor * 0.5 + noiseVar * 0.5;

    if (imageRadiusFactor > 0.3 && imageProba > 0.3) {
        controllers.push(
            image ?
            new ResetImageOpacity() :
            new SectionImage({
                duration: 12,
                maxOpacity: 0.5
            })
        )
        controllers.push(
            new ImageOpacityOverTime({
                offset: Math.random(),
                overTimeFunc: (offset, time) => Math.sin(offset * Math.PI * 2 + time / 100)
            })
        )
    }

    return new BaseDrawable(
        new LightThemeSquareState({
            fillColor: regularRadiusFactor > 0.3 && proba > 0.3 ? Color.fromHex(Palette.SquareLight) : new Color(0, 0, 0, 0),
            size,
            position,
            image: imageRadiusFactor > 0.3 && imageProba > 0.3 ? image : null,
            imageOpacity: 0.5
        }),
        new LightThemeSquareRenderer(),
        [],
        controllers
    )
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