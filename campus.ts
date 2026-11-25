export type ThemeId = 'comic' | 'whimsy';

export interface Professor {
  id: string;
  name: string;
  short: string;
  dept: string;
  cabin: string;
  initials: string;
  posting: boolean;
}

export interface MapMeta {
  door: [number, number];
  path: string;
  landmarkAt: [number, number];
  landmarkShort: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  short: string;
  credits: number;
  ltps: string;
  professorId: string;
  room: string;
  building: string;
  floor: string;
  landmark: string;
  walk: string;
  map: MapMeta;
  steps: string[];
}

export interface Session {
  id: string;
  courseId: string;
  weekday: number; // 0 = Monday ... 5 = Saturday
  start: number; // minutes from midnight
  end: number;
  room?: string;
  status: 'usual' | 'moved' | 'lab';
  note?: string;
}

export interface UpdateItem {
  id: string;
  professorId: string;
  courseId: string;
  ago: string;
  kind: 'moved' | 'notice' | 'lab';
  text: string;
  room?: string;
  fresh?: boolean;
}

export interface StudentNote {
  id: string;
  name: string;
  role: string;
  initials: string;
  text: string;
  ago: string;
  kind: 'vent' | 'tip';
}

/** First semester CSE, section A · North Campus timetable sheet. */
export const PROFESSORS: Professor[] = [
  {
    id: 'p1',
    name: 'Dr. Ashwini B',
    short: 'Dr. Ashwini',
    dept: 'Mathematics',
    cabin: 'MH-02, Main Block',
    initials: 'AB',
    posting: true,
  },
  {
    id: 'p2',
    name: 'Dr. Akhila A',
    short: 'Dr. Akhila',
    dept: 'Physics',
    cabin: 'PH-06, Science Block',
    initials: 'AA',
    posting: true,
  },
  {
    id: 'p3',
    name: 'Prof. Deepak P',
    short: 'Prof. Deepak',
    dept: 'Mechanical (CAED)',
    cabin: 'DR-04, Drawing Hall',
    initials: 'DP',
    posting: false,
  },
  {
    id: 'p4',
    name: 'Dr. Yajunath Kaliyath',
    short: 'Dr. Yajunath',
    dept: 'Electronics & Communication',
    cabin: 'EC-11, Main Block',
    initials: 'YK',
    posting: true,
  },
  {
    id: 'p5',
    name: 'Mrs. Harshini C',
    short: 'Mrs. Harshini',
    dept: 'Computer Science',
    cabin: 'CS-03, CSE Annexe',
    initials: 'HC',
    posting: true,
  },
  {
    id: 'p6',
    name: 'Mr. Madhu M S',
    short: 'Mr. Madhu',
    dept: 'Kannada',
    cabin: 'HU-01, Main Block',
    initials: 'MSM',
    posting: false,
  },
  {
    id: 'p7',
    name: 'Mrs. Deepashree M',
    short: 'Mrs. Deepashree',
    dept: 'IPBL · Computer Science',
    cabin: 'IP-02, Library Block',
    initials: 'DM',
    posting: false,
  },
  {
    id: 'p8',
    name: 'Mr. Santosh B K',
    short: 'Mr. Santosh',
    dept: 'Soft Skills',
    cabin: 'SS-05, Main Block',
    initials: 'SBK',
    posting: false,
  },
];

