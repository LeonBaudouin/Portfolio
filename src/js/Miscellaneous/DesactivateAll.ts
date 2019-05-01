export function DesactivateAll() {
    const activatedElems = document.querySelectorAll(".active");

    activatedElems.forEach((el) => {
        el.classList.remove("active");
    })
}