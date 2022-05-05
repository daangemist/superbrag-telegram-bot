import { IncomingMessage, OutgoingMessage } from '@manny-talk/manny-talk';
import { getMannyTalk } from '.';
import { getConfig } from '../config';
import post from '../superbrag';

export default async function (
  message: IncomingMessage
): Promise<OutgoingMessage> {
  const adminChatId = getConfig().telegramChatId as unknown as number;

  // weak comparison here, because we don't know if it's int or string.
  if (message.profileId !== `${adminChatId}`) {
    console.log(
      `Not allowed telegramChatId ${message.profileId} used to post message. Ignoring it.`
    );

    return {
      messages: [
        'Please complete the configuration. Check the console output of the running process for the needed information.',
      ],
      sessionId: message.sessionId,
      profileId: message.profileId,
    };
  }

  getMannyTalk().speak('telegram', {
    messages: ['Thanks, posting message right now.'],
    profileId: message.profileId,
    sessionId: message.sessionId,
  });

  try {
    await post(message.message);
    return {
      messages: ['It has been posted! Enjoy your day! 🚀'],
      sessionId: message.sessionId,
      profileId: message.profileId,
    };
  } catch (error) {
    return {
      messages: [
        `Posting the message failed: ${
          error instanceof Error ? error.message : error
        }`,
      ],
      sessionId: message.sessionId,
      profileId: message.profileId,
    };
  }
}
