import { ActivationButton } from "./ActivationButton";
import { ScrollManager } from "./ScrollManager";
import { ProjectDisplayer } from "./ProjectDisplayer";
import { CopyToClipBoard } from "./CopyToClipBoard";

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

let burgerMenu = new ActivationButton(".nav-burger", ".nav", "hidden");
let project = new ProjectDisplayer(".project", ".photo-projet", ".projets", 7000);
let scroll = new ScrollManager(4, 500, burgerMenu, project);


document.querySelector(".scroll-icon").addEventListener("click", () => scroll.Next());

let scrollBarSections = document.querySelectorAll(".scroll-bar-section");

for (let i = 0; i < scrollBarSections.length; i++) {
    scrollBarSections[i].addEventListener("click", () => scroll.MoveTo(i));    
}

document.querySelectorAll(".copy-to-clipboard").forEach(
    (element) => {
        new CopyToClipBoard(element, "leondedouin@gmail.com");
    }
);


