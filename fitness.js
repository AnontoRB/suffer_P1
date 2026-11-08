/**
 * Fitness page.
 * Needs: common.js (App) and fitness-data.js (FITNESS).
 *
 * Each day has a training plan, a water counter and a sleep log.
 * A day is "complete" when every training item is ticked and the
 * water goal is reached. Progress is saved in localStorage.
 */
(() => {
  "use strict";

  const {
    $, TOTAL_DAYS,
    loadState, saveState, todayNumber, daysUntilRace, clampDay, formatDate, shortDate,
    renderCalendar, renderDayNav, dayTag, burstConfetti, showToast,
  } = App;

  const { WATER_GOAL_ML, SLEEP_GOAL_MIN, PHASES, RUNS, STRENGTH, TIPS } = FITNESS;

  // ---------------------------------------------------------------------
  // Settings
  // ---------------------------------------------------------------------

  const STORAGE_KEY = "fitness-plan-v1";

  /** What each day of the 7-day pattern holds, starting from day 1. */
  const WEEKLY_PATTERN = ["run1", "strengthA", "run2", "strengthB", "rest", "longRun", "strengthC"];

  /** Retest days replace the Strength C session. Value = prefix for saved ids. */
  const RETEST_DAYS = { 28: "t", 49: "u" };

  const SHAKE_OUT_DAY = 57;
  const ACTIVATION_DAY = 58;
  const PRE_RACE_DAY = 59;
  const RACE_DAY = 60;

  const DEFAULT_STRENGTH_NOTE =
    "Warm up 5 min (brisk walk, arm circles, leg swings). Rest 60-90 s between sets. Stretch for 5 min after.";

  // ---------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------

  const state = loadState(STORAGE_KEY);
  let selectedDay = clampDay(todayNumber());

  /** Saved data for one day. */
  function getDayData(day) {
    if (!state.days[day]) {
      state.days[day] = { waterMl: 0, bedTime: "", wakeTime: "", checked: {} };
    }
    return state.days[day];
  }

  // ---------------------------------------------------------------------
  // Building a day's plan
  //
  // Every builder returns:
  //   { title, weekLabel?, note?, tip?, items: [{ id, label, detail, isNumeric? }] }
  // ---------------------------------------------------------------------

  /** Training week index 0-7 for a day (days 57+ stay on the last index). */
  const weekIndexOf = (day) => Math.min(PHASES.length - 1, Math.floor((day - 1) / 7));

  const weekLabel = (week) => `Week ${week + 1} · ${PHASES[week]}`;

  function strengthPlan(key, week) {
    const session = STRENGTH[key];
    return {
      title: session.title,
      weekLabel: weekLabel(week),
      note: session.note || DEFAULT_STRENGTH_NOTE,
      items: session.exercises.map((exercise, index) => ({
        id: `strength-${index}`,
        label: exercise.name,
        detail: `${exercise.sets[week]} × ${exercise.reps[week]}${exercise.unit}${exercise.cue ? ": " + exercise.cue : ""}`,
      })),
    };
  }

  function runPlan(kind, week) {
    return {
      title: kind === "long" ? "Long run" : "Run",
      weekLabel: weekLabel(week),
      note: "Brisk walk 5 min first and last. Jog at an easy, conversational pace.",
      items: [{
        id: "run",
        label: RUNS[week][kind],
        detail: "Walk if you need to. Finishing matters more than speed.",
      }],
    };
  }

  function restPlan(week) {
    return {
      title: "Rest day: active recovery",
      weekLabel: weekLabel(week),
      note: "No hard training. Let your body adapt.",
      items: [
        { id: "walk", label: "Easy walk, 40–60 min", detail: "Flat, comfortable pace" },
        { id: "stretch", label: "Stretching, 10 min", detail: "Hips, calves, hamstrings, shoulders" },
      ],
    };
  }

  /** Max-effort test day. `prefix` keeps day 28 and day 49 results separate. */
  function retestPlan(prefix) {
    const numericItem = (n, label, detail) => ({ id: `${prefix}${n}`, label, detail, isNumeric: true });
    return {
      title: "Retest day: how far have you come?",
      tip: "Warm up well and rest 2 minutes between tests. Give each an honest max.",
      items: [
        numericItem(1, "Max push-ups in one set", "Day 1: 8"),
        numericItem(2, "Max sit-ups in one set", "Day 1: 30"),
        numericItem(3, "Max squats in one set", "Day 1: 30"),
        numericItem(4, "Longest easy jog without stopping (minutes)", "Day 1: about 0.5 min at sprint speed"),
      ],
    };
  }

  // Race week (days 57-60)

  function shakeOutPlan() {
    return {
      title: "Shake-out run",
      weekLabel: "Race week",
      note: "Walk 5 min before and after.",
      tip: "Short and easy keeps your legs fresh for race day.",
      items: [{ id: "run", label: RUNS[PHASES.length - 1].run1, detail: "Very easy pace" }],
    };
  }

  function activationPlan() {
    return {
      title: "Light activation",
      note: "Race week: keep strength tiny.",
      tip: "Stay fresh. Nothing today should feel hard.",
      items: [
        { id: "light-strength", label: "Squats 2 × 10, push-ups 2 × 5", detail: "Easy effort" },
        { id: "stretch", label: "Stretching, 10 min", detail: "Hips, calves, hamstrings" },
      ],
    };
  }

  function preRacePlan() {
    return {
      title: "Pre-race rest",
      note: "No hard training today.",
      tip: "Hydrate steadily, eat normally, and go to bed early.",
      items: [
        { id: "walk", label: "Easy walk, 20–30 min", detail: "Keep it relaxed" },
        { id: "kit", label: "Lay out race kit and plan breakfast", detail: "Shoes, clothes, bib, water, wake-up time" },
      ],
    };
  }

  function racePlan() {
    return {
      title: "RACE DAY: 7.5 km",
      note: "You've put in 60 days. Enjoy it.",
      tip: "Start slower than feels natural. Walk through water stations if you need to.",
      items: [
        { id: "warmup", label: "10 min warm-up: walk and leg swings", detail: "Do not skip it." },
        { id: "race", label: "Run the 7.5 km race", detail: "Smile at the start line." },
      ],
    };
  }

  /** Picks the right builder for a day. */
  function buildDayPlan(day) {
    const specialPlans = {
      [SHAKE_OUT_DAY]: shakeOutPlan,
      [ACTIVATION_DAY]: activationPlan,
      [PRE_RACE_DAY]: preRacePlan,
      [RACE_DAY]: racePlan,
    };
    if (specialPlans[day]) return specialPlans[day]();

    const week = weekIndexOf(day);
    const tip = TIPS[(day - 1) % TIPS.length];

    if (RETEST_DAYS[day]) {
      return { ...retestPlan(RETEST_DAYS[day]), weekLabel: weekLabel(week) };
    }

    const session = WEEKLY_PATTERN[(day - 1) % 7];
    let plan;
    if (session === "strengthA") plan = strengthPlan("A", week);
    else if (session === "strengthB") plan = strengthPlan("B", week);
    else if (session === "strengthC") plan = strengthPlan("C", week);
    else if (session === "run1") plan = runPlan("run1", week);
    else if (session === "run2") plan = runPlan("run2", week);
    else if (session === "longRun") plan = runPlan("long", week);
    else plan = restPlan(week);

    return { tip, ...plan };
  }

  // ---------------------------------------------------------------------
  // Completion and sleep maths
  // ---------------------------------------------------------------------

  function isItemDone(item, checked) {
    return item.isNumeric ? Number(checked[item.id]) > 0 : Boolean(checked[item.id]);
  }

  function isDayComplete(day) {
    const data = getDayData(day);
    const allItemsDone = buildDayPlan(day).items.every((item) => isItemDone(item, data.checked));
    return allItemsDone && data.waterMl >= WATER_GOAL_ML;
  }

  /** Minutes slept between bed time and wake time (handles crossing midnight). */
  function sleepMinutes(data) {
    if (!data || !data.bedTime || !data.wakeTime) return 0;
    const [bedHour, bedMinute] = data.bedTime.split(":").map(Number);
    const [wakeHour, wakeMinute] = data.wakeTime.split(":").map(Number);
    const minutesInDay = 24 * 60;
    return ((wakeHour * 60 + wakeMinute) - (bedHour * 60 + bedMinute) + minutesInDay) % minutesInDay;
  }

  const formatDuration = (minutes) => `${Math.floor(minutes / 60)} h ${minutes % 60} min`;

  // ---------------------------------------------------------------------
  // Rendering: the day panel
  // ---------------------------------------------------------------------

  function waterBoxHtml(data) {
    const percent = Math.min(100, (data.waterMl / WATER_GOAL_ML) * 100);
    return `
      <div class="box">
        <h3>&#128167; Water: ${data.waterMl} / ${WATER_GOAL_ML} ml</h3>
        <div class="meter"><i style="width:${percent}%"></i></div>
        <div class="row">
          <button class="btn-outline" data-water="-250">−250</button>
          <button class="btn-outline" data-water="250">+250 ml</button>
          <button class="btn-outline" data-water="500">+500 ml</button>
        </div>
      </div>`;
  }

  function sleepBoxHtml(data) {
    const slept = sleepMinutes(data);
    let summary = "Goal: 8 hours, for example 22:30 to 06:30.";
    if (slept > 0) {
      summary = slept >= SLEEP_GOAL_MIN - 30
        ? `${formatDuration(slept)}: on target.`
        : `${formatDuration(slept)}: ${formatDuration(SLEEP_GOAL_MIN - slept)} short of 8 h.`;
    }
    return `
      <div class="box">
        <h3>&#128564; Last night's sleep</h3>
        <div class="row">
          <label>Bed <input type="time" id="bed-time" value="${data.bedTime}"></label>
          <label>Woke <input type="time" id="wake-time" value="${data.wakeTime}"></label>
        </div>
        <p class="muted-line">${summary}</p>
      </div>`;
  }

  function trainingBoxHtml(plan, data) {
    const rows = plan.items.map((item) => {
      const done = isItemDone(item, data.checked);
      const saved = data.checked[item.id];
      const control = item.isNumeric
        ? `<input type="number" min="0" id="item-${item.id}" value="${saved || ""}" aria-label="${item.label}">`
        : `<input type="checkbox" id="item-${item.id}" ${saved ? "checked" : ""}>`;
      return `
        <div class="check-item ${done ? "checked" : ""}">
          ${control}
          <label for="item-${item.id}"><b>${item.label}</b><small>${item.detail}</small></label>
        </div>`;
    }).join("");

    return `
      <div class="box">
        <h3>&#128170; Training</h3>
        ${plan.note ? `<p class="muted-line" style="margin:0 0 6px">${plan.note}</p>` : ""}
        ${rows}
      </div>
      <div class="tip"><b>Overload tip:</b> ${plan.tip}</div>`;
  }

  function renderDayPanel() {
    const day = selectedDay;
    const plan = buildDayPlan(day);
    const data = getDayData(day);
    const panel = $("panel");

    panel.innerHTML = `
      <h2>${plan.title}</h2>
      <div class="panel-date">Day ${day} &middot; ${formatDate(day)}${plan.weekLabel ? " &middot; " + plan.weekLabel : ""}${dayTag(day, isDayComplete(day))}</div>
      ${waterBoxHtml(data)}
      ${sleepBoxHtml(data)}
      ${trainingBoxHtml(plan, data)}`;

    wirePanelEvents(day, plan, data, panel);
  }

  /** Connects the panel's buttons and inputs to the saved data. */
  function wirePanelEvents(day, plan, data, panel) {
    const update = (change) => {
      const wasComplete = isDayComplete(day);
      change();
      render();
      if (!wasComplete && isDayComplete(day)) {
        burstConfetti(window.innerWidth / 2, window.innerHeight / 3, 140);
        showToast(`Day ${day} complete!`);
      }
    };

    panel.querySelectorAll("[data-water]").forEach((button) => {
      button.onclick = () => update(() => {
        data.waterMl = Math.max(0, data.waterMl + Number(button.dataset.water));
      });
    });

    $("bed-time").onchange = (event) => update(() => { data.bedTime = event.target.value; });
    $("wake-time").onchange = (event) => update(() => { data.wakeTime = event.target.value; });

    plan.items.forEach((item) => {
      const input = $(`item-${item.id}`);
      input.onchange = () => update(() => {
        data.checked[item.id] = item.isNumeric ? Number(input.value) || 0 : input.checked;
      });
    });
  }

  // ---------------------------------------------------------------------
  // Rendering: stats, trends, tables
  // ---------------------------------------------------------------------

  const average = (numbers) => numbers.reduce((sum, n) => sum + n, 0) / numbers.length;

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

  /** Updates the four stat boxes. Returns the number of completed days. */
  function renderStats() {
    let completed = 0;
    const sleepTotals = [];
    const waterTotals = [];

    for (let day = 1; day <= TOTAL_DAYS; day++) {
      const data = getDayData(day);
      if (isDayComplete(day)) completed++;
      if (sleepMinutes(data) > 0) sleepTotals.push(sleepMinutes(data));
      if (data.waterMl > 0) waterTotals.push(data.waterMl);
    }

    $("stat-streak").textContent = currentStreak();
    $("stat-done").textContent = completed;
    $("stat-sleep").textContent = sleepTotals.length ? (average(sleepTotals) / 60).toFixed(1) : "–";
    $("stat-water").textContent = waterTotals.length ? (average(waterTotals) / 1000).toFixed(1) : "–";
    return completed;
  }

  function renderTrends() {
    let waterBars = "";
    let sleepBars = "";
    for (let day = 1; day <= TOTAL_DAYS; day++) {
      const data = getDayData(day);
      const waterPercent = Math.min(100, (data.waterMl / WATER_GOAL_ML) * 100);
      const sleepPercent = Math.min(100, (sleepMinutes(data) / SLEEP_GOAL_MIN) * 100);
      waterBars += `<i title="Day ${day}" style="height:${waterPercent}%"></i>`;
      sleepBars += `<i title="Day ${day}" style="height:${sleepPercent}%"></i>`;
    }
    $("water-bars").innerHTML = waterBars;
    $("sleep-bars").innerHTML = sleepBars;
  }

  function renderRetestTable() {
    const day28 = getDayData(28).checked;
    const day49 = getDayData(49).checked;
    const show = (value) => (Number(value) > 0 ? `<b>${value}</b>` : "–");

    $("retest-table").innerHTML = `
      <table>
        <tr><th>Skill</th><th>Day 1</th><th>Day 28</th><th>Day 49</th><th>Goal by day 49</th></tr>
        <tr><td>Push-ups</td><td>8</td><td>${show(day28.t1)}</td><td>${show(day49.u1)}</td><td>14–18</td></tr>
        <tr><td>Sit-ups</td><td>30</td><td>${show(day28.t2)}</td><td>${show(day49.u2)}</td><td>45–50</td></tr>
        <tr><td>Squats</td><td>30</td><td>${show(day28.t3)}</td><td>${show(day49.u3)}</td><td>55–65</td></tr>
        <tr><td>Easy jog (min)</td><td>0.5 sprint</td><td>${show(day28.t4)}</td><td>${show(day49.u4)}</td><td>45–50</td></tr>
        <tr><td>Pull-ups</td><td>0</td><td colspan="3">Needs a bar; Superman holds build your back for now</td></tr>
      </table>`;
  }

  function renderWeeklyTable() {
    const weekRows = RUNS.map((runs, week) => {
      const firstDay = week * 7 + 1;
      const lastDay = Math.min(TOTAL_DAYS, firstDay + 6);
      return `
        <tr>
          <td>${week + 1}</td>
          <td>${shortDate(firstDay)} – ${shortDate(lastDay)}</td>
          <td>${PHASES[week]}</td>
          <td>${runs.run1}</td><td>${runs.run2}</td><td>${runs.long}</td>
        </tr>`;
    }).join("");

    const raceWeekRow = `
      <tr>
        <td>${RUNS.length + 1}</td>
        <td>${shortDate(SHAKE_OUT_DAY)} – ${shortDate(RACE_DAY)}</td>
        <td>Race week</td>
        <td colspan="3">${shortDate(SHAKE_OUT_DAY)} shake-out run, ${shortDate(ACTIVATION_DAY)} light activation, ${shortDate(PRE_RACE_DAY)} rest, ${shortDate(RACE_DAY)} race: 7.5 km</td>
      </tr>`;

    $("weekly-table").innerHTML = `
      <table>
        <tr><th>Week</th><th>Dates</th><th>Phase</th><th>Run 1</th><th>Run 2</th><th>Long run</th></tr>
        ${weekRows}${raceWeekRow}
      </table>`;
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
      onPick: selectDay,
    });
    renderDayPanel();
    state.completedCount = renderStats(); // the home page reads this
    renderTrends();
    renderRetestTable();
    renderWeeklyTable();
    renderRaceCountdown();
    saveState(STORAGE_KEY, state);
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
