import { useCallback, useEffect, useRef, useState } from 'react';
import Landing from './components/Landing';
import Experience from './components/Experience';
import Toast, { type ToastMsg } from './components/Toast';
import type { ThemeId } from './data/campus';

export default function App() {
  const [theme, setTheme] = useState<ThemeId | null>(null);
  const [follows, setFollows] = useState<string[]>([]);
  const [toast, setToast] = useState<ToastMsg | null>(null);
  const shouldScroll = useRef(false);

  const notify = useCallback((text: string, tone: ToastMsg['tone'] = 'good') => {
    setToast({ id: Date.now() + Math.random(), text, tone });
  }, []);

  const toggleFollow = useCallback(
    (id: string, name: string) => {
      const following = follows.includes(id);
      setFollows(following ? follows.filter((f) => f !== id) : [...follows, id]);
      notify(
        following
          ? `Unfollowed ${name}. No more pings from them.`
          : `Following ${name} — every update lands right here.`,
        following ? 'muted' : 'good'
      );
    },
    [follows, notify]
  );

  const chooseTheme = (next: ThemeId) => {
    shouldScroll.current = true;
    setTheme(next);
  };

  useEffect(() => {
    if (!theme || !shouldScroll.current) return;
    shouldScroll.current = false;
    const id = window.setTimeout(() => {
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 90);
    return () => window.clearTimeout(id);
  }, [theme]);

  return (
    <div className="app">
      <Landing active={theme} followsCount={follows.length} onChoose={chooseTheme} />

      {theme && (
        <Experience
          key={theme}
          theme={theme}
          follows={follows}
          onToggleFollow={toggleFollow}
          onSwitch={() => setTheme(theme === 'comic' ? 'whimsy' : 'comic')}
          onBack={() => {
            setTheme(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          notify={notify}
        />
      )}

      <Toast msg={toast} onDone={() => setToast(null)} />
    </div>
  );
}
