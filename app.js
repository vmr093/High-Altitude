const translate = document.querySelectorAll(".translate");
const big_title = document.querySelector(".big-title");
const header = document.querySelector("header");
const shadow = document.querySelector(".shadow");
const sections = document.querySelectorAll("section"); // Get all sections
const contents = document.querySelectorAll(".content"); // Get all content elements
const image_containers = document.querySelectorAll(".imgContainer"); // Get all image containers
const opacityElements = document.querySelectorAll(".opacity");
const borders = document.querySelectorAll(".border"); // Get all section borders

let header_height = header.offsetHeight;

window.addEventListener("scroll", () => {
    let scroll = window.pageYOffset;

    // Parallax effect for images and title
    translate.forEach(element => {
        let speed = element.dataset.speed;
        element.style.transform = `translateY(${scroll * speed}px)`;
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
        if (contents[index] && image_containers[index]) {
            contents[index].style.transform = `translateY(${scroll / (section_height + sectionY.top) * 50 - 50}px)`;
            image_containers[index].style.transform = `translateY(${scroll / (section_height + sectionY.top) * -50 + 50}px)`;
        }

        // Expand border animation for all sections
        if (borders[index]) {
            borders[index].style.width = `${scroll / (sectionY.top + section_height) * 30}%`;
        }
    });
});
