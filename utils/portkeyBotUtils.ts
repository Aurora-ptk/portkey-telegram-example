import TelegramBot from "node-telegram-bot-api";

const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN_LUCKY!;

export const portkeyTelegramBot = new TelegramBot(token, {
  polling: true,
  request: {
    url: undefined as any,
    proxy: "http://127.0.0.1:7890",
  },
});

export function handleApproveCommand(msg: TelegramBot.Message) {
  portkeyTelegramBot.sendMessage(
    msg.chat.id,
    "Received your message, what do you want to approve?"
  );
}

export function handleLoginCommand(msg: TelegramBot.Message) {
  portkeyTelegramBot.sendMessage(msg.chat.id, "Please select:", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Portkey Auth Webapp",
            web_app: {
              url: "https://t.me/Lucky_V5_Bot/lucky666",
            },
          },
        ],
      ],
    },
  });
}
