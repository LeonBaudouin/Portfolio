import { ControllerInterface } from "../ControllerInterface";
import { SquareState } from "../../State/SquareState";
import { HoverElementListener } from "../../EventListeners/HoverElementListener";

export class HoverImage implements ControllerInterface {

    private hoverElementListener: HoverElementListener;
    private duration: number;
    private imageSelector: string;
    private maxOpacity: number;

    private currentImage: HTMLImageElement;
    private currentTime: number;
    private fadeState: FadeState;

    constructor({selector = '.js-hovered-element', imageSelector = '.js-hovered-image', duration = 20, maxOpacity = 0.7} : HoverImageConfig) {
        this.hoverElementListener = HoverElementListener.getInstance(selector);
        this.duration = duration;
        this.imageSelector = imageSelector;
        this.maxOpacity = maxOpacity;

        this.currentTime = 0;
        this.currentImage = null;
        this.fadeState = FadeState.None;
    }

    public Update(currentState: SquareState, defaultState: SquareState): SquareState {
        const image = this.getImage();

        switch (this.fadeState) {
            case FadeState.In:
                this.UpdateFadeIn(image);
                break;
            case FadeState.Out:
                this.UpdateFadeOut(image);
                break;
            case FadeState.Between:
                this.UpdateFadeBetween(image);
                break;
            case FadeState.None:
                this.UpdateFadeNone(image);
                break;
            default:
                break;
        }

        const opacity = this.getOpacity();
        const newState = currentState.Clone();
        newState.imageOpacity = opacity;
        newState.image = this.currentImage;

        return newState;
    }

    private getImage() : HTMLImageElement {
        const hoveredElements = this.hoverElementListener.getValue();
        let image = null;
        if (hoveredElements.length > 0) {
            image = <HTMLImageElement>hoveredElements[0].querySelector(this.imageSelector);
        }
        return image;
    }

    private UpdateFadeIn(image: HTMLImageElement) {
        if (this.currentTime >= this.duration) {
            this.currentTime = 0;
            this.fadeState = FadeState.Between;
        } else {
            this.currentTime++;
        }
    }

    private UpdateFadeOut(image: HTMLImageElement) {
        if (this.currentTime >= this.duration) {
            this.currentTime = 0;
            this.fadeState = FadeState.None;
            this.currentImage = null;
        } else {
            this.currentTime++;
        }
    }

    private UpdateFadeNone(image: HTMLImageElement) {
        if (image != null) {
            this.fadeState = FadeState.In;
            this.currentImage = image;
        }
    }

    private UpdateFadeBetween(image: HTMLImageElement) {
        if (image != this.currentImage) {
            this.fadeState = FadeState.Out;
        }
    }

    private getOpacity() {
        if (this.fadeState == FadeState.In) {
            return this.currentTime / this.duration * this.maxOpacity;
        }
        if (this.fadeState == FadeState.Out) {
            return (1 - (this.currentTime / this.duration)) * this.maxOpacity;
        }
        if (this.fadeState == FadeState.Between) {
            return this.maxOpacity;
        }
        if (this.fadeState == FadeState.None) {
            return 0;
        }
    }
    
}

interface HoverImageConfig {
    selector: string,
    imageSelector: string,
    duration: number,
    maxOpacity: number
}

enum FadeState {
    In,
    Out,
    Between,
    None
}