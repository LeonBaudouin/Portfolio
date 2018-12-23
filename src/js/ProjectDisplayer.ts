export class ProjectDisplayer {

    projectList : NodeListOf<Element>;
    illustrationList: NodeListOf<Element>;
    buttonPrevious: Element;
    buttonNext: Element;
    buttonIndicator: Element;
    buttonIndicatorContent: Element;
    buttonMain: Element;
    expositionTime: number;
    currentIndex: number;

    constructor(projectSelector: string, illustrationSelector: string, buttonSelector: string, expositionTime: number) {

        this.projectList = document.querySelectorAll(projectSelector);
        this.illustrationList = document.querySelectorAll(illustrationSelector);
        this.expositionTime = expositionTime;
        this.buttonPrevious = document.querySelector(buttonSelector + " .next-project-before");
        this.buttonNext = document.querySelector(buttonSelector + " .next-project-after");
        this.buttonIndicator = document.querySelector(buttonSelector + " .next-project-indicator");
        this.buttonIndicatorContent = document.querySelector(buttonSelector + " .next-project-indicator-current-content");
        this.buttonMain = document.querySelector(buttonSelector + " .next-project-progress");

        this.currentIndex = 0;

        this.Switch(this.currentIndex);

        this.BindEventButtons();
    }

    BindEventButtons() {
        this.buttonNext.addEventListener("click", () => (this.Next()));
        this.buttonMain.addEventListener("click", () => (this.Next()));
        this.buttonIndicator.addEventListener("click", () => (this.Next()));
        this.buttonPrevious.addEventListener("click", () => (this.Previous()));
    }

    public Activate() {
        setInterval(() => {
            this.Next()
        }, this.expositionTime);
    }

    async Previous() {
        this.currentIndex = (this.currentIndex + this.projectList.length - 1) % this.projectList.length;
        this.Switch(this.currentIndex);
        console.log(this.currentIndex);

        this.buttonIndicatorContent.textContent = (this.currentIndex + 1).toString();
    }

    async Next() {
        this.currentIndex = (this.currentIndex + 1) % this.projectList.length;
        this.Switch(this.currentIndex);
        console.log(this.currentIndex);

        this.buttonIndicatorContent.textContent = (this.currentIndex + 1).toString();

    }

    Switch(index: number) {
        this.HideAll();
        this.Show(index);
    }



    HideAll() {
        for (let i = 0; i < this.projectList.length; i++) {
            this.Hide(i);
        }
    }

    Hide(index: number) {
        let projectClasses: DOMTokenList = this.projectList[index].classList;
        let illusClasses: DOMTokenList = this.illustrationList[index].classList;

        if(!projectClasses.contains("hide")) {
            projectClasses.add("hide");
            projectClasses.remove("show");
        }

        if(!illusClasses.contains("hide")) {
            illusClasses.add("hide");
            illusClasses.remove("show");
        }

    }

    Show(index: number) {
        let projectClasses: DOMTokenList = this.projectList[index].classList;
        let illusClasses: DOMTokenList = this.illustrationList[index].classList;
        
        if(projectClasses.contains("hide")) {
            projectClasses.remove("hide");
            projectClasses.add("show");
        }
        
        if(illusClasses.contains("hide")) {
            illusClasses.remove("hide");
            illusClasses.add("show");
        }
    }
}