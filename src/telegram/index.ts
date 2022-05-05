import { MannyTalk } from '@manny-talk/manny-talk';
// @ts-expect-error Ignore that the types are missing
import telegramBot from '@manny-talk/plugin-telegram-bot';
import { getConfig } from '../config';
import brain from './brain';

export let mannyTalk!: MannyTalk;

export function getMannyTalk(): MannyTalk {
  if (!mannyTalk) {
    throw new Error('MannyTalk is not initialized.');
  }
  return mannyTalk;
}

export async function initialize() {
  mannyTalk = new MannyTalk({
    defaultBrain: 'superbrag',
    plugins: {
      habitrack: {},
    },
  });

  mannyTalk.addPlugin('telegram', telegramBot, {
    token: getConfig().telegramBotToken,
  });
  mannyTalk.addPlugin('superbrag', { brain });

  await mannyTalk.start();
  return mannyTalk;
}

export async function sendMessage(text: string): Promise<void> {
  const adminChatId = getConfig().telegramChatId;
  await mannyTalk.speak('telegram', {
    messages: [text],
    profileId: `${adminChatId}`,
    sessionId: `${adminChatId}`,
  });
}
