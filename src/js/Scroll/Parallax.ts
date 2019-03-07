export class Parallax {

    // Quand
    // ContainerBottom = WindowHeight + containerHeight           ou ContainerTop = innerHeight
    // Alors
    // Offset = 0

    // Quand
    // ContainerBottom = 0
    // Alors
    // Offset = maxOffset

    container: HTMLElement
    image: HTMLElement
    containerHeight: number
    imageHeight: number
    maxOffset: number

    constructor(element: HTMLElement) {

        this.container = element
        const imgSelector = this.container.getAttribute("data-img")
        this.image = this.container.querySelector(imgSelector)

        this.UpdateHeight()
        document.addEventListener("resize", () => this.UpdateHeight())

        this.Update()
        document.addEventListener("scroll", () => this.Update());
    }

    Update(): void {
        console.log(this.Evolution * this.maxOffset)
        this.Translate(this.Evolution * this.maxOffset)
    }

    Translate(amount: number) {
        this.image.style.transform = `translate3d(0, ${-amount}px, 0)`
    }

    UpdateHeight() {
        this.containerHeight = this.ContainerBoundingRect.height
        this.imageHeight = this.image.getBoundingClientRect().height

        this.maxOffset = this.imageHeight - this.containerHeight
    }

    get ContainerBoundingRect(): ClientRect {
        return this.container.getBoundingClientRect()
    }

    get ContainerBottom(): number {
        return this.ContainerBoundingRect.bottom
    }

    get Evolution(): number {
        return 1 - this.ContainerBottom / (window.innerHeight + this.containerHeight)
    }
}