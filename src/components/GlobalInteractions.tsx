"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure GSAP registers ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GlobalInteractions() {
  const pathname = usePathname();

  useEffect(() => {
    // Clean up old ScrollTriggers on route change
    ScrollTrigger.getAll().forEach(t => t.kill());

    initCardTilts();
    initCapabilitiesCarousel();
    initPortfolioModal();
    initContactForm();
    initScrollAnimations();

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [pathname]);

  function initCapabilitiesCarousel() {
    const track = document.getElementById("capabilities-track");
    const prevBtn = document.getElementById("cap-prev-btn");
    const nextBtn = document.getElementById("cap-next-btn");
    const dots = document.querySelectorAll(".cap-dot");
    if (!track || !prevBtn || !nextBtn || dots.length === 0) return;

    let currentIndex = 0;
    const totalSlides = dots.length;

    function updateCarousel() {
      if(track) track.style.transform = `translateX(-${currentIndex * 100}%)`;
      const currentDots = document.querySelectorAll(".cap-dot");
      currentDots.forEach(dot => dot.classList.remove("active"));
      if (currentDots[currentIndex]) {
        currentDots[currentIndex].classList.add("active");
      }
    }

    const onPrev = () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
      updateCarousel();
    };
    const onNext = () => {
      currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
      updateCarousel();
    };

    // Remove old listeners to prevent duplicates on strict mode / re-renders
    const newPrevBtn = prevBtn.cloneNode(true);
    const newNextBtn = nextBtn.cloneNode(true);
    prevBtn.parentNode?.replaceChild(newPrevBtn, prevBtn);
    nextBtn.parentNode?.replaceChild(newNextBtn, nextBtn);
    
    newPrevBtn.addEventListener("click", onPrev);
    newNextBtn.addEventListener("click", onNext);

    dots.forEach((dot, index) => {
      const newDot = dot.cloneNode(true) as HTMLElement;
      dot.parentNode?.replaceChild(newDot, dot);
      newDot.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
      });
    });
  }

  function initCardTilts() {
    const cards = document.querySelectorAll<HTMLElement>(".founder-card, .portfolio-mockup");

    cards.forEach(card => {
      const isMockup = card.classList.contains("portfolio-mockup");
      const intensity = isMockup ? 12 : 8;

      card.onmousemove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xc = rect.width / 2;
        const yc = rect.height / 2;

        const dx = x - xc;
        const dy = y - yc;

        const tiltX = -(dy / yc) * intensity;
        const tiltY = (dx / xc) * intensity;

        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.boxShadow = `
          ${-tiltY * 1.5}px ${tiltX * 1.5}px 30px rgba(122, 47, 247, 0.12),
          0 15px 35px rgba(0, 0, 0, 0.04)
        `;
      };

      card.onmouseleave = () => {
        card.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        card.style.boxShadow = "var(--shadow-sm)";
      };

      card.onmouseenter = () => {
        card.style.transition = "none";
      };
    });
  }

  function initScrollAnimations() {
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

      const steps = document.querySelectorAll(".process-step");
      steps.forEach((step) => {
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

  function initPortfolioModal() {
    const modal = document.getElementById("portfolio-modal");
    if (!modal) return;

    const portfolioShowcases: any = {
      "case-01": {
        meta: "Case Study 01 // 3D Interactive Real Estate",
        title: "Titan Residences: Interactive 3D Luxury Real Estate Prototype",
        description: "An immersive digital showcase designed for Titan Residences. The interactive platform features 3D floor plan hotspots, a live sky-mansion showroom, dynamic day-to-night lighting simulation, and real-time residential availability tracking.",
        link: "https://titan-bigs.vercel.app",
        images: [
          "/assets/titan-hero.png",
          "/assets/titan-blueprint.png",
          "/assets/titan-features.png",
          "/assets/titan-amenities.png",
          "/assets/titan-residence.png"
        ]
      },
      "case-02": {
        meta: "Case Study 02 // MVP & Basic Landing Page",
        title: "Mavenix: High-Conversion Digital Marketing Agency MVP",
        description: "A modern, high-performance landing page engineered for Mavenix Studio. Perfect for MVP builders and businesses requiring a basic yet premium landing page. It focuses on turning small businesses into big brands through custom strategy audits and sleek conversion funnels.",
        link: "https://mavenixstudio.netlify.app/",
        images: [
          "/assets/mavenix-hero.png",
          "/assets/mavenix-about.png",
          "/assets/mavenix-services.png"
        ]
      },
      "case-03": {
        meta: "Case Study 03 // Open Source Community Hub",
        title: "FOSS CEAL: Open Source College Club Platform",
        description: "A custom hub engineered for the FOSS CEAL club at the College of Engineering Attingal. The platform hosts training portals for Design/Figma (Create 101) and Development/AI (Train 303), interactive event directories, and download hubs for brand kits.",
        link: "https://foss.ceal.in/",
        images: [
          "/assets/fossceal-landing.png",
          "/assets/fossceal-portal.png",
          "/assets/fossceal-create.png",
          "/assets/fossceal-train.png",
          "/assets/fossceal-branding.png"
        ]
      }
    };

    const mockups = document.querySelectorAll(".clickable-mockup");
    const closeBtn = document.getElementById("modal-close-btn");
    const backdrop = document.getElementById("modal-backdrop");
    const modalMeta = document.getElementById("modal-project-meta");
    const modalTitle = document.getElementById("modal-project-title");
    const modalDesc = document.getElementById("modal-project-description");
    const modalLink = document.getElementById("modal-project-link") as HTMLAnchorElement;
    const ring = document.getElementById("carousel-ring");
    const prevBtn = document.getElementById("carousel-prev-btn");
    const nextBtn = document.getElementById("carousel-next-btn");
    const counterText = document.getElementById("carousel-counter-text");

    if(!ring || !prevBtn || !nextBtn) return;

    let activeIndex = 0;
    let rotationAngle = 0;
    let numCards = 5;
    let angleStep = 360 / 5;
    let isDragging = false;
    let startX = 0;
    let startAngle = 0;
    const dragSensitivity = 0.5;

    mockups.forEach(mockup => {
      mockup.addEventListener("click", () => {
        const projId = mockup.getAttribute("data-project-id");
        if(!projId) return;
        const data = portfolioShowcases[projId];
        if (!data) return;

        activeIndex = 0;
        rotationAngle = 0;
        numCards = data.images.length;
        angleStep = 360 / numCards;

        if(modalMeta) modalMeta.textContent = data.meta;
        if(modalTitle) modalTitle.textContent = data.title;
        if(modalDesc) modalDesc.textContent = data.description;
        if(modalLink) modalLink.href = data.link;

        ring!.innerHTML = "";

        let translateZ = 320;
        if (window.innerWidth <= 480) {
          translateZ = 200;
        } else if (window.innerWidth <= 768) {
          translateZ = 230;
        }

        data.images.forEach((imgSrc: string, idx: number) => {
          const card = document.createElement("div");
          card.className = `carousel-card ${idx === 0 ? 'active-card' : ''}`;
          card.setAttribute("data-card-index", idx.toString());

          const angle = idx * angleStep;
          card.style.transform = `rotateY(${angle}deg) translateZ(${translateZ}px)`;

          const img = document.createElement("img");
          img.src = imgSrc;
          img.alt = `${data.title} slide ${idx + 1}`;
          img.loading = "lazy";

          card.appendChild(img);
          ring!.appendChild(card);

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

        modal.classList.add("active");
        document.body.classList.add("modal-open");
        updateCounter();
        rotationAngle = 0;
        alignRingToActiveIndex();
      });
    });

    const lightbox = document.getElementById("image-lightbox");
    const lightboxImg = document.getElementById("lightbox-img") as HTMLImageElement;
    const lightboxClose = document.getElementById("lightbox-close-btn");
    const lightboxBackdrop = document.getElementById("lightbox-backdrop");

    function openLightbox(src: string) {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = src;
      lightbox.classList.add("active");
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove("active");
    }

    if (lightboxClose && lightboxBackdrop) {
      const newClose = lightboxClose.cloneNode(true);
      const newBackdrop = lightboxBackdrop.cloneNode(true);
      lightboxClose.parentNode?.replaceChild(newClose, lightboxClose);
      lightboxBackdrop.parentNode?.replaceChild(newBackdrop, lightboxBackdrop);
      newClose.addEventListener("click", closeLightbox);
      newBackdrop.addEventListener("click", closeLightbox);
    }

    const closeModal = () => {
      modal.classList.remove("active");
      document.body.classList.remove("modal-open");
      closeLightbox();
      ring!.innerHTML = "";
    };

    if(closeBtn && backdrop) {
      const newCloseBtn = closeBtn.cloneNode(true);
      const newBackdropBtn = backdrop.cloneNode(true);
      closeBtn.parentNode?.replaceChild(newCloseBtn, closeBtn);
      backdrop.parentNode?.replaceChild(newBackdropBtn, backdrop);
      newCloseBtn.addEventListener("click", closeModal);
      newBackdropBtn.addEventListener("click", closeModal);
    }

    const onPrev = () => {
      activeIndex = (activeIndex - 1 + numCards) % numCards;
      rotateToActiveIndexShortestPath();
    };
    const onNext = () => {
      activeIndex = (activeIndex + 1) % numCards;
      rotateToActiveIndexShortestPath();
    };

    const newPBtn = prevBtn.cloneNode(true);
    const newNBtn = nextBtn.cloneNode(true);
    prevBtn.parentNode?.replaceChild(newPBtn, prevBtn);
    nextBtn.parentNode?.replaceChild(newNBtn, nextBtn);
    newPBtn.addEventListener("click", onPrev);
    newNBtn.addEventListener("click", onNext);

    function rotateToActiveIndexShortestPath() {
      ring!.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
      const cards = ring!.querySelectorAll<HTMLElement>(".carousel-card");
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

    function alignRingToActiveIndex() {
      ring!.style.transform = `rotateY(${rotationAngle}deg)`;

      const cards = ring!.querySelectorAll(".carousel-card");
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
      if(counterText) counterText.textContent = `${activeIndex + 1} / ${numCards}`;
    }

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

    const stage = document.querySelector(".carousel-3d-stage");
    if(stage) {
      const newStage = stage.cloneNode(true);
      stage.parentNode?.replaceChild(newStage, stage);

      const onDragStart = (xPos: number) => {
        isDragging = false;
        startX = xPos;
        startAngle = rotationAngle;
      };

      const onDragMove = (xPos: number) => {
        const deltaX = xPos - startX;
        if (Math.abs(deltaX) > 5 && !isDragging) {
          isDragging = true;
          ring!.style.transition = "none";
          const cards = ring!.querySelectorAll<HTMLElement>(".carousel-card");
          cards.forEach(card => card.style.transition = "none");
        }
        if (isDragging) {
          const angleOffset = deltaX * dragSensitivity;
          rotationAngle = startAngle + angleOffset;
          ring!.style.transform = `rotateY(${rotationAngle}deg)`;
        }
      };

      const onDragEnd = () => {
        if (isDragging) {
          ring!.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
          const cards = ring!.querySelectorAll<HTMLElement>(".carousel-card");
          cards.forEach(card => card.style.transition = "transform 0.6s, opacity 0.6s, filter 0.6s");

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

      newStage.addEventListener("mousedown", (e: any) => {
        onDragStart(e.clientX);
        const onMouseMove = (moveEvent: any) => onDragMove(moveEvent.clientX);
        const onMouseUp = () => {
          onDragEnd();
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseup", onMouseUp);
        };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
      });

      newStage.addEventListener("touchstart", (e: any) => {
        if (e.touches.length > 0) onDragStart(e.touches[0].clientX);
      }, { passive: true });

      newStage.addEventListener("touchmove", (e: any) => {
        if (e.touches.length > 0) onDragMove(e.touches[0].clientX);
      }, { passive: true });

      newStage.addEventListener("touchend", () => onDragEnd(), { passive: true });
    }
  }

  function initContactForm() {
    const form = document.getElementById("contact-consult-form") as HTMLFormElement;
    if (!form) return;

    form.onsubmit = (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector("button[type='submit']") as HTMLButtonElement;
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
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
          form.reset();
          alert("Consultation request submitted successfully! Our engineering team will get back to you within one business day.");
        })
        .catch(error => {
          console.error("Error submitting form:", error);
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
          alert("Oops! There was an issue submitting your request. Please try again or reach out directly at +919446998827.");
        });
    };
  }

  return null;
}
