/**
 * All plan data in one file: RUST_DAYS, MARATHON, HEALTH and CUBING.
 * Loaded by the home page and by each plan page.
 */

// ======================================================================
// RUST DATA
// ======================================================================

/**
 * The 60-day Rust plan, from "Rust in 60 Days: Nov 8, 2026 to Jan 6, 2027".
 * Entry N is plan day N (day 1 = Nov 8, day 60 = Jan 6).
 *   title    - topic name
 *   learn    - Part 1 (45 min)
 *   practice - Part 2 (45 min)
 *   build    - Part 3 (30 min)
 * Optional fields:
 *   minutes          - [learn, practice, build] if different from [45, 45, 30]
 *   practiceOptional - true if Part 2 is optional
 */
const RUST_DAYS = [
  // --- Phase 1: Core Language (Nov 8 to Nov 24) ---
  { title: "Setup and Cargo",
    learn: "Setup. Book ch. 1 (install, Hello World, Cargo)",
    practice: "Rustlings: intro. Try cargo new, run, build, check",
    build: "Write cargo cheat sheet in notes" },
  { title: "Guessing game",
    learn: "Book ch. 2 (guessing game)",
    practice: "Rustlings: variables",
    build: "Retype the guessing game without looking" },
  { title: "Variables and data types",
    learn: "Book ch. 3.1 to 3.2 (variables, data types)",
    practice: "Rustlings: variables, primitive_types",
    build: "Temperature converter program" },
  { title: "Functions and control flow",
    learn: "Book ch. 3.3 to 3.5 (functions, control flow)",
    practice: "Rustlings: functions, if",
    build: "Nth Fibonacci number program" },
  { title: "Review: chapters 1 to 3",
    learn: "Review ch. 1 to 3, skim Rust by Example (primitives)",
    practice: "Exercism: Hello World, Leap, Gigasecond",
    build: "Review notes" },
  { title: "Ownership",
    learn: "Book ch. 4.1 (ownership)",
    practice: "Rustlings: move_semantics 1 to 3",
    build: "Write 3 programs that fail to compile, then fix them" },
  { title: "References and borrowing",
    learn: "Book ch. 4.2 (references, borrowing)",
    practice: "Rustlings: rest of move_semantics",
    build: "Break and fix 5 borrow errors" },
  { title: "Slices",
    learn: "Book ch. 4.3 (slices)",
    practice: "Rustlings: strings, primitive_types (slices)",
    build: "First-word and word-count functions" },
  { title: "Structs and methods",
    learn: "Book ch. 5 (structs, methods)",
    practice: "Rustlings: structs",
    build: "Bank account struct with deposit/withdraw methods" },
  { title: "Enums and match",
    learn: "Book ch. 6.1 to 6.2 (enums, match)",
    practice: "Rustlings: enums",
    build: "Model shapes or a traffic light with an enum" },
  { title: "if let and Option",
    learn: "Book ch. 6.3 (if let), Option deep dive",
    practice: "Rustlings: options",
    build: "Exercism: 2 easy problems" },
  { title: "Packages and modules",
    learn: "Book ch. 7 (packages, modules)",
    practice: "Rustlings: modules",
    build: "Split the bank account project into modules" },
  { title: "Vec and String",
    learn: "Book ch. 8.1 to 8.2 (Vec, String)",
    practice: "Rustlings: vecs, strings",
    build: "Stats program: mean, median, mode" },
  { title: "HashMap",
    learn: "Book ch. 8.3 (HashMap)",
    practice: "Rustlings: hashmaps",
    build: "Pig Latin converter" },
  { title: "Panic and Result",
    learn: "Book ch. 9.1 to 9.2 (panic, Result)",
    practice: "Rustlings: error_handling",
    build: "Rewrite earlier programs to return Result" },
  { title: "The ? operator and custom errors",
    learn: "Book ch. 9.3 (the ? operator, custom errors)",
    practice: "Rustlings: more error_handling",
    build: "Add a custom error enum to one program" },
  { title: "Checkpoint 1: Project 1",
    learn: "Checkpoint 1. Review all notes",
    practice: "Finish any unfinished Rustlings",
    build: "Project 1: in-memory CLI to-do list (structs, enums, Vec, HashMap, Result)" },

  // --- Phase 2: Traits, Testing, Iterators (Nov 25 to Dec 9) ---
  { title: "Generics",
    learn: "Book ch. 10.1 (generics)",
    practice: "Rustlings: generics",
    build: "Generic largest function and a generic Pair<T>" },
  { title: "Traits",
    learn: "Book ch. 10.2 (traits)",
    practice: "Rustlings: traits",
    build: "Shape trait with Circle and Rectangle" },
  { title: "Trait bounds and derive",
    learn: "Trait bounds, impl Trait, derive macros",
    practice: "Rustlings: more traits",
    build: "Implement Display and PartialOrd for your structs" },
  { title: "Lifetimes",
    learn: "Book ch. 10.3 (lifetimes)",
    practice: "Rustlings: lifetimes",
    build: "Annotate longest and a struct holding a reference" },
  { title: "Review: chapter 10",
    learn: "Review ch. 10",
    practice: "Exercism: 2 medium problems",
    build: "Review notes" },
  { title: "Testing",
    learn: "Book ch. 11 (testing)",
    practice: "Rustlings: tests",
    build: "Add unit tests to Project 1" },
  { title: "Minigrep 1",
    learn: "Book ch. 12 (minigrep): args, reading files",
    practice: "Follow along and type it",
    build: "Run it on your own text files" },
  { title: "Minigrep 2",
    learn: "Ch. 12: refactor, error handling",
    practice: "Follow along (write tests first)",
    build: "Fix any compile errors without peeking" },
  { title: "Minigrep 3",
    learn: "Ch. 12: env vars, stderr",
    practice: "Follow along",
    build: "Extend it with a -n flag (line numbers)" },
  { title: "Closures",
    learn: "Book ch. 13.1 (closures)",
    practice: "Rustlings: closures (if present), iterators intro",
    build: "Write 5 small closures" },
  { title: "Iterators",
    learn: "Book ch. 13.2 to 13.3 (iterators)",
    practice: "Rustlings: iterators",
    build: "Rewrite minigrep with iterators" },
  { title: "Cargo, docs and clap",
    learn: "Book ch. 14 (Cargo, docs, crates). Skim the clap docs",
    practice: "Rustlings: any leftovers",
    build: "Add clap for argument parsing to minigrep" },
  { title: "Review: chapters 10 to 14",
    learn: "Review ch. 10 to 14",
    practice: "Exercism: 2 medium problems",
    build: "Run cargo clippy and cargo fmt on everything" },
  { title: "Checkpoint 2: Project 2, part 1",
    learn: "Checkpoint 2. Plan Project 2",
    practice: "Design the structs and errors",
    build: "Project 2: CSV or log file analyzer CLI (clap + Result + tests) part 1" },
  { title: "Finish Project 2",
    learn: "Finish Project 2",
    practice: "Write tests, run clippy",
    build: "Write a README" },

  // --- Phase 3: Smart Pointers, Concurrency, Async (Dec 10 to Dec 24) ---
  { title: "Box and Deref",
    learn: "Book ch. 15.1 to 15.2 (Box, Deref)",
    practice: "Rustlings: box",
    build: "Recursive list with Box" },
  { title: "Drop, Rc and RefCell",
    learn: "Ch. 15.3 to 15.5 (Drop, Rc, RefCell)",
    practice: "Rustlings: rc, cow",
    build: "Shared-ownership graph or tree" },
  { title: "Reference cycles and Weak",
    learn: "Ch. 15.6 (reference cycles, Weak)",
    practice: "Experiment with Rc/Weak",
    build: "Tree with parent pointers" },
  { title: "Threads",
    learn: "Book ch. 16.1 (threads)",
    practice: "Rustlings: threads",
    build: "Spawn 4 threads that sum parts of a Vec" },
  { title: "Channels",
    learn: "Ch. 16.2 (channels)",
    practice: "Build a producer/consumer example",
    build: "Small worker pipeline" },
  { title: "Mutex, Arc, Send and Sync",
    learn: "Ch. 16.3 to 16.4 (Mutex, Arc, Send, Sync)",
    practice: "Rustlings: threads",
    build: "Parallel word counter" },
  { title: "Patterns",
    learn: "Book ch. 19 (patterns)",
    practice: "Rustlings: pattern exercises",
    build: "Refactor Project 1 with better pattern matching" },
  { title: "Trait objects",
    learn: "Book ch. 18 (trait objects, dyn)",
    practice: "Exercism: 1 problem",
    build: "Plugin-style program with Vec<Box<dyn Trait>>" },
  { title: "Async/await basics",
    learn: "Book ch. 17 (async/await basics)",
    practice: "Write simple async functions",
    build: "Notes: futures vs threads" },
  { title: "Tokio: hello and spawning",
    learn: "Tokio tutorial: Hello Tokio, spawning",
    practice: "Follow along and type it",
    build: "Spawn 10 concurrent tasks" },
  { title: "Tokio: shared state and channels",
    learn: "Tokio: shared state, channels",
    practice: "Follow along",
    build: "Build a tiny key-value server" },
  { title: "Tokio: I/O and select!",
    learn: "Tokio: I/O, select!",
    practice: "Follow along",
    build: "Extend the server with a new command" },
  { title: "serde, serde_json and reqwest",
    learn: "serde, serde_json, reqwest docs",
    practice: "Parse a JSON file",
    build: "Fetch and parse JSON from a public API" },
  { title: "Checkpoint 3",
    learn: "Checkpoint 3. Review ch. 15 to 19 and notes",
    practice: "Exercism: 2 harder problems",
    build: "Update notes with weak spots" },
  { title: "axum: routing and handlers",
    learn: "Read axum docs: routing, handlers",
    practice: "Run the official examples",
    build: "Plan Project 3 (REST API): endpoints and data model on paper" },

  // --- Phase 4: Capstone and Advanced Topics (Dec 25 to Jan 6) ---
  { title: "axum: routes and extractors",
    learn: "axum: routes and extractors",
    practice: "Hello-world axum server",
    build: "Set up Project 3: task manager or URL shortener API" },
  { title: "axum: JSON with serde",
    learn: "axum: JSON requests and responses with serde",
    practice: "Implement create and read endpoints",
    build: "Test with curl" },
  { title: "Shared state",
    learn: "Shared state with Arc<Mutex> or RwLock",
    practice: "Implement update and delete endpoints",
    build: "Test all endpoints" },
  { title: "Errors in the API",
    learn: "Errors: thiserror, anyhow, IntoResponse",
    practice: "Add proper error responses",
    build: "Handle 404 and bad input" },
  { title: "Persistence",
    learn: "rusqlite or file-based persistence",
    practice: "Save data to disk",
    build: "Verify data survives restart" },
  { title: "Testing async code",
    learn: "Testing async code and integration tests",
    practice: "Write tests for the endpoints",
    build: "Fix bugs found" },
  { title: "Clippy and idiomatic Rust",
    learn: "Clippy lints, idiomatic Rust, API Guidelines",
    practice: "Refactor Project 3",
    build: "Write a README" },
  { title: "Unsafe and advanced traits",
    learn: "Book ch. 20: unsafe Rust, advanced traits and types",
    practice: "Read and experiment",
    build: "Notes only" },
  { title: "Macros",
    learn: "Macros: macro_rules! and derive overview",
    practice: "Write 1 small macro_rules! macro",
    build: "Notes only" },
  { title: "Read real code",
    learn: "Read real code: a small crate or part of ripgrep",
    practice: "Trace one feature end to end",
    build: "Write down patterns you notice" },
  { title: "Performance basics",
    learn: "Performance basics: --release, cargo bench, profiling",
    practice: "Optimize one slow spot in Project 3",
    build: "Compare before and after" },
  { title: "Light day",
    learn: "Light day (1 hr, pre-race rest). Review notes",
    practice: "Write a one-page personal Rust cheat sheet",
    build: "List topics to study next",
    minutes: [20, 25, 15] },
  { title: "Race day",
    learn: "Race day. 30 min only: skim your cheat sheet",
    practice: "Optional only",
    build: "Celebrate, then do your next-steps list tomorrow",
    minutes: [30, null, null], practiceOptional: true },
];