export const COURSES: Course[] = [
  {
    id: 'c1',
    code: '1BMACS101A',
    title: 'Applied Mathematics I',
    short: 'MAT',
    credits: 4,
    ltps: '3:2:0:0',
    professorId: 'p1',
    room: 'MB1',
    building: 'Main Block',
    floor: 'ground floor',
    landmark: 'the blue ramp beside the MB1 door',
    walk: '3 min walk',
    map: {
      door: [210, 186],
      path: 'M320,384 L320,336 L210,336 L210,186',
      landmarkAt: [265, 205],
      landmarkShort: 'Blue ramp',
    },
    steps: [
      'Enter through the North Gate and keep the quad on your left.',
      'MB1 is the long hall on the ground floor of the Main Block, past the blue ramp.',
      'Section A sits in the front half. The board is on the right wall.',
    ],
  },
  {
    id: 'c2',
    code: '1BPHCS102',
    title: 'Applied Physics for CSE',
    short: 'PHY',
    credits: 3,
    ltps: '2:2:0:0',
    professorId: 'p2',
    room: 'MB1',
    building: 'Main Block',
    floor: 'ground floor',
    landmark: 'the blue ramp beside the MB1 door',
    walk: '3 min walk',
    map: {
      door: [210, 186],
      path: 'M320,384 L320,336 L210,336 L210,186',
      landmarkAt: [265, 205],
      landmarkShort: 'Blue ramp',
    },
    steps: [
      'North Gate, then straight towards the Main Block portico.',
      'Down the blue ramp — MB1 is the first hall on your left.',
      'Theory sits in MB1; the lab half of the week is in Physics Lab 1.',
    ],
  },
  {
    id: 'c3',
    code: '1BECDCS103',
    title: 'Computer-Aided Engineering Drawing',
    short: 'CAED',
    credits: 3,
    ltps: '1:0:4:0',
    professorId: 'p3',
    room: 'Drawing Hall',
    building: 'Drawing Hall',
    floor: 'ground floor',
    landmark: 'the old steam engine outside the workshop gate',
    walk: '7 min walk',
    map: {
      door: [150, 341],
      path: 'M320,384 L320,362 L150,362 L150,341',
      landmarkAt: [120, 215],
      landmarkShort: 'Steam engine',
    },
    steps: [
      'Walk west along the quad path, away from the Main Block.',
      'The old steam engine marks the workshop gate — the Drawing Hall is just past it.',
      'Long tables, high windows. Board and mini-drafter on the table before the bell.',
    ],
  },
  {
    id: 'c4',
    code: '1BESC104G',
    title: 'Intro to Electronics & Communication',
    short: 'ESC-I',
    credits: 3,
    ltps: '3:0:0:0',
    professorId: 'p4',
    room: 'MB1',
    building: 'Main Block',
    floor: 'ground floor',
    landmark: 'the blue ramp beside the MB1 door',
    walk: '3 min walk',
    map: {
      door: [210, 186],
      path: 'M320,384 L320,336 L210,336 L210,186',
      landmarkAt: [265, 205],
      landmarkShort: 'Blue ramp',
    },
    steps: [
      'North Gate → Main Block portico, first corridor on the left.',
      'Take the blue ramp down; MB1 is straight ahead.',
      'Dr. Yajunath starts on the dot, so aim for five minutes early.',
    ],
  },
  {
    id: 'c5',
    code: '1BEIT105',
    title: 'Programming in C',
    short: 'PSC',
    credits: 3,
    ltps: '3:0:0:0',
    professorId: 'p5',
    room: 'MB1',
    building: 'Main Block',
    floor: 'ground floor',
    landmark: 'the notice board outside MB1',
    walk: '3 min walk',
    map: {
      door: [210, 186],
      path: 'M320,384 L320,336 L210,336 L210,186',
      landmarkAt: [190, 205],
      landmarkShort: 'Notice board',
    },
    steps: [
      'In at the North Gate, past the notice board with the lab batch lists.',
      'MB1 is the hall right behind that board.',
      'Bring your own laptop if you have one — the desktop rows fill up fast.',
    ],
  },
  {
    id: 'c6',
    code: '1BPOPL107',
    title: 'C Programming Lab',
    short: 'PSCL',
    credits: 1,
    ltps: '0:0:2:0',
    professorId: 'p5',
    room: 'PSC Lab 2',
    building: 'CSE Annexe',
    floor: '1st floor',
    landmark: 'the blue cycle stand behind the canteen',
    walk: '8 min walk',
    map: {
      door: [520, 305],
      path: 'M320,384 L320,362 L520,362 L520,305',
      landmarkAt: [528, 335],
      landmarkShort: 'Cycle stand',
    },
    steps: [
      'Cross the quad to the east side, past the canteen.',
      'The blue cycle stand sits under the CSE Annexe staircase. Go up one floor.',
      'PSC Lab 2 is the second door — check the batch list taped to it before you sit.',
    ],
  },
  {
    id: 'c7',
    code: '1BPHCSL102',
    title: 'Applied Physics Lab',
    short: 'PHYL',
    credits: 1,
    ltps: '0:0:2:0',
    professorId: 'p2',
    room: 'Physics Lab 1',
    building: 'Science Block',
    floor: 'ground floor',
    landmark: 'the rain tree with the painted bench',
    walk: '5 min walk',
    map: {
      door: [360, 290],
      path: 'M320,384 L320,340 L360,340 L360,290',
      landmarkAt: [286, 270],
      landmarkShort: 'Rain tree',
    },
    steps: [
      'Head north-east across the quad towards the Science Block.',
      'The rain tree with the painted bench is right outside the lab corridor.',
      'Physics Lab 1 is the first door. Records book and closed shoes, both compulsory.',
    ],
  },
  {
    id: 'c8',
    code: '1BKKS109 / 1BKKB109',
    title: 'Samskrutika / Balake Kannada',
    short: 'SK/BK',
    credits: 1,
    ltps: '1:0:0:0',
    professorId: 'p6',
    room: 'MB1',
    building: 'Main Block',
    floor: 'ground floor',
    landmark: 'the blue ramp beside the MB1 door',
    walk: '3 min walk',
    map: {
      door: [210, 186],
      path: 'M320,384 L320,336 L210,336 L210,186',
      landmarkAt: [265, 205],
      landmarkShort: 'Blue ramp',
    },
    steps: [
      'Same walk as the morning lectures — North Gate, then the Main Block.',
      'MB1 on the ground floor. SK and BK sit together this week.',
      'Check which section you are registered for on the department board.',
    ],
  },
  {
    id: 'c9',
    code: '1BPRJ158',
    title: 'Interdisciplinary Project-Based Learning',
    short: 'IPBL',
    credits: 1,
    ltps: '0:0:0:2',
    professorId: 'p7',
    room: 'Innovation Lab',
    building: 'Library Block',
    floor: '1st floor',
    landmark: 'the stone steps under the neem tree',
    walk: '6 min walk',
    map: {
      door: [400, 151],
      path: 'M320,384 L320,342 L400,342 L400,151',
      landmarkAt: [528, 170],
      landmarkShort: 'Neem steps',
    },
    steps: [
      'Walk up past the library towards the Library Block.',
      'Look for the wide stone steps under the neem tree — that is the side entrance.',
      'Innovation Lab is on the first floor, behind the glass partition.',
    ],
  },
  {
    id: 'c10',
    code: '1BSKS106',
    title: 'Soft Skills',
    short: 'SS',
    credits: 0,
    ltps: '0:0:0:2',
    professorId: 'p8',
    room: 'Seminar Hall',
    building: 'Main Block',
    floor: '2nd floor',
    landmark: 'the glass notice board beside the staircase',
    walk: '4 min walk',
    map: {
      door: [245, 186],
      path: 'M320,384 L320,336 L245,336 L245,186',
      landmarkAt: [180, 205],
      landmarkShort: 'Glass board',
    },
    steps: [
      'Main Block portico, then the staircase beside the glass notice board.',
      'Up to the second floor and turn right.',
      'Seminar Hall is at the end of the corridor, doors on both sides.',
    ],
  },
];

