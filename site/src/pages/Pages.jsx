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
    <div className="hero-copy"><p className="eyebrow">Garden Street Performing Arts</p><h1>{title}</h1><p className="lead">{text}</p>{children&&<div className="hero-actions">{children}</div>}</div>
  </section>;
}
function Gallery({ names, className = '' }) { return <div className={`gallery ${className}`}>{names.map(name => <ResponsiveImage key={name} image={images[name]} />)}</div>; }
const explore = [
  ['Dance Classes','/classes','classBallet'], ['Musical Theatre','/musical-theatre','backstage'],
  ['Summer Camp','/summer-camp','campWide'], ['Parties & Rentals','/parties-rentals','studioMain'],
];
const agePaths = ['Walking–2', 'Ages 2–4', 'Ages 4–6', 'Ages 7–Teen'];
export function Home() { return <><Seo page="home" path="/" />
  <Hero className="home-hero" image={images.hero} title="Train. Perform. Grow." text="Garden Street gives children a welcoming place to build creativity, confidence and skills that reach far beyond the stage."><Link className="button" to="/classes">Find a Class</Link> <ExternalCta className="button ghost" href={externalLinks.generalRegistration}>Register in Studio Pro</ExternalCta></Hero>
  <section id="ages" className="tint home-pathways"><Section title="Start with age or explore a program." eyebrow="Find your next step"/><p className="pathway-intro">Choose the route that feels easiest. We’ll help you find the right fit from there.</p><div className="pathway-group"><p className="pathway-label">Start with age</p><div className="age-row">{agePaths.map(age=><Link to={`/classes?age=${encodeURIComponent(age)}`} key={age}><strong>{age}</strong><span>View classes →</span></Link>)}</div></div><div className="pathway-group"><p className="pathway-label">Explore by program</p><div className="visual-cards explore-grid">{explore.map(([title,to,image])=><Link to={to} className="visual-card" key={title}><ResponsiveImage image={images[image]}/><h3>{title}<span aria-hidden="true">→</span></h3></Link>)}</div></div></section>
  <section className="home-theatre"><div className="home-theatre-heading"><Section title="This season’s stories are ready for the stage." eyebrow="Now casting"/><Link className="arrow" to="/musical-theatre">Explore Musical Theatre →</Link></div><div className="theatre-poster-links">{productions.map((production,i)=><Link className="theatre-poster-link" to="/musical-theatre" aria-label={`Explore ${production.name} Musical Theatre`} key={production.name}><ResponsiveImage image={images[i?'wonkaTitle':'trollsTitle']}/></Link>)}</div></section>
  <section className="split home-why"><Section title="Purposeful training. Joyful community." eyebrow="Why Garden Street"/><div><p>Since 2005, Garden Street has helped young artists develop skills, confidence and a lasting connection to the performing arts.</p><ul className="checks"><li>Supportive, welcoming community</li><li>Multidisciplinary performing-arts training</li><li>Performance opportunities throughout the year</li><li>Creativity, confidence, discipline, teamwork and growth</li></ul></div></section>
  <UpcomingDates />
  <section className="dark home-community"><Section title="Confidence grows when students take the stage." eyebrow="Performances & community"/><Gallery names={['youngBallet','hipHop','jazzRed','balletTrio']}/></section>
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
  return <section className="upcoming-section tint"><Section eyebrow="Coming up" title="Plan ahead at Garden Street."/><div className="upcoming-list">{dates.map(([date,title])=><article key={date+title}><time dateTime={date}>{formatDate(date,{month:'short',day:'numeric'})}</time><h3>{title}</h3></article>)}</div><Link className="arrow" to="/important-dates">View all important dates →</Link></section>;
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

const danceTeams = [
  { name: 'Fresh Stars', level: 'Pre-competition team', ages: 'Ages 5–Teen', price: '$225/month', text: 'For dancers who want focused training and team experiences without a competition requirement.', requirements: 'Ballet plus two additional classes' },
  { name: 'Shooting Stars', level: 'Intro competition team', ages: 'Ages 7–Teen', price: '$150/month', text: 'A supportive first step into competition for dancers ready to perform as part of a company.', requirements: 'Ballet, weekly company rehearsal and one competition class' },
  { name: 'Twinkle Stars', level: 'Mini competition team', ages: 'Placement details available from the studio', price: '$150/month', text: 'Garden Street’s mini competition pathway for dancers ready for a team experience.' },
  { name: 'All-Stars', level: 'Full competition team', ages: 'Placement details available from the studio', price: '$250/month', text: 'Garden Street’s full competition pathway, with current requirements available directly from the studio.' },
];

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
 return <><Seo page="classes" path="/classes"/><Hero className="classes-hero" image={images.communityDance} title="Classes for every next step." text="Find the right class, compare 2026–27 pricing and explore team pathways—all in one place."/>
 <div className="class-page-nav" role="navigation" aria-label="Classes page sections"><a href="#class-finder"><span>01</span>Classes</a><a href="#pricing"><span>02</span>Pricing</a><a href="#dance-teams"><span>03</span>Teams</a><a href="#registration" onClick={event=>{event.preventDefault();document.getElementById('registration')?.scrollIntoView()}}><span>04</span>Availability</a></div>
 <section className="class-finder" id="class-finder"><Section eyebrow="Find a class" title="Start with your child’s age."/><p className="finder-intro">Choose an age group, then narrow the results by interest and the days that work for your family.</p><p className="finder-price-note"><strong>Standard classes are $125/month.</strong> Additional classes and sibling rates are $99/month. <a href="#pricing">See all 2026–27 pricing and fees →</a></p>
  <fieldset className="choice-group"><legend>Child’s age</legend><div className="age-choices">{classAgeGroups.map(([label])=>{const count=classSchedule.filter(row=>matchesAge(row.age,label)).length;return <button type="button" className={age===label?'choice active':'choice'} aria-pressed={age===label} onClick={()=>{setDay('Any day');setSearchParams({age:label},{replace:true})}} key={label}><span>{label}</span><small>{count} {count===1?'class':'classes'}</small></button>})}</div></fieldset>
  {age&&<div className="finder-controls"><fieldset className="choice-group"><legend>Interest</legend><div className="interest-choices">{classInterests.map(label=><button type="button" className={interest===label?'choice active':'choice'} aria-pressed={interest===label} onClick={()=>{setInterest(label);setDay('Any day')}} key={label}>{label}</button>)}</div></fieldset><fieldset className="choice-group"><legend>Day</legend><div className="day-choices">{availableDays.map(value=>{const count=value==='Any day'?eligibleRows.length:dayCounts[value];const label=value==='Any day'?'All days':value;return <button type="button" className={day===value?'choice active':'choice'} aria-label={`${label}, ${count} ${count===1?'class':'classes'}`} aria-pressed={day===value} onClick={()=>setDay(value)} key={value}><span className="day-full">{label}</span><span className="day-short" aria-hidden="true">{value==='Any day'?'All':value.slice(0,3)}</span><small aria-hidden="true">{count}</small></button>})}</div></fieldset><div className="finder-reset"><button type="button" onClick={resetFinder}>Start over</button></div></div>}
  {!age?<div className="finder-prompt"><p><strong>Choose an age group above.</strong><span>Matching class names, days, times and descriptions will appear here.</span></p></div>:<><div className="results-heading"><p aria-live="polite"><strong>{rows.length}</strong> {rows.length===1?'class':'classes'} match your choices</p></div>{rows.length?Object.entries(rowsByDay).map(([rowDay,dayRows])=><div className="day-group" key={rowDay}><h3>{rowDay}</h3><div className="class-results">{dayRows.map((x,i)=>{const details=descriptionFor(x.name);const summary=details?.description.split(/(?<=[.!?])\s/)[0];return <article className="class-result" key={`${x.day}-${x.time}-${i}`}><div className="class-result-main"><div><p className="eyebrow">{x.category}</p><h4>{x.name}</h4><p className="class-meta">{x.age} <span aria-hidden="true">·</span> {x.time} <span aria-hidden="true">·</span> {x.studio}</p>{summary&&<p className="class-summary">{summary}</p>}</div><ExternalCta className="class-register" href={externalLinks.generalRegistration}>View availability</ExternalCta></div>{details&&<details><summary>Class details</summary><div className="class-details"><p>{details.description}</p>{details.prerequisite&&<p><strong>Prerequisite:</strong> {details.prerequisite}</p>}{details.recommendations&&<p><strong>Suggestions:</strong> {details.recommendations}</p>}</div></details>}</article>})}</div></div>):<div className="empty"><p>No classes match all three choices.</p><button className="button" type="button" onClick={()=>{setInterest('All interests');setDay('Any day')}}>Clear interest and day</button></div>}</>}
 </section>
 <section className="class-pricing" id="pricing"><div className="class-pricing-heading"><Section eyebrow="2026–27 pricing" title="Know the cost before you register."/><div><p>Current class and enrollment pricing is shown here so families can compare options without creating an account.</p><p className="pricing-registration">The annual dance registration fee is nonrefundable, due at enrollment and capped at <strong>$100 per family.</strong></p></div></div><div className="pricing-grid">{classPricing.map(item=><article key={item.label}><p>{item.label}</p><p className="pricing-amount"><strong>{item.price}</strong><span>{item.cadence}</span></p></article>)}</div><p className="pricing-note">Musical Theatre-only students do not pay the annual dance registration fee. Students enrolled in both Dance and Musical Theatre pay the applicable registration and production fees. Studio Pro shows current availability and completes enrollment.</p></section>
 <section className="dance-teams dark" id="dance-teams"><div className="dance-teams-heading"><Section eyebrow="Dance teams" title="A pathway for dancers ready for more."/><div><p>Team programs add focused training, performance opportunities and a shared company experience.</p><a className="text-link" href={`mailto:${siteSettings.email}?subject=${encodeURIComponent('Dance team information')}`}>Ask about team placement →</a></div></div><div className="team-pathway-grid">{danceTeams.map(team=><article key={team.name}><p className="eyebrow">{team.level}</p><h3>{team.name}</h3><p className="team-ages">{team.ages}</p><p>{team.text}</p>{team.requirements&&<p className="team-requirements"><strong>Training requirement:</strong> {team.requirements}</p>}<p className="team-rate"><strong>{team.price}</strong><span>Published team rate</span></p></article>)}</div><div className="team-extras"><p><span>Musical Theatre company</span><strong>Broadway Stars · $150/month</strong></p><p><span>Triple Threat add-on</span><strong>$50/month</strong></p><p><span>Team dance class add-on</span><strong>$50/month</strong></p></div><p className="team-fine-print">Competition dates have intentionally been omitted. Confirm current placement, required classes and separate convention or competition fees with Garden Street before enrolling. Monologues, solos and private lessons are scheduled and paid for separately.</p></section>
 <StudioProSchedule/></>;
}
export function MusicalTheatre(){return <><Seo page="musical-theatre" path="/musical-theatre"/><Hero image={images.backstage} title="Sing, act and dance as part of a cast." text="Build confidence, creativity, teamwork, communication and stage presence."/><section className="musical-productions"><div className="production-list"><div className="production-intro"><p className="eyebrow">Choose a production</p><h2>There’s a role for every young performer.</h2><p>Both programs rehearse on Mondays and lead to a fully staged winter production.</p></div>{productions.map((p,i)=><article className="production-card" key={p.name}><div className="production-art"><ResponsiveImage image={images[i?'wonkaTitle':'trollsTitle']} priority/></div><p className="production-number" aria-hidden="true">0{i+1}</p><div className="production-copy"><h3>{p.name}</h3><p className="production-meta"><strong>{p.ages}</strong><span>{p.day}</span><span>{p.tuition}</span></p><p className="production-note">Begins September 14, 2026. Winter 2027 performance details coming. Costumes are separate.</p></div><ExternalCta href={externalLinks[i?'wonka':'trolls']}>Register</ExternalCta></article>)}</div></section><StudioProSchedule/></>}
export function Camps(){return <><Seo page="summer-camp" path="/summer-camp"/>
  <Hero className="camps-hero" image={images.campWide} title="Summer days made for movement." text="Summer Camp returns June 21, 2027. Full session details are coming soon.">
    <a className="button" href="#camp-details">See what we know</a>
  </Hero>
  <section className="camp-overview" id="camp-details">
    <div className="camp-overview-copy"><Section eyebrow="Summer Camp" title="Movement, imagination and time together."/><p>Camp gives children space to dance, explore creative movement and enjoy active group experiences in the studio.</p><div className="camp-date"><p className="eyebrow">Confirmed start date</p><p><strong>June 21, 2027</strong></p><span>Session schedule, ages, pricing and registration details are coming soon.</span></div></div>
    <Gallery className="camp-photo-grid" names={['campCreative','campObstacle','campCircle','campBarre']}/>
  </section>
  <section className="camp-updates dark"><div><Section eyebrow="Camp announcements" title="Want the details when they’re ready?"/><p>Join the Garden Street mailing list for program news and registration announcements.</p><ExternalCta href={externalLinks.mailingList}>Join the mailing list</ExternalCta></div><div className="camp-other-programs"><p className="eyebrow">Looking for a program now?</p><Link to="/classes">Explore classes →</Link><Link to="/musical-theatre">Explore Musical Theatre →</Link></div></section>
  </>}
