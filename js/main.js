let lastScrollPos = window.scrollY;
let scale = 1;
let x = -1;

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

document.addEventListener("scroll", function(e) {
    let currentScrollPos = window.scrollY;
    let heroSection = document.querySelector(".hero-section");
    let heroSectionPos = heroSection.getBoundingClientRect();
    let imgFront = document.querySelector(".hero-section__img-front");

    if (currentScrollPos > heroSectionPos.top && currentScrollPos < heroSectionPos.bottom) {

        let heroSectionHeight = heroSection.offsetHeight;

        //scale += (currentScrollPos - lastScrollPos) * (1.3 - 1) / heroSectionHeight;
        scale = 1 + (1.3 - 1) * (currentScrollPos - heroSectionPos.top) / heroSectionHeight

        if (scale > 1.3) {
            scale = 1.3;
        }

        else if (scale < 1)
        {
            scale = 1;
        }

        imgFront.style.transform = `scale(${scale})`;
        lastScrollPos = currentScrollPos;
    }
});