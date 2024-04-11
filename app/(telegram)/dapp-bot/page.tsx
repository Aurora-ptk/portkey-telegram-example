import {
  handleApproveCommand,
  handleLoginCommand,
  dappTelegramBot,
} from "../../../utils/dappTgBotUtils";

export default function TgBot() {
  dappTelegramBot.addListener("message", (message: any) => {
    console.log("dapp bot message", message);
  });

  dappTelegramBot.onText(/\/approve/, handleApproveCommand);
  dappTelegramBot.onText(/\/login/, handleLoginCommand);

  if (typeof window !== "undefined") {
    window.onmessage = function (event) {
      if (event.data.type === "auth") {
        console.log("window.onmessage event", event);
      }
    };
  }

  return (
    <div className="page-container">
      <h1>DAPP TG BOT</h1>
    </div>
  );
}
