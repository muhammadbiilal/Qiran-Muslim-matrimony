You are a Senior Product Designer, UX Architect, and Frontend Prototype Engineer.

I need you to DESIGN AND BUILD a polished, high-fidelity, WEB-BASED CLICKABLE PROTOTYPE for a:

MUSLIM MATRIMONY & MATCHMAKING PLATFORM

This prototype will be shared directly with the client through a browser.

IMPORTANT:

This is a CLIENT EXPERIENCE PROTOTYPE.

It is NOT the production application.

The actual product implementation and technology remain exactly as defined in the existing SOW.

DO NOT modify, reinterpret, rename, or expand the SOW.

The purpose of this prototype is simply to let the client SEE, CLICK, and EXPERIENCE what the functionality described in the SOW will feel like before development is completed.

Everything visible in this prototype may be interpreted by the client as functionality they will receive.

Therefore:

IF A FEATURE IS NOT INCLUDED IN THIS SPECIFICATION, DO NOT ADD IT.

========================================================
1. WHAT YOU ARE BUILDING
========================================================

Build ONE web-based interactive prototype accessible through a browser.

The prototype contains THREE experiences:

1. MOBILE APPLICATION EXPERIENCE
2. MARKETING WEBSITE
3. ADMINISTRATION PANEL

All three are accessible through the web prototype.

HOWEVER:

The MOBILE APPLICATION EXPERIENCE must NOT look like a desktop web application.

It must simulate the intended iOS/Android mobile application.

Display it inside an appropriate mobile viewport / phone-sized interface.

It should feel like the client is using a real mobile matchmaking app, even though the prototype itself is running in a browser.

The Marketing Website should behave like a normal responsive public website.

The Administration Panel should behave like a normal desktop web administration dashboard.

========================================================
2. VERY IMPORTANT — PROTOTYPE VS PRODUCTION
========================================================

Do not confuse the prototype technology with the production technology.

PROTOTYPE:

Web-based
Browser accessible
Interactive
Client-facing
Uses realistic sample data
Simulates the complete agreed experience

PRODUCTION PRODUCT:

Remains exactly as specified in the SOW.

The mobile application is intended for iOS and Android using Flutter.

The prototype being web-based does NOT change that.

Do not display technical implementation details to the client unless they are necessary for the prototype.

========================================================
3. PROTOTYPE HOME / CLIENT SHOWCASE
========================================================

Create a polished prototype landing screen.

This is the first thing the client sees.

Title:

MUSLIM MATRIMONY & MATCHMAKING PLATFORM

Subtitle:

Interactive Product Experience

Provide three visually strong entry cards:

MOBILE APP
Explore the core matchmaking journey

MARKETING WEBSITE
Explore the public-facing experience

ADMIN PANEL
Explore the operational experience

Each should have a clear:

VIEW EXPERIENCE

button.

The client should be able to return to this showcase screen at any time.

Keep this prototype navigation separate from the simulated product UI.

========================================================
4. MOBILE EXPERIENCE PRESENTATION
========================================================

When the client selects MOBILE APP, present the experience in a realistic mobile viewport.

On desktop:

Center a phone-sized application viewport on the page.

Use approximately:

390–430px mobile width

with an appropriate modern phone aspect ratio.

Do not make an overly decorative fake phone.

The PRODUCT UI is more important than the device chrome.

Provide subtle presentation controls outside the phone viewport where useful, such as:

Back to Prototype Home
Restart Demo

Do NOT place prototype controls inside the simulated mobile application.

On actual mobile browsers:

Allow the mobile experience to naturally occupy the available screen.

The application itself must use mobile-first layouts.

Do NOT stretch mobile screens into desktop layouts.

========================================================
5. PRIMARY UX BENCHMARK — MUZZ
========================================================

Before designing the mobile matchmaking experience, study the CURRENT publicly available Muzz product experience, screenshots, website, and product materials.

Muzz is the PRIMARY CATEGORY/UX BENCHMARK.

Study the experience rather than copying the product.

Pay particular attention to:

• profile photography
• discovery experience
• information hierarchy
• Muslim-specific profile information
• profile cards
• vertically browsable profiles
• attribute chips
• filters
• Like / Pass controls
• match presentation
• chat experience
• bottom navigation
• icons
• image treatment
• typography
• spacing
• gradients
• cards
• forms
• selection controls
• empty states
• transitions
• micro-interactions

