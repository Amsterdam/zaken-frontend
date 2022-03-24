import { themeSpacing } from '@amsterdam/asc-ui';
import styled from 'styled-components';

const Ul = styled.ul`
  margin-bottom: ${themeSpacing(6)}
`;

export default (
  <ol>
    <li>
      <b>Nader intern onderzoek nodig</b>
      <Ul>
        <li>Nader onderzoek nodig wat niet op de locatie zelf is. Bijv. advies van de teamleider of jurist.</li>
        <li>Verwerk de uitkomst vervolgens in een nieuwe debriefnotitie.</li>
      </Ul>
    </li>
    <li>
      <b>Aanvullend bezoek nodig</b>
      <Ul>
        <li>Nader onderzoek nodig op het adres zelf door de toezichthouders.</li>
        <li>Zet dit bezoek uit via de projectmedewerker.</li>
        <li>Vermeldt waar specifiek op gelet moet worden.</li>
      </Ul>
    </li>
  </ol>
);
