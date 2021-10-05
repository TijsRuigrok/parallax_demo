const heroSection = document.querySelector(".hero-section");
const imgFront = document.querySelector(".hero-section__img-front");

let startSize = 1;
let endSize = 1.2;

let startYCut = 0;
let endYCut = 400;

let startY;
let endY;

let maxSize;
let minSize;

let growthType = "Linear";  // Linear, Quadratic or Exponential

let lastScrollPos = window.scrollY;
let scale = startSize;

window.onload = function () {
    maxSize = Math.max(startSize, endSize);
    minSize = Math.min(startSize, endSize);
    imgFront.style.transform = `scale(${scale})`;
    window.scrollTo(0, 0);
}

document.addEventListener("scroll", function(e) {
    let currentScrollPos = window.scrollY;
    let heroSectionPos = heroSection.getBoundingClientRect();

    startY = heroSectionPos.top + startYCut;
    endY = heroSectionPos.bottom - endYCut;

    if (currentScrollPos > startY && currentScrollPos < endY) {

        let heroSectionHeight = heroSection.offsetHeight - endYCut - startYCut;

        switch (growthType) {
            case "Linear":
                scale = startSize + (endSize - startSize) *
                    (currentScrollPos - startY) / heroSectionHeight;
                break;

            case "Quadratic":
                scale = startSize + (endSize - startSize) *
                    Math.pow((currentScrollPos - startY) / heroSectionHeight, 2);
                break;

            case "Exponential":
                scale = startSize * Math.pow(endSize / startSize,(currentScrollPos - startY) / heroSectionHeight);
                break;

            // default is linear
            default:
                scale = startSize + (endSize - startSize) *
                    (currentScrollPos - startY) / heroSectionHeight;
        }

        if (scale > maxSize) {
            scale = maxSize;
        }

        else if (scale < minSize)
        {
            scale = minSize;
        }

        imgFront.style.transform = `scale(${scale})`;
        lastScrollPos = currentScrollPos;
    }
});