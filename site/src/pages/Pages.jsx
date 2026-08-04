import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo';
import ExternalCta from '../components/ExternalCta';
import StudioProSchedule from '../components/StudioProSchedule';
import ResponsiveImage from '../components/ResponsiveImage';
import { externalLinks } from '../data/externalLinks';
import { productions } from '../data/programs';
import { staff } from '../data/staff';
import { importantDates } from '../data/importantDates';
import { classSchedule } from '../data/classSchedule';
import { classDescriptions } from '../data/classDescriptions';
import { images } from '../data/imageSelections';
import { siteSettings } from '../data/siteSettings';

function Hero({ title, text, image, children, className = '' }) {
  return <section className={`page-hero ${image ? 'image-hero' : ''} ${className}`}>
    {image && <ResponsiveImage image={image} priority className="hero-image" />}
    <div className="hero-copy"><p className="eyebrow">Garden Street School of the Performing Arts</p><h1>{title}</h1><p className="lead">{text}</p>{children&&<div className="hero-actions">{children}</div>}</div>
  </section>;
}
function Gallery({ names, className = '' }) { return <div className={`gallery ${className}`}>{names.map(name => <ResponsiveImage key={name} image={images[name]} />)}</div>; }
const explore = [
  ['Dance Classes','/classes#class-finder','classBallet'], ['Musical Theatre','/musical-theatre#productions','backstage'],
  ['Summer Camp','/summer-camp#current-camp','campWide'], ['Parties & Rentals','/parties-rentals#party-options','studioMain'],
];
const agePaths = ['Walking–2', 'Ages 2–4', 'Ages 4–6', 'Ages 7–Teen'];
const studioVideos = [
  ['Inside the teaching process','See how students build confidence across different dance styles.','classTeaching',externalLinks.teachingVideo],
  ['TikTok Dance Lab','Watch a current class that turns trending movement into performance skills.','communityDance',externalLinks.tiktokDanceLabVideo],
  ['Summer Camp in action','Step inside a themed week filled with movement, creativity and friendship.','campWide',externalLinks.summerCampVideo],
];
export function Home() { return <><Seo page="home" path="/" />
  <Hero className="home-hero" image={images.hero} title="Train. Perform. Grow." text="Garden Street gives children a welcoming place to build creativity, confidence and skills that reach far beyond the stage."><Link className="button" to="/classes#class-finder">Find a Class</Link></Hero>
  <section id="ages" className="tint home-pathways"><Section title="Start with age or explore a program." eyebrow="Find your next step"/><p className="pathway-intro">Choose the route that feels easiest. We’ll help you find the right fit from there.</p><div className="pathway-group"><p className="pathway-label">Start with age</p><div className="age-row">{agePaths.map(age=><Link to={`/classes?age=${encodeURIComponent(age)}#class-finder`} key={age}><strong>{age}</strong><span>View classes →</span></Link>)}</div></div><div className="pathway-group"><p className="pathway-label">Explore by program</p><div className="visual-cards explore-grid">{explore.map(([title,to,image])=><Link to={to} className="visual-card" key={title}><ResponsiveImage image={images[image]}/><h3>{title}<span aria-hidden="true">→</span></h3></Link>)}</div></div></section>
  <section className="seasonal-promo"><div className="seasonal-promo-image"><ResponsiveImage image={images.classBallet}/></div><div className="seasonal-promo-content"><div><p className="eyebrow">Registering now · August 8–29</p><h2>Summer Saturday Ballet Series</h2><p>Four welcoming Saturday classes help young dancers build confidence and ballet fundamentals before fall.</p><Link className="button" to="/pricing#summer-ballet-pricing">View series pricing</Link></div><div className="seasonal-promo-details"><p><strong>Tiny Dancers</strong><span>Ages 2–4 · 9:30–10:15 AM</span></p><p><strong>Petite Ballet</strong><span>Ages 3–4 · 10:15–11:00 AM</span></p><p><strong>Ballet 1</strong><span>Ages 4–5 · 11:00–11:45 AM</span></p></div></div></section>
  <section className="home-theatre"><div className="home-theatre-heading"><Section title="This season’s stories are ready for the stage." eyebrow="Now casting"/><Link className="arrow" to="/musical-theatre#productions">Explore Musical Theatre →</Link></div><div className="theatre-poster-links">{productions.map((production,i)=><Link className="theatre-poster-link" to={`/musical-theatre#production-${i+1}`} aria-label={`Explore ${production.name} Musical Theatre`} key={production.name}><ResponsiveImage image={images[i?'wonkaTitle':'trollsTitle']}/></Link>)}</div></section>
  <section className="split home-why"><Section title="Purposeful training. Joyful community." eyebrow="Why Garden Street"/><div><p>Since 2005, Garden Street has helped young artists develop skills, confidence and a lasting connection to the performing arts.</p><ul className="checks"><li>Supportive, welcoming community</li><li>Multidisciplinary performing-arts training</li><li>Performance opportunities throughout the year</li><li>Creativity, confidence, discipline, teamwork and growth</li></ul></div></section>
  <section className="studio-videos"><div className="studio-videos-heading"><Section eyebrow="See Garden Street in action" title="A look inside classes and camp."/><p>Short videos from Garden Street’s official Instagram show the energy, teaching and community families can expect.</p></div><div className="studio-video-grid">{studioVideos.map(([title,text,image,href])=><a href={href} target="_blank" rel="noreferrer" key={title}><ResponsiveImage image={images[image]}/><span><strong>{title}</strong><small>{text}</small><b>Watch on Instagram ↗</b></span><span className="sr-only"> (opens in a new tab)</span></a>)}</div></section>
  <UpcomingDates />
  <section className="owners split"><ResponsiveImage image={images.owners}/><div><Section title="Led with care by Victoria and Cory Johnson." eyebrow="Meet the owners"/><p>Garden Street is a community-centered performing-arts school serving Hoboken families since 2005.</p><Link className="arrow" to="/about">Our story →</Link></div></section>
  <StudioProSchedule /></> }
