export default class Noise {
    private static simplex: any = null;

    public static getSimplex() {
        if (Noise.simplex == null) {
            const SimplexNoise = require('simplex-noise');
            Noise.simplex = new SimplexNoise(Math.random());
        }
        return Noise.simplex;
    }
}