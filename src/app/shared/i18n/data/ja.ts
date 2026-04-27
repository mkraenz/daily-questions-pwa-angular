import { Translations } from './types';

export const ja: Translations = {
  app: { title: 'デイリー質問' },
  nav: {
    dailies: 'デイリー質問',
    history: '履歴',
    customizeQuestions: '質問をカスタマイズ',
    settings: '設定',
    about: 'このアプリについて',
  },
  question: {
    rateLabel: '1から10で評価：',
    textLabel: 'あなたの回答：',
    next: '次へ',
  },
  summary: {
    title: 'サマリー',
    confirm: '確認',
  },
  theme: { toLightMode: 'ライトモードに切り替え', toDarkMode: 'ダークモードに切り替え' },
  toast: { saved: '回答を保存しました！' },
  loading: '準備中...',
  history: {
    empty: 'まだ回答がありません。',
  },
  stubs: {
    history: '履歴 — 近日公開',
    customize: '質問をカスタマイズ — 近日公開',
    settings: '設定 — 近日公開',
    about: 'このアプリについて — 近日公開',
  },
};
