import { useScrollProgress } from '../lib/hooks';
import { Burst, Flower, Halftone, Sparkle, Tape } from './Decor';
import type { ThemeId } from '../data/campus';

interface Props {
  active: ThemeId | null;
  followsCount: number;
  onChoose: (theme: ThemeId) => void;
}

const TICKER = [
  'Follow your prof',
  'Get the ping',
  'Navigate to lecture',
  'Ten papers',
  'Zero wrong corridors',
];

export default function Landing({ active, followsCount, onChoose }: Props) {
  const [heroRef, progress] = useScrollProgress<HTMLDivElement>();

  return (
    <div className="landing">
      <div className="landing-nav">
        <span className="nav-mark">
          <span className="nav-mark-box">NIE</span>
          <span className="nav-mark-text">
            Mysore <em>· Class Calendar</em>
          </span>
        </span>
        <div className="landing-nav-right">
          <span className="nav-note">North Campus · CSE · Semester I</span>
          <a className="nav-link" href="#fork">
            Pick a theme ↓
          </a>
        </div>
      </div>

      <div className="hero" ref={heroRef}>
        <div className="hero-sky" aria-hidden="true" />
        <div className="hero-rays" aria-hidden="true" />
        <div className="hero-band" aria-hidden="true">
          <Halftone className="hero-band-dots" />
        </div>
        <Halftone className="hero-dots" />

        <div
          className="hero-inner"
          style={{ transform: `translate3d(0, ${progress * -70}px, 0)`, opacity: 1 - progress * 0.35 }}
        >
          <p className="hero-eyebrow">Welcome to</p>
          <h1 className="hero-title">
            National Institute
            <br />
            of Engineering
          </h1>
          <p className="hero-place">MYSORE</p>
          <p className="hero-campus">North Campus · CSE · Semester I · 20 credits</p>
          <p className="hero-lede">
            Ten papers. Eight instructors. One north-campus quad. And a timetable that changes five
            minutes before you leave the hostel. Follow your instructors, catch the room change, and
            walk in like you own the corridor.
          </p>
          <div className="hero-actions">
            <a className="btn btn-pop" href="#fork">
              Pick your theme
            </a>
            <a className="btn btn-outline-light" href="#how">
              How it works
            </a>
          </div>
          <p className="hero-footnote">
            {followsCount > 0
              ? `${followsCount} instructor${followsCount === 1 ? '' : 's'} followed on this device`
              : 'No app store. No login. Just your timetable.'}
          </p>
        </div>

        <div
          className="hero-bubble"
          style={{ transform: `translate3d(0, ${progress * 40}px, 0) rotate(3deg)` }}
        >
          <span className="hero-bubble-quote">“LH-204 is not in the Main Block. Ask me how I know.”</span>
          <span className="hero-bubble-by">— every first-year, ever</span>
        </div>

        <Burst className="hero-burst" style={{ transform: `rotate(-9deg) translateY(${progress * 60}px)` }}>
          Live room
          <br />
          updates
        </Burst>

        <Burst className="hero-burst2">
          <Sparkle className="burst-spark" />
          3 buildings
        </Burst>

        <a className="scroll-cue" href="#fork" aria-label="Scroll to pick a theme">
          <span>scroll</span>
          <span className="scroll-cue-line" aria-hidden="true" />
        </a>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((item, i) => (
              <span className="marquee-item" key={`${item}-${i}`}>
                {item}
                <Sparkle className="marquee-star" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="fork" id="fork">
        <Halftone className="fork-dots fork-dots-a" />
        <Halftone className="fork-dots fork-dots-b" />
        <header className="fork-head reveal">
          <p className="fork-eyebrow">Step one · pick a world</p>
          <h2 className="fork-title">
            Same timetable.
            <br />
            Two very different <span className="fork-em">vibes.</span>
          </h2>
          <p className="fork-sub">
            Both are the full app: your ten papers, eight instructors, the real-time class tracker,
            the student noticeboard and turn-by-turn directions to the right door. Only the look
            changes.
          </p>
        </header>

        <div className="world-grid">
          <article className={`world world-comic ${active === 'comic' ? 'is-live' : ''}`}>
            <button
              type="button"
              className="world-hit"
              onClick={() => onChoose('comic')}
              aria-label="Enter the comic theme"
            />
            <div className="world-art world-art-comic" aria-hidden="true">
              <Halftone className="world-art-dots" />
              <div className="comic-kapow">CLASS<br />IS<br />LIVE!</div>
              <div className="comic-say">“Follow me. Room changed.”</div>
              <div className="comic-speed" />
              <div className="comic-tag">ISSUE #01</div>
            </div>
            <div className="world-body">
              <span className="world-kicker">Theme 01</span>
              <h3 className="world-name">Comic</h3>
              <p className="world-desc">
                Halftone dots, hard shadows and speech bubbles. Loud, fast, and built like a
                Saturday-morning cartoon.
              </p>
              <ul className="world-points">
                <li>Panel-strip timetable</li>
                <li>POW-style ping feed</li>
                <li>Map with a route that inks itself</li>
              </ul>
              <span className="world-cta">
                Enter Comic Theme
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </article>

          <article className={`world world-whimsy ${active === 'whimsy' ? 'is-live' : ''}`}>
            <button
              type="button"
              className="world-hit"
              onClick={() => onChoose('whimsy')}
              aria-label="Enter the whimsy theme"
            />
            <div className="world-art world-art-whimsy" aria-hidden="true">
              <div className="whimsy-scallop" />
              <Tape className="tape-a" />
              <Tape className="tape-b" />
              <div className="whimsy-polaroid">
                <span className="polaroid-time">Tue · 9:00 am</span>
                <span className="polaroid-room">MB1</span>
                <span className="polaroid-note">ground floor, past the blue ramp</span>
              </div>
              <Flower className="whimsy-flower" />
              <Flower className="whimsy-flower2" tone="teal" />
              <Sparkle className="whimsy-spark" />
              <div className="whimsy-note">you are<br />here ♡</div>
            </div>
            <div className="world-body">
              <span className="world-kicker">Theme 02</span>
              <h3 className="world-name">Whimsy</h3>
              <p className="world-desc">
                Scrapbook paper, washi tape and a very calm handwritten note. For the days you need
                the schedule to be gentle with you.
              </p>
              <ul className="world-points">
                <li>Scrapbook page timetable</li>
                <li>Taped notes for every ping</li>
                <li>An illustrated little campus map</li>
              </ul>
              <span className="world-cta">
                Enter Whimsy Theme
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </article>
        </div>

        <div className="fork-how" id="how">
          <div className="how-item">
            <span className="how-num">01</span>
            <h4>Follow the instructor</h4>
            <p>Not the group chat, not the notice board. The person actually holding the class.</p>
          </div>
          <div className="how-item">
            <span className="how-num">02</span>
            <h4>Get the ping</h4>
            <p>Room swaps, lab rules, surprise quizzes. It reaches you before you reach the wrong door.</p>
          </div>
          <div className="how-item">
            <span className="how-num">03</span>
            <h4>Navigate to lecture</h4>
            <p>Exact block, floor and room — plus the landmark to look for when you get there.</p>
          </div>
        </div>

        <p className="fork-note">
          Concept prototype · NIE Mysore, North Campus · timetable from the CSE Semester I sheet
        </p>
      </section>
    </div>
  );
}
