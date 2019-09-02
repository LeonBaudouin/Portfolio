import { AddClassButton } from "./Buttons/ActivationButton";
import { OnePageScroll } from "./Scroll/OnePageScroll";
import { ProjectCarousel } from "./Buttons/ProjectDisplayer";
import { CopyToClipBoard } from "./Buttons/CopyToClipBoard";
import { OnScrollActivator } from "./Scroll/OnScrollActivator";
import Canvas from "./Canvas/Canvas";
import { Parallax } from "./Scroll/Parallax";
import { ProjectDetails } from "./Buttons/ProjectDetails";
import { SwipeLink } from "./Scroll/SwipeLink";
import { RemovePreload } from "./Miscellaneous/PreloadScript";
import { LoadingScreen } from "./Miscellaneous/LoadingScreen";
import { ExecuteFunctionByName } from "./Utils/NonTSFriendlyFuncs";

class ScriptLoader {

    currentPage: string;

    burgerMenu: AddClassButton;

    displayers: ProjectCarousel[];
    onePageScroll: OnePageScroll;

    onScrollActivator: OnScrollActivator;

    constructor() {
        this.currentPage = document.body
            .getAttribute("data-page")
            .split("-")
            .map((word) =>  word.charAt(0).toUpperCase() + word.slice(1))
            .join('');
 
        this.GeneralScripts();
        LoadingScreen.Load(() => ExecuteFunctionByName(`${this.currentPage}Scripts`, this));
    }

    private GeneralScripts() {

        //  Bring the page to the top when you reload it 
        window.onbeforeunload = function () {window.scrollTo(0, 0);};

        RemovePreload();

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
        this.onePageScroll = new OnePageScroll(4, 500, this.burgerMenu, this.displayers);

        let swipeLink = new SwipeLink(this.onePageScroll, [null, "profil.html", "projects.html", "lab.html"]);

        //  Bind a one page scroll to the scroll icon and every sections of the scroll bar
        this.BindScrollButons();
        
        let canvas = new Canvas("canvas");
        canvas.Update();
    }

    private ProfilePageScripts() {

        // Object that add the "active" class when the user scroll the element
        this.onScrollActivator = new OnScrollActivator(".js-activate-on-scroll", window.innerHeight/4);

        let canvas = new Canvas("canvas");
        canvas.Update();
    }
    
    private ProjectsPageScripts() {

        this.onScrollActivator = new OnScrollActivator(".js-activate-on-scroll", window.innerHeight/4);

        let projectDescriptionArray = Array.prototype.slice.call(document.querySelectorAll(".project"));
        let projectButtonArray = Array.prototype.slice.call(document.querySelectorAll(".project-short"));

        new ProjectDetails(projectButtonArray, projectDescriptionArray);
        document.querySelectorAll(".js-parallax").forEach(
            (parallaxElem: HTMLElement) => {
                new Parallax(parallaxElem);
            }
        )

        let canvas = new Canvas("canvas");
        canvas.Update();
    }
    
    private LabPageScripts() {
        
        this.onScrollActivator = new OnScrollActivator(".js-activate-on-scroll", window.innerHeight/4);

        let projectDescriptionArray = Array.prototype.slice.call(document.querySelectorAll(".lab"));
        let projectButtonArray = Array.prototype.slice.call(document.querySelectorAll(".lab-short"));

        new ProjectDetails(projectButtonArray, projectDescriptionArray);
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
        document.querySelector(".scroll-icon").addEventListener("click", () => this.onePageScroll.Next());
        
        let scrollBarSections = document.querySelectorAll(".scroll-bar-section");
        for (let i = 0; i < scrollBarSections.length; i++) {
            scrollBarSections[i].addEventListener("click", () => this.onePageScroll.MoveTo(i));    
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