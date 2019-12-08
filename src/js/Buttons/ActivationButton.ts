export class ActivationButton {

    className: string;
    button: HTMLElement;
    target: HTMLElement;
    targetClasses: DOMTokenList;
    public hasClass: boolean;

    constructor(button: HTMLElement,
                target: HTMLElement,
                className: string,
                callbefore: () => void = () => {},
                callback: () => void = () => {}) {

        this.button = button;
        this.target = target;
        this.className = className;

        if(this.target == undefined) {
            throw "No target found with selector " + this.target;
        }
        if(this.button == undefined) {
            throw "No button found with selector " + this.button;
        }

        this.targetClasses = this.target.classList;
        this.hasClass = this.targetClasses.contains(this.className);

        this.BindActivation(callbefore, callback);
    }


    private BindActivation( callbefore: () => void = () => {},
                            callback: () => void = () => {}): void {

        this.button.addEventListener("click",
            (e: Event) => {
                e.preventDefault();
                callbefore();
                this.ToggleClass();
                callback();
            }
        );        
    }


    public ToggleClass(): void {
        
        if(this.hasClass) {
            this.targetClasses.remove(this.className);
        } else {
            this.targetClasses.add(this.className);
        }
        
        this.hasClass = !this.hasClass;
    }
}