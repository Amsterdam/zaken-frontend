import { Spinner, ErrorMessage } from '@amsterdam/asc-ui';
import { EventsTimeline } from '@amsterdam/wonen-ui';
import { useCaseEvents } from 'app/state/rest';

type Props = {
  caseId: Components.Schemas.CaseEvent['id']
}

const TimelineContainer: React.FC<Props> = ({ caseId }) => {
  const [timelineEvents, { hasErrors }] = useCaseEvents(caseId);
  const showEmpty = timelineEvents?.length === 0;

  return (
    <>
      { hasErrors ? (
        <ErrorMessage message="Laden van tijdlijn evenementen mislukt" />
      ) : (
        <>
          { timelineEvents === undefined ? <Spinner /> : (
            <EventsTimeline
              events={timelineEvents}
              spacingHorizontal={3}
              prefixUrl={`${process.env.REACT_APP_AZA_FE}zaken/`}
            />
          )}
        </>
      )}
      { showEmpty && <p>Geen tijdlijn evenementen beschikbaar</p> }
    </>
  );
};

export default TimelineContainer;
