export function RemovePreload() {
    let preloadElements = document.querySelectorAll(".preload");

    window.addEventListener("load", () => {
        preloadElements.forEach((el) => {
            el.classList.remove("preload");
        })
    })
}