The desired result is:

“An original Muslim matrimony product with the polish, clarity, and category familiarity of a leading product such as Muzz.”

DO NOT copy:

• Muzz branding
• Muzz logo
• Muzz name
• exact Muzz colors
• exact screen designs
• proprietary text
• copyrighted illustrations
• Muzz user photographs
• proprietary assets
• source code

Create an ORIGINAL visual identity.

========================================================
6. DESIGN PERSONALITY
========================================================

The platform is for serious Muslim matrimony.

It should feel:

• premium
• trustworthy
• warm
• modern
• respectful
• intentional
• international
• sophisticated
• approachable
• highly visual

It should NOT feel like a casual hookup/dating application.

Avoid excessive Islamic decorative motifs.

Do not cover the interface in crescents, mosque silhouettes, arabesque patterns, etc.

The Muslim matrimony identity should come primarily from:

• profile information
• faith information
• marriage intentions
• family values
• terminology
• photography
• respectful UX
• overall tone

========================================================
7. VISUAL SYSTEM
========================================================

Create a consistent original design system.

Use:

• clean backgrounds
• generous whitespace
• premium typography
• large photography
• rounded cards
• rounded chips
• subtle borders
• restrained shadows
• clear hierarchy
• large tap targets
• polished forms
• tasteful gradients where useful
• consistent spacing
• subtle animation

Use an 8pt-based spacing system.

Choose an ORIGINAL brand palette.

Do not simply reproduce Muzz's exact palette.

========================================================
8. ICONOGRAPHY
========================================================

Use ONE consistent modern icon family.

Prefer simple outline icons, with filled variants where selected states require them.

Required concepts include:

• Back
• Close
• Menu
• Filter
• Location
• Education
• Profession
• Faith
• Language
• Height
• Family
• Heart / Like
• X / Pass
• Match
• Chat
• Profile
• Photo
• Edit
• Check
• Search
• Send
• Read receipt
• More

Do not use random emoji as interface icons.

Do not mix multiple unrelated icon families.

========================================================
9. PROFILE PHOTOGRAPHY
========================================================

Profile photography is one of the most important elements of the mobile experience.

Use realistic, high-quality FICTIONAL Muslim adults.

Represent diversity across:

• South Asian
• Arab
• African
• Southeast Asian
• European / Western Muslim backgrounds

Include both men and women.

Where appropriate, include:

• women wearing hijab
• women not wearing hijab

All people must clearly be adults.

Photography should feel:

• natural
• contemporary
• respectful
• authentic
• aspirational

Avoid obviously cheesy corporate stock photography.

Do NOT use photographs of real Muzz users.

Do NOT use celebrities.

========================================================
10. MOBILE APPLICATION INFORMATION ARCHITECTURE
========================================================

The core mobile navigation should contain:

DISCOVER
MATCHES
CHATS
PROFILE

Use an elegant mobile bottom navigation.

Do NOT add major destinations outside the agreed functionality.

========================================================
11. MOBILE — AUTHENTICATION
========================================================

The SOW includes:

• phone-number sign-up/login using OTP
• email sign-up/login
• session/authentication handling

Create the following screens.

A01 — SPLASH

Show:

• original product logo
• product name

A02 — WELCOME

Use a marriage-focused value proposition.

Actions:

CREATE ACCOUNT
LOG IN

A03 — AUTHENTICATION METHOD

Options:

CONTINUE WITH PHONE
CONTINUE WITH EMAIL

DO NOT ADD:

Google
Facebook
Apple

Social login is not part of this scope.

A04 — PHONE NUMBER

Include:

• country selector/code
• phone number
• Continue

A05 — OTP VERIFICATION

Include:

• OTP fields
• countdown
• resend
• change number
• invalid OTP state

A06 — EMAIL SIGN-UP

Include:

• email
• password
• appropriate confirmation
• Continue

A07 — EMAIL LOGIN

Include:

• email
• password
• Log In

A08 — AUTHENTICATION SUCCESS / TRANSITION

Use believable validation and loading states.

========================================================
12. MOBILE — PROFILE CREATION
========================================================

