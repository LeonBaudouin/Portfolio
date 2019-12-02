import { AddClassButton } from "./Buttons/ActivationButton";
import { OnePageScroll } from "./Scroll/OnePageScroll";
import { ProjectDisplayer } from "./Buttons/ProjectDisplayer";
import { CopyToClipBoard } from "./Buttons/CopyToClipBoard";
import { OnScrollActivator } from "./Scroll/OnScrollActivator";
import { SwipeLink } from "./Scroll/SwipeLink";
import { RemovePreload } from "./Miscellaneous/PreloadScript";
import { LoadingScreen } from "./Miscellaneous/LoadingScreen";
import { ExecuteFunctionByName } from "./Utils/NonTSFriendlyFuncs";
import { CanvasSetup, LightCanvasSetup } from "./Canvas/CanvasSetup";
import { GetWindowHeight } from "./Utils/UtilsFunctions";
import { EventProvider } from "./Canvas/Core/Events/EventProvider";

class ScriptLoader {
    currentPage: string;

    burgerMenu: AddClassButton;

    displayers: ProjectDisplayer[];
    onePageScroll: OnePageScroll;

    onScrollActivator: OnScrollActivator;

    constructor() {
        this.currentPage = document.body
            .getAttribute("data-page")
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join("");

        this.GeneralScripts();
        ExecuteFunctionByName(`${this.currentPage}Scripts`, this);
    }

    private GeneralScripts() {
        //  Bring the page to the top when you reload it
        window.onbeforeunload = function() {
            window.scrollTo(0, 0);
        };

        RemovePreload();

        let buttonMenu: HTMLElement = document.querySelector(".nav-burger");
        let menu: HTMLElement = document.querySelector(".nav");
        //  Burger Menu
        this.burgerMenu = new AddClassButton(buttonMenu, menu, "hidden");

        // Object that add the "active" class when the user scroll the element
        const lazyLoading = [...document.querySelectorAll(".js-lazy-loading")];
        this.onScrollActivator = new OnScrollActivator(
            lazyLoading,
            lazyLoading.map((element: HTMLElement) =>
                element.dataset.offset
                    ? -window.innerHeight * parseInt(element.dataset.offset)
                    : -window.innerHeight * 0.5
            ),
            element => {
                if (element instanceof HTMLImageElement) {
                    element.src = element.dataset.src;
                }
                if (element instanceof HTMLSourceElement) {
                    element.srcset = element.dataset.srcset;
                }
            }
        );

        //  Bind a automatic copy to clipboard to elements with the class ".js-copy-to-clipboard"
        this.BindClipboardButtons();
    }

    private MainPageScripts() {
        //  Objects that add the classes required to display projects every 7000ms
        const project = new ProjectDisplayer(".photo-projet", ".projets", 7000);
        const lab = new ProjectDisplayer(".photo-lab", ".lab", 7000);

        const pages = document.querySelectorAll(".page");

        const swipeLink = new SwipeLink([
            null,
            "profil.html",
            "projects.html",
            "lab.html"
        ]);

        const activatePages = (i: number) => {
            const page = pages[i];
            swipeLink.updateSlideIndex(i);
            if (!page.classList.contains("active")) {
                page.classList.add("active");
                switch (i) {
                    case 2:
                        project.Activate();
                        break;
                    case 3:
                        lab.Activate();
                        break;
                    default:
                        break;
                }
            }
        };

        //  One Page scroll
        window.addEventListener(
            "load",
            () =>
                (this.onePageScroll = new OnePageScroll(
                    4,
                    500,
                    GetWindowHeight(),
                    [activatePages]
                ))
        );

        //  Bind a one page scroll to the scroll icon and every sections of the scroll bar
        this.BindScrollButons();

        const canvas = CanvasSetup();
    }

    private ProfilePageScripts() {
        // Object that add the "active" class when the user scroll the element
        this.onScrollActivator = new OnScrollActivator(
            [...document.querySelectorAll(".js-activate-on-scroll")],
            window.innerHeight / 4,
            element => {
                element.classList.add("active");
            }
        );

        const canvas = CanvasSetup();
    }

    private ProjectsPageScripts() {
        const projects = document.querySelectorAll(".header, .project");

        const attributeName =
            window.innerWidth < 900
                ? "data-section-phone-image"
                : "data-section-desktop-image";

        const images = [...projects].map(p => {
            const img = new Image();
            const url = p.getAttribute(attributeName);
            if (url == null) return null;
            img.src = url;
            return img;
        });

        const activateProjects = (i: number) => {
            const project = projects[i];
            projects.forEach(p => {
                if (
                    p.classList.contains("active") &&
                    !p.classList.contains("header")
                )
                    p.classList.remove("active");
            });
            project.classList.add("active");
        };

        const changeBackgroundImage = (i: number) => {
            EventProvider.dispatch("change-section-image", images[i]);
        };

        this.BindScrollButons();

        //  One Page scroll
        window.addEventListener(
            "load",
            () =>
                (this.onePageScroll = new OnePageScroll(
                    6,
                    500,
                    GetWindowHeight() * 0.5,
                    [activateProjects, changeBackgroundImage]
                ))
        );
        //  One Page scroll
        const canvas = CanvasSetup();
    }

    private LabPageScripts() {
        const labs = document.querySelectorAll(".header, .lab");

        const attributeName =
            window.innerWidth < 900
                ? "data-section-phone-image"
                : "data-section-desktop-image";

        const images = [...labs].map(p => {
            const img = new Image();
            const url = p.getAttribute(attributeName);
            if (url == null) return null;
            img.src = url;
            return img;
        });

        const activateLabs = (i: number) => {
            const project = labs[i];
            labs.forEach(p => {
                if (
                    p.classList.contains("active") &&
                    !p.classList.contains("header")
                )
                    p.classList.remove("active");
            });
            project.classList.add("active");
        };

        const changeBackgroundImage = (i: number) => {
            EventProvider.dispatch("change-section-image", images[i]);
        };

        this.BindScrollButons();

        //  One Page scroll
        this.onePageScroll = new OnePageScroll(
            6,
            500,
            GetWindowHeight() * 0.5,
            [activateLabs, changeBackgroundImage]
        );
        const canvas = LightCanvasSetup();
    }

    private ProjectShowPageScripts() {
        const header = document.querySelector(".header");
        const img = new Image();
        const url = header.getAttribute(
            window.innerWidth < 900
                ? "data-background-phone-image"
                : "data-background-desktop-image"
        );
        img.src = url;

        const canvas = CanvasSetup(img);
    }

    private LabShowPageScripts() {
        const header = document.querySelector(".header");
        const img = new Image();
        const url = header.getAttribute(
            window.innerWidth < 900
                ? "data-background-phone-image"
                : "data-background-desktop-image"
        );
        img.src = url;

        const canvas = LightCanvasSetup(img);
    }

    private BindScrollButons() {
        const scrollIcon = document.querySelector(".scroll-icon");
        if (scrollIcon) {
            scrollIcon.addEventListener("click", () =>
                this.onePageScroll.Next()
            );
        }

        let scrollBarSections = document.querySelectorAll(
            ".scroll-bar-section"
        );
        for (let i = 0; i < scrollBarSections.length; i++) {
            scrollBarSections[i].addEventListener("click", () =>
                this.onePageScroll.MoveTo(i)
            );
        }
    }

    private BindClipboardButtons() {
        document.querySelectorAll(".js-copy-to-clipboard").forEach(element => {
            new CopyToClipBoard(element, "leondedouin@gmail.com", ".popup");
        });
    }
}

new ScriptLoader();
