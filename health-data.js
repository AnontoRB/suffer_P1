/**
 * The 60-day Strength, Water and Food plan, from
 * "60-Day Strength, Water and Food Plan: Nov 8, 2026 to Jan 6, 2027".
 * Plan day 1 = Nov 8, day 60 = Jan 6. Odd days are strength/rest days,
 * even days are run days (the run itself is ticked on the Marathon page).
 */
const HEALTH = {
  WARM_UP: "5 min: march in place 1 min, 20 arm circles, 10 leg swings per leg, 5 cat-cows, 5 slow squats, 5 easy incline push-ups.",
  COOL_DOWN: "5 min: hold each stretch 30 seconds: calves, hamstrings, quads, hip flexors, chest.",
  FOOD_TICK: "Protein about 110 to 130 g, plate method, no sugary drinks, fried snacks or late-night eating, and 7 to 8 hours of sleep.",

  RUN_LABELS: { 52: "Run (long, 6.5 km)" },

  /** Daily habits, ticked every day: the morning ones come first on the checklist, the evening ones last. */
  HABITS: {
    morning: [
      { id: "brush-am", label: "Brush your teeth (morning)", detail: "After waking up." },
    ],
    evening: [
      { id: "shower",   label: "Take a shower", detail: "" },
      { id: "brush-pm", label: "Brush your teeth (night)", detail: "Before going to bed." },
    ],
  },

  BLOCKS: [
    { name: "Day 0: Baseline",          dates: "Nov 8",           goal: "Measure your starting point",                                          feel: "Easy",        firstDay: 1,  lastDay: 1 },
    { name: "Block 1: Foundation",      dates: "Nov 10 to Nov 24", goal: "Learn the form, build the habit",                                      feel: "Easy. 2 to 3 sets, stop with 2 reps left", firstDay: 2,  lastDay: 18 },
    { name: "Block 2: Build",           dates: "Nov 26 to Dec 10", goal: "Harder variations (floor push-ups, dips, single-leg work)",           feel: "Moderate",    firstDay: 19, lastDay: 34 },
    { name: "Block 3: Strength",        dates: "Dec 12 to Dec 26", goal: "Most volume and hardest variations",                                   feel: "Challenging", firstDay: 35, lastDay: 50 },
    { name: "Block 4: Peak and Taper",  dates: "Dec 28 to Jan 5",  goal: "Keep strength, protect your legs for the race",                        feel: "Light",       firstDay: 51, lastDay: 60 },
  ],

  EXERCISES: [
    ["Incline push-up", "Hands on a sturdy table. Body in one straight line, elbows about 45 degrees from your body, chest almost touching the table. The lower the hands, the harder it gets."],
    ["Floor push-up", "Same form on the floor. If a rep fails, finish the set on your knees."],
    ["Close-grip and pike push-ups", "Close-grip: hands narrow, elbows tight. Pike: hips high, lower your head between your hands."],
    ["Squat", "Feet shoulder-width. Sit back and down, chest up, heels flat, knees follow your toes. Tempo squat: 3 seconds down, 1 second pause. Backpack squat: hold a loaded backpack at your chest."],
    ["Reverse lunge, split squat, step-up", "Reverse lunge: step back, back knee near floor. Split squat: stay in the lunge position and go up and down. Step-up: drive through the front heel on a sturdy chair. Bulgarian split squat: rear foot on a chair."],
    ["Chair dip", "Hands on the edge of a sturdy chair (against a wall), knees bent. Lower until your upper arms are about parallel to the floor."],
    ["Inverted row", "Lie under a very sturdy table and pull your chest up to its edge. Bent knees is easier, straight legs is harder, feet on a chair is hardest. No sturdy table? Do backpack rows: hinge forward and row a loaded backpack, 3 × 10 to 12."],
    ["Glute bridge", "Feet close to your hips, squeeze at the top and hold 1 to 2 seconds. Single-leg version once the two-leg bridge is easy."],
    ["Dead hang, scapular pull, negative", "Hang from a bar (shoulders away from ears). Scapular pull: pull your shoulder blades down without bending your arms. Negative: jump or step up to the top, then lower slowly for 5 seconds. No bar? Skip these and add one extra set of rows."],
    ["Plank, side plank", "Forearms down, squeeze glutes, ribs down. Stop when your hips sag."],
    ["Sit-up, leg raise, hollow hold", "Sit-up: arms crossed, don't pull your neck. Leg raise: press lower back into the floor, bend knees if needed. Hollow hold: lower back pressed down, arms and legs reaching away."],
    ["Dead bug, bird dog, superman", "Dead bug: lower opposite arm and leg slowly, back flat. Bird dog: reach opposite arm and leg, hips level. Superman: lie face down and lift chest and legs briefly."],
    ["Calf raise", "2 seconds up, 2 seconds down on a step edge. Helps your running. Later, one leg at a time."],
  ],

  /** Strength-side sessions. kind: strength | test | mobility | rest. test: "full" or "mini". */
  SESSIONS: [
    // Block 1: Foundation
    { day: 3,  date: "Nov 10", code: "A1", kind: "strength", workout: "Incline push-ups 3×6; squats 3×12; plank 3×20 s; sit-ups 3×10; calf raises 3×12" },
    { day: 5,  date: "Nov 12", code: "B1", kind: "strength", workout: "Bent-knee rows 3×6; glute bridges 3×12; reverse lunges 2×6/leg; dead bug 3×6/side; bird dog 2×8/side; dead hang 3×10 s" },
    { day: 7,  date: "Nov 14", code: "A2", kind: "strength", workout: "Incline push-ups 3×8; squats 3×14; plank 3×25 s; sit-ups 3×12; calf raises 3×15" },
    { day: 9,  date: "Nov 16", code: "B2", kind: "strength", workout: "Bent-knee rows 3×7; bridges 3×15; reverse lunges 3×6/leg; dead bug 3×8/side; side plank 2×15 s/side; hang 3×15 s" },
    { day: 11, date: "Nov 18", code: "A3", kind: "strength", workout: "Incline push-ups 3×10; squats 3×16; plank 3×30 s; sit-ups 3×15; calf raises 3×15" },
    { day: 13, date: "Nov 20", code: "B3", kind: "strength", workout: "Bent-knee rows 3×8; bridges with 2 s pause 3×15; reverse lunges 3×8/leg; dead bug 3×10/side; side plank 2×20 s/side; hang 3×20 s" },
    { day: 15, date: "Nov 22", code: "A4", kind: "strength", workout: "Incline push-ups 3×12; squats 3×18; plank 3×35 s; sit-ups 3×15; calf raises 3×18" },
    { day: 17, date: "Nov 24", code: "B4 + Test 1", kind: "strength", test: "full", workout: "Test first (see below). Then bent-knee rows 3×8 and bridges 3×15" },
    // Block 2: Build
    { day: 19, date: "Nov 26", code: "A5", kind: "strength", workout: "Low-incline push-ups (hands on a chair seat) 3×8; tempo squats 3×12; chair dips 3×6; plank 3×40 s; sit-ups 3×18; calf raises 3×20" },
    { day: 21, date: "Nov 28", code: "B5", kind: "strength", workout: "Bent-knee rows 3×10; single-leg bridges 3×6/leg; reverse lunges 3×10/leg; scapular pulls 3×6; dead bug 3×10/side; side plank 3×25 s/side; superman 3×10" },
    { day: 23, date: "Nov 30", code: "A6", kind: "strength", workout: "Low-incline push-ups 3×10; tempo squats 3×14; dips 3×8; plank 3×45 s; sit-ups 3×20; calf raises 3×20" },
    { day: 25, date: "Dec 2",  code: "B6", kind: "strength", workout: "Straight-leg rows 3×6; single-leg bridges 3×8/leg; step-ups 3×8/leg; dead hang 3×30 s; bird dog 3×10/side; side plank 3×30 s/side" },
    { day: 27, date: "Dec 4",  code: "A7", kind: "strength", workout: "Floor push-ups 4×5 (finish each set on knees); tempo squats 3×15; dips 3×10; plank 3×50 s; leg raises 3×10; single-leg calf raises 3×8/leg" },
    { day: 29, date: "Dec 6",  code: "B7", kind: "strength", workout: "Straight-leg rows 3×8; single-leg bridges 3×10/leg; step-ups 3×10/leg; dead hang 3×35 s; negatives 3×2 (5 s); dead bug 3×12/side; side plank 3×35 s/side" },
    { day: 31, date: "Dec 8",  code: "A8", kind: "strength", workout: "Floor push-ups 4×6; split squats 3×8/leg; dips 3×12; plank 3×60 s; sit-ups 3×22; leg raises 3×10; single-leg calf raises 3×10/leg" },
    { day: 33, date: "Dec 10", code: "B8 + Test 2", kind: "strength", test: "full", workout: "Test first. Then straight-leg rows 3×10; single-leg bridges 3×10/leg; negatives 3×3" },
    // Block 3: Strength
    { day: 35, date: "Dec 12", code: "A9", kind: "strength", workout: "Floor push-ups 4×8; backpack squats (5 to 8 kg) 4×12; dips 3×12; plank 3×60 s; hollow hold 3×15 s; leg raises 3×12; single-leg calf raises 3×12/leg" },
    { day: 37, date: "Dec 14", code: "B9", kind: "strength", workout: "Straight-leg rows 4×8; single-leg bridges 3×12/leg; step-ups 3×12/leg; dead hang 3×45 s; negatives 3×4; dead bug 3×12/side; side plank 3×40 s/side" },
    { day: 39, date: "Dec 16", code: "A10", kind: "strength", workout: "Floor push-ups 4×10; pike push-ups 3×6; backpack squats 4×14; dips 3×14; plank shoulder taps 3×20; sit-ups 3×25; calf raises 3×14/leg" },
    { day: 41, date: "Dec 18", code: "B10", kind: "strength", workout: "Straight-leg rows 4×10 (or feet on chair 3×6); single-leg bridges 3×15/leg; backpack step-ups 3×10/leg; negatives 3×5 (6 s); scapular pulls 3×8; bird dog 3×12/side; side plank 3×45 s/side" },
    { day: 43, date: "Dec 20", code: "A11", kind: "strength", workout: "Floor push-ups 5×10; close-grip push-ups 3×6; Bulgarian split squats 3×8/leg; pike push-ups 3×8; hollow hold 3×20 s; leg raises 3×15; calf raises 3×15/leg" },
    { day: 45, date: "Dec 22", code: "B11", kind: "strength", workout: "Feet-elevated rows 3×8; single-leg bridges 4×12/leg; backpack step-ups 3×12/leg; negatives 4×4 (6 s); one max dead hang; dead bug 3×12/side; side plank 3×50 s/side" },
    { day: 47, date: "Dec 24", code: "A12", kind: "strength", workout: "Floor push-ups 5×12; close-grip push-ups 3×8; Bulgarian split squats 3×10/leg; pike push-ups 3×10; plank 3×75 s; hollow hold 3×25 s; calf raises 3×15/leg. Tomorrow is a 5 km run, so cut one set from the leg work if you are tired" },
    { day: 49, date: "Dec 26", code: "B12 + Test 3", kind: "strength", test: "full", workout: "Test first. Then feet-elevated rows 3×10; negatives 3×5; single-leg bridges 3×12/leg" },
    // Block 4: Peak and Taper
    { day: 51, date: "Dec 28", code: "A13 (light)", kind: "strength", workout: "Floor push-ups 3×10; squats 2×15 (easy); plank 3×45 s; sit-ups 3×20; calf raises 2×15. Tomorrow is your 6.5 km long run, so stop with plenty left" },
    { day: 53, date: "Dec 30", code: "Mobility only", kind: "mobility", workout: "20 minutes of easy stretching: calves, hamstrings, hips, chest, upper back. No strength work" },
    { day: 55, date: "Jan 1",  code: "B13 (light)", kind: "strength", workout: "Rows 3×8; two-leg bridges 3×12; dead bug 3×8/side; side plank 2×30 s/side. No lunges or step-ups" },
    { day: 57, date: "Jan 3",  code: "Mini test", kind: "test", test: "mini", workout: "Push-ups max, plank max, dead hang max (if bar). Then 10 minutes of mobility. No leg work" },
    { day: 59, date: "Jan 5",  code: "Full rest", kind: "rest", workout: "Nothing hard. Walk lightly if you like, drink water, eat well, sleep early" },
  ],

  TEST_DATES: ["Baseline (Nov 8)", "Nov 24", "Dec 10", "Dec 26", "Jan 3"],
  /** Targets per test date (same order as TEST_DATES). "" = no target. */
  TESTS: [
    { name: "Push-ups, max in one set", targets: ["8 (start)", "10 to 12", "15", "20", "22+"] },
    { name: "Squats, max in one set",   targets: ["30 (start)", "40", "50", "65", "no test"] },
    { name: "Sit-ups, max in one set",  targets: ["30 (start)", "40", "50", "65", "no test"] },
    { name: "Plank hold",               targets: ["test today", "45 s", "60 s", "90 s", "2 min"] },
    { name: "Dead hang (if you have a bar)", targets: ["test today", "15 s", "25 s", "35 s", "40 s"] },
  ],

  MEASURE_ROWS: ["Nov 8", "Dec 10", "Jan 7"],
  MEASURE_COLS: [
    ["weight", "Weight (kg)"], ["waist", "Waist (at belly button)"], ["chest", "Chest"],
    ["arm", "Upper arm"], ["thigh", "Thigh"],
  ],

  SAMPLE_DAY: [
    ["Breakfast", "Oats with milk and a banana, plus 2 eggs"],
    ["Lunch", "Rice, dal, chicken or fish, a large portion of vegetables"],
    ["Snack", "Yogurt or a handful of nuts, and a fruit"],
    ["Dinner", "Roti or rice, a protein, vegetables"],
  ],
};
