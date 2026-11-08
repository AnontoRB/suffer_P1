/**
 * Shared code for every page: SiteSettings (top bar, settings panel, backup)
 * and App (dates, calendar, progress saving, confetti, toasts).
 * Load it in the <head> of every page so the theme applies before first paint.
 */

/**
 * Top bar (site name on the left, Settings on the right), the settings panel,
 * and the export / import system. Load it in the <head> of every page.
 * Exposes one global object: SiteSettings.
 *
 * Everything is stored locally in this browser (localStorage). Nothing is sent anywhere.
 */
const SiteSettings = (() => {
  "use strict";

  const KEY = "site-settings-v1";
  const APP_ID = "challenges-site";
  const DEFAULT_NAME = "My plan to Jan 6";
  const DEFAULTS = { name: DEFAULT_NAME, theme: "auto", accent: "default", size: "normal", confetti: true };

  /** Every localStorage key the site uses. Export and import only touch these. */
  const DATA_KEYS = ["rust-plan-v1", "marathon-plan-v1", "health-plan-v1", "cubing-plan-v1", "tasks-plan-v1", "diary-plan-v1", "home-clock-24h", KEY];

  const ACCENTS = { orange: "#D9561E", teal: "#0E7C7B", blue: "#2D7FB8", purple: "#7B3FA0", green: "#2E7D5B" };

  // ---------------------------------------------------------------------
  // Saved settings
  // ---------------------------------------------------------------------

  function get() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      if (saved && typeof saved === "object") return { ...DEFAULTS, ...saved };
    } catch (error) {
      // Storage unavailable or corrupted: use the defaults.
    }
    return { ...DEFAULTS };
  }

  function set(patch) {
    const next = { ...get(), ...patch };
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch (error) {
      // Storage unavailable: the change lasts until the page is closed.
    }
    apply(next);
    return next;
  }

  /** Puts the settings onto the page (theme, accent, text size, site name). */
  function apply(settings = get()) {
    const root = document.documentElement;
    if (settings.theme === "light" || settings.theme === "dark") root.dataset.theme = settings.theme;
    else delete root.dataset.theme;

    if (ACCENTS[settings.accent]) {
      root.dataset.accent = settings.accent;
      root.style.setProperty("--user-acc", ACCENTS[settings.accent]);
    } else {
      delete root.dataset.accent;
      root.style.removeProperty("--user-acc");
    }

    if (settings.size === "small" || settings.size === "large") root.dataset.size = settings.size;
    else delete root.dataset.size;

    const name = document.querySelector(".topbar-name");
    if (name) name.textContent = settings.name.trim() || DEFAULT_NAME;
  }

  apply(); // before first paint, so there is no flash of the wrong theme

  // ---------------------------------------------------------------------
  // Export, import, reset
  // ---------------------------------------------------------------------

  function exportData() {
    const data = {};
    DATA_KEYS.forEach((key) => {
      try {
        const value = localStorage.getItem(key);
        if (value !== null) data[key] = value;
      } catch (error) {
        // Skip unreadable keys.
      }
    });

    const backup = { app: APP_ID, version: 1, exportedAt: new Date().toISOString(), data };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `plan-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    return Object.keys(data).length;
  }

  /** Reads a backup file and replaces the saved data with it. Throws a readable Error on failure. */
  async function importData(file) {
    let backup;
    try {
      backup = JSON.parse(await file.text());
    } catch (error) {
      throw new Error("That file is not valid JSON.");
    }
    if (!backup || backup.app !== APP_ID || typeof backup.data !== "object" || backup.data === null) {
      throw new Error("That file is not a backup from this site.");
    }

    const entries = Object.entries(backup.data).filter(([key, value]) => DATA_KEYS.includes(key) && typeof value === "string");
    if (entries.length === 0) throw new Error("The backup has no data in it.");
    entries.forEach(([, value]) => {
      try { JSON.parse(value); } catch (error) { throw new Error("The backup is damaged."); }
    });

    if (!confirm("Importing replaces all progress and settings saved in this browser with the backup. Continue?")) return false;
    DATA_KEYS.forEach((key) => localStorage.removeItem(key));
    entries.forEach(([key, value]) => localStorage.setItem(key, value));
    return true;
  }

  function resetAll() {
    DATA_KEYS.forEach((key) => {
      try { localStorage.removeItem(key); } catch (error) { /* ignore */ }
    });
  }

  function storageSize() {
    let bytes = 0;
    DATA_KEYS.forEach((key) => {
      try { bytes += (localStorage.getItem(key) || "").length * 2; } catch (error) { /* ignore */ }
    });
    return bytes < 1024 ? `${bytes} bytes` : `${(bytes / 1024).toFixed(1)} KB`;
  }

  // ---------------------------------------------------------------------
  // Top bar and settings panel
  // ---------------------------------------------------------------------

  let overlay = null;
  let opener = null;

  function segment(setting, options, current) {
    return `<div class="seg" data-setting="${setting}">${options.map(([value, label]) =>
      `<button type="button" data-value="${value}" aria-pressed="${value === current}">${label}</button>`).join("")}</div>`;
  }

  function swatches(current) {
    const none = `<button type="button" data-value="default" aria-pressed="${current === "default"}">Default</button>`;
    const dots = Object.entries(ACCENTS).map(([name, color]) =>
      `<button type="button" class="swatch" data-value="${name}" style="background:${color}" aria-label="${name}" aria-pressed="${name === current}"></button>`).join("");
    return `<div class="seg" data-setting="accent">${none}${dots}</div>`;
  }

  function openSettings() {
    if (overlay) return;
    const s = get();
    overlay = document.createElement("div");
    overlay.className = "settings-overlay";
    overlay.innerHTML = `
      <div class="settings-box" role="dialog" aria-modal="true" aria-labelledby="settings-title">
        <div class="settings-head">
          <h2 id="settings-title">Settings</h2>
          <button type="button" id="settings-close">Close</button>
        </div>

        <h3>Customize</h3>
        <div class="settings-row">
          <label for="settings-name">Site name</label>
          <input type="text" id="settings-name" maxlength="40" value="" placeholder="${DEFAULT_NAME}">
        </div>
        <div class="settings-row"><span>Appearance</span>
          ${segment("theme", [["auto", "Automatic"], ["light", "Light"], ["dark", "Dark"]], s.theme)}</div>
        <div class="settings-row"><span>Accent colour</span>${swatches(s.accent)}</div>
        <div class="settings-row"><span>Text size</span>
          ${segment("size", [["small", "Small"], ["normal", "Normal"], ["large", "Large"]], s.size)}</div>
        <div class="settings-row">
          <label class="settings-check"><input type="checkbox" id="settings-confetti" ${s.confetti ? "checked" : ""}> Confetti when you finish a day</label>
        </div>

        <h3>Your data</h3>
        <p class="settings-note">Everything is saved in this browser only (${storageSize()} used). Nothing is sent anywhere.
          Export a backup now and then, and to move your progress to another browser or device.</p>
        <div class="seg">
          <button type="button" id="settings-export">Export backup</button>
          <label class="settings-file">Import backup<input type="file" id="settings-import" accept="application/json,.json"></label>
          <button type="button" id="settings-reset" class="danger">Reset everything</button>
        </div>
        <div class="settings-status" id="settings-status" role="status"></div>
      </div>`;
    document.body.appendChild(overlay);

    const $ = (id) => overlay.querySelector(`#${id}`);
    const status = (text, isError) => {
      $("settings-status").textContent = text;
      $("settings-status").classList.toggle("error", !!isError);
    };

    $("settings-name").value = s.name === DEFAULT_NAME ? "" : s.name;
    $("settings-name").oninput = (event) => set({ name: event.target.value });
    $("settings-confetti").onchange = (event) => set({ confetti: event.target.checked });
    $("settings-close").onclick = closeSettings;
    overlay.onclick = (event) => { if (event.target === overlay) closeSettings(); };

    overlay.querySelectorAll(".seg[data-setting]").forEach((group) => {
      group.querySelectorAll("button").forEach((button) => {
        button.onclick = () => {
          set({ [group.dataset.setting]: button.dataset.value });
          group.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b === button));
        };
      });
    });

    $("settings-export").onclick = () => status(`Backup saved to your downloads (${exportData()} items).`);

    $("settings-import").onchange = async (event) => {
      const file = event.target.files[0];
      event.target.value = "";
      if (!file) return;
      try {
        if (await importData(file)) location.reload();
      } catch (error) {
        status(error.message, true);
      }
    };

    $("settings-reset").onclick = () => {
      if (!confirm("Delete ALL saved progress, logs and settings in this browser? Export a backup first if you might want them back.")) return;
      resetAll();
      location.reload();
    };

    document.addEventListener("keydown", trapKeys);
    $("settings-close").focus();
  }

  function trapKeys(event) {
    if (!overlay) return;
    if (event.key === "Escape") return closeSettings();
    if (event.key !== "Tab") return;
    const focusable = [...overlay.querySelectorAll("button, input")].filter((el) => !el.disabled);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  function closeSettings() {
    if (!overlay) return;
    document.removeEventListener("keydown", trapKeys);
    overlay.remove();
    overlay = null;
    if (opener) opener.focus();
  }

  function buildBar() {
    const bar = document.createElement("header");
    bar.className = "topbar";
    bar.innerHTML = `
      <a class="topbar-name" href="index.html"></a>
      <button type="button" class="topbar-settings" aria-haspopup="dialog">&#9881; Settings</button>`;
    document.body.prepend(bar);
    opener = bar.querySelector(".topbar-settings");
    opener.onclick = openSettings;
    apply();
  }

  document.addEventListener("DOMContentLoaded", buildBar);

  // Ask the browser to keep this site's data even when disk space runs low.
  try {
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
  } catch (error) {
    // Not supported: nothing to do.
  }

  return { get, set, exportData, importData, resetAll };
})();