Create a polished multi-step profile builder.

The SOW includes:

• basic information
• profile photos
• bio
• faith/practice
• sect
• prayer/religiosity
• nationality
• ethnicity/region
• languages
• education
• profession
• marital status
• height
• family values
• marital intentions
• lifestyle
• personality/interests

Do not put all fields on one giant page.

Use a clear progress system.

Create:

B01 — PROFILE SETUP INTRODUCTION

B02 — BASIC INFORMATION

Use appropriate basic personal fields.

B03 — PROFILE PHOTOS

Show:

• primary photo
• additional photos
• add
• remove
• reorder

DO NOT add profile video.

B04 — ABOUT ME

Include:

• bio
• useful character guidance

B05 — FAITH & PRACTICE

Include:

• Sect
• Prayer / Religiosity Level

Use visually elegant selection controls.

B06 — BACKGROUND

Include:

• Nationality
• Ethnicity / Region
• Languages

B07 — EDUCATION & CAREER

Include:

• Education
• Profession

B08 — PERSONAL DETAILS

Include:

• Marital Status
• Height

B09 — FAMILY VALUES

B10 — MARITAL INTENTIONS

B11 — LIFESTYLE

B12 — PERSONALITY & INTERESTS

Use visually appealing selectable tags.

B13 — PROFILE PREVIEW

Show the user how their completed matchmaking profile appears.

B14 — PROFILE COMPLETE

Primary CTA:

START DISCOVERING

========================================================
13. MOBILE — MATCH PREFERENCES & FILTERS
========================================================

Every discovery filter specified in the SOW must be represented.

These are:

• Age
• Location
• Nationality
• Education
• Profession
• Marital Status
• Height
• Religious Preferences
• Family Values
• Sect
• Ethnicity
• Language

Create a polished Filters / Match Preferences experience.

Do NOT necessarily create one screen per field.

Group related filters intelligently.

For example:

BASIC
Age
Location
Height

BACKGROUND
Nationality
Ethnicity
Language

FAITH & VALUES
Sect
Religious Preferences
Family Values

EDUCATION & LIFE
Education
Profession
Marital Status

Use appropriate:

• sliders
• chips
• multi-select
• search selection
• bottom sheets
• toggles where genuinely appropriate

Provide:

APPLY FILTERS
CLEAR / RESET

Show selected filter counts/states where useful.

========================================================
14. MOBILE — DISCOVERY
========================================================

THIS IS THE HERO EXPERIENCE.

Give this area substantial visual attention.

The SOW includes:

• daily recommendation queue
• profile discovery
• filters
• Like
• Pass
• rule-based/filter-weighted ranking
• mutual matching

D01 — DISCOVERY HOME

Show ONE potential match prominently.

Use large, high-quality profile photography.

Display important information such as:

• first name
• age
• location
• profession
• selected profile attributes
• selected faith information

Provide highly visible:

PASS
LIKE

actions.

Use familiar iconography:

X
HEART

Provide access to:

FILTERS

The screen should immediately feel like a premium Muslim matchmaking application.

D02 — FULL PROFILE

Allow the client to vertically scroll through the potential match.

Suggested profile hierarchy:

PROFILE PHOTOS

NAME + AGE

LOCATION

ABOUT ME

FAITH & PRACTICE

BACKGROUND

EDUCATION & CAREER

MARITAL STATUS / HEIGHT

FAMILY VALUES

MARITAL INTENTIONS

LIFESTYLE

PERSONALITY & INTERESTS

Use:

• chips
• compact icons
• grouped sections
• good typography
• whitespace

Do NOT make the profile look like a long technical form.

Keep Like / Pass accessible.

D03 — LIKE INTERACTION

When clicked:

• animate the heart appropriately
• provide subtle positive feedback
• move naturally to the next state/profile unless this interaction creates the scripted mutual match

D04 — PASS INTERACTION

When clicked:

• animate appropriately
• transition to another fictional profile

D05 — NEXT RECOMMENDATION

Populate the demo with multiple realistic fictional profiles.

D06 — DAILY RECOMMENDATIONS COMPLETE

Show an elegant state such as:

“You're all caught up for now.”

Do NOT show payment/premium upsells.

========================================================
15. MATCHING LOGIC
========================================================

