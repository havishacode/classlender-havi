import { useMemo, useState } from 'react';
import TopBar from './TopBar';
import NextUp from './NextUp';
import TodayRail from './TodayRail';
import Timetable from './Timetable';
import Faculty from './Faculty';
import ScrollStory from './ScrollStory';
import StudentNotes from './StudentNotes';
import ClassTracker from './ClassTracker';
import UpdatesFeed from './UpdatesFeed';
import LectureModal from './LectureModal';
import { Flower, Halftone, Sparkle, Tape } from './Decor';
import {
  COURSES,
  type Session,
  type ThemeId,
  type UpdateItem,
  UPDATES,
  getProfessor,
} from '../data/campus';

interface Props {
  theme: ThemeId;
  follows: string[];
  onToggleFollow: (id: string, name: string) => void;
  onSwitch: () => void;
  onBack: () => void;
  notify: (text: string, tone?: 'good' | 'muted') => void;
}

export default function Experience({ theme, follows, onToggleFollow, onSwitch, onBack, notify }: Props) {
  const [selected, setSelected] = useState<Session | null>(null);
  const [pings, setPings] = useState<UpdateItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'following'>('all');
  const [unread, setUnread] = useState(2);

  const updates = useMemo(() => [...pings, ...UPDATES], [pings]);
  const dateLabel = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const handlePing = () => {
    const prof = getProfessor(follows[0] ?? 'p1');
    const course = COURSES.find((c) => c.professorId === prof.id) ?? COURSES[0];
    const nextRoom = course.room.replace(/(\d+)$/, (m) => String(Number(m) + 1));
    const ping: UpdateItem = {
      id: `ping-${Date.now()}`,
      professorId: prof.id,
      courseId: course.id,
      ago: 'just now',
      kind: 'moved',
      text: `Room swap: ${course.title} moves to ${nextRoom} — one door down in the ${course.building}. Same time, same floor, look for ${course.landmark}.`,
      room: nextRoom,
      fresh: true,
    };
    setPings((current) => [ping, ...current].slice(0, 4));
    setUnread((count) => count + 1);
    notify(`New ping from ${prof.short} — it is at the top of the feed.`);
  };

  const handleBell = () => {
    setUnread(0);
    document.getElementById('updates')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={`xp theme-${theme}`} id="experience">
      <TopBar
        theme={theme}
        unread={unread}
        follows={follows.length}
        onBell={handleBell}
        onSwitch={onSwitch}
        onBack={onBack}
      />

      {theme === 'comic' ? (
        <ComicCover dateLabel={dateLabel} follows={follows.length} />
      ) : (
        <WhimsyCover dateLabel={dateLabel} follows={follows.length} />
      )}

      <main className="xp-main">
        <NextUp follows={follows} onOpen={setSelected} onToggleFollow={onToggleFollow} />
        <ClassTracker onOpen={setSelected} />
        <TodayRail onOpen={setSelected} />
        <Timetable onOpen={setSelected} />
        <Faculty follows={follows} onToggleFollow={onToggleFollow} onOpen={setSelected} />
        <ScrollStory theme={theme} />
        <StudentNotes />
        <UpdatesFeed
          updates={updates}
          follows={follows}
          filter={filter}
          onFilter={setFilter}
          onPing={handlePing}
          onOpen={setSelected}
          onFollowCourse={onToggleFollow}
        />
      </main>

      <footer className="foot">
        <div className="foot-inner">
          <div>
            <span className="foot-mark">NIE Mysore</span>
            <p className="foot-note">
              North Campus · concept prototype · timetable from the CSE Semester I sheet · rooms,
              landmarks and cabin numbers are sample data
            </p>
          </div>
          <div className="foot-links">
            <button type="button" onClick={onSwitch}>
              Switch to {theme === 'comic' ? 'whimsy' : 'comic'}
            </button>
            <button type="button" onClick={onBack}>
              Back to the theme picker
            </button>
            <a href="#next">Back to top ↑</a>
          </div>
        </div>
      </footer>

      {selected && (
        <LectureModal
          session={selected}
          follows={follows}
          onToggleFollow={onToggleFollow}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function ComicCover({ dateLabel, follows }: { dateLabel: string; follows: number }) {
  return (
    <section className="cover cover-comic">
      <Halftone className="cover-dots" />
      <div className="cover-inner">
        <div className="cover-mast">
          <span className="cover-issue">Issue 01 · {dateLabel}</span>
          <h1 className="cover-title">The Class Calendar</h1>
          <span className="cover-price">Free · NIE Mysore</span>
        </div>
        <div className="cover-strip">
          <div className="cover-copy">
            <p className="cover-lede">
              Ten papers, eight instructors, one north-campus quad, and a timetable that changes its
              mind. Follow the profs you actually have — the rest of the day sorts itself out.
            </p>
            <div className="chip-row">
              <span className="chip">{follows} following</span>
              <span className="chip">10 papers</span>
              <span className="chip">20 credits</span>
              <span className="chip">live room changes</span>
            </div>
          </div>
          <div className="cover-bubble">
            “Where is <strong>LH-204</strong>?”
            <span>— you, 8:58 am</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhimsyCover({ dateLabel, follows }: { dateLabel: string; follows: number }) {
  return (
    <section className="cover cover-whimsy">
      <Tape className="cover-tape" />
      <Flower className="cover-flower" />
      <Flower className="cover-flower2" tone="teal" />
      <Sparkle className="cover-spark" />
      <div className="cover-inner">
        <p className="cover-date">{dateLabel}</p>
        <h1>
          your little <em>class calendar</em>
        </h1>
                  <p className="cover-lede">
          for the mornings when the timetable feels like a rumour. ten papers, eight instructors,
          and one very calm page.
        </p>
        <div className="cover-note">
          {follows > 0
            ? `${follows} instructor${follows === 1 ? '' : 's'} followed ♡`
            : 'start by following an instructor below ↓'}
        </div>
      </div>
    </section>
  );
}
