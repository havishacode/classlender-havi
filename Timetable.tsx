import type { CSSProperties } from 'react';
import {
  COURSES,
  fmtTime,
  getCourse,
  SESSIONS,
  sessionRoom,
  todayIndex,
  totalCredits,
  WEEKDAYS_SHORT,
  type Session,
} from '../data/campus';
import { useReveal } from '../lib/hooks';

interface Props {
  onOpen: (session: Session) => void;
}

const START = 8 * 60;
const SPAN = 10 * 60; // 8:00 → 18:00

const HOURS = Array.from({ length: 11 }, (_, i) => START + i * 60);

export default function Timetable({ onOpen }: Props) {
  const reveal = useReveal<HTMLElement>();
  const now = new Date();
  const today = todayIndex(now);
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  const nowMins = now.getHours() * 60 + now.getMinutes();

  return (
    <section className="section cal-section reveal" id="calendar" ref={reveal}>
      <header className="sec-head cal-head">
        <div>
          <p className="eyebrow">Semester I · CSE · Section A</p>
          <h2 className="sec-title">The class calendar</h2>
          <p className="sec-sub">
            {COURSES.length} papers · {totalCredits()} credits · MB1 is home base, the labs live in the
            annexes. Tap any block for the room, the landmark and the walk. Yellow blocks are labs,
            striped ones are rooms that moved.
          </p>
        </div>
        <ul className="cal-legend">
          <li>
            <span className="legend-swatch legend-usual" /> Lecture
          </li>
          <li>
            <span className="legend-swatch legend-lab" /> Lab
          </li>
          <li>
            <span className="legend-swatch legend-moved" /> Moved
          </li>
        </ul>
      </header>

      <div className="cal-scroll">
        <div className="cal">
          <div className="cal-corner" aria-hidden="true">
            <span>Wk 47</span>
          </div>

          <div className="cal-dayheads">
            {WEEKDAYS_SHORT.map((day, i) => {
              const date = new Date(monday);
              date.setDate(monday.getDate() + i);
              return (
                <div className={`cal-dayhead ${i === today ? 'is-today' : ''}`} key={day}>
                  <span className="cal-dayname">{day}</span>
                  <span className="cal-daynum">{date.getDate()}</span>
                </div>
              );
            })}
          </div>

          <div className="cal-hours" aria-hidden="true">
            {HOURS.map((h) => (
              <div className="cal-hour" key={h} style={{ top: `${((h - START) / SPAN) * 100}%` }}>
                <span>{fmtTime(h)}</span>
              </div>
            ))}
          </div>

          <div className="cal-cols">
            {WEEKDAYS_SHORT.map((day, dayIndex) => (
              <div className={`cal-col ${dayIndex === today ? 'is-today' : ''}`} key={day}>
                {HOURS.map((h) => (
                  <div
                    className="cal-line"
                    key={`${day}-${h}`}
                    style={{ top: `${((h - START) / SPAN) * 100}%` }}
                    aria-hidden="true"
                  />
                ))}

                {dayIndex === today && nowMins >= START && nowMins <= START + SPAN && (
                  <div className="cal-now" style={{ top: `${((nowMins - START) / SPAN) * 100}%` }}>
                    <span>now</span>
                  </div>
                )}

                {SESSIONS.filter((s) => s.weekday === dayIndex).map((session) => {
                  const course = getCourse(session.courseId);
                  const top = ((session.start - START) / SPAN) * 100;
                  const height = ((session.end - session.start) / SPAN) * 100;
                  const style = { top: `${top}%`, height: `calc(${height}% - 6px)` } as CSSProperties;
                  return (
                    <button
                      type="button"
                      key={session.id}
                      className={`cal-block cal-${session.status}`}
                      style={style}
                      onClick={() => onOpen(session)}
                      title={`${course.title} · ${course.code}`}
                    >
                      <span className="cal-block-time">{fmtTime(session.start)}</span>
                      <span className="cal-block-title">{course.short}</span>
                      <span className="cal-block-room">{sessionRoom(session)}</span>
                      {session.status === 'moved' && <span className="cal-block-flag">moved</span>}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
