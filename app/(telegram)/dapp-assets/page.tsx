"use client";

import {
  Asset,
  ConfigProvider,
  PortkeyAssetProvider,
} from "@portkey/did-ui-react";
import { Button } from "antd";
import React from "react";
import { useRouter } from 'next/navigation';

ConfigProvider.setGlobalConfig({
  dappTelegramLink: "https://t.me/Dapp_V5_Bot/dappAssets",
});

export default function Assets() {
  const router = useRouter();
  return (
    <PortkeyAssetProvider pin="111111" originChainId="AELF">
      <a href="dapp-webapp">
        <Button>Go to dapp-webapp</Button>
      </a>
      <Asset
        faucet={{
          faucetContractAddress:
            "233wFn5JbyD4i8R5Me4cW4z6edfFGRn5bpWnGuY8fjR7b2kRsD",
        }}
        onLifeCycleChange={(lifeCycle) => {
          console.log(lifeCycle, "onLifeCycleChange");
        }}
        onDeleteAccount={() => {
          router.replace("/dapp-webapp");
        }}
      />
    </PortkeyAssetProvider>
  );
}