function Section({eyebrow,title}) { return <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>; }

function formatDate(date, options) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', options);
}

function upcomingDates(limit) {
  const today = new Date().toISOString().slice(0, 10);
  return importantDates.filter(([date]) => date >= today).slice(0, limit);
}

function UpcomingDates() {
  const dates = upcomingDates(3);
  if (!dates.length) return null;
  return <section className="upcoming-section tint"><Section eyebrow="Coming up" title="Plan ahead at Garden Street."/><div className="upcoming-list">{dates.map(([date,title])=><article key={date+title}><time dateTime={date}>{formatDate(date,{month:'short',day:'numeric'})}</time><h3>{title}</h3></article>)}</div><Link className="arrow" to="/important-dates#dates">View all important dates →</Link></section>;
}

const classAgeGroups = [
  ['Walking–2', 0, 2],
  ['Ages 2–4', 2, 4],
  ['Ages 4–6', 4, 6],
  ['Ages 7–Teen', 7, 18],
];
const classInterests = ['All interests', 'Dance', 'Acro & Tumbling', 'Musical Theatre'];

function matchesAge(age, group) {
  if (age === 'All Ages') return true;
  if (age.includes('Walking')) return group === 'Walking–2';
  const numbers = age.match(/\d+/g)?.map(Number) || [];
  const [, selectedMin, selectedMax] = classAgeGroups.find(([label]) => label === group);
  const [classMin, classMax = age.includes('Teen') ? 18 : classMin] = numbers;
  return classMin <= selectedMax && classMax >= selectedMin;
}

function matchesInterest(category, interest) {
  if (interest === 'All interests') return true;
  if (interest === 'Dance') return category === 'Dance Styles' || category === 'Ballet & Technique';
  if (interest === 'Acro & Tumbling') return category === 'Acro, Tumbling & Wellness';
  return category === interest;
}

