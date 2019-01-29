import { ActivationButton } from "./Buttons/ActivationButton";
import { ScrollManager } from "./Scroll/ScrollManager";
import { ProjectDisplayer } from "./Buttons/ProjectDisplayer";
import { CopyToClipBoard } from "./Buttons/CopyToClipBoard";
import { OnScrollActivator } from "./Scroll/OnScrollActivator";
import Canvas from "./Canvas/Canvas";
import { Parallax } from "./Scroll/Parallax";

class ScriptLoader {

    currentPage: string;

    burgerMenu: ActivationButton;

    displayers: ProjectDisplayer[];
    scrollManager: ScrollManager;

    onScrollActivator: OnScrollActivator;

    constructor() {

        this.currentPage = document.body.getAttribute("data-page");

        this.GeneralScripts();

        if(this.currentPage == "main-page") {

            this.MainPageScripts();

        } else if(this.currentPage == "profil-page") {

            this.ProfilPageScripts();

        } else if(this.currentPage == "projects-page") {

            this.ProjectsPageScripts();

        } else if(this.currentPage == "lab-page") {

            this.LabPageScripts();

        }
    }

    private GeneralScripts() {

        //  Bring the page to the top when you reload it 
        window.onbeforeunload = function () {window.scrollTo(0, 0);};

        //  Burger Menu
        this.burgerMenu = new ActivationButton(".nav-burger", ".nav", "hidden");

        //  Bind a automatic copy to clipboard to elements with the class ".js-copy-to-clipboard" 
        this.BindClipboardButtons();
        
    }

    private MainPageScripts() {

        //  Objects that add the classes required to display projects every 7000ms
        let project = new ProjectDisplayer(".photo-projet", ".projets", 7000);
        let lab = new ProjectDisplayer(".photo-lab", ".lab", 7000);
    
        //  Array that store those objects so they can be used in the scrollManager
        this.displayers = [null, null, project, lab];

        //  One Page scroll
        this.scrollManager = new ScrollManager(4, 500, this.burgerMenu, this.displayers);

        //  Bind a one page scroll to the scroll icon and every sections of the scroll bar
        this.BindScrollButons();

        
        let canvas = new Canvas("canvas");
        canvas.Update();
    }

    private ProfilPageScripts() {

        // Object that add the "active" class when the user scroll the element
        this.onScrollActivator = new OnScrollActivator(".js-activate-on-scroll", window.innerHeight/4);

        let canvas = new Canvas("canvas");
        canvas.Update();
    }
    
    private ProjectsPageScripts() {

        let canvas = new Canvas("canvas");
        canvas.Update();
    }
    
    private LabPageScripts() {

        let parallax: HTMLElement = document.querySelector(".js-parallax");
        let parallaxObject = new Parallax(parallax, 0);

        let canvas = new Canvas("canvas", true);
        canvas.Update();
        
    }






    private BindScrollButons() {
        document.querySelector(".scroll-icon").addEventListener("click", () => this.scrollManager.Next());
        
        let scrollBarSections = document.querySelectorAll(".scroll-bar-section");
        for (let i = 0; i < scrollBarSections.length; i++) {
            scrollBarSections[i].addEventListener("click", () => this.scrollManager.MoveTo(i));    
        }
    }

    private BindClipboardButtons() {
        document.querySelectorAll(".js-copy-to-clipboard").forEach(
            (element) => {
                new CopyToClipBoard(element, "leondedouin@gmail.com", ".popup");
            }
        );
    }
}


new ScriptLoader();