import TelegramBot from "node-telegram-bot-api";

const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN_DAPP!;

export const dappTelegramBot = new TelegramBot(token, {
  polling: true,
  request: {
    url: undefined as any,
    proxy: "http://127.0.0.1:7890",
  },
});

export function handleApproveCommand(msg: TelegramBot.Message) {
  dappTelegramBot.sendMessage(
    msg.chat.id,
    "Received your message, what do you want to approve?"
  );
}

export function handleLoginCommand(msg: TelegramBot.Message) {
  dappTelegramBot.sendMessage(msg.chat.id, "Please select:", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Dapp Feature - TESTNET",
            web_app: {
              url: "https://t.me/Dapp_V5_Bot/dappv5",
            },
          },
          {
            text: "Dapp Assets - TESTNET",
            web_app: {
              url: "https://t.me/Dapp_V5_Bot/dappAssets",
            },
          },
        ],
        [
          {
            text: "Dapp Feature - TEST4",
            web_app: {
              url: "https://t.me/Dapp_V5_Bot/dappTest4",
            },
          },
          {
            text: "Dapp Assets - TEST4",
            web_app: {
              url: "https://t.me/Dapp_V5_Bot/dappTest4Assets",
            },
          },
        ],
      ],
    },
  });
}
