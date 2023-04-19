import { FC } from "react";

import { Pages } from "~/pages";
import { WidgetButton } from "~/WidgetButton";
import { NavigationProvider } from "~/Context";

export interface ModalProps {
  originAddress: string;
  originChainId: number;
  text?: string;
}

export const ZodiacConnextWidget: FC<ModalProps> = ({
  originAddress,
  originChainId,
  text,
}) => {
  return (
    <NavigationProvider
      originAddress={originAddress}
      originChainId={originChainId}
    >
      <>
        <WidgetButton text={text} />
        <Pages />
      </>
    </NavigationProvider>
  );
};
