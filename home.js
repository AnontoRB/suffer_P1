/**
 * Home page: digital clock with a "time left today" bar, race countdown,
 * today's plan day, and a progress bar for each plan.
 * The plan pages save `completedCount` in their state.
 */
(() => {
  "use strict";

  const { $, TOTAL_DAYS, loadState, todayNumber, daysUntilRace } = App;

  const PLANS = [
    { storageKey: "rust-plan-v1",    barId: "rust-bar",    labelId: "rust-label" },
    { storageKey: "fitness-plan-v1", barId: "fitness-bar", labelId: "fitness-label" },
  ];

  function renderCountdown() {
    const daysLeft = daysUntilRace();
    $("race-countdown").textContent = daysLeft > 0
      ? `Race day, January 6: ${daysLeft} days to go`
      : "Race day is here!";

    const today = todayNumber();
    $("today-label").textContent = today < 1
      ? "The plan starts on Nov 8."
      : `Today is day ${Math.min(today, TOTAL_DAYS)} of ${TOTAL_DAYS}.`;
  }

  function renderPlanProgress({ storageKey, barId, labelId }) {
    const completed = loadState(storageKey).completedCount || 0;
    $(barId).style.width = `${(completed / TOTAL_DAYS) * 100}%`;
    $(labelId).textContent = `${completed} / ${TOTAL_DAYS} days`;
  }

  // ---------------------------------------------------------------------
  // Digital clock
  // ---------------------------------------------------------------------

  const CLOCK_FORMAT_KEY = "home-clock-24h";
  const MS_PER_SECOND = 1000;

  let use24Hour = loadClockFormat();

  function loadClockFormat() {
    try {
      return localStorage.getItem(CLOCK_FORMAT_KEY) !== "false"; // 24h unless switched off
    } catch (error) {
      return true;
    }
  }

  function saveClockFormat() {
    try {
      localStorage.setItem(CLOCK_FORMAT_KEY, String(use24Hour));
    } catch (error) {
      // Storage unavailable: the choice just won't persist.
    }
  }

  const pad2 = (number) => String(number).padStart(2, "0");

  /** Splits a number of milliseconds into "07h 23m 11s". */
  function formatRemaining(ms) {
    const totalSeconds = Math.max(0, Math.floor(ms / MS_PER_SECOND));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${pad2(hours)}h ${pad2(minutes)}m ${pad2(seconds)}s`;
  }

  function renderClock() {
    const now = new Date();

    // Time digits
    const hours24 = now.getHours();
    const displayHours = use24Hour ? hours24 : hours24 % 12 || 12;
    $("clock-hours").textContent = pad2(displayHours);
    $("clock-minutes").textContent = pad2(now.getMinutes());
    $("clock-seconds").textContent = pad2(now.getSeconds());
    $("clock-period").textContent = use24Hour ? "" : (hours24 < 12 ? "AM" : "PM");
    $("clock-format").textContent = use24Hour ? "24h" : "12h";

    $("clock-date").textContent = now.toLocaleDateString(undefined, {
      weekday: "long", month: "long", day: "numeric", year: "numeric",
    });

    // Time left until midnight (the day's length varies on daylight-saving days)
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const remainingMs = startOfTomorrow - now;
    const percentLeft = (remainingMs / (startOfTomorrow - startOfToday)) * 100;

    $("clock-remaining").textContent = formatRemaining(remainingMs);
    $("clock-percent").textContent = `${percentLeft.toFixed(1)}% of the day left`;
    $("day-bar-fill").style.width = `${percentLeft}%`;
    $("day-bar").setAttribute("aria-valuenow", Math.round(percentLeft));
  }

  /** Redraws the clock, then schedules the next redraw for the next whole second. */
  function tickClock() {
    renderClock();
    setTimeout(tickClock, MS_PER_SECOND - (Date.now() % MS_PER_SECOND));
  }

  $("clock-format").onclick = () => {
    use24Hour = !use24Hour;
    saveClockFormat();
    renderClock();
  };

  // ---------------------------------------------------------------------
  // Start
  // ---------------------------------------------------------------------

  renderCountdown();
  PLANS.forEach(renderPlanProgress);
  tickClock();
})();
