import { BellIcon } from './Decor';
import type { ThemeId } from '../data/campus';

interface Props {
  theme: ThemeId;
  unread: number;
  follows: number;
  onBell: () => void;
  onSwitch: () => void;
  onBack: () => void;
}

export default function TopBar({ theme, unread, follows, onBell, onSwitch, onBack }: Props) {
  return (
    <header className="bar">
      <div className="bar-inner">
        <button type="button" className="bar-brand" onClick={onBack} title="Back to the theme picker">
          <span className="brand-mark" aria-hidden="true">
            NIE
          </span>
          <span className="brand-text">
            <strong>NIE Mysore</strong>
            <small>{theme === 'comic' ? 'North Campus · Issue 01' : 'North Campus · Scrapbook'}</small>
          </span>
        </button>

        <nav className="bar-nav" aria-label="Sections">
          <a href="#next">Now</a>
          <a href="#tracker">Live</a>
          <a href="#calendar">Calendar</a>
          <a href="#faculty">Faculty</a>
          <a href="#notes">Notes</a>
          <a href="#updates">Updates</a>
        </nav>

        <div className="bar-actions">
          <span className="bar-follow-count">
            <span className="bar-follow-dot" aria-hidden="true" />
            {follows} following
          </span>
          <button type="button" className="icon-btn" onClick={onBell} aria-label={`${unread} unread updates`}>
            <BellIcon className="icon-bell" />
            {unread > 0 && <span className="icon-badge">{unread}</span>}
          </button>
          <button type="button" className="btn btn-mini" onClick={onSwitch}>
            {theme === 'comic' ? 'Whimsy theme' : 'Comic theme'}
          </button>
        </div>
      </div>
    </header>
  );
}
