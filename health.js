/**
 * Health page: 60-day strength, water and food plan.
 * Needs: common.js (App) and health-data.js (HEALTH).
 *
 * Every day has a checklist (water goal, plus the session on strength days).
 * A day is "complete" when every required item is ticked; the food tick is
 * optional. Each day also has a log (water drunk, meals, notes).
 * Progress is saved in localStorage.
 */
(() => {
  "use strict";

  const {
    $, TOTAL_DAYS,
    loadState, saveState, todayNumber, daysUntilRace, clampDay, formatDate, shortDate, dayDate,
    renderCalendar, renderDayNav, dayTag, burstConfetti, showToast,
  } = App;

  const { WARM_UP, COOL_DOWN, FOOD_TICK, RUN_LABELS, BLOCKS, EXERCISES, SESSIONS,
          TEST_DATES, TESTS, MEASURE_ROWS, MEASURE_COLS, SAMPLE_DAY } = HEALTH;

  const STORAGE_KEY = "health-plan-v1";
  const RACE_DAY = TOTAL_DAYS;
  const WATER_STEP_UP_DAY = 18; // Nov 25: water goals go up

  // ---------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------

  const state = loadState(STORAGE_KEY);
  state.measurements = state.measurements || {};
  state.tests = state.tests || {};
  let selectedDay = clampDay(todayNumber());

  /** Saved data for one day: { checked: { itemId: true }, log: { field: text } }. */
  function getDayData(day) {
    if (!state.days[day]) state.days[day] = {};
    const data = state.days[day];
    data.checked = data.checked || {};
    data.log = data.log || {};
    return data;
  }

  const esc = (text) => String(text == null ? "" : text).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

  // ---------------------------------------------------------------------
  // The plan for a day
  // ---------------------------------------------------------------------

  const SESSION_BY_DAY = new Map(SESSIONS.map((session) => [session.day, session]));

  function kindOf(day) {
    if (day === 1) return "baseline";
    if (day === RACE_DAY) return "race";
    const session = SESSION_BY_DAY.get(day);
    return session ? session.kind : "run";
  }

  const isSessionDay = (day) => ["strength", "mobility", "test"].includes(kindOf(day));

  function blockOf(day) {
    return BLOCKS.find((block) => day >= block.firstDay && day <= block.lastDay);
  }

  /** Water goal in litres, or null on race day. */
  function waterGoal(day) {
    const kind = kindOf(day);
    if (kind === "race") return null;
    const higher = day >= WATER_STEP_UP_DAY;
    if (kind === "run") return higher ? 3.5 : 3.0;
    return higher ? 3.0 : 2.5;
  }

  function waterText(day) {
    const goal = waterGoal(day);
    return goal === null ? "500 ml before, then sip" : `${goal.toFixed(1)} L`;
  }

  function planLabel(day) {
    const kind = kindOf(day);
    if (kind === "baseline") return "Baseline day";
    if (kind === "race") return "RACE DAY (7.5 km)";
    if (kind === "run") return RUN_LABELS[day] || "Run";
    const session = SESSION_BY_DAY.get(day);
    return kind === "strength" ? `Strength ${session.code}` : session.code;
  }

  function waterItem(day) {
    const goal = waterGoal(day);
    if (goal === null) {
      return { id: "water", label: "Water: about 500 ml, 2 to 3 hours before the start, then sip",
               detail: "Drink steadily, don't gulp." };
    }
    const kind = kindOf(day);
    let detail = "One glass is 250 ml. Pale yellow urine means you are drinking enough.";
    if (kind === "run") detail = "Drink 300 to 500 ml in the 2 hours before the run, and sip after it. " + detail;
    if (day === 59) detail = "Drink steadily, don't gulp. " + detail;
    return { id: "water", label: `Drink ${goal.toFixed(1)} L of water`, detail };
  }

  /** The checklist for a day: [{ id, label, detail, optional? }]. */
  function buildItems(day) {
    const kind = kindOf(day);
    const session = SESSION_BY_DAY.get(day);
    const items = [];

    if (kind === "baseline") {
      items.push(
        { id: "weigh", label: "Weigh yourself", detail: "First thing in the morning, after the toilet, before eating." },
        { id: "tape", label: "Measure with a tape", detail: "Waist (at the belly button), chest, upper arm and thigh. Write the numbers in the measurements table." },
        { id: "photos", label: "Take front, side and back photos", detail: "Same clothes and lighting. Repeat on Dec 10 and Jan 7." },
        { id: "tests", label: "Test: plank hold and dead hang", detail: "Max time for each (dead hang only if you have a bar). Write the numbers down." },
        { id: "guide", label: "Read the exercise guide", detail: "So you know the movements before tomorrow." },
      );
    } else if (kind === "strength") {
      items.push({ id: "warmup", label: "Warm-up", detail: WARM_UP });
      if (session.test === "full") {
        items.push({ id: "tests", label: "Checkpoint tests first",
          detail: "Push-ups, squats, sit-ups, plank and dead hang, max each, 3 minutes of rest between them, strict form (chest near floor, squats to parallel). Write your results in the table." });
      }
      items.push(
        { id: "main", label: `Session ${session.code}`, detail: session.workout },
        { id: "cooldown", label: "Cool-down", detail: COOL_DOWN },
      );
    } else if (kind === "test") {
      items.push({ id: "main", label: session.code, detail: session.workout });
    } else if (kind === "mobility") {
      items.push({ id: "main", label: session.code, detail: session.workout });
    } else if (kind === "rest") {
      items.push({ id: "main", label: session.code, detail: session.workout });
    }

    items.push(waterItem(day));
    items.push({ id: "food", label: "Followed the food plan (optional)", detail: FOOD_TICK, optional: true });
    return items;
  }

  function isDayComplete(day) {
    const { checked } = getDayData(day);
    return buildItems(day).filter((item) => !item.optional).every((item) => checked[item.id]);
  }

  // ---------------------------------------------------------------------
  // Rendering: the day panel and its log
  // ---------------------------------------------------------------------

  const LOG_FIELDS = [
    ["water", "Water drunk (litres)", "number"],
    ["breakfast", "Breakfast", "text"],
    ["lunch", "Lunch", "text"],
    ["dinner", "Dinner", "text"],
    ["snacks", "Snacks / notes (cravings, sleep, soreness)", "text"],
  ];

  function renderDayPanel() {
    const day = selectedDay;
    const kind = kindOf(day);
    const { checked, log } = getDayData(day);
    const items = buildItems(day);
    const titles = { baseline: "Baseline day", run: "Run day", strength: "Strength day", test: "Test day", mobility: "Mobility day", rest: "Full rest", race: "RACE DAY" };

    const rows = items.map((item) => `
      <div class="check-item ${checked[item.id] ? "checked" : ""}">
        <input type="checkbox" id="item-${item.id}" ${checked[item.id] ? "checked" : ""}>
        <label for="item-${item.id}">
          <b>${item.label}</b>
          ${item.detail ? `<small>${item.detail}</small>` : ""}
        </label>
      </div>`).join("");

    const runNote = kind === "run" || kind === "race"
      ? `<p class="muted-line">The run itself is on the Marathon page. Here you track water and food.</p>` : "";

    const fields = LOG_FIELDS.slice();
    if (dayDate(day).getDay() === 0) fields.unshift(["weight", "Sunday weigh-in (kg)", "number"]);
    const fieldHtml = fields.map(([key, label, type]) => `
      <label class="field">${label}
        <input type="${type}" ${type === "number" ? 'step="0.1" min="0"' : ""} data-log="${key}" value="${esc(log[key])}">
      </label>`).join("");

    const block = blockOf(day);
    $("panel").innerHTML = `
      <h2>${titles[kind]}${isSessionDay(day) && SESSION_BY_DAY.get(day).kind === "strength" ? `: ${SESSION_BY_DAY.get(day).code}` : ""}</h2>
      <div class="panel-date">Day ${day} &middot; ${formatDate(day)} &middot; ${block.name}${dayTag(day, isDayComplete(day))}</div>
      <p class="muted-line">Water goal: <b>${waterText(day)}</b></p>
      ${runNote}
      <div class="box">${rows}</div>
      <h3 class="log-title">Daily log (water and food)</h3>
      <div class="log-grid">${fieldHtml}</div>`;

    items.forEach((item) => {
      const checkbox = $(`item-${item.id}`);
      checkbox.onchange = () => handleToggle(day, item.id, checkbox);
    });
    $("panel").querySelectorAll("[data-log]").forEach((input) => {
      input.oninput = () => {
        getDayData(day).log[input.dataset.log] = input.value;
        saveState(STORAGE_KEY, state);
        renderWeights();
        renderLogTable();
      };
    });
  }

  // ---------------------------------------------------------------------
  // Rendering: stats, next-up line, schedule and log tables
  // ---------------------------------------------------------------------

  function currentStreak() {
    let streak = 0;
    let day = Math.min(TOTAL_DAYS, todayNumber());
    if (day >= 1 && !isDayComplete(day)) day--; // today may not be finished yet
    while (day >= 1 && isDayComplete(day)) {
      streak++;
      day--;
    }
    return streak;
  }

  /** Updates the stat boxes. Returns the number of completed days. */
  function renderStats() {
    let completedDays = 0;
    let sessionsDone = 0;
    let sessionsTotal = 0;

    for (let day = 1; day <= TOTAL_DAYS; day++) {
      const done = isDayComplete(day);
      if (done) completedDays++;
      if (isSessionDay(day)) {
        sessionsTotal++;
        if (done) sessionsDone++;
      }
    }

    $("stat-streak").textContent = currentStreak();
    $("stat-done").textContent = `${completedDays} / ${TOTAL_DAYS}`;
    $("stat-sessions").textContent = `${sessionsDone} / ${sessionsTotal}`;
    $("stat-left").textContent = Math.max(0, daysUntilRace());

    renderNextUp();
    return completedDays;
  }

  function renderNextUp() {
    const today = todayNumber();
    let missed = 0;
    let next = null;

    for (let day = 1; day <= TOTAL_DAYS; day++) {
      if (isDayComplete(day)) continue;
      if (next === null) next = day;
      if (day < today) missed++;
    }

    const parts = [];
    if (today < 1) parts.push("The plan starts on Nov 8, 2026.");
    parts.push(next === null
      ? "Every day is done. Good luck on race day!"
      : `Next unfinished day: ${shortDate(next)}, ${planLabel(next)}.`);
    if (missed > 0) parts.push(`Missed so far: ${missed}.`);
    $("next-up").textContent = parts.join(" ");
  }

  function statusOf(day) {
    return isDayComplete(day) ? "✓ done" : (day < todayNumber() ? "missed" : "");
  }

  function renderScheduleTables() {
    $("schedule-tables").innerHTML = BLOCKS.slice(1).map((block) => {
      const rows = SESSIONS
        .filter((s) => s.day >= block.firstDay && s.day <= block.lastDay)
        .map((s) => `<tr><td>${s.date}</td><td><b>${s.code}</b></td><td>${s.workout}</td><td>${statusOf(s.day)}</td></tr>`)
        .join("");
      return `
        <h3 style="margin-top:20px">${block.name} (${block.dates})</h3>
        <div class="scroll"><table>
          <tr><th>Date</th><th>Session</th><th>Workout</th><th>Status</th></tr>${rows}
        </table></div>`;
    }).join("");
  }

  function renderLogTable() {
    let rows = "";
    for (let day = 1; day <= TOTAL_DAYS; day++) {
      const { log } = getDayData(day);
      rows += `
        <tr>
          <td>${shortDate(day)}</td>
          <td>${planLabel(day)}</td>
          <td>${waterText(day)}</td>
          <td>${esc(log.water) ? esc(log.water) + " L" : ""}</td>
          <td>${statusOf(day)}</td>
        </tr>`;
    }
    $("log-table").innerHTML = `
      <div class="scroll"><table>
        <tr><th>Date</th><th>Today</th><th>Water goal</th><th>Water drunk</th><th>Status</th></tr>${rows}
      </table></div>`;
  }

  function renderWeights() {
    const entries = [];
    for (let day = 1; day <= TOTAL_DAYS; day++) {
      const weight = getDayData(day).log.weight;
      if (weight) entries.push(`${shortDate(day)}: <b>${esc(weight)} kg</b>`);
    }
    $("weights").innerHTML = entries.length
      ? `Sunday weigh-ins: ${entries.join(" &middot; ")}`
      : "Sunday weigh-ins appear here once you enter them in a Sunday's log.";
  }

  // ---------------------------------------------------------------------
  // Static sections: exercise guide, tests, measurements, sample day
  // ---------------------------------------------------------------------

  function renderStaticSections() {
    $("exercise-guide").innerHTML = `
      <div class="scroll"><table>
        <tr><th>Exercise</th><th>How to do it</th></tr>
        ${EXERCISES.map(([name, how]) => `<tr><td><b>${name}</b></td><td>${how}</td></tr>`).join("")}
      </table></div>`;

    $("block-table").innerHTML = `
      <div class="scroll"><table>
        <tr><th>Block</th><th>Dates</th><th>Goal</th><th>How it feels</th></tr>
        ${BLOCKS.slice(1).map((b) => `<tr><td><b>${b.name}</b></td><td>${b.dates}</td><td>${b.goal}</td><td>${b.feel}</td></tr>`).join("")}
      </table></div>`;

    $("test-table").innerHTML = `
      <div class="scroll"><table>
        <tr><th>Test</th>${TEST_DATES.map((d) => `<th>${d}</th>`).join("")}</tr>
        ${TESTS.map((test, row) => `
          <tr>
            <td><b>${test.name}</b></td>
            ${test.targets.map((target, col) => `
              <td><small class="muted-line">Target: ${target}</small>
                <input type="text" class="cell-input" data-test="${row}-${col}" aria-label="${test.name}, ${TEST_DATES[col]}" value="${esc(state.tests[`${row}-${col}`])}"></td>`).join("")}
          </tr>`).join("")}
      </table></div>`;

    $("measure-table").innerHTML = `
      <div class="scroll"><table>
        <tr><th>Date</th>${MEASURE_COLS.map(([, label]) => `<th>${label}</th>`).join("")}</tr>
        ${MEASURE_ROWS.map((date) => `
          <tr>
            <td><b>${date}</b></td>
            ${MEASURE_COLS.map(([key, label]) => `
              <td><input type="text" class="cell-input" data-measure="${date}|${key}" aria-label="${label}, ${date}" value="${esc((state.measurements[date] || {})[key])}"></td>`).join("")}
          </tr>`).join("")}
      </table></div>`;

    $("sample-day").innerHTML = `
      <div class="scroll"><table>
        <tr><th>Meal</th><th>Example</th></tr>
        ${SAMPLE_DAY.map(([meal, example]) => `<tr><td><b>${meal}</b></td><td>${example}</td></tr>`).join("")}
      </table></div>`;

    document.querySelectorAll("[data-test]").forEach((input) => {
      input.oninput = () => { state.tests[input.dataset.test] = input.value; saveState(STORAGE_KEY, state); };
    });
    document.querySelectorAll("[data-measure]").forEach((input) => {
      input.oninput = () => {
        const [date, key] = input.dataset.measure.split("|");
        state.measurements[date] = state.measurements[date] || {};
        state.measurements[date][key] = input.value;
        saveState(STORAGE_KEY, state);
      };
    });
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
    renderCalendar({ container: $("calendar"), selectedDay, isDayComplete, onPick: selectDay });
    renderDayPanel();
    state.completedCount = renderStats(); // the home page reads this
    renderScheduleTables();
    renderLogTable();
    renderWeights();
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
      showToast("Race day logged. Great job!");
    } else {
      burstConfetti(window.innerWidth / 2, window.innerHeight / 3, 120);
      showToast(`Day ${day} complete!`);
    }
  }

  // ---------------------------------------------------------------------
  // Start
  // ---------------------------------------------------------------------

  renderStaticSections();
  renderDayNav({ container: $("day-nav"), getSelectedDay: () => selectedDay, onPick: selectDay });
  render();
})();
