import { SymbolView } from 'expo-symbols';
import type { ColorValue } from 'react-native';

const symbols = {
  home: { ios: 'house', android: 'home', web: 'home' },
  lessons: { ios: 'book.closed', android: 'menu_book', web: 'menu_book' },
  accessibility: { ios: 'eye', android: 'visibility', web: 'visibility' },
  profile: { ios: 'person.crop.circle', android: 'account_circle', web: 'account_circle' },
  notification: { ios: 'bell', android: 'notifications', web: 'notifications' },
  menu: { ios: 'line.3.horizontal', android: 'menu', web: 'menu' },
  calendar: { ios: 'calendar', android: 'calendar_month', web: 'calendar_month' },
  camera: { ios: 'camera', android: 'photo_camera', web: 'photo_camera' },
  chevron: { ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' },
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  grid: { ios: 'square.grid.2x2', android: 'grid_view', web: 'grid_view' },
  play: { ios: 'play.fill', android: 'play_arrow', web: 'play_arrow' },
  pause: { ios: 'pause.fill', android: 'pause', web: 'pause' },
  check: { ios: 'checkmark', android: 'check', web: 'check' },
  checkCircle: { ios: 'checkmark.circle', android: 'task_alt', web: 'task_alt' },
  person: { ios: 'person.crop.circle', android: 'person', web: 'person' },
  lock: { ios: 'lock', android: 'lock', web: 'lock' },
  privacy: { ios: 'hand.raised', android: 'shield', web: 'shield' },
  arrowBack: { ios: 'arrow.left', android: 'arrow_back', web: 'arrow_back' },
  arrowRight: { ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' },
  signOut: { ios: 'rectangle.portrait.and.arrow.right', android: 'logout', web: 'logout' },
  email: { ios: 'envelope', android: 'mail', web: 'mail' },
  clock: { ios: 'clock', android: 'schedule', web: 'schedule' },
  sound: { ios: 'speaker.wave.2', android: 'volume_up', web: 'volume_up' },
  rewind: { ios: 'gobackward.15', android: 'replay_10', web: 'replay_10' },
  forward: { ios: 'goforward.15', android: 'forward_10', web: 'forward_10' },
  save: { ios: 'square.and.arrow.down', android: 'save', web: 'save' },
  text: { ios: 'textformat.size', android: 'format_size', web: 'format_size' },
  motion: { ios: 'figure.walk.motion', android: 'motion_photos_on', web: 'motion_photos_on' },
  sparkle: { ios: 'trophy', android: 'emoji_events', web: 'emoji_events' },
} as const;

export type AppIconName = keyof typeof symbols;

export function AppIcon({ name, size = 20, color }: { name: AppIconName; size?: number; color: ColorValue }) {
  return <SymbolView name={symbols[name]} size={size} tintColor={color} weight="regular" />;
}
