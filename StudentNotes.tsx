import { NOTES, type StudentNote } from '../data/campus';
import { useReveal } from '../lib/hooks';
import { PinIcon } from './Decor';

function NoteCard({ note, index }: { note: StudentNote; index: number }) {
  return (
    <article className={`note-card note-${note.kind} note-rot-${index % 4}`}>
      <span className="note-quote" aria-hidden="true">
        “
      </span>
      <p className="note-text">{note.text}</p>
      <footer className="note-foot">
        <span className="avatar note-avatar" aria-hidden="true">
          {note.initials}
        </span>
        <span className="note-who">
          <strong>{note.name}</strong>
          <small>{note.role}</small>
        </span>
        <span className="note-ago">{note.ago}</span>
      </footer>
    </article>
  );
}

export default function StudentNotes() {
  const reveal = useReveal<HTMLElement>();

  return (
    <section className="section notes-section reveal" id="notes" ref={reveal}>
      <header className="sec-head notes-head">
        <div>
          <p className="eyebrow">The noticeboard, student edition</p>
          <h2 className="sec-title">Notes from people who got lost this week</h2>
          <p className="sec-sub">
            Pinned by first years, second years and one very tired class representative. Room
            number wrong? Add a note — it goes straight to the batch, not just the group chat with
            four people in it.
          </p>
        </div>
        <span className="notes-count">
          <PinIcon className="btn-icon" />
          {NOTES.length} notes pinned this week
        </span>
      </header>

      <div className="notes-grid">
        {NOTES.map((note, index) => (
          <NoteCard note={note} index={index} key={note.id} />
        ))}
      </div>

      <p className="notes-foot">
        Anonymous by default · the CR is not responsible for rooms they have never seen either.
      </p>
    </section>
  );
}
