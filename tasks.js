/**
 * My Tasks page: your own tasks on any date.
 * Needs: common.js (App).
 *
 * Saved in localStorage as { days: {}, tasks: { "2026-11-09": [{ id, text, done }] } }.
 * The home page reads the same data to show today's tasks.
 */
(() => {
  "use strict";

  const { $, loadState, saveState, isoDate, burstConfetti } = App;

  const STORAGE_KEY = "tasks-plan-v1";
  const state = loadState(STORAGE_KEY);
  state.tasks = state.tasks || {};

  const esc = (text) => String(text == null ? "" : text).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const parseIso = (iso) => { const [y, m, d] = iso.split("-").map(Number); return new Date(y, m - 1, d); };
  const todayIso = () => isoDate(new Date());
  const monthStart = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
  const shortLabel = (iso) => parseIso(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const longLabel = (iso) => parseIso(iso).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  let selected = todayIso();
  let viewMonth = monthStart(parseIso(selected));
  let editingId = null;

  const listFor = (iso) => state.tasks[iso] || [];
  const isAllDone = (iso) => listFor(iso).length > 0 && listFor(iso).every((task) => task.done);
  const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  function save() {
    // Drop empty dates so the saved data stays small.
    Object.keys(state.tasks).forEach((iso) => { if (state.tasks[iso].length === 0) delete state.tasks[iso]; });
    saveState(STORAGE_KEY, state);
  }

  function dayTag(iso) {
    if (listFor(iso).length === 0) return "";
    if (isAllDone(iso)) return '<span class="tag ok">All done</span>';
    if (iso < todayIso()) return '<span class="tag missed">Unfinished</span>';
    return iso === todayIso() ? '<span class="tag">Today</span>' : '<span class="tag upcoming">Upcoming</span>';
  }

  // ---------------------------------------------------------------------
  // Calendar (one month at a time) and date jump
  // ---------------------------------------------------------------------

  function selectDate(iso) {
    selected = iso;
    viewMonth = monthStart(parseIso(iso));
    editingId = null;
    render();
  }

  function renderMonthNav() {
    $("month-nav").innerHTML = `
      <button type="button" data-step="-1">&larr; Previous month</button>
      <b class="month-title">${viewMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</b>
      <button type="button" data-step="1">Next month &rarr;</button>
      <button type="button" data-step="0">Today</button>
      <input type="date" class="cell-input jump-date" id="jump-date" aria-label="Jump to a date" value="${selected}">`;

    $("month-nav").querySelectorAll("button").forEach((button) => {
      button.onclick = () => {
        const step = Number(button.dataset.step);
        if (step === 0) return selectDate(todayIso());
        viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + step, 1);
        render();
      };
    });
    $("jump-date").onchange = (event) => { if (event.target.value) selectDate(event.target.value); };
  }

  function renderCalendar() {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = todayIso();

    let cells = "SMTWTFS".split("").map((letter) => `<b class="weekday">${letter}</b>`).join("");
    cells += "<span></span>".repeat(viewMonth.getDay());
    for (let day = 1; day <= daysInMonth; day++) {
      const iso = isoDate(new Date(year, month, day));
      const classes = [];
      if (isAllDone(iso)) classes.push("done");
      else if (listFor(iso).length > 0) classes.push(iso < today ? "missed" : "has-tasks");
      if (iso === today) classes.push("today");
      if (iso === selected) classes.push("selected");
      cells += `<button type="button" class="${classes.join(" ")}" data-iso="${iso}" aria-label="${longLabel(iso)}, ${listFor(iso).length} tasks">${day}</button>`;
    }
    $("calendar").innerHTML = `<div class="calendar">${cells}</div>`;
    $("calendar").querySelectorAll("button").forEach((button) => { button.onclick = () => selectDate(button.dataset.iso); });
  }

  // ---------------------------------------------------------------------
  // The day panel
  // ---------------------------------------------------------------------

  function taskRow(task) {
    if (task.id === editingId) {
      return `
        <div class="check-item">
          <input type="text" class="cell-input" id="edit-input" maxlength="200" aria-label="Edit task" value="${esc(task.text)}">
          <span class="task-actions">
            <button type="button" data-act="save" data-id="${task.id}">Save</button>
            <button type="button" data-act="cancel" data-id="${task.id}">Cancel</button>
          </span>
        </div>`;
    }
    return `
      <div class="check-item ${task.done ? "checked" : ""}">
        <input type="checkbox" id="task-${task.id}" data-id="${task.id}" ${task.done ? "checked" : ""}>
        <label for="task-${task.id}"><b>${esc(task.text)}</b></label>
        <span class="task-actions">
          <button type="button" data-act="edit" data-id="${task.id}">Edit</button>
          <button type="button" data-act="delete" data-id="${task.id}" class="danger">Delete</button>
        </span>
      </div>`;
  }

  function renderPanel() {
    const list = listFor(selected);
    const doneCount = list.filter((task) => task.done).length;

    $("panel").innerHTML = `
      <h2>${longLabel(selected)}</h2>
      <div class="panel-date">${doneCount} / ${list.length} done${dayTag(selected)}</div>
      <form class="add-form" id="add-form">
        <input type="text" class="cell-input" id="new-task" maxlength="200" placeholder="Add a task for this day" aria-label="New task">
        <button type="submit" class="btn-outline">Add task</button>
      </form>
      <div class="box">${list.length ? list.map(taskRow).join("") : '<p class="muted-line">No tasks on this day yet.</p>'}</div>
      ${doneCount > 0 ? '<p><button type="button" class="btn-outline" id="clear-done">Clear completed tasks</button></p>' : ""}`;

    $("add-form").onsubmit = (event) => {
      event.preventDefault();
      const text = $("new-task").value.trim();
      if (!text) return;
      (state.tasks[selected] = listFor(selected)).push({ id: newId(), text, done: false });
      save();
      render();
      $("new-task").focus();
    };

    $("panel").querySelectorAll('input[type="checkbox"]').forEach((box) => {
      box.onchange = () => {
        const wasAllDone = isAllDone(selected);
        listFor(selected).find((task) => task.id === box.dataset.id).done = box.checked;
        save();
        render();
        if (!wasAllDone && isAllDone(selected)) burstConfetti(window.innerWidth / 2, window.innerHeight / 3, 120);
      };
    });

    $("panel").querySelectorAll("[data-act]").forEach((button) => {
      button.onclick = () => handleAction(button.dataset.act, button.dataset.id);
    });

    if (editingId) {
      const input = $("edit-input");
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
      input.onkeydown = (event) => {
        if (event.key === "Enter") handleAction("save", editingId);
        if (event.key === "Escape") handleAction("cancel", editingId);
      };
    }

    const clear = $("clear-done");
    if (clear) {
      clear.onclick = () => {
        if (!confirm("Remove all completed tasks on this day?")) return;
        state.tasks[selected] = listFor(selected).filter((task) => !task.done);
        save();
        render();
      };
    }
  }

  function handleAction(action, id) {
    const list = listFor(selected);
    if (action === "edit") {
      editingId = id;
    } else if (action === "cancel") {
      editingId = null;
    } else if (action === "save") {
      const text = $("edit-input").value.trim();
      if (text) list.find((task) => task.id === id).text = text;
      editingId = null;
      save();
    } else if (action === "delete") {
      state.tasks[selected] = list.filter((task) => task.id !== id);
      save();
    }
    render();
  }

  // ---------------------------------------------------------------------
  // Stats and "unfinished from earlier days"
  // ---------------------------------------------------------------------

  function renderStats() {
    const today = todayIso();
    let open = 0;
    let done = 0;
    let overdue = 0;
    Object.entries(state.tasks).forEach(([iso, list]) => {
      list.forEach((task) => {
        if (task.done) done++;
        else { open++; if (iso < today) overdue++; }
      });
    });
    const todays = listFor(today);
    $("stat-today").textContent = `${todays.filter((task) => task.done).length} / ${todays.length}`;
    $("stat-open").textContent = open;
    $("stat-done").textContent = done;
    $("stat-overdue").textContent = overdue;
  }

  function renderOverdue() {
    const today = todayIso();
    const rows = [];
    Object.keys(state.tasks).sort().forEach((iso) => {
      if (iso >= today) return;
      state.tasks[iso].filter((task) => !task.done).forEach((task) => {
        rows.push(`<div class="check-item"><button type="button" class="btn-outline" data-iso="${iso}">${shortLabel(iso)}</button><label><b>${esc(task.text)}</b></label></div>`);
      });
    });
    $("overdue").innerHTML = rows.length
      ? `<div class="box">${rows.join("")}</div>`
      : '<p class="muted-line">Nothing left over. Nice.</p>';
    $("overdue").querySelectorAll("button").forEach((button) => {
      button.onclick = () => { selectDate(button.dataset.iso); window.scrollTo({ top: 0, behavior: "smooth" }); };
    });
  }

  function render() {
    renderMonthNav();
    renderCalendar();
    renderPanel();
    renderStats();
    renderOverdue();
  }

  // Keep in sync when the home page ticks a task in another tab.
  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY) return;
    const fresh = loadState(STORAGE_KEY);
    state.tasks = fresh.tasks || {};
    render();
  });

  render();
})();
