const scheduleRows = [
  {
    "day": "Monday",
    "time": "9:30–10:15am",
    "age": "Walking–2 yrs",
    "name": "Grown Up & Me (6-Weeks)",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Monday",
    "time": "10:15–11:00am",
    "age": "2-4 yrs",
    "name": "Tiny Dancers",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Monday",
    "time": "3:45–4:30pm",
    "age": "3-4 yrs",
    "name": "Petite Ballet",
    "studio": "Studio B",
    "category": "Dance & Movement"
  },
  {
    "day": "Monday",
    "time": "4:00–4:45pm",
    "age": "6–7 yrs",
    "name": "Ballet 2",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Monday",
    "time": "4:30–5:30pm",
    "age": "4–6 yrs",
    "name": "Mini Musical Theatre",
    "studio": "Studio B",
    "category": "Musical Theatre"
  },
  {
    "day": "Monday",
    "time": "4:45–5:30pm",
    "age": "7–10 yrs",
    "name": "Jazz",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Monday",
    "time": "5:30–6:30pm",
    "age": "7–Teen",
    "name": "Jr. Musical Theatre",
    "studio": "Studio A",
    "category": "Musical Theatre"
  },
  {
    "day": "Monday",
    "time": "5:30-6:15pm",
    "age": "7–10 yrs",
    "name": "Contemporary/Lyrical",
    "studio": "Studio B",
    "category": "Dance & Movement"
  },
  {
    "day": "Tuesday",
    "time": "9:30–10:15am",
    "age": "2–4 yrs",
    "name": "Tumble & Play",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Tuesday",
    "time": "10:15–11:00am",
    "age": "2- 4yrs",
    "name": "Tiny Dancers",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Tuesday",
    "time": "3:45–4:30pm",
    "age": "3–4 yrs",
    "name": "Intro to Dance",
    "studio": "Studio B",
    "category": "Dance & Movement"
  },
  {
    "day": "Tuesday",
    "time": "3:45–4:30",
    "age": "All Ages",
    "name": "Power & Flow",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Tuesday",
    "time": "4:30-5:15pm",
    "age": "6-8 yrs",
    "name": "Tap",
    "studio": "Studio B",
    "category": "Dance & Movement"
  },
  {
    "day": "Tuesday",
    "time": "4:30-5:15pm",
    "age": "All Ages",
    "name": "TikTok Dance Lab",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Tuesday",
    "time": "5:15–6:00pm",
    "age": "7–9 yrs",
    "name": "Dance Lab (Intro to dance)",
    "studio": "Studio B",
    "category": "Dance & Movement"
  },
  {
    "day": "Tuesday",
    "time": "5:15–6:00",
    "age": "7–10 yrs",
    "name": "Hip Hop",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Tuesday",
    "time": "6:00–6:45pm",
    "age": "7–10 yrs",
    "name": "Acro I",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Wednesday",
    "time": "9:30–10:15am",
    "age": "Walking–2 yrs",
    "name": "Grown Up & Me (6-Weeks)",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Wednesday",
    "time": "10:15–11:00am",
    "age": "2-4 yrs",
    "name": "Tiny Dancers",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Wednesday",
    "time": "3:45–4:30pm",
    "age": "4–6 yrs",
    "name": "Hip-Hop",
    "studio": "Studio B",
    "category": "Dance & Movement"
  },
  {
    "day": "Wednesday",
    "time": "3:45–4:30pm",
    "age": "3–4 yrs",
    "name": "Petite Ballet",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Wednesday",
    "time": "4:30–5:15pm",
    "age": "8–Teen",
    "name": "Acro II",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Wednesday",
    "time": "4:30pm–5:15pm",
    "age": "5–7 yrs",
    "name": "Tumbling",
    "studio": "Studio B",
    "category": "Dance & Movement"
  },
  {
    "day": "Wednesday",
    "time": "5:15–6:15pm",
    "age": "8–Teen",
    "name": "Adv. Hip Hop",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Wednesday",
    "time": "5:15–6:15pm",
    "age": "8–Teen",
    "name": "Ballet 2",
    "studio": "Studio B",
    "category": "Dance & Movement"
  },
  {
    "day": "Wednesday",
    "time": "6:15–7:15pm",
    "age": "8–Teen",
    "name": "Tap/Jazz Combo",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Thursday",
    "time": "9:30–10:15am",
    "age": "2–4 yrs",
    "name": "Tumble & Play",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Thursday",
    "time": "10:15–11:00am",
    "age": "2-4 yrs",
    "name": "Tiny Dancers",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Thursday",
    "time": "3:30–4:15pm",
    "age": "4–5 yrs",
    "name": "Ballet I",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Thursday",
    "time": "4:15–5:00pm",
    "age": "5–6 yrs",
    "name": "Intro to Dance",
    "studio": "Studio B",
    "category": "Dance & Movement"
  },
  {
    "day": "Thursday",
    "time": "4:15-5:00pm",
    "age": "8-Teen",
    "name": "Contemporary/Lyrical",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Thursday",
    "time": "5:00-5:45pm",
    "age": "5-7 yrs",
    "name": "Ballet I",
    "studio": "Studio B",
    "category": "Dance & Movement"
  },
  {
    "day": "Thursday",
    "time": "5:00–5:45",
    "age": "8-Teen",
    "name": "Leaps & Turns",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Thursday",
    "time": "5:45–6:45pm",
    "age": "8–Teen",
    "name": "Ballet 3 ( Pre Point )",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Saturday",
    "time": "9:30–10:15am",
    "age": "Walking–2 yrs",
    "name": "Grown Up & Me (6-Weeks)",
    "studio": "Studio B",
    "category": "Dance & Movement"
  },
  {
    "day": "Saturday",
    "time": "9:30–10:15am",
    "age": "2–4 yrs",
    "name": "Tiny Dancers",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Saturday",
    "time": "10:15–11:00am",
    "age": "3–4 yrs",
    "name": "Petite Ballet",
    "studio": "Studio B",
    "category": "Dance & Movement"
  },
  {
    "day": "Saturday",
    "time": "10:15–11:00am",
    "age": "4–5 yrs",
    "name": "Ballet I",
    "studio": "Studio A",
    "category": "Dance & Movement"
  },
  {
    "day": "Saturday",
    "time": "11:45am–12:30pm",
    "age": "7–9 yrs",
    "name": "Acro I",
    "studio": "Studio A",
    "category": "Dance & Movement"
  }
];

function categoryFor(name) {
  if (name.includes('Musical Theatre')) return 'Musical Theatre';
  if (/Acro|Tumble|Tumbling|Power & Flow/i.test(name)) return 'Acro, Tumbling & Wellness';
  if (/Ballet|Leaps|Contemporary/i.test(name)) return 'Ballet & Technique';
  return 'Dance Styles';
}

export const classSchedule = scheduleRows.map((row) => ({
  ...row,
  category: categoryFor(row.name),
}));
