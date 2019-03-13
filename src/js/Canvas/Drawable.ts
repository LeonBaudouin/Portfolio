import {
  Style,
} from "../Utils/CustomTypes";

  export interface Drawable {
    Draw(ctx: CanvasRenderingContext2D): void;
    Update(): void;
    style: Style;
    size: number;
  }

  export interface Interactive {
    UpdateFromCursor(e: MouseEvent): void;
    UpdateFromOrientation(e: DeviceOrientationEvent): void;
  }

  export interface HandleHover {
    OnHoverEnter(e: MouseEvent, elementBoundingRect: ClientRect): void;
    OnHoverMove(e: MouseEvent, elementBoundingRect: ClientRect): void;
    OnHoverExit(e: MouseEvent, elementBoundingRect: ClientRect): void;
  } 