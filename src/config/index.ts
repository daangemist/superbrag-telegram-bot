import path from 'path';
import { readFile } from 'fs';
import { promisify } from 'util';
import { Config } from '../types';

const readFileAsync = promisify(readFile);

let config: Config = {
  superbragPrefix: process.env.SUPERBRAG_PREFIX ?? '',
  accessPassword: process.env.ACCESS_PASSWORD ?? '',
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN ?? '',
  telegramChatId: process.env.TELEGRAM_CHAT_ID
    ? parseInt(process.env.TELEGRAM_CHAT_ID)
    : undefined,
  cronExpression: process.env.CRON_EXPRESSION ?? undefined,
};

export const getConfig = () => config;

export const loadConfig = async () => {
  try {
    // optionally read a local config.json file.
    const configFile =
      process.env.CONFIG_FILE ?? path.join(__dirname, '../../config.json');
    const rawConfig = await readFileAsync(configFile);
    const jsonConfig = JSON.parse(rawConfig.toString());
    config = { ...config, ...jsonConfig };
  } catch (error) {
    console.log(
      'Could not read config.json file for additional configuration.'
    );
  }

  if (
    !config.accessPassword ||
    !config.superbragPrefix ||
    !config.telegramBotToken
  ) {
    throw new Error(
      'Telegram bot token, access password or superbrag host prefix are not configured.'
    );
  }
};
