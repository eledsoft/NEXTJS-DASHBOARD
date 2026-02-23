import it from './locales/it/translation.json';
import en from './locales/en/translation.json';

const resources: Record<string, Record<string, any>> = { it, en };

export function t(key: string, lng = 'it'): string {
  const keys = key.split('.');
  let value: any = resources[lng];
  for (const k of keys) {
    value = value?.[k];
  }
  return typeof value === 'string' ? value : key;
}
