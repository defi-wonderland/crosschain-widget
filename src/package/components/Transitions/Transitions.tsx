import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import {
  FinishStep,
  ModuleStep,
  StartStep,
  TransactionStep,
  SafeSettingsStep,
} from "~/pages";
import { useDataContext, useNavigationContext } from "~/providers";
import { StyledBackdrop, StyledModals } from "./Transitions.styled";
import { StepType } from "~/types";
import { Box } from "../Box";

interface BackdropProps {
  setType?: (val: StepType | null) => void;
}

export const Backdrop = ({ setType }: BackdropProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <Box
      className="backdrop"
      onClick={() => setType && setType(StepType.None)}
    ></Box>
  );
};

export const Transitions = () => {
  const modalTimeout = 200;
  const { modal } = useDataContext();
  const { setType, type } = useNavigationContext();
  const backdropRef = useRef(null);
  const startStepRef = useRef(null);
  const safeRef = useRef(null);
  const moduleRef = useRef(null);
  const txRef = useRef(null);
  const confirmationRef = useRef(null);

  return (
    <StyledBackdrop>
      {/* //////////////////////////// BACKDROP ///////////////////////////// */}
      {modal && type && (
        <CSSTransition
          nodeRef={backdropRef}
          key={"backdrop"}
          timeout={modalTimeout}
          classNames="opacity"
        >
          <Box ref={backdropRef}>
            <Backdrop setType={setType} />
          </Box>
        </CSSTransition>
      )}

      {/* //////////////////////////// MODALS ///////////////////////////// */}
      {/* 'modal?.toString()' is needed to avoid a TransitionGroup error */}
      <StyledModals modal={modal?.toString()}>
        {type === StepType.START && (
          <CSSTransition
            nodeRef={startStepRef}
            key={StepType.START}
            timeout={modalTimeout}
            classNames="slideBottom"
          >
            <Box ref={startStepRef}>
              <StartStep />
            </Box>
          </CSSTransition>
        )}

        {type === StepType.SAFE_MODULE_CREATION && (
          <CSSTransition
            nodeRef={safeRef}
            key={StepType.SAFE_MODULE_CREATION}
            timeout={modalTimeout}
            classNames="slideBottom"
          >
            <Box ref={safeRef}>
              <SafeSettingsStep />
            </Box>
          </CSSTransition>
        )}

        {type === StepType.TRANSACTION && (
          <CSSTransition
            nodeRef={txRef}
            key={StepType.TRANSACTION}
            timeout={modalTimeout}
            classNames="slideBottom"
          >
            <Box ref={txRef}>
              <TransactionStep />
            </Box>
          </CSSTransition>
        )}

        {type === StepType.XCALLDATA_REVIEW && (
          <CSSTransition
            nodeRef={confirmationRef}
            key={StepType.XCALLDATA_REVIEW}
            timeout={modalTimeout}
            classNames="slideBottom"
          >
            <Box ref={confirmationRef}>
              <FinishStep />
            </Box>
          </CSSTransition>
        )}

        {type === StepType.MODULE_SETUP && (
          <CSSTransition
            nodeRef={moduleRef}
            key={StepType.MODULE_SETUP}
            timeout={modalTimeout}
            classNames="slideBottom"
          >
            <Box ref={moduleRef}>
              <ModuleStep />
            </Box>
          </CSSTransition>
        )}
      </StyledModals>
    </StyledBackdrop>
  );
};
