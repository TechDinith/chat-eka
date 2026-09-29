export interface PageSection {
  heading: string;
  headingEn?: string;
  body: string[];
  bodyEn?: string[];
}

export interface PageContent {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  h1En: string;
  intro: string;
  introEn: string;
  sections: PageSection[];
  updated: string;
}

const S = "https://chat-eka.vercel.app";

export const pages: Record<string, PageContent> = {
  about: {
    slug: "about",
    seoTitle: "About Chat Eka - චැට් එක | Free Sinhala Chatroom",
    seoDescription:
      "About Chat Eka (චැට් එක) - a free Sinhala chatroom. Learn how lanka chat online works, who it is for, and how to start talking with Sinhala people in seconds.",
    h1: "Chat Eka ගැන",
    h1En: "About Chat Eka",
    intro:
      "Chat Eka (චැට් එක) යනු නොමිලේ භාවිත කළ හැකි සිංහල කතාබහ වෙබ් අඩවියකි. ලංකාවේ සහ ලංකාවෙන් පිටත ජීවත් සිංහල මිතුරන් සමඟ ක්ෂණිකව කතාබහ කිරීම මෙයට අපගේ අරමුණයයි.",
    introEn:
      "Chat Eka is a free, real-time Sinhala chatroom. It exists so that Sinhala-speaking people in Sri Lanka and around the world can simply sit down and talk — no fees, no downloads, no phone number required.",
    sections: [
      {
        heading: "චැට් එක කුමක්ද?",
        headingEn: "What is Chat Eka?",
        body: [
          "Chat Eka යනු බ්‍රවුසරයෙන්ම ක්‍රියා කරන, නොමිලේ භාවිත කළ හැකි පොදු කතාබහ කාමරයකි. ඔබ දුරකථනය, ටැබ්, නැතිනම් පරිගණකය කිසිවක් බාගෙන යන්නත් නැත. ලංකාවේ සිංහල කතාබහ කරන්න අවශ්‍ය නිසා මෙය chat srilanka සහ lanka chat online වාක්‍ය ක්‍රමයෙන් පමණක් පමණයි.",
        ],
        bodyEn: [
          "Chat Eka is a public chat room that runs entirely in your browser. You do not need to download an app, create a complicated account, or verify a phone number. To chat in Sinhala — sinhala chat, lanka chat online, sri lanka chat — all you need is a browser and a username.",
        ],
      },
      {
        heading: "පිවිසීම කොහොමද?",
        headingEn: "How do I join?",
        body: [
          "පිවිසීම ඉතා සරලයි. ඔබට අවශ්‍ය වන්නේ ඔබගේ කැමති username එකක් සහ NIC අංකයක් පමණයි. ඔබ පිවිසීමෙන් පසු ඔබගේ නම, වයස සහ ලිංගභාහය කතාබහ කාමරයේ පෙන්වනු ලඐබේ — ඒක ඔබව සිංහල මිතුරන්ගෙන් වඩාත්ම අදාළ කරන බව තේරුම් ගැනීමට ය.",
        ],
        bodyEn: [
          "Joining takes seconds. All you need is a username of your choice and your NIC number. Once you are in, your name, age, and gender appear in the chat room so that Sinhala speakers can recognise you as one of their own. There is no password to remember and no email address required.",
        ],
      },
      {
        heading: "මුලින්ම ඔබට ලැබෙන දේ",
        headingEn: "What you get first",
        body: [
          "ඔබට ලැබෙන්නේ පොදු chat කාමරයක්, සෘජු පුද්ගලික පණිවිඩ යැපුවම සහ එකවර සම්බන්ධ වන සම්පූර්ණ කතාබහ ඉතිහාසයකි. Chat Eka හි sri lanka friends chat online free ලෙස ප්‍රචාරය ලැබෙන්නේ නැත.",
        ],
        bodyEn: [
          "You get a public chat room, one-to-one private messages, and complete chat history in one place. Chat Eka is free — there is no paid tier, no premium wall, and nothing to unlock. It is a genuine sri lanka friends chat online free service.",
        ],
      },
    ],
    updated: "2026-09-29",
  },

  "community-guidelines": {
    slug: "community-guidelines",
    seoTitle: "Community Guidelines - Chat Eka | ප්‍රජා මාර්ගෝපදේශ",
    seoDescription:
      "Community guidelines for Chat Eka (චැට් එක): the rules that keep this Sinhala chat room friendly, respectful, and safe for everyone.",
    h1: "ප්‍රජා මාර්ගෝපදේශ",
    h1En: "Community Guidelines",
    intro:
      "Chat Eka යනු මුලින්ම ආචාර බහකින් ගණනගනින ලද ඉඩකි. පහත මාර්ගෝපදේශ අපේ සියලු කතාබහ කාමර තුළ අදාළ වේ — sinhala chat, lanka chat online, ඕනෑම කාමරයක.",
    introEn:
      "Chat Eka is a chat room built on respect first. The rules below apply to every room on the site, whether you arrived from a Sinhala chat search or from lanka chat online.",
    sections: [
      {
        heading: "අපි අපේම මිතුරන්",
        headingEn: "Treat everyone as your own",
        body: [
          "ඔබ ඉදිරියේ ඉන්නේ සිංහල මිතුරන්ය. ඔබ කතා කරන්නේ ඔබගේ පවුලේ අයගේ මෙන්ම ගෞරවයෙන් ය. ඔබගේ ලොකු භාහය, වයස, ලිංගභාහය හෝ රටය නිසා කිසිවෙකුගේම අපේ ගෞරවය කඩකරන්න එපා.",
        ],
        bodyEn: [
          "The person on the other side of the screen is a Sinhala speaker, exactly like you. Speak to them the way you would speak to your own family. Never use someone's age, gender, appearance, or nationality as a reason to mock them — chat eka only works when everyone feels welcome.",
        ],
      },
      {
        heading: "නුන්ගත කිරීම නෙමින්ම",
        headingEn: "No harassment, ever",
        body: [
          "ආකෘතිය සුදු කිරීම, බර කරගැනීම, ලිංගවත්තභාහය, ආගන්තුව හෝ ඕනෑම ආකෘතියක අපේ නීති කඩකරන කාලීන නොකරම තිබිය යුතුය. කාලීන කිරීම් (flooding) ද නොපිළිගනී.",
        ],
        bodyEn: [
          "No insults, no flooding the room, no sexual content, no harassment, and no threats. This applies to the public room and to private messages alike. Moderators remove users who break these rules, and removals can be permanent.",
        ],
      },
      {
        heading: "ඔබේ පුද්ගලික තොරතුරු බෙන නොගන්න",
        headingEn: "Do not share sensitive personal details",
        body: [
          "ඔබගේ දුරකථන අංකය, ලිපිනය, ගෙදර ඉඩ, මුදල් තොරතුරු, passport හෝ bank තොරතුරු කවදාවත් කතාබහ කාමරයේ නොදායම්න. මතක තබාගන්න: ඔබ chat එකට කලින් අනුන්ගේ ගෙදර පුද්ගලයෙකු බව ඔබට විශ්වාස කරන්න බැහැ.",
        ],
        bodyEn: [
          "Never post your phone number, home address, bank details, passwords, or identity documents. Remind your friends about this too. Anyone can type anything into a chat room, so treat every unknown name with the same caution you would use on any public website.",
        ],
      },
    ],
    updated: "2026-09-29",
  },

  "safety-guide": {
    slug: "safety-guide",
    seoTitle: "Safety Guide - Chat Eka | ආරක්ෂාව ගැන මාර්ගෝපදේශය",
    seoDescription:
      "How to stay safe on Chat Eka and other Sinhala chat rooms: protect your privacy, spot scams, and keep sri lanka online chat fun and secure.",
    h1: "ආරක්ෂාව ගැන මාර්ගෝපදේශය",
    h1En: "Safety Guide",
    intro:
      "නොමිලේ සිංහල කතාබහ කිරීම හොඳක්ය. නමුත් ඕනෑම පොදු අන්තර්ජාල කතාබහයකදී ඔබේ ආරක්ෂාව ඔබගේම වගකීමකි. මෙම මාර්ගෝපදේශය chat eka හි සහ වෙනත් sinhala chat rooms වලදී අදාළ වේ.",
    introEn:
      "Free Sinhala chat is a good thing, but you are responsible for your own safety on any public chat service. This guide applies to Chat Eka and to any lanka chat online room you visit.",
    sections: [
      {
        heading: "ඔබේ NIC ගැන",
        headingEn: "About your NIC number",
        body: [
          "Chat Eka හි ඔබගේ NIC අංකය ඔබගේ වයස සහ ලිංගභාහය ගණනගැනීමට පමණක් භාවිත කරයි. එය ඔබගේ ලිපිනයක් ලෙස ගබඩා කරනු ලැබේ නැත. ඔබගේ NIC අංකය කවදාවත් කරන්නා කෙනෙකුට පණිවිඩ කරන්න එපා.",
        ],
        bodyEn: [
          "On Chat Eka your NIC is used only to work out your age and gender, so that Sinhala speakers can see who they are talking to. It is never stored as an address. Do not send your NIC number to any other user — a real moderator will never ask for it.",
        ],
      },
      {
        heading: "බොරු දැයි හඳුනාගැනීම",
        headingEn: "Spotting a scam",
        body: [
          "ඔබේ මුදල් ඉල්ලීමක්, ඔබේ photos ඉල්ලීමක් හෝ ඔබේ ගෙදර එන්න ආරාධනා කිරීමක් ඉල්ලන සියලු අයට පිළිතුරු නොදෙන්න. නොමිලේ සේවාවක් කියා ගන්නා ලද කාමරයක ඔබගේ මුදල් ගැන කතා කරන්නට නොයුතුය.",
        ],
        bodyEn: [
          "Be suspicious of anyone who asks for money, asks you to send photos, or asks for your home address. A genuine free chat room has no reason to discuss your money. A simple rule: if someone asks you to move the conversation to another app and send something personal, leave the room.",
        ],
      },
      {
        heading: "ඔබ පුද්ගලයෙකු සමඟ තවදුරටත් නොයන බව තහවුරු කරන්න",
        headingEn: "Never meet someone offline on your own",
        body: [
          "ඔබ අන්තර්ජාලයෙන් දන්නා අය එකිනෙකට නොදන්නා අයයි. ඔබ ඔබේ පවුලේ අය දන්නා ස්ථානයක, පොදු ස්ථානයක, ඔබගේම නිවසේ ආරක්ෂාව තිබිම පමණක් යන්න. පළමු හමුවට බැරි තැනකදී යන්න.",
        ],
        bodyEn: [
          "People you meet online are strangers. If you ever meet offline, go to a public place, bring a friend, tell someone where you are, and never go to a private home. If anyone pressures you to meet alone, that is a reason to stop talking to them.",
        ],
      },
    ],
    updated: "2026-09-29",
  },

  help: {
    slug: "help",
    seoTitle: "Help & FAQ - Chat Eka | උදව්ව සහ ප්‍රශ්න",
    seoDescription:
      "Help and frequently asked questions for Chat Eka (චැට් එක): how to log in with your NIC, find the chat room, and use private messages in this free Sinhala chat service.",
    h1: "උදව්ව සහ ප්‍රශ්න",
    h1En: "Help & FAQ",
    intro:
      "Chat Eka (චැට් එක) භාවිතයේ ඉතා සරලයි. පහත ප්‍රශ්නවලට පිළිතුරු නොමැතිනම් කතාබහ කාමරයට පිවිසීමෙන් අදාළ කරුණු අයගෙන් ප්‍රශ්න අහන්න.",
    introEn:
      "Using Chat Eka is simple. Here are the questions people ask most often about this free Sinhala chat service.",
    sections: [
      {
        heading: "පිවිසීමට NIC අංකයක් අවශ්‍යද?",
        headingEn: "Do I need a NIC number to log in?",
        body: [
          "ඔව්. ඔබගේ වයස සහ ලිංගභාහය කතාබහ කාමරයේ පෙන්වීමට අපට එය අවශ්‍ය ය. ඔබගේ NIC අංකය ඔබගේ නම සමඟ යා වුණු ලද අය ඔබව වඩා හොඳින් දන්නා ලෙස කිරීමටය.",
        ],
        bodyEn: [
          "Yes. Your NIC is how we work out your age and gender so they can be shown next to your name in the chat room. It helps Sinhala speakers recognise you as one of their own. It is not stored as an address or shared with anyone.",
        ],
      },
      {
        heading: "මගේ ලිපිනය ගැන ඔබට මොකක්ද දැනගන්නේ?",
        headingEn: "What happens to my home address?",
        body: [
          "කිසිවක්. Chat Eka NIC අංකයෙන් අඩු කොටසක් පමණක් ලබාගනී. ඔබගේ ලිපිනය ඔබගේ දුරකථනය, email හෝ වෙනත් කිසිවක් කරන්නේ නැත.",
        ],
        bodyEn: [
          "Nothing. Chat Eka reads only a small part of the NIC to work out the birth year and gender. We never ask for, store, or derive your home address, your phone number, or your email.",
        ],
      },
      {
        heading: "පුද්ගලික පණිවිඩ කොහොමද?",
        headingEn: "How do private messages work?",
        body: [
          "කතාබහ කාමරයේ ඉන්න පුද්ගලයෙකුගේ නම මත ක්ලික් කරන්න. එතකොට ඔබට එම පුද්ගලයා සමඟ පමණක් දකින කතාබහයක් ලැබේ. මෙය ඔබගේ chat eka කතාබහ ඉතිහාසයේ කොටසකි.",
        ],
        bodyEn: [
          "Click the name of anyone in the chat room and you can start a private conversation with just that person. It appears in your sidebar and stays separate from the public room.",
        ],
      },
      {
        heading: "කොමක් හෝ සේවාවක් නොමිලේද?",
        headingEn: "Is anything really free?",
        body: [
          "ඔව්. සියල්ලම නොමිලේ ය. ගෙවීම් මට්ටමක් නොමැත, සීමා කිරීම් නොමැත. අපි ඔබේ දත්ත විකුණන්නේ නැත.",
        ],
        bodyEn: [
          "Yes. Everything is free — there is no paid tier, no premium unlock, and no limits on how many messages you send. We do not sell your data.",
        ],
      },
    ],
    updated: "2026-09-29",
  },

  privacy: {
    slug: "privacy",
    seoTitle: "Privacy Policy - Chat Eka | රහස්‍යභාහය පිළිබඳ ප්‍රතිපතිතිය",
    seoDescription:
      "Privacy Policy for Chat Eka (චැට් එක). What data a free Sinhala chatroom collects, how your NIC is used, and how chat eka keeps your information safe.",
    h1: "රහස්‍යභාහය පිළිබඳ ප්‍රතිපතිතිය",
    h1En: "Privacy Policy",
    intro:
      "මෙම ප්‍රතිපතිතිය Chat Eka (චැට් එක) ඔබගේ රහස්‍යභාහයට අදාළ කරයි. අපි ඔබගේ නිර්නාමය අවංකව සන්දා කරමු.",
    introEn:
      "This policy explains what happens to your information when you use Chat Eka. We have tried to keep it short and honest.",
    sections: [
      {
        heading: "අපුරුදු වන තොරතුරු",
        headingEn: "What we collect",
        body: [
          "ඔබගේ username එක, NIC අංකයෙන් ගණනගත කරන ලද වයස සහ ලිංගභාහය, ඔබ කතාබහ කාමරයේ ලියන පණිවිඩ, සහ පණිවිඩ යවන කාලය. අපුරුදු නොකරන දේ: ඔබගේ නම, ලිපිනය, දුරකථන අංකය හෝ email.",
        ],
        bodyEn: [
          "Your chosen username, the age and gender derived from your NIC, the messages you send in the chat room, and the time each message was sent. We do not collect your real name, home address, phone number, or email address.",
        ],
      },
      {
        heading: "ඔබගේ NIC අංකය භාවිතය",
        headingEn: "How your NIC is used",
        body: [
          "අපි ඔබගේ NIC අංකයෙන් අඩුකම කිහිපයක් පමණක් ගනී: උපන් වර්ෂය සහ ලිංගභාහය. එයයි සම්පූර්ණයි. ඔබගේ ලිපිනය, ප්‍රදේශය හෝ වෙනත් කිසිවක් අපි කවදාවත් ගණනගනා නොගනී.",
        ],
        bodyEn: [
          "We read only two things from your NIC: your year of birth and your gender. That is all. Your home address, district, or any other detail is never derived or stored, and the full NIC number is never shared with another user.",
        ],
      },
      {
        heading: "දත්ත බෙදාගැනීම",
        headingEn: "Data sharing and retention",
        body: [
          "අපි ඔබගේ දත්ත කිසිවෙකුට විකුණන්නේ නැත සහ ප්‍රකාශය කරන්නේ නැත. ඔබ ඉවත්වන විට ඔබගේ ගිණුම කතාබහ කාමරයෙන් ඉවත් කරනු ලැබේ.",
        ],
        bodyEn: [
          "We do not sell, rent, or share your data with advertisers or third parties. When you log out, your presence is removed from the active user list immediately. Public chat messages remain part of the room history by design.",
        ],
      },
    ],
    updated: "2026-09-29",
  },

  terms: {
    slug: "terms",
    seoTitle: "Terms of Use - Chat Eka | භාවිත නියම",
    seoDescription:
      "Terms of Use for Chat Eka (චැට් එක), the free Sinhala chatroom. Understand the rules of this lanka chat online service before you start chatting.",
    h1: "භාවිත නියම",
    h1En: "Terms of Use",
    intro:
      "Chat Eka (චැට් එක) භාවිතය ඇතුළත් කිරීමෙන් පෙර මෙම නියම කියවන්න. ඒවාට පිළිගැනීම මගින් ඔබ මෙම නියමවලට යොමු වන බව තහවුරු කරයි.",
    introEn:
      "Please read these terms before you use Chat Eka. By joining the chat room you agree to them.",
    sections: [
      {
        heading: "භාවිතය පිළිගැනීම",
        headingEn: "Acceptance of use",
        body: [
          "ඔබ පිවිසීමෙන් මෙම නියම සහ ප්‍රජා මාර්ගෝපදේශ පිළිගනී. Chat Eka යනු විනෝදාත්මක සේවාවකි — එබඟින් අපි කිසිදු වගකීමක් ඇති බව ඔබට පැහැදිලි කරනු ඇත.",
        ],
        bodyEn: [
          "By joining you accept these terms and the community guidelines. Chat Eka is provided as-is and free of charge. We cannot be held responsible for the content, conduct, or relationships of other users.",
        ],
      },
      {
        heading: "ඔබගේ වගකීම",
        headingEn: "Your responsibilities",
        body: [
          "ඔබගේ නම සමඟ යන කාලීන කරන ඕනෑම දෙයක් ඔබගේම වගකීමකි. ඔබගේ දරුවන් නොමැති වයස කරන්නේ නම් ඔබගේ පවුලේ අයගේ අනුමැතිය ලබාගන්න.",
        ],
        bodyEn: [
          "Whatever you post under your name is your responsibility. You must be old enough to use a public chat service, and if you are a minor, please use Chat Eka with a parent's knowledge and permission.",
        ],
      },
      {
        heading: "නිර්නාමය",
        headingEn: "Termination",
        body: [
          "නියම කඩකරන පරිදි කතාබහ කරන පරිශීලකයෙකුට අපි ඕනෑම මොහොතක පිවිසුම ප්‍රතික්ෂේප කළ හැකිය.",
        ],
        bodyEn: [
          "We may remove or block any user who breaks these terms, at any time and without prior notice. No refund or compensation is available because the service is free.",
        ],
      },
    ],
    updated: "2026-09-29",
  },
};

export const PAGE_ORDER = [
  { slug: "about", label: "ගැන", labelEn: "About" },
  { slug: "help", label: "උදව්ව", labelEn: "Help" },
  { slug: "community-guidelines", label: "මාර්ගෝපදේශ", labelEn: "Guidelines" },
  { slug: "safety-guide", label: "ආරක්ෂාව", labelEn: "Safety" },
  { slug: "privacy", label: "රහස්‍යභාහය", labelEn: "Privacy" },
  { slug: "terms", label: "නියම", labelEn: "Terms" },
];

export const SITE_URL = S;
