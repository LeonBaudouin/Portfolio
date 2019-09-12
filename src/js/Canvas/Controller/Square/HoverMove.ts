import { ControllerInterface } from "../ControllerInterface";
import { SquareState } from "../../State/SquareState";
import { HoverElementListener } from "../../EventListeners/HoverElementListener";
import { Point } from "../../../CustomTypes/Point";

export class HoverMove implements ControllerInterface {

    private selector: string;
    private speed: number;
    private amount: number;
    private hoverElementListener: HoverElementListener;

    public constructor({selector = '.js-hovered-element', speed = 0.05, amount = 0.08} : HoverMoveConfig) {
        this.selector = selector;
        this.speed = speed;
        this.amount = amount;
        this.hoverElementListener = HoverElementListener.getInstance(this.selector);
    }

    public Update(currentState: SquareState, defaultState: SquareState): SquareState {
        const elements = this.hoverElementListener.getValue();
        
        let focusPoint = defaultState.position;
        if (elements.length > 0) {
            const elementCenter = this.GetCenterOfElement(elements[0]);
            focusPoint = {
                x: defaultState.position.x * (1 - this.amount) + elementCenter.x * this.amount,
                y: defaultState.position.y * (1 - this.amount) + elementCenter.y * this.amount
            }
        }
        const x = currentState.position.x + (focusPoint.x - currentState.position.x) * this.speed;
        const y = currentState.position.y + (focusPoint.y - currentState.position.y) * this.speed;
        currentState.position = {x: x, y: y};
        return currentState;
    }

    private GetCenterOfElement(element: Element): Point {
        const clientRect = element.getBoundingClientRect();
        const elementCenter: Point = {
            x: clientRect.left + clientRect.width/2,
            y: clientRect.top + clientRect.height/2
        }

        return elementCenter;
    }
    
}

interface HoverMoveConfig {
    speed: number,
    amount: number,
    selector: string
}