import { TelegramClient } from 'messaging-api-telegram';
import { Update } from 'messaging-api-telegram/dist/TelegramTypes';
import { getConfig } from '../config';
import post from '../superbrag';

export default async function (
  telegram: TelegramClient,
  update: Update
): Promise<void> {
  const adminChatId = getConfig().telegramChatId as unknown as number;

  // weak comparison here, because we don't know if it's int or string.
  if (update.message?.chat.id != adminChatId) {
    console.log(
      `Not allowed telegramChatId ${update.message?.chat.id} used to post message. Ignoring it.`
    );
    return;
  }
  if (!update.message.text) {
    await telegram.sendMessage(
      adminChatId,
      'The body text is empty, cannot create new post.'
    );
    return;
  }

  await telegram.sendMessage(adminChatId, 'Thanks, posting message right now.');
  try {
    await post(update.message?.text);
    await telegram.sendMessage(
      adminChatId,
      'It has been posted! Enjoy your day! 🚀'
    );
  } catch (error) {
    await telegram.sendMessage(
      adminChatId,
      // @ts-expect-error Errors are marked as unknown.
      `Posting the message failed: ${error.message}`
    );
  }
}
