/**
 * Nodewise Main Interactions
 * Coordinates scroll triggers, card tilts, hamburger menus, and page transitions.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize general UI
  initHeaderScroll();
  initMobileMenu();
  initCardTilts();
  initPortfolioModal();
  initContactForm();
  initCapabilitiesCarousel();

  // Register GSAP ScrollTrigger
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    initScrollAnimations();
  }
});

/* ==========================================================================
   NAVIGATION & HEADER INTERACTION
   ========================================================================== */
function initCapabilitiesCarousel() {
  const track = document.getElementById("capabilities-track");
  const prevBtn = document.getElementById("cap-prev-btn");
  const nextBtn = document.getElementById("cap-next-btn");
  const dots = document.querySelectorAll(".cap-dot");
  if (!track || !prevBtn || !nextBtn || dots.length === 0) return;

  let currentIndex = 0;
  const totalSlides = dots.length;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
    updateCarousel();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });
  });
}
function initHeaderScroll() {
  const header = document.querySelector(".main-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

function initMobileMenu() {
  const toggle = document.getElementById("mobile-menu-toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  const closeMenu = () => {
    toggle.classList.remove("active");
    menu.classList.remove("active");
  };

  // Toggle sidebar open/close
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    menu.classList.toggle("active");
  });

  // Close menu when clicking any link inside (nav-link or CTA button)
  const allLinks = menu.querySelectorAll("a");
  allLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Close sidebar when clicking outside it (on the backdrop area)
  document.addEventListener("click", (e) => {
    if (menu.classList.contains("active") && !menu.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   INTERACTIVE 3D CARD TILT EFFECT
   ========================================================================== */
function initCardTilts() {
  const cards = document.querySelectorAll(".founder-card, .portfolio-mockup");

  cards.forEach(card => {
    // Determine tilt intensity based on size
    const isMockup = card.classList.contains("portfolio-mockup");
    const intensity = isMockup ? 12 : 8;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // cursor x position inside element
      const y = e.clientY - rect.top;  // cursor y position inside element

      const xc = rect.width / 2;
      const yc = rect.height / 2;

      const dx = x - xc;
      const dy = y - yc;

      // Calculate rotation angle (max degree = intensity)
      const tiltX = -(dy / yc) * intensity;
      const tiltY = (dx / xc) * intensity;

      // Apply transform with perspective for depth
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.boxShadow = `
        ${-tiltY * 1.5}px ${tiltX * 1.5}px 30px rgba(122, 47, 247, 0.12),
        0 15px 35px rgba(0, 0, 0, 0.04)
      `;
    });

    card.addEventListener("mouseleave", () => {
      // Return to base state with smooth animation transition
      card.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      card.style.boxShadow = "var(--shadow-sm)";
    });

    card.addEventListener("mouseenter", () => {
      // Remove transitions while inside card to prevent laggy dragging response
      card.style.transition = "none";
    });
  });
}

/* ==========================================================================
   GSAP SCROLL TRIGGERED TIMELINES
   ========================================================================== */
function initScrollAnimations() {
  // Fade-in sections
  const fadeUpSections = document.querySelectorAll(".section-header, .capabilities-grid, .about-grid, .quality-grid, .founder-card");

  fadeUpSections.forEach(section => {
    gsap.fromTo(section,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // Stagger reveal capability cards
  gsap.fromTo(".capability-card",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".capabilities-grid",
        start: "top 80%"
      }
    }
  );

  // Portfolio items parallax scroll reveal
  const portfolioItems = document.querySelectorAll(".portfolio-item-card");
  portfolioItems.forEach(item => {
    const media = item.querySelector(".portfolio-media");
    const info = item.querySelector(".portfolio-info");

    gsap.fromTo(media,
      { opacity: 0, x: item.classList.contains("inverted") ? 40 : -40 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 75%"
        }
      }
    );

    gsap.fromTo(info,
      { opacity: 0, x: item.classList.contains("inverted") ? -40 : 40 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 75%"
        }
      }
    );
  });

  // Creative timeline path height scrolling binding
  const processTimeline = document.querySelector(".process-timeline");
  if (processTimeline) {
    const timelineProgress = document.getElementById("timeline-progress-bar");

    gsap.fromTo(timelineProgress,
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: processTimeline,
          start: "top 30%",
          end: "bottom 70%",
          scrub: true
        }
      }
    );

    // Active state highlighting for steps along timeline
    const steps = document.querySelectorAll(".process-step");
    steps.forEach((step, idx) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top 55%",
        end: "bottom 55%",
        onEnter: () => step.classList.add("active"),
        onLeaveBack: () => step.classList.remove("active"),
        toggleActions: "play reverse play reverse"
      });
    });
  }

  // Soft fade for team founders
  gsap.fromTo(".founder-card",
    { opacity: 0, scale: 0.95, y: 20 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: ".team-grid",
        start: "top 80%"
      }
    }
  );

  // Hero elements entering
  gsap.fromTo(".hero-content > *",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.2,
      scrollTrigger: {
        trigger: "#hero"
      }
    }
  );
}

