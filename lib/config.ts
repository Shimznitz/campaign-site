// lib/config.ts
// ============================================================
// CAMPAIGN CONFIGURATION — Edit this file to change candidate
// details, colors, manifestos, gallery images, and contact info
// without touching any component code.
// ============================================================

export const CAMPAIGN = {
  candidate: {
    name: "Danjuma Usman Shiddi",
    title: "Gubernatorial Candidate",
    state: "Taraba State",
    party: "All Progressives Grand Alliance",
    partyShort: "APGA",
    quote: "Taraba needs leadership that turns promises into progress.",
    subQuote: "A new dawn for our people — built on integrity, vision, and action.",
    heroImage: "/images/Danjuma_Shiddi_1.jpg",
    profileImage: "/images/Danjuma_Shiddi_4.jpg",
    electionDate: "2027-02-06T00:00:00",
  },

  contact: {
    address: "12 Campaign House, , Taraba State, Nigeria",
    phone: "+234 801 234 5678",
    email: "info@danjissforgovernor.ng",
    whatsapp: "+2348012345678",
  },

  social: {
    twitter: "https://twitter.com/",
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
  },

  stats: [
    { label: "Supporters", value: 481200 },
    { label: "Communities Visited", value: 32 },
    { label: "Projects Delivered", value: 24 },
    { label: "Volunteers", value: 12400 },
  ],

  about: {
    bio: "Hon. Danjuma Usman Shiddi (Danji SS) is a distinguished security expert, former Department of State Services (DSS) Assistant Director, and two-term federal lawmaker who served as the Chairman of the House Committee on Internal Security. As the All Progressives Grand Alliance (APGA) governorship candidate for Taraba State, he leverages his extensive background in national intelligence and grassroots legislative leadership to champion local economic empowerment, security, and accountable governance.",
    whyRunning: `I am running because I believe that Governance must be anchored on honesty, compassion, and courage, stressing that leaders must be prepared to take difficult decisions in the interest of the people.

I have spent my career building hospitals, schools, and businesses. I know what it takes to get things done. Now I want to put that experience to work for every single person in this state. Not for a faction. For all of us.`,
   timeline: [
      {
        year: "1967",
        title: "Born in Wukari",
        description: "Born into the respected family of Usman Shiddi and Patu Adda.",
      },
      {
        year: "1986",
        title: "Science Education",
        description: "Completed secondary education at Government Science Secondary School, Bauchi.",
      },
      {
        year: "1994",
        title: "BUK Political Science",
        description: "Graduated with a Bachelor's Degree in Political Science from Bayero University, Kano.",
      },
      {
        year: "1996",
        title: "Enlistment into the DSS",
        description: "Joined the Department of State Services, rising through the ranks to retire as an Assistant Director.",
      },
      {
        year: "2015",
        title: "House of Representatives",
        description: "Elected to the 8th National Assembly representing Wukari/Ibi Federal Constituency under APGA.",
      },
      {
        year: "2019",
        title: "Re-election & Security Chair",
        description: "Re-elected to the 9th Assembly; appointed Chairman of the House Committee on Internal Security.",
      },
      {
        year: "2027",
        title: "Gubernatorial Candidate",
        description: "Affirmed as APGA Flagbearer to secure and economically transform all 16 LGAs of Taraba State.",
      },
    ], 
  },

  manifestos: [
    {
      id: "security",
      icon: "🛡️",
      title: "Security & Counter-Intelligence",
      summary: "Restoring absolute safety to Taraba communities and rural agrarian belts.",
      detail:
        "Leveraging intelligence-driven localized security architecture, establishing community border patrols, and utilizing drone surveillance networks to safely reclaim farming communities from regional threats.",
    },
    {
      id: "localcontent",
      icon: "💼",
      title: "Local Content Enforcement",
      summary: "Prioritizing Taraba indigenous contractors and home-grown industries.",
      detail:
        "Banning the foreign outsourcing of state contracts like school uniforms and basic tools. We will institutionalize a 70% indigenous procurement mandate to create sustainable local wealth.",
    },
    {
      id: "education",
      icon: "🎓",
      title: "Education & Technical Skills",
      summary: "Upgrading public learning centers and driving youth technical literacy.",
      detail:
        "Complete refurbishment of dilapidated local schools, introducing fully-funded vocational training programs in all 16 LGAs to tackle youth unemployment through high-demand manual and digital crafts.",
    },
    {
      id: "agriculture",
      icon: "🌿",
      title: "Agricultural Revolution",
      summary: "Transforming farming from basic survival into regional agro-wealth.",
      detail:
        "Establishing mechanical cluster hubs in every zone, securing food transport corridors, and setting up state-backed processing plants for yam, cassava, and tea across Taraba.",
    },
    {
      id: "healthcare",
      icon: "🏥",
      title: "Primary Healthcare Centers",
      summary: "Functional, stock-sufficient clinics accessible within every ward.",
      detail:
        "Equipping all rural primary health facilities with consistent pharmaceuticals, round-the-clock power alternatives, and hazard allowances to retain qualified rural healthcare personnel.",
    },
    {
      id: "infrastructure",
      icon: "🛣️",
      title: "Critical Transport Links",
      summary: "Connecting agricultural zones directly to major commercial markets.",
      detail:
        "Embarking on mass rural-to-urban feeder road rehabilitation across Taraba South, North, and Central zones to minimize post-harvest transit losses for local traders.",
    },
    {
      id: "youth",
      icon: "🌟",
      title: "Youth Development",
      summary: "Investing in the energy and talent of our young people.",
      detail:
        "100,000 youth jobs in three years through the Taraba Jobs Initiative. Sports academies in 10 LGAs. ₦500M youth enterprise grant scheme.",
    },
    {
      id: "women",
      icon: "💪",
      title: "Women Empowerment",
      summary: "Elevating women as equal partners in our state's progress.",
      detail:
        "40% women representation in all appointments. ₦5B Women Enterprise Fund. Free maternal healthcare. Crèche facilities in all government offices.",
    },
    {
      id: "employment",
      icon: "💼",
      title: "Employment",
      summary: "An economy that creates jobs for every qualified Tarabian.",
      detail:
        "SME incubator in every LGA. Export processing zones. Civil service reform to hire 15,000 graduates.",
    },
  ],

  gallery: [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
      alt: "Community stakeholders meeting in Jalingo",
      category: "Townhall",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80",
      alt: "Consultations with grassroots community leaders",
      category: "Grassroots",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      alt: "APGA flagbearer affirmation campaign rally",
      category: "Rally",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=600&q=80",
      alt: "Youth engagement forum",
      category: "Youth",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1559024094-4a1e4495c3c1?w=800&q=80",
      alt: "Development project inspection",
      category: "Development",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80",
      alt: "Leadership summit",
      category: "Meetings",
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
      alt: "Community health outreach",
      category: "Community",
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80",
      alt: "Education summit",
      category: "Education",
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=600&q=80",
      alt: "Grassroots campaign",
      category: "Campaign",
    },
  ],

    news: [
    {
      id: 1,
      date: "2026-05-28",
      category: "Announcement",
      title: "APGA Affirms Danjuma Shiddi as Consensus Taraba Governorship Candidate",
      excerpt:
        "During a highly attended primary election and candidate confirmation exercise held in Jalingo, the All Progressives Grand Alliance officially affirmed Hon. Danjuma Umaru Shiddi as its flagbearer for the 2027 polls.",
    },
    {
      id: 2,
      date: "2026-05-24",
      category: "Press Release",
      title: "Shiddi Outlines 'Rescue Taraba' Agenda to Address Insecurity and Neglect",
      excerpt:
        "Addressing journalists in Jalingo, the former federal lawmaker explained that his motivation to seek the governorship is rooted in a profound desire to rescue Taraba State from economic stagnation, youth joblessness, and infrastructure decay.",
    },
    {
      id: 3,
      date: "2026-05-23",
      category: "Campaign",
      title: "Massive Turnout in Jalingo as 'Danji SS' Formally Launches Campaign Movement",
      excerpt:
        "Thousands of enthusiastic supporters, women's groups, and youth mobilization groups turned out in large numbers to welcome Hon. Shiddi to the state capital as he officially arrived to unveil his grassroots political movement.",
    },
    {
      id: 4,
      date: "2026-05-09",
      category: "Event",
      title: "Shiddi Challenges Leaders on Competence over Ethnic and Religious Sentiments",
      excerpt:
        "In a major stakeholder address, Shiddi maintained that the 2027 election must not be decided by divisive rhetoric, urging Tarabans to evaluate candidates based strictly on character, compassion, and measurable capacity.",
    },
    {
      id: 5,
      date: "2026-03-30",
      category: "Endorsement",
      title: "Grassroots Political Coalitions Align Behind Shiddi's Reform Manifesto",
      excerpt:
        "Prominent political advocates and community groups across Taraba South and Central zones formally declared their alignment with the APGA platform, citing Shiddi's historical legislative track record as a model for honest governance.",
    },
  ],

  testimonials: [
    {
      name: "Mrs. Comfort Asabe Audu",
      role: "Fashion Designer & SME Coordinator, Jalingo",
      quote:
        "I completely stand by Danji SS because of his strong stance on local content. When he spoke out against importing basic things like school uniforms from abroad, it resonated with thousands of tailors and artisans across Taraba. He values indigenous labor and knows that keeping contracts local is the only way to tackle youth unemployment in our state.",
    },
    {
      name: "Dr. Amina Bello Yusuf",
      role: "Retired Civil Servant & Community Health Advocate, Bali LGA",
      quote:
        "Taraba State needs structural governance that is anchored on honesty, compassion, and courage. Hon. Shiddi has consistently proved to be a unifying figure who listens to the needs of civil servants and rural dwellers alike. He brings the exact type of stable, experienced leadership required to revive our primary healthcare centers and civil service.",
    },
    {
      name: "Comrade Emmanuel T. Rimamnde",
      role: "Youth Mobilizer & Independent Contractor, Wukari LGA",
      quote:
        "We have seen what he did during his two terms in the National Assembly. From upgrading rural infrastructure to sponsoring impactful youth empowerment schemes, his track record speaks for itself. He doesn’t just make promises; he turns them into actual progress that everyday people can see and feel.",
    },
    {
      name: "Mallam Ibrahim Abubakar",
      role: "Rice Farmer & Community Leader, Ibi LGA",
      quote:
        "As farmers, security is our biggest prayer. When Hon. Shiddi was the Chairman of the House Committee on Internal Security, he constantly pushed for better protection for our agrarian belts. He is not a politician who stays far away in Abuja; he understands our security challenges firsthand and has the professional tactical background needed to fix them.",
    },
  ],
};