export const SESSIONS: Session[] = [
  // Monday
  { id: 's1', courseId: 'c1', weekday: 0, start: 540, end: 600, status: 'usual' },
  { id: 's2', courseId: 'c4', weekday: 0, start: 600, end: 660, status: 'usual' },
  {
    id: 's3',
    courseId: 'c7',
    weekday: 0,
    start: 690,
    end: 810,
    status: 'lab',
    note: 'Batch A: Physics Lab 1 · Batch B: PSC Lab 2',
  },

  // Tuesday
  { id: 's4', courseId: 'c1', weekday: 1, start: 540, end: 660, status: 'usual', note: 'MAT tutorial · sheets 1–3' },
  { id: 's5', courseId: 'c5', weekday: 1, start: 690, end: 750, status: 'usual' },
  { id: 's6', courseId: 'c2', weekday: 1, start: 750, end: 810, status: 'usual' },
  {
    id: 's7',
    courseId: 'c6',
    weekday: 1,
    start: 870,
    end: 990,
    status: 'lab',
    note: 'Batch A: PSC Lab 1 · Batch B: Physics Lab 2',
  },

  // Wednesday
  { id: 's8', courseId: 'c5', weekday: 2, start: 540, end: 600, status: 'usual' },
  { id: 's9', courseId: 'c4', weekday: 2, start: 600, end: 660, status: 'usual' },
  { id: 's10', courseId: 'c2', weekday: 2, start: 690, end: 810, status: 'usual', note: 'PHY tutorial · problem set 04' },
  { id: 's11', courseId: 'c3', weekday: 2, start: 870, end: 990, status: 'lab', note: 'Drawing practical · board + mini-drafter' },

  // Thursday
  { id: 's12', courseId: 'c3', weekday: 3, start: 540, end: 660, status: 'lab', note: 'Drawing practical · sheet 05' },
  {
    id: 's13',
    courseId: 'c2',
    weekday: 3,
    start: 690,
    end: 750,
    status: 'moved',
    room: 'MB2',
    note: 'Moved from MB1 · MB1 is set up for the mock test',
  },
  { id: 's14', courseId: 'c1', weekday: 3, start: 750, end: 810, status: 'usual' },

  // Friday
  { id: 's15', courseId: 'c3', weekday: 4, start: 540, end: 660, status: 'lab', note: 'Drawing practical · sheet 05 review' },
  { id: 's16', courseId: 'c1', weekday: 4, start: 690, end: 750, status: 'usual' },
  { id: 's17', courseId: 'c4', weekday: 4, start: 750, end: 810, status: 'usual' },
  { id: 's18', courseId: 'c8', weekday: 4, start: 870, end: 930, status: 'usual', note: 'Samskrutika Kannada (SK)' },
  { id: 's19', courseId: 'c8', weekday: 4, start: 930, end: 990, status: 'usual', note: 'Balake Kannada (BK)' },

  // Saturday
  { id: 's20', courseId: 'c9', weekday: 5, start: 540, end: 660, status: 'usual', note: 'IPBL review · bring your logbook' },
  { id: 's21', courseId: 'c10', weekday: 5, start: 690, end: 810, status: 'usual', note: 'Soft skills · group activity' },
];

