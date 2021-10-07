const heroSection = document.querySelector(".hero-section");
const imgFront = document.querySelector(".hero-section__img-front");
const imgMiddle = document.querySelector(".hero-section__img-middle");
const imgBack = document.querySelector(".hero-section__img-back");

window.onload = function () {
    scrollAnimationScale("Quadratic", heroSection, imgFront, 1, 1.1, -400, 400);
    scrollAnimationScale("Quadratic", heroSection, imgMiddle, 1, 1.05, -200, 400);
    scrollAnimationOpacity("Quadratic", heroSection, imgBack, 1, 0, 0, 400);
}

function scrollAnimationScale (growthType, targetContainer, targetElement, startScale, endScale, startYCut, endYCut) {
    let scale = startScale;
    targetElement.style.transform = `scale(${scale})`;

    document.addEventListener("scroll", function () {
        let scrollPos = window.scrollY;
        let targetContainerPos = heroSection.getBoundingClientRect();
        let startY = targetContainerPos.top + startYCut;
        let endY = targetContainerPos.bottom - endYCut;

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
    let newOpacity = startOpacity;
    targetElement.style.opacity = newOpacity;

    document.addEventListener("scroll", function () {
        let scrollPos = window.scrollY;
        let targetContainerPos = heroSection.getBoundingClientRect();
        let startY = targetContainerPos.top + startYCut;
        let endY = targetContainerPos.bottom - endYCut;

        newOpacity = getGrowthValue(growthType, startOpacity, endOpacity, startY, endY, scrollPos);
        //targetElement.style.opacity = newOpacity;
    });

    setInterval(function () {
        if (newOpacity - targetElement.style.opacity >= 0.01) {
            targetElement.style.opacity += 0.01;
        }
        else if (newOpacity - targetElement.style.opacity <= -0.01) {
            targetElement.style.opacity = targetElement.style.opacity+-0.01;
        }
        else {
            targetElement.style.opacity = newOpacity;
        }
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
                (pos - startPos) / (endPos - startPos);

        case "Quadratic":
            return startState + (endState - startState) *
                Math.pow((pos - startPos) / (endPos - startPos), 2);

        case "Exponential":
            return startState * Math.pow(endState / startState, (pos - startPos) / (endPos - startPos));

        // default is linear
        default:
            return startState + (endState - startState) *
                (pos - startPos) / (endPos - startPos);
    }
}