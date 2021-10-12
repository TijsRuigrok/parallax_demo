const heroSection = document.querySelector(".hero-section");
const imgFront = document.querySelector(".hero-section__img-front");
const imgMiddle = document.querySelector(".hero-section__img-middle");
const imgBack = document.querySelector(".hero-section__img-back");

const heroSection2 = document.querySelector(".hero-section2");
const imgBack2 = document.querySelector(".hero-section2__img-back");
const imgSun = document.querySelector(".hero-section2__img-sun");
const imgFront2 = document.querySelector(".hero-section2__img-front");

const imgTrees = document.querySelector(".hero-section2__img-trees");
const imgReflection = document.querySelector(".hero-section2__img-reflection");

window.onload = function () {
    scrollAnimationScale("Quadratic", true, heroSection, imgBack, 1, 1.05, 0, 400);
    scrollAnimationScale("Quadratic", true, heroSection, imgMiddle, 1, 1.1, -200, 400);
    scrollAnimationScale("Linear", true, heroSection, imgFront, 1.05, 1.2, 0, 400);

    scrollAnimationPosition(
        "Quadratic",
        true,
        heroSection2, imgSun,
        50, 60,
        40, 60,
        0, 400);

    scrollAnimationScale(
        "Linear",
        true,
        heroSection2, imgSun,
        1.4, 1.4,
        0, 400);

    scrollAnimationOpacity(
        "Linear",
        true,
        heroSection2, imgSun,
        1, 0,
        0, 600);

    scrollAnimationOpacity(
        "Quadratic",
        true,
        heroSection2, imgBack2,
        1, 0,
        0, 600);
}

function getTopPos(element) {
    let rect = element.getBoundingClientRect(),
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect.top + scrollTop;
}

function scrollAnimationScale (growthType = "Linear", sticky = false,  targetContainer, targetElement, startScale, endScale, startYCut, endYCut,) {
    let scale = startScale;
    targetElement.style.transform = `scale(${scale})`;

    document.addEventListener("scroll", function () {

        if (sticky) targetContainer.style.position = "relative";

        let startY = getTopPos(targetContainer) + startYCut;
        let endY = getTopPos(targetContainer) + endYCut;
        let scrollPos = window.scrollY;

        if (sticky) targetContainer.style.position = "sticky";

        scale = getGrowthValue(growthType, startScale, endScale, startY, endY, scrollPos);
        targetElement.style.transform = `scale(${scale})`;
    });

    // setInterval(function () {
    //
    //     let targetElementScale = targetElement.getBoundingClientRect().width / targetElement.offsetWidth;
    //
    //     let a = 1;
    //
    //     if (scale - targetElementScale >= a) {
    //         targetElement.style.transform = `scale(${targetElementScale + a})`;
    //     }
    //     else if (scale - targetElementScale <= -a) {
    //         targetElement.style.transform = `scale(${targetElementScale - a})`;
    //     }
    //     else {
    //         targetElement.style.transform = `scale(${scale})`;
    //     }
    // });
}

function scrollAnimationOpacity (growthType, sticky, targetContainer, targetElement, startOpacity, endOpacity, startYCut, endYCut) {
    let opacity = startOpacity;
    targetElement.style.opacity = opacity;

    document.addEventListener("scroll", function () {
        let targetContainerPos = targetContainer.getBoundingClientRect();

        if (sticky) targetContainer.style.position = "relative";

        let startY = getTopPos(targetContainer) + startYCut;
        let endY = getTopPos(targetContainer) + endYCut;
        let scrollPos = window.scrollY;

        if (sticky) targetContainer.style.position = "sticky";

        opacity = getGrowthValue(growthType, startOpacity, endOpacity, startY, endY, scrollPos);
        targetElement.style.opacity = opacity;
    });
}

function scrollAnimationPosition (growthType, sticky, targetContainer, targetElement, startPositionX, endPositionX, startPositionY, endPositionY, startYCut, endYCut,) {
    let positionX = startPositionX;
    let positionY = startPositionY;

    let targetElementHeight = targetElement.getBoundingClientRect().height;
    let targetElementWidth = targetElement.getBoundingClientRect().width;

    targetElement.style.marginTop = -targetElementHeight / 2 + 'px';
    targetElement.style.marginLeft = -targetElementWidth / 2 + 'px';

    targetElement.style.left = positionX + '%';
    targetElement.style.top = positionY + '%';


    document.addEventListener("scroll", function () {
        if (sticky) targetContainer.style.position = "relative";

        let startY = getTopPos(targetContainer) + startYCut;
        let endY = getTopPos(targetContainer) + endYCut;
        let scrollPos = window.scrollY;

        if (sticky) targetContainer.style.position = "sticky";

        positionX = getGrowthValue(growthType, startPositionX, endPositionX, startY, endY, scrollPos);
        positionY = getGrowthValue(growthType, startPositionY, endPositionY, startY, endY, scrollPos);

        targetElement.style.left = positionX + '%';
        targetElement.style.top = positionY + '%';

        targetElement.style.marginTop = -targetElementHeight / 2 + 'px';
        targetElement.style.marginLeft = -targetElementWidth / 2 + 'px';
    });
}

function getGrowthValue (growthType, startState, endState, startPos, endPos, pos) {
    if (pos <= startPos) {
        return startState;
    }

    else if(pos >= endPos) {
        return endState;
    }

    switch (growthType) {
        case "Linear":
            return startState + (endState - startState) *
                (pos-startPos) / (endPos - startPos);

        case "Quadratic":
            return startState + (endState - startState) *
                Math.pow((pos-startPos) / (endPos - startPos), 2);

        case "Exponential":
            return startState * Math.pow(endState / startState, (pos - startPos) / (endPos - startPos));

        // default is linear
        default:
            return startState + (endState - startState) *
                (pos-startPos) / (endPos - startPos);
    }
}