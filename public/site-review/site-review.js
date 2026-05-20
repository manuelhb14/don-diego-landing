(function () {
  "use strict";

	  var currentScript = document.currentScript;
	  var scriptSrc = currentScript && currentScript.src ? currentScript.src : "";
	  var defaultCssHref = scriptSrc ? scriptSrc.replace(/\.js(?:\?.*)?$/, ".css") : "/site-review/site-review.css";
	  var activeInstance = null;
	  var previewSessionId = "sr_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);

	  var ICONS = {
	    toggleOpen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 18l6-6-6-6"/></svg>',
	    toggleClosed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 18l-6-6 6-6"/></svg>',
	    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg>',
	    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',
	    comment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
	    image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10.5" r="1.5"/><path d="M21 15l-5-5L5 19"/><path d="M14 5l2-2 2 2"/><path d="M16 3v7"/></svg>',
	    clear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>',
	    export: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>',
	    empty: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>'
	  };

  function normalizeText(value, limit) {
    var text = String(value || "").trim().replace(/\s+/g, " ");
    return limit ? text.slice(0, limit) : text;
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[char];
    });
  }

  function safeQuery(selector) {
    try {
      return selector ? document.querySelector(selector) : null;
    } catch {
      return null;
    }
  }

  function evaluateXpath(xpath) {
    try {
      return xpath
        ? document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
        : null;
    } catch {
      return null;
    }
  }

  function getElementFromRecord(record) {
    return safeQuery(record.selector) || evaluateXpath(record.xpath);
  }

  function getCssPath(element) {
    if (!(element instanceof Element)) return "";
    if (element.id) return "#" + CSS.escape(element.id);

    var parts = [];
    var current = element;
    while (current && current.nodeType === 1 && current !== document.body && parts.length < 8) {
      var part = current.nodeName.toLowerCase();
      if (current.id) {
        parts.unshift("#" + CSS.escape(current.id));
        break;
      }

      var classes = Array.from(current.classList || [])
        .filter(function (className) {
          return !/^(sr-|is-|js-|active|hover|focus|open)/.test(className);
        })
        .filter(function (className) {
          return className.length < 48;
        })
        .slice(0, 2);

      if (classes.length) {
        part += "." + classes.map(function (className) { return CSS.escape(className); }).join(".");
      }

      if (current.parentNode) {
        var sameTagSiblings = Array.from(current.parentNode.children).filter(function (child) {
          return child.nodeName === current.nodeName;
        });
        if (sameTagSiblings.length > 1) {
          part += ":nth-of-type(" + (sameTagSiblings.indexOf(current) + 1) + ")";
        }
      }

      parts.unshift(part);
      current = current.parentNode;
    }

    return parts.join(" > ");
  }

  function getXpath(element) {
    if (!(element instanceof Element)) return "";
    if (element.id) return '//*[@id="' + element.id.replace(/"/g, '\\"') + '"]';

    var parts = [];
    var current = element;
    while (current && current.nodeType === 1 && current !== document.documentElement) {
      var index = 1;
      var previous = current.previousElementSibling;
      while (previous) {
        if (previous.nodeName === current.nodeName) index += 1;
        previous = previous.previousElementSibling;
      }
      parts.unshift(current.nodeName.toLowerCase() + "[" + index + "]");
      current = current.parentNode;
    }

    return "/" + parts.join("/");
  }

  function getContext(element) {
    return {
      before: normalizeText(element.previousElementSibling && element.previousElementSibling.textContent, 100),
      after: normalizeText(element.nextElementSibling && element.nextElementSibling.textContent, 100)
    };
  }

  function getSnippet(element) {
    var html = element && element.outerHTML ? element.outerHTML : "";
    return html.length > 520 ? html.slice(0, 520) + "..." : html;
  }

	  function hasDirectText(element) {
	    return Array.from(element.childNodes || []).some(function (node) {
	      return node.nodeType === 3 && normalizeText(node.textContent).length > 0;
	    });
	  }

  function isEditableTextTag(element) {
    return /^(H1|H2|H3|H4|H5|H6|P|SPAN|A|BUTTON|LI|TD|TH|LABEL|STRONG|EM|SMALL|FIGCAPTION|BLOCKQUOTE)$/.test(element.tagName);
  }

  function hasMediaDescendant(element) {
    return Boolean(element.querySelector("img, picture, video, canvas, svg, iframe"));
  }

	  function canEditElement(element) {
	    if (!element || element.nodeType !== 1) return false;
	    if (element.closest("#sr-root")) return false;
	    if (["SCRIPT", "STYLE", "NOSCRIPT", "IFRAME", "SVG", "CANVAS", "HTML", "BODY"].indexOf(element.tagName) >= 0) return false;
	    if (!normalizeText(element.textContent)) return false;
	    if (hasMediaDescendant(element)) return false;
	    return hasDirectText(element) || isEditableTextTag(element);
	  }

  function findNestedEditableTextAtPoint(container, clientX, clientY) {
    if (!container || typeof clientX !== "number" || typeof clientY !== "number") return null;
    var candidates = Array.from(container.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,a,button,li,td,th,label,strong,em,small,figcaption,blockquote"))
      .filter(canEditElement)
      .filter(function (candidate) {
        var rect = candidate.getBoundingClientRect();
        return rect.width > 0 &&
          rect.height > 0 &&
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom;
      })
      .sort(function (a, b) {
        var rectA = a.getBoundingClientRect();
        var rectB = b.getBoundingClientRect();
        return (rectA.width * rectA.height) - (rectB.width * rectB.height);
      });
    return candidates[0] || null;
  }

  function canCommentElement(element) {
    return Boolean(
      element &&
      element.nodeType === 1 &&
      !element.closest("#sr-root") &&
      ["HTML", "BODY", "SCRIPT", "STYLE", "NOSCRIPT"].indexOf(element.tagName) === -1
    );
  }

	  function findImageTarget(start) {
	    if (!start || start.nodeType !== 1) return null;
	    var media = start.closest("img, picture, figure, video");
	    if (media && !media.closest("#sr-root")) return media;

	    var current = start;
	    while (current && current !== document.body) {
	      if (current.closest && current.closest("#sr-root")) return null;
	      var nestedMedia = current.querySelector && current.querySelector("img, picture, video");
	      if (nestedMedia) return current;
	      var backgroundImage = window.getComputedStyle(current).backgroundImage;
	      if (backgroundImage && backgroundImage !== "none") return current;
	      current = current.parentElement;
    }

    return null;
  }

  function findSectionTarget(start) {
    if (!start || start.nodeType !== 1) return null;
    var semantic = start.closest("section, article, main, header, footer, nav, aside, [data-site-review-section]");
    if (semantic && semantic !== document.body && !semantic.closest("#sr-root")) return semantic;

    var current = start;
    var fallback = null;
    while (current && current.parentElement && current.parentElement !== document.body) {
      if (current.closest && current.closest("#sr-root")) return null;
      if (current.id || (current.classList && current.classList.length > 0)) fallback = current;
      current = current.parentElement;
    }

    return fallback;
  }

  function getTargetDisplayText(target, targetType) {
    if (targetType === "image") {
      var img = target.matches("img") ? target : target.querySelector("img");
      if (img) {
        return normalizeText(img.getAttribute("alt") || img.getAttribute("src"), 220);
      }
      return normalizeText(target.getAttribute("aria-label") || target.style.backgroundImage || target.textContent, 220);
    }
    return normalizeText(target.textContent || target.getAttribute("aria-label") || "", 220);
  }

  function labelForTargetType(targetType) {
    if (targetType === "image") return "image";
    if (targetType === "section") return "section";
    return "element";
  }

	  function inferNoteTarget(start) {
	    var imageTarget = findImageTarget(start);
	    if (imageTarget) {
	      return { target: imageTarget, targetType: "image" };
    }

    var sectionTarget = findSectionTarget(start);
    if (sectionTarget && sectionTarget !== start && !canCommentElement(start)) {
      return { target: sectionTarget, targetType: "section" };
    }

    if (canCommentElement(start)) {
      return { target: start, targetType: "element" };
    }

    if (sectionTarget) {
      return { target: sectionTarget, targetType: "section" };
    }

	    return null;
	  }

	  function findImageSwapPart(target) {
	    if (!target || target.nodeType !== 1) return null;
	    var image = target.matches("img") ? target : target.querySelector("img");
	    if (image) return { kind: "image", element: image };
	    if (target.matches("video")) return { kind: "video", element: target };
	    return { kind: "background", element: target };
	  }

	  function getPictureSourceState(image) {
	    var picture = image && image.closest ? image.closest("picture") : null;
	    if (!picture) return [];
	    return Array.from(picture.querySelectorAll("source")).map(function (source, index) {
	      return {
	        index: index,
	        srcset: source.getAttribute("srcset")
	      };
	    }.bind(this));
	  }

	  function captureImageSwapState(target) {
	    var part = findImageSwapPart(target);
	    if (!part) return null;

	    if (part.kind === "image") {
	      return {
	        kind: "image",
	        originalSrc: part.element.getAttribute("src"),
	        originalSrcset: part.element.getAttribute("srcset"),
	        originalSizes: part.element.getAttribute("sizes"),
	        pictureSources: getPictureSourceState(part.element),
	        displayValue: part.element.getAttribute("alt") || part.element.currentSrc || part.element.getAttribute("src") || ""
	      };
	    }

	    if (part.kind === "video") {
	      return {
	        kind: "video",
	        originalPoster: part.element.getAttribute("poster"),
	        displayValue: part.element.getAttribute("poster") || part.element.currentSrc || part.element.getAttribute("src") || ""
	      };
	    }

	    return {
	      kind: "background",
	      originalInlineBackgroundImage: part.element.style.backgroundImage || "",
	      originalBackgroundImage: window.getComputedStyle(part.element).backgroundImage || "",
	      displayValue: window.getComputedStyle(part.element).backgroundImage || ""
	    };
	  }

	  function restoreAttribute(element, name, value) {
	    if (value == null) element.removeAttribute(name);
	    else element.setAttribute(name, value);
	  }

  function ensureStylesheet(href) {
    if (!href || document.querySelector('link[data-site-review-stylesheet="true"]')) return;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.setAttribute("data-site-review-stylesheet", "true");
    document.head.appendChild(link);
  }

  function createElement(tagName, className, html) {
    var element = document.createElement(tagName);
    if (className) element.className = className;
    if (html) element.innerHTML = html;
    return element;
  }

  function isTypingTarget(target) {
    if (!target || target.nodeType !== 1) return false;
    return Boolean(target.closest("input, textarea, select, [contenteditable='true'], [contenteditable='']"));
  }

  function saveMarkdown(filenamePrefix, markdown) {
    var blob = new Blob([markdown], { type: "text/markdown" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    var stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    link.href = url;
    link.download = filenamePrefix + "_" + stamp + ".md";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function readFileAsDataUrl(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () { resolve(String(reader.result || "")); };
      reader.onerror = function () { reject(reader.error || new Error("Could not read image")); };
      reader.readAsDataURL(file);
    });
  }

  function isCompleted(record) {
    return Boolean(record && (record.completed || record.completedAt));
  }

  function recordStatusLabel(record) {
    return isCompleted(record) ? "completed" : "open";
  }

  function SiteReview(options) {
    this.options = Object.assign({
      title: "Site Review",
      subtitle: "Click elements to edit copy or leave comments. Export Markdown when done.",
      projectName: document.title || "Site",
      storageKey: "siteReview::" + location.origin + location.pathname,
      reviewerStorageKey: "siteReviewReviewer::" + location.origin,
      exportFilenamePrefix: "site-review",
      cssHref: defaultCssHref,
      enableCloudSync: false,
      syncEndpoint: "/api/site-review/notes",
      authEndpoint: "/api/site-review/auth",
      locale: document.documentElement.lang || "",
      reviewSessionKey: "",
      open: true,
      initialMode: "idle"
    }, options || {});

	    this.state = {
	      edits: [],
	      comments: [],
	      imageSwaps: [],
	      mode: this.options.initialMode || "idle",
      collapsed: !this.options.open,
      cloudAuthenticated: false,
      cloudChecked: false,
      cloudBusy: false,
      cloudError: "",
      reviewerCode: "",
      reviewerLabel: ""
    };

    this.root = null;
    this.sidebar = null;
    this.list = null;
    this.badge = null;
    this.help = null;
    this.syncPanel = null;
    this.exportButton = null;
    this.hoverOutline = null;
    this.applyObserver = null;
    this.applyQueued = false;
    this.applyTimers = [];
    this.boundMouseMove = this.onMouseMove.bind(this);
    this.boundClick = this.onDocumentClick.bind(this);
    this.boundKeydown = this.onKeydown.bind(this);
  }

  SiteReview.prototype.mount = function () {
    ensureStylesheet(this.options.cssHref);
    this.loadState();
    this.renderShell();
    this.applySavedMarks();
    this.renderList();
    this.setMode(this.state.mode);
    if (this.options.enableCloudSync) {
      this.checkCloudAuth();
    }
    document.addEventListener("mousemove", this.boundMouseMove, true);
    document.addEventListener("click", this.boundClick, true);
    document.addEventListener("keydown", this.boundKeydown);
    document.body.classList.toggle("sr-sidebar-open", !this.state.collapsed);
    document.body.classList.toggle("sr-sidebar-collapsed", this.state.collapsed);
    this.startApplyObserver();
    this.scheduleApplySavedMarks();
    this.queueApplyPasses();
    return this;
  };

  SiteReview.prototype.unmount = function () {
    this.setMode("idle");
    document.removeEventListener("mousemove", this.boundMouseMove, true);
    document.removeEventListener("click", this.boundClick, true);
    document.removeEventListener("keydown", this.boundKeydown);
    if (this.applyObserver) {
      this.applyObserver.disconnect();
      this.applyObserver = null;
    }
    this.applyTimers.forEach(function (timer) {
      window.clearTimeout(timer);
    });
    this.applyTimers = [];
    this.applyQueued = false;
    document.body.classList.remove("sr-sidebar-open", "sr-sidebar-collapsed");
    if (this.root) this.root.remove();
    if (activeInstance === this) activeInstance = null;
  };

  SiteReview.prototype.loadState = function () {
    try {
      var reviewerRaw = localStorage.getItem(this.options.reviewerStorageKey);
      if (reviewerRaw) {
        var reviewer = JSON.parse(reviewerRaw);
        this.state.reviewerCode = typeof reviewer.code === "string" ? reviewer.code : "";
        this.state.reviewerLabel = typeof reviewer.label === "string" ? reviewer.label : "";
      }
    } catch {
      this.state.reviewerCode = "";
      this.state.reviewerLabel = "";
    }

    try {
      var raw = localStorage.getItem(this.options.storageKey);
      if (!raw) return;
      var parsed = JSON.parse(raw);
      this.state.edits = Array.isArray(parsed.edits) ? parsed.edits : [];
      this.state.comments = Array.isArray(parsed.comments) ? parsed.comments : [];
      this.state.imageSwaps = Array.isArray(parsed.imageSwaps)
        ? parsed.imageSwaps.map(function (record) {
          if (record.replacementDataUrl) {
            return Object.assign({}, record, {
              replacementUrl: record.replacementDataUrl,
              previewStatus: "active"
            });
          }
          if (record.previewSessionId === previewSessionId && record.replacementUrl) return record;
          return Object.assign({}, record, {
            previewStatus: "expired",
            replacementUrl: ""
          });
        })
        : [];
    } catch {
      this.state.edits = [];
      this.state.comments = [];
      this.state.imageSwaps = [];
    }
  };

  SiteReview.prototype.saveState = function () {
    try {
	      localStorage.setItem(this.options.storageKey, JSON.stringify({
	        edits: this.state.edits,
	        comments: this.state.comments,
	        imageSwaps: this.state.imageSwaps
	      }));
      localStorage.setItem(this.options.reviewerStorageKey, JSON.stringify({
        code: this.state.reviewerCode || "",
        label: this.state.reviewerLabel || ""
      }));
    } catch {
      this.toast("Could not save review state");
    }
  };

  SiteReview.prototype.renderShell = function () {
    var existing = document.getElementById("sr-root");
    if (existing) existing.remove();

    this.root = createElement("div");
    this.root.id = "sr-root";
    this.root.innerHTML =
      '<div class="sr-sidebar" id="sr-sidebar">' +
        '<button class="sr-toggle" id="sr-toggle" type="button" title="Toggle sidebar" aria-label="Toggle Site Review sidebar">' +
          ICONS.toggleOpen +
          '<span class="sr-toggle-badge" id="sr-badge">0</span>' +
        '</button>' +
        '<div class="sr-header">' +
          '<div class="sr-title-row">' +
            '<div class="sr-title">' + escapeHtml(this.options.title) + '</div>' +
            '<button class="sr-close" id="sr-close" type="button" title="Close" aria-label="Close Site Review">' + ICONS.close + '</button>' +
          '</div>' +
          '<div class="sr-subtitle">' + escapeHtml(this.options.subtitle) + '</div>' +
        '</div>' +
	        '<div class="sr-modes">' +
	          '<button class="sr-mode-btn" id="sr-mode-comment" type="button" data-mode="comment">' + ICONS.comment + '<span>Add note</span><kbd>⌥N</kbd></button>' +
	          '<button class="sr-mode-btn" id="sr-mode-edit" type="button" data-mode="edit">' + ICONS.edit + '<span>Edit copy</span><kbd>⌥E</kbd></button>' +
	          '<button class="sr-mode-btn" id="sr-mode-swap" type="button" data-mode="swap">' + ICONS.image + '<span>Swap image</span><kbd>⌥I</kbd></button>' +
	        '</div>' +
        (this.options.enableCloudSync
          ? '<div class="sr-sync" id="sr-sync"></div>'
          : '') +
        '<div class="sr-mode-help" id="sr-help"></div>' +
        '<div class="sr-list" id="sr-list"></div>' +
        '<div class="sr-footer">' +
          '<button class="sr-btn sr-btn-secondary" id="sr-clear" type="button">' + ICONS.clear + 'Clear</button>' +
          '<button class="sr-btn sr-btn-primary" id="sr-export" type="button">' + ICONS.export + 'Export Markdown</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(this.root);
    this.sidebar = this.root.querySelector("#sr-sidebar");
    this.list = this.root.querySelector("#sr-list");
    this.badge = this.root.querySelector("#sr-badge");
    this.help = this.root.querySelector("#sr-help");
    this.syncPanel = this.root.querySelector("#sr-sync");
    this.exportButton = this.root.querySelector("#sr-export");

    this.root.querySelector("#sr-toggle").addEventListener("click", this.toggleSidebar.bind(this));
    this.root.querySelector("#sr-close").addEventListener("click", this.close.bind(this));
	    this.root.querySelector("#sr-mode-edit").addEventListener("click", this.toggleMode.bind(this, "edit"));
	    this.root.querySelector("#sr-mode-comment").addEventListener("click", this.toggleMode.bind(this, "comment"));
	    this.root.querySelector("#sr-mode-swap").addEventListener("click", this.toggleMode.bind(this, "swap"));
    this.root.querySelector("#sr-clear").addEventListener("click", this.clear.bind(this));
    this.exportButton.addEventListener("click", this.exportMarkdown.bind(this));
    this.renderCloudStatus();
  };

  SiteReview.prototype.renderCloudStatus = function () {
    if (!this.syncPanel) return;

    if (this.state.cloudAuthenticated) {
      var reviewerText = this.state.reviewerLabel || this.state.reviewerCode || "authenticated reviewer";
      this.syncPanel.innerHTML =
        '<div class="sr-sync-status synced">Cloud sync on</div>' +
        '<div class="sr-sync-copy">Notes are saved to D1/R2 as ' + escapeHtml(reviewerText) + '.</div>';
      return;
    }

    this.syncPanel.innerHTML =
      '<div class="sr-sync-status">Reviewer access</div>' +
      '<div class="sr-sync-login">' +
        '<input id="sr-sync-password" class="sr-sync-input" type="password" placeholder="Access code or editor password" autocomplete="one-time-code">' +
        '<button id="sr-sync-login" class="sr-sync-button" type="button"' + (this.state.cloudBusy ? " disabled" : "") + '>Unlock</button>' +
      '</div>' +
      '<div class="sr-sync-copy">' +
        escapeHtml(this.state.cloudError || "Local review works without access. Unlock to store notes and identify the requester.") +
      '</div>';

    var input = this.syncPanel.querySelector("#sr-sync-password");
    var button = this.syncPanel.querySelector("#sr-sync-login");
    var login = this.loginCloud.bind(this);
    button.addEventListener("click", login);
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") login();
    });
  };

  SiteReview.prototype.checkCloudAuth = function () {
    fetch(this.options.authEndpoint, { credentials: "same-origin", cache: "no-store" })
      .then(function (response) { return response.ok ? response.json() : { authenticated: false }; })
      .then(function (data) {
        this.state.cloudAuthenticated = Boolean(data.authenticated);
        this.state.cloudChecked = true;
        this.state.cloudError = "";
        if (data.reviewer) {
          this.state.reviewerCode = data.reviewer.code || this.state.reviewerCode || "";
          this.state.reviewerLabel = data.reviewer.label || this.state.reviewerLabel || "";
          this.saveState();
        }
        this.renderCloudStatus();
        if (this.state.cloudAuthenticated) this.loadCloudNotes();
      }.bind(this))
      .catch(function () {
        this.state.cloudChecked = true;
        this.state.cloudError = "Could not verify cloud sync.";
        this.renderCloudStatus();
      }.bind(this));
  };

  SiteReview.prototype.loginCloud = function () {
    var input = this.syncPanel && this.syncPanel.querySelector("#sr-sync-password");
    var password = input ? input.value : "";
    if (!password) return;

    this.state.cloudBusy = true;
    this.state.cloudError = "";
    this.renderCloudStatus();

    fetch(this.options.authEndpoint, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: password, accessCode: password })
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Invalid password");
        return response.json();
      })
      .then(function (data) {
        this.state.cloudAuthenticated = true;
        this.state.cloudBusy = false;
        this.state.cloudError = "";
        if (data.reviewer) {
          this.state.reviewerCode = data.reviewer.code || "";
          this.state.reviewerLabel = data.reviewer.label || data.reviewer.code || "";
          this.saveState();
        }
        this.renderCloudStatus();
        this.loadCloudNotes();
        this.toast("Cloud sync unlocked");
      }.bind(this))
      .catch(function (error) {
        this.state.cloudAuthenticated = false;
        this.state.cloudBusy = false;
        this.state.cloudError = error.message || "Could not unlock cloud sync.";
        this.renderCloudStatus();
      }.bind(this));
  };

  SiteReview.prototype.loadCloudNotes = function () {
    if (!this.options.enableCloudSync || !this.state.cloudAuthenticated) return;

    var url = this.options.syncEndpoint +
      "?project=" + encodeURIComponent(this.options.projectName) +
      "&pathname=" + encodeURIComponent(location.pathname);

    fetch(url, { credentials: "same-origin", cache: "no-store" })
      .then(function (response) {
        if (!response.ok) throw new Error("Could not load cloud notes");
        return response.json();
      })
      .then(function (data) {
        var cloudNotes = Array.isArray(data.notes) ? data.notes : [];
        cloudNotes.forEach(function (note) {
          var existingIndex = this.state.comments.findIndex(function (record) { return record.id === note.id; });
          var record = {
            id: note.id,
            type: "comment",
            targetType: note.targetType || "element",
            tagName: note.tagName || "element",
            selector: note.selector || "",
            xpath: note.xpath || "",
            elementText: note.elementText || "",
            comment: note.note || note.comment || "",
            contextBefore: note.contextBefore || "",
            contextAfter: note.contextAfter || "",
            snippet: note.snippet || "",
            images: note.images || [],
            completed: Boolean(note.completed),
            completedAt: note.completedAt || "",
            requesterCode: note.requesterCode || "",
            requesterLabel: note.requesterLabel || "",
            syncStatus: "synced",
            createdAt: note.createdAt || new Date().toISOString()
          };

          if (existingIndex >= 0) this.state.comments[existingIndex] = Object.assign({}, this.state.comments[existingIndex], record);
          else this.state.comments.push(record);
        }.bind(this));

        this.applySavedMarks();
        this.saveState();
        this.renderList();
        this.syncPendingNotes();
      }.bind(this))
      .catch(function (error) {
        this.state.cloudError = error.message || "Could not load cloud notes.";
        this.renderCloudStatus();
      }.bind(this));
  };

  SiteReview.prototype.syncNote = function (record, files) {
    if (!this.options.enableCloudSync) return;

    if (!this.state.cloudAuthenticated) {
      record.syncStatus = "local";
      record.syncError = files && files.length ? "Unlock cloud sync to attach images." : "Unlock cloud sync to store this note in D1.";
      this.saveState();
      this.renderList();
      this.toast(record.syncError);
      return;
    }

    var formData = new FormData();
    formData.append("note", JSON.stringify({
      id: record.id,
      project: this.options.projectName,
      pathname: location.pathname,
      pageUrl: location.href,
      pageTitle: document.title || "",
      locale: this.options.locale || document.documentElement.lang || "",
      targetType: record.targetType || "element",
      tagName: record.tagName,
      selector: record.selector,
      xpath: record.xpath,
      elementText: record.elementText,
      note: record.comment,
      contextBefore: record.contextBefore,
      contextAfter: record.contextAfter,
      snippet: record.snippet,
      completed: Boolean(record.completed),
      completedAt: record.completedAt || "",
      requesterCode: record.requesterCode || this.state.reviewerCode || "",
      requesterLabel: record.requesterLabel || this.state.reviewerLabel || "",
      createdAt: record.createdAt
    }));

    (files || []).forEach(function (file) {
      formData.append("images", file);
    });

    record.syncStatus = "syncing";
    this.saveState();
    this.renderList();

    fetch(this.options.syncEndpoint, {
      method: "POST",
      credentials: "same-origin",
      body: formData
    })
      .then(function (response) {
        if (!response.ok) throw new Error(response.status === 401 ? "Cloud sync locked" : "Could not save note to D1");
        return response.json();
      })
      .then(function (data) {
        var saved = data.note || {};
        record.syncStatus = "synced";
        record.syncError = "";
        record.images = (record.images || []).concat(saved.images || []);
        record.completed = Boolean(saved.completed);
        record.completedAt = saved.completedAt || "";
        record.requesterCode = saved.requesterCode || record.requesterCode || "";
        record.requesterLabel = saved.requesterLabel || record.requesterLabel || "";
        this.saveState();
        this.renderList();
        this.toast("Note saved to D1");
      }.bind(this))
      .catch(function (error) {
        if (error.message === "Cloud sync locked") this.state.cloudAuthenticated = false;
        record.syncStatus = "local";
        record.syncError = error.message || "Could not save note to D1.";
        this.saveState();
        this.renderCloudStatus();
        this.renderList();
        this.toast(record.syncError);
      }.bind(this));
  };

  SiteReview.prototype.syncPendingNotes = function () {
    if (!this.options.enableCloudSync || !this.state.cloudAuthenticated) return;

    this.state.comments
      .filter(function (record) { return record.syncStatus !== "synced" && record.comment; })
      .forEach(function (record) {
        this.syncNote(record, []);
      }.bind(this));
  };

  SiteReview.prototype.deleteCloudNote = function (id) {
    if (!this.options.enableCloudSync || !this.state.cloudAuthenticated || !id) return;

    fetch(this.options.syncEndpoint, {
      method: "DELETE",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id })
    }).catch(function () {
      return undefined;
    });
  };

  SiteReview.prototype.toggleSidebar = function () {
    this.state.collapsed = !this.state.collapsed;
    this.sidebar.classList.toggle("collapsed", this.state.collapsed);
    document.body.classList.toggle("sr-sidebar-open", !this.state.collapsed);
    document.body.classList.toggle("sr-sidebar-collapsed", this.state.collapsed);
    this.root.querySelector("#sr-toggle").innerHTML =
      (this.state.collapsed ? ICONS.toggleClosed : ICONS.toggleOpen) +
      '<span class="sr-toggle-badge" id="sr-badge">' + escapeHtml(String(this.totalCount())) + '</span>';
    this.badge = this.root.querySelector("#sr-badge");
    this.renderBadge();
  };

	  SiteReview.prototype.close = function () {
	    var confirmed = window.confirm("Close Site Review? Your edits, notes, and image previews stay saved for this page. Add ?review=1 to reopen it.");
	    if (!confirmed) return;
	    if (this.options.reviewSessionKey) {
	      try {
	        window.sessionStorage.removeItem(this.options.reviewSessionKey);
	      } catch {
	        // Ignore storage access failures and still close the UI.
	      }
	    }
	    this.unmount();
	  };

  SiteReview.prototype.toggleMode = function (mode) {
    this.setMode(this.state.mode === mode ? "idle" : mode);
  };

  SiteReview.prototype.getRequesterMeta = function () {
    return {
      requesterCode: this.state.reviewerCode || "",
      requesterLabel: this.state.reviewerLabel || this.state.reviewerCode || ""
    };
  };

  SiteReview.prototype.setMode = function (mode) {
    this.state.mode = mode;
    if (!this.root) return;

	    var editButton = this.root.querySelector("#sr-mode-edit");
	    var commentButton = this.root.querySelector("#sr-mode-comment");
	    var swapButton = this.root.querySelector("#sr-mode-swap");
	    editButton.classList.toggle("active", mode === "edit");
	    editButton.classList.toggle("edit", mode === "edit");
	    commentButton.classList.toggle("active", mode === "comment");
	    commentButton.classList.toggle("comment", mode === "comment");
	    swapButton.classList.toggle("active", mode === "swap");
	    swapButton.classList.toggle("swap", mode === "swap");

    if (mode === "edit") {
      this.help.className = "sr-mode-help visible edit-help";
      this.help.textContent = "Hover over a text element and click to draft a copy edit. Press Option+E or Esc to exit.";
      document.body.style.cursor = "crosshair";
	    } else if (mode === "comment") {
	      this.help.className = "sr-mode-help visible";
	      this.help.textContent = "Click text, images, or larger page areas to leave a note. Press Option+N or Esc to exit.";
	      document.body.style.cursor = "crosshair";
	    } else if (mode === "swap") {
	      this.help.className = "sr-mode-help visible swap-help";
	      this.help.textContent = "Click an image, video poster, or background image to preview a replacement. Press Option+I or Esc to exit.";
	      document.body.style.cursor = "crosshair";
	    } else {
      this.help.className = "sr-mode-help";
      this.help.textContent = "";
      document.body.style.cursor = "";
      this.hideHover();
    }
  };

  SiteReview.prototype.findTarget = function (start, event) {
    if (this.state.mode === "edit") {
      var current = start;
      while (current && current !== document.body) {
        if (canEditElement(current)) return current;
        var nestedText = findNestedEditableTextAtPoint(current, event && event.clientX, event && event.clientY);
        if (nestedText) return nestedText;
        current = current.parentElement;
      }
      return null;
    }
	    if (this.state.mode === "comment") {
	      var noteTarget = inferNoteTarget(start);
	      return noteTarget && noteTarget.target;
	    }
	    if (this.state.mode === "swap") return findImageTarget(start);
	    return null;
	  };

  SiteReview.prototype.onMouseMove = function (event) {
    if (this.state.mode === "idle") return;
    if (event.target.closest && event.target.closest("#sr-root")) {
      this.hideHover();
      return;
    }
    var target = this.findTarget(event.target, event);
    if (target) this.showHover(target);
    else this.hideHover();
  };

  SiteReview.prototype.onDocumentClick = function (event) {
    if (this.state.mode === "idle") return;
    if (event.target.closest && event.target.closest("#sr-root")) return;

    var target = this.findTarget(event.target, event);
    if (!target) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

	    if (this.state.mode === "edit") this.openEditModal(target);
	    else if (this.state.mode === "comment") {
	      var noteTarget = inferNoteTarget(event.target);
	      if (noteTarget) this.openCommentModal(noteTarget.target, noteTarget.targetType);
	    } else if (this.state.mode === "swap") this.openImageSwapModal(target);
	  };

  SiteReview.prototype.onKeydown = function (event) {
    if (event.key === "Escape" && this.state.mode !== "idle" && !isTypingTarget(event.target)) {
      this.setMode("idle");
      return;
    }

    if (event.metaKey || event.ctrlKey || !event.altKey || isTypingTarget(event.target)) return;

    if (event.code === "KeyN") {
      event.preventDefault();
      this.toggleMode("comment");
      return;
    }

	    if (event.code === "KeyE") {
	      event.preventDefault();
	      this.toggleMode("edit");
	      return;
	    }

	    if (event.code === "KeyI") {
	      event.preventDefault();
	      this.toggleMode("swap");
	      return;
	    }

	  };

  SiteReview.prototype.showHover = function (target) {
    var rect = target.getBoundingClientRect();
    if (!this.hoverOutline) {
      this.hoverOutline = createElement("div", "sr-hover-outline", '<span class="sr-hover-label"></span>');
      this.root.appendChild(this.hoverOutline);
    }
    this.hoverOutline.style.display = "block";
    this.hoverOutline.style.top = rect.top + "px";
    this.hoverOutline.style.left = rect.left + "px";
    this.hoverOutline.style.width = rect.width + "px";
    this.hoverOutline.style.height = rect.height + "px";
	    this.hoverOutline.classList.toggle("comment-mode", this.state.mode === "comment");
	    this.hoverOutline.classList.toggle("swap-mode", this.state.mode === "swap");
	    var targetType = "element";
	    if (this.state.mode === "comment") {
	      var noteTarget = inferNoteTarget(target);
	      targetType = noteTarget ? noteTarget.targetType : "element";
	    } else if (this.state.mode === "swap") {
	      targetType = "image";
	    }
	    var action = this.state.mode === "edit" ? "edit" : this.state.mode === "swap" ? "swap" : "add note";
    this.hoverOutline.querySelector(".sr-hover-label").textContent =
      labelForTargetType(targetType) + " - click to " + action;
  };

  SiteReview.prototype.hideHover = function () {
    if (this.hoverOutline) this.hoverOutline.style.display = "none";
  };

  SiteReview.prototype.openEditModal = function (target) {
    this.setMode("idle");
    var originalText = target.innerText || target.textContent || "";
    this.openModal({
      title: "Edit copy",
      target: target,
      isComment: false,
      defaultValue: originalText,
      originalForDisplay: originalText,
      onSave: function (newText) {
        if (normalizeText(newText) === normalizeText(originalText)) return;
        var context = getContext(target);
        var record = Object.assign({
          id: "e_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7),
          type: "edit",
          tagName: target.tagName.toLowerCase(),
          selector: getCssPath(target),
          xpath: getXpath(target),
          originalText: originalText,
          newText: newText,
          contextBefore: context.before,
          contextAfter: context.after,
          snippet: getSnippet(target),
          completed: false,
          completedAt: "",
          createdAt: new Date().toISOString()
        }, this.getRequesterMeta());
        this.state.edits.push(record);
        this.applyEdit(record);
        this.saveState();
        this.renderList();
        this.toast("Edit saved");
      }.bind(this)
    });
  };

	  SiteReview.prototype.openCommentModal = function (target, targetType) {
	    this.setMode("idle");
	    var resolvedTargetType = targetType || "element";
	    var elementText = getTargetDisplayText(target, resolvedTargetType);
    this.openModal({
      title: "Add note",
      target: target,
      isComment: true,
      targetType: resolvedTargetType,
      defaultValue: "",
      originalForDisplay: elementText || "<" + target.tagName.toLowerCase() + "> has no text content",
      onSave: function (comment, files) {
        if (!normalizeText(comment)) return;
        var context = getContext(target);
        var record = Object.assign({
          id: "c_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7),
          type: "comment",
          targetType: resolvedTargetType,
          tagName: target.tagName.toLowerCase(),
          selector: getCssPath(target),
          xpath: getXpath(target),
          elementText: elementText,
          comment: comment,
          contextBefore: context.before,
          contextAfter: context.after,
          snippet: getSnippet(target),
          completed: false,
          completedAt: "",
          createdAt: new Date().toISOString()
        }, this.getRequesterMeta());
        this.state.comments.push(record);
        target.setAttribute("data-sr-commented", record.id);
        this.saveState();
        this.renderList();
        this.toast("Note added");
        this.syncNote(record, files || []);
	      }.bind(this)
	    });
	  };

	  SiteReview.prototype.openImageSwapModal = function (target) {
	    this.setMode("idle");
	    var captured = captureImageSwapState(target);
	    if (!captured) {
	      this.toast("No swappable image found");
	      return;
	    }
	    var existingSwapId = target.getAttribute("data-sr-swapped");
	    var existingSwap = existingSwapId
	      ? this.state.imageSwaps.find(function (record) { return record.id === existingSwapId; })
	      : null;
	    if (existingSwap) {
	      captured = Object.assign({}, captured, {
	        kind: existingSwap.kind,
	        originalSrc: existingSwap.originalSrc,
	        originalSrcset: existingSwap.originalSrcset,
	        originalSizes: existingSwap.originalSizes,
	        originalPoster: existingSwap.originalPoster,
	        originalInlineBackgroundImage: existingSwap.originalInlineBackgroundImage,
	        originalBackgroundImage: existingSwap.originalBackgroundImage,
	        pictureSources: existingSwap.pictureSources || [],
	        displayValue: existingSwap.displayValue || captured.displayValue
	      });
	    }

	    var backdrop = createElement("div", "sr-modal-backdrop");
	    var modal = createElement("div", "sr-modal");
	    modal.innerHTML =
	      '<div class="sr-modal-title">Swap image</div>' +
	      '<div class="sr-modal-type">Local visual preview</div>' +
	      '<div class="sr-modal-target">' + escapeHtml(getCssPath(target)) + '</div>' +
	      '<div class="sr-modal-label">Current image</div>' +
	      '<div class="sr-modal-original">' + escapeHtml(captured.displayValue || "<" + target.tagName.toLowerCase() + ">") + '</div>' +
	      '<label class="sr-file-input">Choose replacement image<input id="sr-swap-file" type="file" accept="image/*"></label>' +
	      '<div class="sr-file-help">The replacement is applied to this page as a browser-local preview. Export records the file name and target selector.</div>' +
	      '<div class="sr-modal-actions">' +
	        '<button class="sr-btn sr-btn-secondary" id="sr-cancel" type="button">Cancel</button>' +
	        '<button class="sr-btn sr-btn-primary" id="sr-save" type="button">Apply preview</button>' +
	      '</div>';

	    backdrop.appendChild(modal);
	    this.root.appendChild(backdrop);

	    var input = modal.querySelector("#sr-swap-file");
	    var close = function () { backdrop.remove(); };
	    modal.querySelector("#sr-cancel").addEventListener("click", close);
	    modal.querySelector("#sr-save").addEventListener("click", function () {
	      var file = input.files && input.files[0];
	      if (!file) {
	        this.toast("Choose an image first");
	        return;
	      }

	      var context = getContext(target);
	      readFileAsDataUrl(file)
	        .then(function (dataUrl) {
	          var record = Object.assign({
	            id: "s_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7),
	            type: "swap",
	            targetType: "image",
	            tagName: target.tagName.toLowerCase(),
	            selector: getCssPath(target),
	            xpath: getXpath(target),
	            elementText: getTargetDisplayText(target, "image"),
	            replacementName: file.name,
	            replacementType: file.type || "image",
	            replacementSize: file.size || 0,
	            replacementUrl: dataUrl,
	            replacementDataUrl: dataUrl,
	            previewSessionId: previewSessionId,
	            previewStatus: "active",
	            contextBefore: context.before,
	            contextAfter: context.after,
	            snippet: getSnippet(target),
	            completed: false,
	            completedAt: "",
	            createdAt: new Date().toISOString()
	          }, captured, this.getRequesterMeta());

	          if (existingSwap) {
	            if (existingSwap.replacementUrl && existingSwap.replacementUrl.indexOf("blob:") === 0) {
	              URL.revokeObjectURL(existingSwap.replacementUrl);
	            }
	            this.state.imageSwaps = this.state.imageSwaps.filter(function (entry) {
	              return entry.id !== existingSwap.id;
	            });
	          }
	          this.state.imageSwaps.push(record);
	          this.applyImageSwap(record);
	          this.saveState();
	          this.renderList();
	          this.toast("Image preview applied");
	          close();
	        }.bind(this))
	        .catch(function () {
	          this.toast("Could not preview that image");
	        }.bind(this));
	    }.bind(this));
	    backdrop.addEventListener("click", function (event) {
	      if (event.target === backdrop) close();
	    });
	    input.addEventListener("keydown", function (event) {
	      if (event.key === "Escape") close();
	    });
	    input.focus();
	  };

	  SiteReview.prototype.openModal = function (config) {
    var backdrop = createElement("div", "sr-modal-backdrop");
    var modal = createElement("div", "sr-modal");
    modal.innerHTML =
      '<div class="sr-modal-title">' + escapeHtml(config.title) + '</div>' +
      (config.isComment
        ? '<div class="sr-modal-type">Target: ' + escapeHtml(labelForTargetType(config.targetType || "element")) + '</div>'
        : '') +
      '<div class="sr-modal-target">' + escapeHtml(getCssPath(config.target)) + '</div>' +
      '<div class="sr-modal-label">' + (config.isComment ? "Element content" : "Original text") + '</div>' +
      '<div class="sr-modal-original">' + escapeHtml(config.originalForDisplay) + '</div>' +
      '<div class="sr-modal-label">' + (config.isComment ? "Your note" : "New text") + '</div>' +
      '<textarea class="sr-modal-textarea' + (config.isComment ? " comment" : "") + '" id="sr-textarea"></textarea>' +
      (config.isComment
        ? '<label class="sr-file-input">Append images<input id="sr-files" type="file" accept="image/*" multiple></label>' +
          '<div class="sr-file-help">Images are uploaded to R2 and linked to the D1 note when cloud sync is unlocked.</div>'
        : '') +
      '<div class="sr-modal-actions">' +
        '<button class="sr-btn sr-btn-secondary" id="sr-cancel" type="button">Cancel</button>' +
        '<button class="sr-btn sr-btn-primary" id="sr-save" type="button">Save</button>' +
      '</div>';

    backdrop.appendChild(modal);
    this.root.appendChild(backdrop);

    var textarea = modal.querySelector("#sr-textarea");
    textarea.value = config.defaultValue;
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);

    var close = function () { backdrop.remove(); };
    modal.querySelector("#sr-cancel").addEventListener("click", close);
    modal.querySelector("#sr-save").addEventListener("click", function () {
      var fileInput = modal.querySelector("#sr-files");
      var files = fileInput ? Array.from(fileInput.files || []) : [];
      config.onSave(textarea.value, files);
      close();
    });
    backdrop.addEventListener("click", function (event) {
      if (event.target === backdrop) close();
    });
    textarea.addEventListener("keydown", function (event) {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        var fileInput = modal.querySelector("#sr-files");
        var files = fileInput ? Array.from(fileInput.files || []) : [];
        config.onSave(textarea.value, files);
        close();
      }
      if (event.key === "Escape") close();
    });
  };

	  SiteReview.prototype.applyEdit = function (record) {
	    var target = getElementFromRecord(record);
	    if (!target) return;

	    var currentText = normalizeText(target.textContent);
	    if (currentText === normalizeText(record.newText)) {
	      target.setAttribute("data-sr-edited", record.id);
	      this.applyCompletionMark(record, target);
	      return;
	    }

	    if (currentText === normalizeText(record.originalText)) {
	      target.textContent = record.newText;
	      target.setAttribute("data-sr-edited", record.id);
	      this.applyCompletionMark(record, target);
	    }
	  };

  SiteReview.prototype.applyCompletionMark = function (record, target) {
    if (!target) target = getElementFromRecord(record);
    if (!target) return;
    if (isCompleted(record)) target.setAttribute("data-sr-completed", record.id);
    else if (target.getAttribute("data-sr-completed") === record.id) target.removeAttribute("data-sr-completed");
  };

	  SiteReview.prototype.applyImageSwap = function (record) {
	    var target = getElementFromRecord(record);
	    if (!target || !record.replacementUrl) return;

	    var part = findImageSwapPart(target);
	    if (!part) return;

	    if (record.kind === "image" && part.kind === "image") {
	      var picture = part.element.closest("picture");
	      if (picture) {
	        Array.from(picture.querySelectorAll("source")).forEach(function (source) {
	          if (source.hasAttribute("srcset")) source.removeAttribute("srcset");
	        });
	      }
	      if (part.element.getAttribute("src") !== record.replacementUrl) part.element.setAttribute("src", record.replacementUrl);
	      if (part.element.hasAttribute("srcset")) part.element.removeAttribute("srcset");
	      if (part.element.hasAttribute("sizes")) part.element.removeAttribute("sizes");
	    } else if (record.kind === "video" && part.kind === "video") {
	      if (part.element.getAttribute("poster") !== record.replacementUrl) part.element.setAttribute("poster", record.replacementUrl);
	    } else if (record.kind === "background") {
	      var replacementBackground = 'url("' + record.replacementUrl.replace(/"/g, '\\"') + '")';
	      if (part.element.style.backgroundImage !== replacementBackground) part.element.style.backgroundImage = replacementBackground;
	    } else {
	      return;
	    }

	    target.setAttribute("data-sr-swapped", record.id);
	    this.applyCompletionMark(record, target);
	    record.previewStatus = "active";
	  };

	  SiteReview.prototype.revertImageSwap = function (record) {
	    var target = getElementFromRecord(record);
	    if (!target) return;

	    var part = findImageSwapPart(target);
	    var shouldRestore = target.getAttribute("data-sr-swapped") === record.id;
	    if (shouldRestore && part) {
	      if (record.kind === "image" && part.kind === "image") {
	        restoreAttribute(part.element, "src", record.originalSrc);
	        restoreAttribute(part.element, "srcset", record.originalSrcset);
	        restoreAttribute(part.element, "sizes", record.originalSizes);
	        var picture = part.element.closest("picture");
	        if (picture && Array.isArray(record.pictureSources)) {
	          var sources = Array.from(picture.querySelectorAll("source"));
	          record.pictureSources.forEach(function (sourceRecord) {
	            if (sources[sourceRecord.index]) restoreAttribute(sources[sourceRecord.index], "srcset", sourceRecord.srcset);
	          });
	        }
	      } else if (record.kind === "video" && part.kind === "video") {
	        restoreAttribute(part.element, "poster", record.originalPoster);
	      } else if (record.kind === "background") {
	        part.element.style.backgroundImage = record.originalInlineBackgroundImage || "";
	      }
	      target.removeAttribute("data-sr-swapped");
	      if (target.getAttribute("data-sr-completed") === record.id) target.removeAttribute("data-sr-completed");
	    }

	    if (record.replacementUrl && record.replacementUrl.indexOf("blob:") === 0) {
	      URL.revokeObjectURL(record.replacementUrl);
	    }
	  };

	  SiteReview.prototype.applySavedMarks = function () {
	    this.state.edits.forEach(this.applyEdit.bind(this));
	    this.state.comments.forEach(function (record) {
	      var target = getElementFromRecord(record);
	      if (target) {
	        target.setAttribute("data-sr-commented", record.id);
	        this.applyCompletionMark(record, target);
	      }
	    }.bind(this));
	    this.state.imageSwaps.forEach(function (record) {
	      if (record.replacementUrl) this.applyImageSwap(record);
	    }.bind(this));
	  };

  SiteReview.prototype.hasVisualRecords = function () {
    return Boolean(
      this.state.edits.length ||
      this.state.comments.length ||
      this.state.imageSwaps.some(function (record) { return Boolean(record.replacementUrl); })
    );
  };

  SiteReview.prototype.scheduleApplySavedMarks = function () {
    if (this.applyQueued || !this.root || !this.hasVisualRecords()) return;
    this.applyQueued = true;
    window.requestAnimationFrame(function () {
      this.applyQueued = false;
      this.applySavedMarks();
    }.bind(this));
  };

  SiteReview.prototype.queueApplyPasses = function () {
    [80, 250, 700, 1500].forEach(function (delay) {
      var timer = window.setTimeout(function () {
        this.scheduleApplySavedMarks();
      }.bind(this), delay);
      this.applyTimers.push(timer);
    }.bind(this));
  };

  SiteReview.prototype.startApplyObserver = function () {
    if (this.applyObserver || !window.MutationObserver || !document.body) return;
    this.applyObserver = new MutationObserver(function (mutations) {
      var shouldApply = mutations.some(function (mutation) {
        var target = mutation.target;
        if (target && target.nodeType !== 1) target = target.parentElement;
        return target instanceof Element && !target.closest("#sr-root");
      });
      if (shouldApply) this.scheduleApplySavedMarks();
    }.bind(this));
    this.applyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class", "style", "src", "srcset", "sizes", "poster"],
      characterData: true,
      childList: true,
      subtree: true
    });
  };

	  SiteReview.prototype.totalCount = function () {
	    return this.state.edits.length + this.state.comments.length + this.state.imageSwaps.length;
	  };

  SiteReview.prototype.renderBadge = function () {
    var count = this.totalCount();
    if (!this.badge) return;
    this.badge.style.display = count > 0 ? "flex" : "none";
    this.badge.textContent = String(count);
  };

  SiteReview.prototype.renderRecordMeta = function (record) {
    var html = '<span class="sr-status-chip ' + recordStatusLabel(record) + '">' + recordStatusLabel(record) + '</span>';
    if (record.requesterCode || record.requesterLabel) {
      html += '<span class="sr-requester-chip">' +
        escapeHtml(record.requesterLabel || record.requesterCode) +
        '</span>';
    }
    return html;
  };

  SiteReview.prototype.renderCompleteButton = function (record, type) {
    return '<button class="sr-complete-toggle" data-complete="' + escapeHtml(record.id) +
      '" data-complete-type="' + escapeHtml(type) + '" type="button" title="' +
      (isCompleted(record) ? "Mark open" : "Mark completed") + '">' +
      (isCompleted(record) ? "Reopen" : "Complete") +
      '</button>';
  };

  SiteReview.prototype.renderList = function () {
    this.renderBadge();
    this.exportButton.disabled = this.totalCount() === 0;

    if (this.totalCount() === 0) {
      this.list.innerHTML =
	        '<div class="sr-empty">' +
	          '<div class="sr-empty-icon">' + ICONS.empty + '</div>' +
	          'No edits, notes, or image previews yet.<br>Pick a mode above and click the page to start.' +
	        '</div>';
      return;
	    }

	    var html = "";
	    if (this.state.edits.length) {
	      html += '<div class="sr-section-label">Edits (' + this.state.edits.length + ')</div>';
	      this.state.edits.forEach(function (record) {
	        html +=
	          '<div class="sr-item' + (isCompleted(record) ? ' completed' : '') + '" data-id="' + escapeHtml(record.id) + '" data-type="edit">' +
	            '<div class="sr-item-head">' +
	              '<span class="sr-tag edit">edit</span>' +
	              '<span class="sr-tag-elem">&lt;' + escapeHtml(record.tagName) + '&gt;</span>' +
	              this.renderRecordMeta(record) +
	              this.renderCompleteButton(record, "edit") +
	              '<button class="sr-item-delete" data-del="' + escapeHtml(record.id) + '" data-del-type="edit" type="button" title="Remove">' + ICONS.close + '</button>' +
	            '</div>' +
	            '<div class="sr-item-old sr-clamp">' + escapeHtml(record.originalText) + '</div>' +
	            '<div class="sr-item-new sr-clamp">' + escapeHtml(record.newText) + '</div>' +
	          '</div>';
	      }.bind(this));
	    }

	    if (this.state.comments.length) {
	      html += '<div class="sr-section-label">Notes (' + this.state.comments.length + ')</div>';
      this.state.comments.forEach(function (record) {
        var targetText = record.elementText || "<" + record.tagName + ">";
        var targetType = record.targetType || "element";
        var imageCount = Array.isArray(record.images) ? record.images.length : 0;
        var syncText = record.syncStatus === "synced"
          ? "synced"
          : record.syncStatus === "syncing"
            ? "syncing"
            : "local";
        html +=
          '<div class="sr-item' + (isCompleted(record) ? ' completed' : '') + '" data-id="' + escapeHtml(record.id) + '" data-type="comment">' +
	            '<div class="sr-item-head">' +
	              '<span class="sr-tag comment">' + escapeHtml(targetType) + '</span>' +
	              '<span class="sr-tag-elem">&lt;' + escapeHtml(record.tagName) + '&gt;</span>' +
	              '<span class="sr-sync-chip ' + escapeHtml(syncText) + '">' + escapeHtml(syncText) + '</span>' +
	              this.renderRecordMeta(record) +
	              this.renderCompleteButton(record, "comment") +
	              '<button class="sr-item-delete" data-del="' + escapeHtml(record.id) + '" data-del-type="comment" type="button" title="Remove">' + ICONS.close + '</button>' +
            '</div>' +
            '<div class="sr-item-target sr-clamp">on: "' + escapeHtml(targetText) + '"</div>' +
            '<div class="sr-item-comment sr-clamp">' + escapeHtml(record.comment) + '</div>' +
	            (imageCount ? '<div class="sr-attachment-count">' + imageCount + ' image' + (imageCount === 1 ? '' : 's') + ' attached</div>' : '') +
	            (record.syncError ? '<div class="sr-sync-error">' + escapeHtml(record.syncError) + '</div>' : '') +
	          '</div>';
		      }.bind(this));
	    }

	    if (this.state.imageSwaps.length) {
	      html += '<div class="sr-section-label">Image Previews (' + this.state.imageSwaps.length + ')</div>';
	      this.state.imageSwaps.forEach(function (record) {
	        var targetText = record.elementText || record.originalSrc || record.originalBackgroundImage || "<" + record.tagName + ">";
	        var previewText = record.previewStatus === "expired" ? "preview expired" : "preview active";
	        html +=
	          '<div class="sr-item' + (isCompleted(record) ? ' completed' : '') + '" data-id="' + escapeHtml(record.id) + '" data-type="swap">' +
	            '<div class="sr-item-head">' +
	              '<span class="sr-tag swap">swap</span>' +
	              '<span class="sr-tag-elem">&lt;' + escapeHtml(record.tagName) + '&gt;</span>' +
	              '<span class="sr-sync-chip ' + (record.previewStatus === "expired" ? "local" : "synced") + '">' + escapeHtml(previewText) + '</span>' +
	              this.renderRecordMeta(record) +
	              this.renderCompleteButton(record, "swap") +
	              '<button class="sr-item-delete" data-del="' + escapeHtml(record.id) + '" data-del-type="swap" type="button" title="Remove">' + ICONS.close + '</button>' +
	            '</div>' +
	            '<div class="sr-item-target sr-clamp">on: "' + escapeHtml(targetText) + '"</div>' +
	            '<div class="sr-item-comment sr-clamp">' + escapeHtml(record.replacementName || "Replacement image") + '</div>' +
	          '</div>';
	      }.bind(this));
	    }

    this.list.innerHTML = html;
    this.bindListEvents();
  };

  SiteReview.prototype.bindListEvents = function () {
    this.list.querySelectorAll(".sr-item").forEach((item) => {
      item.addEventListener("click", (event) => {
        if (event.target.closest("[data-del], [data-complete]")) return;
	        var collection = item.dataset.type === "edit"
	          ? this.state.edits
	          : item.dataset.type === "swap"
	            ? this.state.imageSwaps
	            : this.state.comments;
        var record = collection.find(function (entry) { return entry.id === item.dataset.id; });
        var target = record && getElementFromRecord(record);
        if (!target) {
          this.toast("Element is no longer on this page");
          return;
        }
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        this.flash(target);
      });
    });

    this.list.querySelectorAll("[data-del]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        this.removeRecord(button.dataset.del, button.dataset.delType);
      });
    });

    this.list.querySelectorAll("[data-complete]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        this.toggleComplete(button.dataset.complete, button.dataset.completeType);
      });
    });
  };

  SiteReview.prototype.getCollectionForType = function (type) {
    if (type === "edit") return this.state.edits;
    if (type === "swap") return this.state.imageSwaps;
    return this.state.comments;
  };

  SiteReview.prototype.toggleComplete = function (id, type) {
    var collection = this.getCollectionForType(type);
    var record = collection.find(function (entry) { return entry.id === id; });
    if (!record) return;

    var completed = !isCompleted(record);
    record.completed = completed;
    record.completedAt = completed ? new Date().toISOString() : "";
    this.applyCompletionMark(record);
    this.saveState();
    this.renderList();
    if (type === "comment") this.syncNoteStatus(record);
  };

  SiteReview.prototype.syncNoteStatus = function (record) {
    if (!this.options.enableCloudSync || !this.state.cloudAuthenticated || !record || !record.id) return;

    fetch(this.options.syncEndpoint, {
      method: "PATCH",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: record.id,
        completed: Boolean(record.completed),
        completedAt: record.completedAt || ""
      })
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Could not update note status");
        return response.json();
      })
      .then(function (data) {
        record.completed = Boolean(data.completed);
        record.completedAt = data.completedAt || "";
        this.applyCompletionMark(record);
        this.saveState();
        this.renderList();
      }.bind(this))
      .catch(function (error) {
        record.syncError = error.message || "Could not update note status.";
        this.saveState();
        this.renderList();
      }.bind(this));
  };

  SiteReview.prototype.removeRecord = function (id, type) {
    if (type === "edit") {
      var edit = this.state.edits.find(function (record) { return record.id === id; });
      if (edit) {
        var editedTarget = document.querySelector('[data-sr-edited="' + CSS.escape(id) + '"]');
        if (editedTarget) {
          editedTarget.textContent = edit.originalText;
          editedTarget.removeAttribute("data-sr-edited");
          if (editedTarget.getAttribute("data-sr-completed") === id) editedTarget.removeAttribute("data-sr-completed");
        }
      }
      this.state.edits = this.state.edits.filter(function (record) { return record.id !== id; });
	    } else if (type === "comment") {
	      var commentedTarget = document.querySelector('[data-sr-commented="' + CSS.escape(id) + '"]');
	      if (commentedTarget) {
	        commentedTarget.removeAttribute("data-sr-commented");
	        if (commentedTarget.getAttribute("data-sr-completed") === id) commentedTarget.removeAttribute("data-sr-completed");
	      }
	      this.state.comments = this.state.comments.filter(function (record) { return record.id !== id; });
	      this.deleteCloudNote(id);
	    } else if (type === "swap") {
	      var swap = this.state.imageSwaps.find(function (record) { return record.id === id; });
	      if (swap) this.revertImageSwap(swap);
	      this.state.imageSwaps = this.state.imageSwaps.filter(function (record) { return record.id !== id; });
	    }
	    this.saveState();
	    this.renderList();
	  };

	  SiteReview.prototype.clear = function () {
	    if (this.totalCount() === 0) return;
	    var confirmed = window.confirm("Clear all Site Review edits, notes, and image previews? This cannot be undone.");
	    if (!confirmed) return;

    this.state.edits.forEach(function (record) {
      var target = document.querySelector('[data-sr-edited="' + CSS.escape(record.id) + '"]');
      if (target) {
        target.textContent = record.originalText;
        target.removeAttribute("data-sr-edited");
        if (target.getAttribute("data-sr-completed") === record.id) target.removeAttribute("data-sr-completed");
      }
    });
	    this.state.comments.forEach(function (record) {
	      var target = document.querySelector('[data-sr-commented="' + CSS.escape(record.id) + '"]');
	      if (target) {
	        target.removeAttribute("data-sr-commented");
	        if (target.getAttribute("data-sr-completed") === record.id) target.removeAttribute("data-sr-completed");
	      }
	      this.deleteCloudNote(record.id);
	    }.bind(this));
	    this.state.imageSwaps.forEach(this.revertImageSwap.bind(this));

	    this.state.edits = [];
	    this.state.comments = [];
	    this.state.imageSwaps = [];
	    this.saveState();
	    this.renderList();
	  };

  SiteReview.prototype.flash = function (target) {
    var previousTransition = target.style.transition;
    var previousBackground = target.style.backgroundColor;
    target.style.transition = "background-color 600ms ease";
    target.style.backgroundColor = "rgba(225, 177, 155, 0.42)";
    window.setTimeout(function () {
      target.style.backgroundColor = previousBackground;
      window.setTimeout(function () {
        target.style.transition = previousTransition;
      }, 600);
    }, 700);
  };

  SiteReview.prototype.toast = function (message) {
    var toast = createElement("div", "sr-toast");
    toast.textContent = message;
    this.root.appendChild(toast);
    window.setTimeout(function () { toast.remove(); }, 1800);
  };

  SiteReview.prototype.exportMarkdown = function () {
    if (this.totalCount() === 0) return;
    var markdown = this.createMarkdown();
    saveMarkdown(this.options.exportFilenamePrefix, markdown);
    this.toast("Markdown exported");
  };

  SiteReview.prototype.createMarkdown = function () {
    var exportedAt = new Date().toISOString();
    var pageTitle = document.title || "(untitled)";
    var pageUrl = location.href;
    var markdown = "";

    markdown += "# Site Review Report\n\n";
	    markdown += "> Instructions for the coding agent: apply copy edits by locating each element with the CSS selector first, XPath as fallback, and use the original text plus DOM snippet for verification. Treat notes as review notes and propose the appropriate implementation change. Image swaps are visual preview requests; use the replacement file name and target details to update the project asset manually.\n\n";
    markdown += "**Project:** " + this.options.projectName + "\n";
    markdown += "**Page:** " + pageTitle + "\n";
    markdown += "**URL:** " + pageUrl + "\n";
	    markdown += "**Exported:** " + exportedAt + "\n";
	    markdown += "**Total edits:** " + this.state.edits.length + "\n";
	    markdown += "**Total notes:** " + this.state.comments.length + "\n";
	    markdown += "**Total image swaps:** " + this.state.imageSwaps.length + "\n\n";
	    markdown += "---\n\n";

    if (this.state.edits.length) {
      markdown += "## Copy Edits\n\n";
      this.state.edits.forEach(function (record, index) {
        markdown += "### Edit " + (index + 1) + ": `<" + record.tagName + ">`\n\n";
        markdown += "**Status:** " + recordStatusLabel(record) + "\n";
        if (record.requesterCode || record.requesterLabel) markdown += "**Requested by:** " + (record.requesterLabel || record.requesterCode) + "\n";
        markdown += "\n";
        markdown += "**CSS Selector:**\n```css\n" + record.selector + "\n```\n\n";
        markdown += "**XPath fallback:**\n```\n" + record.xpath + "\n```\n\n";
        markdown += "**Original text:**\n> " + String(record.originalText).split("\n").join("\n> ") + "\n\n";
        markdown += "**New text:**\n> " + String(record.newText).split("\n").join("\n> ") + "\n\n";
        if (record.contextBefore || record.contextAfter) {
          markdown += "**Surrounding context:**\n";
          if (record.contextBefore) markdown += "- Previous sibling text: \"" + record.contextBefore + "\"\n";
          if (record.contextAfter) markdown += "- Next sibling text: \"" + record.contextAfter + "\"\n";
          markdown += "\n";
        }
        markdown += "**DOM snippet:**\n```html\n" + record.snippet + "\n```\n\n---\n\n";
      });
    }

	    if (this.state.comments.length) {
	      markdown += "## Notes\n\n";
      this.state.comments.forEach(function (record, index) {
        var targetType = record.targetType || "element";
        var images = Array.isArray(record.images) ? record.images : [];
        markdown += "### Note " + (index + 1) + ": " + targetType + " `<" + record.tagName + ">`\n\n";
        markdown += "**Status:** " + recordStatusLabel(record) + "\n";
        if (record.requesterCode || record.requesterLabel) markdown += "**Requested by:** " + (record.requesterLabel || record.requesterCode) + "\n";
        markdown += "\n";
        markdown += "**CSS Selector:**\n```css\n" + record.selector + "\n```\n\n";
        markdown += "**XPath fallback:**\n```\n" + record.xpath + "\n```\n\n";
        if (record.elementText) {
          markdown += "**Element text content:**\n> " + String(record.elementText).split("\n").join("\n> ") + "\n\n";
        }
        markdown += "**Note:**\n" + record.comment + "\n\n";
        if (images.length) {
          markdown += "**Attached images:**\n";
          images.forEach(function (image) {
            markdown += "- " + (image.filename || image.id || "image") + ": " + image.url + "\n";
          });
          markdown += "\n";
        }
        if (record.contextBefore || record.contextAfter) {
          markdown += "**Surrounding context:**\n";
          if (record.contextBefore) markdown += "- Previous sibling text: \"" + record.contextBefore + "\"\n";
          if (record.contextAfter) markdown += "- Next sibling text: \"" + record.contextAfter + "\"\n";
          markdown += "\n";
        }
        markdown += "**DOM snippet:**\n```html\n" + record.snippet + "\n```\n\n---\n\n";
	      });
	    }

	    if (this.state.imageSwaps.length) {
	      markdown += "## Image Swaps\n\n";
	      this.state.imageSwaps.forEach(function (record, index) {
	        markdown += "### Image Swap " + (index + 1) + ": `<" + record.tagName + ">`\n\n";
	        markdown += "**Status:** " + recordStatusLabel(record) + "\n";
	        if (record.requesterCode || record.requesterLabel) markdown += "**Requested by:** " + (record.requesterLabel || record.requesterCode) + "\n";
	        markdown += "\n";
	        markdown += "**CSS Selector:**\n```css\n" + record.selector + "\n```\n\n";
	        markdown += "**XPath fallback:**\n```\n" + record.xpath + "\n```\n\n";
	        if (record.elementText) {
	          markdown += "**Target content:**\n> " + String(record.elementText).split("\n").join("\n> ") + "\n\n";
	        }
	        markdown += "**Replacement file:** " + (record.replacementName || "replacement image") + "\n";
	        if (record.replacementType) markdown += "**Replacement type:** " + record.replacementType + "\n";
	        if (record.replacementSize) markdown += "**Replacement size:** " + record.replacementSize + " bytes\n";
	        markdown += "\n";
	        if (record.kind === "image") {
	          markdown += "**Original image source:**\n```\n" + (record.originalSrc || "") + "\n```\n\n";
	          if (record.originalSrcset) markdown += "**Original srcset:**\n```\n" + record.originalSrcset + "\n```\n\n";
	        } else if (record.kind === "video") {
	          markdown += "**Original poster:**\n```\n" + (record.originalPoster || "") + "\n```\n\n";
	        } else {
	          markdown += "**Original background image:**\n```\n" + (record.originalBackgroundImage || record.originalInlineBackgroundImage || "") + "\n```\n\n";
	        }
	        if (record.contextBefore || record.contextAfter) {
	          markdown += "**Surrounding context:**\n";
	          if (record.contextBefore) markdown += "- Previous sibling text: \"" + record.contextBefore + "\"\n";
	          if (record.contextAfter) markdown += "- Next sibling text: \"" + record.contextAfter + "\"\n";
	          markdown += "\n";
	        }
	        markdown += "**DOM snippet:**\n```html\n" + record.snippet + "\n```\n\n---\n\n";
	      });
	    }

	    return markdown;
	  };

  window.SiteReview = {
    mount: function (options) {
      if (activeInstance) activeInstance.unmount();
      activeInstance = new SiteReview(options).mount();
      return activeInstance;
    },
    unmount: function () {
      if (activeInstance) activeInstance.unmount();
    },
    getInstance: function () {
      return activeInstance;
    }
  };
})();
