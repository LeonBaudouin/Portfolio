import { TiltedSquareSettings, Point } from "../../../Utils/CustomTypes";
import { HandleHover } from "../Drawable";
import { HoveredElement } from "./HoveredElement";
import { MathFunc } from "../../../Utils/UtilsFunctions";
import { TiltedSquareAnimation } from "./TiltedSquareAnimation";
import { TiltedSquare } from "./TiltedSquare";

export class HoverAnimation extends TiltedSquareAnimation implements HandleHover {
    
    
    isAnElementHovered: boolean = false;
    hoveredElements: HoveredElement[] = [];
    movementAmount: number;
    
    constructor(tiltedSquare: TiltedSquare, hoveredElements: HTMLElement[], movementAmount: number) {
        super(tiltedSquare);
        
        this.movementAmount = movementAmount;

        hoveredElements.forEach((element: HTMLElement) => {
            this.hoveredElements.push(new HoveredElement(element, this));
        })
    }

    Update(): void {
    }

    OnHoverEnter(e: MouseEvent, element: ClientRect): void {
        this.isAnElementHovered = true;

        let elementCenter = this.GetCenterFromClientRect(element);

        this.focusPosition = {
            x: (this.defaultPosition.x * (1 - this.movementAmount) + elementCenter.x * this.movementAmount),
            y: (this.defaultPosition.y * (1 - this.movementAmount) + elementCenter.y * this.movementAmount)
        };
        this.tiltedSquare.SetFocusAngle(MathFunc.getAngle(elementCenter, this.defaultPosition));
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

            let elementCenter = this.GetCenterFromClientRect(element);

            this.focusPosition = {
                x: (this.defaultPosition.x + elementCenter.x) * this.movementAmount,
                y: (this.defaultPosition.y + elementCenter.y) * this.movementAmount
            };
            this.tiltedSquare.SetFocusAngle(MathFunc.getAngle(elementCenter, this.defaultPosition));
        } else {
            this.isAnElementHovered = false;
            
            let elementCenter = this.GetCenterFromClientRect(elementBoundingRect);

            this.focusPosition = this.defaultPosition;
            this.tiltedSquare.SetFocusAngle(MathFunc.getAngle(elementCenter, this.defaultPosition));
            
            console.log(this)
        }
    }

    GetCenterFromClientRect(clientRect: ClientRect): Point {
        const elementCenter: Point = {
            x: clientRect.left + clientRect.width/2,
            y: clientRect.top + clientRect.height/2 
        }

        if(elementCenter.x === this.defaultPosition.x
            && elementCenter.y === this.defaultPosition.y) {

            elementCenter.x += 1;
        }

        return elementCenter;
    }
}