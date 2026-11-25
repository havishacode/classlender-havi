import { useRef } from 'react';
import {
  fmtTime,
  getCourse,
  getProfessor,
  SESSIONS,
  sessionRoom,
  WEEKDAYS,
  type Session,
} from '../data/campus';
import { Arrow } from './Decor';
import { useReveal } from '../lib/hooks';

interface Props {
  onOpen: (session: Session) => void;
}

export default function TodayRail({ onOpen }: Props) {
  const reveal = useReveal<HTMLElement>();
  const scroller = useRef<HTMLDivElement>(null);
  const rawDay = (new Date().getDay() + 6) % 7;
  const sunday = rawDay > 5;
  const day = sunday ? 0 : rawDay;
  const list = SESSIONS.filter((s) => s.weekday === day).sort((a, b) => a.start - b.start);

  const nudge = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });
  };

  return (
    <section className="section rail-section reveal" ref={reveal}>
      <header className="sec-head rail-head">
        <div>
          <p className="eyebrow">{sunday ? 'Sunday · Monday is next' : 'The day, in a row'}</p>
          <h2 className="sec-title">{WEEKDAYS[day]}'s roll call</h2>
          <p className="sec-sub">Swipe through it — every card has the room and a way to get there.</p>
        </div>
        <div className="rail-btns">
          <button type="button" className="rail-btn" onClick={() => nudge(-1)} aria-label="Previous classes">
            <Arrow dir="left" />
          </button>
          <button type="button" className="rail-btn" onClick={() => nudge(1)} aria-label="More classes">
            <Arrow />
          </button>
        </div>
      </header>

      <div className="rail" ref={scroller}>
        {list.map((session, index) => {
          const course = getCourse(session.courseId);
          const prof = getProfessor(course.professorId);
          return (
            <button
              type="button"
              className={`rail-card rail-${session.status}`}
              key={session.id}
              onClick={() => onOpen(session)}
            >
              <span className="rail-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="rail-time">{fmtTime(session.start)}</span>
              <span className="rail-title">{course.title}</span>
              <span className="rail-prof">{prof.short}</span>
              <span className="rail-room">
                {sessionRoom(session)} · {course.building}
              </span>
              <span className="rail-foot">
                {session.status === 'moved' ? 'Room changed' : session.status === 'lab' ? 'Lab session' : 'On timetable'}
                <Arrow className="rail-arrow" />
              </span>
            </button>
          );
        })}
        {list.length === 0 && <p className="rail-empty">No classes today. Sleep in, legend.</p>}
      </div>
    </section>
  );
}
