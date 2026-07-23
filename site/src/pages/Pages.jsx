import { useState } from 'react';
import { Link } from 'react-router-dom';
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
function Gallery({ names }) { return <div className="gallery">{names.map(name => <ResponsiveImage key={name} image={images[name]} />)}</div>; }
const explore = [
  ['Dance Classes','/classes','classBallet'], ['Musical Theatre','/musical-theatre','backstage'],
  ['Summer Camp','/camps-performances','campWide'], ['Performances','/camps-performances','stageDuet'],
  ['Birthday Parties','/parties-rentals','partyArtwork'], ['Studio Rentals','/parties-rentals','studioMain'],
];
const agePaths = [
  ['Walking–2', 'Grown-Up & Me movement classes for children and their grown-ups.'],
  ['Ages 2–4', 'Explore beginning dance, creative movement, tumbling and play.'],
  ['Ages 4–6', 'Find dance, musical theatre, tumbling and introductory acro.'],
  ['Ages 7–Teen', 'Explore dance styles, musical theatre, acro and technique classes.'],
];
export function Home() { return <><Seo page="home" path="/" />
  <Hero image={images.hero} title="Train. Perform. Grow." text="Garden Street gives children a welcoming place to build creativity, confidence and skills that reach far beyond the stage."><Link className="button" to="/classes">Find a Class</Link> <ExternalCta className="button ghost" href={externalLinks.generalRegistration}>Register in Studio Pro</ExternalCta></Hero>
  <section id="ages"><Section title="Find the right starting point" eyebrow="Explore by age"/><div className="age-row">{agePaths.map(([age, description])=><Link to="/classes" key={age}><strong>{age}</strong><span>{description}</span></Link>)}</div></section>
  <section className="tint"><Section title="More ways to move, make and perform." eyebrow="Explore Garden Street"/><div className="visual-cards explore-grid">{explore.map(([title,to,image])=><Link to={to} className="visual-card" key={title}><ResponsiveImage image={images[image]}/><h3>{title}<span aria-hidden="true">→</span></h3></Link>)}</div></section>
  <section className="split"><Section title="Purposeful training. Joyful community." eyebrow="Why Garden Street"/><div><p>Since 2005, Garden Street has helped young artists develop skills, confidence and a lasting connection to the performing arts.</p><ul className="checks"><li>Supportive, welcoming community</li><li>Multidisciplinary performing-arts training</li><li>Performance opportunities throughout the year</li><li>Creativity, confidence, discipline, teamwork and growth</li></ul></div></section>
  <section><Section title="What’s happening at the studio." eyebrow="Current programs"/><div className="visual-cards program-grid"><Program title="2026–27 Classes" image="classTeaching" to="/classes"/><Program title="Trolls Kids" image="trolls" to="/musical-theatre"/><Program title="Willy Wonka Jr." image="wonka" to="/musical-theatre"/><Program title="Summer Camp" image="campWide" to="/camps-performances"/><Program title="Birthday Parties" image="partyArtwork" to="/parties-rentals"/><Program title="Studio Rentals" image="studioMain" to="/parties-rentals"/></div></section>
  <UpcomingDates />
  <section className="dark"><Section title="Confidence grows when students take the stage." eyebrow="Performances & community"/><Gallery names={['youngBallet','hipHop','jazzRed','balletTrio']}/></section>
  <section className="owners split"><ResponsiveImage image={images.owners}/><div><Section title="Led with care by Cory and Victoria Johnson." eyebrow="Meet the owners"/><p>Garden Street is a community-centered performing-arts school serving Hoboken families since 2005.</p><Link className="arrow" to="/about">Our story →</Link></div></section>
  <StudioProSchedule /></> }
function Section({eyebrow,title}) { return <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>; }
function Program({title,to}) { return <Link className="program-link" to={to}><span>{title}</span><span aria-hidden="true">→</span></Link>; }

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