const hostedPartyPackages=[
  {name:'Celebration',studentPrice:'$650',standardPrice:'$700',includes:['Party host','Instructor or entertainer','Setup and cleanup','Complimentary class']},
  {name:'Deluxe',studentPrice:'$750',standardPrice:'$800',includes:['Everything in Celebration','Pizza and juice','Plates and napkins']},
];
const partyThemes=['Ballerina Princess','K-Pop','TikTok Dance Lab','Dance Class','Creative Music & Movement'];
export function Parties(){return <><Seo page="parties-rentals" path="/parties-rentals"/>
  <Hero className="parties-hero" image={images.studioMain} title="A celebration that moves with them." text="Choose a hosted performing-arts party or make the studio your own with a private rental."><a className="button" href="#party-options">Compare options</a><Link className="button ghost" to="/contact">Ask about a date</Link></Hero>
  <section className="party-paths" id="party-options"><div className="party-section-heading"><Section eyebrow="Choose your path" title="How would you like to celebrate?"/><p>Start with the level of support that fits your plans. Both options give your group a private Garden Street studio experience.</p></div><div className="party-path-grid"><article className="party-path-card"><span aria-hidden="true">01</span><p className="eyebrow">Hosted party</p><h3>We lead the celebration.</h3><p>Choose Celebration or Deluxe for a two-hour party with a host, guided entertainment, setup and cleanup.</p><a href="#hosted-parties">Compare party packages →</a></article><article className="party-path-card"><span aria-hidden="true">02</span><p className="eyebrow">Studio rental</p><h3>You bring the plan.</h3><p>Reserve the studio for three hours and bring your own food, decorations and entertainment.</p><a href="#studio-rental">Explore private rental →</a></article></div></section>
  <section className="hosted-parties tint" id="hosted-parties"><div className="party-section-heading"><Section eyebrow="Hosted parties" title="Pick the package that fits."/><p>Both hosted packages are two hours for up to 24 children and include setup, cleanup and a complimentary class.</p></div><div className="hosted-package-grid">{hostedPartyPackages.map(p=><article className="hosted-package" key={p.name}><div className="package-topline"><h3>{p.name}</h3><span>2 hours · Up to 24 children</span></div><div className="package-prices"><p><strong>{p.studentPrice}</strong><span>Garden Street students</span></p><p><strong>{p.standardPrice}</strong><span>Non-students</span></p></div><ul>{p.includes.map(item=><li key={item}>{item}</li>)}</ul><Link className="text-link" to="/contact">Ask about {p.name} →</Link></article>)}</div><p className="gratuity-note"><strong>Please note:</strong> An 18% gratuity applies to all party packages.</p><div className="party-themes"><p className="eyebrow">Choose a theme</p><div className="tags">{partyThemes.map(theme=><span key={theme}>{theme}</span>)}</div></div></section>
  <section className="rental-section dark" id="studio-rental"><div className="rental-copy"><Section eyebrow="Private studio rental" title="Bring your own celebration to life."/><p>Enjoy exclusive use of the studio for three hours. Bring your own food, drinks, cake, decorations and entertainment.</p><div className="rental-price"><strong>$450</strong><span>Three-hour rental</span></div><p className="rental-extra">Additional time is $90 per hour.</p><p>Renters are responsible for cleanup and removing all supplies and trash.</p><Link className="button" to="/contact">Ask about studio rental</Link></div><ResponsiveImage image={images.brandedWall}/></section>
  <section className="party-space"><div className="party-section-heading"><Section eyebrow="The space" title="Room to gather, move and celebrate."/><p>Explore the Garden Street studios, then contact the team to ask about availability.</p></div><Gallery className="party-gallery" names={['studioMain','studioB','brandedWall']}/></section>
  <section className="party-final-cta"><p className="eyebrow">Ready to start planning?</p><h2>Tell us which option feels right.</h2><p>Contact Garden Street to ask about availability and next steps for your preferred party package or studio rental.</p><Link className="button" to="/contact">Ask about a date</Link></section>
  </>}
