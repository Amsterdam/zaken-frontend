import React, { useState } from "react"
import { useAuth } from "react-oidc-context"
import styled from "styled-components"
import { Button, Label, TextArea, Icon, Spinner } from "@amsterdam/asc-ui"
import { ExternalLink, PersonalLogin } from "@amsterdam/asc-assets"
import FeedbackButton from "./FeedbackButton"
import Modal, { ModalBlock } from "app/components/shared/Modal/Modal"
import { useModal } from "app/components/shared/Modal/hooks/useModal"
import { useFeedback } from "app/state/rest"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"

const StyledTextArea = styled(TextArea)`
  max-width: -webkit-fill-available;
  min-height: 150px;
`

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 20px;
`

const ListItem = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
`

const Feedback: React.FC = () => {
  const { isModalOpen, openModal, closeModal } = useModal()
  const auth = useAuth()
  const email = auth.user?.profile?.email
  const [, { execPost }] = useFeedback()
  const { addSuccessFlashMessage } = useFlashMessages()
  const [feedback, setFeedback] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmitFeedback = () => {
    setLoading(true)
    execPost({
      feedback,
      url: window.location.href
    })
      .then((e) => {
        if ((e as { status: number })?.status === 200) {
          addSuccessFlashMessage(
            window.location.pathname,
            "Succes",
            "Bedankt voor je feedback!"
          )
        }
      })
      .finally(() => {
        setLoading(false)
        closeModal()
        setFeedback("")
      })
  }

  const onCloseModal = () => {
    closeModal()
    setFeedback("")
  }

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
              setFeedback(e.target.value)
            }}
          />
          <ButtonContainer>
            <Button
              onClick={onSubmitFeedback}
              variant="primary"
              disabled={!feedback.trim() || loading}
              iconLeft={loading ? <Spinner /> : null}
            >
              Versturen
            </Button>
          </ButtonContainer>
        </ModalBlock>
      </Modal>
    </>
  )
}

export default Feedback
