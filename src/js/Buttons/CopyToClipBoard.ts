export class CopyToClipBoard {
    
    isInput : boolean;

    text : string;
    link : Element;
    popup: Element;
    input : HTMLInputElement;
    classArray : string[];

    constructor(link: Element, text: string, popupSelector: string) {
        this.isInput = false;

        this.popup = document.querySelector(popupSelector);
        this.text = text;
        this.link = link;
        this.classArray = this.link.classList.value.split(" ");

        this.CreateInput();

        this.link.addEventListener("click", this.ClickOnLink.bind(this));
        // document.addEventListener("click", this.ClickElseWhere.bind(this));
    }

    CreateInput() {
        this.input = document.createElement("input");
        this.input.setAttribute("type", "email");
        this.input.setAttribute("spellcheck", "false");
        this.input.setAttribute("value", this.text);
        this.input.classList.add(...this.classArray);
    }

    ClickOnLink(e : Event) {
        e.preventDefault();
        e.stopPropagation();
        this.link.replaceWith(this.input);
        this.Copy();
        this.input.replaceWith(this.link);
        // this.isInput = true;
    }

    Copy() {
        this.popup.classList.add("active");
        setTimeout(
            () => { this.popup.classList.remove("active"); },
            1200
        )
        this.input.select();
        document.execCommand("copy");
    }

    ClickElseWhere(e : Event) {
        if(this.isInput) {
            e.preventDefault();
            e.stopPropagation();
            document.removeEventListener("click", this.ClickElseWhere);
            this.input.replaceWith(this.link);
            this.isInput = false;
        }
    }
}