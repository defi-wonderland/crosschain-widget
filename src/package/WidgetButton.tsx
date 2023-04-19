import { useModalContext } from "./Context";
import { StepType } from "./types";

export const WidgetButton = ({ text }: { text?: string }) => {
  const { setType } = useModalContext();
  return (
    <button
      onClick={() => {
        setType(StepType.START);
      }}
    >
      {text && text}
      {!text && "Cross-Chain Widget"}
    </button>
  );
};
