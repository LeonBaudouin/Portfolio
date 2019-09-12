import { SimpleEventListener, ListenEvent, NativeEventListener } from "./SimpleEventListener";

export class DeviceOrientationListener extends NativeEventListener {

    protected static instance: DeviceOrientationListener;
    protected static value: number = 0;

    public static getInstance(): ListenEvent {
        
        if(DeviceOrientationListener.instance == null)
            DeviceOrientationListener.instance = new DeviceOrientationListener()

        return DeviceOrientationListener.instance;
    }

    private constructor() {
        super("deviceorientation");
    }

    public getValue() {
        return DeviceOrientationListener.value;
    }

    public UpdateValue(e: DeviceOrientationEvent) {
        DeviceOrientationListener.value = e.alpha;
    }

}