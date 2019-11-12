import { ControllerInterface } from "../Core/Abstract/ControllerInterface";
import { StateObjectInterface } from "../Core/Abstract/StateObjectInterface";
import ImageState from "../BaseStates/ImageState";

type ImageStateType = StateObjectInterface & ImageState

export default class ResetImageOpacity implements ControllerInterface {

    Update(currentState: ImageStateType, defaultState: ImageStateType): ImageStateType {
        const newState = <ImageStateType>currentState.Clone();
        newState.imageOpacity = defaultState.imageOpacity;
        return newState;
    }
}