import { ActivationButton } from "./ActivationButton";
import { ScrollManager } from "./ScrollManager";
import { ProjectDisplayer } from "./ProjectDisplayer";

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

let burgerMenu = new ActivationButton(".nav-burger", ".nav", "hidden");
let project = new ProjectDisplayer(".project", ".photo-projet", 7000);
let scroll = new ScrollManager(3, 500, burgerMenu, project);

document.querySelector(".scroll").addEventListener("click", () => scroll.Next());