function ProfileCard({ person, owner = false }) { return <article className={`profile-card ${owner?'owner-profile':'staff-profile'}${person.detailsPending?' team-card-pending':''}`}><ResponsiveImage image={images[person.image]}/><div className="team-card-copy"><h3>{person.name}</h3>{person.detailsPending?<p className="team-pending">Role and bio coming soon.</p>:<><p className="team-role">{person.role}</p><p>{person.bio}</p></>}</div></article>; }
export function About(){const owners=staff.slice(0,2);const team=staff.slice(2);return <><Seo page="about" path="/about"/><section className="about-hero"><div className="about-hero-photo"><ResponsiveImage image={images.owners} priority/></div><div className="hero-copy"><p className="eyebrow">Garden Street Performing Arts</p><h1>A place to learn, create and belong.</h1><p className="lead">For more than 20 years, Garden Street has welcomed Hoboken families into a community where young artists can build confidence and grow.</p></div></section><section className="split about-foundation"><Section eyebrow="Our story & purpose" title="Rooted in Hoboken. Growing with purpose."/><div><p>Founded in 2005, Garden Street has inspired children to discover their creativity, build confidence and develop a lifelong love of the performing arts.</p><p>In June 2026, the studio entered a new chapter under Victoria and Cory Johnson. Today, Garden Street continues that legacy through purposeful training, confident performance and a supportive community where every young artist can grow.</p></div></section><section className="tint about-team"><Section eyebrow="Our owners" title="Leading Garden Street’s next chapter."/><p className="team-intro">Victoria and Cory Johnson are building on Garden Street’s long relationship with Hoboken families and creating a supportive home for every young artist.</p><div className="owner-profiles">{owners.map(person=><ProfileCard person={person} owner key={person.name}/>)}</div><div className="staff-section-heading"><p className="eyebrow">Our team</p><h2>The people who welcome, teach and inspire.</h2></div><div className="staff-grid">{team.map(person=><ProfileCard person={person} key={person.name}/>)}</div></section></>}
export function Contact(){return <><Seo page="contact" path="/contact"/>
  <Hero className="contact-page-hero" title="Contact Garden Street." text="Questions about classes, parties or rentals? We’re here to help."/>
  <section className="contact-hub"><div className="contact-choice-grid">
    <article className="contact-choice contact-choice-primary"><span className="contact-choice-number" aria-hidden="true">01</span><p className="eyebrow">Questions, parties & rentals</p><h3>Email us</h3><a className="contact-detail-link" href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a><a className="button" href={`mailto:${siteSettings.email}`}>Open your email app</a><small>You can also copy the address above into any email service.</small></article>
    <article className="contact-choice"><span className="contact-choice-number" aria-hidden="true">02</span><p className="eyebrow">Talk with the studio</p><h3>Call us</h3><a className="contact-detail-link" href={`tel:${siteSettings.phone.replaceAll('-','')}`}>{siteSettings.phone}</a><a className="button ghost" href={`tel:${siteSettings.phone.replaceAll('-','')}`}>Call now</a></article>
    <article className="contact-choice"><span className="contact-choice-number" aria-hidden="true">03</span><p className="eyebrow">Classes & availability</p><h3>Browse registration</h3><ExternalCta className="button ghost" href={externalLinks.generalRegistration}>View classes & registration</ExternalCta></article>
  </div></section>
  <section className="contact-location tint"><div className="contact-location-copy"><Section eyebrow="Visit Garden Street" title="Find us in the heart of Hoboken."/><address>{siteSettings.address}</address><p>Use directions to plan your visit and confirm the best route before you leave.</p><div className="contact-location-actions"><ExternalCta href={externalLinks.directions}>Get directions</ExternalCta><ExternalCta className="text-link" href={externalLinks.instagram}>Follow on Instagram</ExternalCta></div></div><ResponsiveImage className="contact-location-image" image={images.brandedWall}/></section>
  </>}
