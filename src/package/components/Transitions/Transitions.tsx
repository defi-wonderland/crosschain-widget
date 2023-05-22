import { useRef, useState, useEffect } from "react";
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

export const Transitions = ({ modal }: { modal?: boolean }) => {
  const modalTimeout = 200;
  const { originChainId } = useDataContext();
  const { setType, type } = useNavigationContext();
  const [activeModal, setActiveModal] = useState<StepType | null>(null);
  const backdropRef = useRef(null);
  const startStepRef = useRef(null);
  const safeRef = useRef(null);
  const moduleRef = useRef(null);
  const txRef = useRef(null);
  const confirmationRef = useRef(null);

  let backdrop;

  if (type) {
    backdrop = <Backdrop setType={setType} />;
  }

  useEffect(() => {
    setActiveModal(type);
  }, [type]);

  /* 
    If the user changes the originChainId, we want to reset the modal
    to avoid any errors
  */
  useEffect(() => {
    setActiveModal(StepType.START);
  }, [originChainId]);

  return (
    <StyledBackdrop>
      {/* //////////////////////////// BACKDROP ///////////////////////////// */}
      {modal && backdrop && (
        <CSSTransition
          nodeRef={backdropRef}
          key={"backdrop"}
          timeout={modalTimeout}
          classNames="opacity"
        >
          <Box ref={backdropRef}>{backdrop}</Box>
        </CSSTransition>
      )}

      {/* //////////////////////////// MODALS ///////////////////////////// */}
      {/* 'modal?.toString()' is needed to avoid a TransitionGroup error */}
      <StyledModals modal={modal?.toString()}>
        {activeModal === StepType.START && (
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

        {activeModal === StepType.SAFE_MODULE_CREATION && (
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

        {activeModal === StepType.TRANSACTION && (
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

        {activeModal === StepType.XCALLDATA_REVIEW && (
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

        {activeModal === StepType.MODULE_SETUP && (
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
