import styles from "./InfoContent.module.css";

export default (
  <ol>
    <li>
      <b>Nader intern onderzoek nodig</b>
      <ul className={ styles.ul }>
        <li>Nader onderzoek nodig wat niet op de locatie zelf is. Bijv. advies van de teamleider of jurist.</li>
        <li>Verwerk de uitkomst vervolgens in een nieuwe debriefnotitie.</li>
      </ul>
    </li>
    <li>
      <b>Aanvullend bezoek nodig</b>
      <ul className={ styles.ul }>
        <li>Nader onderzoek nodig op het adres zelf door de toezichthouders.</li>
        <li>Zet dit bezoek uit via de projectmedewerker.</li>
        <li>Vermeldt waar specifiek op gelet moet worden.</li>
      </ul>
    </li>
  </ol>
);
