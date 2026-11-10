// Page content for cracan.org. Keep legal information general, sourced, and
// framed as "check with a lawyer" — CRACAN is not a law firm.

// Volunteer skill ids must stay in sync with SKILLS in firestore.rules.
export const skills = [
  ['organizing', 'Organizing', 'Bring people together, run meetups, build a local chapter.'],
  ['court-watch', 'Court watching', 'Show up to hearings so people aren’t alone in the courtroom.'],
  ['legal', 'Legal background', 'Attorneys, paralegals and law students who can review guides.'],
  ['records', 'Public records', 'File and track records requests for footage, reports and policies.'],
  ['translation', 'Translation', 'Help us reach people in Spanish and other languages.'],
  ['support', 'Peer support', 'Listen to and encourage people going through it.'],
  ['outreach', 'Outreach', 'Spread the word online, in your neighborhood, at events.'],
  ['research', 'Research', 'Find resources, deadlines and organizations for new places.'],
  ['writing', 'Writing', 'Turn complicated processes into plain-language guides.'],
  ['tech', 'Web & tech', 'Help build and run the site and community tools.'],
  ['design', 'Design & media', 'Graphics, video and photography.'],
  ['fundraising', 'Fundraising', 'Grants, donors and partnerships that keep this going.'],
];

export const availability = [
  ['events', 'For specific events or actions'],
  ['monthly', 'A few hours a month'],
  ['weekly', 'A few hours a week'],
];

export const firstSteps = [
  'Get safe and get medical care if you were hurt. Keep every medical record and bill.',
  'Write down what happened as soon as you can: date, time, place, and the order of events.',
  'Note names, badge numbers, patrol car or unit numbers, and agency names.',
  'Write down witnesses and how to reach them.',
  'Save photos, videos, texts, voicemails and receipts. Back them up somewhere besides your phone.',
  'Request records quickly: incident reports, body-camera and dash-camera video, dispatch audio. Some agencies only keep footage for a limited time.',
  'Keep copies of everything you file and everything you receive, with the date you sent or got it.',
  'Talk to a lawyer before posting details online or talking to the other side about your case.',
];

// [what, deadline, detail, source label, source url]
export const deadlines = [
  ['Claim against a California city, county or state agency (for money damages)', 'Usually 6 months',
    'Under the California Government Claims Act you generally must file a written claim with the agency within six months of the incident before you can sue it in state court.',
    'California DGS: Government Claims', 'https://www.dgs.ca.gov/ORIM/Services/Page-Content/Office-of-Risk-and-Insurance-Management-Services-List-Folder/Government-Claims'],
  ['Federal civil rights lawsuit (42 U.S.C. § 1983) in California', 'Usually 2 years',
    'Federal civil rights claims borrow the state’s personal-injury time limit, which in California is generally two years from the violation.',
    'N.D. Cal. help for people without a lawyer', 'https://cand.uscourts.gov/pro-se-litigants/'],
  ['Discrimination complaint with the California Civil Rights Department', '3 years (job) · 1 year (most others)',
    'Employment complaints generally must reach CRD within three years of the last harm; most other kinds, such as housing, within one year.',
    'CRD complaint process', 'https://calcivilrights.ca.gov/complaintprocess/'],
  ['Federal job discrimination charge with the EEOC', '180 or 300 days',
    'Usually 180 days, extended to 300 days where a state agency also enforces the law (as in California).',
    'EEOC: filing a charge', 'https://www.eeoc.gov/filing-charge-discrimination'],
];

// [where, what for, url]
export const reportTo = [
  ['U.S. Department of Justice, Civil Rights Division', 'Report a civil rights violation by police, government, employers, housing, schools and more.', 'https://civilrights.justice.gov'],
  ['FBI tip line', 'Report abuse of power by an official acting under “color of law,” such as excessive force.', 'https://tips.fbi.gov'],
  ['California Civil Rights Department', 'Discrimination in work, housing, businesses and state programs in California.', 'https://calcivilrights.ca.gov/complaintprocess/'],
  ['California Attorney General', 'Statewide consumer, civil rights and public-agency concerns.', 'https://oag.ca.gov'],
  ['Oakland Community Police Review Agency', 'Complaints about Oakland Police Department officers.', 'https://www.oaklandca.gov/Government/Departments/Community-Police-Review-Agency'],
  ['HUD fair housing', 'Housing discrimination anywhere in the U.S.', 'https://www.hud.gov/fairhousing'],
];

export const legalHelp = [
  ['ACLU of Northern California', 'Civil rights information and requests for legal assistance.', 'https://www.aclunc.org'],
  ['National Lawyers Guild, SF Bay Area', 'Movement lawyers, legal observers and referrals.', 'https://www.nlgsf.org'],
  ['LawHelpCA', 'Find free and low-cost legal aid anywhere in California.', 'https://www.lawhelpca.org'],
  ['Bay Area Legal Aid', 'Free civil legal help for low-income Bay Area residents.', 'https://baylegal.org'],
  ['Federal court help for people without a lawyer (N.D. Cal.)', 'Free Legal Help Center and guides for representing yourself.', 'https://cand.uscourts.gov/pro-se-litigants/'],
  ['California Courts Self-Help', 'Official guides and forms for California state court.', 'https://selfhelp.courts.ca.gov'],
];

export const worldwide = [
  ['National human rights institutions (GANHRI)', 'Most countries have an official human rights body that takes complaints. Find yours here.', 'https://ganhri.org'],
  ['Front Line Defenders', 'Emergency support for human rights defenders at risk.', 'https://www.frontlinedefenders.org'],
];

export const guidelines = [
  ['Protect people', 'Never post someone’s home address, phone number, or other private details. No threats, harassment, or hate.'],
  ['Protect your case', 'Don’t share details of an open case, evidence, or documents in public spaces. What you post can be used against you.'],
  ['Share experience, not legal advice', 'Say what worked for you, but point people to a lawyer for decisions about their own case.'],
  ['Disagree with respect', 'We come from many places and views. Challenge ideas, not people.'],
  ['Keep it lawful and peaceful', 'We organize for change through lawful, nonviolent action.'],
  ['Speak up', 'If something feels wrong or unsafe, tell a moderator or email us. Moderators can remove posts and members who break these guidelines.'],
];
