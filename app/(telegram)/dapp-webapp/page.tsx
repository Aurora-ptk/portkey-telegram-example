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
import { ChainId } from "@portkey/types";

ConfigProvider.setGlobalConfig({
  dappTelegramLink: "https://t.me/Dapp_V5_Bot/dappv5",
});

const PIN = "111111";
let CHAIN_ID: ChainId = "AELF";

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
      <a href="dapp-assets">
        <Button>Go to assets</Button>
      </a>

      <Button onClick={setCurrentLifeCycle}>SetCurrentLifeCycle</Button>

      <div>-----------</div>
      <Button
        onClick={async () => {
          // Mock pin: 111111
          const wallet = await did.load(PIN);
          console.log(wallet, "wallet==load");
        }}
      >
        load
      </Button>
      <Button
        onClick={async () => {
          // Mock pin: 111111
          const wallet = await did.load(PIN);
          console.log("wallet:", wallet);
          // Mock chainId: 'AELF'
          const result = await did.logout({ chainId: CHAIN_ID });
          console.log(result, "logout====");
        }}
      >
        logout
      </Button>

      <div>-----------</div>
      <Button
        onClick={async () => {
          const isExist = await did.checkManagerIsExist({
            chainId: "AELF",
            caHash: did.didWallet.caInfo[CHAIN_ID].caHash,
            managementAddress: did.didWallet.managementAccount?.address || "",
          });
          console.log(isExist, "isExist=AELF");
        }}
      >
        checkManagerIsExist: AELF
      </Button>

      <div>-----------</div>
      <Button
        onClick={async () => {
          const isExist = await did.checkManagerIsExist({
            chainId: "tDVV",
            caHash: did.didWallet.caInfo[CHAIN_ID].caHash,
            managementAddress: did.didWallet.managementAccount?.address ?? "",
          });
          console.log(isExist, "isExist=tDVV");
        }}
      >
        checkManagerIsExist: tDVV
      </Button>

      <div>-----------</div>
      <Button
        onClick={async () => {
          const isExist = await did.checkManagerIsExist({
            chainId: "tDVW",
            caHash: did.didWallet.caInfo[CHAIN_ID].caHash,
            managementAddress: did.didWallet.managementAccount?.address ?? "",
          });
          console.log(isExist, "isExist=tDVW");
        }}
      >
        checkManagerIsExist: tDVW
      </Button>

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
