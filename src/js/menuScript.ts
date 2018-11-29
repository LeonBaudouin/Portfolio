import { ActivationButton } from "./ActivationButton";
import { ScrollManager } from "./ScrollManager";

update();

function update() {
    let text = Math.max(document.documentElement.clientHeight, window.innerHeight || 0).toString();
    document.querySelector(".indicateur").innerHTML = text;
    requestAnimationFrame(update);
}

let burgerMenu = new ActivationButton(".nav-burger", ".nav", "hidden");
let scroll = new ScrollManager(3, 500, burgerMenu);