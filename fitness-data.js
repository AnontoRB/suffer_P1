/**
 * Fitness plan data. Edit numbers here to change the training;
 * fitness.js only reads this object.
 *
 * Week indexes 0-7 cover days 1-56 (seven days each).
 * Race week (days 57-60) is handled separately in fitness.js.
 */
const FITNESS = {
  WATER_GOAL_ML: 3000,
  SLEEP_GOAL_MIN: 8 * 60,

  /** One label per training week. Weeks 4 and 8 are lighter on purpose. */
  PHASES: ["Build 1", "Build 1", "Build 1", "Deload", "Build 2", "Build 2", "Build 2 (peak)", "Taper"],

  /**
   * Running sessions per week.
   *   run1 / run2 - the two shorter runs
   *   long        - the weekly long run
   */
  RUNS: [
    { run1: "6 × (1 min jog + 2 min walk)",
      run2: "6 × (1 min jog + 2 min walk)",
      long: "8 × (1 min jog + 2 min walk), about 24 min" },
    { run1: "6 × (2 min jog + 2 min walk)",
      run2: "6 × (2 min jog + 2 min walk)",
      long: "6 × (3 min jog + 2 min walk), about 30 min" },
    { run1: "5 × (3 min jog + 2 min walk)",
      run2: "5 × (4 min jog + 2 min walk)",
      long: "4 × (6 min jog + 2 min walk), about 32 min" },
    { run1: "4 × (3 min jog + 2 min walk)",
      run2: "4 × (3 min jog + 2 min walk)",
      long: "3 × (6 min jog + 2 min walk), about 24 min (deload)" },
    { run1: "4 × (6 min jog + 1 min walk)",
      run2: "4 × (7 min jog + 1 min walk)",
      long: "3 × (10 min jog + 2 min walk), about 36 min" },
    { run1: "3 × (8 min jog + 1 min walk)",
      run2: "3 × (10 min jog + 1 min walk)",
      long: "3 × (12 min jog + 2 min walk), about 42 min" },
    { run1: "25 min continuous easy jog",
      run2: "30 min continuous easy jog",
      long: "50 min easy jog, walk breaks allowed (about 7 km): your peak run" },
    { run1: "20 min easy jog",
      run2: "20 min easy jog",
      long: "30 min easy jog, about 4-4.5 km" },
  ],

  /**
   * Bodyweight sessions. For each exercise, `sets` and `reps` hold
   * one value per training week (index 0 = week 1 ... index 7 = week 8).
   * `unit` is appended to the reps, e.g. " reps" or " s" (seconds).
   */
  STRENGTH: {
    A: {
      title: "Strength A: upper body and core",
      exercises: [
        { name: "Push-ups",      sets: [3,4,4,3,4,5,5,3], reps: [5,5,6,5,7,7,8,5],         unit: " reps", cue: "Straight line, chest a fist above the floor." },
        { name: "Knee push-ups", sets: [2,2,2,2,2,2,2,2], reps: [8,10,12,8,12,14,15,10],   unit: " reps", cue: "Go close to failure." },
        { name: "Shoulder taps", sets: [3,3,3,3,3,3,3,3], reps: [16,20,24,16,24,28,30,20], unit: " taps", cue: "High plank, hips still." },
        { name: "Sit-ups",       sets: [3,3,3,3,3,4,4,3], reps: [15,18,22,15,25,28,30,20], unit: " reps", cue: "Controlled, no yanking your neck." },
        { name: "Plank",         sets: [3,3,3,3,3,3,3,3], reps: [20,30,40,25,45,60,60,40], unit: " s",    cue: "Squeeze glutes and abs." },
        { name: "Superman hold", sets: [3,3,3,2,3,3,3,2], reps: [10,12,12,10,12,14,15,10], unit: " reps", cue: "Hold 2 s at the top. Trains your back." },
      ],
    },
    B: {
      title: "Strength B: legs and core",
      exercises: [
        { name: "Squats",         sets: [3,3,4,3,4,4,5,3], reps: [15,18,20,15,22,25,25,18], unit: " reps",     cue: "Heels down; 3 s lowering from week 3." },
        { name: "Reverse lunges", sets: [2,3,3,2,3,3,4,2], reps: [8,8,10,8,10,12,12,8],     unit: " reps/leg", cue: "Step back, front knee steady." },
        { name: "Glute bridges",  sets: [3,3,3,3,3,4,4,3], reps: [15,18,20,15,22,25,25,18], unit: " reps",     cue: "Pause 1 s at the top." },
        { name: "Wall sit",       sets: [3,3,3,3,3,3,3,3], reps: [20,30,40,30,45,60,60,40], unit: " s",        cue: "Thighs parallel to the floor." },
        { name: "Calf raises",    sets: [3,3,3,3,3,3,3,3], reps: [15,20,25,20,25,30,30,20], unit: " reps",     cue: "Slow up, slow down. Protects running legs." },
        { name: "Bird-dog",       sets: [2,3,3,2,3,3,3,2], reps: [8,10,10,8,12,12,12,8],    unit: " reps/side", cue: "Keep your back flat." },
      ],
    },
    C: {
      title: "Strength C: full-body circuit",
      note: "One set of each in order, rest 60-90 s between exercises, then repeat for the rounds shown.",
      exercises: [
        { name: "Push-ups",          sets: [2,3,3,2,3,3,4,2], reps: [4,4,5,4,5,6,6,4],         unit: " reps",     cue: "Stop with 2 reps left." },
        { name: "Squats",            sets: [2,3,3,2,3,3,4,2], reps: [12,15,18,12,18,20,20,15], unit: " reps",     cue: "" },
        { name: "Sit-ups",           sets: [2,3,3,2,3,3,4,2], reps: [12,15,18,12,18,20,22,15], unit: " reps",     cue: "" },
        { name: "Reverse lunges",    sets: [2,3,3,2,3,3,4,2], reps: [6,6,8,6,8,10,10,6],       unit: " reps/leg", cue: "" },
        { name: "Mountain climbers", sets: [2,3,3,2,3,3,4,2], reps: [20,20,30,20,30,35,40,25], unit: " s",        cue: "Fast but controlled." },
        { name: "Plank",             sets: [2,3,3,2,3,3,4,2], reps: [20,25,35,25,40,45,50,35], unit: " s",        cue: "" },
      ],
    },
  },

  /** One progressive-overload tip per day, repeating. */
  TIPS: [
    "Double progression: hold a rep target until every set feels easy, then add 1-2 reps.",
    "Leave 2 reps in the tank. Form first, reps second.",
    "Slow the lowering phase to 3 seconds. Same reps, much harder.",
    "Change only one variable at a time: reps, sets, tempo or rest.",
    "Log your numbers. Next week's goal: beat them by 1 rep.",
    "Cut rest by 10 seconds when sets feel easy.",
    "Sleep is when you adapt. Protect tonight's bedtime.",
    "Easy jog pace means you can still say a short sentence.",
    "Sore is fine. Sharp or joint pain means stop and rest.",
  ],
};
