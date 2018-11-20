export namespace MathFunc {

    // Ease In and Out function using sinus

    export function easeInOutSine(startA: number, startB: number, deltaB: number, deltaA: number) : number {
        return -deltaB / 2 * (Math.cos(Math.PI * startA / deltaA) - 1) + startB;
    };

}