// ======================================================================
// MARATHON DATA
// ======================================================================

/**
 * The marathon (7.5 km race) plan, exactly as written in your plan text.
 * Nov 9, 2026 is the first plan day; Jan 6, 2027 is race day.
 *
 * SCHEDULE has one entry per date, starting Nov 9. Entry fields:
 *   kind          - "run", "rest" or "race"
 *   text          - the session (run and race days)
 *   summary       - the one-line description (rest days)
 *   optional      - optional extras on a rest day, e.g. an easy walk
 *   strengthRounds- rounds of the optional light strength work
 *   label / note  - overrides for the rest-day checkbox and its explanation
 */
const MARATHON = {
  /** Plan day number of Nov 9 (plan day 1 is Nov 8, which has no session). */
  FIRST_PLAN_DAY: 2,

  WARM_UP: "Walk briskly for 5 minutes to warm up.",
  COOL_DOWN: "Walk slowly for 5 minutes to cool down, then stretch calves, thighs and hips for 3 to 5 minutes.",
  JOG_PACE: "Slow enough that you can talk in short sentences. If you can't, slow down or walk.",
  STRENGTH_MOVES: "10 squats, 10 calf raises, 20 sec plank",

  PHASES: [
    { name: "Phase 1: Foundation",        firstDay: 2,  lastDay: 15 },  // Nov 9 - Nov 22
    { name: "Phase 2: Build",             firstDay: 16, lastDay: 33 },  // Nov 23 - Dec 10
    { name: "Phase 3: Distance",          firstDay: 34, lastDay: 49 },  // Dec 11 - Dec 26
    { name: "Phase 4: Peak and Taper",    firstDay: 50, lastDay: 60 },  // Dec 27 - Jan 6
  ],

  SCHEDULE: [
    // --- Phase 1: Foundation (Nov 9 - Nov 22) ---
    { kind: "run",  text: "5 × (1 min jog / 2 min walk)" },                                                                                      // Nov 9
    { kind: "rest", summary: "Rest" },                                                                                                          // Nov 10
    { kind: "run",  text: "5 × (1 min jog / 2 min walk)" },                                                                                      // Nov 11
    { kind: "rest", summary: "Rest (easy 20 min walk optional)", optional: ["Easy 20 min walk"] },                                              // Nov 12
    { kind: "run",  text: "6 × (1 min jog / 2 min walk)" },                                                                                      // Nov 13
    { kind: "rest", summary: "Rest" },                                                                                                          // Nov 14
    { kind: "run",  text: "5 × (2 min jog / 2 min walk)" },                                                                                      // Nov 15
    { kind: "rest", summary: "Rest (light strength: 10 squats, 10 calf raises, 20 sec plank, 2 rounds)", strengthRounds: 2 },                  // Nov 16
    { kind: "run",  text: "6 × (2 min jog / 2 min walk)" },                                                                                      // Nov 17
    { kind: "rest", summary: "Rest" },                                                                                                          // Nov 18
    { kind: "run",  text: "5 × (3 min jog / 2 min walk)" },                                                                                      // Nov 19
    { kind: "rest", summary: "Rest (easy walk optional)", optional: ["Easy walk"] },                                                            // Nov 20
    { kind: "run",  text: "6 × (3 min jog / 2 min walk)" },                                                                                      // Nov 21
    { kind: "rest", summary: "Rest" },                                                                                                          // Nov 22

    // --- Phase 2: Build (Nov 23 - Dec 10) ---
    { kind: "run",  text: "5 × (4 min jog / 2 min walk)" },                                                                                      // Nov 23
    { kind: "rest", summary: "Rest (light strength, same as Nov 16)", strengthRounds: 2 },                                                      // Nov 24
    { kind: "run",  text: "5 × (5 min jog / 2 min walk)" },                                                                                      // Nov 25
    { kind: "rest", summary: "Rest" },                                                                                                          // Nov 26
    { kind: "run",  text: "4 × (7 min jog / 2 min walk)" },                                                                                      // Nov 27
    { kind: "rest", summary: "Rest (easy walk optional)", optional: ["Easy walk"] },                                                            // Nov 28
    { kind: "run",  text: "3 × (10 min jog / 2 min walk)" },                                                                                     // Nov 29
    { kind: "rest", summary: "Rest" },                                                                                                          // Nov 30
    { kind: "run",  text: "15 min continuous jog" },                                                                                             // Dec 1
    { kind: "rest", summary: "Rest (light strength)", strengthRounds: 2 },                                                                      // Dec 2
    { kind: "run",  text: "18 min continuous jog" },                                                                                             // Dec 3
    { kind: "rest", summary: "Rest" },                                                                                                          // Dec 4
    { kind: "run",  text: "20 min continuous jog" },                                                                                             // Dec 5
    { kind: "rest", summary: "Rest (easy walk optional)", optional: ["Easy walk"] },                                                            // Dec 6
    { kind: "run",  text: "22 min continuous jog" },                                                                                             // Dec 7
    { kind: "rest", summary: "Rest (light strength)", strengthRounds: 2 },                                                                      // Dec 8
    { kind: "run",  text: "25 min continuous jog (about 2.5 to 3 km)" },                                                                          // Dec 9
    { kind: "rest", summary: "Rest" },                                                                                                          // Dec 10

    // --- Phase 3: Distance (Dec 11 - Dec 26) ---
    { kind: "run",  text: "3 km jog" },                                                                                                          // Dec 11
    { kind: "rest", summary: "Rest" },                                                                                                          // Dec 12
    { kind: "run",  text: "3.5 km jog" },                                                                                                        // Dec 13
    { kind: "rest", summary: "Rest (light strength, 3 rounds now)", strengthRounds: 3 },                                                        // Dec 14
    { kind: "run",  text: "3 km easy (recovery pace)" },                                                                                         // Dec 15
    { kind: "rest", summary: "Rest" },                                                                                                          // Dec 16
    { kind: "run",  text: "4 km jog" },                                                                                                          // Dec 17
    { kind: "rest", summary: "Rest (easy walk optional)", optional: ["Easy walk"] },                                                            // Dec 18
    { kind: "run",  text: "3.5 km easy" },                                                                                                       // Dec 19
    { kind: "rest", summary: "Rest" },                                                                                                          // Dec 20
    { kind: "run",  text: "4.5 km jog" },                                                                                                        // Dec 21
    { kind: "rest", summary: "Rest (light strength)", strengthRounds: 3 },                                                                      // Dec 22
    { kind: "run",  text: "3.5 km easy" },                                                                                                       // Dec 23
    { kind: "rest", summary: "Rest" },                                                                                                          // Dec 24
    { kind: "run",  text: "5 km jog" },                                                                                                          // Dec 25
    { kind: "rest", summary: "Rest" },                                                                                                          // Dec 26

    // --- Phase 4: Peak and Taper (Dec 27 - Jan 6) ---
    { kind: "run",  text: "4 km easy" },                                                                                                         // Dec 27
    { kind: "rest", summary: "Rest" },                                                                                                          // Dec 28
    { kind: "run",  text: "6.5 km, your longest run. Go very slowly and walk briefly if you need to." },                                         // Dec 29
    { kind: "rest", summary: "Rest (easy walk only, no strength work)", optional: ["Easy walk"], note: "Easy walk only, no strength work." },  // Dec 30
    { kind: "run",  text: "3 km very easy" },                                                                                                    // Dec 31
    { kind: "rest", summary: "Rest" },                                                                                                          // Jan 1
    { kind: "run",  text: "4 km easy" },                                                                                                         // Jan 2
    { kind: "rest", summary: "Rest" },                                                                                                          // Jan 3
    { kind: "run",  text: "2 km easy, then 4 pickups of about 20 seconds at a slightly faster pace" },                                          // Jan 4
    { kind: "rest", summary: "Full rest", label: "Full rest",
      note: "Drink plenty of water, eat a carb-rich dinner, sleep early, and lay out your gear." },                                               // Jan 5
    { kind: "race", text: "RACE DAY: 7.5 km" },                                                                                                  // Jan 6
  ],
};


// ======================================================================
// HEALTH DATA
// ======================================================================

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


// ======================================================================
// CUBING DATA
// ======================================================================

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
