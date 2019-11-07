import { ControllerInterface } from "../Core/Abstract/ControllerInterface";
import { EventProvider } from "../Core/Events/EventProvider";
import ImageState from "../BaseStates/ImageState";
import { StateObjectInterface } from "../Core/Abstract/StateObjectInterface";

type ImageStateType = ImageState & StateObjectInterface;

export class DarkThemeSectionImage implements ControllerInterface {

    private slideImage: HTMLImageElement;
    private duration: number;
    private maxOpacity: number;

    private currentImage: HTMLImageElement = null;
    private currentTime: number = 0;
    private fadeState: FadeState = FadeState.None;

    constructor({duration = 20, maxOpacity = 0.7} : HoverImageConfig) {
        this.duration = duration;
        this.maxOpacity = maxOpacity;

        EventProvider.listenTo('change-section-image', (image: HTMLImageElement) => this.slideImage = image);
    }

    public Update(currentState: ImageStateType, defaultState: ImageStateType): ImageStateType {
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
        const newState = <ImageStateType>currentState.Clone();
        newState.imageOpacity = opacity;
        newState.image = this.currentImage;

        return newState;
    }

    private getImage() : HTMLImageElement {
        return this.slideImage;
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
    duration: number,
    maxOpacity: number
}

enum FadeState {
    In,
    Out,
    Between,
    None
}