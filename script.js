/* ============================================================
   CONFIG — edit these values. They are reused across the page.
   ------------------------------------------------------------
   NAME            = "Zunera Haroon"            // [CONFIRM SPELLING]
   TITLE           = "Licensed Psychologist"
   WHATSAPP_NUMBER = "923345516998"             // [CONFIRM THIS IS HER WHATSAPP NUMBER]
   WHATSAPP_PREFILL = greeting used in every WhatsApp link
   EMAIL           = "zunera194@gmail.com"      // [CONFIRM]
   BOOKING_LINK    = Calendly URL, or "" to hide booking
                     // [ADD BOOKING LINK, e.g. Calendly, OR LEAVE EMPTY]
   LICENSE_LINE    = ""                         // [ADD LICENSE / REGISTRATION NUMBER, OR LEAVE EMPTY]
   SITE_URL        = ""                         // [ADD DOMAIN LATER]
   Also update the meta description in index.html if the name changes
   (keep it between 150 and 160 characters). Visible text, the document
   title, WhatsApp links, and JSON-LD are filled from this block.
   ============================================================ */
const CONFIG = {
  NAME: "Zunera Haroon", // [CONFIRM SPELLING]
  TITLE: "Licensed Psychologist",
  WHATSAPP_NUMBER: "923345516998", // [CONFIRM THIS IS HER WHATSAPP NUMBER]
  WHATSAPP_PREFILL: "Assalamu alaikum, I would like to book a counseling session.",
  EMAIL: "zunera194@gmail.com", // [CONFIRM]
  BOOKING_LINK: "https://calendly.com/zunera194/session", // [ADD BOOKING LINK, e.g. Calendly, OR LEAVE EMPTY]
  LICENSE_LINE: "", // [ADD LICENSE / REGISTRATION NUMBER, OR LEAVE EMPTY]
  SITE_URL: "", // [ADD DOMAIN LATER]
};

