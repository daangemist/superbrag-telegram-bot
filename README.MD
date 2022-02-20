# Superbrag Telegram Bot

This is a small service that allows you to post updates to [superbrag](https://github.com/daangemist/superbrag) via a Telegram bot.

# Prerequisites

This service requires you to have a running installation of `superbrag`, the api should be enabled and posting via the API should be allowed
(`apiCreateEnabled`, `apiEnabled` should both be `true`).

# Setup

First, use the BotFather in Telegram to create a bot and retrieve a token.

## Check out code

    git clone git@github.com:daangemist/superbrag-telegram-bot.git
    cd superbrag-telegram-bot
    cp config.json.dist config.json
    npm run build

## Configure

Edit the config.json and set the configuration attributes to the correct values.

- accessPassword, the `accessPassword` configured at your superbrag instance
- superbragPrefix, the URL prefix of your superbrag instance, without a trailing `/` (slash). For example `https://public.daangemist.nl`.
- telegramBotToken, the bot token you received from the bot father.
- telegramChatId, the chatId that is allowed to post messages. You can determine this by:
  - Running this bot with this value configured as an empty string.
  - Sending a message to the bot via Telegram.
  - Checking the console output, there should be something similar to: `The telegramChatId to configure is *** xxx ***`.
- cronExpression, the times at which to send a reminder via Telegram. See [wikipedia article](https://en.wikipedia.org/wiki/Cron#CRON_expression)
  for more explanation.

# Start bot

    npm run start

# Contributing

Contributions are welcome. This does not necessarily have to be code, it can also be updated documentation, tutorials, bug reports or pull requests.

Please create an Issue to propose a feature you want to implement, so that the details can be discussed in advance.