/* ==========================================================================
   PORTFOLIO 3D RING MODAL SHOWCASE DATA & INTERACTION
   ========================================================================== */
const portfolioShowcases = {
  "case-01": {
    meta: "Case Study 01 // Digital Agency Platform",
    title: "Mavenix: High-Conversion Digital Marketing Agency Showcase",
    description: "A high-performance presentation engine engineered for Mavenix Studio. The page focuses on turning small businesses into big brands through custom strategy audits, creative social campaigns, paid ad overlays, and sleek conversion funnels.",
    link: "https://mavenixstudio.netlify.app/",
    images: [
      "assets/mavenix-hero.png",
      "assets/mavenix-about.png",
      "assets/mavenix-services.png"
    ]
  },
  "case-02": {
    meta: "Case Study 02 // 3D Interactive Real Estate",
    title: "Titan Residences: Interactive 3D Luxury Real Estate Prototype",
    description: "An immersive digital showcase designed for Titan Residences. The interactive platform features 3D floor plan hotspots, a live sky-mansion showroom, dynamic day-to-night lighting simulation, and real-time residential availability tracking.",
    link: "https://titan-bigs.vercel.app",
    images: [
      "assets/titan-hero.png",
      "assets/titan-blueprint.png",
      "assets/titan-features.png",
      "assets/titan-amenities.png",
      "assets/titan-residence.png"
    ]
  },
  "case-03": {
    meta: "Case Study 03 // Open Source Community Hub",
    title: "FOSS CEAL: Open Source College Club Platform",
    description: "A custom hub engineered for the FOSS CEAL club at the College of Engineering Attingal. The platform hosts training portals for Design/Figma (Create 101) and Development/AI (Train 303), interactive event directories, and download hubs for brand kits.",
    link: "https://foss.ceal.in/",
    images: [
      "assets/fossceal-landing.png",
      "assets/fossceal-portal.png",
      "assets/fossceal-create.png",
      "assets/fossceal-train.png",
      "assets/fossceal-branding.png"
    ]
  }
};

