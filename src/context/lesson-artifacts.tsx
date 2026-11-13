import React, { createContext, useContext, useMemo, useState } from 'react';

export type LessonPhoto = { uri: string; capturedAt: number };
export type LessonArtifacts = { photos: LessonPhoto[]; notes: string };

type LessonArtifactsContextValue = {
  lessonArtifacts: Record<string, LessonArtifacts>;
  addLessonPhoto: (course: string, lesson: string, uri: string) => void;
  saveLessonNotes: (course: string, lesson: string, notes: string) => void;
};

export function getLessonArtifactKey(course: string, lesson: string) {
  return JSON.stringify([course, lesson]);
}

const LessonArtifactsContext = createContext<LessonArtifactsContextValue | null>(null);

export function LessonArtifactsProvider({ children }: React.PropsWithChildren) {
  const [lessonArtifacts, setLessonArtifacts] = useState<Record<string, LessonArtifacts>>({});

  const addLessonPhoto = (course: string, lesson: string, uri: string) => {
    const key = getLessonArtifactKey(course, lesson);
    setLessonArtifacts(current => ({
      ...current,
      [key]: {
        photos: [...(current[key]?.photos ?? []), { uri, capturedAt: Date.now() }],
        notes: current[key]?.notes ?? '',
      },
    }));
  };

  const saveLessonNotes = (course: string, lesson: string, notes: string) => {
    const key = getLessonArtifactKey(course, lesson);
    setLessonArtifacts(current => ({
      ...current,
      [key]: { photos: current[key]?.photos ?? [], notes },
    }));
  };

  const value = useMemo(() => ({ lessonArtifacts, addLessonPhoto, saveLessonNotes }), [lessonArtifacts]);
  return <LessonArtifactsContext.Provider value={value}>{children}</LessonArtifactsContext.Provider>;
}

export function useLessonArtifacts() {
  const value = useContext(LessonArtifactsContext);
  if (!value) throw new Error('useLessonArtifacts precisa estar dentro de LessonArtifactsProvider.');
  return value;
}
