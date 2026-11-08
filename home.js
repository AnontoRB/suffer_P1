/**
 * Home page: digital clock with a "time left today" bar, a "tasks completed"
 * bar, race countdown, a progress bar for each plan, and today's tasks from
 * all four plans and your own tasks in one list.
 *
 * The task lists are built here from the same data files the plan pages use
 * (rust-data.js, marathon-data.js, health-data.js, cubing-data.js), and ticking a task saves
 * to the same localStorage keys, so the home page and the plan pages always
 * agree. A day is complete when every required task is ticked.
 */
(() => {
  "use strict";

  const { $, TOTAL_DAYS, loadState, saveState, todayNumber, daysUntilRace, clampDay,
          formatDate, dayDate, burstConfetti, isoDate } = App;

  // ---------------------------------------------------------------------
  // Tasks for one day, per plan: { heading, items: [{ id, label, detail, optional? }] }
  // (returns null when the plan has nothing on that day)
  // ---------------------------------------------------------------------

  function rustTasks(day) {
    const lesson = RUST_DAYS[day - 1];
    if (!lesson) return null;
    const [learnMin, practiceMin, buildMin] = lesson.minutes || [45, 45, 30];
    const title = (name, min, optional) => `${name}${min ? ` (${min} min)` : ""}${optional ? " (optional)" : ""}`;
    return {
      heading: lesson.title,
      items: [
        { id: "learn",    label: title("1. Learn", learnMin),                           detail: lesson.learn },
        { id: "practice", label: title("2. Practice", practiceMin, lesson.practiceOptional), detail: lesson.practice, optional: !!lesson.practiceOptional },
        { id: "build",    label: title("3. Build/Review", buildMin),                    detail: lesson.build },
      ],
    };
  }

  function marathonTasks(day) {
    const { FIRST_PLAN_DAY, SCHEDULE, WARM_UP, COOL_DOWN, JOG_PACE, STRENGTH_MOVES } = MARATHON;
    if (day < FIRST_PLAN_DAY || day > TOTAL_DAYS) return null;
    const entry = SCHEDULE[day - FIRST_PLAN_DAY];

    if (entry.kind === "race") {
      return { heading: "Race day", items: [{ id: "race", label: entry.text, detail: "" }] };
    }
    if (entry.kind === "run") {
      return {
        heading: "Run day",
        items: [
          { id: "warmup",   label: "Warm-up",              detail: WARM_UP },
          { id: "run",      label: `RUN: ${entry.text}`,   detail: `Jog pace: ${JOG_PACE}` },
          { id: "cooldown", label: "Cool-down",            detail: COOL_DOWN },
        ],
      };
    }
    const items = [{ id: "rest", label: entry.label || "Rest day", detail: entry.note || "" }];
    (entry.optional || []).forEach((text, index) => {
      items.push({ id: `optional-${index}`, label: `${text} (optional)`, detail: "", optional: true });
    });
    if (entry.strengthRounds) {
      items.push({
        id: "strength", label: "Light strength (optional)",
        detail: `${STRENGTH_MOVES}, ${entry.strengthRounds} rounds`, optional: true,
      });
    }
    return { heading: "Rest day", items };
  }

  const healthSessions = new Map(HEALTH.SESSIONS.map((session) => [session.day, session]));

  function healthKind(day) {
    if (day === 1) return "baseline";
    if (day === TOTAL_DAYS) return "race";
    const session = healthSessions.get(day);
    return session ? session.kind : "run";
  }

  function healthWaterGoal(day) {
    const kind = healthKind(day);
    if (kind === "race") return null;
    const higher = day >= 18; // Nov 25: water goals go up
    if (kind === "run") return higher ? 3.5 : 3.0;
    return higher ? 3.0 : 2.5;
  }

  function healthTasks(day) {
    const { WARM_UP, COOL_DOWN, FOOD_TICK } = HEALTH;
    const kind = healthKind(day);
    const session = healthSessions.get(day);
    const items = [];
    let heading = { baseline: "Baseline day", run: "Run day", race: "Race day",
                    test: "Test day", mobility: "Mobility day", rest: "Full rest" }[kind];

    if (kind === "baseline") {
      items.push(
        { id: "weigh",  label: "Weigh yourself", detail: "First thing in the morning, after the toilet, before eating." },
        { id: "tape",   label: "Measure with a tape", detail: "Waist (at the belly button), chest, upper arm and thigh. Write the numbers in the measurements table." },
        { id: "photos", label: "Take front, side and back photos", detail: "Same clothes and lighting. Repeat on Dec 10 and Jan 7." },
        { id: "tests",  label: "Test: plank hold and dead hang", detail: "Max time for each (dead hang only if you have a bar). Write the numbers down." },
        { id: "guide",  label: "Read the exercise guide", detail: "So you know the movements before tomorrow." },
      );
    } else if (kind === "strength") {
      heading = `Strength day: ${session.code}`;
      items.push({ id: "warmup", label: "Warm-up", detail: WARM_UP });
      if (session.test === "full") {
        items.push({ id: "tests", label: "Checkpoint tests first",
          detail: "Push-ups, squats, sit-ups, plank and dead hang, max each, 3 minutes of rest between them, strict form (chest near floor, squats to parallel). Write your results on the Health page." });
      }
      items.push(
        { id: "main", label: `Session ${session.code}`, detail: session.workout },
        { id: "cooldown", label: "Cool-down", detail: COOL_DOWN },
      );
    } else if (session) {
      items.push({ id: "main", label: session.code, detail: session.workout });
    }

    const goal = healthWaterGoal(day);
    if (goal === null) {
      items.push({ id: "water", label: "Water: about 500 ml, 2 to 3 hours before the start, then sip",
                   detail: "Drink steadily, don't gulp." });
    } else {
      let detail = "One glass is 250 ml. Pale yellow urine means you are drinking enough.";
      if (kind === "run") detail = "Drink 300 to 500 ml in the 2 hours before the run, and sip after it. " + detail;
      if (day === 59) detail = "Drink steadily, don't gulp. " + detail;
      items.push({ id: "water", label: `Drink ${goal.toFixed(1)} L of water`, detail });
    }
    items.push({ id: "food", label: "Followed the food plan (optional)", detail: FOOD_TICK, optional: true });
    return { heading, items };
  }

  const PLANS = [
    { id: "rust",     name: "Learn Rust", storageKey: "rust-plan-v1",     totalDays: TOTAL_DAYS, barId: "rust-bar",     labelId: "rust-label",     tasksFor: rustTasks },
    { id: "marathon", name: "Marathon",   storageKey: "marathon-plan-v1", totalDays: 59,         barId: "marathon-bar", labelId: "marathon-label", tasksFor: marathonTasks }, // Nov 9 - Jan 6
    { id: "health",   name: "Health",     storageKey: "health-plan-v1",   totalDays: TOTAL_DAYS, barId: "health-bar",   labelId: "health-label",   tasksFor: healthTasks },
    { id: "cubing",   name: "Speedcubing", storageKey: "cubing-plan-v1",  totalDays: TOTAL_DAYS, barId: "cubing-bar",   labelId: "cubing-label",   tasksFor: (day) => CUBING.tasksFor(day) },
  ];

  // ---------------------------------------------------------------------
  // Your own tasks (added on the My Tasks page, saved by date)
  // ---------------------------------------------------------------------

  const MY_KEY = "tasks-plan-v1";
  const esc = (text) => String(text).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const myTasksOn = (state, day) => (state.tasks || {})[isoDate(dayDate(day))] || [];

  function renderMyTasksProgress() {
    let total = 0;
    let done = 0;
    Object.values(loadState(MY_KEY).tasks || {}).forEach((list) => list.forEach((task) => {
      total++;
      if (task.done) done++;
    }));
    $("mytasks-bar").style.width = total ? `${(done / total) * 100}%` : "0%";
    $("mytasks-label").textContent = total ? `${done} / ${total} tasks done` : "No tasks yet";
  }

  function toggleMyTask(box) {
    const state = loadState(MY_KEY);
    const task = myTasksOn(state, shownDay).find((t) => t.id === box.dataset.item);
    if (!task) return;
    task.done = box.checked;
    saveState(MY_KEY, state);

    const before = $("tasks-count").textContent;
    const { done, total } = renderTasks();
    renderMyTasksProgress();
    if (total > 0 && done === total && before !== `${done} / ${total}`) {
      burstConfetti(window.innerWidth / 2, window.innerHeight / 2, 160);
    }
  }

  // ---------------------------------------------------------------------
  // Saved progress
  // ---------------------------------------------------------------------

  function checkedFor(state, day) {
    const data = state.days[day] || (state.days[day] = {});
    return data.checked || (data.checked = {});
  }

  function isDayComplete(plan, state, day) {
    const tasks = plan.tasksFor(day);
    if (!tasks) return false;
    const checked = checkedFor(state, day);
    return tasks.items.filter((item) => !item.optional).every((item) => checked[item.id]);
  }

  function countCompletedDays(plan, state) {
    let count = 0;
    for (let day = 1; day <= TOTAL_DAYS; day++) {
      if (isDayComplete(plan, state, day)) count++;
    }
    return count;
  }

  // ---------------------------------------------------------------------
  // Rendering: countdown, plan progress
  // ---------------------------------------------------------------------

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

  function renderPlanProgress(plan) {
    const completed = loadState(plan.storageKey).completedCount || 0;
    $(plan.barId).style.width = `${(completed / plan.totalDays) * 100}%`;
    $(plan.labelId).textContent = `${completed} / ${plan.totalDays} days`;
  }

  // ---------------------------------------------------------------------
  // Rendering: today's tasks (all plans) and the "tasks completed" bar
  // ---------------------------------------------------------------------

  let shownDay = clampDay(todayNumber());

  /** Required tasks count towards the bar; optional ones are listed but never block it. */
  function renderTasks() {
    const day = shownDay;
    $("tasks-date").textContent = `Day ${day} · ${formatDate(day)}`;

    let total = 0;
    let done = 0;
    let html = "";

    PLANS.forEach((plan) => {
      const tasks = plan.tasksFor(day);
      if (!tasks) return;
      const state = loadState(plan.storageKey);
      const checked = checkedFor(state, day);

      const rows = tasks.items.map((item) => {
        if (!item.optional) {
          total++;
          if (checked[item.id]) done++;
        }
        const id = `task-${plan.id}-${item.id}`;
        return `
          <div class="check-item ${checked[item.id] ? "checked" : ""}">
            <input type="checkbox" id="${id}" data-plan="${plan.id}" data-item="${item.id}" ${checked[item.id] ? "checked" : ""}>
            <label for="${id}">
              <b>${item.label}</b>
              ${item.detail ? `<small>${item.detail}</small>` : ""}
            </label>
          </div>`;
      }).join("");

      html += `
        <div class="task-group task-${plan.id}">
          <h3>${plan.name} <span>${tasks.heading}</span></h3>
          ${rows}
        </div>`;
    });

    const mine = myTasksOn(loadState(MY_KEY), day);
    if (mine.length) {
      const rows = mine.map((task) => {
        total++;
        if (task.done) done++;
        const id = `task-mytasks-${task.id}`;
        return `
          <div class="check-item ${task.done ? "checked" : ""}">
            <input type="checkbox" id="${id}" data-plan="mytasks" data-item="${task.id}" ${task.done ? "checked" : ""}>
            <label for="${id}"><b>${esc(task.text)}</b></label>
          </div>`;
      }).join("");
      html += `<div class="task-group task-mytasks"><h3>My Tasks <span>added by you</span></h3>${rows}</div>`;
    }

    $("task-list").innerHTML = html || '<p class="muted-line">No tasks today.</p>';
    $("task-list").querySelectorAll("input[type=checkbox]").forEach((box) => {
      box.onchange = () => toggleTask(box);
    });

    const percent = total ? (done / total) * 100 : 0;
    $("tasks-count").textContent = `${done} / ${total}`;
    $("tasks-percent").textContent = `${percent.toFixed(0)}% done`;
    $("tasks-total").textContent = total;
    $("tasks-bar-fill").style.width = `${percent}%`;
    $("tasks-bar").setAttribute("aria-valuenow", Math.round(percent));
    return { done, total };
  }

  function toggleTask(box) {
    if (box.dataset.plan === "mytasks") return toggleMyTask(box);
    const plan = PLANS.find((p) => p.id === box.dataset.plan);
    const state = loadState(plan.storageKey);
    const day = shownDay;
    const wasComplete = isDayComplete(plan, state, day);

    checkedFor(state, day)[box.dataset.item] = box.checked;
    state.completedCount = countCompletedDays(plan, state);
    saveState(plan.storageKey, state);

    const before = $("tasks-count").textContent;
    const { done, total } = renderTasks();
    renderPlanProgress(plan);

    if (!wasComplete && isDayComplete(plan, state, day)) {
      burstConfetti(window.innerWidth / 2, window.innerHeight / 3, 90);
    }
    if (total > 0 && done === total && before !== `${done} / ${total}`) {
      burstConfetti(window.innerWidth / 2, window.innerHeight / 2, 160);
    }
  }

  function renderAll() {
    renderCountdown();
    PLANS.forEach(renderPlanProgress);
    renderMyTasksProgress();
    renderTasks();
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

    // A new day has started: show the new day's tasks.
    const today = clampDay(todayNumber());
    if (today !== shownDay) {
      shownDay = today;
      renderAll();
    }
    setTimeout(tickClock, MS_PER_SECOND - (Date.now() % MS_PER_SECOND));
  }

  $("clock-format").onclick = () => {
    use24Hour = !use24Hour;
    saveClockFormat();
    renderClock();
  };

  // Keep the page in sync when a plan page changes progress in another tab.
  window.addEventListener("storage", renderAll);

  // ---------------------------------------------------------------------
  // Start
  // ---------------------------------------------------------------------

  renderAll();
  tickClock();
})();
