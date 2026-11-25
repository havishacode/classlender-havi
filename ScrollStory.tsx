import { useEffect, useRef, useState } from 'react';
import { useScrollProgress } from '../lib/hooks';
import type { ThemeId } from '../data/campus';

const STEPS = [
  {
    n: '01',
    title: 'Follow your instructor',
    body: 'Tap follow on any of your eight instructors. Their room changes, lab rules and quiz warnings land in your feed the second they post.',
    caption: 'the follow button',
  },
  {
    n: '02',
    title: 'Get the ping',
    body: 'No group-chat archaeology at 8:55 am. A room swap reaches you before you reach the wrong door — and the bell keeps score.',
    caption: 'the ping',
  },
  {
    n: '03',
    title: 'Navigate to lecture',
    body: 'One tap: the exact block, floor and room, the walk time, and the landmark to look for when you get there.',
    caption: 'the last 50 metres',
  },
];

function StepArt({ index, theme }: { index: number; theme: ThemeId }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 220 150" className="step-art" aria-hidden="true">
        <rect x="18" y="22" width="184" height="106" rx={theme === 'comic' ? 6 : 18} className="art-fill-soft" />
        <circle cx="70" cy="66" r="20" className="art-fill-accent" />
        <text x="70" y="72" textAnchor="middle" className="art-initials">
          AR
        </text>
        <rect x="102" y="50" width="74" height="8" rx="4" className="art-fill-ink" />
        <rect x="102" y="66" width="52" height="8" rx="4" className="art-fill-ink-soft" />
        <rect x="102" y="92" width="80" height="22" rx={theme === 'comic' ? 4 : 11} className="art-fill-accent" />
        <text x="142" y="107" textAnchor="middle" className="art-btn-label">
          FOLLOW
        </text>
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 220 150" className="step-art" aria-hidden="true">
        <path d="M42 58a30 30 0 0 1 60 0c0 18 6 24 9 27H33c3-3 9-9 9-27Z" className="art-fill-accent" />
        <path d="M60 100a12 12 0 0 0 24 0" className="art-stroke-ink" />
        <circle cx="102" cy="40" r="11" className="art-fill-pop" />
        <rect x="120" y="34" width="76" height="52" rx="12" className="art-fill-soft" />
        <rect x="130" y="48" width="56" height="6" rx="3" className="art-fill-ink" />
        <rect x="130" y="62" width="38" height="6" rx="3" className="art-fill-ink-soft" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 220 150" className="step-art" aria-hidden="true">
      <path d="M36 118h150" className="art-stroke-ink-soft" />
      <path d="M46 112 C 70 112, 74 72, 104 72 S 146 104, 172 60" className="art-route" />
      <circle cx="46" cy="112" r="7" className="art-fill-ink" />
      <g transform="translate(172,44)">
        <path d="M0 22c-10-10-13-15-13-21a13 13 0 0 1 26 0c0 6-3 11-13 21Z" className="art-fill-accent" />
        <circle cx="0" cy="1" r="4.5" className="art-fill-paper" />
      </g>
      <rect x="28" y="30" width="78" height="20" rx="10" className="art-fill-pop" />
      <text x="67" y="44" textAnchor="middle" className="art-btn-label-dark">
        6 MIN WALK
      </text>
    </svg>
  );
}

export default function ScrollStory({ theme }: { theme: ThemeId }) {
  const [wrapRef, progress] = useScrollProgress<HTMLElement>();
  const trackRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setShift(Math.max(0, el.scrollWidth - window.innerWidth + 40));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <section className="story" ref={wrapRef} aria-label="How the app works">
      <div className="story-sticky">
        <div className="story-top">
          <p className="eyebrow">Three panels · one less wrong turn</p>
          <h2 className="story-title">
            {theme === 'comic' ? 'The three-panel origin story' : 'a three-step little ritual'}
          </h2>
          <span className="story-hint">
            keep scrolling <span aria-hidden="true">→</span>
          </span>
        </div>

        <div className="story-viewport">
          <div
            className="story-track"
            ref={trackRef}
            style={{ transform: `translate3d(${-progress * shift}px, 0, 0)` }}
          >
            {STEPS.map((step, i) => (
              <article className="story-panel" key={step.n}>
                <div className="story-panel-head">
                  <span className="story-num">{step.n}</span>
                  <span className="story-tag">{step.caption}</span>
                </div>
                <h3 className="story-panel-title">{step.title}</h3>
                <p className="story-panel-body">{step.body}</p>
                <StepArt index={i} theme={theme} />
                <span className="story-footmark" aria-hidden="true">
                  {theme === 'comic' ? 'TO BE CONTINUED…' : 'and that is the whole trick ♡'}
                </span>
              </article>
            ))}
            <article className="story-panel story-panel-end">
              <h3 className="story-panel-title">
                {theme === 'comic' ? 'Now go be on time.' : 'off you go, softly'}
              </h3>
              <p className="story-panel-body">
                Ten papers, eight instructors, one page — plus a tracker that tells you which period
                you are supposed to be in right now.
              </p>
              <a className="btn btn-primary story-cta" href="#updates">
                See the ping feed
              </a>
            </article>
          </div>
        </div>

        <div className="story-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${Math.max(0.04, progress)})` }} />
        </div>
      </div>
    </section>
  );
}
