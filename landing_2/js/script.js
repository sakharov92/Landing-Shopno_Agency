


//burger_button transformation
const menuList = document.querySelector("ul.menu");
const btn = document.querySelector(".burger-menu"); addEventListener('click', (e) => {
    if (e.target.closest("div.burger-menu")) {
        btn.classList.contains("active") ? (btn.classList.remove("active"), menuList.classList.remove("active")) : (btn.classList.add("active"), menuList.classList.add("active"));

    }
})



//add google.maps
let map;
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 49.99, lng: 36.22 },
        zoom: 8
    });
}


//smooth menu scrolling
const anchors = document.querySelectorAll('a[href*="#"]')
for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const blockID = anchor.getAttribute('href').substr(1)

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}





//show description in block services
const descriptionButton = document.querySelectorAll(".services-container-block-item__btn");
const closeDescriptionButton = document.querySelectorAll(".services-container-block-item__description");

for (let i of descriptionButton) {
    i.querySelector("a").addEventListener('click', showDescription);
}
for (let i of closeDescriptionButton) {
    i.querySelector("button").addEventListener('click', closeDescription);
}
function closeDescription(e) {
    e.target.closest('.services-container-block-item__wrapper').querySelector('.services-container-block-item__description').classList.remove('active')
}
function showDescription(e) {
    e.target.closest('.services-container-block-item__wrapper').querySelector('.services-container-block-item__description').classList.add('active')
}








//   slider moving /////////////////////////////////////////////////////////////////////////////////////////////////////////////

//picture set   ////////////////////////////////////////////////////////////////////////////////////////////////
const topSLiderArr = ['slider-1-1.png', 'slider-1-2.png', 'slider-1-3.png', 'slider-1-4.png'];
const bottomSLiderArr = ['person_1.png', 'person_2.png', 'person_3.png', 'person_4.png'];


//require dom elements  ////////////////////////////////////////////////////////////////////////////////////////////////
const topSliderImg = document.querySelector(".about-section-left-slider-block__image").querySelector("img");
const bottomSliderImg = document.querySelector(".message-container-block-left-slider-block__image").querySelector("img");

const bottomPositionPointsArr = document.querySelectorAll(".message-container-block-left-slider-position__item");
const positionPointsArr = document.querySelectorAll(".about-section-left-slider-position__item");

const bottomSliderLeftBtn = document.querySelector(".message-container-block-right-btns__left");
const bottomSliderRightBtn = document.querySelector(".message-container-block-right-btns__right");
const topSliderLeftBtn = document.querySelector(".about-section-left-slider-block__buttonLeft");
const topSliderRightBtn = document.querySelector(".about-section-left-slider-block__buttonRight");

//   transform nodeList=>Array   ////////////////////////////////////////////////////////////////////////////////////////////////

const topSliderMarkersArr = Array.prototype.slice.call(document.querySelectorAll(".about-section-left-slider-position__item"));
const bottomSliderMarkersArr = Array.prototype.slice.call(document.querySelectorAll(".message-container-block-left-slider-position__item"));
const massages = Array.prototype.slice.call(document.querySelectorAll(".message-container-block-right-saysSection"));
//  adding listeners   ////////////////////////////////////////////////////////////////////////////////////////////////



//   add functions to slider /////////////////////////////////////////////////////////////////////////////////////////////////
function sliderFunction(leftButton, rightButton, imageArr, imageShell, markers) {

    for (let i of markers) {
        i.addEventListener('click', slide)
    }
    leftButton.addEventListener('click', slide);
    rightButton.addEventListener('click', slide);

    //main slide function
    function slide(e) {
        let currentImgLink = imageShell.getAttribute('src').replace("img/", "");
        let currentImgPosition = imageArr.indexOf(currentImgLink);
        //click on marker
        if (e.target.classList.contains("marker")) {
            if (markers == bottomSliderMarkersArr) {
                moveSlide(markers.indexOf(e.target), true)
            } else {
                moveSlide(markers.indexOf(e.target))
            }
        } else {
            //click on left/right button
            if (rightButton == bottomSliderRightBtn) {
                (e.target == rightButton || e.target.parentElement.parentElement == rightButton) ? slideRight(currentImgPosition, true) : slideLeft(currentImgPosition, true);
            } else {
                (e.target == rightButton || e.target.parentElement.parentElement == rightButton) ? slideRight(currentImgPosition) : slideLeft(currentImgPosition);
            }
        }

        //slide right button function
        function slideRight(currentImgPosition, bool) {
            if (currentImgPosition == imageArr.length - 1) {
                currentImgPosition = -1;
            }
            if (bool) {
                for (let i of massages) {
                    i.classList.remove("active");
                }
                massages[currentImgPosition + 1].classList.add("active");
            }
            moveSlide(currentImgPosition + 1)
        }

        //slide left button function
        function slideLeft(currentImgPosition, bool) {
            if (currentImgPosition == 0) {
                currentImgPosition = imageArr.length;
            }
            if (bool) {
                for (let i of massages) {
                    i.classList.remove("active");
                }

                massages[currentImgPosition - 1].classList.add("active");
            }
            moveSlide(currentImgPosition - 1)
        }

        //change current slide to "e"
        function moveSlide(e, bool) {
            imageShell.parentElement.querySelector("source").srcset = "img/" + imageArr[e];
            imageShell.src = "img/" + imageArr[e];
            changeMarker(e, bool)

        }
        function changeMarker(e, bool) {
            for (let i = 0; i < markers.length; i++) {
                if (bool) { massages[i].classList.remove("active"); }
                markers[i].classList.remove("active");
            }
            if (bool) { massages[e].classList.add("active"); }
            markers[e].classList.add("active");
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

sliderFunction(topSliderLeftBtn, topSliderRightBtn, topSLiderArr, topSliderImg, topSliderMarkersArr);
sliderFunction(bottomSliderLeftBtn, bottomSliderRightBtn, bottomSLiderArr, bottomSliderImg, bottomSliderMarkersArr);