The prototype must communicate the actual matching behavior in the SOW.

Discovery is based on:

USER PREFERENCES
+
FILTERS
+
RULE-BASED / FILTER-WEIGHTED RANKING

DO NOT use:

• AI Match
• AI Recommended
• Compatibility Score
• Compatibility Percentage

The prototype should contain at least one scripted demo profile that creates a mutual match after the client presses Like.

Logic:

USER LIKES PROFILE

If the other person has not liked them:

NO MATCH YET

If the other person has already liked them:

MUTUAL MATCH
→ CHAT UNLOCKED

========================================================
16. MOBILE — MUTUAL MATCH
========================================================

This should be an emotionally satisfying moment.

E01 — MATCH CELEBRATION

Show:

• current user's image
• matched user's image
• original celebratory copy
• subtle celebratory animation

Actions:

START CONVERSATION
KEEP DISCOVERING

The visual quality should be comparable to leading matchmaking products without copying their exact screen.

E02 — MATCH PROFILE

Allow the user to briefly revisit the matched profile.

========================================================
17. MOBILE — CONVERSATION STARTERS
========================================================

Conversation starters are explicitly included in the SOW.

Create:

F01 — START A CONVERSATION

Show a small set of marriage-appropriate conversation prompts.

Potential themes:

• marriage goals
• family expectations
• values
• faith
• future plans
• career
• lifestyle
• married life

Use natural conversational wording.

Do not make the experience feel like an interrogation.

F02 — SELECT STARTER

F03 — INSERT STARTER INTO MESSAGE COMPOSER

Allow the client to then send the message.

========================================================
18. MOBILE — MATCHES
========================================================

G01 — MATCHES LIST

Show mutual matches using:

• profile photo
• name
• age
• appropriate status
• conversation state where useful

G02 — EMPTY MATCHES

Create a tasteful empty state.

Provide a CTA back to Discovery.

========================================================
19. MOBILE — CHAT
========================================================

The SOW includes:

• 1:1 real-time text chat
• chat only after mutual matching
• typing indicators
• read receipts
• conversation starters

H01 — CHAT INBOX

Show multiple fictional conversations.

Each row includes:

• profile photo
• name
• latest message
• timestamp
• unread state

H02 — CONVERSATION

Include:

• matched person's photo/name
• message history
• text bubbles
• timestamps
• composer
• Send button

H03 — TYPING INDICATOR

When appropriate, simulate:

“Amina is typing…”

H04 — READ RECEIPT

Demonstrate read/delivered status elegantly.

H05 — NEW CONVERSATION

Allow conversation starters to appear appropriately.

DO NOT ADD:

• voice messages
• audio calling
• video calling
• reply-or-unmatch nudges

========================================================
20. MOBILE — MY PROFILE
========================================================

Create:

I01 — MY PROFILE

Display:

• profile photos
• bio
• faith/practice
• background
• languages
• education
• profession
• marital status
• height
• family values
• marital intentions
• lifestyle
• personality/interests

I02 — EDIT PROFILE

I03 — EDIT PHOTOS

I04 — EDIT BIO

I05 — EDIT FAITH & PRACTICE

I06 — EDIT BACKGROUND

I07 — EDIT EDUCATION / PROFESSION

I08 — EDIT PERSONAL / FAMILY DETAILS

I09 — EDIT MARITAL INTENTIONS / LIFESTYLE

I10 — EDIT PERSONALITY / INTERESTS

I11 — MATCH PREFERENCES SHORTCUT

Reuse the components from profile creation.

========================================================
21. MOBILE — SUPPORTING STATES
========================================================

Include enough supporting states to make the prototype believable.

Useful examples:

• loading
• skeleton profile loading
• invalid OTP
• form validation
• photo upload progress
• no recommendations
• no matches
• no chats
• network error
• retry

Do not overbuild obscure edge cases.

========================================================
22. MOBILE — PRIMARY DEMO JOURNEY
========================================================

The prototype MUST allow the client to click through this complete journey:

WELCOME
→ CREATE ACCOUNT
→ PHONE
→ OTP
→ PROFILE SETUP
→ BASIC INFO
→ PHOTOS
→ BIO
→ FAITH
→ BACKGROUND
→ EDUCATION / CAREER
→ PERSONAL DETAILS
→ FAMILY VALUES
→ MARITAL INTENTIONS
→ LIFESTYLE
→ INTERESTS
→ PROFILE PREVIEW
→ PROFILE COMPLETE
→ DISCOVERY
→ FILTERS
→ APPLY FILTERS
→ VIEW PROFILE
→ LIKE
→ MUTUAL MATCH
→ CONVERSATION STARTER
→ SEND MESSAGE
→ CHAT
→ TYPING INDICATOR
→ READ RECEIPT

Also demonstrate:

DISCOVERY
→ PASS
→ NEXT PROFILE

MATCHES
→ MATCH
→ CHAT

CHATS
→ CONVERSATION

PROFILE
→ EDIT PROFILE

========================================================
23. MARKETING WEBSITE
========================================================

The prototype must also contain the public-facing Marketing Website included in the SOW.

Unlike the simulated mobile application, this should behave like a normal responsive website.

IMPORTANT:

The website is informational.

It is NOT a browser-based matchmaking application.

Do NOT allow visitors to Discover, Match, or Chat through the marketing website.

Create:

J01 — HOME

Include:

• navigation
• strong hero
• Muslim matrimony positioning
• product/mobile screenshots
• value proposition
• How It Works
• major features
• trust/safety messaging
• CTA
• footer

The product screenshots shown on the website should use the SAME mobile UI you created for the prototype.

J02 — ABOUT / HOW IT WORKS

Explain:

CREATE PROFILE
→ DISCOVER
→ MATCH
→ CONVERSATION

J03 — FEATURES

Present the main product capabilities included in the mobile experience.

J04 — SAFETY / PRIVACY

Keep this informational.

DO NOT claim identity/selfie verification because that is outside the scope.

J05 — CONTACT

Include:

• contact information
• enquiry form

J06 — RESPONSIVE STATES

Ensure the website looks professional on:

• desktop
• tablet
• mobile

========================================================
24. ADMINISTRATION PANEL
========================================================

The prototype must also contain the web-based Administration Panel included in the SOW.

This should look like a professional SaaS/admin product.

It should be desktop-first.

Keep it clean and operational.

Do not make it visually resemble the consumer mobile application too heavily.

Use the same overall brand system, but optimize it for administration.

Create:

K01 — ADMIN LOGIN

Include:

• email/username
• password
• Login

K02 — DASHBOARD

Show simple operational metrics appropriate to the current scope.

Examples:

TOTAL USERS
ACTIVE PROFILES
MATCHES
FLAGGED PROFILES

Do NOT create complex analytics.

K03 — USERS / PROFILES

Create a table/list containing:

• profile image
• user name
• age
• location
• account/profile status
• joined date where appropriate
• View action

Include:

• search
• basic status filtering

K04 — USER / PROFILE DETAIL

Allow admin to review:

• photos
• basic information
• faith/profile information
• account status
• profile status

K05 — BASIC STATUS MANAGEMENT

Allow simple status actions appropriate to the agreed scope.

Examples:

ACTIVE
SUSPENDED / RESTRICTED

Use confirmation dialogs for consequential actions.

K06 — MATCH VISIBILITY

Show basic operational match information.

Example columns:

USER
MATCHED WITH
MATCH DATE
STATUS

K07 — CONVERSATION METADATA

Show basic conversation metadata only.

Examples:

PARTICIPANTS
CREATED DATE
LAST ACTIVITY
STATUS
MESSAGE COUNT

Do NOT create unrestricted surveillance of private conversation content.

K08 — FLAGGED PROFILES / MODERATION

Create a simple moderation queue.

Show:

• profile
• report reason/category
• date
• status
• review

K09 — MODERATION DETAIL

Allow admin to:

• review report information
• view relevant profile context
• update moderation status
• perform basic account action

Keep moderation simple.

========================================================
25. ADMIN FEATURES NOT TO CREATE
========================================================

DO NOT ADD:

• advanced analytics
• complex reports
• AI moderation
• automated moderation
• payment management
• subscriptions
• identity verification management
• selfie verification
• financial dashboards
• CRM
• marketing automation
• complex permissions/role-management systems

========================================================
26. PROTOTYPE SAMPLE DATA
========================================================

