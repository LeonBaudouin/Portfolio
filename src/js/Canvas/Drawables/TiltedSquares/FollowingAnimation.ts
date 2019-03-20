import { MathFunc } from "../../../Utils/UtilsFunctions";
import { MouseMoveListener } from "../../EventListeners/MouseMoveListener";
import { DeviceOrientationListener } from "../../EventListeners/DeviceOrientationListener";
import { ListenEvent } from "../../EventListeners/CustomEventListener";
import { TiltedSquareAnimation } from "./TiltedSquareAnimation";
import { TiltedSquare } from "./TiltedSquare";

export class FollowingAnimation extends TiltedSquareAnimation {

  mouseMoveListener: ListenEvent;
  deviceOrientationListener: ListenEvent;

  supportDeviceOrientation: boolean = false;

  constructor(tiltedSquare: TiltedSquare) {
    super(tiltedSquare);

    if(window.innerWidth < 900) {
      this.supportDeviceOrientation = true;
    }

    this.mouseMoveListener = MouseMoveListener.getInstance();
    this.deviceOrientationListener = DeviceOrientationListener.getInstance();

    let value = 0;
  }

  Update() {
    this.SetFocusAngleFromMousePosition()

    if(this.supportDeviceOrientation) {
      this.SetFocusAngleFromDeviceOrientation();
    }
  }

  SetFocusAngleFromMousePosition() {
    const mousePosition = this.mouseMoveListener.getValue();
    const angle = MathFunc.getAngle(this.defaultPosition, mousePosition);
    this.tiltedSquare.SetFocusAngle(angle);
  }

  SetFocusAngleFromDeviceOrientation() {
    const deviceOrientation = this.deviceOrientationListener.getValue();
    this.tiltedSquare.SetFocusAngle( deviceOrientation * Math.PI / 180);
  }
}
