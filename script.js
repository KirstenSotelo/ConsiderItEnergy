document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const navLinks = document.querySelector(".nav-links")
  
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("active")
        document.body.classList.toggle("menu-open")
  
        // Toggle hamburger to X
        const spans = this.querySelectorAll("span")
        if (navLinks.classList.contains("active")) {
          spans[0].style.transform = "rotate(-45deg) translate(-5px, 6px)"
          spans[1].style.opacity = "0"
          spans[2].style.transform = "rotate(45deg) translate(-5px, -6px)"
        } else {
          spans[0].style.transform = "none"
          spans[1].style.opacity = "1"
          spans[2].style.transform = "none"
        }
      })
    }
  
    // Close mobile menu when clicking outside
    document.addEventListener("click", (event) => {
      if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(event.target) &&
        !mobileMenuBtn.contains(event.target)
      ) {
        navLinks.classList.remove("active")
        document.body.classList.remove("menu-open")
  
        // Reset hamburger icon
        const spans = mobileMenuBtn.querySelectorAll("span")
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  
    // Fix for nav links not being clickable
    // Get all navigation links
    const navLinksA = document.querySelectorAll(".nav-links a")
  
    // Add click event listener to each link
    navLinksA.forEach((link) => {
      link.addEventListener("click", function (e) {
        // Only prevent default for anchor links (those starting with #)
        if (this.getAttribute("href").startsWith("#") && this.getAttribute("href") !== "#") {
          e.preventDefault()
  
          const targetId = this.getAttribute("href")
          const targetElement = document.querySelector(targetId)
  
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        }
  
        // Close mobile menu if open
        const mobileNav = document.querySelector(".nav-links")
        const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  
        if (mobileNav.classList.contains("active")) {
          mobileNav.classList.remove("active")
          document.body.classList.remove("menu-open")
  
          // Reset hamburger icon
          if (mobileMenuBtn) {
            const spans = mobileMenuBtn.querySelectorAll("span")
            spans[0].style.transform = "none"
            spans[1].style.opacity = "1"
            spans[2].style.transform = "none"
          }
        }
      })
    })
  
    // Testimonial Slider
    const slides = document.querySelectorAll(".testimonial-slide")
    const dots = document.querySelectorAll(".dot")
    const prevBtn = document.querySelector(".prev-btn")
    const nextBtn = document.querySelector(".next-btn")
  
    if (slides.length > 0 && dots.length > 0) {
      let currentSlide = 0
  
      // Function to show a specific slide
      function showSlide(n) {
        slides.forEach((slide) => slide.classList.remove("active"))
        dots.forEach((dot) => dot.classList.remove("active"))
  
        currentSlide = (n + slides.length) % slides.length
  
        slides[currentSlide].classList.add("active")
        dots[currentSlide].classList.add("active")
      }
  
      // Next button click
      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          showSlide(currentSlide + 1)
        })
      }
  
      // Previous button click
      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          showSlide(currentSlide - 1)
        })
      }
  
      // Dot clicks
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          showSlide(index)
        })
      })
  
      // Auto-advance slides every 5 seconds
      setInterval(() => {
        showSlide(currentSlide + 1)
      }, 5000)
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
  
          // Close mobile menu if open
          if (navLinks.classList.contains("active")) {
            navLinks.classList.remove("active")
            document.body.classList.remove("menu-open")
  
            // Reset hamburger icon
            const spans = mobileMenuBtn.querySelectorAll("span")
            spans[0].style.transform = "none"
            spans[1].style.opacity = "1"
            spans[2].style.transform = "none"
          }
        }
      })
    })
  
    // Scroll reveal animation
    function revealOnScroll() {
      const elements = document.querySelectorAll(".service-card, .process-step, .testimonial-content, .contact-card")
  
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementTop < windowHeight - 100) {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }
      })
    }
  
    // Initial check and add scroll event listener
    revealOnScroll()
    window.addEventListener("scroll", revealOnScroll)
  
    // Form submission with basic validation
    const contactForm = document.querySelector(".contact-form")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Basic validation
        let valid = true
        const inputs = contactForm.querySelectorAll("input, textarea")
  
        inputs.forEach((input) => {
          if (input.hasAttribute("required") && !input.value.trim()) {
            valid = false
            input.classList.add("error")
          } else {
            input.classList.remove("error")
          }
        })
  
        if (valid) {
          // Show success message (in a real implementation, you'd send the form data to a server)
          const formContainer = contactForm.closest(".contact-form-container")
  
          if (formContainer) {
            formContainer.innerHTML = `
                          <div class="success-message">
                              <div class="icon-circle" style="margin: 0 auto 20px;">
                                  <i class="fa-solid fa-check"></i>
                              </div>
                              <h3>Thank You!</h3>
                              <p>Your message has been sent successfully. We'll get back to you soon!</p>
                          </div>
                      `
          }
        }
      })
    }
  })
  
  