export class ProjectDisplayer {

    projectList : NodeListOf<Element>;
    illustrationList: NodeListOf<Element>;
    expositionTime: number;

    constructor(projectSelector: string, illustrationSelector: string, expositionTime: number) {

        this.projectList = document.querySelectorAll(projectSelector);
        this.illustrationList = document.querySelectorAll(illustrationSelector);
        this.expositionTime = expositionTime;

        this.Change(0);
    }

    public CycleChange(index: number) {

        console.log(index);

        this.Change(index);

        let nextIndex = (index + 1) % this.projectList.length;

        setTimeout(
            () => this.CycleChange(nextIndex),
            this.expositionTime
        )
    }

    Change(index: number) {
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
        }

        if(!illusClasses.contains("hide")) {
            illusClasses.add("hide");
        }
    }

    Show(index: number) {
        let projectClasses: DOMTokenList = this.projectList[index].classList;
        let illusClasses: DOMTokenList = this.illustrationList[index].classList;

        if(projectClasses.contains("hide")) {
            projectClasses.remove("hide");
        }
        
        if(illusClasses.contains("hide")) {
            illusClasses.remove("hide");
        }
    }
}