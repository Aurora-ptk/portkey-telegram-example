"use client";
import { useCallback, useEffect, useRef } from "react";
import { useEffectOnce } from "react-use";
import { privacyPolicy, termsOfService } from "@/constants/common";
import {
  DIDWalletInfo,
  SignIn,
  ISignIn,
  did,
} from "@portkey/did-ui-react";
import "@portkey/did-ui-react/dist/assets/index.css";
import { Button } from "antd";
import { sleep } from "@portkey/utils";

export default function DappWebapp() {
  const signInRef = useRef<ISignIn>(null);
  const TelegramRef = useRef<any>();

  const getTelegram = useCallback(async () => {
    if (typeof window !== "undefined") {
      await sleep(1000);

      TelegramRef.current = (window as any)?.Telegram;
      if (!TelegramRef.current) return;

      TelegramRef.current.WebApp.ready();
    }
  }, []);

  useEffectOnce(() => {
    getTelegram();
  });

  const setCurrentLifeCycle = useCallback(async () => {
    signInRef.current?.setCurrentLifeCycle(
      JSON.parse(localStorage.getItem("portkeyLifeCycle") || "{}")
    );
  }, []);
  useEffect(() => {
    typeof window !== "undefined" && setCurrentLifeCycle();
  }, [setCurrentLifeCycle]);

  const onCancel = useCallback(
    () => signInRef.current?.setOpen(false),
    [signInRef]
  );

  const onFinish = useCallback(async (didWallet: DIDWalletInfo) => {
    console.log("didWallet", didWallet);
    did.save(didWallet.pin);
  }, []);

  return (
    <div>
      <Button
        onClick={async () => {
          const VConsole = require("vconsole");
          new VConsole();
        }}
      >
        VConsole
      </Button>

      <a href="dapp-assets">
        <Button>Go to assets</Button>
      </a>

      <Button onClick={setCurrentLifeCycle}>SetCurrentLifeCycle</Button>

      <SignIn
        className="dapp-bot-sign"
        termsOfService={termsOfService}
        privacyPolicy={privacyPolicy}
        uiType="Full"
        ref={signInRef}
        onFinish={onFinish}
        onCancel={onCancel}
        onLifeCycleChange={(lifeCycle: any, nextLifeCycleProps: any) => {
          console.log(
            "onLifeCycleChange:",
            lifeCycle,
            nextLifeCycleProps,
            { [lifeCycle]: nextLifeCycleProps },
            JSON.stringify({ [lifeCycle]: nextLifeCycleProps })
          );
          localStorage.setItem(
            "portkeyLifeCycle",
            JSON.stringify({ [lifeCycle]: nextLifeCycleProps })
          );
        }}
      />
    </div>
  );
}
