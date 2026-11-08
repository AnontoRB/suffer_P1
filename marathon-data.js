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
