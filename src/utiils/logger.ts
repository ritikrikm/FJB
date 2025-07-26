import config from '../config';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const levels: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

const currentLevel = levels[config.LOG_LEVEL as LogLevel] || 2;

export const logger = {
  debug: (...args: any[]) => {
    if (currentLevel <= levels.debug) console.debug('[DEBUG]', ...args);
  },
  info: (...args: any[]) => {
    if (currentLevel <= levels.info) console.info('[INFO]', ...args);
  },
  warn: (...args: any[]) => {
    if (currentLevel <= levels.warn) console.warn('[WARN]', ...args);
  },
  error: (...args: any[]) => {
    if (currentLevel <= levels.error) console.error('[ERROR]', ...args);
  }
};
/*
for using it
import { logger } from './utils/logger';

logger.debug('Component mounted');
*/