class Animation {

    #startState;
    endState;
    #easingType;
    #durationMs;
    #ticks;

    constructor(startState, endState, easingType, durationMS, ticks) {
        this.#startState = startState;
        this.endState = endState;
        this.#easingType = easingType;
        this.#durationMs = durationMS;
        this.#ticks = ticks;
    }

    play () {
        const delay = this.#durationMs / this.#ticks;
        let timePassed = 0;
        let state = this.#startState;

        const interval = setInterval(function () {
            timePassed += delay;
            if (state >= this.#endState) clearInterval(interval);

            state = easing(animation.easingType, animation.startState, animation.endState, timePassed, animation.durationMs);
            animation.animationFunction(targetElement, state);
        }, delay);
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