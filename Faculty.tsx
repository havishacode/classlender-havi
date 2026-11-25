import { COURSES, getProfessor, nextSessionForCourse, type Session, totalCredits } from '../data/campus';
import { useReveal } from '../lib/hooks';
import { Arrow, BellIcon } from './Decor';

interface Props {
  follows: string[];
  onToggleFollow: (id: string, name: string) => void;
  onOpen: (session: Session) => void;
}

export default function Faculty({ follows, onToggleFollow, onOpen }: Props) {
  const reveal = useReveal<HTMLElement>();

  const openCourse = (courseId: string) => {
    const session = nextSessionForCourse(courseId);
    if (session) onOpen(session);
  };

  return (
    <section className="section fac-section reveal" id="faculty" ref={reveal}>
      <header className="sec-head">
        <p className="eyebrow">Eight instructors · {totalCredits()} credits</p>
        <h2 className="sec-title">Follow the person, not the group chat</h2>
        <p className="sec-sub">
          Every paper on the sheet with its code, credits and L:T:P:S split. Follow an instructor and
          anything they post shows up in your feed and rings the bell up top.
        </p>
      </header>

      <div className="fac-grid">
        {COURSES.map((course, index) => {
          const prof = getProfessor(course.professorId);
          const following = follows.includes(prof.id);
          return (
            <article className={`fac-card fac-card-${(index % 3) + 1} ${following ? 'is-followed' : ''}`} key={course.id}>
              <div className="fac-top">
                <span className="avatar fac-avatar" aria-hidden="true">
                  {prof.initials}
                </span>
                <div className="fac-id">
                  <span className="fac-subject">{course.title}</span>
                  <span className="fac-code">{course.code}</span>
                </div>
                {prof.posting && (
                  <span className="fac-live">
                    <span className="live-dot" aria-hidden="true" />
                    posting
                  </span>
                )}
              </div>

              <h3 className="fac-name">{prof.name}</h3>
              <p className="fac-dept">
                {prof.dept} · {prof.cabin}
              </p>

              <dl className="fac-facts">
                <div>
                  <dt>Credits</dt>
                  <dd>{course.credits}</dd>
                </div>
                <div>
                  <dt>L:T:P:S</dt>
                  <dd>{course.ltps}</dd>
                </div>
                <div>
                  <dt>Room</dt>
                  <dd>{course.room}</dd>
                </div>
                <div>
                  <dt>Where</dt>
                  <dd>
                    {course.building}, {course.floor}
                  </dd>
                </div>
              </dl>

              <div className="fac-actions">
                <button
                  type="button"
                  className={`follow ${following ? 'is-on' : ''}`}
                  onClick={() => onToggleFollow(prof.id, prof.name)}
                  aria-pressed={following}
                >
                  <BellIcon className="follow-bell" />
                  {following ? 'Following' : 'Follow'}
                </button>
                <button type="button" className="link-btn" onClick={() => openCourse(course.id)}>
                  Open class <Arrow className="link-arrow" />
                </button>
              </div>

              {following && <span className="fac-stamp" aria-hidden="true">following</span>}
            </article>
          );
        })}
      </div>
    </section>
  );
}