The entire prototype should feel populated.

Use consistent fictional data across all surfaces.

For example:

If Amina Rahman exists in Discovery, and she later becomes a Match, use the SAME:

• photograph
• age
• profession
• location
• profile information

in:

Discovery
Match Celebration
Matches
Chat
Admin Panel

This continuity is important.

Use believable fictional Muslim names such as:

Amina
Yusuf
Maryam
Omar
Sara
Hamza
Zainab
Adam
Layla
Ibrahim

Create diversity across:

• age
• location
• nationality
• ethnicity
• language
• education
• profession
• sect
• religiosity
• marital status
• family values
• lifestyle
• interests

Do not use:

John Doe
Jane Doe
Lorem Ipsum

========================================================
27. SCRIPTED CLIENT DEMO DATA
========================================================

Create at least 5–8 fictional discovery profiles so the experience does not feel empty.

Design one specific scripted match journey.

For example:

Current demo user:
Yusuf

Potential match:
Amina

Amina has already liked Yusuf in the simulated data.

When the client reaches Amina's Discovery profile and clicks LIKE:

Trigger the Mutual Match experience.

Then allow:

START CONVERSATION
→ CONVERSATION STARTERS
→ SEND
→ CHAT

Other profiles should demonstrate:

PASS
LIKE WITHOUT IMMEDIATE MATCH
NEXT PROFILE

This makes the prototype feel like a functioning product instead of a collection of static screens.

========================================================
28. INTERACTION & MOTION
========================================================

Use tasteful micro-interactions.

Examples:

• Like heart feedback
• Pass feedback
• profile transitions
• bottom-sheet opening
• filter selection
• progress transitions
• match celebration
• message sending
• typing indicator
• read receipt
• subtle page transitions

Keep animation fast and sophisticated.

Do not make the prototype cartoonish.

========================================================
29. RESPONSIVE PROTOTYPE BEHAVIOR
========================================================

The prototype itself must be responsive.

DESKTOP:

Prototype Home
→ centered presentation

Mobile Experience
→ centered phone/mobile viewport

Marketing Website
→ full desktop responsive website

Admin
→ desktop dashboard

TABLET:

Adapt appropriately.

MOBILE BROWSER:

Prototype Home
→ mobile layout

Mobile Experience
→ fill the available viewport naturally

Marketing Website
→ responsive mobile site

Admin
→ it may remain desktop-oriented, but provide a reasonable responsive treatment for demonstration purposes

========================================================
30. STRICT SCOPE BOUNDARIES
========================================================

DO NOT SHOW the following functionality anywhere:

• ID verification
• selfie verification
• Google login
• Facebook login
• Apple login
• payments
• subscriptions
• premium memberships
• boosts
• AI recommendations
• AI matchmaking
• compatibility percentage
• compatibility score
• voice notes
• voice calling
• video calling
• profile video
• reply-or-unmatch nudges
• advanced analytics
• automated moderation
• complex reporting
• payment administration
• identity-verification administration

Do not sneak these features into:

• menus
• settings
• navigation
• banners
• cards
• website sections
• admin sidebar
• profile actions

========================================================
31. REUSABLE COMPONENTS
========================================================

Create reusable UI components.

MOBILE:

Primary Button
Secondary Button
Text Button
Icon Button
Input
Select
Multi-select
Profile Attribute Chip
Interest Chip
Photo Card
Discovery Profile
Like Button
Pass Button
Match Avatar
Chat Row
Message Bubble
Progress Indicator
Bottom Navigation
Top Navigation
Modal
Bottom Sheet
Empty State
Error State

WEBSITE:

Navigation
Hero
Section Header
Feature Card
Mobile Screenshot Frame
CTA
Contact Form
Footer

ADMIN:

Sidebar
Header
Metric Card
Data Table
Search
Filter
Status Badge
Profile Detail
Action Menu
Confirmation Modal
Moderation Queue

========================================================
32. CLIENT DEMO MODE
========================================================

This is extremely important.

The prototype should be EASY TO DEMONSTRATE.

Create a discreet presentation layer outside the simulated products.

Allow the presenter to:

• return to Prototype Home
• restart the mobile demo
• jump to Mobile App
• jump to Marketing Website
• jump to Admin Panel

