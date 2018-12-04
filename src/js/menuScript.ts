import { ActivationButton } from "./ActivationButton";
import { ScrollManager } from "./ScrollManager";

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

let burgerMenu = new ActivationButton(".nav-burger", ".nav", "hidden");
let scroll = new ScrollManager(3, 500, burgerMenu);

document.querySelector(".scroll").addEventListener("click", () => scroll.Next());