import { AddClassButton } from "./Buttons/ActivationButton";
import { OnePageScroll } from "./Scroll/ScrollManager";
import { ProjectCarousel } from "./Buttons/ProjectDisplayer";
import { CopyToClipBoard } from "./Buttons/CopyToClipBoard";
import { OnScrollActivator } from "./Scroll/OnScrollActivator";
import Canvas from "./Canvas/Canvas";
import { Parallax } from "./Scroll/Parallax";
import { ProjectDetails } from "./Buttons/ProjectDetails";

class ScriptLoader {

    currentPage: string;

    burgerMenu: AddClassButton;

    displayers: ProjectCarousel[];
    scrollManager: OnePageScroll;

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

        } else if(this.currentPage == "description-page") {

            this.DescriptionPageScripts();

        }
    }

    private GeneralScripts() {

        //  Bring the page to the top when you reload it 
        window.onbeforeunload = function () {window.scrollTo(0, 0);};

        let buttonMenu : HTMLElement = document.querySelector(".nav-burger");
        let menu : HTMLElement = document.querySelector(".nav");
        //  Burger Menu
        this.burgerMenu = new AddClassButton(buttonMenu, menu, "hidden");

        //  Bind a automatic copy to clipboard to elements with the class ".js-copy-to-clipboard" 
        this.BindClipboardButtons();
        
    }

    private MainPageScripts() {

        //  Objects that add the classes required to display projects every 7000ms
        let project = new ProjectCarousel(".photo-projet", ".projets", 7000);
        let lab = new ProjectCarousel(".photo-lab", ".lab", 7000);
    
        //  Array that store those objects so they can be used in the scrollManager
        this.displayers = [null, null, project, lab];

        //  One Page scroll
        this.scrollManager = new OnePageScroll(4, 500, this.burgerMenu, this.displayers);

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

        let projectDescriptionArray = Array.prototype.slice.call(document.querySelectorAll(".project"));
        let projectButtonArray = Array.prototype.slice.call(document.querySelectorAll(".project-short"));

        // new ProjectDetails(projectButtonArray, projectDescriptionArray);
        document.querySelectorAll(".js-parallax").forEach(
            (parallaxElem: HTMLElement) => {
                new Parallax(parallaxElem);
            }
        )

        let canvas = new Canvas("canvas");
        canvas.Update();
    }
    
    private LabPageScripts() {

        let projectDescriptionArray = Array.prototype.slice.call(document.querySelectorAll(".lab"));
        let projectButtonArray = Array.prototype.slice.call(document.querySelectorAll(".lab-short"));

        // new ProjectDetails(projectButtonArray, projectDescriptionArray);
        document.querySelectorAll(".js-parallax").forEach(
            (parallaxElem: HTMLElement) => {
                new Parallax(parallaxElem);
            }
        )

        let canvas = new Canvas("canvas", true);
        canvas.Update();
        
    }

    private DescriptionPageScripts() {
        
        let canvas = new Canvas("canvas");
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