function descriptionKey(name) {
  return name.toLowerCase()
    .replace(/grown[- ]up & me.*$/, 'grown up me')
    .replace(/dance lab.*|introduction to dance.*|intro to dance.*/, 'intro dance')
    .replace(/^adv\.? hip hop.*/, 'advanced hip hop')
    .replace(/acro ii\b/, 'acro 2')
    .replace(/acro i\b/, 'acro 1')
    .replace(/ballet iii\b/, 'ballet 3')
    .replace(/ballet ii\b/, 'ballet 2')
    .replace(/ballet i\b/, 'ballet 1')
    .replace(/\([^)]*\)/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function descriptionFor(name) {
  const key = descriptionKey(name);
  return classDescriptions.find((description) => descriptionKey(description.name) === key);
}

const classPricing = [
  { label: 'One weekly class', price: '$125', cadence: 'per month' },
  { label: 'Additional class', price: '$99', cadence: 'per month' },
  { label: 'Sibling rate', price: '$99', cadence: 'per month' },
  { label: 'Drop-in class', price: '$34', cadence: 'per class' },
  { label: 'Dance registration', price: '$50', cadence: 'annually' },
  { label: 'Musical Theatre production fee', price: '$75', cadence: 'per production' },
];

const hostedPartyPackages=[
  {name:'Celebration',studentPrice:'$650',standardPrice:'$700',includes:['Party host','Instructor or entertainer','Setup and cleanup','Complimentary class']},
  {name:'Deluxe',studentPrice:'$750',standardPrice:'$800',includes:['Everything in Celebration','Pizza and juice','Plates and napkins']},
];

const danceTeams = [
  { name: 'Fresh Stars', level: 'Pre-competition team', ages: 'Ages 5–Teen', price: '$225/month', text: 'For dancers who want focused training and team experiences without a competition requirement.', requirements: 'Ballet plus two additional classes' },
  { name: 'Shooting Stars', level: 'Intro competition team', ages: 'Ages 7–Teen', price: '$150/month', text: 'A supportive first step into competition for dancers ready to perform as part of a company.', requirements: 'Ballet, weekly company rehearsal and one competition class' },
  { name: 'Twinkle Stars', level: 'Mini competition team', ages: 'Placement details available from the studio', price: '$150/month', text: 'Garden Street’s mini competition pathway for dancers ready for a team experience.' },
  { name: 'All-Stars', level: 'Full competition team', ages: 'Placement details available from the studio', price: '$250/month', text: 'Garden Street’s full competition pathway, with current requirements available directly from the studio.' },
];
const contactTopics = ['General question', 'Class availability', 'Performance Lab', 'Dance team placement', 'Summer Camp availability', 'Musical Theatre', 'Party', 'Studio rental'];

export function Classes() {
 const [searchParams,setSearchParams]=useSearchParams();
 const age=classAgeGroups.some(([label])=>label===searchParams.get('age'))?searchParams.get('age'):'';
 const [interest,setInterest]=useState('All interests');
 const [day,setDay]=useState('Any day');
 const days=['Any day',...new Set(classSchedule.map(x=>x.day))];
 const eligibleRows=age?classSchedule.filter(x=>matchesAge(x.age,age)&&matchesInterest(x.category,interest)):[];
 const dayCounts=eligibleRows.reduce((counts,row)=>({...counts,[row.day]:(counts[row.day]||0)+1}),{});
 const availableDays=days.filter(value=>value==='Any day'||dayCounts[value]);
 const rows=eligibleRows.filter(x=>day==='Any day'||x.day===day);
 const rowsByDay=rows.reduce((groups,row)=>({...groups,[row.day]:[...(groups[row.day]||[]),row]}),{});
 const resetFinder=()=>{setInterest('All interests');setDay('Any day');setSearchParams({},{replace:true});};
 return <><Seo page="classes" path="/classes"/><Hero className="classes-hero" image={images.communityDance} title="Classes for every next step." text="Find the right weekly class, explore current opportunities and check availability."/>
 <section className="class-finder" id="class-finder"><Section eyebrow="Find a class" title="Start with your child’s age."/><p className="finder-intro">Choose an age group, then narrow the results by interest and the days that work for your family.</p>
  <fieldset className="choice-group"><legend>Child’s age</legend><div className="age-choices">{classAgeGroups.map(([label])=>{const count=classSchedule.filter(row=>matchesAge(row.age,label)).length;return <button type="button" className={age===label?'choice active':'choice'} aria-pressed={age===label} onClick={()=>{setDay('Any day');setSearchParams({age:label},{replace:true})}} key={label}><span>{label}</span><small>{count} {count===1?'class':'classes'}</small></button>})}</div></fieldset>
  {age&&<div className="finder-controls"><fieldset className="choice-group"><legend>Interest</legend><div className="interest-choices">{classInterests.map(label=><button type="button" className={interest===label?'choice active':'choice'} aria-pressed={interest===label} onClick={()=>{setInterest(label);setDay('Any day')}} key={label}>{label}</button>)}</div></fieldset><fieldset className="choice-group"><legend>Day</legend><div className="day-choices">{availableDays.map(value=>{const count=value==='Any day'?eligibleRows.length:dayCounts[value];const label=value==='Any day'?'All days':value;return <button type="button" className={day===value?'choice active':'choice'} aria-label={`${label}, ${count} ${count===1?'class':'classes'}`} aria-pressed={day===value} onClick={()=>setDay(value)} key={value}><span className="day-full">{label}</span><span className="day-short" aria-hidden="true">{value==='Any day'?'All':value.slice(0,3)}</span><small aria-hidden="true">{count}</small></button>})}</div></fieldset><div className="finder-reset"><button type="button" onClick={resetFinder}>Start over</button></div></div>}
  {!age?<div className="finder-prompt"><p><strong>Choose an age group above.</strong><span>Matching class names, days, times and descriptions will appear here.</span></p></div>:<><div className="results-heading"><p aria-live="polite"><strong>{rows.length}</strong> {rows.length===1?'class':'classes'} match your choices</p></div>{rows.length?Object.entries(rowsByDay).map(([rowDay,dayRows])=><div className="day-group" key={rowDay}><h3>{rowDay}</h3><div className="class-results">{dayRows.map((x,i)=>{const details=descriptionFor(x.name);const summary=details?.description.split(/(?<=[.!?])\s/)[0];return <article className="class-result" key={`${x.day}-${x.time}-${i}`}><div className="class-result-main"><div><p className="eyebrow">{x.category}</p><h4>{x.name}</h4><p className="class-meta">{x.age} <span aria-hidden="true">·</span> {x.time} <span aria-hidden="true">·</span> {x.studio}</p>{summary&&<p className="class-summary">{summary}</p>}</div></div>{details&&<details><summary>Class details</summary><div className="class-details"><p>{details.description}</p>{details.prerequisite&&<p><strong>Prerequisite:</strong> {details.prerequisite}</p>}{details.recommendations&&<p><strong>Suggestions:</strong> {details.recommendations}</p>}</div></details>}</article>})}</div></div>):<div className="empty"><p>No classes match all three choices.</p><button className="button" type="button" onClick={()=>{setInterest('All interests');setDay('Any day')}}>Clear interest and day</button></div>}</>}
 </section>
 <section className="current-class-note tint"><div><p className="eyebrow">Limited summer series</p><h2>Wednesday Performance Lab</h2><p>Technique meets performance through stage presence, musicality and confidence. Ask the studio which remaining Wednesday evenings have space.</p></div><Link className="arrow" to="/contact?topic=Performance+Lab#contact-form">Ask about Performance Lab →</Link></section>
 <StudioProSchedule/></>;
}
export function DanceTeams(){return <><Seo page="dance-teams" path="/dance-teams"/><Hero className="dance-teams-hero" image={images.advanced} title="Train together. Perform with purpose." text="Team pathways give dancers focused training, shared goals and the experience of growing as part of a company."/>
  <section className="dance-teams dark" id="team-pathways"><div className="dance-teams-heading"><Section eyebrow="Find a pathway" title="A team experience for each next step."/><div><p>Garden Street offers pre-competition and competition pathways for dancers ready for additional training and performance opportunities.</p></div></div><div className="team-pathway-grid">{danceTeams.map(team=><article key={team.name}><p className="eyebrow">{team.level}</p><h3>{team.name}</h3><p className="team-ages">{team.ages}</p><p>{team.text}</p>{team.requirements&&<p className="team-requirements"><strong>Training requirement:</strong> {team.requirements}</p>}</article>)}</div><div className="team-extras"><p><span>Musical Theatre company</span><strong>Broadway Stars</strong></p><p><span>Multidisciplinary option</span><strong>Triple Threat add-on</strong></p><p><span>Additional training</span><strong>Team dance class add-on</strong></p></div><p className="team-fine-print">Competition dates have intentionally been omitted. Confirm current placement, required classes and separate convention or competition commitments with Garden Street.</p></section>
  <section className="teams-next-step"><Section eyebrow="Start the conversation" title="Let’s find the right team fit."/><div><p>Contact Garden Street for current placement guidance and requirements, or review class and pricing information first.</p><div className="teams-next-actions"><Link className="button" to="/contact?topic=Dance+team+placement">Ask about placement</Link><Link className="button ghost" to="/classes#class-finder">Explore classes</Link><Link className="arrow" to="/pricing#team-pricing">View pricing →</Link></div></div></section></>}
export function Pricing(){return <><Seo page="pricing" path="/pricing"/><Hero className="pricing-hero" title="Straightforward pricing for every path." text="Compare current class, enrollment, Musical Theatre and team costs before opening Studio Pro."/>
  <section className="class-pricing pricing-page" id="class-pricing"><div className="class-pricing-heading"><Section eyebrow="2026–27 class pricing" title="Start with the weekly class rate."/><div><p>Choose one weekly class, then use the reduced rate for another class or a sibling.</p><p className="pricing-registration">The annual dance registration fee is nonrefundable, due at enrollment and capped at <strong>$100 per family.</strong></p></div></div><div className="pricing-grid">{classPricing.map(item=><article key={item.label}><p>{item.label}</p><p className="pricing-amount"><strong>{item.price}</strong><span>{item.cadence}</span></p></article>)}</div><p className="pricing-note"><strong>Current offer: the six-week Grown-Up & Me Ballet session is free.</strong> Musical Theatre-only students do not pay the annual dance registration fee. Students enrolled in both Dance and Musical Theatre pay the applicable registration and production fees.</p></section>
  <section className="seasonal-rate tint" id="summer-ballet-pricing"><div><p className="eyebrow">Current summer special</p><h2>Summer Saturday Ballet Series</h2><p>August 8–29 · Four Saturdays · No registration fee</p></div><div><p><strong>$125</strong><span>Full four-week series</span></p><p><strong>$34</strong><span>Single-class drop-in</span></p></div></section>
  <section className="program-pricing" id="program-pricing"><Section eyebrow="Programs & camps" title="Musical Theatre and Summer Camp."/><div className="service-price-list"><p><span><strong>Trolls Kids</strong><small>Monthly tuition · production fee listed above</small></span><strong>$125/month</strong></p><p><span><strong>Willy Wonka Jr.</strong><small>Monthly tuition · production fee listed above</small></span><strong>$125/month</strong></p><p><span><strong>Summer Camp 2026</strong><small>Weekly enrollment</small></span><strong>$499/week</strong></p><p><span><strong>Summer Camp aftercare</strong><small>4:00–5:30 PM</small></span><strong>$25/day</strong></p></div></section>
  <section className="team-pricing dark" id="team-pricing"><Section eyebrow="Dance team pricing" title="Published monthly team rates."/><div className="team-price-list">{danceTeams.map(team=><p key={team.name}><span><strong>{team.name}</strong><small>{team.level}</small></span><strong>{team.price}</strong></p>)}</div><div className="team-add-ons"><p className="eyebrow">Company & add-ons</p><div className="team-price-list team-add-on-list"><p><span><strong>Broadway Stars</strong><small>Musical Theatre company</small></span><strong>$150/month</strong></p><p><span><strong>Triple Threat</strong><small>Multidisciplinary add-on</small></span><strong>$50/month</strong></p><p><span><strong>Team dance class</strong><small>Additional training</small></span><strong>$50/month</strong></p></div></div><p className="team-fine-print">Team placement, required classes and separate convention or competition fees must be confirmed with Garden Street. Monologues, solos and private lessons are scheduled and paid for separately.</p></section>
  <section className="pricing-next-step"><Section eyebrow="Ready for the next step?" title="Choose a program, then confirm availability."/><div><Link className="button" to="/classes#class-finder">Find a class</Link><Link className="button ghost" to="/dance-teams#team-pathways">Explore teams</Link><ExternalCta className="button ghost" href={externalLinks.generalRegistration}>Open Studio Pro</ExternalCta></div></section></>}
export function MusicalTheatre(){return <><Seo page="musical-theatre" path="/musical-theatre"/><Hero className="musical-theatre-hero" image={images.backstage} title="Sing, act and dance as part of a cast." text="Build confidence, creativity, teamwork, communication and stage presence."/><section className="musical-productions" id="productions"><div className="production-list"><div className="production-intro"><p className="eyebrow">Choose a production</p><h2>There’s a role for every young performer.</h2><p>Both programs rehearse on Mondays and lead to a fully staged winter production.</p></div>{productions.map((p,i)=><article className="production-card" id={`production-${i+1}`} key={p.name}><div className="production-art"><ResponsiveImage image={images[i?'wonkaTitle':'trollsTitle']} priority/></div><p className="production-number" aria-hidden="true">0{i+1}</p><div className="production-copy"><h3>{p.name}</h3><p className="production-meta"><strong>{p.ages}</strong><span>{p.day}</span></p><p className="production-note">Begins September 14, 2026. Winter 2027 performance details coming. Costumes are separate.</p></div></article>)}<div className="production-pricing-link"><Link className="arrow" to="/pricing#program-pricing">View Musical Theatre pricing →</Link></div></div></section><StudioProSchedule/></>}
export function Camps(){return <><Seo page="summer-camp" path="/summer-camp"/>
  <Hero className="camps-hero" image={images.campWide} title="Summer days made for movement." text="Themed camps continue through August 21, with flexible weekly experiences for ages 4–12.">
    <a className="button" href="#current-camp">Explore remaining weeks</a>
  </Hero>
  <section className="current-camp" id="current-camp"><div className="current-camp-intro"><Section eyebrow="Summer 2026" title="There is still time to join the fun."/><p>Full-day camp blends dance, music, theatre and art. Students are grouped by age and level, and families may choose the K-Pop Summer Camp track or individual themed weeks.</p><p><strong>Ages 4–12</strong> · Drop-off 8:00–9:00 AM · Pickup 4:00 PM</p><p>K-Pop Summer Camp and the remaining themed weeks continue through August 21.</p><p><Link to="/pricing#program-pricing">View Summer Camp pricing →</Link></p><Link className="arrow" to="/contact?topic=Summer+Camp+availability#contact-form">Ask about current availability →</Link></div><div className="camp-week-list" aria-label="Remaining themed camp weeks"><p><time dateTime="2026-07-27">July 27–31</time><strong>Royalty Week</strong><span>Cheer and dance fusion</span></p><p><time dateTime="2026-08-03">August 3–7</time><strong>Acro Hip Hop Week</strong><span>Flip, tumble and hip hop</span></p><p><time dateTime="2026-08-10">August 10–14</time><strong>Lights, Camera, Musical Camp</strong><span>Movie musical hits</span></p><p><time dateTime="2026-08-17">August 17–21</time><strong>Glow Jam Rockstar Camp</strong><span>Music, performance and a glow party</span></p></div></section>
  <section className="camp-in-action dark"><div><Section eyebrow="See the experience" title="Watch Summer Camp in action."/><p>Take a look inside Wicked Week, then contact Garden Street to ask which remaining weeks still have space.</p></div><ExternalCta href={externalLinks.summerCampVideo}>Watch the camp video on Instagram</ExternalCta></section>
  <section className="camp-overview" id="camp-details">
    <div className="camp-overview-copy"><Section eyebrow="Looking ahead" title="Summer Camp returns June 21, 2027."/><p>Camp gives children space to dance, explore creative movement and enjoy active group experiences in the studio.</p><div className="camp-date"><p className="eyebrow">Confirmed 2027 start date</p><p><strong>June 21, 2027</strong></p><span>Session schedule, ages, pricing and registration details are coming soon.</span></div></div>
    <Gallery className="camp-photo-grid" names={['campCreative','campObstacle','campCircle','campBarre']}/>
  </section>
  <section className="camp-updates dark"><div><Section eyebrow="Camp announcements" title="Want the details when they’re ready?"/><p>Join the Garden Street mailing list for program news and registration announcements.</p><ExternalCta href={externalLinks.mailingList}>Join the mailing list</ExternalCta></div><div className="camp-other-programs"><p className="eyebrow">Looking for a program now?</p><Link to="/classes#class-finder">Explore classes →</Link><Link to="/musical-theatre#productions">Explore Musical Theatre →</Link></div></section>
  </>}
const partyThemes=['Ballerina Princess','K-Pop','TikTok Dance Lab','Dance Class','Creative Music & Movement'];
export function Parties(){return <><Seo page="parties-rentals" path="/parties-rentals"/>
  <Hero className="parties-hero" image={images.studioMain} title="A celebration that moves with them." text="Choose a hosted performing-arts party or make the studio your own with a private rental."/>
  <section className="party-paths" id="party-options"><div className="party-section-heading"><Section eyebrow="Plan your celebration" title="How would you like to make it yours?"/><p>Explore everything Garden Street offers, then choose the level of support and experience that fit your plans.</p></div><div className="party-path-grid"><article className="party-path-card"><span aria-hidden="true">01</span><p className="eyebrow">Hosted party</p><h3>Start with a package and theme.</h3><p>See what Celebration and Deluxe include, explore the available themes and choose the combination that feels right.</p><a href="#hosted-parties">Explore packages & themes →</a></article><article className="party-path-card"><span aria-hidden="true">02</span><p className="eyebrow">Studio rental</p><h3>Bring your own plan.</h3><p>Reserve the studio for three hours and bring your own food, decorations and entertainment.</p><a href="#studio-rental">Explore private rental →</a></article></div></section>
  <section className="hosted-parties tint" id="hosted-parties"><div className="party-section-heading"><Section eyebrow="Design your hosted party" title="Choose a package, then make it theirs."/><p>Review everything included in each two-hour package, then choose a theme for up to 24 children.</p></div><p className="gratuity-note">Garden Street student pricing is shown first. An 18% gratuity applies to hosted packages.</p><div className="hosted-package-grid">{hostedPartyPackages.map(p=><article className="hosted-package" key={p.name}><div className="package-topline"><h3>{p.name}</h3><span>2 hours · Up to 24 children</span></div><div className="package-prices"><p><strong>{p.studentPrice}</strong><span>Garden Street students</span></p><p><strong>{p.standardPrice}</strong><span>Non-students</span></p></div><ul>{p.includes.map(item=><li key={item}>{item}</li>)}</ul><Link className="text-link" to="/contact?topic=Party#contact-form">Ask about {p.name} →</Link></article>)}</div><div className="party-themes"><p className="eyebrow">Make it their own · Choose a theme</p><div className="tags">{partyThemes.map(theme=><span key={theme}>{theme}</span>)}</div></div></section>
  <section className="rental-section" id="studio-rental"><div className="rental-copy"><Section eyebrow="Private studio rental" title="Bring your own celebration to life."/><p>Enjoy exclusive use of the studio for three hours. Bring your own food, drinks, cake, decorations and entertainment.</p><div className="rental-price"><strong>$450</strong><span>three hours</span></div><p className="rental-extra">Additional time · $90/hour</p><p>Renters are responsible for cleanup and removing all supplies and trash.</p><Link className="button" to="/contact?topic=Studio+rental#contact-form">Ask about studio rental</Link></div><ResponsiveImage image={images.brandedWall}/></section>
  <section className="party-space"><div className="party-section-heading"><Section eyebrow="The space" title="Room to gather, move and celebrate."/><p>Explore the Garden Street studios, then contact the team to ask about availability.</p></div><Gallery className="party-gallery" names={['studioMain','studioB','brandedWall']}/></section>
  <section className="party-final-cta"><p className="eyebrow">Ready to start planning?</p><h2>Tell us what you have in mind.</h2><p>Share your preferred package or rental, theme and date, and Garden Street can help with availability and next steps.</p><Link className="button" to="/contact?topic=Party#contact-form">Ask about a date</Link></section>
  </>}
function ProfileCard({ person, owner = false }) { return <article className={`profile-card ${owner?'owner-profile':'staff-profile'}${person.detailsPending?' team-card-pending':''}`}><ResponsiveImage image={images[person.image]}/><div className="team-card-copy"><h3>{person.name}</h3>{person.detailsPending?<p className="team-pending">Role and bio coming soon.</p>:<><p className="team-role">{person.role}</p><p>{person.bio}</p></>}</div></article>; }
export function About(){const owners=staff.slice(0,2);const team=staff.slice(2);return <><Seo page="about" path="/about"/><section className="about-hero owners split"><ResponsiveImage image={images.owners} priority/><div className="hero-copy"><p className="eyebrow">Meet the owners</p><h1>A place to learn, create and belong.</h1><p className="lead">For more than 20 years, Garden Street has welcomed Hoboken families into a community where young artists can build confidence and grow.</p></div></section><section className="split about-foundation" id="our-story"><Section eyebrow="Our story & purpose" title="Rooted in Hoboken. Growing with purpose."/><div><p>Founded in 2005, Garden Street has inspired children to discover their creativity, build confidence and develop a lifelong love of the performing arts.</p><p>In June 2026, the studio entered a new chapter under Victoria and Cory Johnson. Today, Garden Street continues that legacy through purposeful training, confident performance and a supportive community where every young artist can grow.</p></div></section><section className="tint about-team"><Section eyebrow="Our owners" title="Leading Garden Street’s next chapter."/><p className="team-intro">Victoria and Cory Johnson are building on Garden Street’s long relationship with Hoboken families and creating a supportive home for every young artist.</p><div className="owner-profiles">{owners.map(person=><ProfileCard person={person} owner key={person.name}/>)}</div><div className="staff-section-heading"><p className="eyebrow">Our team</p><h2>The people who welcome, teach and inspire.</h2></div><div className="staff-grid">{team.map(person=><ProfileCard person={person} key={person.name}/>)}</div></section></>}
export function Contact(){const [searchParams]=useSearchParams();const requestedTopic=searchParams.get('topic');const topic=contactTopics.includes(requestedTopic)?requestedTopic:'General question';const sent=searchParams.get('sent')==='1';return <><Seo page="contact" path="/contact"/>
  <Hero className="contact-page-hero" title="Let’s start a conversation." text="Send one message with the details that matter, and the Garden Street team can follow up in the way that works best for you."/>
  <section className="contact-hub"><div className="contact-form-intro"><Section eyebrow="Contact Garden Street" title="How can we help?"/><p>Complete the form for class, team, camp, party, rental or general questions. Share what you’re looking for and the team will help you choose the right next step.</p><div className="contact-direct"><p><strong>Prefer to call?</strong><a href={`tel:${siteSettings.phone.replaceAll('-','')}`}>{siteSettings.phone}</a></p><p><strong>Response destination</strong><span>{siteSettings.email}</span></p></div></div>
    <div className="contact-form-wrap" id="contact-form">{sent&&<div className="form-success" role="status"><strong>Thanks for reaching out.</strong><span>Your message was sent to Garden Street. The team will follow up using your preferred contact method.</span></div>}<form className="contact-form" action={`https://formsubmit.co/${siteSettings.email}`} method="POST">
      <input type="hidden" name="_subject" value="New website inquiry"/><input type="hidden" name="_template" value="table"/><input type="hidden" name="_next" value={`${window.location.origin}/contact?sent=1#contact-form`}/><input className="form-honeypot" type="text" name="_honey" tabIndex="-1" autoComplete="off"/>
      <div className="form-field"><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" type="text" autoComplete="name" required/></div>
      <div className="form-row"><div className="form-field"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" required/></div><div className="form-field"><label htmlFor="contact-phone">Phone number</label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" required/></div></div>
      <div className="form-row"><div className="form-field"><label htmlFor="contact-preference">Best way to contact you</label><select id="contact-preference" name="preferred contact method" required defaultValue=""><option value="" disabled>Choose one</option><option>Email</option><option>Phone call</option><option>Text message</option></select></div><div className="form-field"><label htmlFor="contact-topic">What can we help with?</label><select id="contact-topic" name="topic" defaultValue={topic} key={topic}>{contactTopics.map(option=><option key={option}>{option}</option>)}</select></div></div>
      <div className="form-field"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" rows="6" placeholder="Tell us what you’re looking for, your child’s age if relevant, and any helpful timing details." required></textarea></div>
      <button className="button" type="submit">Send message</button><p className="form-note">Your information will only be used to respond to your inquiry.</p>
    </form></div></section>
  <section className="contact-location tint"><div className="contact-location-copy"><Section eyebrow="Visit Garden Street" title="Find us in the heart of Hoboken."/><address>{siteSettings.address}</address><p>Use directions to plan your visit and confirm the best route before you leave.</p><div className="contact-location-actions"><ExternalCta href={externalLinks.directions}>Get directions</ExternalCta><ExternalCta className="text-link" href={externalLinks.instagram}>Follow on Instagram</ExternalCta></div></div><ResponsiveImage className="contact-location-image" image={images.brandedWall}/></section>
  </>}
function calendarCategory(title){if(/recital/i.test(title))return 'Performance';if(/closed|closure/i.test(title))return 'Studio closure';if(/camp/i.test(title))return 'Camp';return 'Classes';}
function nextCalendarDate(date){const next=new Date(`${date}T00:00:00Z`);next.setUTCDate(next.getUTCDate()+1);return next.toISOString().slice(0,10).replaceAll('-','');}
function seasonCalendarHref(){const clean=s=>s.replace(/([,;\\])/g,'\\$1').replace(/\n/g,'\\n');const events=importantDates.map(([date,title])=>{const stamp=date.replaceAll('-','');return `BEGIN:VEVENT\r\nUID:${stamp}-${title.toLowerCase().replace(/[^a-z0-9]+/g,'-')}@gardenstreetperformingarts.com\r\nDTSTART;VALUE=DATE:${stamp}\r\nDTEND;VALUE=DATE:${nextCalendarDate(date)}\r\nSUMMARY:${clean(title)}\r\nEND:VEVENT`;}).join('\r\n');const content=`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Garden Street School of the Performing Arts//Important Dates//EN\r\nCALSCALE:GREGORIAN\r\n${events}\r\nEND:VCALENDAR\r\n`;return `data:text/calendar;charset=utf-8,${encodeURIComponent(content)}`;}
function DateItem({date,title}){const category=calendarCategory(title);return <article className={`date-item ${category.toLowerCase().replace(' ','-')}`}><time dateTime={date}><span>{formatDate(date,{month:'short'}).toUpperCase()}</span><strong>{formatDate(date,{day:'numeric'})}</strong></time><div><span className="date-tag">{category}</span><h3>{title}</h3></div></article>}
function DateList({dates}){return <div className="date-list">{dates.map(([date,title])=><DateItem date={date} title={title} key={date+title}/>)}</div>}
function DateSeason({label,dates,isCurrent,nextDate}){const mobileDates=isCurrent&&dates.length>1?dates.filter(([date])=>date!==nextDate):dates;return <><div className="date-season date-season-desktop"><h2 className="date-season-heading">{label}</h2><DateList dates={dates}/></div><details className="date-season date-season-mobile" open={isCurrent}><summary><span>{label}</span><small>{mobileDates.length} {isCurrent&&mobileDates.length<dates.length?'more ':''}{mobileDates.length===1?'date':'dates'}</small></summary><DateList dates={mobileDates}/></details></>}
export function Dates(){const next=upcomingDates(1)[0];const groups=[['Fall 2026',importantDates.filter(([date])=>date.startsWith('2026'))],['Winter & Spring 2027',importantDates.filter(([date,title])=>date.startsWith('2027')&&!/summer camp/i.test(title))],['Summer 2027',importantDates.filter(([,title])=>/summer camp/i.test(title))]];return <><Seo page="important-dates" path="/important-dates"/><Hero title="Important dates for 2026–27." text="Season milestones, performances and planned studio closures."><a className="button" href={seasonCalendarHref()} download="garden-street-important-dates-2026-27.ics">Download the complete calendar</a></Hero><section className="dates-content" id="dates">{next&&<div className="next-date"><p className="eyebrow">Next up</p><time dateTime={next[0]}>{formatDate(next[0],{weekday:'long',month:'long',day:'numeric',year:'numeric'})}</time><h2>{next[1]}</h2></div>}<p className="calendar-note">Dates are subject to change. Check this page and studio communications for updates.</p>{groups.map(([label,dates])=>dates.length?<DateSeason label={label} dates={dates} nextDate={next?.[0]} isCurrent={dates.some(([date])=>date===next?.[0])} key={label}/>:null)}</section></>}
export function NotFound(){return <><Seo page="notFound" path="/404"/><Hero className="not-found-hero" image={images.classLeap} title="That page missed its cue." text="The page may have moved, but your next step is close by."><Link className="button" to="/">Return home</Link> <Link className="button ghost" to="/classes#class-finder">Explore classes</Link></Hero></>}
