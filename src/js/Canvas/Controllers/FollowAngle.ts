import { DeviceOrientationListener } from "../EventListeners/DeviceOrientationListener";
import { MathFunc } from "../../Utils/UtilsFunctions";
import { ControllerInterface } from "../Core/Abstract/ControllerInterface";
import { MouseMoveListener } from "../Core/Events/EventListeners/MouseMoveListener";
import { ListenEvent } from "../Core/Events/EventListeners/SimpleEventListener";
import { DarkThemeSquareState } from "../Shapes/Square/DarkThemeSquareState";

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

    
    public Update(currentState: DarkThemeSquareState, defaultState: DarkThemeSquareState): DarkThemeSquareState {
        this.ChangeFocusAngle(defaultState);
        const newState = currentState.Clone();
        newState.angle = this.GetNewSquareAngleFromState(currentState);
        return newState;
    }

    private ChangeFocusAngle(defaultState: DarkThemeSquareState) {
        if (this.focusAngle == null) {
            this.focusAngle = defaultState.angle;
        }
        
        this.SetFocusAngleFromMousePosition(defaultState)

        if(this.supportDeviceOrientation) {
            this.SetFocusAngleFromDeviceOrientation(defaultState);
        }
    }

    private GetNewSquareAngleFromState(currentState: DarkThemeSquareState): number {
        return currentState.angle + (this.focusAngle - currentState.angle) * this.speed;
    }

    private SetFocusAngleFromMousePosition(defaultState : DarkThemeSquareState) {
        const mousePosition = this.mouseMoveListener.getValue();
        const angle = MathFunc.getAngle(defaultState.position, mousePosition);
        this.SetFocusAngle(angle, defaultState.angle);
    }

    private SetFocusAngleFromDeviceOrientation(defaultState : DarkThemeSquareState) {
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