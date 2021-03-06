export type EasingFunction = (t: number, b: number, c: number, d: number) => number;

export function easeInQuad (t: number, b: number, c: number, d: number) {
    return c*(t/=d)*t + b;
}
export function easeOutQuad (t: number, b: number, c: number, d: number) {
    return -c *(t/=d)*(t-2) + b;
}
export function easeInOutQuad (t: number, b: number, c: number, d: number) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
}
export function easeInCubic (t: number, b: number, c: number, d: number) {
    return c*(t/=d)*t*t + b;
}
export function easeOutCubic (t: number, b: number, c: number, d: number) {
    return c*((t=t/d-1)*t*t + 1) + b;
}
export function easeInOutCubic (t: number, b: number, c: number, d: number) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
}
export function easeInQuart (t: number, b: number, c: number, d: number) {
    return c*(t/=d)*t*t*t + b;
}
export function easeOutQuart (t: number, b: number, c: number, d: number) {
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
}
export function easeInOutQuart (t: number, b: number, c: number, d: number) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
    return -c/2 * ((t-=2)*t*t*t - 2) + b;
}
export function easeInQuint (t: number, b: number, c: number, d: number) {
    return c*(t/=d)*t*t*t*t + b;
}
export function easeOutQuint (t: number, b: number, c: number, d: number) {
    return c*((t=t/d-1)*t*t*t*t + 1) + b;
}
export function easeInOutQuint (t: number, b: number, c: number, d: number) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
    return c/2*((t-=2)*t*t*t*t + 2) + b;
}
export function easeInSine (t: number, b: number, c: number, d: number) {
    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
}
export function easeOutSine (t: number, b: number, c: number, d: number) {
    return c * Math.sin(t/d * (Math.PI/2)) + b;
}
export function easeInOutSine (t: number, b: number, c: number, d: number) {
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
}
export function easeInExpo (t: number, b: number, c: number, d: number) {
    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
}
export function easeOutExpo (t: number, b: number, c: number, d: number) {
    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
}
export function easeInOutExpo (t: number, b: number, c: number, d: number) {
    if (t==0) return b;
    if (t==d) return b+c;
    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
}
export function easeInCirc (t: number, b: number, c: number, d: number) {
    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
}
export function easeOutCirc (t: number, b: number, c: number, d: number) {
    return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
}
export function easeInOutCirc (t: number, b: number, c: number, d: number) {
    if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
}
export function easeInElastic (t: number, b: number, c: number, d: number) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
}
export function easeOutElastic (t: number, b: number, c: number, d: number) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
}
export function easeInOutElastic (t: number, b: number, c: number, d: number) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
}
export function easeInBack (t: number, b: number, c: number, d: number, s: number = 1.70158) {
    return c*(t/=d)*t*((s+1)*t - s) + b;
}
export function easeOutBack (t: number, b: number, c: number, d: number, s: number = 1.70158) {
    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
}
export function easeInOutBack (t: number, b: number, c: number, d: number, s: number = 1.70158) {
    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
}
export function easeOutBounce (t: number, b: number, c: number, d: number) {
    if ((t/=d) < (1/2.75)) {
        return c*(7.5625*t*t) + b;
    } else if (t < (2/2.75)) {
        return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
    } else if (t < (2.5/2.75)) {
        return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
    } else {
        return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
    }
}
