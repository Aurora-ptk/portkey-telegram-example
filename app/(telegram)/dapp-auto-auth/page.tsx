"use client";
import { useCallback, useEffect, useRef } from "react";
import { useEffectOnce } from "react-use";
import { privacyPolicy, termsOfService } from "@/constants/common";
import {
  DIDWalletInfo,
  SignIn,
  ISignIn,
  did,
  ConfigProvider,
} from "@portkey/did-ui-react";
import "@portkey/did-ui-react/dist/assets/index.css";
import { Button } from "antd";
import { sleep } from "@portkey/utils";

ConfigProvider.setGlobalConfig({
  socialLogin: {
    Telegram: {
      dappTelegramLink: "https://t.me/dapp3f5g7_bot/dapp3f5g7_app_auto_auth_testnet",
    },
  },
  loginConfig: {
    loginMethodsOrder: ['Telegram'],
    recommendIndexes: [0],
  },
});

export default function DappAutoAuth() {
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

  const resetCurrentLifeCycle = useCallback(async () => {
    signInRef.current?.setCurrentLifeCycle(JSON.parse("{}"));
  }, []);

  const resetLoginStatus = useCallback(async () => {
    localStorage.removeItem('portkey_sdk_did_wallet_v2');
  }, []);

  return (
    <div>
      <Button onClick={setCurrentLifeCycle}>SetCurrentLifeCycle</Button>
      <Button onClick={resetCurrentLifeCycle}>ResetLoginLocalStorage</Button>
      <Button onClick={resetLoginStatus}>ResetLoginStatus</Button>
      <div>-----------</div>

      <SignIn
        className="dapp-bot-sign"
        termsOfService={termsOfService}
        privacyPolicy={privacyPolicy}
        uiType="Full"
        ref={signInRef}
        isShowScan={false}
        autoTelegramAuth
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
