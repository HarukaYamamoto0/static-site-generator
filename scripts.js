import themes from "./themes.js";

/**
 * Static Site Generator - Main Application
 * @author HarukaYamamoto0
 */
class StaticSiteGenerator {
  constructor() {
    this.currentTheme = "default";
    this.currentView = "visual";
    this.generatedHTML = "";

    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    this.cacheElements();
    this.bindEvents();
    this.updatePreview();
  }

  /**
   * Cache DOM elements for better performance
   */
  cacheElements() {
    this.elements = {
      themeSelect: document.getElementById("themeSelect"),
      generateSiteButton: document.getElementById("generateSite"),
      downloadHTMLButton: document.getElementById("downloadHTML"),
      copyHTMLButton: document.getElementById("copyHTML"),
      markdownInput: document.getElementById("markdownInput"),
      previewContent: document.getElementById("previewContent"),
      tabs: document.querySelectorAll(".tab"),
    };

    // Validate required elements
    this.validateElements();
  }

  /**
   * Validate that all required DOM elements exist
   */
  validateElements() {
    const requiredElements = [
      "markdownInput",
      "previewContent",
      "themeSelect",
      "generateSiteButton",
      "downloadHTMLButton",
      "copyHTMLButton",
    ];

    requiredElements.forEach((elementName) => {
      if (!this.elements[elementName]) {
        console.error(`Required element "${elementName}" not found`);
      }
    });
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Theme selection
    this.elements.themeSelect?.addEventListener("change", (e) => {
      this.changeTheme(e.target.value);
    });

    // Button actions
    this.elements.generateSiteButton?.addEventListener("click", (e) => {
      this.generateSite(e);
    });

    this.elements.downloadHTMLButton?.addEventListener("click", (e) => {
      this.downloadHTML(e);
    });

    this.elements.copyHTMLButton?.addEventListener("click", (e) => {
      this.copyHTML(e);
    });

    // Real-time preview update
    this.elements.markdownInput?.addEventListener("input", () => {
      this.debounce(this.updatePreview.bind(this), 300)();
    });

    // Tab switching
    this.elements.tabs?.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        this.showPreview(e.target.dataset.view || "visual", e);
      });
    });
  }

  /**
   * Debounce function to limit frequent updates
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Update the preview content
   */
  updatePreview() {
    if (!this.elements.markdownInput || !this.elements.previewContent) {
      console.error("Required elements for preview not found");
      return;
    }

    const markdown = this.elements.markdownInput.value;

    try {
      const html = marked.parse(markdown);
      this.elements.previewContent.innerHTML = html;
      this.elements.previewContent.className =
        "preview-content markdown-content";
    } catch (error) {
      console.error("Error parsing markdown:", error);
      this.elements.previewContent.innerHTML =
        '<p style="color: red;">Error processing markdown</p>';
    }
  }

  /**
   * Show preview in different modes
   */
  showPreview(type, event) {
    if (!["visual", "html"].includes(type)) {
      console.warn(`Invalid preview type: ${type}`);
      return;
    }

    this.currentView = type;

    // Update active tab
    this.elements.tabs?.forEach((tab) => tab.classList.remove("active"));
    event?.target?.classList.add("active");

    this.updatePreview();
  }

  /**
   * Change the current theme
   */
  changeTheme(themeName) {
    if (!themes[themeName]) {
      console.warn(`Theme "${themeName}" not found, using default`);
      themeName = "default";
    }

    this.currentTheme = themeName;
    this.updatePreview();
  }

  /**
   * Generate complete HTML with theme styles
   */
  generateFullHTML(content) {
    const title = this.extractTitle(content) || "My Website";
    const containerClass =
      this.currentTheme === "blog" ? 'class="container"' : "";
    const currentThemeStyles = themes[this.currentTheme] || themes.default;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="generator" content="Static Site Generator by HarukaYamamoto0">
    <title>${this.escapeHtml(title)}</title>
    <style>
        ${currentThemeStyles}
    </style>
</head>
<body>
    <div ${containerClass}>
        ${content}
    </div>
</body>
</html>`;
  }

  /**
   * Extract title from HTML content
   */
  extractTitle(html) {
    const match = html.match(/<h1[^>]*>(.*?)<\/h1>/);
    return match ? match[1].replace(/<[^>]*>/g, "").trim() : null;
  }

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Validate markdown content
   */
  validateMarkdown(markdown) {
    return markdown && markdown.trim().length > 0;
  }

  /**
   * Show user feedback on buttons
   */
  showButtonFeedback(button, message, color = "#10b981", duration = 2000) {
    if (!button) return;

    const originalText = button.innerHTML;
    const originalBackground = button.style.background;

    button.innerHTML = message;
    button.style.background = color;
    button.disabled = true;

    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.background = originalBackground;
      button.disabled = false;
    }, duration);
  }

  /**
   * Generate site and open in new tab
   */
  generateSite(event) {
    const markdown = this.elements.markdownInput?.value;

    if (!this.validateMarkdown(markdown)) {
      alert("Please add some markdown content first!");
      return;
    }

    try {
      const html = marked.parse(markdown);
      this.generatedHTML = this.generateFullHTML(html);

      const blob = new Blob([this.generatedHTML], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      const newWindow = window.open(url, "_blank");

      if (!newWindow) {
        alert("Pop-up blocked! Please allow pop-ups for this site.");
        return;
      }

      // Clean up object URL after a delay
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      this.showButtonFeedback(event?.target, "✅ Website Generated!");
    } catch (error) {
      console.error("Error generating site:", error);
      this.showButtonFeedback(event?.target, "❌ Erro!", "#ef4444");
    }
  }

  /**
   * Download HTML file
   */
  downloadHTML(event) {
    const markdown = this.elements.markdownInput?.value;

    if (!this.validateMarkdown(markdown)) {
      alert("Please add some markdown content first!");
      return;
    }

    try {
      const html = marked.parse(markdown);
      const fullHTML = this.generateFullHTML(html);

      const title = this.extractTitle(html) || "site";
      const filename = `${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.html`;

      const blob = new Blob([fullHTML], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.style.display = "none";

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);

      this.showButtonFeedback(event?.target, "✅ Download!");
    } catch (error) {
      console.error("Error downloading HTML:", error);
      this.showButtonFeedback(event?.target, "❌ Erro!", "#ef4444");
    }
  }

  /**
   * Copy HTML to clipboard
   */
  async copyHTML(event) {
    const markdown = this.elements.markdownInput?.value;

    if (!this.validateMarkdown(markdown)) {
      alert("Please add some markdown content first!");
      return;
    }

    try {
      const html = marked.parse(markdown);
      const fullHTML = this.generateFullHTML(html);

      if (!navigator.clipboard) {
        // Fallback for older browsers
        this.fallbackCopyToClipboard(fullHTML);
      } else {
        await navigator.clipboard.writeText(fullHTML);
      }

      this.showButtonFeedback(event?.target, "✅ Copiado!");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      this.showButtonFeedback(event?.target, "❌ Erro!", "#ef4444");
    }
  }

  /**
   * Fallback copy method for older browsers
   */
  fallbackCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Fallback copy failed:", err);
      throw new Error("Copy not supported");
    }

    document.body.removeChild(textArea);
  }

  /**
   * Get current theme
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Get generated HTML
   */
  getGeneratedHTML() {
    return this.generatedHTML;
  }

  /**
   * Export configuration for debugging
   */
  exportConfig() {
    return {
      currentTheme: this.currentTheme,
      currentView: this.currentView,
      availableThemes: Object.keys(themes),
      timestamp: new Date().toISOString(),
    };
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.siteGenerator = new StaticSiteGenerator();
});

// Export for module use
export default StaticSiteGenerator;
