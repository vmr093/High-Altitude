const translate = document.querySelectorAll(".translate");
const big_title = document.querySelector(".big-title");
const header = document.querySelector("header");
const shadow = document.querySelector(".shadow");
const sections = document.querySelectorAll("section"); 
const contents = document.querySelectorAll(".content"); 
const image_containers = document.querySelectorAll(".imgContainer");
const opacityElements = document.querySelectorAll(".opacity");
const borders = document.querySelectorAll(".border");

let header_height = header.offsetHeight;

// Get Contact Section to Stop Parallax Effect
const contactSection = document.querySelector(".contact-section");
let contactY = contactSection.offsetTop;

window.addEventListener("scroll", () => {
    let scroll = window.pageYOffset;

    // Stop parallax effect when reaching Contact Section
    translate.forEach(element => {
        let speed = element.dataset.speed;
        
        if (scroll < contactY - window.innerHeight / 2) {
            element.style.transform = `translateY(${scroll * speed}px)`;
        } else {
            element.style.transform = `translateY(${(contactY - window.innerHeight / 2) * speed}px)`;
        }
    });

    big_title.style.opacity = -scroll / (header_height / 2) + 1;
    shadow.style.height = `${scroll * 0.5 + 300}px`;

    // Loop through each section and apply effects
    sections.forEach((section, index) => {
        let sectionY = section.getBoundingClientRect();
        let section_height = section.offsetHeight;

        // Fade-in effect for all sections
        opacityElements.forEach(element => {
            element.style.opacity = scroll / (sectionY.top + section_height);
        });

        // Apply floating animation to text and images in each section
        if (scroll < contactY - window.innerHeight / 2) {
            if (contents[index] && image_containers[index]) {
                contents[index].style.transform = `translateY(${scroll / (section_height + sectionY.top) * 50 - 50}px)`;
                image_containers[index].style.transform = `translateY(${scroll / (section_height + sectionY.top) * -50 + 50}px)`;
            }

            // Expand border animation for all sections
            if (borders[index]) {
                borders[index].style.width = `${scroll / (sectionY.top + section_height) * 30}%`;
            }
        } else {
            // Stop transformations beyond Contact Us
            if (contents[index] && image_containers[index]) {
                contents[index].style.transform = `translateY(0px)`;
                image_containers[index].style.transform = `translateY(0px)`;
            }

            if (borders[index]) {
                borders[index].style.width = `30%`; // Keep it at a fixed width
            }
        }
    });
});
