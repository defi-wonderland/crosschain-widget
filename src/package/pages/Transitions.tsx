import { useRef, useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import {
  FinishStep,
  ModuleFinalStep,
  ModuleStep,
  StartStep,
  TransactionStep,
  SafeSettingsStep,
} from "~/pages";
import { useNavigationContext } from "~/Context";
import { StepType } from "~/types";
import "./styles.css";

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

export const Pages = () => {
  const modalTimeout = 200;
  const { setType, type } = useNavigationContext();
  const [activeModal, setActiveModal] = useState<StepType | null>(null);
  const backdropRef = useRef(null);
  const startStepRef = useRef(null);
  const safeRef = useRef(null);
  const moduleRef = useRef(null);
  const moduleFinalStepRef = useRef(null);
  const txRef = useRef(null);
  const confirmationRef = useRef(null);

  let backdrop;

  if (type) {
    backdrop = <Backdrop setType={setType} />;
  }

  useEffect(() => {
    setActiveModal(type);
  }, [type]);

  return (
    <>
      {/* //////////////////////////// BACKDROP ///////////////////////////// */}
      {backdrop && (
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
      <TransitionGroup className="modal-transition">
        {activeModal === StepType.START && (
          <CSSTransition
            nodeRef={startStepRef}
            key={StepType.START}
            timeout={modalTimeout}
            classNames="slideBottom"
          >
            <div ref={startStepRef}>
              <StartStep onClose={setType} />
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
              <SafeSettingsStep onClose={setType} />
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
              <TransactionStep onClose={setType} />
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
              <FinishStep onClose={setType} />
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
              <ModuleStep onClose={setType} />
            </div>
          </CSSTransition>
        )}

        {activeModal === StepType.MODULE_SETUP_CONFIRMATION && (
          <CSSTransition
            nodeRef={moduleFinalStepRef}
            key={StepType.MODULE_SETUP_CONFIRMATION}
            timeout={modalTimeout}
            classNames="slideBottom"
          >
            <div ref={moduleFinalStepRef}>
              <ModuleFinalStep onClose={setType} />
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </>
  );
};
