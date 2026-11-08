/**
 * Rust learning page.
 * Needs: common.js (App) and rust-data.js (RUST_DAYS).
 *
 * Every day has the same four study blocks. A day is "complete"
 * when every block is ticked. Progress is saved in localStorage.
 */
(() => {
  "use strict";

  const {
    $, TOTAL_DAYS,
    loadState, saveState, todayNumber, clampDay, formatDate, shortDate,
    renderCalendar, renderDayNav, dayTag, burstConfetti, showToast,
  } = App;

  // ---------------------------------------------------------------------
  // Settings
  // ---------------------------------------------------------------------

  const STORAGE_KEY = "rust-plan-v1";
  const RACE_DAY = TOTAL_DAYS;

  const XP_PER_DAY = 100;
  const XP_PER_WEEK_BONUS = 150;
  const XP_PER_LEVEL = 1200;
  const LEVEL_NAMES = ["Hatchling", "Borrower", "Lifetime Tamer", "Trait Weaver", "Crate Builder", "Rustacean"];

  const WEEK_COUNT = Math.ceil(TOTAL_DAYS / 7);

  /** Each day's review looks back at these earlier lessons. */
  const REVIEW_LOOKBACKS = [
    { daysAgo: 1, label: "Yesterday" },
    { daysAgo: 7, label: "One week ago" },
    { daysAgo: 30, label: "One month ago" },
  ];

  /** The label shown for each stretch of the curriculum. */
  const PHASES = [
    { lastDay: 16, name: "Foundations" },
    { lastDay: 29, name: "Core language" },
    { lastDay: 50, name: "Intermediate" },
    { lastDay: 59, name: "Projects" },
    { lastDay: 60, name: "Race day" },
  ];

  // ---------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------

  const state = loadState(STORAGE_KEY);
  let selectedDay = clampDay(todayNumber());

  /** Saved data for one day: { checked: { blockId: true } }. */
  function getDayData(day) {
    if (!state.days[day]) state.days[day] = { checked: {} };
    return state.days[day];
  }

  // ---------------------------------------------------------------------
  // Lessons and study blocks
  // ---------------------------------------------------------------------

  function phaseOf(day) {
    return PHASES.find((phase) => day <= phase.lastDay).name;
  }

  /** HTML listing which earlier topics to review today. */
  function reviewHtml(day) {
    const lines = REVIEW_LOOKBACKS
      .filter(({ daysAgo }) => day - daysAgo >= 1)
      .map(({ daysAgo, label }) => `${label}: <b>${RUST_DAYS[day - daysAgo - 1].title}</b>`);

    if (lines.length === 0) return "Nothing to review yet. Today is your first day.";
    return `${lines.join("<br>")}<br>Close the book, explain each aloud, then re-type one example from memory.`;
  }

  /** The checklist for one day: [{ id, title, minutes, text }]. */
  function getStudyBlocks(day) {
    const lesson = RUST_DAYS[day - 1];

    if (day === RACE_DAY) {
      return [
        { id: "review", title: "Light review", minutes: 30, text: "Skim your logs and notes. No new material today." },
        { id: "log", title: "Log", minutes: 10, text: "Write one thing you're proud of from these 60 days." },
      ];
    }

    return [
      { id: "review", title: "Review", minutes: 15, text: reviewHtml(day) },
      { id: "learn", title: "Learn something new", minutes: 50, text: lesson.learn },
      { id: "practice", title: "Practice", minutes: 45, text: lesson.practice },
      { id: "log", title: "Log", minutes: 10, text: "Write 3 things you learned, 1 compiler error you met, and 1 question for tomorrow." },
    ];
  }

  function isDayComplete(day) {
    const { checked } = getDayData(day);
    return getStudyBlocks(day).every((block) => checked[block.id]);
  }

  // ---------------------------------------------------------------------
  // Progress: weeks, streaks, XP, badges
  // ---------------------------------------------------------------------

  const weekOf = (day) => Math.floor((day - 1) / 7);

  function daysInWeek(week) {
    const first = week * 7 + 1;
    const last = Math.min(TOTAL_DAYS, first + 6);
    return Array.from({ length: last - first + 1 }, (_, i) => first + i);
  }

  const isWeekComplete = (week) => daysInWeek(week).every(isDayComplete);

  function allDaysComplete(firstDay, lastDay) {
    for (let day = firstDay; day <= lastDay; day++) {
      if (!isDayComplete(day)) return false;
    }
    return true;
  }

  function countCompletedDays() {
    let count = 0;
    for (let day = 1; day <= TOTAL_DAYS; day++) {
      if (isDayComplete(day)) count++;
    }
    return count;
  }

  /** Current streak (ending today or yesterday) and best streak ever. */
  function calculateStreaks() {
    let current = 0;
    let day = Math.min(TOTAL_DAYS, todayNumber());
    if (day >= 1 && !isDayComplete(day)) day--; // today may not be finished yet
    while (day >= 1 && isDayComplete(day)) {
      current++;
      day--;
    }

    let best = 0;
    let run = 0;
    for (let d = 1; d <= TOTAL_DAYS; d++) {
      run = isDayComplete(d) ? run + 1 : 0;
      best = Math.max(best, run);
    }
    return { current, best };
  }

  function calculateXp() {
    let completeWeeks = 0;
    for (let week = 0; week < WEEK_COUNT; week++) {
      if (isWeekComplete(week)) completeWeeks++;
    }
    return countCompletedDays() * XP_PER_DAY + completeWeeks * XP_PER_WEEK_BONUS;
  }

  const BADGES = [
    { icon: "&#129370;", name: "First step",              isEarned: () => countCompletedDays() >= 1 },
    { icon: "&#128737;", name: "Borrow checker survivor", isEarned: () => isDayComplete(11) },
    { icon: "&#128311;", name: "Week 1 clear",            isEarned: () => isWeekComplete(0) },
    { icon: "&#128293;", name: "7-day streak",            isEarned: () => calculateStreaks().best >= 7 },
    { icon: "&#127755;", name: "14-day streak",           isEarned: () => calculateStreaks().best >= 14 },
    { icon: "&#9889;",   name: "Halfway: 30 days",        isEarned: () => countCompletedDays() >= 30 },
    { icon: "&#128736;", name: "Capstone builder",        isEarned: () => allDaysComplete(51, 55) },
    { icon: "&#127942;", name: "All 60 days",             isEarned: () => countCompletedDays() >= TOTAL_DAYS },
  ];

  const earnedBadgeNames = () => new Set(BADGES.filter((b) => b.isEarned()).map((b) => b.name));

  // ---------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------

  function renderDayPanel() {
    const day = selectedDay;
    const blocks = getStudyBlocks(day);
    const { checked } = getDayData(day);
    const panel = $("panel");

    const blockRows = blocks.map((block) => `
      <div class="check-item ${checked[block.id] ? "checked" : ""}">
        <input type="checkbox" id="block-${block.id}" ${checked[block.id] ? "checked" : ""}>
        <label for="block-${block.id}">
          <b>${block.title} (${block.minutes} min)</b>
          <small>${block.text}</small>
        </label>
      </div>`).join("");

    panel.innerHTML = `
      <h2>Day ${day}: ${RUST_DAYS[day - 1].title}</h2>
      <div class="panel-date">${formatDate(day)} &middot; ${phaseOf(day)}${dayTag(day, isDayComplete(day))}</div>
      ${blockRows}`;

    blocks.forEach((block) => {
      const checkbox = $(`block-${block.id}`);
      checkbox.onchange = () => handleBlockToggle(day, block.id, checkbox);
    });
  }

  function renderStats() {
    const streak = calculateStreaks().current;
    const xp = calculateXp();
    const level = Math.min(LEVEL_NAMES.length - 1, Math.floor(xp / XP_PER_LEVEL));
    const isMaxLevel = level === LEVEL_NAMES.length - 1;
    const completed = countCompletedDays();

    $("stat-streak").textContent = streak;
    $("stat-done").textContent = completed;
    $("stat-xp").textContent = xp;
    $("stat-level").textContent = level + 1;
    $("stat-level-name").textContent = LEVEL_NAMES[level];
    $("xp-fill").style.width = `${isMaxLevel ? 100 : ((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100}%`;

    renderNextUp();
    return completed;
  }

  /** The "Next unfinished day" line, plus how many days were missed so far. */
  function renderNextUp() {
    const today = todayNumber();
    let missed = 0;
    for (let day = 1; day < Math.min(today, TOTAL_DAYS + 1); day++) {
      if (!isDayComplete(day)) missed++;
    }

    const nextIndex = RUST_DAYS.findIndex((_, i) => !isDayComplete(i + 1));
    const parts = [];
    if (today < 1) parts.push("The plan starts on Nov 8, 2026.");
    parts.push(nextIndex < 0
      ? "All 60 days done."
      : `Next unfinished day: ${shortDate(nextIndex + 1)}, ${RUST_DAYS[nextIndex].title}.`);
    if (missed > 0) parts.push(`Missed so far: ${missed}.`);

    $("next-up").textContent = parts.join(" ");
  }

  function renderBadges() {
    $("badges").innerHTML = BADGES.map((badge) => `
      <div class="badge ${badge.isEarned() ? "earned" : "locked"}">
        <i>${badge.icon}</i>${badge.name}
      </div>`).join("");
  }

  function selectDay(day) {
    selectedDay = day;
    render();
  }

  function render() {
    renderCalendar({
      container: $("calendar"),
      selectedDay,
      isDayComplete,
      onPick: selectDay,
    });
    renderDayPanel();
    state.completedCount = renderStats(); // the home page reads this
    renderBadges();
    saveState(STORAGE_KEY, state);
  }

  // ---------------------------------------------------------------------
  // Ticking a block
  // ---------------------------------------------------------------------

  function handleBlockToggle(day, blockId, checkbox) {
    const origin = checkbox.getBoundingClientRect();
    const week = weekOf(day);
    const wasDayComplete = isDayComplete(day);
    const wasWeekComplete = isWeekComplete(week);
    const badgesBefore = earnedBadgeNames();

    getDayData(day).checked[blockId] = checkbox.checked;
    render();

    const justCompletedDay = !wasDayComplete && isDayComplete(day);
    if (!justCompletedDay) return;

    burstConfetti(origin.left, origin.top, 70);

    if (!wasWeekComplete && isWeekComplete(week)) {
      setTimeout(() => {
        burstConfetti(window.innerWidth / 2, window.innerHeight / 3, 160);
        showToast(`Week ${week + 1} complete! +${XP_PER_WEEK_BONUS} bonus XP`);
      }, 250);
      return;
    }

    const newBadges = [...earnedBadgeNames()].filter((name) => !badgesBefore.has(name));
    if (newBadges.length > 0) {
      burstConfetti(window.innerWidth / 2, window.innerHeight / 2, 100);
      showToast(`Badge unlocked: ${newBadges[0]}`);
    } else {
      showToast(`Day ${day} complete! +${XP_PER_DAY} XP`);
    }
  }

  // ---------------------------------------------------------------------
  // Start
  // ---------------------------------------------------------------------

  renderDayNav({
    container: $("day-nav"),
    getSelectedDay: () => selectedDay,
    onPick: selectDay,
  });
  render();
})();
