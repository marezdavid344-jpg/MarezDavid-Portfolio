gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.querySelector(".theme-toggle");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");
    const contactForm = document.querySelector("#contact-form");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    

    const savedTheme = localStorage.getItem("marez-theme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
    }

    const updateThemeButton = () => {
        if (!themeToggle) return;

        const isDark = body.classList.contains("dark-mode");
        themeToggle.innerHTML = isDark
            ? '<i class="fa-regular fa-sun" aria-hidden="true"></i>'
            : '<i class="fa-regular fa-moon" aria-hidden="true"></i>';

        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );
    };

    updateThemeButton();

    themeToggle?.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        const currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
        localStorage.setItem("marez-theme", currentTheme);
        updateThemeButton();
    });

   

    const closeMenu = () => {
        navLinks?.classList.remove("active");
        body.classList.remove("menu-open");

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
        }
    };

    menuToggle?.addEventListener("click", () => {
        const isOpen = navLinks?.classList.toggle("active") ?? false;

        body.classList.toggle("menu-open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
            : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    });

    navItems.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 850) closeMenu();
    });

    

    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window && sections.length) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                navItems.forEach((link) => {
                    const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
                    link.classList.toggle("active", isCurrent);
                });
            });
        }, {
            rootMargin: "-35% 0px -55% 0px",
            threshold: 0
        });

        sections.forEach((section) => sectionObserver.observe(section));
    }

    

    const hasGSAP = typeof window.gsap !== "undefined";
    const hasScrollTrigger = hasGSAP && typeof window.ScrollTrigger !== "undefined";
if (hasGSAP && !reduceMotion) {
        if (hasScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
        }

        body.classList.add("gsap-ready");

        const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

        heroTimeline
            .from(".home-content .handwritten", {
                y: 18,
                opacity: 0,
                duration: 0.7
            })
            .from(".home-content h1", {
                y: 28,
                opacity: 0,
                duration: 0.8
            }, "-=0.35")
            .from(".home-content h2, .home-content > p", {
                y: 18,
                opacity: 0,
                duration: 0.65,
                stagger: 0.12
            }, "-=0.45")
            .from(".home-buttons .btn, .social-links a", {
                y: 14,
                opacity: 0,
                duration: 0.5,
                stagger: 0.08
            }, "-=0.35")
            .from(".home-visual", {
                x: 35,
                opacity: 0,
                duration: 0.9
            }, "-=0.9");

        if (hasScrollTrigger) {
            gsap.utils.toArray(
                ".about .container, .education .container, .skills .container, .experience .container, .services .container, .projects .container, .achievements .container, .feedback .container, .contact .contact-heading"
            ).forEach((element) => {
                gsap.from(element, {
                    y: 35,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 86%",
                        once: true
                    }
                });
            });

            gsap.utils.toArray(
                ".education-item, .experience-item, .skill-card, .service-card, .project-card, .achievement-card, .feedback-card"
            ).forEach((card, index) => {
                gsap.from(card, {
                    y: 24,
                    opacity: 0,
                    duration: 0.65,
                    delay: (index % 4) * 0.06,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 92%",
                        once: true
                    }
                });
            });
        }
    }

    

    const tiltCards = document.querySelectorAll(".tilt-card");
    const canUseTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (canUseTilt && !reduceMotion) {
        tiltCards.forEach((card) => {
            card.addEventListener("pointermove", (event) => {
                const bounds = card.getBoundingClientRect();
                const x = event.clientX - bounds.left;
                const y = event.clientY - bounds.top;

                const rotateY = ((x / bounds.width) - 0.5) * 7;
                const rotateX = ((0.5 - y / bounds.height) * 7);

                card.style.transform =
                    `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
            });

            card.addEventListener("pointerleave", () => {
                card.style.transform = "";
            });
        });
    }

    const projectImages ={
        "creamy-corner":[
            "images/creamy-corner.png",
            "images/creamy-corner-2.png",
            "images/creamy-corner-3.png",
            "images/creamy-corner-4.png"
        ],
        "mina-jova" :[
            "images/mina-jova.png",
            "images/mina-jova-2.png",
            "images/mina-jova-3.png",
            "images/mina-jova-4.png",
            "images/mina-jova-5.png"
        ],
        "bookito" :[
            "images/bookito.png",
            "images/bookito-2.png",
            "images/bookito-3.png",
            "images/bookito-4.png",
            "images/bookito-5.png",
            "images/bookito-6.png",
            "images/bookito-7.png",
        ]
    }
   

const galleryModal = document.getElementById("galleryModal");
const galleryImage = document.getElementById("galleryImage");
const galleryTitle = document.getElementById("galleryTitle");
const galleryCounter = document.getElementById("galleryCounter");

const galleryClose = document.getElementById("galleryClose");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");

let currentProjectImages = [];
let currentImageIndex = 0;

function showGalleryImage() {
    galleryImage.src = currentProjectImages[currentImageIndex];

    galleryCounter.textContent =
       `${currentImageIndex + 1} / ${currentProjectImages.length}`;

    galleryPrev.disabled = currentImageIndex === 0;
    galleryNext.disabled =
        currentImageIndex === currentProjectImages.length - 1;
}

function openProjectGallery(projectId, projectName) {
    const images = projectImages[projectId];

    if (!images || images.length === 0) return;

    currentProjectImages = images;
    currentImageIndex = 0;

    galleryTitle.textContent = projectName;

    showGalleryImage();

    galleryModal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeProjectGallery() {
    galleryModal.classList.remove("active");
    document.body.style.overflow = "";
}

galleryNext.addEventListener("click", () => {
    if (currentImageIndex < currentProjectImages.length - 1) {
        currentImageIndex++;
        showGalleryImage();
    }
});

galleryPrev.addEventListener("click", () => {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        showGalleryImage();
    }
});

galleryClose.addEventListener("click", closeProjectGallery);

galleryModal.addEventListener("click", (event) => {
    if (event.target === galleryModal) {
        closeProjectGallery();
    }
});

document.addEventListener("keydown", (event) => {
    if (!galleryModal.classList.contains("active")) return;

    if (event.key === "Escape") closeProjectGallery();

    if (event.key === "ArrowRight" &&
        currentImageIndex < currentProjectImages.length - 1) {
        currentImageIndex++;
        showGalleryImage();
    }

    if (event.key === "ArrowLeft" &&
        currentImageIndex > 0) {
        currentImageIndex--;
        showGalleryImage();
    }
});
const projectCards = document.querySelectorAll(
    ".project-card.tilt-card"
);
projectCards.forEach((card)=>{
    card.addEventListener("click",()=>{
        console.log("project cliked",card.dataset.project);
        const projectId = card.dataset.project;

        const projectName = 
        card.querySelector("h3")?.textContent ||"Project Gallery";
        openProjectGallery(projectId,projectName);
    });
});
//     contactForm?.addEventListener("submit", (event) => {
//         event.preventDefault();

//         if (!contactForm.reportValidity()) return;

//         const formData = new FormData(contactForm);
//         const name = formData.get("name").toString().trim();
//         const email = formData.get("email").toString().trim();
//         const subject = formData.get("subject").toString().trim();
//         const message = formData.get("message").toString().trim();
// const emailSubject = encodeURIComponent(subject);
//         const emailBody = encodeURIComponent(
//             Name: ${name}\nEmail: ${email}\n\n${message}
//         );

//         window.location.href =
//             mailto:marezdavid344@gmail.com?subject=${emailSubject}&body=${emailBody};
//     });
});
