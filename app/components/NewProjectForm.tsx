'use client';

import { useFormState } from 'react-dom';

export default function NewProjectForm({
  action,
}: {
  action: (state: { error?: string }, formData: FormData) => Promise<{ error?: string }>;
}) {
  const [state, formAction] = useFormState(action, { error: undefined });

  return (
    <form action={formAction} className="card stack">
      <label>
        <span>Project name</span>
        <input name="name" placeholder="Migration, redesign, etc." required />
      </label>
      <button type="submit" className="button">
        Create project
      </button>
      {state?.error && <p className="muted">{state.error}</p>}
    </form>
  );
}
