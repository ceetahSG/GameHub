// Mock data. Game titles stay in English in both locales.
export type CategoryKey = 'action' | 'puzzle' | 'arcade' | 'sports' | 'racing' | 'casual';

export type Game = {
  slug: string;
  title: string;
  category: CategoryKey;
  rating: number;
  plays: number;
  isNew: boolean;
  emoji: string;
  gradient: string;
};

export const categories: { key: CategoryKey; emoji: string; gradient: string }[] = [
  { key: 'action', emoji: '💥', gradient: 'linear-gradient(135deg,#FF6B35,#FF4D4F)' },
  { key: 'puzzle', emoji: '🧩', gradient: 'linear-gradient(135deg,#7C5CFF,#4F46E5)' },
  { key: 'arcade', emoji: '👾', gradient: 'linear-gradient(135deg,#00D1B2,#0EA5E9)' },
  { key: 'sports', emoji: '⚽', gradient: 'linear-gradient(135deg,#2ECC71,#15803D)' },
  { key: 'racing', emoji: '🏎️', gradient: 'linear-gradient(135deg,#F59E0B,#EA580C)' },
  { key: 'casual', emoji: '🌼', gradient: 'linear-gradient(135deg,#EC4899,#A855F7)' },
];

// games[0] is the featured hero game.
export const games: Game[] = [
  { slug: 'neon-blaster', title: 'Neon Blaster', category: 'action', rating: 4.7, plays: 1284000, isNew: false, emoji: '🚀', gradient: 'linear-gradient(135deg,#7C5CFF,#FF6B35)' },
  { slug: 'block-quest', title: 'Block Quest', category: 'puzzle', rating: 4.5, plays: 960000, isNew: false, emoji: '🧱', gradient: 'linear-gradient(135deg,#00D1B2,#7C5CFF)' },
  { slug: 'pixel-runner', title: 'Pixel Runner', category: 'arcade', rating: 4.4, plays: 870000, isNew: true, emoji: '🏃', gradient: 'linear-gradient(135deg,#0EA5E9,#00D1B2)' },
  { slug: 'goal-rush', title: 'Goal Rush', category: 'sports', rating: 4.2, plays: 640000, isNew: true, emoji: '🥅', gradient: 'linear-gradient(135deg,#2ECC71,#0F766E)' },
  { slug: 'turbo-drift', title: 'Turbo Drift', category: 'racing', rating: 4.6, plays: 1110000, isNew: false, emoji: '🏁', gradient: 'linear-gradient(135deg,#F59E0B,#EF4444)' },
  { slug: 'bubble-pop-party', title: 'Bubble Pop Party', category: 'casual', rating: 4.8, plays: 1502000, isNew: false, emoji: '🫧', gradient: 'linear-gradient(135deg,#EC4899,#38BDF8)' },
  { slug: 'word-wizard', title: 'Word Wizard', category: 'puzzle', rating: 4.3, plays: 430000, isNew: true, emoji: '🔤', gradient: 'linear-gradient(135deg,#4F46E5,#EC4899)' },
  { slug: 'sky-dodger', title: 'Sky Dodger', category: 'arcade', rating: 4.1, plays: 390000, isNew: true, emoji: '☁️', gradient: 'linear-gradient(135deg,#38BDF8,#6366F1)' },
  { slug: 'street-kick', title: 'Street Kick', category: 'action', rating: 4.0, plays: 310000, isNew: false, emoji: '🥋', gradient: 'linear-gradient(135deg,#EF4444,#7C2D12)' },
  { slug: 'mini-golf-mania', title: 'Mini Golf Mania', category: 'sports', rating: 4.5, plays: 520000, isNew: false, emoji: '⛳', gradient: 'linear-gradient(135deg,#84CC16,#16A34A)' },
];