(function () {
  "use strict";

  function isSet(value) {
    return typeof value === "string" && value.trim() !== "" && value.trim().charAt(0) !== "[";
  }

  const whatsappUrl =
    "https://wa.me/" +
    CONFIG.WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(CONFIG.WHATSAPP_PREFILL);

  const bookingReady = isSet(CONFIG.BOOKING_LINK);
  const pageTitle = CONFIG.NAME + " | Licensed Psychologist, Online Counseling in Pakistan";

  document.querySelectorAll("[data-field='name']").forEach(function (el) {
    el.textContent = CONFIG.NAME;
  });
  document.querySelectorAll("[data-field='title']").forEach(function (el) {
    el.textContent = CONFIG.TITLE;
  });
  document.querySelectorAll("[data-field='email']").forEach(function (el) {
    el.textContent = CONFIG.EMAIL;
  });
  document.querySelectorAll("[data-field='year']").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  const license = document.querySelector("[data-field='license']");
  if (license) {
    if (isSet(CONFIG.LICENSE_LINE)) {
      license.textContent = CONFIG.LICENSE_LINE.trim();
      license.hidden = false;
    } else {
      license.hidden = true;
    }
  }

  document.querySelectorAll("[data-link='whatsapp']").forEach(function (el) {
    el.href = whatsappUrl;
  });
  document.querySelectorAll("[data-link='email']").forEach(function (el) {
    el.href = "mailto:" + CONFIG.EMAIL;
  });
  document.querySelectorAll("[data-link='booking']").forEach(function (el) {
    if (bookingReady) el.href = CONFIG.BOOKING_LINK;
  });

  document.title = pageTitle;
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (ogTitle) ogTitle.setAttribute("content", pageTitle);
  if (twTitle) twTitle.setAttribute("content", pageTitle);

  const frame = document.querySelector(".book-frame");
  if (frame) {
    frame.title = "Book a counseling session with " + CONFIG.NAME;
    // TODO: Keep this embed aligned with CONFIG.BOOKING_LINK.
    if (bookingReady && CONFIG.BOOKING_LINK.indexOf("calendly.com") !== -1) {
      const current = frame.getAttribute("src") || "";
      if (current.indexOf(CONFIG.BOOKING_LINK) === -1) {
        const join = CONFIG.BOOKING_LINK.indexOf("?") === -1 ? "?" : "&";
        frame.src =
          CONFIG.BOOKING_LINK +
          join +
          "embed_type=Inline&hide_gdpr_banner=1&background_color=faf6ef&text_color=3a3030&primary_color=e7a9b5";
      }
    }
  }

  if (!bookingReady) {
    document.querySelectorAll(".js-book").forEach(function (el) {
      el.hidden = true;
    });
    const bookSection = document.getElementById("book");
    if (bookSection) bookSection.hidden = true;
  }

  const ld = document.getElementById("ld-json");
  if (ld) {
    try {
      const data = JSON.parse(ld.textContent);
      const nodes = data["@graph"] || [];
      nodes.forEach(function (node) {
        if (node["@type"] === "Person") {
          node.name = CONFIG.NAME;
          node.jobTitle = CONFIG.TITLE;
          node.email = CONFIG.EMAIL;
        }
        if (node["@type"] === "ProfessionalService") {
          node.name = CONFIG.NAME;
          node.email = CONFIG.EMAIL;
        }
        if (isSet(CONFIG.SITE_URL)) {
          node.url = CONFIG.SITE_URL.replace(/\/$/, "") + "/";
        }
      });
      ld.textContent = JSON.stringify(data);
    } catch (err) {
      // Leave the static JSON-LD in place if it cannot be parsed.
    }
  }

  if (isSet(CONFIG.SITE_URL)) {
    const origin = CONFIG.SITE_URL.replace(/\/$/, "");
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = origin + "/";

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", origin + "/");

    ["og:image", "twitter:image"].forEach(function (key) {
      const selector = key.indexOf("twitter") === 0 ? 'meta[name="' + key + '"]' : 'meta[property="' + key + '"]';
      const meta = document.querySelector(selector);
      if (!meta) return;
      const content = meta.getAttribute("content") || "";
      if (content && content.indexOf("http") !== 0) {
        meta.setAttribute("content", origin + "/" + content.replace(/^\//, ""));
      }
    });
  }

  const menuBtn = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");

  function setMenu(open) {
    if (!menuBtn || !nav) return;
    nav.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || menuBtn.contains(event.target)) return;
      setMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setMenu(false);
        menuBtn.focus();
      }
    });

    document.addEventListener("focusin", function (event) {
      if (!nav.classList.contains("is-open")) return;
      const header = menuBtn.closest(".site-header");
      if (header && !header.contains(event.target)) setMenu(false);
    });

    const desktop = window.matchMedia("(min-width: 960px)");
    function closeIfDesktop() {
      if (desktop.matches) setMenu(false);
    }
    if (typeof desktop.addEventListener === "function") {
      desktop.addEventListener("change", closeIfDesktop);
    } else if (typeof desktop.addListener === "function") {
      desktop.addListener(closeIfDesktop);
    }
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    const revealables = document.querySelectorAll(".reveal");
    const viewHeight = window.innerHeight || 800;
    revealables.forEach(function (el) {
      if (el.getBoundingClientRect().top < viewHeight * 0.92) {
        el.classList.add("is-inview");
      }
    });
    document.documentElement.classList.add("motion");
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-inview");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealables.forEach(function (el) {
      if (!el.classList.contains("is-inview")) revealObserver.observe(el);
    });
  }

  const navLinks = Array.prototype.slice.call(document.querySelectorAll("#site-nav a[href^='#']"));
  const sections = navLinks
    .map(function (link) {
      return document.getElementById(link.getAttribute("href").slice(1));
    })
    .filter(function (section) {
      return section && !section.hidden;
    });

  if (sections.length && "IntersectionObserver" in window) {
    const ratios = new Map();
    let currentId = "";

    function paintActive() {
      navLinks.forEach(function (link) {
        const on = currentId !== "" && link.getAttribute("href") === "#" + currentId && !link.hidden;
        link.classList.toggle("is-active", on);
        if (on) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }

    const activeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        let bestId = "";
        let best = 0;
        ratios.forEach(function (ratio, id) {
          if (ratio > best) {
            best = ratio;
            bestId = id;
          }
        });
        currentId = best > 0 ? bestId : "";
        paintActive();
      },
      {
        rootMargin: "-18% 0px -68% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75],
      }
    );

    sections.forEach(function (section) {
      activeObserver.observe(section);
    });
  }
})();
