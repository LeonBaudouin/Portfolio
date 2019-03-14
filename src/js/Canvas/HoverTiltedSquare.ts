import { InteractiveTiltedSquare } from "./InteractiveTiltedSquare";
import { tiltedSquareSettings, Point } from "../Utils/CustomTypes";
import { HandleHover } from "./Drawable";
import { HoveredElement } from "./HoveredElement";
import { MathFunc } from "../Utils/UtilsFunctions";

export class HoverTiltedSquare extends InteractiveTiltedSquare implements HandleHover {
    
    isAnElementHovered: boolean = false;
    hoveredElements: HoveredElement[] = [];
    movementAmount: number;
    focusPoint: Point;
    
    constructor(squareSettings: tiltedSquareSettings, defaultAngle: number, speed: number, hoveredElements: HTMLElement[], movementAmount: number) {
        super(squareSettings, defaultAngle, speed);

        this.movementAmount = movementAmount;
        this.focusPoint = {x: window.innerWidth/2, y: window.innerHeight/2};

        hoveredElements.forEach((element: HTMLElement) => {
            this.hoveredElements.push(new HoveredElement(element, this));
        })
        
    }

    Update() {
        super.Update()
        console.log(`focusAngle: ${this.focusAngle}         squareAngle: ${this.squareAngle}`)
    }


    UpdateFromCursor(e: MouseEvent) {
        if(!this.isAnElementHovered) {
            super.UpdateFromCursor(e);
        }
    }

    UpdateFromOrientation(e: DeviceOrientationEvent) {
        if(!this.isAnElementHovered) {
            super.UpdateFromOrientation(e);
        }
    }

    OnHoverEnter(e: MouseEvent, element: ClientRect): void {
        this.isAnElementHovered = true;
        
        let elementCenter = MathFunc.getCenterFromClientRect(element);

        this.focusPoint = elementCenter;
        this.UpdateAngle(MathFunc.getAngle(elementCenter, this.position));
    }

    OnHoverMove(e: MouseEvent, element: ClientRect): void {
        
    }

    OnHoverExit(e: MouseEvent, elementBoundingRect: ClientRect): void {
        let element = this.hoveredElements.reduce(
            (a: ClientRect, c :HoveredElement) => c.isMouseHover ? c.boundingRect : a,
            null
        );

        if(element) {
            this.isAnElementHovered = true;
        } else {
            this.isAnElementHovered = false;
            element = elementBoundingRect;
        }

        let elementCenter = MathFunc.getCenterFromClientRect(element);

        this.focusPoint = elementCenter;
        this.UpdateAngle(MathFunc.getAngle(elementCenter, this.position));
    }
}