Do not place these presentation controls inside the actual simulated product UI.

The client should clearly understand what is:

PRODUCT UI

versus

PROTOTYPE NAVIGATION.

========================================================
33. CLIENT OVERVIEW / SCOPE SCREEN
========================================================

Add a presentation screen accessible from Prototype Home called:

PRODUCT EXPERIENCE OVERVIEW

Show three sections:

MOBILE APPLICATION

Authentication
Profile Creation
Preferences
Discovery
Like / Pass
Mutual Match
Conversation Starters
Chat
Profile Management

MARKETING WEBSITE

Home
How It Works
Features
Safety / Privacy
Contact

ADMINISTRATION PANEL

Dashboard
Users / Profiles
Match Visibility
Conversation Metadata
Flagged Profiles
Basic Moderation

Keep this visual and concise.

Do NOT show development estimates or commercial information unless explicitly requested.

========================================================
34. FINAL QA — MOBILE
========================================================

Before finishing, verify:

AUTHENTICATION

□ Phone authentication exists
□ OTP exists
□ Email authentication exists
□ No social login exists

PROFILE

□ Photos exist
□ Bio exists
□ Sect exists
□ Prayer/religiosity exists
□ Nationality exists
□ Ethnicity/region exists
□ Languages exist
□ Education exists
□ Profession exists
□ Marital status exists
□ Height exists
□ Family values exist
□ Marital intentions exist
□ Lifestyle exists
□ Personality/interests exist

FILTERS

□ Age
□ Location
□ Nationality
□ Education
□ Profession
□ Marital Status
□ Height
□ Religious Preferences
□ Family Values
□ Sect
□ Ethnicity
□ Language

MATCHMAKING

□ Daily recommendations exist
□ Like exists
□ Pass exists
□ Mutual Match exists
□ Rule-based/filter-oriented UX exists
□ No compatibility percentage exists
□ No AI language exists

CHAT

□ Chat unlocks after mutual match
□ Text messaging exists
□ Typing indicator exists
□ Read receipt exists
□ Conversation starters exist
□ No voice notes
□ No voice/video calls

========================================================
35. FINAL QA — WEBSITE
========================================================

Verify:

□ Home exists
□ About / How It Works exists
□ Features exists
□ Safety / Privacy exists
□ Contact exists
□ Enquiry form exists
□ Responsive behavior exists
□ Mobile app imagery is consistent with prototype
□ No browser matchmaking exists
□ No browser chat exists
□ No payments/subscriptions have been invented

========================================================
36. FINAL QA — ADMIN
========================================================

Verify:

□ Admin Login exists
□ Dashboard exists
□ User/Profile list exists
□ Search exists
□ Basic filters exist
□ Profile detail exists
□ Basic status management exists
□ Match visibility exists
□ Conversation metadata exists
□ Flagged-profile queue exists
□ Basic moderation exists
□ No advanced analytics
□ No payment administration
□ No identity verification workflows

========================================================
37. FINAL QUALITY STANDARD
========================================================

This is going directly to a client.

Do not produce rough wireframes.

Do not produce disconnected static screens.

Do not produce generic template UI.

Build a coherent, clickable, high-fidelity product experience.

The client should be able to use the prototype and think:

“I understand exactly what this product will feel like.”

The mobile matchmaking experience should receive the MOST attention.

Use Muzz as a reference for CATEGORY-LEVEL UX QUALITY and interaction conventions, but create an original product.

The experience should feel intentional, premium, Muslim-focused, and realistic.

========================================================
38. MOST IMPORTANT RULE
========================================================

THIS WEB PROTOTYPE IS A VISUAL AND INTERACTION DEMONSTRATION OF THE EXISTING SOW.

IT DOES NOT CHANGE THE SOW.

IT DOES NOT CHANGE THE PRODUCTION TECHNOLOGY.

IT DOES NOT ADD FEATURES TO THE SOW.

The simulated Mobile App should feel like the future iOS/Android application.

The Marketing Website should feel like the future public website.

The Admin Panel should feel like the future operational dashboard.

The prototype simply allows the client to experience all three through ONE browser-accessible link.

If you are ever unsure whether to add something:

DO NOT INVENT IT.

Stay within the functionality described above.