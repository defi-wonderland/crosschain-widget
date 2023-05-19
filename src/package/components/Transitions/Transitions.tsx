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

interface BackdropProps {
  setType?: (val: StepType | null) => void;
}

export const Backdrop = ({ setType }: BackdropProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="backdrop"
      onClick={() => setType && setType(StepType.None)}
    ></div>
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
          <div ref={backdropRef}>{backdrop}</div>
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
            <div ref={startStepRef}>
              <StartStep />
            </div>
          </CSSTransition>
        )}

        {activeModal === StepType.SAFE_MODULE_CREATION && (
          <CSSTransition
            nodeRef={safeRef}
            key={StepType.SAFE_MODULE_CREATION}
            timeout={modalTimeout}
            classNames="slideBottom"
          >
            <div ref={safeRef}>
              <SafeSettingsStep />
            </div>
          </CSSTransition>
        )}

        {activeModal === StepType.TRANSACTION && (
          <CSSTransition
            nodeRef={txRef}
            key={StepType.TRANSACTION}
            timeout={modalTimeout}
            classNames="slideBottom"
          >
            <div ref={txRef}>
              <TransactionStep />
            </div>
          </CSSTransition>
        )}

        {activeModal === StepType.XCALLDATA_REVIEW && (
          <CSSTransition
            nodeRef={confirmationRef}
            key={StepType.XCALLDATA_REVIEW}
            timeout={modalTimeout}
            classNames="slideBottom"
          >
            <div ref={confirmationRef}>
              <FinishStep />
            </div>
          </CSSTransition>
        )}

        {activeModal === StepType.MODULE_SETUP && (
          <CSSTransition
            nodeRef={moduleRef}
            key={StepType.MODULE_SETUP}
            timeout={modalTimeout}
            classNames="slideBottom"
          >
            <div ref={moduleRef}>
              <ModuleStep />
            </div>
          </CSSTransition>
        )}
      </StyledModals>
    </StyledBackdrop>
  );
};
