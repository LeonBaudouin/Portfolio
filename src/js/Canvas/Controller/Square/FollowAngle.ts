import { ControllerInterface } from "../ControllerInterface";
import { SquareState } from "../../State/SquareState";
import { ListenEvent } from "../../EventListeners/SimpleEventListener";
import { MouseMoveListener } from "../../EventListeners/MouseMoveListener";
import { DeviceOrientationListener } from "../../EventListeners/DeviceOrientationListener";
import { MathFunc } from "../../../Utils/UtilsFunctions";

export class FollowAngle implements ControllerInterface {
    
    private mouseMoveListener: ListenEvent;
    private deviceOrientationListener: ListenEvent;
    private supportDeviceOrientation: boolean = false;
    private focusAngle: number;
    private speed: number;

    public constructor({speed = 0.05} : FollowAngleConfig) {
        this.speed = speed;

        if(window.innerWidth < 900) {
            this.supportDeviceOrientation = true;
        }

        this.mouseMoveListener = MouseMoveListener.getInstance();
        this.deviceOrientationListener = DeviceOrientationListener.getInstance();
    }

    
    public Update(currentState: SquareState, defaultState: SquareState): SquareState {
        this.ChangeFocusAngle(defaultState);
        const newState = currentState.Clone();
        newState.angle = this.GetNewSquareAngleFromState(currentState);
        return newState;
    }

    private ChangeFocusAngle(defaultState: SquareState) {
        if (this.focusAngle == null) {
            this.focusAngle = defaultState.angle;
        }
        
        this.SetFocusAngleFromMousePosition(defaultState)

        if(this.supportDeviceOrientation) {
            this.SetFocusAngleFromDeviceOrientation(defaultState);
        }
    }

    private GetNewSquareAngleFromState(currentState: SquareState): number {
        return currentState.angle + (this.focusAngle - currentState.angle) * this.speed;
    }

    private SetFocusAngleFromMousePosition(defaultState : SquareState) {
        const mousePosition = this.mouseMoveListener.getValue();
        const angle = MathFunc.getAngle(defaultState.position, mousePosition);
        this.SetFocusAngle(angle, defaultState.angle);
    }

    private SetFocusAngleFromDeviceOrientation(defaultState : SquareState) {
        const deviceOrientation = this.deviceOrientationListener.getValue();
        this.SetFocusAngle(deviceOrientation * Math.PI / 180, defaultState.angle);
    }
    
    private SetFocusAngle(newAngle: number, defaultAngle: number) {
    
        let previousAngle = this.focusAngle;
        let delta = newAngle - previousAngle  + defaultAngle;

        while(Math.abs(delta) > Math.PI/4) {
        if(delta > 0) {
            defaultAngle -= Math.PI/2;
        } else {
            defaultAngle += Math.PI/2;
        }
        delta = newAngle - previousAngle  + defaultAngle;
        }

        this.focusAngle += delta;
    }
}

interface FollowAngleConfig {
    speed: number
}