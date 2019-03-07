import {
  Style,
} from "../Utils/CustomTypes";

  export interface Drawable {
    Draw(ctx: CanvasRenderingContext2D): void;
    style: Style;
    size: number;
  }

  export interface Interactive {
    UpdateFromCursor(e: MouseEvent): void;
    UpdateFromOrientation(e: DeviceOrientationEvent): void;
  }