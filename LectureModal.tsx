import { useEffect, useState } from 'react';
import {
  fmtTime,
  getCourse,
  getProfessor,
  sessionRoom,
  WEEKDAYS,
  type Session,
} from '../data/campus';
import { Arrow, BellIcon, PinIcon } from './Decor';
import CampusMap from './CampusMap';

interface Props {
  session: Session;
  follows: string[];
  onToggleFollow: (id: string, name: string) => void;
  onClose: () => void;
}

export default function LectureModal({ session, follows, onToggleFollow, onClose }: Props) {
  const [view, setView] = useState<'detail' | 'map'>('detail');
  const course = getCourse(session.courseId);
  const prof = getProfessor(course.professorId);
  const room = sessionRoom(session);
  const following = follows.includes(prof.id);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  const arriveBy = session.start - 5;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={`${course.title} details`}>
      <button type="button" className="modal-scrim" onClick={onClose} aria-label="Close" />
      <div className="modal-card">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {view === 'detail' ? (
          <>
            <div className="detail-head">
              <span className="detail-code">{course.code}</span>
              <h2 className="detail-title">{course.title}</h2>
              <p className="detail-when">
                {WEEKDAYS[session.weekday]} · {fmtTime(session.start)} – {fmtTime(session.end)}
              </p>
              <p className="detail-credits">
                {course.credits} credit{course.credits === 1 ? '' : 's'} · L:T:P:S {course.ltps}
              </p>
            </div>

            <div className="detail-prof">
              <span className="avatar" aria-hidden="true">
                {prof.initials}
              </span>
              <div className="detail-prof-text">
                <strong>{prof.name}</strong>
                <small>
                  {prof.dept} · cabin {prof.cabin}
                </small>
              </div>
              <button
                type="button"
                className={`follow ${following ? 'is-on' : ''}`}
                onClick={() => onToggleFollow(prof.id, prof.name)}
                aria-pressed={following}
              >
                <BellIcon className="follow-bell" />
                {following ? 'Following' : 'Follow'}
              </button>
            </div>

            <div className="detail-grid">
              <div className="detail-cell">
                <span className="detail-label">Room</span>
                <span className="detail-value">{room}</span>
              </div>
              <div className="detail-cell">
                <span className="detail-label">Building</span>
                <span className="detail-value">{course.building}</span>
              </div>
              <div className="detail-cell">
                <span className="detail-label">Floor</span>
                <span className="detail-value">{course.floor}</span>
              </div>
              <div className="detail-cell">
                <span className="detail-label">Walk</span>
                <span className="detail-value">{course.walk}</span>
              </div>
            </div>

            <p className="detail-landmark">
              <PinIcon className="inline-pin" />
              Look for <strong>{course.landmark}</strong> when you get there.
            </p>

            {session.note && <p className="detail-note">{session.note}</p>}

            <div className="detail-actions">
              <button type="button" className="btn btn-primary" onClick={() => setView('map')}>
                Navigate to lecture
                <Arrow className="btn-arrow" />
              </button>
              <button type="button" className="btn btn-ghost" onClick={onClose}>
                Close
              </button>
            </div>
          </>
        ) : (
          <>
            <button type="button" className="modal-back" onClick={() => setView('detail')}>
              <Arrow dir="left" className="link-arrow" /> Back to class
            </button>
            <div className="map-head">
              <p className="eyebrow">Navigating to</p>
              <h2 className="map-title">
                {room}
                <span>
                  {course.building} · {course.floor}
                </span>
              </h2>
            </div>

            <CampusMap courseId={course.id} room={room} />

            <div className="map-landmark-card">
              <span className="map-landmark-icon" aria-hidden="true">
                <PinIcon />
              </span>
              <div>
                <span className="detail-label">Landmark to look for</span>
                <p>{course.landmark}</p>
              </div>
            </div>

            <ol className="steps">
              {course.steps.map((step, i) => (
                <li key={step}>
                  <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className="map-foot">
              <span>
                {course.walk} · leave by <strong>{fmtTime(arriveBy)}</strong> to be early
              </span>
              <button type="button" className="btn btn-primary" onClick={onClose}>
                Got it
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
