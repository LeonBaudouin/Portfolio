import { ActivationButton } from "./ActivationButton";

export class ProjectDetails {
  activationButtons: ActivationButton[];
  current: HTMLElement;

  constructor(projectsButtons: Array<HTMLElement>, projectsDescriptions: Array<HTMLElement>) {

    this.activationButtons = [];

    projectsButtons.forEach((button, index) => {
      this.activationButtons.push(
        new ActivationButton(button, projectsDescriptions[index], "active", this.CheckOthers.bind(this), this.ScrollTo.bind(this))
      );
    });
  }

  private CheckOthers() {
      this.activationButtons.filter((button) => button.isActivated)
                            .forEach(button => button.ToggleActivate());
  }

  private ScrollTo() {
    this.activationButtons.filter((button) => button.isActivated)
                          .forEach(button => this.current = button.target);
    
    window.scrollTo({
      left: 0,
      top: this.current.offsetTop - 40,
      behavior: 'smooth'
    })
  }
}
