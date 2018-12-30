import { ActivationButton } from "./ActivationButton";
import { ScrollManager } from "./ScrollManager";
import { ProjectDisplayer } from "./ProjectDisplayer";
import { CopyToClipBoard } from "./CopyToClipBoard";


window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

let burgerMenu = new ActivationButton(".nav-burger", ".nav", "hidden");

document.querySelectorAll(".copy-to-clipboard").forEach(
    (element) => {
        new CopyToClipBoard(element, "leondedouin@gmail.com");
    }
);

let currentPage = document.body.getAttribute("data-page");

if(currentPage == "main-page") {
    let project = new ProjectDisplayer(".photo-projet", ".projets", 7000);
    let lab = new ProjectDisplayer(".photo-lab", ".lab", 7000);
    let displayers = [null, null, project, lab];


    let scrollBarSections = document.querySelectorAll(".scroll-bar-section");
    let scroll = new ScrollManager(4, 500, burgerMenu, displayers);
    document.querySelector(".scroll-icon").addEventListener("click", () => scroll.Next());

    for (let i = 0; i < scrollBarSections.length; i++) {
        scrollBarSections[i].addEventListener("click", () => scroll.MoveTo(i));    
    }
}






