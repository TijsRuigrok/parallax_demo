class Animation {
    get animationFunction() { return this._animationFunction; }
    get startState() { return this._startState; }
    get endState() { return this._endState; }
    get easingType() { return this._easingType; }
    get durationMs() { return this._durationMS; }
    get ticks() { return this._ticks; }

    constructor(animationFunction, startState, endState, easingType, durationMS, ticks) {
        this._animationFunction = animationFunction;
        this._startState = startState;
        this._endState = endState;
        this._easingType = easingType;
        this._durationMS = durationMS;
        this._ticks = ticks;
    }
}

const landscapeContainer = document.querySelector("#js--landscape-container"),
    landscapeImgFront = document.querySelector("#js--landscape-img-front"),
    landscapeImgMiddle = document.querySelector("#js--landscape-img-middle"),
    landscapeImgBack = document.querySelector("#js--landscape-img-back");

const sunsetContainer = document.querySelector("#js--sunset-container"),
    sunsetImgBack = document.querySelector("#js--sunset-img-back"),
    sunsetImgSun = document.querySelector("#js--sunset-img-sun");

window.onload = function () {
    const animation1 = new Animation(scale, 1, 1.3, "Linear", 4000, 200);
    initAnimation(animation1, landscapeImgFront, landscapeContainer);
}

function initAnimation (animation, targetElement, targetContainer) {
    let containerReached = false;

    animation.animationFunction(targetElement, animation.startState);

    window.addEventListener("scroll", function () {

        if (window.scrollY >= getTopPos(targetContainer) && !containerReached) {
            animate(animation, targetElement);
            containerReached = true;
        }
    });
}

function getTopPos(element) {
    let rect = element.getBoundingClientRect(),
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect.top + scrollTop;
}

function animate (animation, targetElement) {

    const delay = animation.durationMs / animation.ticks;
    let timePassed = 0;
    let state = animation.startState;

    const interval = setInterval(function () {
        timePassed += delay;
        if (state >= animation.endState) clearInterval(interval);

        state = easing(animation.easingType, animation.startState, animation.endState, timePassed, animation.durationMs);
        animation.animationFunction(targetElement, state);
    }, delay);
}

function scale (targetElement, scale) {
    targetElement.style.transform = `scale(${scale})`;
}

function opacity (targetElement, opacity) {
    targetElement.style.opacity = opacity;
}

function position (targetElement, position) {
    targetElement.style.left = position[0];
    targetElement.style.top = position[1];
}

function easing (type, startState, endState, timePassed, duration) {

    switch (type) {
        case "Linear":
            return startState + (endState - startState) * timePassed / duration;

        case "Quadratic":
            return startState + (endState - startState) * Math.pow(timePassed / duration, 2);

        default:
            return startState + (endState - startState) * timePassed / duration; // Linear
    }
}