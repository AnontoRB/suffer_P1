/**
 * The 60-day speedcubing plan, from
 * "Speedcubing in 60 Days: Nov 8, 2026 to Jan 6, 2027".
 * Plan day 1 = Nov 8 (a Sunday), day 60 = Jan 6.
 *
 * SCHEDULE is built from the tables below (one entry per day) and
 * tasksFor(day) turns an entry into the checklist used by the Cubing page
 * and by the home page.
 */
const CUBING = {
  WARM_UP: "10 easy solves at 60% speed, or 3 minutes of triggers.",
  REVIEW: "Write the result of the day in the log and one thing to fix tomorrow.",

  BLOCKS: [
    { name: "1. Foundation", dates: "Nov 8 to Nov 22", firstDay: 1,  lastDay: 15, goal: "Smooth turning, full cross planning, solid 2-look OLL and PLL", feel: "Easy to moderate. Slow is fine.", sub: "Drill 20 / Algs 15 / Timed 15" },
    { name: "2. Build",      dates: "Nov 23 to Dec 6", firstDay: 16, lastDay: 29, goal: "Plan cross + pair 1, learn 14 OLL and 4 PLL, cut pauses", feel: "Moderate. Deload in the last week.", sub: "Drill 15 / Algs 15 / Timed 20. Deload week: Nov 29 to Dec 5" },
    { name: "3. Strength",   dates: "Dec 7 to Dec 20", firstDay: 30, lastDay: 43, goal: "Learn all 21 PLL, 10 more OLL, scout pair 2 in inspection", feel: "Challenging. The heaviest learning load.", sub: "Drill 15 / Algs 15 / Timed 20" },
    { name: "4. Peak",       dates: "Dec 21 to Jan 6", firstDay: 44, lastDay: 60, goal: "No new algorithms. Polish weak algorithms, race-pace solves, final test", feel: "Hard but focused, then a light finish.", sub: "Drill 10 / Algs 10 / Timed 30. Deload week: Dec 27 to Jan 2" },
  ],

  SECTIONS: [
    { title: "What this plan assumes",
      intro: "This plan fits one hour of cubing into every day from Nov 8, 2026 to Jan 6, 2027 (60 days, about 60 hours). It starts from where you are now (a solve around 30 seconds, an average around 25 seconds) and gets harder in four blocks. It uses progressive overload: each block asks for more solves, more planning, more speed and more algorithms than the one before, and every few weeks there is a lighter week so your hands and head can recover.",
      table: { head: ["Assumption", "Why it matters"], rows: [
        ["You solve with CFOP (cross, F2L, OLL, PLL).", "If you use layer-by-layer, Roux or ZZ, the plan needs rebuilding. The drills are CFOP-specific."],
        ["Your average of 12 (ao12) is about 26 s today.", "All targets are given for 26 s and also as a percentage of your own baseline. If yours is different, use the percentages."],
        ["You know some of the 16 algorithms for 2-look OLL and PLL.", "Phase 1 checks them and makes them solid. If you already know more, skip ahead in the algorithm list."],
        ["You have exactly 1 hour a day and keep the days fixed.", "The hour is split into blocks, so no day needs a long session. Pick the same time each day."],
      ] } },

    { title: "How much will you improve? (honest version)",
      intro: "With 60 hours of focused practice, a realistic result is an average of about 18.5 to 20.5 seconds by Jan 3, down from about 26. That is a 20 to 30% drop. It is a big improvement, but it is not a promise: gains come quickly in the first 3 to 4 weeks (cutting pauses, better lookahead) and then slow down, and results vary a lot from person to person.",
      table: { head: ["Outcome", "ao12 on Jan 3", "Typical best single", "What it takes"], rows: [
        ["Conservative", "21 to 23 s", "15 to 17 s", "You miss about a quarter of the days, or skip the planning drills."],
        ["Realistic", "18.5 to 20.5 s", "13 to 15 s", "You follow the plan on at least 85% of days and learn the algorithms on schedule."],
        ["Stretch", "16 to 18 s", "11 to 13 s", "Near-perfect attendance, a well-tuned cube, and good natural lookahead."],
      ] },
      outro: "Going from 25 s to a sub-15 average in 60 days is not realistic with one hour a day, so the plan does not aim at it. What it does aim at is a clear, solid sub-20 average, with sub-18 as a real stretch goal." },

    { title: "What the numbers mean: time = moves / TPS",
      intro: "A solve time is just the number of moves divided by how many turns you make per second (TPS). At your level, most of the lost time is pauses (the cube is not being turned), not slow fingers. That is why the early phases focus on planning and smooth turning before pure speed. These are rough reference figures:",
      table: { head: ["Average", "Typical moves", "Typical TPS", "Main thing holding you back"], rows: [
        ["About 25 s", "70 to 78", "2.8 to 3.2", "Pauses between steps, slow recognition"],
        ["About 20 s", "66 to 72", "3.3 to 3.6", "Slow F2L pairs, two-look last layer"],
        ["About 17 s", "62 to 68", "3.7 to 4.0", "F2L lookahead, full OLL and PLL knowledge"],
        ["About 15 s", "58 to 64", "4.0 to 4.4", "Fast fingertricks, planning cross + 2 pairs"],
      ] } },

    { title: "How progressive overload works here",
      intro: "Each phase raises these levers. You move up only when the Sunday test says you are ready.",
      table: { head: ["Lever", "1. Foundation", "2. Build", "3. Strength", "4. Peak"], rows: [
        ["Daily split (drill / algs / timed)", "20 / 15 / 15 min", "15 / 15 / 20 min", "15 / 15 / 20 min", "10 / 10 / 30 min"],
        ["Timed solves per day", "about 15", "about 20", "about 20", "about 30"],
        ["Saturday volume", "2 x ao12", "2 x ao12", "3 x ao12", "3 x ao12"],
        ["Inspection plan (15 s)", "Whole cross", "Cross + start pair 1", "Cross + pair 1 + scout pair 2", "Cross + pair 1 + pair 2 location"],
        ["Cross length", "9 moves or fewer", "8 or fewer", "8 or fewer", "7 to 8"],
        ["Cross + F2L split", "14 s", "13 s", "12 s", "11.5 s"],
        ["OLL + PLL split", "10 s", "9.5 s", "8.5 s", "8 s"],
        ["Target TPS in solves", "3.2", "3.6", "4.0", "4.3"],
        ["Trigger test (R U R' U' x25)", "under 30 s", "under 26 s", "under 23 s", "under 21 s"],
        ["Algorithms known (end of phase)", "16 (two-look)", "24 OLL, 10 PLL", "34 OLL, 21 PLL", "No new ones, polish"],
      ] },
      list: [
        "<b>Raise the load</b> (the next target in the table) only after you hit the Sunday target two weeks in a row.",
        "If you miss the target by more than 1 s two Sundays in a row, repeat last week's loads. Do not add more.",
        "<b>Deload weeks</b> are Nov 29 to Dec 5 and Dec 27 to Jan 2. Reps and solves drop by 30%, and the session is about 45 minutes.",
        "Never raise speed and change technique in the same drill. Control first, speed second.",
        "New algorithms are reviewed 1, 3, 7 and 14 days after you learn them (spaced repetition).",
      ] },

    { title: "The four blocks", special: "blocks" },

    { title: "Day 0 (today, Nov 8): setup and baseline",
      list: [
        "Use csTimer (csTimer.net, free) or any timer with scrambles. Set inspection to 15 seconds and turn on 3-phase timing (cross + F2L, OLL, PLL).",
        "Check your cube: clean it, add lube if it is dry, and set a tension you can control. A cube that pops costs more time than any drill saves.",
        "Warm up for 5 minutes, then do 2 x ao12. Write down the average, best, worst and splits. This is your baseline.",
        "Audit the algorithm sheet (below) and tick the ones you know cold.",
        "Optional: record 3 solves on your phone to see your pauses. You will repeat this on Sundays.",
      ] },

    { title: "Session structure (60 minutes)",
      table: { head: ["Block", "Foundation", "Build", "Strength", "Peak"], rows: [
        ["1. Warm-up", "5 min", "5 min", "5 min", "5 min"],
        ["2. Skill drill (changes by weekday)", "20 min", "15 min", "15 min", "10 min"],
        ["3. Algorithm block", "15 min", "15 min", "15 min", "10 min"],
        ["4. Timed solves", "15 min", "20 min", "20 min", "30 min"],
        ["5. Review and notes", "5 min", "5 min", "5 min", "5 min"],
      ] },
      outro: "<b>Warm-up:</b> 10 easy solves at 60% speed, or 3 minutes of triggers. <b>Review:</b> write the result of the day in the log and one thing to fix tomorrow. Sundays and Saturdays use a different shape (benchmark and volume), described in the schedule." },

    { title: "Rules",
      list: [
        "Record every solve. Delete a solve only for a real accident (pop or lockup), not for a bad time.",
        "Always use the 15-second inspection, even in warm-ups. Skipping it undoes the planning drills.",
        "Slow and smooth first. Your times will fall as the pauses disappear, not because you force speed.",
        "Never skip the algorithm block. Ten minutes every day beats one hour once a week.",
        "If you pop pieces more than twice in a session, loosen the cube and slow down for the rest of it.",
        "Wrist or finger pain (not just tired hands) means stop for the day. Shake out your hands every 15 minutes.",
        "If you fall behind a day, do not double up. Just do today's session.",
      ] },

    { title: "Weekly rhythm",
      table: { head: ["Day", "Session", "Focus"], rows: [
        ["Monday", "Cross + pair", "Inspection planning, cross length, first pair"],
        ["Tuesday", "F2L splits", "Pair efficiency, lookahead through F2L"],
        ["Wednesday", "Last layer", "OLL and PLL speed, no pause between them"],
        ["Thursday", "Triggers + TPS", "Fingertricks and turning speed"],
        ["Friday", "Slow solves", "Smooth, continuous solving, eyes ahead of hands"],
        ["Saturday", "Volume", "2 to 3 x ao12 as the main set"],
        ["Sunday", "Benchmark", "2 x ao12, review the slowest solves. Checkpoint every 2 weeks."],
      ] } },

    { title: "Drill guide",
      table: { head: ["Drill", "How to do it"], rows: [
        ["Slow solve", "Solve at 60 to 70% of normal speed. No pause longer than half a second. Eyes stay ahead of the hands."],
        ["Cross planning", "Inspect for 15 s and plan the cross (later also pair 1 and pair 2). Execute without looking for the next piece. Count the moves."],
        ["Cross + pair", "Do the cross and first pair only, stop the timer, then reset. This builds the fast start that everything depends on."],
        ["F2L split solve", "Full solve with the 3-phase timer. After each one, find the slowest pair. Redo that case three times."],
        ["Last-layer drill", "Use csTimer's last-layer scrambles (3x3 subsets, LL) so you only train OLL and PLL. Record both splits."],
        ["Trigger drill", "R U R' U' (the sexy move), R' F R F' (sledgehammer) and L' U' L U, 25 repeats each. Use a stopwatch for the test."],
        ["Recognition cards", "Look at a top-view picture of the last layer and name the case in under 1 second. Do it on paper or a phone app."],
        ["Pressure solves", "In Peak, the last 10 solves of the timed block count as an ao10. You need to beat your target or repeat the block."],
        ["Weak list", "On Dec 21 you rank every algorithm by time and keep the 8 slowest. These get the most reps until the final test."],
      ] } },

    { title: "Algorithm sheet",
      intro: "Notation: R, L, U, D, F, B are face turns. A prime (') means counter-clockwise and 2 means a half turn. Lowercase r and f are wide turns (two layers). M is the middle slice. x and x' rotate the whole cube. For the exact hold orientation of each case, check the picture on the J Perm or SpeedSolving wiki page. This sheet lists the 16 two-look algorithms plus T, Ja, Jb and Y.",
      table: { head: ["Step", "Case", "Algorithm"], rows: [
        ["2-look OLL, edges", "Line", "F R U R' U' F'"],
        ["2-look OLL, edges", "Hook (L shape)", "f R U R' U' f'"],
        ["2-look OLL, edges", "Dot", "F R U R' U' F' f R U R' U' f'"],
        ["2-look OLL, corners", "Sune", "R U R' U R U2 R'"],
        ["2-look OLL, corners", "Antisune", "R U2 R' U' R U' R'"],
        ["2-look OLL, corners", "H (double Sune)", "R U R' U R U' R' U R U2 R'"],
        ["2-look OLL, corners", "Pi", "R U2 R2 U' R2 U' R2 U2 R"],
        ["2-look OLL, corners", "U", "R2 D R' U2 R D' R' U2 R'"],
        ["2-look OLL, corners", "T", "r U R' U' r' F R F'"],
        ["2-look OLL, corners", "L", "F R' F' r U R U' r'"],
        ["2-look PLL, corners", "Aa", "x R' U R' D2 R U' R' D2 R2"],
        ["2-look PLL, corners", "E", "x' R U' R' D R U R' D' R U R' D R U' R' D'"],
        ["2-look PLL, edges", "Ua", "R U' R U R U R U' R' U' R2"],
        ["2-look PLL, edges", "Ub", "R2 U R U R' U' R' U' R' U R'"],
        ["2-look PLL, edges", "H", "M2 U M2 U2 M2 U M2"],
        ["2-look PLL, edges", "Z", "M' U M2 U M2 U M' U2 M2"],
        ["Build phase PLL", "T", "R U R' U' R' F R2 U' R' U' R U R' F'"],
        ["Build phase PLL", "Ja", "R' U L' U2 R U' R' U2 R L"],
        ["Build phase PLL", "Jb", "R U R' F' R U R' U' R' F R2 U' R'"],
        ["Build phase PLL", "Y", "F R U' R' U' R U R' F' R U R' U' R' F R F'"],
      ] },
      outro: "Other PLLs learned in Strength (Ab, V, Ra, Rb, Na, Nb, F, Ga, Gb, Gc, Gd) and the OLL groups (square shapes, small lightning bolts, fish shapes, P shapes, T shapes, C shapes, W shapes, knight move shapes) come from the same sites: pick one algorithm per case, and choose the ones that feel comfortable on your fingers. If an algorithm feels awkward after 2 days, swap it for a different one for that case." },

    { title: "Day-by-day schedule", special: "schedule" },

    { title: "Checkpoint tests",
      intro: "On checkpoint Sundays, do the ao25 first, then the review. Use the same lighting, the same cube and the same time of day. Write the result in the table. The targets below assume a 26 s baseline.",
      special: "checkpoints" },

    { title: "Weekly Sunday targets",
      intro: "If your baseline is not 26 s, multiply your own baseline by these percentages: 97%, 94%, 91%, 88%, 84%, 80%, 78%, 75%.",
      special: "sundays" },

    { title: "Body and hand care",
      list: [
        "Warm your hands before the first solve and shake them out every 15 minutes.",
        "Keep your shoulders relaxed. A tense grip makes pauses and slows your turns.",
        "Stretch your wrists and fingers for 2 minutes after each session.",
        "Sleep 7 to 8 hours. Algorithms and finger patterns are consolidated during sleep.",
        "Cube at a time when your hands are not already tired from other training.",
      ] },

    { title: "If you fall behind",
      list: [
        "Do not double up. Skip the review block first, then the timed solves, but never skip the algorithm block.",
        "If a new algorithm will not stick after 3 days, switch to a different algorithm for that case.",
        "If your times stall for 2 weeks, check the splits. The slowest split is where to spend the next week of drills.",
        "If you hit a plateau, add a Slow solves session on the day with the weakest result.",
      ] },

    { title: "After Jan 6",
      intro: "On Jan 7, do 1 x ao50 for a clean final number and compare it with Nov 8. Take 2 or 3 easy days, then pick the next goal: the remaining OLL cases, deeper F2L lookahead, or a sub-17 average as your next target." },

    { title: "Daily log", special: "log",
      intro: "Open any date in the calendar to write the number of solves, your best ao12 of the day, the minutes you did and one note. This table shows everything you have logged." },
  ],

  CHECKPOINTS: [
    ["Nov 8 (baseline)", "26.0 s", "-", "-", "-"],
    ["Nov 22 (checkpoint 1)", "24.4 s", "14 s", "10 s", "3.2"],
    ["Dec 6 (checkpoint 2)", "22.9 s", "13 s", "9.5 s", "3.6"],
    ["Dec 20 (checkpoint 3)", "20.8 s", "12 s", "8.5 s", "4.0"],
    ["Jan 3 (final test)", "19.5 s", "11.5 s", "8 s", "4.3"],
  ],

  SUNDAYS: [
    ["Nov 15", "97%", "25.2 s"], ["Nov 22", "94%", "24.4 s"], ["Nov 29", "91%", "23.7 s"], ["Dec 6", "88%", "22.9 s"],
    ["Dec 13", "84%", "21.8 s"], ["Dec 20", "80%", "20.8 s"], ["Dec 27", "78%", "20.3 s"], ["Jan 3", "75%", "19.5 s"],
  ],

  // Algorithm block text for each plan day (index 0 = day 1 = Nov 8).
  ALGS: [
    "Audit: mark which of the 16 two-look algorithms (see the algorithm sheet on the Cubing page) you know cold.",
    "OLL edges: line, hook, dot.", "OLL corners: Sune, Antisune.", "OLL corners: U, T.", "OLL corners: L, Pi.",
    "OLL corners: H. Review all 10 OLL algorithms.", "PLL edges: Ua, Ub.",
    "Review everything learned so far, 3 reps each.",
    "PLL edges: H, Z.", "PLL corners: Aa, E.", "Review all 16 slowly, then recognition cards.",
    "Speed pass: each OLL algorithm 3 reps, aim under 3 s.", "Speed pass: each PLL algorithm 3 reps, aim under 3 s.",
    "Mixed LL: 20 random OLL + PLL cases.", "Alg audit: time each of the 16 algorithms 3 times.",
    "New OLL: square shapes (2 cases).", "New OLL: small lightning bolts 1 and 2.", "New OLL: small lightning bolts 3 and 4.",
    "New OLL: fish shapes 1 and 2.", "New OLL: fish shapes 3 and 4.", "Review the 10 new OLL cases, 3 reps each.",
    "Review only (deload week).",
    "New OLL: P shapes 1 and 2.", "New OLL: P shapes 3 and 4.", "Review all 14 new OLL cases + recognition cards.",
    "New PLL: T-perm.", "New PLL: Ja and Jb.", "New PLL: Y-perm. Review T, Ja, Jb.", "Alg audit: time every algorithm known so far.",
    "New PLL: Ab and V.", "New PLL: Ra and Rb.", "New PLL: Na and Nb.", "New PLL: F.", "New PLL: Ga and Gb.", "New PLL: Gc and Gd.",
    "Review all 21 PLL algorithms slowly, 1 rep each.",
    "New OLL: T shapes and C shapes (4 cases).", "New OLL: W shapes (2 cases). Review yesterday.",
    "New OLL: knight move shapes 1 and 2.", "New OLL: knight move shapes 3 and 4.",
    "Review the 10 OLL cases from Dec 14 to 17.", "Recognition cards for all 34 OLL cases.",
    "Alg audit: time every algorithm (34 OLL, 21 PLL).",
    "Rank all algorithms by time. List the 8 slowest (weak list).", "Weak list, first 4 algorithms, 10 reps each.",
    "Weak list, last 4 algorithms, 10 reps each.", "Recognition cards: all OLL, under 1 s each.",
    "Recognition cards: all PLL, under 1 s each.", "Mixed LL: 30 random cases.",
    "Weak list review (deload week).", "Weak list round 2, 5 reps each.", "Mixed LL: 30 random cases, note the split times.",
    "Recognition: practice spotting PLL skips and AUF early.", "Speed pass: every algorithm 3 reps at max speed.",
    "Light review: each PLL once.", "Weak list, light: 3 reps each.", "Alg audit: time every algorithm, update the weak list.",
    "Light review: weak list once.",
    "No algorithm work today. Rest your hands, sleep early.", "No algorithm work today. Rest, then the next-steps list.",
  ],

  // Drill numbers per block (key "2d" and "4d" are the deload weeks).
  PARAMS: {
    1:    { min: 20, alg: 15, solves: 15, note: "Inspect 15 s, plan the cross.",
            cross: [15, "plan the whole cross", "9 moves or fewer", "10 s"], f2l: [10, "14 s"], ll: [20, "10 s"], trig: [3, "30 s"], slow: 8 },
    2:    { min: 15, alg: 15, solves: 20, note: "Plan cross, start pair 1.",
            cross: [20, "plan the whole cross and start looking for pair 1 during it", "8 moves or fewer", "9 s"], f2l: [12, "13 s"], ll: [25, "9.5 s"], trig: [4, "26 s"], slow: 10 },
    "2d": { min: 10, alg: 10, solves: 14, note: "Plan cross, start pair 1.",
            cross: [14, "plan the whole cross and start looking for pair 1 during it", "8 moves or fewer", "9 s"], f2l: [8, "13 s"], ll: [18, "9.5 s"], trig: [3, "26 s"], slow: 7 },
    3:    { min: 15, alg: 15, solves: 20, note: "Plan cross + pair 1, scout pair 2. Log splits.",
            cross: [25, "plan cross and pair 1 before you start", "8 moves or fewer", "8 s"], f2l: [15, "12 s"], ll: [30, "8.5 s"], trig: [5, "23 s"], slow: 10 },
    4:    { min: 10, alg: 10, solves: 30, note: "Last 10 at race pace (counts as an ao10).",
            cross: [30, "plan cross, pair 1 and the location of pair 2", "7 to 8 moves", "7.5 s"], f2l: [18, "11.5 s"], ll: [35, "8 s"], trig: [5, "21 s"], slow: 10 },
    "4d": { min: 7, alg: 7, solves: 21, note: "Last 10 at race pace (counts as an ao10).",
            cross: [21, "plan cross, pair 1 and the location of pair 2", "7 to 8 moves", "7.5 s"], f2l: [13, "11.5 s"], ll: [24, "8 s"], trig: [4, "21 s"], slow: 7 },
  },

  /** Volume days: plan day -> number of ao12 sets. */
  VOLUME: { 7: 2, 14: 2, 21: 2, 28: 1, 35: 3, 42: 3, 49: 3, 56: 2 },
  /** Benchmark (ao12) and checkpoint (ao25) Sundays: plan day -> target text. */
  TARGETS: {
    8: "ao12 target: under 25.2 s", 15: "ao25 target: under 24.7 s", 22: "ao12 target: under 23.7 s", 29: "ao25 target: under 23.2 s",
    36: "ao12 target: under 21.8 s", 43: "ao25 target: under 21.1 s", 50: "ao12 target: under 20.3 s", 57: "ao25 target: under 19.8 s",
  },
};

