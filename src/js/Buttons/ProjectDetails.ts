import { AddClassButton } from "./ActivationButton";

export class ProjectDetails {
  activationButtons: AddClassButton[];
  current: HTMLElement;

  constructor(projectsButtons: Array<HTMLElement>,
              projectsDescriptions: Array<HTMLElement>) {

    this.activationButtons = [];

    projectsButtons.forEach((button, index) => {
      this.activationButtons.push(
        new AddClassButton(
          button,
          projectsDescriptions[index],
          "active", 
          this.CheckOthers.bind(this),
          this.ScrollTo.bind(this))
      );
    });
  }

  private CheckOthers() {
      this.activationButtons.filter((button) => button.hasClass)
                            .forEach(button => button.ToggleClass());
  }

  private ScrollTo() {
    this.activationButtons.filter((button) => button.hasClass)
                          .forEach(button => this.current = button.target);
    
    window.scrollTo({
      left: 0,
      top: this.current.offsetTop - 40,
      behavior: 'smooth'
    })
  }
}
