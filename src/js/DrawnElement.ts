interface DrawnElement {
    Draw(ctx : CanvasRenderingContext2D): void;
    style: string | CanvasGradient | CanvasPattern;
}


class TiltedSquare implements DrawnElement {

    style = "#464646";

    Draw() {

    }
}

class StraightSquare implements DrawnElement {

    style = "#b5b5b5";

    Draw() {

    }
}

class Grid implements DrawnElement {

    style = "#333131";

    Draw() {

    }
}