"use client";
import {
  handleErrorMessage,
  managerApprove,
  checkWalletSecurity,
  ConfigProvider,
  NFTCheckout,
  did,
  PortkeyProvider,
  singleMessage,
  PortkeyAssetProvider,
  PortkeyNumberKeyboard,
  NetworkType,
} from "@portkey/did-ui-react";
import { evokePortkey } from "@portkey/onboarding";
import { message, Button } from "antd";
import { useCallback, useState } from "react";

export default function AppleAuth() {
  const [status, setStatus] = useState<string>();
  const [visible, setVisible] = useState<boolean>();
  const [val, setVal] = useState<string>("");
  const getNetworkType = useCallback(() => {
    return localStorage.getItem("testCurrentPortkeyNetworkType") as NetworkType;
  }, []);

  return (
    <div>
      <div className="divider">----- PortkeyNumberKeyboard -----</div>
      <Button
        onClick={() => {
          setVisible((v) => !v);
        }}
      >
        open keyboard in phone
      </Button>
      <span className="dynamic-value">{` your input: ${val}`}</span>

      <PortkeyNumberKeyboard
        visible={visible}
        onInput={(v) => setVal((_v) => _v + v)}
        onDelete={() => setVal("")}
      />
      <div className="divider">----- evoke -----</div>
      <Button
        onClick={() => {
          evokePortkey.app({
            action: "login",
            custom: {},
            onStatusChange: (status) => {
              singleMessage.error(status);
              setStatus(status);
            },
          });
          singleMessage.warning("evokePortkeyApp");
        }}
      >
        portkey app {status}
      </Button>
      <Button
        onClick={async () => {
          const result = await evokePortkey.extension();
          // singleMessage.error(navigator.userAgent);
          console.log(result, "=result==");
        }}
      >
        extension
      </Button>
      <Button
        onClick={async () => {
          const result = await evokePortkey.thirdParty();
          // singleMessage.error(navigator.userAgent);
          console.log(result, "=result==");
        }}
      >
        thirdParty
      </Button>
      <div className="divider">----- approve -----</div>
      <Button
        onClick={async () => {
          try {
            await did.load("111111");
            const result = await managerApprove({
              originChainId: "AELF",
              symbol: "ELF",
              caHash: did.didWallet.caInfo["AELF"].caHash,
              amount: "999",
              targetChainId: "AELF",
              networkType: getNetworkType() || "MAINNET",
            });
            console.log(result, "result===");
          } catch (error) {
            message.error(handleErrorMessage(error));
          }
        }}
      >
        managerApprove
      </Button>
      <div className="divider">----- security -----</div>
      <PortkeyProvider sandboxId="" networkType="MAINNET">
        <Button
          onClick={async () => {
            try {
              await did.load("111111");
              const result = await checkWalletSecurity({
                originChainId: "AELF",
                targetChainId: "tDVV",
                caHash: did.didWallet.caInfo["AELF"].caHash,
                networkType: getNetworkType() || "MAINNET",
              });
              console.log(result, "result===");
            } catch (error) {
              message.error(handleErrorMessage(error));
            }
          }}
        >
          checkWalletSecurity
        </Button>
      </PortkeyProvider>
      <div id="nft-checkout" className="divider">
        ----- transfer -----
      </div>
      <PortkeyAssetProvider pin="111111" originChainId="AELF">
        <Button
          type="primary"
          onClick={async () => {
            try {
              const result = await NFTCheckout({
                orderId: "49300e1c-ecd0-2ca1-6468-a48995ada2a6",
                originChainId: "AELF",

                appId: "t2D3213Nr78PMJ9g",
                achWebUrl: "https://nft-sbx.alchemytech.cc",
                merchantName: "Alchemy",
              });
              console.log(result, "result=NFTCheckout");
            } catch (error) {
              console.log("NFTCheckout:", error);
            }
          }}
        >
          nft checkout
        </Button>
      </PortkeyAssetProvider>
    </div>
  );
}