export const UPDATES: UpdateItem[] = [
  {
    id: 'u1',
    professorId: 'p2',
    courseId: 'c2',
    ago: '12 min ago',
    kind: 'moved',
    text: 'PHY is in MB2 today, not MB1 — the mock test has taken MB1. Same block, next door.',
    room: 'MB2',
  },
  {
    id: 'u2',
    professorId: 'p5',
    courseId: 'c6',
    ago: '40 min ago',
    kind: 'lab',
    text: 'PSC Lab 2 this afternoon is batch B only. Batch A, you are in Physics Lab 1 with Dr. Akhila. Read the sheet before you walk.',
  },
  {
    id: 'u3',
    professorId: 'p3',
    courseId: 'c3',
    ago: '1 hr ago',
    kind: 'moved',
    text: 'CAED moves to the Drawing Hall Annexe for open day — bring your board and mini-drafter, tables are smaller there.',
    room: 'Drawing Hall Annexe',
  },
  {
    id: 'u4',
    professorId: 'p1',
    courseId: 'c1',
    ago: '2 hrs ago',
    kind: 'notice',
    text: 'MAT tutorial quiz at 9 sharp tomorrow. No calculators, no phones, no “sir, one doubt”.',
  },
  {
    id: 'u5',
    professorId: 'p4',
    courseId: 'c4',
    ago: '3 hrs ago',
    kind: 'notice',
    text: 'ESC-I unit 2 notes are on the department board. Photocopy them before Friday — the queue at the shop is real.',
  },
  {
    id: 'u6',
    professorId: 'p6',
    courseId: 'c8',
    ago: 'yesterday',
    kind: 'notice',
    text: 'Kannada is combined this week: SK and BK together in MB1. Attendance is taken once.',
  },
  {
    id: 'u7',
    professorId: 'p8',
    courseId: 'c10',
    ago: 'yesterday',
    kind: 'notice',
    text: 'Soft skills attendance is compulsory. Yes, even the 3:30 pm slot on a Saturday.',
  },
];

export const NOTES: StudentNote[] = [
  {
    id: 'n1',
    name: 'first year students',
    role: 'CSE · Semester I',
    initials: 'FY',
    text: 'I can never find the first year CS lab. How is it my fault I am late when they keep changing it all the time?',
    ago: '2 hrs ago',
    kind: 'vent',
  },
  {
    id: 'n2',
    name: 'Class CR',
    role: 'CSE · Section A',
    initials: 'CR',
    text: 'It has suddenly become my responsibility to know where everything is and I have not even seen half the rooms yet.',
    ago: '4 hrs ago',
    kind: 'vent',
  },
  {
    id: 'n3',
    name: 'Second year, CSE',
    role: 'Section B',
    initials: 'SY',
    text: 'Followed Dr. Akhila in week one. Now I know about the lab swap before the CR does. Sorry, CR.',
    ago: 'yesterday',
    kind: 'tip',
  },
  {
    id: 'n4',
    name: 'Hostel block 3',
    role: 'CSE · Semester I',
    initials: 'HB',
    text: 'Three labs, two buildings and one pair of legs. The map pin is the only reason I reached CAED on time.',
    ago: 'yesterday',
    kind: 'tip',
  },
];