/**
 * Shared helpers used by the home, Rust and marathon pages.
 * Exposes one global object: App.
 *
 * The plan covers 60 calendar days, from Nov 8, 2026 (day 1)
 * to race day on Jan 6, 2027 (day 60).
 */
const App = (() => {
  "use strict";

  // ---------------------------------------------------------------------
  // Plan dates
  // ---------------------------------------------------------------------

  const PLAN_START = new Date(2026, 10, 8); // month is 0-based: 10 = November
  const RACE_DATE = new Date(2027, 0, 6);
  const TOTAL_DAYS = 60;
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  const $ = (id) => document.getElementById(id);

  function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  /** The calendar date of plan day `day` (1-based). */
  function dayDate(day) {
    return new Date(PLAN_START.getFullYear(), PLAN_START.getMonth(), PLAN_START.getDate() + day - 1);
  }

  /** Today's plan day. Can be below 1 (before the plan) or above 60 (after it). */
  function todayNumber() {
    return Math.round((startOfDay(new Date()) - PLAN_START) / MS_PER_DAY) + 1;
  }

  function daysUntilRace() {
    return Math.round((RACE_DATE - startOfDay(new Date())) / MS_PER_DAY);
  }

  /** "YYYY-MM-DD" for a date, in local time. */
  function isoDate(date) {
    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  function clampDay(day) {
    return Math.min(TOTAL_DAYS, Math.max(1, day));
  }

  function formatDate(day) {
    return dayDate(day).toLocaleDateString(undefined, {
      weekday: "short", month: "short", day: "numeric", year: "numeric",
    });
  }

  function shortDate(day) {
    return dayDate(day).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  // ---------------------------------------------------------------------
  // Saved progress (localStorage)
  // ---------------------------------------------------------------------

  function loadState(key) {
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      if (saved && saved.days) return saved;
    } catch (error) {
      // Storage unavailable or data corrupted: start fresh.
    }
    return { days: {} };
  }

  function saveState(key, state) {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      // Storage unavailable: progress simply won't persist.
    }
  }

  // ---------------------------------------------------------------------
  // Confetti
  // ---------------------------------------------------------------------

  const CONFETTI_COLORS = ["#D9561E", "#0E7C7B", "#2D7FB8", "#5A55B0", "#F2C14E", "#2E7D5B"];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let confettiCanvas = null;
  let confettiContext = null;
  let particles = [];
  let animationFrame = 0;

  function ensureCanvas() {
    if (confettiCanvas) return;
    confettiCanvas = document.createElement("canvas");
    confettiCanvas.className = "confetti-canvas";
    confettiCanvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(confettiCanvas);
    confettiContext = confettiCanvas.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
  }

  function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }

  /** Shoots `count` pieces of confetti outward from (x, y). */
  function burstConfetti(x, y, count) {
    if (prefersReducedMotion) return;
    if (window.SiteSettings && !SiteSettings.get().confetti) return;
    ensureCanvas();

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 7;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: 4 + Math.random() * 5,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        life: 70 + Math.random() * 40,
        rotation: Math.random() * 6,
      });
    }
    if (!animationFrame) animationFrame = requestAnimationFrame(animateConfetti);
  }

  function animateConfetti() {
    const ctx = confettiContext;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    particles = particles.filter((p) => p.life > 0);

    for (const p of particles) {
      p.vy += 0.25; // gravity
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 1;
      p.rotation += 0.2;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = Math.min(1, p.life / 30);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }

    animationFrame = particles.length ? requestAnimationFrame(animateConfetti) : 0;
    if (!animationFrame) ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }

  // ---------------------------------------------------------------------
  // Toast message
  // ---------------------------------------------------------------------

  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3400);
  }

  // ---------------------------------------------------------------------
  // Calendar and day navigation (shared UI)
  // ---------------------------------------------------------------------

  /**
   * Draws the 60-day calendar into `container`.
   * @param {Object}   options
   * @param {HTMLElement} options.container
   * @param {number}   options.selectedDay
   * @param {Function} options.isDayComplete  (day) => boolean
   * @param {Function} options.onPick         (day) => void
   * @param {Function} [options.hasPlan]      (day) => boolean; days without a plan are shown muted
   */
  function renderCalendar({ container, selectedDay, isDayComplete, onPick, hasPlan = () => true }) {
    const today = todayNumber();
    const weekdayHeaders = "SMTWTFS".split("").map((letter) => `<b class="weekday">${letter}</b>`).join("");
    const leadingBlanks = "<span></span>".repeat(dayDate(1).getDay());

    let cells = "";
    for (let day = 1; day <= TOTAL_DAYS; day++) {
      const date = dayDate(day);
      const classes = [];
      if (!hasPlan(day)) classes.push("no-plan");
      else if (isDayComplete(day)) classes.push("done");
      else if (day < today) classes.push("missed");
      if (day === today) classes.push("today");
      if (day === selectedDay) classes.push("selected");
      if (day === TOTAL_DAYS) classes.push("race-day");

      const showMonth = date.getDate() === 1 || day === 1;
      const label = showMonth
        ? `${date.toLocaleDateString(undefined, { month: "short" })} ${date.getDate()}`
        : date.getDate();

      cells += `<button class="${classes.join(" ")}" data-day="${day}" aria-label="Day ${day}, ${formatDate(day)}">${label}</button>`;
    }

    container.innerHTML = `<div class="calendar">${weekdayHeaders}${leadingBlanks}${cells}</div>`;
    container.querySelectorAll("button").forEach((button) => {
      button.onclick = () => onPick(Number(button.dataset.day));
    });
  }

  /** Draws Previous / Today / Next buttons into `container`. */
  function renderDayNav({ container, getSelectedDay, onPick }) {
    container.innerHTML = `
      <button data-step="-1">&larr; Previous day</button>
      <button data-step="0">Today</button>
      <button data-step="1">Next day &rarr;</button>`;

    container.querySelectorAll("button").forEach((button) => {
      button.onclick = () => {
        const step = Number(button.dataset.step);
        onPick(step === 0 ? clampDay(todayNumber()) : clampDay(getSelectedDay() + step));
      };
    });
  }

  /** The small "Completed / Missed / Today / Upcoming" label next to a date. */
  function dayTag(day, isComplete) {
    const today = todayNumber();
    if (day < today) {
      return isComplete
        ? '<span class="tag ok">Completed</span>'
        : '<span class="tag missed">Missed: you can still tick it off</span>';
    }
    return day === today
      ? '<span class="tag">Today</span>'
      : '<span class="tag upcoming">Upcoming</span>';
  }

  return {
    $, TOTAL_DAYS,
    isoDate, dayDate, todayNumber, daysUntilRace, clampDay, formatDate, shortDate,
    loadState, saveState,
    burstConfetti, showToast,
    renderCalendar, renderDayNav, dayTag,
  };
})();
