import { CustomEventListener, ListenEvent } from "./CustomEventListener";
import { Point } from "../../Utils/CustomTypes";

export class MouseMoveListener extends CustomEventListener {

    protected static instance: MouseMoveListener;
    protected static value: Point = {x: 0, y: 0};

    public static getInstance(): ListenEvent {
        
        if(MouseMoveListener.instance == null)
            MouseMoveListener.instance = new MouseMoveListener()

        return MouseMoveListener.instance;
    }

    private constructor() {
        super("mousemove");
    }

    public getValue() {
        return MouseMoveListener.value;
    }

    public UpdateValue(e: MouseEvent) {
        MouseMoveListener.value = {x: e.clientX, y: e.clientY}
    }

}