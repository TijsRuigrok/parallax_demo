const landscapeContainer = document.querySelector("#js--landscape-container");
const landscapeImgFront = document.querySelector("#js--landscape-img-front");
const landscapeImgMiddle = document.querySelector("#js--landscape-img-middle");
const landscapeImgBack = document.querySelector("#js--landscape-img-back");

window.onload = function () {
    animation(scale, landscapeImgFront, 1, 1.2, 4000);
    // animation(opacity, landscapeImgFront, 0, 1, 4000);
    // animation(position, landscapeImgFront, [10, 10], [40, 40], 4000);
}

function animation (animationFunction, targetElement, startValue, endValue, durationMs, ticks = 200) {
    let value = startValue;
    animationFunction(targetElement, value);    // TODO: check if right kind of function

    const delay =  durationMs / ticks;
    let timePassed = 0;

    const interval = setInterval(function () {
        timePassed += delay;
        if (value >= endValue) clearInterval(interval);

        value = startValue + (endValue - startValue) * timePassed / durationMs;
        animationFunction(targetElement, value);
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