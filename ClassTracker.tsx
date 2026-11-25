import { useMemo } from 'react';
import {
  DAY_END,
  DAY_START,
  fmtTime,
  getCourse,
  getProfessor,
  liveNow,
  sessionRoom,
  WEEKDAYS,
  type Session,
} from '../data/campus';
import { pad2, useClock, useReveal } from '../lib/hooks';
import { Arrow, PinIcon } from './Decor';

interface Props {
  onOpen: (session: Session) => void;
}

function hms(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return h > 0 ? `${h}:${pad2(m)}:${pad2(s)}` : `${pad2(m)}:${pad2(s)}`;
}

function clampPct(value: number) {
  return Math.min(100, Math.max(0, value));
}

export default function ClassTracker({ onOpen }: Props) {
  const now = useClock();
  const reveal = useReveal<HTMLElement>();
  const live = useMemo(() => liveNow(now), [now]);

  const minutes = now.getHours() * 60 + now.getMinutes();
  const clock = `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`;

  const session = live.current ?? live.next;
  const course = session ? getCourse(session.courseId) : null;
  const prof = course ? getProfessor(course.professorId) : null;

  const periodIndex = session ? live.today.findIndex((s) => s.id === session.id) + 1 : 0;
  const isToday = session ? live.nextDayOffset === 0 || live.current !== null : false;

  let kicker = 'Live class tracker';
  let title = 'Nothing on the sheet right now';
  let meta = 'Sunday. Even the timetable has taken the day off.';
  let countLabel = 'Next class';
  let countValue = '—';
  let countNote = 'Monday · 9:00 am';
  let progress = 0;

  if (live.current && course) {
    kicker = `On now · period ${periodIndex} of ${live.today.length}`;
    title = course.title;
    meta = `${sessionRoom(live.current)} · ${course.building}, ${course.floor} · ${prof?.short ?? ''}`;
    countLabel = 'Ends in';
    countValue = hms(live.remainingMs);
    countNote = `${fmtTime(live.current.start)} – ${fmtTime(live.current.end)}`;
    progress = live.progress;
  } else if (live.next && course) {
    const dayLabel = isToday ? 'today' : WEEKDAYS[live.next.weekday];
    kicker = isToday ? `Next up · period ${periodIndex} of ${live.today.length}` : `Next class · ${dayLabel}`;
    title = course.title;
    meta = `${sessionRoom(live.next)} · ${course.building}, ${course.floor} · ${prof?.short ?? ''}`;
    countLabel = 'Starts in';
    countValue = hms(live.startsInMs);
    countNote = `${dayLabel} · ${fmtTime(live.next.start)}`;
  } else if (live.today.length > 0) {
    const last = live.today[live.today.length - 1];
    kicker = 'Done for today';
    title = 'That is the last period';
    meta = `You finished at ${fmtTime(last.end)}. Go eat something that is not biscuits.`;
    countValue = '—';
    countNote = 'Tomorrow · 9:00 am';
  }

  const span = DAY_END - DAY_START;
  const nowLeft = clampPct(((minutes - DAY_START) / span) * 100);

  return (
    <section className="section tracker-section reveal" id="tracker" ref={reveal} aria-label="Real-time class tracker">
      <div className="tracker">
        <div className="tracker-top">
          <span className="tracker-live">
            <span className="live-dot" aria-hidden="true" />
            live · north campus
          </span>
          <span className="tracker-clock" aria-label={`Campus clock ${clock}`}>
            {clock}
          </span>
        </div>

        <div className="tracker-now">
          <div className="tracker-now-main">
            <p className="tracker-kicker">{kicker}</p>
            <h2 className="tracker-title">{title}</h2>
            <p className="tracker-meta">{meta}</p>
            {live.current?.status === 'moved' && (
              <p className="tracker-note-moved">
                <PinIcon className="inline-pin" /> Room changed — follow the latest ping, not the printout.
              </p>
            )}
          </div>

          <div className="tracker-count">
            <span className="tracker-count-label">{countLabel}</span>
            <span className="tracker-count-value">{countValue}</span>
            <span className="tracker-count-note">{countNote}</span>
          </div>
        </div>

        <div
          className="tracker-bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          aria-label={live.current ? 'Period progress' : 'Between periods'}
        >
          <span className="tracker-bar-fill" style={{ width: `${clampPct(progress * 100)}%` }} />
        </div>

        <div className="tracker-track" aria-label="Today's periods">
          {live.today.map((item) => {
            const itemCourse = getCourse(item.courseId);
            const left = clampPct(((item.start - DAY_START) / span) * 100);
            const width = clampPct(((item.end - item.start) / span) * 100);
            const isNow = live.current?.id === item.id;
            return (
              <button
                type="button"
                key={item.id}
                className={`tracker-block tracker-${item.status} ${isNow ? 'is-now' : ''}`}
                style={{ left: `${left}%`, width: `${width}%` }}
                onClick={() => onOpen(item)}
                title={`${itemCourse.title} · ${fmtTime(item.start)} · ${sessionRoom(item)}`}
              >
                <span className="tracker-block-code">{itemCourse.short}</span>
                <span className="tracker-block-time">{fmtTime(item.start)}</span>
              </button>
            );
          })}

          {live.today.length > 0 && (
            <span className="tracker-now-mark" style={{ left: `${nowLeft}%` }}>
              <span className="tracker-now-dot" />
              <span className="tracker-now-label">now</span>
            </span>
          )}
        </div>

        <div className="tracker-axis" aria-hidden="true">
          <span>8:30 am</span>
          <span>12:00 pm</span>
          <span>5:00 pm</span>
        </div>

        <p className="tracker-foot">
          {live.today.length > 0 ? (
            <>
              {live.today.length} periods on the sheet today · tap a block to navigate
            </>
          ) : (
            <>Classes resume Monday. The tracker picks itself back up at 9:00 am.</>
          )}
          <a className="tracker-jump" href="#calendar">
            See the full week <Arrow className="link-arrow" />
          </a>
        </p>
      </div>
    </section>
  );
}
