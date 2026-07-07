gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const loader = document.querySelector(".loader");
const loaderBar = document.querySelector(".loader__bar span");
const cursorGlow = document.querySelector(".cursor-glow");
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav__toggle");
const navMenu = document.querySelector("[data-menu]");
const progressBar = document.querySelector(".scroll-progress");

let lenis;

if (!prefersReducedMotion && window.Lenis) {
  lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.4
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

const loaderTl = gsap.timeline({
  defaults: {
    ease: "power3.out"
  }
});

loaderTl
  .to(loaderBar, {
    width: "100%",
    duration: prefersReducedMotion ? 0.1 : 1
  })
  .to(loader, {
    yPercent: -100,
    duration: prefersReducedMotion ? 0.1 : 0.8,
    ease: "power4.inOut"
  })
  .from(
    ".site-header",
    {
      y: -40,
      opacity: 0,
      duration: 0.7
    },
    "-=0.25"
  )
  .from(
    ".hero .reveal-text, .hero .reveal-fade",
    {
      y: 48,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12
    },
    "-=0.35"
  )
  .from(
    ".hero__visual",
    {
      y: 60,
      opacity: 0,
      rotate: 3,
      duration: 1
    },
    "-=0.75"
  );

if (prefersReducedMotion) {
  loader.style.display = "none";
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) return;

    event.preventDefault();

    navMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");

    if (lenis) {
      lenis.scrollTo(target, {
        offset: -90
      });
    } else {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");

  document.body.classList.toggle("menu-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

let lastScrollY = window.scrollY;

window.addEventListener(
  "scroll",
  () => {
    const currentY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (currentY / docHeight) * 100 : 0;

    progressBar.style.width = `${progress}%`;

    if (currentY > lastScrollY && currentY > 120) {
      header.classList.add("is-hidden");
    } else {
      header.classList.remove("is-hidden");
    }

    lastScrollY = currentY;
  },
  {
    passive: true
  }
);

if (!prefersReducedMotion && cursorGlow) {
  window.addEventListener(
    "mousemove",
    (event) => {
      gsap.to(cursorGlow, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.45,
        ease: "power3.out"
      });
    },
    {
      passive: true
    }
  );
}

const splitText = (element) => {
  const text = element.textContent;
  element.innerHTML = "";

  const wrapper = document.createElement("span");
  wrapper.className = "line-mask";

  text.split(" ").forEach((word) => {
    const span = document.createElement("span");
    span.textContent = `${word} `;
    wrapper.appendChild(span);
  });

  element.appendChild(wrapper);
};

document.querySelectorAll(".section-title").forEach(splitText);

gsap.utils.toArray(".section-title").forEach((title) => {
  const words = title.querySelectorAll(".line-mask span");

  gsap.from(words, {
    yPercent: 110,
    opacity: 0,
    duration: prefersReducedMotion ? 0.01 : 0.9,
    stagger: 0.025,
    ease: "power4.out",
    scrollTrigger: {
      trigger: title,
      start: "top 82%"
    }
  });
});

gsap.utils.toArray(".section-copy p, .section-head .eyebrow, .contact__content p").forEach((item) => {
  gsap.from(item, {
    y: 36,
    opacity: 0,
    duration: prefersReducedMotion ? 0.01 : 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: item,
      start: "top 86%"
    }
  });
});

gsap.utils.toArray(".service-card, .feature-card, .portfolio-card, .timeline-item, .testimonial-card, .accordion-item").forEach((card, index) => {
  gsap.from(card, {
    y: 56,
    opacity: 0,
    duration: prefersReducedMotion ? 0.01 : 0.75,
    delay: (index % 6) * 0.025,
    ease: "power3.out",
    scrollTrigger: {
      trigger: card,
      start: "top 88%"
    }
  });
});

gsap.utils.toArray(".image-reveal").forEach((image) => {
  gsap.from(image, {
    clipPath: "inset(18% 0 18% 0 round 34px)",
    y: 40,
    opacity: 0,
    duration: prefersReducedMotion ? 0.01 : 1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: image,
      start: "top 80%"
    }
  });
});

gsap.to(".orb--one", {
  x: 80,
  y: -70,
  scale: 1.12,
  duration: 8,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

gsap.to(".orb--two", {
  x: -70,
  y: 60,
  scale: 1.08,
  duration: 9,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

gsap.to(".browser-card", {
  y: -24,
  rotate: 1.5,
  duration: 4.5,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

const counters = document.querySelectorAll("[data-counter]");

counters.forEach((counter) => {
  const target = Number(counter.dataset.counter);

  gsap.to(counter, {
    innerText: target,
    duration: prefersReducedMotion ? 0.01 : 2,
    snap: {
      innerText: 1
    },
    ease: "power2.out",
    scrollTrigger: {
      trigger: counter,
      start: "top 90%",
      once: true
    }
  });
});

document.querySelectorAll(".magnetic").forEach((element) => {
  element.addEventListener("mousemove", (event) => {
    if (prefersReducedMotion) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.35,
      ease: "power3.out"
    });
  });

  element.addEventListener("mouseleave", () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.35)"
    });
  });
});

document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    if (prefersReducedMotion) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = ((y / rect.height) - 0.5) * -12;

    gsap.to(card, {
      rotateX,
      rotateY,
      y: -6,
      duration: 0.35,
      ease: "power3.out"
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.45)"
    });
  });
});

const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  const button = item.querySelector(".accordion-btn");
  const panel = item.querySelector(".accordion-panel");
  const icon = button.querySelector("span");

  button.addEventListener("click", () => {
    const isActive = item.classList.contains("is-active");

    accordionItems.forEach((otherItem) => {
      const otherPanel = otherItem.querySelector(".accordion-panel");
      const otherIcon = otherItem.querySelector(".accordion-btn span");

      otherItem.classList.remove("is-active");

      gsap.to(otherPanel, {
        height: 0,
        duration: 0.35,
        ease: "power2.inOut"
      });

      otherIcon.textContent = "+";
    });

    if (!isActive) {
      item.classList.add("is-active");

      gsap.to(panel, {
        height: "auto",
        duration: 0.4,
        ease: "power2.inOut"
      });

      icon.textContent = "-";
    }
  });
});

const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const business = formData.get("business");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const message = formData.get("message");

  const whatsappMessage = encodeURIComponent(
    `Hi CodeWithMech, I want a website for my business.%0A%0AName: ${name}%0ABusiness: ${business}%0APhone: ${phone}%0AEmail: ${email}%0AMessage: ${message}`
  );

  window.open(`[wa.me](https://wa.me/919999999999?text=${whatsappMessage})`, "_blank", "noopener,noreferrer");
});

ScrollTrigger.refresh();
