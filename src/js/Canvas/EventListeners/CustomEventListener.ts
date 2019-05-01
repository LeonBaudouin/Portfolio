export interface ListenEvent {
    getValue(): any;
}

export abstract class CustomEventListener implements ListenEvent {
    protected static value: any;
    protected static instance: ListenEvent;

    protected constructor(eventType: string) {
        window.addEventListener(eventType, e => this.UpdateValue(e))
    }
    
    public static getInstance(): ListenEvent {throw new Error("You cannot get instance of an abstract class"); return null}
    abstract getValue(): any
    abstract UpdateValue(e: Event): void
}