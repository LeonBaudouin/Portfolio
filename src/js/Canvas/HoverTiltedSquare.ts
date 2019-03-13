import { InteractiveTiltedSquare } from "./InteractiveTiltedSquare";
import { tiltedSquareSettings, Point } from "../Utils/CustomTypes";
import { HandleHover } from "./Drawable";
import { HoveredElement } from "./HoveredElement";
import { MathFunc } from "../Utils/UtilsFunctions";

export class HoverTiltedSquare extends InteractiveTiltedSquare implements HandleHover {
    
    isAnElementHovered: boolean = false;
    hoveredElements: HoveredElement[] = [];
    
    constructor(squareSettings: tiltedSquareSettings, defaultAngle: number, sensitivity: number, hoveredElements: HTMLElement[]) {
        super(squareSettings, defaultAngle, sensitivity);

        hoveredElements.forEach((element: HTMLElement) => {
            this.hoveredElements.push(new HoveredElement(element, this));
        })
        
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
        
        let elementCenter: Point = {
            x: element.left + element.width/2,
            y: element.top + element.height/2 
        }

        this.focusAngle = MathFunc.getAngle(elementCenter, this.position);
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
            console.log(this.offsetAngle);
        }

        
        let elementCenter: Point = {
            x: element.left + element.width/2,
            y: element.top + element.height/2 
        }

        this.focusAngle = MathFunc.getAngle(elementCenter, this.position);
    }
}