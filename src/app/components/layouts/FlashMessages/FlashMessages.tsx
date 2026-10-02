import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Alert, themeSpacing } from "@amsterdam/asc-ui";

import { useFlashMessages } from "app/state/flashMessages/useFlashMessages";
import { Column, Row } from "app/components/layouts/Grid";

const StyledAlert = styled(Alert)`
  margin: ${ themeSpacing(12) } 0;
`;

const FlashMessages: React.FC = () => {
  const { pathname } = useLocation();
  const { state, removeFlashMessage } = useFlashMessages();

  // Dismissing also removes the message, so the same message can be shown again later.
  const renderMessages = (path: string) =>
    state[path]?.map(({ messageId, ...props }) => (
      <StyledAlert key={ messageId } { ...props } onDismiss={ () => removeFlashMessage(path, messageId) } />
    ));

  return (
    <Row bottomSpacing={ 0 }>
      <Column>
        { renderMessages(pathname) }
        { renderMessages("current") }
      </Column>
    </Row>
  );
};

export default FlashMessages;