export function Classes() {
 const [age,setAge]=useState('');
 const [interest,setInterest]=useState('All interests');
 const [day,setDay]=useState('Any day');
 const days=['Any day',...new Set(classSchedule.map(x=>x.day))];
 const rows=age?classSchedule.filter(x=>matchesAge(x.age,age)&&matchesInterest(x.category,interest)&&(day==='Any day'||x.day===day)):[];
 const rowsByDay=rows.reduce((groups,row)=>({...groups,[row.day]:[...(groups[row.day]||[]),row]}),{});
 return <><Seo page="classes" path="/classes"/><Hero className="classes-hero" image={images.communityDance} title="Classes for every next step." text="Explore the 2026–27 program, then visit Studio Pro for current availability and registration."/>
 <section className="class-finder"><Section eyebrow="Find a class" title="Start with your child’s age."/><p className="finder-intro">Choose an age group, then narrow the results by interest or day if helpful.</p>
  <fieldset className="choice-group"><legend>Child’s age</legend><div className="age-choices">{classAgeGroups.map(([label])=><button type="button" className={age===label?'choice active':'choice'} aria-pressed={age===label} onClick={()=>{setAge(label);setDay('Any day')}} key={label}>{label}</button>)}</div></fieldset>
  {age&&<div className="finder-controls"><fieldset className="choice-group"><legend>Interest</legend><div className="interest-choices">{classInterests.map(label=><button type="button" className={interest===label?'choice active':'choice'} aria-pressed={interest===label} onClick={()=>setInterest(label)} key={label}>{label}</button>)}</div></fieldset><label className="day-filter">Day<select value={day} onChange={e=>setDay(e.target.value)}>{days.map(value=><option key={value}>{value}</option>)}</select></label></div>}
  {!age?<div className="finder-prompt"><p>Choose an age group to see recommended classes.</p></div>:<><div className="results-heading"><p aria-live="polite"><strong>{rows.length}</strong> {rows.length===1?'class':'classes'} match your choices</p><button type="button" className="reset-link" onClick={()=>{setAge('');setInterest('All interests');setDay('Any day')}}>Start over</button></div>{rows.length?Object.entries(rowsByDay).map(([rowDay,dayRows])=><div className="day-group" key={rowDay}><h3>{rowDay}</h3><div className="class-results">{dayRows.map((x,i)=>{const details=descriptionFor(x.name);const summary=details?.description.split(/(?<=[.!?])\s/)[0];return <article className="class-result" key={`${x.day}-${x.time}-${i}`}><div className="class-result-main"><div><p className="eyebrow">{x.category}</p><h4>{x.name}</h4><p className="class-meta">{x.age} <span aria-hidden="true">·</span> {x.time} <span aria-hidden="true">·</span> {x.studio}</p>{summary&&<p className="class-summary">{summary}</p>}</div><ExternalCta className="class-register" href={externalLinks.generalRegistration}>View availability</ExternalCta></div>{details&&<details><summary>Class details</summary><div className="class-details"><p>{details.description}</p>{details.prerequisite&&<p><strong>Prerequisite:</strong> {details.prerequisite}</p>}{details.recommendations&&<p><strong>Suggestions:</strong> {details.recommendations}</p>}</div></details>}</article>})}</div></div>):<div className="empty"><p>No classes match all three choices.</p><button className="button" type="button" onClick={()=>{setInterest('All interests');setDay('Any day')}}>Clear interest and day</button></div>}</>}
 </section><StudioProSchedule/></>;
}
export function MusicalTheatre(){return <><Seo page="musical-theatre" path="/musical-theatre"/><Hero image={images.backstage} title="Sing, act and dance as part of a cast." text="Build confidence, creativity, teamwork, communication and stage presence."/><section><div className="visual-cards">{productions.map((p,i)=><article className="card" key={p.name}><ResponsiveImage image={images[i?'wonka':'trolls']}/><h2>{p.name}</h2><p><strong>{p.ages}</strong><br/>{p.day}<br/>{p.tuition}</p><p>Begins September 14, 2026. Winter 2027 performance details coming. Costumes are separate.</p><ExternalCta href={externalLinks[i?'wonka':'trolls']}>Register for {p.name}</ExternalCta></article>)}</div></section><StudioProSchedule/></>}
export function Camps(){return <><Seo page="camps-performances" path="/camps-performances"/><Hero image={images.campWide} title="Create, connect and take the stage." text="Summer Camp begins June 21, 2027. Details coming soon."/><section><Section eyebrow="Summer Camp" title="A summer full of movement and imagination."/><Gallery names={['campCreative','campObstacle','campCircle','campBarre']}/><ExternalCta href={externalLinks.generalRegistration}>Browse Studio Pro</ExternalCta></section><section className="dark"><Section eyebrow="Performances" title="Celebrate progress together."/><Gallery names={['backstage','youngBallet','advanced','hipHop','stageDuet','balletTrio','jazzRed']}/></section></>}
const packages=[['DIY','$450','Three-hour studio rental. Additional time is $90 per hour.'],['Celebration','$700 non-students / $650 students','Two hours for up to 24 children. Includes host, instructor or entertainer, setup, cleanup and a complimentary class.'],['Deluxe','$800 non-students / $750 students','Celebration package plus pizza, juice, plates and napkins.']];
export function Parties(){return <><Seo page="parties-rentals" path="/parties-rentals"/><Hero image={images.studioMain} title="Make their celebration move." text="Host an energetic performing-arts party or rent studio space in Hoboken."><a className="button" href={`mailto:${siteSettings.email}?subject=Party%20inquiry`}>Plan a party</a></Hero><section><div className="cards package-grid">{packages.map(x=><article className="card" key={x[0]}><h2>{x[0]}</h2><p className="price">{x[1]}</p><p>{x[2]}</p></article>)}</div><div className="party-details"><p><strong>An 18% gratuity applies to all party packages.</strong></p><p>DIY rentals include exclusive use of the studio. Renters bring their own food, drinks, cake, decorations and entertainment and are responsible for cleanup and removing all supplies and trash.</p><h2>Choose a theme</h2><div className="tags">{['Ballerina Princess','K-Pop','TikTok Dance Lab','Dance Class','Creative Music & Movement'].map(x=><span key={x}>{x}</span>)}</div></div><Gallery names={['studioMain','studioB','brandedWall']}/></section></>}
export function About(){return <><Seo page="about" path="/about"/><Hero image={images.owners} title="A welcoming performing-arts community since 2005." text="Garden Street helps children train with purpose, perform with confidence and grow as artists and individuals."/><section className="split"><Section eyebrow="Our mission" title="Train with purpose. Perform with confidence. Grow together."/><p>Our mission is to provide exceptional performing arts education in a welcoming and supportive environment where every child has the opportunity to train with purpose, perform with confidence, and grow as an artist and individual.</p></section><section className="split tint"><Section eyebrow="Our story" title="A new chapter, rooted in Hoboken."/><div><p>Founded in 2005, Garden Street School of the Performing Arts has inspired children to discover their creativity, build confidence and develop a lifelong love for the performing arts.</p><p>In June 2026, the studio entered a new chapter under the ownership of Cory and Victoria Johnson, continuing its commitment to performing-arts education in a warm, welcoming community.</p></div></section><section><div className="split"><ResponsiveImage image={images.owners}/><div><Section eyebrow="Meet the owners" title="Cory and Victoria Johnson"/><p>Cory and Victoria share a passion for the arts, education and the Hoboken community. Together, they are committed to creating a creative home where children can build confidence, resilience, teamwork, communication and a lifelong love of learning.</p></div></div></section><section className="tint"><Section eyebrow="Our team" title="People who make the studio feel like home."/><div className="cards two">{staff.map(x=><article className="card" key={x.name}><ResponsiveImage image={images[x.image]}/><h3>{x.name}</h3><p><strong>{x.role}</strong></p><p>{x.bio}</p></article>)}</div></section></>}
export function Contact(){return <><Seo page="contact" path="/contact"/><Hero image={images.exterior} title="Let’s connect." text="Questions about finding the right program? Reach the Garden Street team directly."/><section className="split"><ResponsiveImage image={images.brandedWall}/><div><h2>Visit our Hoboken studio</h2><address>{siteSettings.address}</address><p><a href={`tel:${siteSettings.phone.replaceAll('-','')}`}>{siteSettings.phone}</a><br/><a href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a></p><ExternalCta href={externalLinks.directions}>Get directions</ExternalCta> <ExternalCta href={externalLinks.generalRegistration}>Registration</ExternalCta><p><a href={`mailto:${siteSettings.email}?subject=Party%20inquiry`}>Party inquiry</a> · <ExternalCta className="text-link" href={externalLinks.instagram}>Instagram</ExternalCta></p></div></section></>}
function calendarCategory(title){if(/recital/i.test(title))return 'Performance';if(/closed|closure/i.test(title))return 'Studio closure';if(/camp/i.test(title))return 'Camp';return 'Classes';}
function nextCalendarDate(date){const next=new Date(`${date}T00:00:00Z`);next.setUTCDate(next.getUTCDate()+1);return next.toISOString().slice(0,10).replaceAll('-','');}
function seasonCalendarHref(){const clean=s=>s.replace(/([,;\\])/g,'\\$1').replace(/\n/g,'\\n');const events=importantDates.map(([date,title])=>{const stamp=date.replaceAll('-','');return `BEGIN:VEVENT\r\nUID:${stamp}-${title.toLowerCase().replace(/[^a-z0-9]+/g,'-')}@gardenstreetperformingarts.com\r\nDTSTART;VALUE=DATE:${stamp}\r\nDTEND;VALUE=DATE:${nextCalendarDate(date)}\r\nSUMMARY:${clean(title)}\r\nEND:VEVENT`;}).join('\r\n');const content=`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Garden Street Performing Arts//Important Dates//EN\r\nCALSCALE:GREGORIAN\r\n${events}\r\nEND:VCALENDAR\r\n`;return `data:text/calendar;charset=utf-8,${encodeURIComponent(content)}`;}
function DateItem({date,title}){const category=calendarCategory(title);return <article className={`date-item ${category.toLowerCase().replace(' ','-')}`}><time dateTime={date}><span>{formatDate(date,{month:'short'}).toUpperCase()}</span><strong>{formatDate(date,{day:'numeric'})}</strong></time><div><span className="date-tag">{category}</span><h3>{title}</h3></div></article>}
function DateSeason({label,dates,isCurrent}){const list=<div className="date-list">{dates.map(([date,title])=><DateItem date={date} title={title} key={date+title}/>)}</div>;return <><div className="date-season date-season-desktop"><h2 className="date-season-heading">{label}</h2>{list}</div><details className="date-season date-season-mobile" open={isCurrent}><summary><span>{label}</span><small>{dates.length} {dates.length===1?'date':'dates'}</small></summary>{list}</details></>}
export function Dates(){const next=upcomingDates(1)[0];const groups=[['Fall 2026',importantDates.filter(([date])=>date.startsWith('2026'))],['Winter & Spring 2027',importantDates.filter(([date,title])=>date.startsWith('2027')&&!/summer camp/i.test(title))],['Summer 2027',importantDates.filter(([,title])=>/summer camp/i.test(title))]];return <><Seo page="important-dates" path="/important-dates"/><Hero title="Important dates for 2026–27." text="Season milestones, performances and planned studio closures."><a className="button" href={seasonCalendarHref()} download="garden-street-important-dates-2026-27.ics">Download the complete calendar</a></Hero><section className="dates-content">{next&&<div className="next-date"><p className="eyebrow">Next up</p><time dateTime={next[0]}>{formatDate(next[0],{weekday:'long',month:'long',day:'numeric',year:'numeric'})}</time><h2>{next[1]}</h2></div>}<p className="calendar-note">Dates are subject to change. Check this page and studio communications for updates.</p>{groups.map(([label,dates])=>dates.length?<DateSeason label={label} dates={dates} isCurrent={dates.some(([date])=>date===next?.[0])} key={label}/>:null)}</section></>}
export function NotFound(){return <><Seo page="notFound" path="/404"/><Hero image={images.classLeap} title="That page missed its cue." text="The page may have moved, but your next step is close by."><Link className="button" to="/">Return home</Link> <Link className="button ghost" to="/classes">Explore classes</Link></Hero></>}
