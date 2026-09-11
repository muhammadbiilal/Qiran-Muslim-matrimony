/* ==========================================================================
   QIRAN — Prototype sample data
   One fictional cast, used consistently across Mobile, Website and Admin.
   All people, names and details are fictional.
   ========================================================================== */
(function (global) {
  'use strict';

  /* ---- Photo layer ----------------------------------------------------
     Swap these identifiers for the client's own licensed photography and
     every surface of the prototype updates.
     ------------------------------------------------------------------- */
  var PX = {
    // Women — portraits
    amina1: 'photo-1733470381591-c5dfb9df3c3d',
    amina2: 'photo-1733470381421-a705c07f4242',
    amina3: 'photo-1733470324488-d0e10d014d80',
    amina4: 'photo-1733470381571-c3d082e68457',
    amina5: 'photo-1733470381436-bb5a2a441708',
    maryam: 'photo-1545266241-3516e2a6e016',
    sara:   'photo-1764740128390-4196892b3f61',
    zainab: 'photo-1718048170732-0ef8a77fce9e',
    layla:  'photo-1681152299027-17efe7da7081',
    nadia:  'photo-1633279309534-f761427548b6',
    hafsa:  'photo-1619545307432-9fc73f8135ff',
    aisha:  'photo-1743871698163-a2e470d8eac7',
    fatima: 'photo-1613447895590-97f008b7fff3',
    khadija:'photo-1550546094-9835463f9f71',
    yasmin: 'photo-1552113125-81af17f36b57',
    iman:   'photo-1558027309-0844844295f7',
    salma:  'photo-1536766768598-e09213fdcf22',
    ayesha: 'photo-1734865812496-b2fe2e1a56ca',
    rania:  'photo-1613447895817-e617a4093f50',
    noor:   'photo-1613909707776-098e961198dc',

    // Men — portraits
    yusuf:  'photo-1787724779241-cb5c250ed70b',
    omar:   'photo-1758874574397-e56dfcfc116d',
    hamza:  'photo-1770096951056-c94a812e9fd4',
    ibrahim:'photo-1614023342667-6f060e9d1e04',
    adam:   'photo-1688120320226-a73ed520c8b7',
    bilal:  'photo-1653055645127-54ec96add7b5',
    tariq:  'photo-1598698230199-f7f08ed4234b',
    musa:   'photo-1522529599102-193c0d76b5b6',
    imran:  'photo-1761435756843-0ca5f4ff1d59',
    zaid:   'photo-1774437676976-655ad890b6ff',

    // Lifestyle / scene photos used as secondary profile photos
    sCoffee:  'photo-1742867114109-c09040395c09',
    sBooks:   'photo-1664222845171-f9ffe4579c1f',
    sWindow:  'photo-1758609054061-5576a5e4e373',
    sHills:   'photo-1615809265087-1416ccddd6ab',
    sValley:  'photo-1648804536048-0a7d8b103bbe',
    sForest:  'photo-1639173421924-60ef107d2cbc',
    sRange:   'photo-1700866669258-2780db81e72e',
    sRocks:   'photo-1529425398537-d87949ca8de4'
  };

  /* ---- Attribute vocabulary ------------------------------------------- */

  var OPT = {
    gender: ['Man', 'Woman'],

    sect: ['Sunni', 'Shia', 'Sufi', 'Just Muslim', 'Prefer not to say'],

    prayer: [
      'Five times a day',
      'Most prayers',
      'Sometimes',
      'Learning and growing',
      'Prefer not to say'
    ],

    nationality: [
      'British', 'Pakistani', 'Indian', 'Bangladeshi', 'Egyptian', 'Moroccan', 'Algerian',
      'Tunisian', 'Turkish', 'Nigerian', 'Somali', 'Senegalese', 'Sudanese', 'Kenyan',
      'Malaysian', 'Indonesian', 'Lebanese', 'Syrian', 'Jordanian', 'Palestinian', 'Iraqi',
      'Iranian', 'Afghan', 'Yemeni', 'Saudi', 'Emirati', 'Kuwaiti', 'Bosnian', 'Albanian',
      'Kazakh', 'Uzbek', 'American', 'Canadian', 'French', 'German', 'Dutch', 'Australian',
      'South African'
    ],

    ethnicity: [
      'South Asian', 'Arab', 'North African', 'West African', 'East African',
      'Southeast Asian', 'Central Asian', 'Turkish', 'Persian', 'Kurdish',
      'Balkan / European', 'Afro-Caribbean', 'Mixed heritage', 'Other'
    ],

    language: [
      'English', 'Arabic', 'Urdu', 'Bengali', 'Punjabi', 'Hindi', 'Gujarati', 'Sindhi',
      'Pashto', 'Farsi', 'Kurdish', 'Turkish', 'Malay', 'Indonesian', 'Somali', 'Swahili',
      'Hausa', 'Wolof', 'Amazigh', 'French', 'Spanish', 'German', 'Dutch', 'Bosnian',
      'Albanian', 'Tamil'
    ],

    education: [
      'High school', 'Diploma / Vocational', 'Undergraduate degree', 'Postgraduate degree',
      'Doctorate', 'Islamic studies / Alimiyyah', 'Professional qualification'
    ],

    profession: [
      'Doctor', 'Dentist', 'Pharmacist', 'Nurse', 'Dietitian', 'Optometrist',
      'Physiotherapist', 'Teacher', 'Lecturer', 'Researcher', 'Engineer',
      'Software Engineer', 'Civil Engineer', 'Architect', 'Accountant', 'Solicitor',
      'Barrister', 'Business Owner', 'Marketing', 'Designer', 'Civil Servant',
      'Finance', 'Charity Sector', 'Student'
    ],

    maritalStatus: ['Never married', 'Divorced', 'Widowed'],

    familyInvolvement: [
      'Family closely involved',
      'Family involved',
      'Family aware',
      'Leading the process myself'
    ],

    livingArrangements: ['Live with family', 'Live independently', 'Open to either'],

    familyValues: [
      'Close-knit family', 'Respect for elders', 'Open communication', 'Hospitality',
      'Shared decision-making', 'Traditions matter', 'Balance of tradition and modern',
      'Supportive in-laws', 'Family comes first'
    ],

    timeline: [
      'Within 6 months', 'Within a year', 'Within 1–2 years', 'When I meet the right person'
    ],

    relocate: ['Yes, happy to relocate', 'For the right person', 'Prefer to stay where I am'],

    intentions: [
      'Serious and marriage-focused', 'Ready to involve families', 'Seeking a lifelong partnership',
      'Open to international matches', 'Prefer someone locally based', 'Building a home rooted in faith'
    ],

    diet: ['Halal only', 'Halal and vegetarian', 'Vegetarian', 'Vegan', 'Flexible'],
    smoking: ['Never', 'Occasionally', 'Prefer not to say'],
    activity: ['Very active', 'Active', 'Moderately active', 'Relaxed'],

    personality: [
      'Calm', 'Ambitious', 'Family-oriented', 'Easy-going', 'Thoughtful', 'Curious',
      'Organised', 'Warm', 'Independent', 'Funny', 'Patient', 'Driven', 'Creative',
      'Practical', 'Optimistic', 'Introverted', 'Outgoing'
    ],

    interests: [
      'Reading', 'Travel', 'Cooking', 'Baking', 'Fitness', 'Hiking', 'Running', 'Cycling',
      'Swimming', 'Football', 'Photography', 'Volunteering', 'Charity work', 'Calligraphy',
      "Qur'an study", 'Languages', 'Art and museums', 'Film', 'Poetry', 'Writing',
      'Entrepreneurship', 'Technology', 'Coffee', 'Tea', 'Gardening', 'Nature', 'Camping',
      'History', 'Astronomy', 'Podcasts', 'Board games', 'Interior design', 'Archery', 'Teaching'
    ],

    city: [
      'London, UK', 'Birmingham, UK', 'Manchester, UK', 'Leeds, UK', 'Bradford, UK',
      'Glasgow, UK', 'Bristol, UK', 'Cardiff, UK', 'Leicester, UK', 'Luton, UK',
      'Nottingham, UK', 'Liverpool, UK', 'Sheffield, UK', 'Reading, UK', 'Edinburgh, UK',
      'Dublin, Ireland', 'Toronto, Canada', 'Dubai, UAE', 'Kuala Lumpur, Malaysia',
      'Istanbul, Türkiye', 'Amsterdam, Netherlands', 'Paris, France'
    ]
  };

  /* ---- The demo user --------------------------------------------------- */

  var ME = {
    id: 'me',
    firstName: 'Yusuf',
    name: 'Yusuf Karim',
    age: 29,
    dateOfBirth: '1996-04-12',
    gender: 'Man',
    location: 'London, UK',
    photos: [PX.yusuf, PX.sCoffee, PX.sRange],
    bio: "Architect in London, originally from Birmingham. I spend my weekends sketching buildings I will probably never get to build, and hiking whenever the weather allows it. Family means a great deal to me, and I am looking for someone to build a calm, purposeful home with, insha'Allah.",
    sect: 'Sunni',
    prayer: 'Five times a day',
    nationality: 'British',
    ethnicity: 'South Asian',
    languages: ['English', 'Urdu', 'Arabic'],
    education: 'Postgraduate degree',
    profession: 'Architect',
    maritalStatus: 'Never married',
    height: 178,
    familyInvolvement: 'Family involved',
    livingArrangements: 'Live independently',
    familyValues: ['Close-knit family', 'Respect for elders', 'Open communication'],
    timeline: 'Within a year',
    relocate: 'For the right person',
    intentions: ['Serious and marriage-focused', 'Ready to involve families'],
    diet: 'Halal only',
    smoking: 'Never',
    activity: 'Active',
    personality: ['Thoughtful', 'Family-oriented', 'Ambitious', 'Calm'],
    interests: ['Reading', 'Travel', 'Photography', 'Hiking', 'Coffee', 'Calligraphy', 'Football']
  };

  /* ---- Discovery queue -------------------------------------------------
     `likedYou: true` is the scripted mutual match. Rule-based ranking is
     surfaced through `matchedOn` — the filters this profile satisfies.
     ------------------------------------------------------------------- */

  var PEOPLE = [
    {
      id: 'amina', firstName: 'Amina', name: 'Amina Rahman', age: 27, gender: 'Woman',
      location: 'London, UK', distance: '4 miles away',
      photos: [PX.amina3, PX.amina4, PX.amina1, PX.amina2, PX.amina5],
      likedYou: true,
      bio: "Dentist by day, and far too invested in finding London's best cardamom coffee by evening. I was raised in a loud, close family and I would love to build one of my own — calm, kind and rooted in faith. I read constantly and write badly.",
      sect: 'Sunni', prayer: 'Five times a day',
      nationality: 'British', ethnicity: 'South Asian',
      languages: ['English', 'Bengali', 'Arabic'],
      education: 'Postgraduate degree', profession: 'Dentist',
      maritalStatus: 'Never married', height: 165,
      familyInvolvement: 'Family involved', livingArrangements: 'Open to either',
      familyValues: ['Close-knit family', 'Respect for elders', 'Hospitality', 'Open communication'],
      timeline: 'Within a year', relocate: 'For the right person',
      intentions: ['Serious and marriage-focused', 'Ready to involve families', 'Building a home rooted in faith'],
      diet: 'Halal only', smoking: 'Never', activity: 'Active',
      personality: ['Warm', 'Thoughtful', 'Family-oriented', 'Curious'],
      interests: ['Reading', 'Travel', 'Calligraphy', 'Baking', 'Volunteering', 'Poetry', 'Coffee'],
      matchedOn: ['Age', 'Location', 'Sect', 'Religious preferences', 'Education', 'Language']
    },
    {
      id: 'maryam', firstName: 'Maryam', name: 'Maryam Al-Fahad', age: 29, gender: 'Woman',
      location: 'Manchester, UK', distance: '164 miles away',
      photos: [PX.maryam, PX.sValley],
      bio: 'Pharmacist, born in Baghdad and raised between two languages. I am happiest on a hill somewhere with a flask of tea. Looking for someone steady, funny and serious about building a life.',
      sect: 'Sunni', prayer: 'Most prayers',
      nationality: 'Iraqi', ethnicity: 'Arab',
      languages: ['English', 'Arabic'],
      education: 'Postgraduate degree', profession: 'Pharmacist',
      maritalStatus: 'Never married', height: 168,
      familyInvolvement: 'Family closely involved', livingArrangements: 'Live independently',
      familyValues: ['Respect for elders', 'Hospitality', 'Family comes first'],
      timeline: 'Within a year', relocate: 'Yes, happy to relocate',
      intentions: ['Serious and marriage-focused', 'Seeking a lifelong partnership'],
      diet: 'Halal only', smoking: 'Never', activity: 'Very active',
      personality: ['Independent', 'Warm', 'Driven', 'Funny'],
      interests: ['Hiking', 'Cooking', 'Photography', 'Nature', 'Tea', 'Travel'],
      matchedOn: ['Age', 'Sect', 'Education', 'Marital status']
    },
    {
      id: 'sara', firstName: 'Sara', name: 'Sara Iqbal', age: 26, gender: 'Woman',
      location: 'Birmingham, UK', distance: '118 miles away',
      photos: [PX.sara, PX.sBooks],
      bio: 'Primary school teacher with thirty small people who think I know everything. I bake when I am stressed, which means my colleagues eat very well. Family-oriented and looking for the same.',
      sect: 'Sunni', prayer: 'Most prayers',
      nationality: 'British', ethnicity: 'South Asian',
      languages: ['English', 'Urdu', 'Punjabi'],
      education: 'Undergraduate degree', profession: 'Teacher',
      maritalStatus: 'Never married', height: 160,
      familyInvolvement: 'Family closely involved', livingArrangements: 'Live with family',
      familyValues: ['Close-knit family', 'Family comes first', 'Traditions matter'],
      timeline: 'Within 1–2 years', relocate: 'For the right person',
      intentions: ['Serious and marriage-focused', 'Prefer someone locally based'],
      diet: 'Halal only', smoking: 'Never', activity: 'Moderately active',
      personality: ['Warm', 'Patient', 'Optimistic', 'Family-oriented'],
      interests: ['Reading', 'Baking', 'Art and museums', 'Volunteering', 'Board games'],
      matchedOn: ['Age', 'Sect', 'Ethnicity', 'Language', 'Marital status']
    },
    {
      id: 'zainab', firstName: 'Zainab', name: 'Zainab Diallo', age: 30, gender: 'Woman',
      location: 'London, UK', distance: '7 miles away',
      photos: [PX.zainab, PX.sWindow],
      bio: 'Solicitor in the City, originally from Dakar by way of Paris. I run early, cook badly and care a great deal about doing useful work. I would like a marriage that is a genuine partnership.',
      sect: 'Sunni', prayer: 'Five times a day',
      nationality: 'Senegalese', ethnicity: 'West African',
      languages: ['English', 'French', 'Wolof'],
      education: 'Postgraduate degree', profession: 'Solicitor',
      maritalStatus: 'Never married', height: 172,
      familyInvolvement: 'Family aware', livingArrangements: 'Live independently',
      familyValues: ['Open communication', 'Shared decision-making', 'Respect for elders'],
      timeline: 'Within a year', relocate: 'Prefer to stay where I am',
      intentions: ['Serious and marriage-focused', 'Seeking a lifelong partnership'],
      diet: 'Halal only', smoking: 'Never', activity: 'Very active',
      personality: ['Driven', 'Independent', 'Thoughtful', 'Organised'],
      interests: ['Running', 'Charity work', 'Podcasts', 'Travel', 'Cooking'],
      matchedOn: ['Location', 'Sect', 'Religious preferences', 'Education']
    },
    {
      id: 'layla', firstName: 'Layla', name: 'Layla Haddad', age: 28, gender: 'Woman',
      location: 'Leeds, UK', distance: '196 miles away',
      photos: [PX.layla, PX.sCoffee],
      bio: 'Graphic designer, Lebanese by heritage and Yorkshire by accident. I notice typefaces on menus and I cannot stop. Looking for warmth, humour and someone who takes faith and family seriously.',
      sect: 'Sunni', prayer: 'Most prayers',
      nationality: 'Lebanese', ethnicity: 'Arab',
      languages: ['English', 'Arabic', 'French'],
      education: 'Undergraduate degree', profession: 'Designer',
      maritalStatus: 'Never married', height: 163,
      familyInvolvement: 'Family involved', livingArrangements: 'Open to either',
      familyValues: ['Hospitality', 'Open communication', 'Balance of tradition and modern'],
      timeline: 'When I meet the right person', relocate: 'For the right person',
      intentions: ['Serious and marriage-focused', 'Open to international matches'],
      diet: 'Halal only', smoking: 'Never', activity: 'Moderately active',
      personality: ['Creative', 'Easy-going', 'Curious', 'Warm'],
      interests: ['Art and museums', 'Photography', 'Coffee', 'Travel', 'Film', 'Interior design'],
      matchedOn: ['Age', 'Sect', 'Marital status']
    },
    {
      id: 'nadia', firstName: 'Nadia', name: 'Nadia Suryani', age: 27, gender: 'Woman',
      location: 'Reading, UK', distance: '38 miles away',
      photos: [PX.nadia, PX.sForest],
      bio: 'Software engineer, Jakarta-born, Reading-based. Weekends are for camping, cooking for too many people, and trying to finish the book I started three books ago.',
      sect: 'Sunni', prayer: 'Five times a day',
      nationality: 'Indonesian', ethnicity: 'Southeast Asian',
      languages: ['English', 'Indonesian', 'Malay'],
      education: 'Undergraduate degree', profession: 'Software Engineer',
      maritalStatus: 'Never married', height: 158,
      familyInvolvement: 'Family involved', livingArrangements: 'Live independently',
      familyValues: ['Close-knit family', 'Open communication', 'Supportive in-laws'],
      timeline: 'Within a year', relocate: 'For the right person',
      intentions: ['Serious and marriage-focused', 'Building a home rooted in faith'],
      diet: 'Halal only', smoking: 'Never', activity: 'Active',
      personality: ['Curious', 'Calm', 'Practical', 'Funny'],
      interests: ['Technology', 'Reading', 'Cycling', 'Cooking', 'Languages', 'Camping'],
      matchedOn: ['Age', 'Location', 'Sect', 'Religious preferences']
    },
    {
      id: 'hafsa', firstName: 'Hafsa', name: 'Hafsa Mahmood', age: 31, gender: 'Woman',
      location: 'Glasgow, UK', distance: '345 miles away',
      photos: [PX.hafsa, PX.sHills],
      bio: 'GP in Glasgow. I garden, I swim badly, and I am slowly memorising Surah Yaseen. I have been through one marriage and I am approaching this one with clear eyes and an open heart.',
      sect: 'Sunni', prayer: 'Five times a day',
      nationality: 'Pakistani', ethnicity: 'South Asian',
      languages: ['English', 'Urdu'],
      education: 'Doctorate', profession: 'Doctor',
      maritalStatus: 'Divorced', height: 166,
      familyInvolvement: 'Leading the process myself', livingArrangements: 'Live independently',
      familyValues: ['Open communication', 'Respect for elders', 'Shared decision-making'],
      timeline: 'Within 6 months', relocate: 'For the right person',
      intentions: ['Serious and marriage-focused', 'Seeking a lifelong partnership'],
      diet: 'Halal only', smoking: 'Never', activity: 'Moderately active',
      personality: ['Patient', 'Thoughtful', 'Independent', 'Warm'],
      interests: ["Qur'an study", 'Gardening', 'Swimming', 'Poetry', 'Charity work'],
      matchedOn: ['Sect', 'Religious preferences', 'Education', 'Language']
    },
    {
      id: 'aisha', firstName: 'Aisha', name: 'Aisha Bello', age: 29, gender: 'Woman',
      location: 'Bristol, UK', distance: '106 miles away',
      photos: [PX.aisha, PX.sRocks],
      bio: 'Civil engineer — I build bridges, which my mother finds hilarious given that I am also trying to build one to the right person. Nigerian-British, ambitious, and very fond of my family.',
      sect: 'Sunni', prayer: 'Most prayers',
      nationality: 'Nigerian', ethnicity: 'West African',
      languages: ['English', 'Hausa'],
      education: 'Postgraduate degree', profession: 'Civil Engineer',
      maritalStatus: 'Never married', height: 170,
      familyInvolvement: 'Family involved', livingArrangements: 'Open to either',
      familyValues: ['Family comes first', 'Hospitality', 'Traditions matter'],
      timeline: 'Within 1–2 years', relocate: 'Yes, happy to relocate',
      intentions: ['Serious and marriage-focused', 'Open to international matches'],
      diet: 'Halal only', smoking: 'Never', activity: 'Very active',
      personality: ['Ambitious', 'Outgoing', 'Driven', 'Optimistic'],
      interests: ['Fitness', 'Travel', 'Entrepreneurship', 'Cooking', 'History'],
      matchedOn: ['Age', 'Sect', 'Education', 'Marital status']
    },

    /* --- Existing matches: not in the discovery queue ------------------- */
    {
      id: 'fatima', firstName: 'Fatima', name: 'Fatima Nassar', age: 28, gender: 'Woman',
      location: 'London, UK', distance: '9 miles away', photos: [PX.fatima, PX.sRange],
      bio: 'Dietitian working in the NHS. I came into this field because of my mum, and I have stayed for everyone else’s. Looking for a kind, practising partner with a sense of humour.',
      sect: 'Sunni', prayer: 'Five times a day', nationality: 'Syrian', ethnicity: 'Arab',
      languages: ['English', 'Arabic'], education: 'Postgraduate degree', profession: 'Dietitian',
      maritalStatus: 'Never married', height: 164,
      familyInvolvement: 'Family involved', livingArrangements: 'Open to either',
      familyValues: ['Close-knit family', 'Hospitality', 'Open communication'],
      timeline: 'Within a year', relocate: 'For the right person',
      intentions: ['Serious and marriage-focused'],
      diet: 'Halal only', smoking: 'Never', activity: 'Active',
      personality: ['Warm', 'Practical', 'Optimistic'],
      interests: ['Cooking', 'Hiking', 'Reading', 'Volunteering'],
      matchedOn: ['Age', 'Location', 'Sect', 'Religious preferences']
    },
    {
      id: 'khadija', firstName: 'Khadija', name: 'Khadija Osman', age: 30, gender: 'Woman',
      location: 'Cardiff, UK', distance: '132 miles away', photos: [PX.khadija, PX.sWindow],
      bio: 'Optometrist in Cardiff, Somali heritage, a very large family and a non-negotiable Sunday lunch. I want a home that is calm, warm and full of people.',
      sect: 'Sunni', prayer: 'Five times a day', nationality: 'Somali', ethnicity: 'East African',
      languages: ['English', 'Somali', 'Arabic'], education: 'Postgraduate degree',
      profession: 'Optometrist', maritalStatus: 'Never married', height: 169,
      familyInvolvement: 'Family closely involved', livingArrangements: 'Live with family',
      familyValues: ['Family comes first', 'Close-knit family', 'Hospitality'],
      timeline: 'Within 6 months', relocate: 'For the right person',
      intentions: ['Serious and marriage-focused', 'Ready to involve families'],
      diet: 'Halal only', smoking: 'Never', activity: 'Moderately active',
      personality: ['Warm', 'Funny', 'Family-oriented'],
      interests: ['Cooking', 'Poetry', 'Charity work', 'Tea'],
      matchedOn: ['Sect', 'Religious preferences', 'Education']
    },
    {
      id: 'yasmin', firstName: 'Yasmin', name: 'Yasmin Chaudhry', age: 26, gender: 'Woman',
      location: 'Luton, UK', distance: '31 miles away', photos: [PX.yasmin, PX.sBooks],
      bio: 'Marketing manager, Luton born and raised. I am the planner in every friendship group. Looking for someone thoughtful who knows what they want.',
      sect: 'Sunni', prayer: 'Most prayers', nationality: 'British', ethnicity: 'South Asian',
      languages: ['English', 'Urdu'], education: 'Undergraduate degree', profession: 'Marketing',
      maritalStatus: 'Never married', height: 161,
      familyInvolvement: 'Family involved', livingArrangements: 'Open to either',
      familyValues: ['Close-knit family', 'Balance of tradition and modern'],
      timeline: 'Within 1–2 years', relocate: 'For the right person',
      intentions: ['Serious and marriage-focused'],
      diet: 'Halal only', smoking: 'Never', activity: 'Active',
      personality: ['Organised', 'Outgoing', 'Optimistic'],
      interests: ['Travel', 'Film', 'Coffee', 'Fitness'],
      matchedOn: ['Age', 'Location', 'Ethnicity', 'Language']
    },
    {
      id: 'iman', firstName: 'Iman', name: 'Iman Rachidi', age: 29, gender: 'Woman',
      location: 'Nottingham, UK', distance: '128 miles away', photos: [PX.iman, PX.sForest],
      bio: 'Researcher in public health, Moroccan-British. I recommend books at people until they read them. Faith, family and good conversation matter most to me.',
      sect: 'Sunni', prayer: 'Five times a day', nationality: 'Moroccan', ethnicity: 'North African',
      languages: ['English', 'Arabic', 'French', 'Amazigh'], education: 'Doctorate',
      profession: 'Researcher', maritalStatus: 'Never married', height: 167,
      familyInvolvement: 'Family involved', livingArrangements: 'Live independently',
      familyValues: ['Open communication', 'Respect for elders', 'Shared decision-making'],
      timeline: 'Within a year', relocate: 'For the right person',
      intentions: ['Serious and marriage-focused', 'Building a home rooted in faith'],
      diet: 'Halal only', smoking: 'Never', activity: 'Moderately active',
      personality: ['Thoughtful', 'Curious', 'Calm'],
      interests: ['Reading', 'Writing', 'History', 'Poetry', 'Travel'],
      matchedOn: ['Age', 'Sect', 'Religious preferences', 'Education']
    }
  ];

  var BY_ID = {};
  PEOPLE.forEach(function (p) { BY_ID[p.id] = p; });
  /* The demo user is addressable both as the signed-in user and by name,
     so admin records that reference 'yusuf' resolve to the same person. */
  BY_ID.me = ME;
  BY_ID.yusuf = ME;

  var DISCOVERY_ORDER = ['amina', 'maryam', 'sara', 'zainab', 'layla', 'nadia', 'hafsa', 'aisha'];

  /* ---- Matches & conversations ---------------------------------------- */

  var MATCHES = [
    { id: 'fatima', matchedOn: '2 days ago', state: 'active' },
    { id: 'khadija', matchedOn: '5 days ago', state: 'active' },
    { id: 'yasmin', matchedOn: '1 week ago', state: 'new' },
    { id: 'iman', matchedOn: '2 weeks ago', state: 'active' }
  ];

  /* Message: { from: 'me' | 'them', text, time, read } */
  var THREADS = {
    fatima: {
      id: 'fatima', updated: '19:51', unread: 2,
      messages: [
        { from: 'me', text: 'Assalamu alaikum Fatima. I hope your week has been going well.', time: '19:42', read: true },
        { from: 'them', text: 'Wa alaikum assalam. It has been busy but good, alhamdulillah. How about yours?', time: '19:45' },
        { from: 'me', text: "Busy too — we are finishing a community centre in Whitechapel this month. What drew you into dietetics?", time: '19:48', read: true },
        { from: 'them', text: 'My mum was diagnosed with diabetes when I was sixteen and nobody explained food to her in a way that made sense. I wanted to fix that.', time: '19:50' },
        { from: 'them', text: 'It sounds like your work is quite community-focused too.', time: '19:51' }
      ]
    },
    khadija: {
      id: 'khadija', updated: 'Yesterday', unread: 1,
      messages: [
        { from: 'them', text: 'That is a lovely way to put it. My family are the same — Sunday lunch is non-negotiable.', time: '13:20' },
        { from: 'me', text: 'Ours too. Although ours runs to about fourteen people now.', time: '13:31', read: true },
        { from: 'them', text: 'Fourteen. I would need to practise.', time: '13:34' }
      ]
    },
    iman: {
      id: 'iman', updated: 'Monday', unread: 0,
      messages: [
        { from: 'them', text: 'If you are serious about the reading list, start with the shorter one. It is kinder.', time: '09:04' },
        { from: 'me', text: 'Jazak Allah khair for the recommendation — I ordered it this morning.', time: '09:12', read: true },
        { from: 'them', text: 'You will like the middle section best, I think.', time: '09:40' }
      ]
    },
    yasmin: {
      id: 'yasmin', updated: '', unread: 0, messages: []
    },
    amina: {
      id: 'amina', updated: '', unread: 0, messages: []
    }
  };

  var STARTERS = [
    { theme: 'Values', text: 'What does a happy home look like to you?' },
    { theme: 'Family', text: "What is something your family does that you would want to carry into your own?" },
    { theme: 'Future', text: 'Where do you hope to be settled in five years?' },
    { theme: 'Career', text: 'What first drew you to your line of work?' },
    { theme: 'Lifestyle', text: 'How do you like to spend a Friday?' },
    { theme: 'Faith', text: 'Is there a habit in your deen you are working on at the moment?' },
    { theme: 'Marriage', text: 'What does a good marriage look like from where you are standing?' },
    { theme: 'Personal', text: 'What is one thing you are trying to get better at this year?' }
  ];

  /* ---- Profile builder (declarative — reused by profile editing) -------- */

  var BUILDER_STEPS = [
    {
      key: 'basic', short: 'Basics', icon: 'profile',
      title: 'Basic information',
      subtitle: 'The essentials that appear at the top of your profile.',
      fields: [
        { key: 'firstName', type: 'text', label: 'First name', placeholder: 'Your first name', required: true },
        { key: 'dateOfBirth', type: 'date', label: 'Date of birth', hint: 'Only your age is shown on your profile.', required: true },
        { key: 'gender', type: 'single', label: 'I am', options: OPT.gender, required: true },
        { key: 'location', type: 'select', label: 'Where you live', icon: 'location', options: OPT.city, required: true }
      ]
    },
    {
      key: 'photos', short: 'Photos', icon: 'photo',
      title: 'Profile photos',
      subtitle: 'Add a clear main photo. You can reorder or remove them at any time.',
      fields: [{ key: 'photos', type: 'photos', label: 'Photos', hint: 'Your first photo is your main photo.' }]
    },
    {
      key: 'about', short: 'About', icon: 'about',
      title: 'About me',
      subtitle: 'A short, honest introduction goes a long way.',
      fields: [{
        key: 'bio', type: 'textarea', label: 'Your bio', min: 60, max: 500,
        placeholder: 'Tell people who you are, what matters to you, and what you are looking for in a marriage.',
        hint: 'Between 60 and 500 characters.'
      }]
    },
    {
      key: 'faith', short: 'Faith', icon: 'faith',
      title: 'Faith and practice',
      subtitle: 'This helps us show you people with a similar outlook.',
      fields: [
        { key: 'sect', type: 'single', label: 'Sect', options: OPT.sect, required: true },
        { key: 'prayer', type: 'single', label: 'Prayer and religiosity', options: OPT.prayer, required: true }
      ]
    },
    {
      key: 'background', short: 'Background', icon: 'globe',
      title: 'Background',
      subtitle: 'Where you are from and the languages you speak.',
      fields: [
        { key: 'nationality', type: 'select', label: 'Nationality', icon: 'globe', options: OPT.nationality, required: true },
        { key: 'ethnicity', type: 'single', label: 'Ethnicity / region', options: OPT.ethnicity, required: true },
        { key: 'languages', type: 'multiselect', label: 'Languages', icon: 'language', options: OPT.language, maxSelect: 6, required: true }
      ]
    },
    {
      key: 'education', short: 'Education', icon: 'education',
      title: 'Education and career',
      subtitle: 'What you studied and what you do.',
      fields: [
        { key: 'education', type: 'single', label: 'Education', options: OPT.education, required: true },
        { key: 'profession', type: 'select', label: 'Profession', icon: 'profession', options: OPT.profession, required: true }
      ]
    },
    {
      key: 'personal', short: 'Personal', icon: 'height',
      title: 'Personal details',
      subtitle: 'A couple of details people usually ask about.',
      fields: [
        { key: 'maritalStatus', type: 'single', label: 'Marital status', options: OPT.maritalStatus, required: true },
        { key: 'height', type: 'height', label: 'Height', min: 140, max: 210, required: true }
      ]
    },
    {
      key: 'family', short: 'Family', icon: 'family',
      title: 'Family values',
      subtitle: 'How your family fits into the process and the life you want.',
      fields: [
        { key: 'familyInvolvement', type: 'single', label: 'Family involvement', options: OPT.familyInvolvement, required: true },
        { key: 'livingArrangements', type: 'single', label: 'Living arrangements after marriage', options: OPT.livingArrangements, required: true },
        { key: 'familyValues', type: 'multi', label: 'What matters to you', options: OPT.familyValues, maxSelect: 5 }
      ]
    },
    {
      key: 'intentions', short: 'Intentions', icon: 'intentions',
      title: 'Marital intentions',
      subtitle: 'Being clear here saves everyone time.',
      fields: [
        { key: 'timeline', type: 'single', label: 'Marriage timeline', options: OPT.timeline, required: true },
        { key: 'relocate', type: 'single', label: 'Willing to relocate', options: OPT.relocate, required: true },
        { key: 'intentions', type: 'multi', label: 'What you are looking for', options: OPT.intentions, maxSelect: 4 }
      ]
    },
    {
      key: 'lifestyle', short: 'Lifestyle', icon: 'lifestyle',
      title: 'Lifestyle',
      subtitle: 'The day-to-day details.',
      fields: [
        { key: 'diet', type: 'single', label: 'Diet', options: OPT.diet, required: true },
        { key: 'smoking', type: 'single', label: 'Smoking', options: OPT.smoking, required: true },
        { key: 'activity', type: 'single', label: 'Activity level', options: OPT.activity, required: true }
      ]
    },
    {
      key: 'interests', short: 'Interests', icon: 'personality',
      title: 'Personality and interests',
      subtitle: 'Pick the ones that genuinely sound like you.',
      fields: [
        { key: 'personality', type: 'multi', label: 'Personality', options: OPT.personality, maxSelect: 6 },
        { key: 'interests', type: 'multi', label: 'Interests', options: OPT.interests, maxSelect: 10 }
      ]
    }
  ];

  /* ---- Match preferences / filters ------------------------------------ */

  var FILTER_GROUPS = [
    {
      key: 'basic', title: 'Basic', icon: 'profile',
      filters: [
        { key: 'age', type: 'range', label: 'Age', min: 18, max: 60, unit: '' },
        { key: 'location', type: 'multiselect', label: 'Location', options: OPT.city },
        { key: 'height', type: 'range', label: 'Height', min: 140, max: 210, unit: 'cm' }
      ]
    },
    {
      key: 'background', title: 'Background', icon: 'globe',
      filters: [
        { key: 'nationality', type: 'multiselect', label: 'Nationality', options: OPT.nationality },
        { key: 'ethnicity', type: 'multiselect', label: 'Ethnicity', options: OPT.ethnicity },
        { key: 'language', type: 'multiselect', label: 'Language', options: OPT.language }
      ]
    },
    {
      key: 'faith', title: 'Faith and values', icon: 'faith',
      filters: [
        { key: 'sect', type: 'multiselect', label: 'Sect', options: OPT.sect },
        { key: 'religious', type: 'multiselect', label: 'Religious preferences', options: OPT.prayer },
        { key: 'familyValues', type: 'multiselect', label: 'Family values', options: OPT.familyValues }
      ]
    },
    {
      key: 'life', title: 'Education and life', icon: 'education',
      filters: [
        { key: 'education', type: 'multiselect', label: 'Education', options: OPT.education },
        { key: 'profession', type: 'multiselect', label: 'Profession', options: OPT.profession },
        { key: 'maritalStatus', type: 'multiselect', label: 'Marital status', options: OPT.maritalStatus }
      ]
    }
  ];

  var DEFAULT_FILTERS = {
    age: [24, 34],
    height: [150, 185],
    location: ['London, UK'],
    nationality: [],
    ethnicity: [],
    language: ['English'],
    sect: ['Sunni'],
    religious: ['Five times a day', 'Most prayers'],
    familyValues: [],
    education: [],
    profession: [],
    maritalStatus: ['Never married']
  };

  /* ---- Profile display sections (shared by D02 and I01) ---------------- */

  function sections(p) {
    return [
      {
        key: 'faith', title: 'Faith and practice', icon: 'faith',
        rows: [['Sect', p.sect], ['Prayer and religiosity', p.prayer]]
      },
      {
        key: 'background', title: 'Background', icon: 'globe',
        rows: [['Nationality', p.nationality], ['Ethnicity / region', p.ethnicity]],
        chipsLabel: 'Languages', chips: p.languages
      },
      {
        key: 'education', title: 'Education and career', icon: 'education',
        rows: [['Education', p.education], ['Profession', p.profession]]
      },
      {
        key: 'personal', title: 'Personal details', icon: 'height',
        rows: [['Marital status', p.maritalStatus], ['Height', UI.height(p.height)]]
      },
      {
        key: 'family', title: 'Family values', icon: 'family',
        rows: [['Family involvement', p.familyInvolvement], ['After marriage', p.livingArrangements]],
        chips: p.familyValues
      },
      {
        key: 'intentions', title: 'Marital intentions', icon: 'intentions',
        rows: [['Marriage timeline', p.timeline], ['Relocation', p.relocate]],
        chips: p.intentions
      },
      {
        key: 'lifestyle', title: 'Lifestyle', icon: 'lifestyle',
        rows: [['Diet', p.diet], ['Smoking', p.smoking], ['Activity level', p.activity]]
      },
      {
        key: 'interests', title: 'Personality and interests', icon: 'personality',
        chipsLabel: 'Personality', chips: p.personality,
        chipsLabel2: 'Interests', chips2: p.interests
      }
    ];
  }

  /* ---- Administration panel data --------------------------------------- */

  var ADMIN = {
    metrics: [
      { key: 'users', label: 'Total users', value: '12,480', icon: 'users' },
      { key: 'active', label: 'Active profiles', value: '9,314', icon: 'check-circle' },
      { key: 'matches', label: 'Matches', value: '3,672', icon: 'match' },
      { key: 'flagged', label: 'Flagged profiles', value: '14', icon: 'flag', tone: 'warn' }
    ],

    users: [
      { id: 'amina',  name: 'Amina Rahman',    age: 27, location: 'London, UK',     account: 'Active',     profile: 'Complete',     joined: '14 Feb 2026' },
      { id: 'yusuf',  name: 'Yusuf Karim',     age: 29, location: 'London, UK',     account: 'Active',     profile: 'Complete',     joined: '09 Mar 2026' },
      { id: 'omar',   name: 'Omar Siddiqui',   age: 32, location: 'Manchester, UK', account: 'Active',     profile: 'Complete',     joined: '22 Jan 2026' },
      { id: 'maryam', name: 'Maryam Al-Fahad', age: 29, location: 'Manchester, UK', account: 'Active',     profile: 'Complete',     joined: '03 Apr 2026' },
      { id: 'hamza',  name: 'Hamza Rashid',    age: 27, location: 'Leeds, UK',      account: 'Restricted', profile: 'Under review', joined: '18 May 2026' },
      { id: 'zainab', name: 'Zainab Diallo',   age: 30, location: 'London, UK',     account: 'Active',     profile: 'Complete',     joined: '27 Dec 2025' },
      { id: 'ibrahim',name: 'Ibrahim Touré',   age: 31, location: 'London, UK',     account: 'Active',     profile: 'Complete',     joined: '11 Jun 2026' },
      { id: 'sara',   name: 'Sara Iqbal',      age: 26, location: 'Birmingham, UK', account: 'Active',     profile: 'Incomplete',   joined: '02 Jul 2026' },
      { id: 'bilal',  name: 'Bilal Ahmed',     age: 26, location: 'Bradford, UK',   account: 'Suspended',  profile: 'Under review', joined: '30 Apr 2026' },
      { id: 'layla',  name: 'Layla Haddad',    age: 28, location: 'Leeds, UK',      account: 'Active',     profile: 'Complete',     joined: '16 Aug 2026' },
      { id: 'adam',   name: 'Adam Cisse',      age: 29, location: 'Birmingham, UK', account: 'Active',     profile: 'Complete',     joined: '05 Feb 2026' },
      { id: 'nadia',  name: 'Nadia Suryani',   age: 27, location: 'Reading, UK',    account: 'Active',     profile: 'Complete',     joined: '21 Mar 2026' },
      { id: 'tariq',  name: 'Tariq Nasser',    age: 34, location: 'London, UK',     account: 'Active',     profile: 'Complete',     joined: '19 Nov 2025' },
      { id: 'hafsa',  name: 'Hafsa Mahmood',   age: 31, location: 'Glasgow, UK',    account: 'Active',     profile: 'Complete',     joined: '08 Sep 2026' },
      { id: 'musa',   name: 'Musa Diallo',     age: 28, location: 'Bristol, UK',    account: 'Active',     profile: 'Incomplete',   joined: '01 Sep 2026' },
      { id: 'aisha',  name: 'Aisha Bello',     age: 29, location: 'Bristol, UK',    account: 'Active',     profile: 'Complete',     joined: '12 May 2026' },
      { id: 'imran',  name: 'Imran Sheikh',    age: 33, location: 'Glasgow, UK',    account: 'Restricted', profile: 'Under review', joined: '26 Jun 2026' },
      { id: 'khadija',name: 'Khadija Osman',   age: 30, location: 'Cardiff, UK',    account: 'Active',     profile: 'Complete',     joined: '07 Jan 2026' }
    ],

    matches: [
      { user: 'Yusuf Karim',   userId: 'yusuf',  withName: 'Amina Rahman',   withId: 'amina',   date: '11 Sep 2026', status: 'Conversation started' },
      { user: 'Yusuf Karim',   userId: 'yusuf',  withName: 'Fatima Nassar',  withId: 'fatima',  date: '09 Sep 2026', status: 'Conversation started' },
      { user: 'Yusuf Karim',   userId: 'yusuf',  withName: 'Khadija Osman',  withId: 'khadija', date: '06 Sep 2026', status: 'Conversation started' },
      { user: 'Yusuf Karim',   userId: 'yusuf',  withName: 'Yasmin Chaudhry',withId: 'yasmin',  date: '04 Sep 2026', status: 'No conversation' },
      { user: 'Omar Siddiqui', userId: 'omar',   withName: 'Maryam Al-Fahad',withId: 'maryam',  date: '02 Sep 2026', status: 'Conversation started' },
      { user: 'Ibrahim Touré', userId: 'ibrahim',withName: 'Zainab Diallo',  withId: 'zainab',  date: '31 Aug 2026', status: 'Conversation started' },
      { user: 'Adam Cisse',    userId: 'adam',   withName: 'Aisha Bello',    withId: 'aisha',   date: '28 Aug 2026', status: 'No conversation' },
      { user: 'Tariq Nasser',  userId: 'tariq',  withName: 'Hafsa Mahmood',  withId: 'hafsa',   date: '25 Aug 2026', status: 'Ended' },
      { user: 'Musa Diallo',   userId: 'musa',   withName: 'Layla Haddad',   withId: 'layla',   date: '21 Aug 2026', status: 'Conversation started' }
    ],

    conversations: [
      { id: 'c-1044', a: 'Yusuf Karim', b: 'Amina Rahman',    created: '11 Sep 2026', last: '11 Sep 2026, 21:03', status: 'Active',   count: 2 },
      { id: 'c-1041', a: 'Yusuf Karim', b: 'Fatima Nassar',   created: '09 Sep 2026', last: '11 Sep 2026, 19:51', status: 'Active',   count: 5 },
      { id: 'c-1039', a: 'Yusuf Karim', b: 'Khadija Osman',   created: '06 Sep 2026', last: '10 Sep 2026, 13:34', status: 'Active',   count: 3 },
      { id: 'c-1036', a: 'Yusuf Karim', b: 'Iman Rachidi',    created: '28 Aug 2026', last: '08 Sep 2026, 09:40', status: 'Active',   count: 3 },
      { id: 'c-1031', a: 'Omar Siddiqui', b: 'Maryam Al-Fahad', created: '02 Sep 2026', last: '09 Sep 2026, 21:12', status: 'Active', count: 24 },
      { id: 'c-1028', a: 'Ibrahim Touré', b: 'Zainab Diallo', created: '31 Aug 2026', last: '07 Sep 2026, 08:02', status: 'Active',   count: 17 },
      { id: 'c-1019', a: 'Musa Diallo',  b: 'Layla Haddad',   created: '21 Aug 2026', last: '02 Sep 2026, 22:40', status: 'Inactive', count: 9 },
      { id: 'c-1007', a: 'Tariq Nasser', b: 'Hafsa Mahmood',  created: '25 Aug 2026', last: '26 Aug 2026, 12:18', status: 'Closed',   count: 2 }
    ],

    reports: [
      { ref: 'R-2291', id: 'hamza',  name: 'Hamza Rashid',  reason: 'Misleading profile information', detail: 'Reporter states the profession and education listed do not match information shared in conversation.', date: '10 Sep 2026', status: 'Open', reporter: 'Zainab Diallo' },
      { ref: 'R-2288', id: 'bilal',  name: 'Bilal Ahmed',   reason: 'Offensive language',             detail: 'Reporter describes rude and dismissive language in a conversation after matching.', date: '09 Sep 2026', status: 'In review', reporter: 'Sara Iqbal' },
      { ref: 'R-2284', id: 'imran',  name: 'Imran Sheikh',  reason: 'Inappropriate photo',            detail: 'A profile photo was reported as not meeting the community photo guidelines.', date: '07 Sep 2026', status: 'In review', reporter: 'Hafsa Mahmood' },
      { ref: 'R-2279', id: 'musa',   name: 'Musa Diallo',   reason: 'Suspected duplicate account',    detail: 'Reporter believes this profile duplicates another account with the same photos.', date: '05 Sep 2026', status: 'Open', reporter: 'Layla Haddad' },
      { ref: 'R-2271', id: 'tariq',  name: 'Tariq Nasser',  reason: 'Spam or promotion',              detail: 'Reporter received a message promoting an external service.', date: '02 Sep 2026', status: 'Resolved', reporter: 'Khadija Osman' },
      { ref: 'R-2264', id: 'zaid',   name: 'Zaid Hussain',  reason: 'Harassment in chat',             detail: 'Reporter describes repeated unwanted messages after asking to end the conversation.', date: '29 Aug 2026', status: 'Resolved', reporter: 'Ayesha Malik' }
    ],

    /* Admin-only lightweight records for people not in the mobile cast. */
    extraPeople: {
      omar:    { id: 'omar',    name: 'Omar Siddiqui', firstName: 'Omar', age: 32, gender: 'Man', location: 'Manchester, UK', photos: [PX.omar], sect: 'Sunni', prayer: 'Five times a day', nationality: 'Pakistani', ethnicity: 'South Asian', languages: ['English', 'Urdu'], education: 'Undergraduate degree', profession: 'Business Owner', maritalStatus: 'Never married', height: 175, bio: 'Runs a family wholesale business in Manchester. Straightforward, practising, and close to his parents.' },
      hamza:   { id: 'hamza',   name: 'Hamza Rashid', firstName: 'Hamza', age: 27, gender: 'Man', location: 'Leeds, UK', photos: [PX.hamza], sect: 'Sunni', prayer: 'Most prayers', nationality: 'British', ethnicity: 'South Asian', languages: ['English'], education: 'Undergraduate degree', profession: 'Marketing', maritalStatus: 'Never married', height: 180, bio: 'Marketing lead at a Leeds agency. Enjoys five-a-side and long drives.' },
      ibrahim: { id: 'ibrahim', name: 'Ibrahim Touré', firstName: 'Ibrahim', age: 31, gender: 'Man', location: 'London, UK', photos: [PX.ibrahim], sect: 'Sunni', prayer: 'Five times a day', nationality: 'Senegalese', ethnicity: 'West African', languages: ['English', 'French', 'Wolof'], education: 'Postgraduate degree', profession: 'Finance', maritalStatus: 'Never married', height: 183, bio: 'Works in corporate finance. Volunteers at a supplementary school on Saturdays.' },
      adam:    { id: 'adam',    name: 'Adam Cisse', firstName: 'Adam', age: 29, gender: 'Man', location: 'Birmingham, UK', photos: [PX.adam], sect: 'Sunni', prayer: 'Most prayers', nationality: 'British', ethnicity: 'West African', languages: ['English', 'French'], education: 'Postgraduate degree', profession: 'Solicitor', maritalStatus: 'Never married', height: 179, bio: 'Solicitor in Birmingham. Reads history, plays chess badly.' },
      bilal:   { id: 'bilal',   name: 'Bilal Ahmed', firstName: 'Bilal', age: 26, gender: 'Man', location: 'Bradford, UK', photos: [PX.bilal], sect: 'Sunni', prayer: 'Sometimes', nationality: 'British', ethnicity: 'South Asian', languages: ['English', 'Urdu'], education: 'Diploma / Vocational', profession: 'Business Owner', maritalStatus: 'Never married', height: 174, bio: 'Runs a car sales business in Bradford.' },
      tariq:   { id: 'tariq',   name: 'Tariq Nasser', firstName: 'Tariq', age: 34, gender: 'Man', location: 'London, UK', photos: [PX.tariq], sect: 'Sunni', prayer: 'Five times a day', nationality: 'Yemeni', ethnicity: 'Arab', languages: ['English', 'Arabic'], education: 'Postgraduate degree', profession: 'Lecturer', maritalStatus: 'Divorced', height: 177, bio: 'Lectures in engineering. Enjoys photography and long walks along the canal.' },
      musa:    { id: 'musa',    name: 'Musa Diallo', firstName: 'Musa', age: 28, gender: 'Man', location: 'Bristol, UK', photos: [PX.musa], sect: 'Sunni', prayer: 'Most prayers', nationality: 'British', ethnicity: 'West African', languages: ['English'], education: 'Undergraduate degree', profession: 'Designer', maritalStatus: 'Never married', height: 181, bio: 'Product designer in Bristol. Cycles everywhere, cooks for everyone.' },
      imran:   { id: 'imran',   name: 'Imran Sheikh', firstName: 'Imran', age: 33, gender: 'Man', location: 'Glasgow, UK', photos: [PX.imran], sect: 'Sunni', prayer: 'Most prayers', nationality: 'British', ethnicity: 'South Asian', languages: ['English', 'Urdu'], education: 'Undergraduate degree', profession: 'Accountant', maritalStatus: 'Never married', height: 172, bio: 'Chartered accountant in Glasgow.' },
      zaid:    { id: 'zaid',    name: 'Zaid Hussain', firstName: 'Zaid', age: 30, gender: 'Man', location: 'Luton, UK', photos: [PX.zaid], sect: 'Sunni', prayer: 'Sometimes', nationality: 'British', ethnicity: 'South Asian', languages: ['English', 'Urdu'], education: 'High school', profession: 'Civil Servant', maritalStatus: 'Never married', height: 176, bio: 'Works for the local council. Enjoys football and family weekends.' },
      ayesha:  { id: 'ayesha',  name: 'Ayesha Malik', firstName: 'Ayesha', age: 28, gender: 'Woman', location: 'London, UK', photos: [PX.ayesha], sect: 'Sunni', prayer: 'Most prayers', nationality: 'British', ethnicity: 'South Asian', languages: ['English', 'Urdu'], education: 'Undergraduate degree', profession: 'Accountant', maritalStatus: 'Never married', height: 162, bio: 'Accountant in central London. Weekend baker.' }
    }
  };

  function person(id) {
    return BY_ID[id] || ADMIN.extraPeople[id] || null;
  }

  global.DATA = {
    PX: PX, OPT: OPT, ME: ME, PEOPLE: PEOPLE, BY_ID: BY_ID,
    DISCOVERY_ORDER: DISCOVERY_ORDER,
    MATCHES: MATCHES, THREADS: THREADS, STARTERS: STARTERS,
    BUILDER_STEPS: BUILDER_STEPS,
    FILTER_GROUPS: FILTER_GROUPS, DEFAULT_FILTERS: DEFAULT_FILTERS,
    sections: sections, person: person,
    ADMIN: ADMIN
  };
})(window);
