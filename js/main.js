const heroSection = document.querySelector(".hero-section");
const imgFront = document.querySelector(".hero-section__img-front");
const imgMiddle = document.querySelector(".hero-section__img-middle");
const imgBack = document.querySelector(".hero-section__img-back");

const heroSection2 = document.querySelector(".hero-section2");
const imgBack2 = document.querySelector(".hero-section__img-front2");

window.onload = function () {
    // scrollAnimationScale("Quadratic", heroSection, imgFront, 1, 1.2, -400, 400);
    scrollAnimationScale("Quadratic", heroSection, imgMiddle, 1, 1.1, -200, 400);
    scrollAnimationScale("Quadratic", heroSection, imgBack, 1, 1.05, 0, 400);
    scrollAnimationScale("Linear", heroSection, imgFront, 1, 1.2, 0, 200);
}

function getTopPos(element) {
    var rect = element.getBoundingClientRect(),
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect.top + scrollTop;
}

function scrollAnimationScale (growthType, targetContainer, targetElement, startScale, endScale, startYCut, endYCut,) {
    let scale = startScale;
    targetElement.style.transform = `scale(${scale})`;

    document.addEventListener("scroll", function () {
        targetContainer.style.position = "relative";

        let targetContainerPos = targetContainer.getBoundingClientRect();
        let startY = getTopPos(targetContainer) + startYCut;
        let endY = getTopPos(targetContainer) + endYCut;
        let scrollPos = window.scrollY;


        //console.log(scrollPos)
        //if(scrollPos < endY) {
        targetContainer.style.position = "sticky";
        //}
        //else {
        //    targetContainer.style.position = "relative";
        //    scrollPos = endY;
        //}

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

function scrollAnimationOpacity (growthType, targetContainer, targetElement, startOpacity, endOpacity, startYCut, endYCut) {
    let opacity = startOpacity;
    targetElement.style.opacity = opacity;

    document.addEventListener("scroll", function () {
        let targetContainerPos = targetContainer.getBoundingClientRect();
        let startY = targetContainerPos.top + startYCut;
        let endY = targetContainerPos.bottom - endYCut;
        let scrollPos = window.scrollY;

        opacity = getGrowthValue(growthType, startOpacity, endOpacity, startY, endY, scrollPos);
        targetElement.style.opacity = opacity;
    });
}

function scrollAnimationPosition (growthType, targetContainer, targetElement, startPosition, endPosition, startYCut, endYCut) {
    let position = startPosition;
    targetElement.style.left = position + '%';

    document.addEventListener("scroll", function () {
        let scrollPos = window.scrollY;
        let targetContainerPos = targetContainer.getBoundingClientRect();

        let startY = targetContainerPos.top + startYCut;
        let endY = targetContainerPos.bottom - endYCut;

        position = getGrowthValue(growthType, startPosition, endPosition, startY, endY, scrollPos);
        targetElement.style.left = position + '%';
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