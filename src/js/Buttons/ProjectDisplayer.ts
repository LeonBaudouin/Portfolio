export class ProjectDisplayer {

    projectList : NodeListOf<Element>;
    illustrationList: NodeListOf<Element>;
    buttonList: NodeListOf<Element>;
    buttonPrevious: Element;
    buttonNext: Element;
    buttonIndicator: Element;
    buttonIndicatorContent: Element;
    buttonMain: Element;
    expositionTime: number;
    currentIndex: number;

    constructor(illustrationSelector: string, sectionSelector: string, expositionTime: number) {

        this.projectList = document.querySelectorAll(sectionSelector + " .description");
        this.illustrationList = document.querySelectorAll(illustrationSelector);
        this.buttonList = document.querySelectorAll(sectionSelector + " .continuer");
        this.expositionTime = expositionTime;
        this.buttonPrevious = document.querySelector(sectionSelector + " .next-project-before");
        this.buttonNext = document.querySelector(sectionSelector + " .next-project-after");
        this.buttonIndicator = document.querySelector(sectionSelector + " .next-project-indicator");
        this.buttonIndicatorContent = document.querySelector(sectionSelector + " .next-project-indicator-current-content");
        this.buttonMain = document.querySelector(sectionSelector + " .next-project-progress");

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

        this.buttonIndicatorContent.textContent = (this.currentIndex + 1).toString();
    }

    async Next() {
        this.currentIndex = (this.currentIndex + 1) % this.projectList.length;
        this.Switch(this.currentIndex);

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
        let buttonClasses: DOMTokenList = this.buttonList[index].classList;

        if(!projectClasses.contains("hide")) {
            projectClasses.add("hide");
            projectClasses.remove("show");
        }

        if(!illusClasses.contains("hide")) {
            illusClasses.add("hide");
            illusClasses.remove("show");
        }

        if(!buttonClasses.contains("hide")) {
            buttonClasses.add("hide");
            buttonClasses.remove("show");
        }

    }

    Show(index: number) {
        let projectClasses: DOMTokenList = this.projectList[index].classList;
        let illusClasses: DOMTokenList = this.illustrationList[index].classList;
        let buttonClasses: DOMTokenList = this.buttonList[index].classList;        

        if(projectClasses.contains("hide")) {
            projectClasses.remove("hide");
            projectClasses.add("show");
        }
        
        if(illusClasses.contains("hide")) {
            illusClasses.remove("hide");
            illusClasses.add("show");
        }

        if(buttonClasses.contains("hide")) {
            buttonClasses.remove("hide");
            buttonClasses.add("show");
        }
    }
}