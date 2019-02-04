export class ActivationButton {

    className: string;
    button: HTMLElement;
    target: HTMLElement;
    targetClasses: DOMTokenList;
    public isActivated: boolean;

    constructor(button: HTMLElement, target: HTMLElement, className: string, callback?: () => void) {

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
        this.isActivated = this.targetClasses.contains(this.className);

        this.BindActivation(callback);
    }


    private BindActivation(callback? : () => void): void {
        if (callback) {
            this.button.addEventListener("click", callback);
        }
        this.button.addEventListener("click", () => this.ToggleActivate());        
    }


    public ToggleActivate(): void {
        
        if(this.isActivated) {
            this.targetClasses.remove(this.className);
        } else {
            this.targetClasses.add(this.className);
        }
        
        this.isActivated = !this.isActivated;
    }
}