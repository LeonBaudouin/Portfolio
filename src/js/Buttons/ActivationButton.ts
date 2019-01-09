export class ActivationButton {

    className: string;
    button: HTMLElement;
    target: HTMLElement;
    targetClasses: DOMTokenList;
    public isActivated: boolean;

    constructor(buttonSelector: string, targetSelector: string, className: string) {

        this.button = document.querySelector(buttonSelector);
        this.target = document.querySelector(targetSelector);
        this.className = className;

        if(this.target == undefined) {
            throw "No target found with selector " + this.target;
        }
        if(this.button == undefined) {
            throw "No button found with selector " + this.button;
        }

        this.targetClasses = this.target.classList;
        this.isActivated = this.targetClasses.contains(this.className);

        this.BindActivation();
    }


    private BindActivation(): void {
        this.button.addEventListener("click", () => this.ToggleActivate());
    }


    private ToggleActivate(): void {
        
        if(this.isActivated) {
            this.targetClasses.remove(this.className);
        } else {
            this.targetClasses.add(this.className);
        }
        
        this.isActivated = !this.isActivated;
    }
}