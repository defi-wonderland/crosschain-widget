import { FC } from "react";

import { Modals } from "~/pages";
import { WidgetButton } from "~/WidgetButton";
import { ModalContentProvider } from "~/Context";

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
    <ModalContentProvider
      originAddress={originAddress}
      originChainId={originChainId}
    >
      <>
        <WidgetButton text={text} />
        <Modals />
      </>
    </ModalContentProvider>
  );
};
