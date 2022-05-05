import { IncomingMessage, OutgoingMessage } from '@manny-talk/manny-talk';
import processUpdate from './process-update';

async function brain(message: IncomingMessage): Promise<OutgoingMessage> {
  return await processUpdate(message);
}

export default {
  start: async function () {
    return {
      process: brain,
    };
  },
};
