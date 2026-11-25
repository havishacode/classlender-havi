import { COURSES, getCourse, getProfessor, nextSessionForCourse, type Session, type UpdateItem } from '../data/campus';
import { useReveal } from '../lib/hooks';
import { Arrow, BellIcon, PinIcon } from './Decor';

interface Props {
  updates: UpdateItem[];
  follows: string[];
  filter: 'all' | 'following';
  onFilter: (filter: 'all' | 'following') => void;
  onPing: () => void;
  onOpen: (session: Session) => void;
  onFollowCourse: (professorId: string, name: string) => void;
}

export default function UpdatesFeed({
  updates,
  follows,
  filter,
  onFilter,
  onPing,
  onOpen,
  onFollowCourse,
}: Props) {
  const reveal = useReveal<HTMLElement>();
  const visible = filter === 'all' ? updates : updates.filter((u) => follows.includes(u.professorId));

  const openFor = (courseId: string) => {
    const session = nextSessionForCourse(courseId);
    if (session) onOpen(session);
  };

  return (
    <section className="section feed-section reveal" id="updates" ref={reveal}>
      <header className="sec-head feed-head">
        <div>
          <p className="eyebrow">Straight from the staff room</p>
          <h2 className="sec-title">The ping feed</h2>
          <p className="sec-sub">
            Room swaps, lab rules and last-minute quizzes. Follow an instructor and their pings land
            here first.
          </p>
        </div>
        <button type="button" className="btn btn-ghost ping-btn" onClick={onPing}>
          <BellIcon className="btn-icon" />
          Send me a demo ping
        </button>
      </header>

      <div className="feed-tools">
        <div className="seg" role="group" aria-label="Filter updates">
          <button
            type="button"
            className={filter === 'all' ? 'is-on' : ''}
            onClick={() => onFilter('all')}
            aria-pressed={filter === 'all'}
          >
            Everyone
          </button>
          <button
            type="button"
            className={filter === 'following' ? 'is-on' : ''}
            onClick={() => onFilter('following')}
            aria-pressed={filter === 'following'}
          >
            Following only
          </button>
        </div>
        <span className="feed-count">
          {visible.length} update{visible.length === 1 ? '' : 's'}
        </span>
      </div>

      {filter === 'following' && follows.length === 0 ? (
        <div className="feed-empty">
          <p>You are not following anyone yet.</p>
          <div className="feed-empty-rows">
            {COURSES.slice(0, 3).map((course) => {
              const prof = getProfessor(course.professorId);
              return (
                <button
                  type="button"
                  className="btn btn-mini"
                  key={prof.id}
                  onClick={() => onFollowCourse(prof.id, prof.name)}
                >
                  Follow {prof.short}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <ul className="feed">
          {visible.map((update) => {
            const course = getCourse(update.courseId);
            const prof = getProfessor(update.professorId);
            const following = follows.includes(prof.id);
            return (
              <li className={`feed-item feed-${update.kind} ${update.fresh ? 'is-fresh' : ''}`} key={update.id}>
                <span className="avatar feed-avatar" aria-hidden="true">
                  {prof.initials}
                </span>
                <div className="feed-body">
                  <div className="feed-topline">
                    <span className="feed-name">{prof.name}</span>
                    <span className="feed-subject">{course.title}</span>
                    <span className="feed-ago">{update.ago}</span>
                  </div>
                  <p className="feed-text">{update.text}</p>
                  <div className="feed-meta">
                    {update.kind === 'moved' && <span className="tag tag-moved">Room change</span>}
                    {update.kind === 'lab' && <span className="tag tag-lab">Lab note</span>}
                    {update.kind === 'notice' && <span className="tag tag-notice">Notice</span>}
                    {update.room && (
                      <span className="feed-room">
                        <PinIcon className="inline-pin" /> {update.room}
                      </span>
                    )}
                  </div>
                </div>
                <div className="feed-actions">
                  <button type="button" className="link-btn" onClick={() => openFor(update.courseId)}>
                    Navigate <Arrow className="link-arrow" />
                  </button>
                  {!following && (
                    <button
                      type="button"
                      className="quiet-btn"
                      onClick={() => onFollowCourse(prof.id, prof.name)}
                    >
                      + Follow
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