export const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const WEEKDAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const SEMESTER_LABEL = 'Semester I · CSE · Section A · Room MB1';
export const CAMPUS_LABEL = 'North Campus';

export function getCourse(id: string): Course {
  return COURSES.find((c) => c.id === id) ?? COURSES[0];
}

export function getProfessor(id: string): Professor {
  return PROFESSORS.find((p) => p.id === id) ?? PROFESSORS[0];
}

export function fmtTime(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}

export function sessionRoom(session: Session): string {
  return session.room ?? getCourse(session.courseId).room;
}

export function todayIndex(now = new Date()): number {
  return Math.min((now.getDay() + 6) % 7, 5);
}

export function daySessions(weekday: number): Session[] {
  return SESSIONS.filter((s) => s.weekday === weekday).sort((a, b) => a.start - b.start);
}

export interface NextUpResult {
  current: Session | null;
  next: Session | null;
  offset: number;
}

export function nextUp(sessions: Session[], now = new Date()): NextUpResult {
  const weekday = (now.getDay() + 6) % 7;
  const mins = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

  for (let offset = 0; offset < 14; offset += 1) {
    const day = (weekday + offset) % 7;
    if (day > 5) continue;
    const list = sessions.filter((s) => s.weekday === day).sort((a, b) => a.start - b.start);
    for (const session of list) {
      if (offset === 0 && mins >= session.start && mins < session.end) {
        return { current: session, next: null, offset };
      }
      if (session.start > mins) {
        return { current: null, next: session, offset };
      }
    }
  }
  return { current: null, next: null, offset: 0 };
}

export const DAY_START = 8 * 60 + 30;
export const DAY_END = 17 * 60;

export interface LiveState {
  weekday: number;
  minutes: number;
  today: Session[];
  current: Session | null;
  next: Session | null;
  nextDayOffset: number;
  progress: number;
  elapsedMs: number;
  remainingMs: number;
  startsInMs: number;
  position: number; // 0 → 1 across the teaching day
}

export function liveNow(now = new Date()): LiveState {
  const weekday = (now.getDay() + 6) % 7;
  const minutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
  const today = weekday <= 5 ? daySessions(weekday) : [];

  const current = today.find((s) => minutes >= s.start && minutes < s.end) ?? null;

  let next: Session | null = null;
  let nextDayOffset = 0;
  for (let offset = 0; offset < 8 && !next; offset += 1) {
    const day = (weekday + offset) % 7;
    if (day > 5) continue;
    const list = day === weekday ? today : daySessions(day);
    next = list.find((s) => (offset === 0 ? s.start > minutes : true)) ?? null;
    if (next) nextDayOffset = offset;
  }

  const progress = current ? (minutes - current.start) / (current.end - current.start) : 0;
  const position = Math.min(1, Math.max(0, (minutes - DAY_START) / (DAY_END - DAY_START)));

  return {
    weekday,
    minutes,
    today,
    current,
    next,
    nextDayOffset,
    progress,
    elapsedMs: current ? (minutes - current.start) * 60_000 : 0,
    remainingMs: current ? (current.end - minutes) * 60_000 : 0,
    startsInMs: next ? ((next.start - minutes) * 60_000 + nextDayOffset * 86_400_000) : 0,
    position,
  };
}

export function sessionStart(session: Session, now: Date, offset: number): Date {
  const d = new Date(now);
  d.setDate(d.getDate() + offset);
  d.setHours(Math.floor(session.start / 60), session.start % 60, 0, 0);
  return d;
}

export function sessionEnd(session: Session, now: Date, offset: number): Date {
  const d = new Date(now);
  d.setDate(d.getDate() + offset);
  d.setHours(Math.floor(session.end / 60), session.end % 60, 0, 0);
  return d;
}

export function nextSessionForCourse(courseId: string): Session | null {
  const list = SESSIONS.filter((s) => s.courseId === courseId).sort(
    (a, b) => a.weekday - b.weekday || a.start - b.start
  );
  return list[0] ?? null;
}

export function totalCredits(): number {
  return COURSES.reduce((sum, course) => sum + course.credits, 0);
}
