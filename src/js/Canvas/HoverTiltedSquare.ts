import { InteractiveTiltedSquare } from "./InteractiveTiltedSquare";
import { tiltedSquareSettings, Point } from "../Utils/CustomTypes";
import { HandleHover } from "./Drawable";
import { HoveredElement } from "./HoveredElement";
import { MathFunc } from "../Utils/UtilsFunctions";

export class HoverTiltedSquare extends InteractiveTiltedSquare implements HandleHover {
    
    isAnElementHovered: boolean = false;
    hoveredElements: HoveredElement[] = [];
    movementAmount: number;
    
    constructor(squareSettings: tiltedSquareSettings, defaultAngle: number, speed: number, hoveredElements: HTMLElement[], movementAmount: number) {
        super(squareSettings, defaultAngle, speed);

        this.movementAmount = movementAmount;
        this.focusPosition = {x: window.innerWidth/2, y: window.innerHeight/2};

        hoveredElements.forEach((element: HTMLElement) => {
            this.hoveredElements.push(new HoveredElement(element, this));
        })
        
    }

    Update() {
        super.Update()
        this.currentPosition.x += (this.focusPosition.x - this.currentPosition.x) * this.speed;
        this.currentPosition.y += (this.focusPosition.y - this.currentPosition.y) * this.speed;
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

        let elementCenter = this.GetCenterFromClientRect(element);

        this.focusPosition = {
            x: (this.defaultPosition.x * (1 - this.movementAmount) + elementCenter.x * this.movementAmount),
            y: (this.defaultPosition.y * (1 - this.movementAmount) + elementCenter.y * this.movementAmount)
        };
        this.SetFocusAngle(MathFunc.getAngle(elementCenter, this.defaultPosition));
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
            this.SetFocusAngle(MathFunc.getAngle(elementCenter, this.defaultPosition));
        } else {
            this.isAnElementHovered = false;
            
            let elementCenter = this.GetCenterFromClientRect(elementBoundingRect);

            this.focusPosition = this.defaultPosition;
            this.SetFocusAngle(MathFunc.getAngle(elementCenter, this.defaultPosition));
            
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