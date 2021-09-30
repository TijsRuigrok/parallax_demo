let lastScrollPos = window.scrollY;
let scale = 1;
let x = -1;

let titleSection = document.querySelector(".title-section");
let titleSectionBottom = titleSection.scrollHeight;
let articleSection = document.querySelector(".article-section");
let articleSectionTop = articleSection.getBoundingClientRect().top;

document.addEventListener("scroll", function(e) {
    let currentScrollPos = window.scrollY;
    let imgFront = document.querySelector(".hero-section__img-front");

    if (currentScrollPos > titleSectionBottom && currentScrollPos < articleSectionTop - titleSectionBottom) {

        if(currentScrollPos > lastScrollPos && scale <= 64) {
            scale = scale * 2;
        }

        else {
            scale = scale / 2;
        }

        imgFront.style.transform = `scale(${scale})`;
    }


    //
    // let title = document.querySelector(".hero-section .hero-title");
    // if (currentScrollPos > lastScrollPos) {
    //     if (x >= -150) {
    //         x = x * 1.5;
    //     }
    // } else {
    //     if (x <= -1.5) {
    //         x = x / 1.5;
    //     }
    // }
    //
    //     title.style.transform = `translateX(${x}%)`;
    //     title.style.opacity = 1;
    //  else {
    //     let title = document.querySelector(".hero-section .hero-title");
    //     title.style.opacity = 0;
    // }
    // lastScrollPos = currentScrollPos;
});