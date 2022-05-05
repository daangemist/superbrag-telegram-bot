import cron from 'node-cron';
import { getConfig, loadConfig } from './config';
import { sendMessage, initialize as initializeTelegram } from './telegram';

async function main() {
  await loadConfig();
  const config = getConfig();

  console.log('=== superbrag-telegram-bot ===');
  if (!config.telegramChatId) {
    console.log(
      'No telegramChatId has been configured. Initializing and configuration bot to output the chat details in the console(). Update the configuration and restart this application.'
    );
    console.log('Waiting for incoming message...');
  } else {
    console.log('Waiting for incoming message to post...');
  }

  initializeTelegram();

  if (config.cronExpression && config.telegramChatId) {
    console.log('Scheduling cron task for the reminder.');
    cron.schedule(config.cronExpression, async () => {
      await sendMessage(
        'This is your gentle reminder to post something on superbrag. Have a nice day!'
      );
    });
  }
}

main();
