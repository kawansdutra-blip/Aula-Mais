import React, { createContext, useContext, useMemo, useState } from 'react';

export type Appearance = 'Claro' | 'Escuro' | 'Alto contraste' | 'Contraste máximo';
export type TextSpacing = 'Normal' | 'Confortável' | 'Amplo';
export type ProfileInformation = { fullName: string; birthDate: string; cpf: string; email: string; phone: string };
export type NotificationPreferences = { newLessons: boolean; deadlines: boolean; achievements: boolean; schoolAnnouncements: boolean; push: boolean; email: boolean; quietFrom: string; quietUntil: string };

type AccessibilitySettings = {
  textScale: number;
  setTextScale: React.Dispatch<React.SetStateAction<number>>;
  spacing: TextSpacing;
  setSpacing: React.Dispatch<React.SetStateAction<TextSpacing>>;
  appearance: Appearance;
  setAppearance: React.Dispatch<React.SetStateAction<Appearance>>;
  reduceMotion: boolean;
  setReduceMotion: React.Dispatch<React.SetStateAction<boolean>>;
  voice: boolean;
  setVoice: React.Dispatch<React.SetStateAction<boolean>>;
  readingSpeed: string;
  setReadingSpeed: React.Dispatch<React.SetStateAction<string>>;
  profileInfo: ProfileInformation;
  setProfileInfo: React.Dispatch<React.SetStateAction<ProfileInformation>>;
  notificationPreferences: NotificationPreferences;
  setNotificationPreferences: React.Dispatch<React.SetStateAction<NotificationPreferences>>;
};

const AccessibilityContext = createContext<AccessibilitySettings | null>(null);

export function AccessibilityProvider({ children }: React.PropsWithChildren) {
  const [textScale, setTextScale] = useState(100);
  const [spacing, setSpacing] = useState<TextSpacing>('Normal');
  const [appearance, setAppearance] = useState<Appearance>('Claro');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [voice, setVoice] = useState(true);
  const [readingSpeed, setReadingSpeed] = useState('1x');
  const [profileInfo, setProfileInfo] = useState<ProfileInformation>({ fullName: 'Ana Oliveira', birthDate: '15/06/2008', cpf: '123.456.789-00', email: 'ana@exemplo.com', phone: '(11) 98765-4321' });
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>({ newLessons: true, deadlines: true, achievements: false, schoolAnnouncements: true, push: true, email: true, quietFrom: '22:00', quietUntil: '07:00' });
  const value = useMemo(() => ({ textScale, setTextScale, spacing, setSpacing, appearance, setAppearance, reduceMotion, setReduceMotion, voice, setVoice, readingSpeed, setReadingSpeed, profileInfo, setProfileInfo, notificationPreferences, setNotificationPreferences }), [textScale, spacing, appearance, reduceMotion, voice, readingSpeed, profileInfo, notificationPreferences]);

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility() {
  const value = useContext(AccessibilityContext);
  if (!value) throw new Error('useAccessibility precisa estar dentro de AccessibilityProvider.');
  return value;
}

export function getAccessibilityColors(appearance: Appearance) {
  switch (appearance) {
    case 'Escuro':
      return { background: '#111827', surface: '#1f2937', text: '#f7f9ff', muted: '#c3cee0', border: '#46566e', pale: '#26364c', blue: '#78a9ff', green: '#56d69a', statusBar: 'light-content' as const };
    case 'Alto contraste':
      return { background: '#fffbe6', surface: '#ffffff', text: '#000000', muted: '#222222', border: '#333333', pale: '#fff4bd', blue: '#0038a8', green: '#006b36', statusBar: 'dark-content' as const };
    case 'Contraste máximo':
      return { background: '#000000', surface: '#000000', text: '#ffffff', muted: '#ffffff', border: '#ffffff', pale: '#171717', blue: '#ffff00', green: '#00ff66', statusBar: 'light-content' as const };
    default:
      return { background: '#f3f6fb', surface: '#ffffff', text: '#09264f', muted: '#506887', border: '#c7d6eb', pale: '#eaf1fc', blue: '#0649ce', green: '#087c49', statusBar: 'dark-content' as const };
  }
}
