import React, { useState } from "react";
import { useAuth } from "react-oidc-context";
import styled from "styled-components";
import { Button, Label, TextArea, Icon, Spinner } from "@amsterdam/asc-ui";
import { ExternalLink, PersonalLogin } from "@amsterdam/asc-assets";
import FeedbackButton from "./FeedbackButton";
import Modal, { ModalBlock } from "app/components/shared/Modal/Modal";
import { useModal } from "app/components/shared/Modal/hooks/useModal";
import { useCreateFeedback } from "@/api/hooks";
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages";

const StyledTextArea = styled(TextArea)`
  max-width: -webkit-fill-available;
  min-height: 150px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ListItem = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
`;

const Feedback: React.FC = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const auth = useAuth();
  const email = auth.user?.profile?.email;
  const { mutate: createFeedback, isPending } = useCreateFeedback();
  const { addSuccessFlashMessage } = useFlashMessages();
  const [feedback, setFeedback] = useState("");

  const onSubmitFeedback = () => {
    createFeedback(
      {
        feedback,
        url: window.location.href,
        user_agent: navigator.userAgent,
        screen: `${ window.innerWidth }x${ window.innerHeight }`,
      },
      {
        onSuccess: () => {
          addSuccessFlashMessage(
            window.location.pathname,
            "Succes",
            "Bedankt voor je feedback!",
          );
        },
        onSettled: () => {
          closeModal();
          setFeedback("");
        },
      },
    );
  };

  const onCloseModal = () => {
    closeModal();
    setFeedback("");
  };

  return (
    <>
      <FeedbackButton onClick={openModal} />
      <Modal isOpen={isModalOpen} onClose={onCloseModal} title="Feedback">
        <ModalBlock>
          <ListItem>
            <Icon>
              <PersonalLogin />
            </Icon>
            {email}
          </ListItem>
          <ListItem>
            <Icon>
              <ExternalLink />
            </Icon>
            {window.location.href}
          </ListItem>
          <Label
            htmlFor="feedback"
            label="Wat is je feedback of welke bug heb je gevonden?"
          />
          <StyledTextArea
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value);
            }}
          />
          <ButtonContainer>
            <Button
              onClick={onSubmitFeedback}
              variant="primary"
              disabled={!feedback.trim() || isPending}
              iconLeft={isPending ? <Spinner /> : null}
            >
              Versturen
            </Button>
          </ButtonContainer>
        </ModalBlock>
      </Modal>
    </>
  );
};

export default Feedback;
