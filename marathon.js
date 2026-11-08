/**
 * Marathon page (7.5 km race on Jan 6).
 * Needs: common.js (App) and marathon-data.js (MARATHON).
 *
 * Each plan day has a checklist. A day is "complete" when every
 * required item is ticked (optional items never block completion).
 * Progress is saved in localStorage.
 */
(() => {
  "use strict";

  const {
    $, TOTAL_DAYS,
    loadState, saveState, todayNumber, daysUntilRace, clampDay, formatDate, shortDate, dayDate,
    renderCalendar, renderDayNav, dayTag, burstConfetti, showToast,
  } = App;

  const { FIRST_PLAN_DAY, PHASES, SCHEDULE, WARM_UP, COOL_DOWN, JOG_PACE, STRENGTH_MOVES } = MARATHON;

  const STORAGE_KEY = "marathon-plan-v1";
  const RACE_DAY = TOTAL_DAYS;

  // ---------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------

  const state = loadState(STORAGE_KEY);
  let selectedDay = clampDay(todayNumber());

  /** Saved data for one day: { checked: { itemId: true } }. */
  function getDayData(day) {
    if (!state.days[day]) state.days[day] = { checked: {} };
    return state.days[day];
  }

  // ---------------------------------------------------------------------
  // The plan for a day
  // ---------------------------------------------------------------------

  const hasPlan = (day) => day >= FIRST_PLAN_DAY && day <= TOTAL_DAYS;
  const entryFor = (day) => SCHEDULE[day - FIRST_PLAN_DAY];
  const weekdayOf = (day) => dayDate(day).toLocaleDateString(undefined, { weekday: "short" });

  function phaseOf(day) {
    return PHASES.find((phase) => day >= phase.firstDay && day <= phase.lastDay).name;
  }

  /** The checklist for one entry: [{ id, label, detail, optional? }]. */
  function buildItems(entry) {
    if (entry.kind === "race") {
      return [{ id: "race", label: entry.text, detail: "" }];
    }

    if (entry.kind === "run") {
      return [
        { id: "warmup", label: "Warm-up", detail: WARM_UP },
        { id: "run", label: `RUN: ${entry.text}`, detail: `Jog pace: ${JOG_PACE}` },
        { id: "cooldown", label: "Cool-down", detail: COOL_DOWN },
      ];
    }

    // Rest day: one required tick, plus any optional extras.
    const items = [{ id: "rest", label: entry.label || "Rest day", detail: entry.note || "" }];
    (entry.optional || []).forEach((text, index) => {
      items.push({ id: `optional-${index}`, label: `${text} (optional)`, detail: "", optional: true });
    });
    if (entry.strengthRounds) {
      items.push({
        id: "strength",
        label: "Light strength (optional)",
        detail: `${STRENGTH_MOVES}, ${entry.strengthRounds} rounds`,
        optional: true,
      });
    }
    return items;
  }

  function isDayComplete(day) {
    if (!hasPlan(day)) return false;
    const { checked } = getDayData(day);
    return buildItems(entryFor(day))
      .filter((item) => !item.optional)
      .every((item) => checked[item.id]);
  }

  /** One-line text for the plan tables. */
  function summarize(entry) {
    if (entry.kind === "race") return `<b>${entry.text}</b>`;
    if (entry.kind === "run") return `<b>RUN:</b> ${entry.text}`;
    return entry.summary;
  }

  // ---------------------------------------------------------------------
  // Rendering: the day panel
  // ---------------------------------------------------------------------

  function renderDayPanel() {
    const day = selectedDay;
    const panel = $("panel");

    if (!hasPlan(day)) {
      panel.innerHTML = `
        <h2>No session today</h2>
        <div class="panel-date">Day ${day} &middot; ${formatDate(day)}</div>
        <p class="muted-line">Your marathon plan starts tomorrow, ${shortDate(FIRST_PLAN_DAY)}.</p>`;
      return;
    }

    const entry = entryFor(day);
    const { checked } = getDayData(day);
    const items = buildItems(entry);
    const titles = { run: "Run day", rest: "Rest day", race: "RACE DAY" };

    const rows = items.map((item) => `
      <div class="check-item ${checked[item.id] ? "checked" : ""}">
        <input type="checkbox" id="item-${item.id}" ${checked[item.id] ? "checked" : ""}>
        <label for="item-${item.id}">
          <b>${item.label}</b>
          ${item.detail ? `<small>${item.detail}</small>` : ""}
        </label>
      </div>`).join("");

    panel.innerHTML = `
      <h2>${titles[entry.kind]}</h2>
      <div class="panel-date">Day ${day} &middot; ${formatDate(day)} &middot; ${phaseOf(day)}${dayTag(day, isDayComplete(day))}</div>
      <div class="box">${rows}</div>`;

    items.forEach((item) => {
      const checkbox = $(`item-${item.id}`);
      checkbox.onchange = () => handleToggle(day, item.id, checkbox);
    });
  }

  // ---------------------------------------------------------------------
  // Rendering: stats, next-up line, full plan tables
  // ---------------------------------------------------------------------

  function currentStreak() {
    let streak = 0;
    let day = Math.min(TOTAL_DAYS, todayNumber());
    if (day >= FIRST_PLAN_DAY && !isDayComplete(day)) day--; // today may not be finished yet
    while (day >= FIRST_PLAN_DAY && isDayComplete(day)) {
      streak++;
      day--;
    }
    return streak;
  }

  /** Updates the stat boxes. Returns the number of completed days. */
  function renderStats() {
    let completedDays = 0;
    let runsDone = 0;
    let runsTotal = 0;

    for (let day = FIRST_PLAN_DAY; day <= TOTAL_DAYS; day++) {
      const isRun = entryFor(day).kind !== "rest";
      const done = isDayComplete(day);
      if (done) completedDays++;
      if (isRun) runsTotal++;
      if (isRun && done) runsDone++;
    }

    $("stat-streak").textContent = currentStreak();
    $("stat-done").textContent = `${completedDays} / ${SCHEDULE.length}`;
    $("stat-runs").textContent = `${runsDone} / ${runsTotal}`;
    $("stat-left").textContent = Math.max(0, daysUntilRace());

    renderNextUp();
    return completedDays;
  }

  /** "Next unfinished day" line, plus how many plan days were missed so far. */
  function renderNextUp() {
    const today = todayNumber();
    let missed = 0;
    let next = null;

    for (let day = FIRST_PLAN_DAY; day <= TOTAL_DAYS; day++) {
      if (isDayComplete(day)) continue;
      if (next === null) next = day;
      if (day < today) missed++;
    }

    const parts = [];
    if (today < FIRST_PLAN_DAY) parts.push(`Your plan starts on ${shortDate(FIRST_PLAN_DAY)}.`);
    parts.push(next === null
      ? "Every day is done. Good luck on race day!"
      : `Next unfinished day: ${shortDate(next)}, ${summarize(entryFor(next)).replace(/<[^>]+>/g, "")}.`);
    if (missed > 0) parts.push(`Missed so far: ${missed}.`);

    $("next-up").textContent = parts.join(" ");
  }

  function renderPlanTables() {
    const today = todayNumber();

    $("plan-tables").innerHTML = PHASES.map((phase) => {
      let rows = "";
      for (let day = phase.firstDay; day <= phase.lastDay; day++) {
        const status = isDayComplete(day) ? "✓ done" : (day < today ? "missed" : "");
        rows += `
          <tr>
            <td>${shortDate(day)}</td>
            <td>${weekdayOf(day)}</td>
            <td>${summarize(entryFor(day))}</td>
            <td>${status}</td>
          </tr>`;
      }
      return `
        <h3 style="margin-top:20px">${phase.name} (${shortDate(phase.firstDay)} to ${shortDate(phase.lastDay)})</h3>
        <div class="scroll">
          <table>
            <tr><th>Date</th><th>Day</th><th>Plan</th><th>Status</th></tr>
            ${rows}
          </table>
        </div>`;
    }).join("");
  }

  function renderRaceCountdown() {
    const daysLeft = daysUntilRace();
    $("race-countdown").textContent = daysLeft > 0
      ? `Race day, Jan 6: ${daysLeft} days to go`
      : "Race day is here. Good luck!";
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
      hasPlan,
      onPick: selectDay,
    });
    renderDayPanel();
    state.completedCount = renderStats(); // the home page reads this
    renderPlanTables();
    renderRaceCountdown();
    saveState(STORAGE_KEY, state);
  }

  // ---------------------------------------------------------------------
  // Ticking an item
  // ---------------------------------------------------------------------

  function handleToggle(day, itemId, checkbox) {
    const wasComplete = isDayComplete(day);
    getDayData(day).checked[itemId] = checkbox.checked;
    render();

    if (wasComplete || !isDayComplete(day)) return;

    if (day === RACE_DAY) {
      burstConfetti(window.innerWidth / 2, window.innerHeight / 2, 200);
      showToast("You finished the 7.5 km race!");
    } else {
      burstConfetti(window.innerWidth / 2, window.innerHeight / 3, 120);
      showToast(`Day ${day} complete!`);
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
