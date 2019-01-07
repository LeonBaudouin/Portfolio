import { ActivationButton } from "./ActivationButton";
import { ScrollManager } from "./ScrollManager";
import { ProjectDisplayer } from "./ProjectDisplayer";
import { CopyToClipBoard } from "./CopyToClipBoard";
import { OnScrollActivator } from "./OnScrollActivator";


window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

let burgerMenu = new ActivationButton(".nav-burger", ".nav", "hidden");

document.querySelectorAll(".js-copy-to-clipboard").forEach(
    (element) => {
        new CopyToClipBoard(element, "leondedouin@gmail.com", ".popup");
    }
);

let currentPage = document.body.getAttribute("data-page");

if(currentPage == "main-page") {
    MainPage();
} else if(currentPage == "profil-page") {
    ProfilPage();
}

function MainPage() {
    let project = new ProjectDisplayer(".photo-projet", ".projets", 7000);
    let lab = new ProjectDisplayer(".photo-lab", ".lab", 7000);
    
    let displayers = [null, null, project, lab];

    let scroll = new ScrollManager(4, 500, burgerMenu, displayers);

    document.querySelector(".scroll-icon").addEventListener("click", () => scroll.Next());
    
    let scrollBarSections = document.querySelectorAll(".scroll-bar-section");
    for (let i = 0; i < scrollBarSections.length; i++) {
        scrollBarSections[i].addEventListener("click", () => scroll.MoveTo(i));    
    }
}

function ProfilPage() {
    let onScrollActivator = new OnScrollActivator(".js-activate-on-scroll", window.innerHeight/4);
}