import styled from "styled-components"

const FeedbackButton = styled.div`
  z-index: 999;
  right: 0;
  top: 50%;
  margin-top: -70px;
  width: 40px;
  height: 140px;
  position: fixed;
  background-color: #ec0000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  &::before {
    content: "Feedback";
    transform: rotate(270deg); /* Draait de tekst 90 graden */
    transform-origin: center;
  }
  box-shadow: rgba(0, 0, 0, 0.15) -1.95px 1.95px 2.6px;
`

export default FeedbackButton
