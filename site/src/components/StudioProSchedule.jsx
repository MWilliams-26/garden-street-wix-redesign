import ExternalCta from './ExternalCta';
import { externalLinks } from '../data/externalLinks';

export default function StudioProSchedule() {
  return (
    <section className="schedule-callout" id="registration">
      <p className="eyebrow">Current availability</p>
      <h2>Find your place at Garden Street</h2>
      <p>Studio Pro has the latest class availability and registration details.</p>
      {externalLinks.liveSchedule ? (
        <div className="schedule-frame">
          <iframe title="Garden Street live class schedule" src={externalLinks.liveSchedule} loading="lazy" />
          <ExternalCta href={externalLinks.generalRegistration}>Open registration in Studio Pro</ExternalCta>
        </div>
      ) : (
        <ExternalCta href={externalLinks.generalRegistration}>View classes in Studio Pro</ExternalCta>
      )}
    </section>
  );
}
