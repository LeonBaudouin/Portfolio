import { ActivationButton } from "./ActivationButton";
import { ScrollManager } from "./ScrollManager";
import { ProjectDisplayer } from "./ProjectDisplayer";
import { CopyToClipBoard } from "./CopyToClipBoard";
import { OnScrollActivator } from "./OnScrollActivator";

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

    }

    private ProfilPageScripts() {

        // Object that add the "active" class when the user scroll the element
        this.onScrollActivator = new OnScrollActivator(".js-activate-on-scroll", window.innerHeight/4);

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