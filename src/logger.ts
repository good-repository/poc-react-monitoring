import { logger, } from 'react-monitoring';

// Simple custom logger that logs to the console
interface LogEntry {
  message: string;
  tags?: string[];
  level: 'info' | 'warn' | 'error';
  customProperties?: Record<string, unknown>;
}

export const loggerUtil = {
  log(entry: LogEntry) {
    console.log('[react-monitoring]', entry);

    logger.error(entry);
  },
};