function calendarCategory(title){if(/recital/i.test(title))return 'Performance';if(/closed|closure/i.test(title))return 'Studio closure';if(/camp/i.test(title))return 'Camp';return 'Classes';}
function nextCalendarDate(date){const next=new Date(`${date}T00:00:00Z`);next.setUTCDate(next.getUTCDate()+1);return next.toISOString().slice(0,10).replaceAll('-','');}
function seasonCalendarHref(){const clean=s=>s.replace(/([,;\\])/g,'\\$1').replace(/\n/g,'\\n');const events=importantDates.map(([date,title])=>{const stamp=date.replaceAll('-','');return `BEGIN:VEVENT\r\nUID:${stamp}-${title.toLowerCase().replace(/[^a-z0-9]+/g,'-')}@gardenstreetperformingarts.com\r\nDTSTART;VALUE=DATE:${stamp}\r\nDTEND;VALUE=DATE:${nextCalendarDate(date)}\r\nSUMMARY:${clean(title)}\r\nEND:VEVENT`;}).join('\r\n');const content=`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Garden Street Performing Arts//Important Dates//EN\r\nCALSCALE:GREGORIAN\r\n${events}\r\nEND:VCALENDAR\r\n`;return `data:text/calendar;charset=utf-8,${encodeURIComponent(content)}`;}
function DateItem({date,title}){const category=calendarCategory(title);return <article className={`date-item ${category.toLowerCase().replace(' ','-')}`}><time dateTime={date}><span>{formatDate(date,{month:'short'}).toUpperCase()}</span><strong>{formatDate(date,{day:'numeric'})}</strong></time><div><span className="date-tag">{category}</span><h3>{title}</h3></div></article>}
function DateList({dates}){return <div className="date-list">{dates.map(([date,title])=><DateItem date={date} title={title} key={date+title}/>)}</div>}
function DateSeason({label,dates,isCurrent,nextDate}){const mobileDates=isCurrent&&dates.length>1?dates.filter(([date])=>date!==nextDate):dates;return <><div className="date-season date-season-desktop"><h2 className="date-season-heading">{label}</h2><DateList dates={dates}/></div><details className="date-season date-season-mobile" open={isCurrent}><summary><span>{label}</span><small>{mobileDates.length} {isCurrent&&mobileDates.length<dates.length?'more ':''}{mobileDates.length===1?'date':'dates'}</small></summary><DateList dates={mobileDates}/></details></>}
export function Dates(){const next=upcomingDates(1)[0];const groups=[['Fall 2026',importantDates.filter(([date])=>date.startsWith('2026'))],['Winter & Spring 2027',importantDates.filter(([date,title])=>date.startsWith('2027')&&!/summer camp/i.test(title))],['Summer 2027',importantDates.filter(([,title])=>/summer camp/i.test(title))]];return <><Seo page="important-dates" path="/important-dates"/><Hero title="Important dates for 2026–27." text="Season milestones, performances and planned studio closures."><a className="button" href={seasonCalendarHref()} download="garden-street-important-dates-2026-27.ics">Download the complete calendar</a></Hero><section className="dates-content">{next&&<div className="next-date"><p className="eyebrow">Next up</p><time dateTime={next[0]}>{formatDate(next[0],{weekday:'long',month:'long',day:'numeric',year:'numeric'})}</time><h2>{next[1]}</h2></div>}<p className="calendar-note">Dates are subject to change. Check this page and studio communications for updates.</p>{groups.map(([label,dates])=>dates.length?<DateSeason label={label} dates={dates} nextDate={next?.[0]} isCurrent={dates.some(([date])=>date===next?.[0])} key={label}/>:null)}</section></>}
export function NotFound(){return <><Seo page="notFound" path="/404"/><Hero className="not-found-hero" image={images.classLeap} title="That page missed its cue." text="The page may have moved, but your next step is close by."><Link className="button" to="/">Return home</Link> <Link className="button ghost" to="/classes">Explore classes</Link></Hero></>}
