import { ActivationButton } from "./ActivationButton";

export class ProjectDetails {
  activationButtons: ActivationButton[];

  constructor(projectsButtons: Array<HTMLElement>, projectsDescriptions: Array<HTMLElement>) {

    this.activationButtons = [];

    projectsButtons.forEach((button, index) => {
      this.activationButtons.push(
        new ActivationButton(button, projectsDescriptions[index], "active", this.CheckOthers.bind(this))
      );
    });
  }

  private CheckOthers() {
      this.activationButtons.filter((button) => button.isActivated)
                            .forEach(button => button.ToggleActivate());
  }
}
