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
  
  // Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get all navigation links
  const navLinks = document.querySelectorAll(".nav-links a")

  // Get the current page URL
  const currentPage = window.location.pathname

  // Set active navigation link based on current page
  const navLinksA = document.querySelectorAll(".nav-links a")
  const currentPageA = window.location.pathname

  // Remove active class from all links
  navLinksA.forEach((link) => {
    link.classList.remove("active")
  })

  // Add active class to the link that matches the current page
  navLinksA.forEach((link) => {
    const linkPath = link.getAttribute("href")

    // Check if the current page includes the link's href
    // This handles both "/contact.html" and just "contact.html" paths
    if (currentPage.includes(linkPath) && linkPath !== "#" && linkPath !== "" && !linkPath.startsWith("#")) {
      link.classList.add("active")
    }
  })

  // If no link was activated and we're on the home page
  if (currentPage === "/" || currentPage.includes("index.html") || currentPage.endsWith("/")) {
    // Find the home link and activate it
    const homeLink = document.querySelector('.nav-links a[href="index.html"]')
    if (homeLink) {
      homeLink.classList.add("active")
    }
  }

  // Mobile menu toggle functionality
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navLinksContainer = document.querySelector(".nav-links")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinksContainer.classList.toggle("active")
      // Toggle aria-expanded for accessibility
      const expanded = navLinksContainer.classList.contains("active")
      mobileMenuBtn.setAttribute("aria-expanded", expanded)
    })
  }
})

document.addEventListener('DOMContentLoaded', function() {
  // Get the modal elements
  const modal = document.getElementById('founder-modal');
  const closeBtn = document.querySelector('.close-btn');
  const founderCard = document.getElementById('founder-card');
  
  // Function to open the modal with animation
  function openModal() {
      modal.style.display = 'block';
      // Force reflow before adding the class to ensure animation works
      void modal.offsetWidth;
      modal.classList.add('show');
      // Prevent scrolling on the body when modal is open
      document.body.style.overflow = 'hidden';
  }
  
  // Function to close the modal with animation
  function closeModal() {
      modal.classList.remove('show');
      // Wait for the animation to complete before hiding the modal
      setTimeout(() => {
          modal.style.display = 'none';
          // Re-enable scrolling on the body
          document.body.style.overflow = '';
      }, 300); // Match this with the CSS transition time
  }
  
  // Event listeners
  founderCard.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  
  // Close modal when clicking outside the content
  modal.addEventListener('click', function(event) {
      if (event.target === modal) {
          closeModal();
      }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && modal.classList.contains('show')) {
          closeModal();
      }
  });
  
  // Add cursor pointer to founder card to indicate it's clickable
  founderCard.style.cursor = 'pointer';
  
  // Add a subtle hover effect to indicate the card is clickable
  founderCard.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.01)';
      this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
  });
  
  founderCard.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
  });
});