"use client";
import {
  NetworkType,
  PortkeyProvider,
  ConfigProvider,
} from "@portkey/did-ui-react";
import { ReactNode, useEffect, useState } from "react";
import "@portkey/did-ui-react/dist/assets/index.css";
import { Button } from "antd";
import { GraphqlHost, ApiHost, ConnectHost } from "@/constants/network";

ConfigProvider.setGlobalConfig({
  graphQLUrl: GraphqlHost,
  connectUrl: ConnectHost,
  serviceUrl: ApiHost,
  requestDefaults: {
    baseURL: ApiHost,
  },
  customNetworkType: "offline",
});

export default function PortkeyCustomProvider({
  children,
}: {
  children?: ReactNode;
}) {
  const [dark, setDark] = useState<boolean>(false);
  const [networkType, setNetworkType] = useState<NetworkType>("TESTNET");

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  return (
    <PortkeyProvider networkType={networkType} theme={dark ? "dark" : "light"}>
      <div
        style={{ background: dark ? "#1E212B" : "#fff", height: "100%" }}
        id={dark ? "ids" : ""}
      >
        <Button
          onClick={async () => {
            setDark((v) => !v);
          }}
        >
          change theme
        </Button>
        <Button
          onClick={async () => {
            setNetworkType((v) => (v === "MAINNET" ? "TESTNET" : "MAINNET"));
          }}
        >
          only change networkType
        </Button>
        {children}
      </div>
    </PortkeyProvider>
  );
}