function initPortfolioModal() {
  const modal = document.getElementById("portfolio-modal");
  if (!modal) return;

  const mockups = document.querySelectorAll(".clickable-mockup");
  const closeBtn = document.getElementById("modal-close-btn");
  const backdrop = document.getElementById("modal-backdrop");

  const modalMeta = document.getElementById("modal-project-meta");
  const modalTitle = document.getElementById("modal-project-title");
  const modalDesc = document.getElementById("modal-project-description");
  const modalLink = document.getElementById("modal-project-link");
  const ring = document.getElementById("carousel-ring");

  const prevBtn = document.getElementById("carousel-prev-btn");
  const nextBtn = document.getElementById("carousel-next-btn");
  const counterText = document.getElementById("carousel-counter-text");

  let currentProjectId = "";
  let activeIndex = 0;
  let rotationAngle = 0;
  let numCards = 5;
  let angleStep = 360 / 5;

  // Dragging states
  let isDragging = false;
  let startX = 0;
  let startAngle = 0;
  const dragSensitivity = 0.5;

  // Open modal handler
  mockups.forEach(mockup => {
    mockup.addEventListener("click", () => {
      const projId = mockup.getAttribute("data-project-id");
      const data = portfolioShowcases[projId];
      if (!data) return;

      currentProjectId = projId;
      activeIndex = 0;
      rotationAngle = 0;
      numCards = data.images.length;
      angleStep = 360 / numCards;

      // Populate static modal info
      modalMeta.textContent = data.meta;
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.description;
      modalLink.href = data.link;

      // In case Lucide needs to refresh inside visit link
      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }

      // Generate 5 3D cards
      ring.innerHTML = "";

      let translateZ = 320;
      if (window.innerWidth <= 480) {
        translateZ = 200;
      } else if (window.innerWidth <= 768) {
        translateZ = 230;
      }

      data.images.forEach((imgSrc, idx) => {
        const card = document.createElement("div");
        card.className = `carousel-card ${idx === 0 ? 'active-card' : ''}`;
        card.setAttribute("data-card-index", idx);

        const angle = idx * angleStep;
        card.style.transform = `rotateY(${angle}deg) translateZ(${translateZ}px)`;

        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = `${data.title} slide ${idx + 1}`;
        img.loading = "lazy";

        card.appendChild(img);
        ring.appendChild(card);

        // Click individual card to bring it front, or open lightbox if already in front
        card.addEventListener("click", () => {
          if (isDragging) return;
          if (idx === activeIndex) {
            openLightbox(imgSrc);
          } else {
            activeIndex = idx;
            rotateToActiveIndexShortestPath();
          }
        });
      });

      // Show modal
      modal.classList.add("active");
      document.body.classList.add("modal-open");

      updateCounter();

      // Reset rotation Angle directly on initial open
      rotationAngle = 0;
      alignRingToActiveIndex();
    });
  });

  // Lightbox elements & functions
  const lightbox = document.getElementById("image-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close-btn");
  const lightboxBackdrop = document.getElementById("lightbox-backdrop");

  function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add("active");
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("active");
  }

  if (lightboxClose && lightboxBackdrop) {
    lightboxClose.addEventListener("click", closeLightbox);
    lightboxBackdrop.addEventListener("click", closeLightbox);
  }

  // Close modal handler
  const closeModal = () => {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
    closeLightbox();
    ring.innerHTML = "";
  };

  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);

  // Prev / Next controls
  prevBtn.addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + numCards) % numCards;
    rotateToActiveIndexShortestPath();
  });

  nextBtn.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % numCards;
    rotateToActiveIndexShortestPath();
  });

  // Calculate rotation shortest path to target active index
  function rotateToActiveIndexShortestPath() {
    // Explicitly restore transition timings for smooth programmatic snaps
    ring.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    const cards = ring.querySelectorAll(".carousel-card");
    cards.forEach(card => {
      card.style.transition = "transform 0.6s, opacity 0.6s, filter 0.6s";
    });

    const currentWrappedAngle = rotationAngle % 360;
    const targetWrappedAngle = -activeIndex * angleStep;

    let diff = targetWrappedAngle - currentWrappedAngle;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    rotationAngle = rotationAngle + diff;
    alignRingToActiveIndex();
  }

  // Align the ring rotation based on the active index
  function alignRingToActiveIndex() {
    ring.style.transform = `rotateY(${rotationAngle}deg)`;

    const cards = ring.querySelectorAll(".carousel-card");
    cards.forEach((card, idx) => {
      if (idx === activeIndex) {
        card.classList.add("active-card");
      } else {
        card.classList.remove("active-card");
      }
    });

    updateCounter();
  }

  function updateCounter() {
    counterText.textContent = `${activeIndex + 1} / ${numCards}`;
  }

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "ArrowLeft") {
      activeIndex = (activeIndex - 1 + numCards) % numCards;
      rotateToActiveIndexShortestPath();
    } else if (e.key === "ArrowRight") {
      activeIndex = (activeIndex + 1) % numCards;
      rotateToActiveIndexShortestPath();
    } else if (e.key === "Escape") {
      if (lightbox && lightbox.classList.contains("active")) {
        closeLightbox();
      } else {
        closeModal();
      }
    }
  });

  // Drag-to-rotate interaction handlers
  const stage = document.querySelector(".carousel-3d-stage");

  const onDragStart = (xPos) => {
    isDragging = false;
    startX = xPos;
    startAngle = rotationAngle;
  };

  const onDragMove = (xPos) => {
    const deltaX = xPos - startX;

    // Lazy disable transitions ONLY when active dragging starts (prevents blocking simple clicks)
    if (Math.abs(deltaX) > 5 && !isDragging) {
      isDragging = true;
      ring.style.transition = "none";
      const cards = ring.querySelectorAll(".carousel-card");
      cards.forEach(card => {
        card.style.transition = "none";
      });
    }

    if (isDragging) {
      const angleOffset = deltaX * dragSensitivity;
      rotationAngle = startAngle + angleOffset;
      ring.style.transform = `rotateY(${rotationAngle}deg)`;
    }
  };

  const onDragEnd = () => {
    if (isDragging) {
      ring.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
      const cards = ring.querySelectorAll(".carousel-card");
      cards.forEach(card => {
        card.style.transition = "transform 0.6s, opacity 0.6s, filter 0.6s";
      });

      const rawIndex = -rotationAngle / angleStep;
      const roundedIndex = Math.round(rawIndex);

      rotationAngle = -roundedIndex * angleStep;
      activeIndex = ((roundedIndex % numCards) + numCards) % numCards;

      alignRingToActiveIndex();

      setTimeout(() => {
        isDragging = false;
      }, 50);
    } else {
      isDragging = false;
    }
  };

  // Mouse bindings
  stage.addEventListener("mousedown", (e) => {
    onDragStart(e.clientX);

    const onMouseMove = (moveEvent) => {
      onDragMove(moveEvent.clientX);
    };

    const onMouseUp = () => {
      onDragEnd();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  });

  // Touch bindings for mobile
  stage.addEventListener("touchstart", (e) => {
    if (e.touches.length > 0) {
      onDragStart(e.touches[0].clientX);
    }
  }, { passive: true });

  stage.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      onDragMove(e.touches[0].clientX);
    }
  }, { passive: true });

  stage.addEventListener("touchend", () => {
    onDragEnd();
  }, { passive: true });
}

/* ==========================================================================
   CONTACT FORM SUBMISSION WITH AJAX (NO REDIRECT)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contact-consult-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Disable button to prevent double submit
    const submitBtn = form.querySelector("button[type='submit']");
    if (!submitBtn) return;

    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = "<span>Sending Request...</span>";

    const formData = new FormData(form);

    const actionUrl = form.getAttribute("action") || "https://formsubmit.co/rulesmashpros@gmail.com";
    const ajaxUrl = actionUrl.includes("/ajax/") ? actionUrl : actionUrl.replace("formsubmit.co/", "formsubmit.co/ajax/");

    fetch(ajaxUrl, {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;

        // Reset form
        form.reset();

        // Show beautiful realistic success message popup
        alert("Consultation request submitted successfully! Our engineering team will get back to you within one business day.");
      })
      .catch(error => {
        console.error("Error submitting form:", error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;

        // Fallback message
        alert("Oops! There was an issue submitting your request. Please try again or reach out directly at +919446998827.");
      });
  });
}


