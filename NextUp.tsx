import {
  fmtTime,
  getCourse,
  getProfessor,
  nextUp,
  sessionEnd,
  sessionRoom,
  sessionStart,
  SESSIONS,
  WEEKDAYS,
  type Session,
} from '../data/campus';
import { pad2, useClock } from '../lib/hooks';
import { Arrow, PinIcon } from './Decor';

interface Props {
  follows: string[];
  onOpen: (session: Session) => void;
  onToggleFollow: (id: string, name: string) => void;
}

export default function NextUp({ follows, onOpen, onToggleFollow }: Props) {
  const now = useClock();
  const { current, next, offset } = nextUp(SESSIONS, now);
  const session = current ?? next;
  if (!session) return null;

  const course = getCourse(session.courseId);
  const prof = getProfessor(course.professorId);
  const room = sessionRoom(session);
  const following = follows.includes(prof.id);
  const target = current ? sessionEnd(session, now, 0) : sessionStart(session, now, offset);
  const delta = Math.max(0, target.getTime() - now.getTime());
  const hours = Math.floor(delta / 3_600_000);
  const mins = Math.floor(delta / 60_000) % 60;
  const secs = Math.floor(delta / 1000) % 60;

  const dayLabel = offset === 0 ? (current ? 'on now' : 'today') : offset === 1 ? 'tomorrow' : WEEKDAYS[session.weekday];

  return (
    <section className="section nextup-wrap" id="next">
      <div className="nextup reveal">
        <div className="nextup-main">
          <p className="eyebrow">
            {current ? 'In progress' : 'Next on your timetable'} · {dayLabel}
          </p>
          <h2 className="nextup-title">
            {course.title}
            <span className="nextup-code">{course.code}</span>
          </h2>

          <div className="nextup-meta">
            <span className="meta-line">
              <strong>{fmtTime(session.start)}</strong> – {fmtTime(session.end)}
            </span>
            <span className="meta-line">
              <strong>{room}</strong> · {course.building}, {course.floor}
            </span>
            <span className="meta-line meta-credits">
              {course.code} · {course.credits} credit{course.credits === 1 ? '' : 's'}
            </span>
          </div>

          {session.status === 'moved' && (
            <p className="nextup-moved">
              <span className="tag tag-moved">Room changed</span>
              {(session.note ?? 'Check the latest ping before you walk over.').replace('Moved from ', 'Was in ')}
            </p>
          )}
          {session.note && session.status !== 'moved' && <p className="nextup-moved">{session.note}</p>}

          <p className="nextup-landmark">
            <PinIcon className="inline-pin" />
            Look for <strong>{course.landmark}</strong>.
          </p>

          <div className="nextup-actions">
            <button type="button" className="btn btn-primary" onClick={() => onOpen(session)}>
              Navigate to lecture
              <Arrow className="btn-arrow" />
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => onOpen(session)}>
              Class details
            </button>
          </div>

          <div className="nextup-prof">
            <span className="avatar avatar-sm" aria-hidden="true">
              {prof.initials}
            </span>
            <span className="nextup-prof-name">
              {prof.name}
              <small>{prof.dept}</small>
            </span>
            <button
              type="button"
              className={`follow ${following ? 'is-on' : ''}`}
              onClick={() => onToggleFollow(prof.id, prof.name)}
              aria-pressed={following}
            >
              {following ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>

        <aside className="nextup-clock">
          <span className="clock-label">{current ? 'Ends in' : 'Starts in'}</span>
          <span className="clock-digits">
            {hours > 0 && (
              <>
                {pad2(hours)}
                <em>:</em>
              </>
            )}
            {pad2(mins)}
            <em>:</em>
            {pad2(secs)}
          </span>
          <span className="clock-day">{WEEKDAYS[session.weekday]} · {fmtTime(session.start)}</span>
          <span className="clock-walk">{course.walk} from the quad</span>
        </aside>
      </div>
    </section>
  );
}
