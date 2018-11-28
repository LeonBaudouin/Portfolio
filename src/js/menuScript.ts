import { ActivationButton } from "./ActivationButton";
import { ScrollManager } from "./ScrollManager";

let burgerMenu = new ActivationButton(".nav-burger", ".nav", "hidden");
let scroll = new ScrollManager(3, 500, burgerMenu);