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
    dayDate, todayNumber, daysUntilRace, clampDay, formatDate, shortDate,
    loadState, saveState,
    burstConfetti, showToast,
    renderCalendar, renderDayNav, dayTag,
  };
})();
