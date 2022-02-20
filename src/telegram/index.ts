import { TelegramClient } from 'messaging-api-telegram';
import { getConfig } from '../config';
import { delay } from '../utils';
import processUpdate from './process-update';

let telegram: TelegramClient | null = null;
let adminChatId: number | undefined;

let lastUpdate: number | undefined = undefined;

export default function start(): void {
  const token = getConfig().telegramBotToken;
  adminChatId = getConfig().telegramChatId;

  telegram = new TelegramClient({
    accessToken: token,
  });

  listen();
}

export async function sendMessage(message: string): Promise<void> {
  try {
    if (!telegram || !adminChatId) {
      throw new Error(
        'Could not send message to admin, telegram not initialized, or admin Id not provided.'
      );
    }

    telegram.sendMessage(adminChatId, message);
  } catch (error) {
    console.log('Unable to send admin message: %s, error: %o', message, error);
  }
}

function getClient(): TelegramClient {
  if (!telegram) {
    throw new Error('Telegram is not initialized.');
  }

  return telegram;
}

async function listen() {
  try {
    do {
      const updates = await getClient().getUpdates({
        allowedUpdates: ['message'],
        offset: typeof lastUpdate === 'undefined' ? undefined : lastUpdate + 1,
        limit: 1,
      });

      // Display the information
      await Promise.all(
        updates.map((update) => {
          console.log(`Incoming update ${update.updateId}.`);
          lastUpdate = update.updateId;

          if (!adminChatId) {
            const { message } = update;
            if (!message) {
              return Promise.resolve; // Skip it.
            }
            console.log(
              `Incoming message "${message.text}" from ${message.from?.firstName}`
            );
            console.log(
              `The telegramChatId to configure is ***${message.chat.id}***`
            );
            return Promise.resolve;
          } else {
            return processUpdate(getClient(), update);
          }
        })
      );
      await delay(500);
    } while (true);
  } catch (error) {
    console.log('Error occurred while retrieving Telegram updates:', error);
  }
}
