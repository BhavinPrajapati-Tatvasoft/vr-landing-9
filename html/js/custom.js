$(document).ready(function () {
  let $isMobileDevice;
  //;Prevent Page Reload on all # links
  $("body").on("click", "a[href='#']", function (e) {
    e.preventDefault();
  });

  //placeholder
  $("[placeholder]").each(function () {
    $(this).attr("data-placeholder", this.placeholder);
    $(this).bind("focus", function () {
      this.placeholder = "";
    });
    $(this).bind("blur", function () {
      this.placeholder = $(this).attr("data-placeholder");
    });
  });

  // On scroll Add Class
  $(window).scroll(function (e) {
    pageScrolled();
  });

  pageScrolled();
  function pageScrolled() {
    if ($(window).scrollTop() > 30) {
      $(".wrapper").addClass("page-scrolled");
    } else {
      $(".wrapper").removeClass("page-scrolled");
    }
  }

  // Footer margin set for stick to bottom
  function footerAdj() {
    var headerH = $(".header").innerHeight();
    var footerH = $(".footer").innerHeight();
    $(".footer").css({ "margin-top": -footerH });
    $(".wrapper").css({ "padding-bottom": footerH });
    $(".main-content").css({
      "min-height": "calc(100vh - " + (footerH + headerH) + "px)",
    });
  }
  footerAdj();
  $(window).resize(function () {
    footerAdj();
    $winWidth = $(window).width()
  });

  // Add remove class when window resize finished
  var $resizeTimer;
  $(window).on("resize", function (e) {
    if (!$("body").hasClass("window-resizing")) {
      $("body").addClass("window-resizing");
    }
    clearTimeout($resizeTimer);
    $resizeTimer = setTimeout(function () {
      $("body").removeClass("window-resizing");
    }, 250);
  });


  // Add new js functions here -----------------------------------------------------------------

  // Search Function
  $(".btn-search").on("click", function (e) {
    if ($("body").hasClass("open-search")) {
      $("body").removeClass("open-search");
    }
    else {
      $("body").addClass("open-search");
      setTimeout(() => {
        $(".header-search-input").focus();
      }, 500);
    }
  });

  $(".overlayer").on("click", function (e) {
    $("body").removeClass("open-search");
  }); 

  // Hero Banner Slider
  var heroBannerSwiper = new Swiper(".hero-banner-slider", {
    speed: 800,
    parallax: true,
    loop: true,
    pagination: {
      el: ".swiper-dots",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
    },
  });

  // Testimonial Slider
  var testimonialSwiper = new Swiper(".testimonialSlider", {
    slidesPerView: 1,
    loop: true,
    pagination: false,
    grabCursor: true,
    initialSlide: 1,
    navigation: {
      nextEl: ".testimonial-slider-wrapper .swiper-next",
      prevEl: ".testimonial-slider-wrapper .swiper-prev",
    },
    breakpoints: {
      575: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      650: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
    },
  });

  // AOS Initialization
  AOS.init({
    startEvent: 'DOMContentLoaded',
    once: true,
  });

  // Split Word Animation
  let splitWords = function (selector) {
    var elements = document.querySelectorAll(selector);

    elements.forEach(function (el) {
      el.dataset.splitText = el.textContent;
      el.innerHTML = el.textContent
        .split(/\s/)
        .map(function (word) {
          return word
            .split("-")
            .map(function (word) {
              return '<span class="word">' + word + "</span>";
            })
            .join('<span class="hyphen">-</span>');
        })
        .join('<span class="whitespace"> </span>');
    });
  };

  let splitLines = function (selector) {
    var elements = document.querySelectorAll(selector);

    splitWords(selector);

    elements.forEach(function (el) {
      var lines = getLines(el);

      var wrappedLines = "";
      lines.forEach(function (wordsArr) {
        wrappedLines += '<span class="line"><span class="words">';
        wordsArr.forEach(function (word) {
          wrappedLines += word.outerHTML;
        });
        wrappedLines += "</span></span>";
      });
      el.innerHTML = wrappedLines;
    });
  };

  let getLines = function (el) {
    var lines = [];
    var line;
    var words = el.querySelectorAll("span");
    var lastTop;
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      if (word.offsetTop != lastTop) {
        // Don't start with whitespace
        if (!word.classList.contains("whitespace")) {
          lastTop = word.offsetTop;
          line = [];
          lines.push(line);
        }
      }
      line.push(word);
    }
    return lines;
  };

  gsap.registerPlugin(ScrollTrigger);

  splitLines(".reveal-text");
  let revealText = document.querySelectorAll(".reveal-text");
  
  // Reveal Text Animation
  revealLines = revealText.forEach((element) => {
    const lines = element.querySelectorAll(".words");

    let RevealTextTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        toggleActions: "restart none none reset",
      },
    });
    RevealTextTimeLine.set(element, { autoAlpha: 1, perspective: 400 });
    RevealTextTimeLine.from(lines, 1, {
      yPercent: 101,
      rotationX: -180,
      ease: Power4.out,
      stagger: 0.1,
    }, "<");
  });

  // Mobile App Animation Timeline
  let MobileAppSection = gsap.timeline({
    scrollTrigger: {
      trigger: $(".mobile-app"),
      scrub: 1,
      pin: false,
      start: "-400",
      end: "0",
    },
  });

  // Mobile Connectivity Animation Timeline
  let MobileConnectivity = gsap.timeline({
    scrollTrigger: {
      trigger: $(".mobile-mockup-block"),
      scrub: 1,
      pin: false,
      start: "-300",
      end: "100",
    },
  });

  // Mobile Connectivity Back Animation Timeline
  let MobileConnectivityBack = gsap.timeline({
    scrollTrigger: {
      trigger: $(".mobile-mockup-block"),
      scrub: 1,
      pin: false,
      start: "-350",
      end: "0",
    },
  });

  // Testimonial Slider Animation Timeline
  let TestimonialSliderTimeLine = gsap.timeline({
    scrollTrigger: {
      trigger: $(".testimonial-section"),
      scrub: 1,
      pin: false,
      start: "-900",
      end: "-250",
    },
  });

  if ($(window).width() > 1200) {
    adjustMobileAppAnimation(100, 0, 2, 7);
    adjustMobileConnectivityAnimation(0, 0, 0, -35);
  }
  if ($(window).width() >= 992 && $(window).width() < 1199) {
    adjustMobileAppAnimation(100, 0, 14, 0);
    adjustMobileConnectivityAnimation(0, 0, 0, -35);
  }
  if ($(window).width() >= 768 && $(window).width() < 991) {
    adjustMobileAppAnimation(112, 0, 24, 8);
    adjustMobileConnectivityAnimation(0, 0, 0, -12);
  }
  if ($(window).width() >= 575 && $(window).width() < 767) {
    adjustMobileAppAnimation(110, 4, 210, 8);
    adjustMobileConnectivityAnimation(0, 0, 0, -30);
  }
  if ($(window).width() < 575) {
    adjustMobileAppAnimation(60, 4, 110, 8);
    adjustMobileConnectivityAnimation(0, 0, 0, -10);
  }

  // Mobile App Animation 
  function adjustMobileAppAnimation(setXPercent, setYPercent, toXPercent, toYPercent) {
    MobileAppSection.fromTo(".style-item-1", { xPercent: setXPercent, yPercent: setYPercent }, { xPercent: toXPercent, yPercent: toYPercent }, "<")
    MobileAppSection.fromTo(".style-item-3", { xPercent: -(setXPercent), yPercent: setYPercent }, { xPercent: -(toXPercent), yPercent: toYPercent }, "<")
  }

  // Mobile Connectivity Animation 
  function adjustMobileConnectivityAnimation(setXPercent, setYPercent, toXPercent, toYPercent) {
    MobileConnectivityBack.fromTo(".report-card", { xPercent: setXPercent, yPercent: setYPercent }, { xPercent: toXPercent, yPercent: toYPercent }, "<")
    MobileConnectivityBack.fromTo(".statistics-card", { xPercent: setXPercent, yPercent: setYPercent }, { xPercent: toXPercent, yPercent: -(toYPercent) }, "<")
  }

  MobileConnectivity.fromTo(".mobile-connectivity-bg.bg-1, .mobile-connectivity-bg.bg-2, .mobile-connectivity-bg.bg-3", { scaleY: 0, opacity: 0.1, transformOrigin: "left" }, { scaleY: 1, opacity: 0.2, }, "<-6")

  TestimonialSliderTimeLine.fromTo(".swiper-slide .team-member-img > img", { scaleX: 0, scaleY: 0, transformOrigin: "center" }, { scaleX: 1, scaleY: 1 }, "<-4")

  // Circular Progressbar
  $('.report-card-progress').circleProgress({
    value: 0.60,
    size: 134,
    thickness: '8',
    lineCap: 'round',
    fill: '#EF4848'
  });

  // Configuration For Particle.js
  particlesJS('particles-js',
    {
      "particles": {
        "number": {
          "value": 300,
          "density": {
            "enable": true,
            "value_area": 600
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.5,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 5,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": false,
          "distance": 500,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 2
        },
        "move": {
          "enable": true,
          "speed": 6,
          "direction": "top",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "bubble"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 0.5
            }
          },
          "bubble": {
            "distance": 400,
            "size": 4,
            "duration": 0.3,
            "opacity": 1,
            "speed": 3
          },
          "repulse": {
            "distance": 100,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    }
  );

  // Don't add anything below this --------------------------------------------------------------
  // Add Class on Window Load
  $("body").addClass("page-loaded");
});
