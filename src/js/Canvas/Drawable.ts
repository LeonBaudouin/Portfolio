import {
  Style,
  Size,
  Palette,
  Point,
  tiltedSquareSettings,
  rotationRoutine
} from "../Utils/CustomTypes";
import { MathFunc } from "../Utils/UtilsFunctions";

  export interface Drawable {
    Draw(ctx: CanvasRenderingContext2D): void;
    style: Style;
    size: number;
  }

  export interface Interactive {
    UpdateFromCursor(e: MouseEvent): void;
    UpdateFromOrientation(e: DeviceOrientationEvent): void;
  }