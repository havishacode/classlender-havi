import { useEffect, useRef } from 'react';

export interface ToastMsg {
  id: number;
  text: string;
  tone: 'good' | 'muted';
}

export default function Toast({ msg, onDone }: { msg: ToastMsg | null; onDone: () => void }) {
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (!msg) return;
    const id = window.setTimeout(() => doneRef.current(), 4200);
    return () => window.clearTimeout(id);
  }, [msg]);

  if (!msg) return null;

  return (
    <div className={`toast toast-${msg.tone}`} role="status" aria-live="polite">
      <span className="toast-dot" aria-hidden="true" />
      <span>{msg.text}</span>
    </div>
  );
}