(() => {
  "use strict";

  const DRILLS = ["Benchmark", "Cross + pair", "F2L splits", "Last layer", "Triggers + TPS", "Slow solves", "Volume"]; // by weekday, Sunday first
  const isDeload = (day) => (day >= 22 && day <= 28) || (day >= 50 && day <= 56) || day === 58;
  const blockNumber = (day) => (day <= 15 ? 1 : day <= 29 ? 2 : day <= 43 ? 3 : 4);
  const SOLVES_PER_SET = { 1: [12, 13], 2: [24, 26], 3: [36, 39] };

  function drillText(kind, p, deload, day) {
    const dl = deload ? " (deload)" : "";
    const [crossN, plan, moves, crossT] = p.cross;
    switch (kind) {
      case "Cross + pair":
        return `${p.min} min${dl}: ${crossN} scrambles. Inspect 15 s, ${plan}, execute, stop after pair 1. Target: cross in ${moves}, cross + pair 1 under ${crossT}.`;
      case "F2L splits":
        return `${p.min} min${dl}: ${p.f2l[0]} full solves with the 3-phase timer. Review each solve. Target cross + F2L split under ${p.f2l[1]}. Redo the slowest pair case 3 times.`;
      case "Last layer":
        return `${p.min} min${dl}: ${p.ll[0]} last-layer-only scrambles (csTimer, 3x3 subsets, LL). Record OLL and PLL splits. Target OLL + PLL under ${p.ll[1]}, no pause between them.`;
      case "Triggers + TPS":
        return `${p.min} min${dl}: ${p.trig[0]} rounds of R U R' U' x25, R' F R F' x25, L' U' L U x25, 30 s rest between rounds. Test: R U R' U' x25 under ${p.trig[1]}.`;
      case "Slow solves":
        return `${p.min} min${dl}: ${p.slow} slow solves at 60 to 70% speed, no pause over 0.5 s. In F2L, name the next pair out loud before you finish the current one.`;
      case "Volume":
        return `Volume day${dl}: no separate drill block. Run ${CUBING.VOLUME[day]} x ao12 as the main set, same planning rule as the phase.`;
      case "Benchmark":
        return `Benchmark${dl} (28 min): 2 x ao12 with splits. Then review the 3 slowest solves (10 min) and mark every pause over 1 s.`;
      default:
        return `Checkpoint (about 40 min): 1 x ao25, record splits and move counts, then review the 5 slowest solves and mark every pause over 1 s.`;
    }
  }

  CUBING.SCHEDULE = Array.from({ length: 60 }, (_, i) => {
    const day = i + 1;
    const alg = CUBING.ALGS[i];
    if (day === 1) {
      return { day, kind: "baseline", session: "Baseline", block: 1,
        drill: "Setup and baseline (40 min): set csTimer (inspection 15 s, 3 phases), check cube tension, then 2 x ao12. Write the averages, best, worst and splits.",
        alg, algMin: 15, timed: "Baseline ao12 = ______" };
    }
    if (day === 59) {
      return { day, kind: "light", session: "Light day", block: 4,
        drill: "30 min total: warm-up 5, 5 slow solves, 10 normal solves, 5 min notes. Hands off after that.", alg, algMin: 0, timed: "" };
    }
    if (day === 60) {
      return { day, kind: "race", session: "Race day", block: 4,
        drill: "15 min only, easy solves if you want. No testing, no new drills.", alg, algMin: 0, timed: "" };
    }

    const weekday = i % 7; // day 1 is a Sunday
    const deload = isDeload(day);
    const block = blockNumber(day);
    const params = CUBING.PARAMS[deload && (block === 2 || block === 4) ? `${block}d` : block];
    let session = DRILLS[weekday];
    let kind = "drill";
    if (weekday === 0) {
      kind = CUBING.TARGETS[day].startsWith("ao25") ? "checkpoint" : "benchmark";
      if (kind === "checkpoint") session = "Checkpoint";
    }
    if (weekday === 6) kind = "volume";

    let timed;
    let algMin = params.alg;
    if (kind === "volume") {
      const [solves, minutes] = SOLVES_PER_SET[CUBING.VOLUME[day]];
      timed = `${CUBING.VOLUME[day]} x ao12 (${solves} solves), about ${minutes} min`;
      algMin = 10;
    } else if (kind === "benchmark" || kind === "checkpoint") {
      timed = `${CUBING.TARGETS[day]} (if baseline is 26 s)`;
      algMin = kind === "benchmark" ? 12 : 10;
    } else {
      timed = `${params.solves} min: about ${params.solves} solves. ${params.note}`;
    }
    const drill = drillText(session, params, deload, day);
    return { day, kind, session, block, deload, drill, alg, algMin, timed, drillMin: params.min };
  });

  /** Checklist for one plan day: { heading, items: [{ id, label, detail, optional? }] } (null if none). */
  CUBING.tasksFor = (day) => {
    const e = CUBING.SCHEDULE[day - 1];
    if (!e) return null;

    if (e.kind === "baseline") {
      return { heading: e.session, items: [
        { id: "setup", label: "Setup and baseline (40 min)", detail: e.drill.replace(/^Setup and baseline \(40 min\): /, "") },
        { id: "audit", label: "Audit the algorithm sheet", detail: e.alg },
      ] };
    }
    if (e.kind === "light") {
      return { heading: e.session, items: [
        { id: "main", label: "Light session (30 min)", detail: e.drill },
        { id: "rest", label: "Rest your hands and sleep early", detail: e.alg, optional: true },
      ] };
    }
    if (e.kind === "race") {
      return { heading: e.session, items: [
        { id: "rest", label: "No testing, no new drills", detail: e.alg },
        { id: "easy", label: "Easy solves, 15 min (optional)", detail: e.drill, optional: true },
      ] };
    }

    const special = e.kind === "benchmark" || e.kind === "checkpoint";
    const drillLabel = e.kind === "volume" ? "Main set (volume)" : special ? e.session : `${e.session} drill (${e.drillMin} min)`;
    return { heading: e.session, items: [
      { id: "warmup", label: "Warm-up (5 min)", detail: CUBING.WARM_UP },
      { id: "drill", label: drillLabel, detail: e.drill },
      { id: "algs", label: `Algorithm block (${e.algMin} min)`, detail: e.alg },
      { id: "timed", label: special ? "Compare with the target" : "Timed solves", detail: e.timed },
      { id: "review", label: "Review and notes (5 min)", detail: CUBING.REVIEW },
    ] };
  };
})();
