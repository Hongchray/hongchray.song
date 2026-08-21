export type Locale = "en" | "km";
export type Bi = { en: string; km: string };

export const personal = {
  name: "Hongchray Song",
  nameKm: "សុង ហុងច្រាយ",
  initials: "Hongchray",
  email: "songhongchray@gmail.com",
  phone: "+855 97 616 89 88",
  address: {
    en: "#105C, St. 109, Kbal Damrey Village, Sangkat Kakab 2, Khan Pou Senchey, Phnom Penh, Cambodia",
    km: "ផ្ទះលេខ ១០៥C ផ្លូវ ១០៩ ភូមិក្បាលដំរី សង្កាត់កាកាប ២ ខណ្ឌពោធិ៍សែនជ័យ រាជធានីភ្នំពេញ ប្រទេសកម្ពុជា",
  } satisfies Bi,
  social: {
    github: "https://github.com/Hongchray",
    linkedin: "https://www.linkedin.com/in/songhongchray",
    facebook: "https://facebook.com/chrayyyyyy.dev",  
    telegram: "https://t.me/hongchrayyyyyyy",

  },
};

export const profile: Bi = {
  en: "Motivated Web Developer with over 2 years of experience building modern, scalable web applications using Laravel, Vue.js, and Next.js. Skilled in both frontend and backend development, including RESTful API design, database management, and responsive UI development. Committed to writing clean, maintainable code and delivering high-performance, user-focused digital solutions.",
  km: "អ្នកអភិវឌ្ឍន៍គេហទំព័រ ដែលមានការតាំងចិត្តប្តេជ្ញាចិត្តខ្ពស់ មានបទពិសោធន៍ជាង ២ ឆ្នាំក្នុងការអភិវឌ្ឍគេហទំព័របាន ដោយប្រើប្រាស់ Laravel, Vue.js និង Next.js។ មានជំនាញទាំងផ្នែក Frontend និង Backend រួមទាំងការរចនា RESTful API ការគ្រប់គ្រងមូលដ្ឋានទិន្នន័យ និងការអភិវឌ្ឍចំណុចប្រទាក់អ្នកប្រើប្រាស់ដែលឆ្លើយតបបានគ្រប់ទំហំអេក្រង់។ មានតាំងចិត្តសរសេរកូដអោយបានស្អាត ងាយស្រួលថែទាំ និងផ្ដល់នូវដំណោះស្រាយឌីជីថលដែលមានប្រសិទ្ធិភាពខ្ពស់ និងផ្ដោតលើអ្នកប្រើប្រាស់។",
};

export type ExperienceItem = {
  company: string;
  role: Bi;
  location: string;
  period: string;
  current?: boolean;
  hash: string;
  bullets: Bi[];
};

export const experience: ExperienceItem[] = [
  {
    company: "NEXORA",
    role: { en: "Web Developer", km: "អ្នកអភិវឌ្ឍន៍គេហទំព័រ" },
    location: "Phnom Penh",
    period: "2026 — Present",
    current: true,
    hash: "9f3a2c1",
    bullets: [
      {
        en: "Developed responsive and user-friendly web interfaces using Vue.js, HTML5, CSS3, and JavaScript.",
        km: "បានអភិវឌ្ឍចំណុចប្រទាក់គេហទំព័រដែលងាយស្រួលប្រើ និងឆ្លើយតបគ្រប់ទំហំអេក្រង់ ដោយប្រើប្រាស់ Vue.js, HTML5, CSS3 និង JavaScript។",
      },
      {
        en: "Developed and maintained full-stack web applications using PHP (Laravel).",
        km: "បានអភិវឌ្ឍ និងថែទាំកម្មវិធី Full-Stack ដោយប្រើ PHP (Laravel)។",
      },
      {
        en: "Designed, implemented, and maintained relational databases using MySQL.",
        km: "បានរចនា អនុវត្ត និងថែទាំមូលដ្ឋានទិន្នន័យប្រភេទ Relational ដោយប្រើ MySQL។",
      },
    ],
  },
  {
    company: "FOCUZ SOLUTION",
    role: { en: "Web Developer", km: "អ្នកអភិវឌ្ឍន៍គេហទំព័រ" },
    location: "Phnom Penh",
    period: "2024 — 2026",
    hash: "6b8e714",
    bullets: [
      {
        en: "Developed responsive and user-friendly web interfaces using JavaScript, TypeScript, Vue.js, Next.js, HTML5, CSS3, and Tailwind CSS.",
        km: "បានអភិវឌ្ឍចំណុចប្រទាក់គេហទំព័រដែលងាយស្រួលប្រើ និងឆ្លើយតបគ្រប់ទំហំអេក្រង់ ដោយប្រើប្រាស់ JavaScript, TypeScript, Vue.js, Next.js, HTML5, CSS3 និង Tailwind CSS។",
      },
      {
        en: "Developed and maintained full-stack web applications using PHP (Laravel).",
        km: "បានអភិវឌ្ឍ និងថែទាំកម្មវិធី Full-Stack ដោយប្រើ PHP (Laravel)។",
      },
      {
        en: "Designed, implemented, and maintained relational databases using MySQL and PostgreSQL.",
        km: "បានរចនា អនុវត្ត និងថែទាំមូលដ្ឋានទិន្នន័យប្រភេទ Relational ដោយប្រើ MySQL និង PostgreSQL។",
      },
    ],
  },
  {
    company: "INDOFOOD INDUSTRY CAMBODIA",
    role: { en: "Marketing Surveyor", km: "អ្នកស្ទង់មតិទីផ្សារ" },
    location: "Phnom Penh",
    period: "2023 — 2024",
    hash: "1a4d902",
    bullets: [
      {
        en: "Conducted face-to-face interviews to collect product and market feedback.",
        km: "បានធ្វើការសម្ភាសន៍ផ្ទាល់មុខដើម្បីប្រមូលមតិកែលម្អអំពីផលិតផល និងទីផ្សារ។",
      },
      {
        en: "Ensured data confidentiality and reliability.",
        km: "បានធានានូវការរក្សាការសម្ងាត់ និងភាពជឿជាក់នៃទិន្នន័យ។",
      },
    ],
  },
];

export type EducationItem = {
  degree: Bi;
  school: Bi;
  period: string;
};

export const education: EducationItem[] = [
  {
    degree: { en: "Bachelor of Software Development", km: "បរិញ្ញាបត្រផ្នែកអភិវឌ្ឍន៍កម្មវិធី" },
    school: { en: "Norton University, Phnom Penh", km: "សាកលវិទ្យាល័យន័រតុន ភ្នំពេញ" },
    period: "2021 — 2025",
  },
  {
    degree: { en: "Bachelor of English", km: "បរិញ្ញាបត្រផ្នែកភាសាអង់គ្លេស" },
    school: { en: "National University of Management, Phnom Penh", km: "សាកលវិទ្យាល័យជាតិគ្រប់គ្រង ភ្នំពេញ" },
    period: "2021 — 2025",
  },
];

export const languages = [
  { name: { en: "Khmer", km: "ភាសាខ្មែរ" }, level: { en: "Native", km: "ភាសាកំណើត" } },
  {
    name: { en: "English", km: "ភាសាអង់គ្លេស" },
    level: { en: "Excellent — reading, writing, speaking & listening", km: "កម្រិតល្អ — អាន សរសេរ និយាយ និងស្ដាប់" },
  },
];

export const softSkills: Bi[] = [
  { en: "Problem-solving", km: "ជំនាញដោះស្រាយបញ្ហា" },
  { en: "Communication / Teamwork", km: "ជំនាញទំនាក់ទំនង / ការធ្វើការជាក្រុម" },
  { en: "Adaptability", km: "ភាពអាចបត់បែន និងសម្របខ្លួនបាន" },
  { en: "Eagerness to learn", km: "ចំណង់ខ្ពស់ក្នុងការរៀនសូត្របន្ថែម" },
];

export const skillGroups = [
  { key: "frontend", items: ["Vue.js", "Next.js", "React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"] },
  { key: "backend", items: ["PHP", "Laravel", "RESTful API"] },
  { key: "database", items: ["MySQL", "PostgreSQL"] },
  { key: "tools", items: ["Git", "GitHub", "VS Code", "Postman", "Figma"] },
];

export const reference = {
  name: "Mr. Luch Seangeng",
  role: { en: "Overseas Representative, Indofood", km: "តំណាងអន្តរជាតិ ក្រុមហ៊ុន Indofood" },
  phone: "+855 12 490 458",
};

export type ProjectStatus =
  | "live"
  | "completed"
  | "in-progress"
  | "private"
  | "coming-soon"

export type Project = {
  name: string;
  description: {
    en: string;
    km: string;
  };
  tags: string[];
  lang: string;
  langColor: string;
  url?: string;
  type_url?: {
    en: string;
    km: string;
  }
  github?: string;
  status: ProjectStatus;
};

export const projects: Project[] = [
  {
    name: "PlayOn! (TrueMoney App)",
    description: {
      en: "A digital gaming store feature integrated into the TrueMoney Wallet app, allowing users to purchase game credits and top-up packages directly from their wallet balance.",
      km: "មុខងារហាងលក់ពេជ្រ និងកញ្ចប់អុិនហ្គេម ដែលត្រូវបានបញ្ចូលក្នុងកម្មវិធី TrueMoney Wallet អនុញ្ញាតឱ្យអ្នកប្រើប្រាស់អាចទិញពេជ្រ និងកញ្ចប់ហ្គេមបានយ៉ាងងាយស្រួលតាមរយៈសមតុល្យក្នុងគណនីរបស់ពួកគេ។",
    },
    tags: ["Next.js", "TypeScript", "PostgreSQL", "JSBridge", "Tailwind CSS"],
    lang: "Next.js",
    langColor: "#000000",
    url: "https://www.truemoney.com.kh/wallet/playon/",
    status: "live",
    type_url: {
      en: "About PlayOn! (TrueMoney App)",
      km: "អំពី PlayOn! (កម្មវិធី TrueMoney)"
    }
  },

  {
    name: "Plan Essential",
    description: {
      en: "Plan Essential is an event planning app for organizing weddings, parties, and events, with guest, invitation, gift, and expense management.",
      km: "Plan Essential គឺជាកម្មវិធីរៀបចំផែនការព្រឹត្តិការណ៍ សម្រាប់រៀបចំពិធីមង្គលការ ពិធីជប់លៀង និងព្រឹត្តិការណ៍នានា ដែលរួមមានមុខងារគ្រប់គ្រងបញ្ជីភ្ញៀវ សំបុត្រអញ្ជើញ អំណោយ និងការចំណាយ។",
    },
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    lang: "Next.js",
    langColor: "#000000",
    url: "https://planessential.com/",
    type_url: {
      en: "View Plan Essential",
      km: "ចូលមើល Plan Essential"
    },
    status: "live",
  },

  {
    name: "ECO MALL 24",
    description: {
      en: "An online construction materials marketplace for browsing products, filtering by categories, managing a shopping cart, placing orders, and tracking purchases.",
      km: "ទីផ្សារសម្ភារៈសំណង់តាមអនឡាញ ដែលអនុញ្ញាតឱ្យអ្នកប្រើប្រាស់ស្វែងរកផលិតផល ច្រោះតាមប្រភេទ គ្រប់គ្រងកន្ត្រកទំនិញ បញ្ជាទិញ និងតាមដានស្ថានភាពការបញ្ជាទិញបាន។",
    },
    tags: ["Laravel", "Blade", "MySQL", "Bootstrap", "JavaScript"],
    lang: "Laravel",
    langColor: "#ff2d20",
    type_url: {
      en: "View ECO MALL 24",
      km: "ចូលមើល ECO MALL 24"
    },
    url: "https://www.ecomall24.com/",
    status: "live",
  },
  
  {
    name: "Betta More Limited (Admin Portal)",
    description: {
      en: "An e-commerce management platform for selling and managing products such as rice, beverages, and other consumer goods.",
      km: "ប្រព័ន្ធគ្រប់គ្រងហាងលក់ទំនិញតាមអនឡាញ សម្រាប់លក់ និងគ្រប់គ្រងផលិតផលដូចជា អង្ករ ភេសជ្ជៈ និងទំនិញប្រើប្រាស់ផ្សេងៗទៀត។",
    },
    tags: ["Laravel", "Vue.js", "TypeScript", "MySQL", "Tailwind CSS"],
    lang: "Laravel",
    langColor: "#ff2d20",
    status: "coming-soon", 
    type_url: {
      en: "About Betta More Limited",
      km: "អំពី Betta More Limited",
    },
  },
  {
    name: "Chhuny Mini App",
    description: {
      en: "A Telegram Mini App for creating and sharing advice through short audio and video content.",
      km: "កម្មវិធី Telegram Mini App សម្រាប់បង្កើត និងចែករំលែកការណែនាំ តាមរយៈមាតិកាសំឡេង និងវីដេអូខ្លីៗ។",
    },
    tags: ["Next.js", "TypeScript", "Telegram Mini App", "Tailwind CSS"],
    lang: "Next.js",
    langColor: "#000000",
    status: "coming-soon",
    type_url: {
      en: "About Chhuny Mini App",
      km: "អំពី Chhuny Mini App",
    },
  },
];

export type Testimonial = {
  name: string;
  role: Bi;
  quote: Bi;
};

export const testimonials: Testimonial[] = [
  {
    name: "Sample Client",
    role: { en: "Project Manager (replace with real reviewer)", km: "អ្នកគ្រប់គ្រងគម្រោង (សូមជំនួសដោយអ្នកវាយតម្លៃពិតប្រាកដ)" },
    quote: {
      en: "Add a short, specific quote here about working with Chray — what he delivered and how he communicated.",
      km: "សូមបញ្ចូលសម្រង់ខ្លីៗ ជាក់លាក់អំពីការធ្វើការជាមួយឆ្រាយ — អ្វីដែលគាត់បានផ្ដល់ជូន និងរបៀបទំនាក់ទំនងរបស់គាត់។",
    },
  },
  {
    name: "Sample Teammate",
    role: { en: "Fellow Developer (replace with real reviewer)", km: "សហការីអ្នកអភិវឌ្ឍន៍ (សូមជំនួសដោយអ្នកវាយតម្លៃពិតប្រាកដ)" },
    quote: {
      en: "Add a short, specific quote here about collaborating with Chray on a real project or codebase.",
      km: "សូមបញ្ចូលសម្រង់ខ្លីៗ ជាក់លាក់អំពីការសហការជាមួយឆ្រាយលើគម្រោង ឬកូដពិតប្រាកដ។",
    },
  },
];

export type BlogPost = {
  slug: string;
  title: Bi;
  excerpt: Bi;
  date: string;
  readTime: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "structuring-laravel-apis",
    title: {
      en: "Structuring RESTful APIs in Laravel for long-term maintainability",
      km: "ការរៀបចំរចនាសម្ព័ន្ធ RESTful API ក្នុង Laravel ដើម្បីភាពងាយស្រួលក្នុងការថែទាំរយៈពេលវែង",
    },
    excerpt: {
      en: "Notes on resource controllers, form requests, and API versioning patterns I use in production apps.",
      km: "កំណត់ចំណាំអំពី Resource Controllers, Form Requests និងលំនាំកំណែកម្មវិធី API ដែលខ្ញុំប្រើប្រាស់ក្នុងកម្មវិធីដែលកំពុងដំណើរការពិតប្រាកដ។",
    },
    date: "2026-05-12",
    readTime: "6 min",
  },
  {
    slug: "vue-to-nextjs",
    title: {
      en: "What moving from Vue.js to Next.js taught me about component design",
      km: "អ្វីដែលការផ្លាស់ប្តូរពី Vue.js ទៅ Next.js បានបង្រៀនខ្ញុំអំពីការរចនា Component",
    },
    excerpt: {
      en: "Comparing composition patterns, data fetching, and rendering strategies across both frameworks.",
      km: "ការប្រៀបធៀបលំនាំ Composition ការទាញយកទិន្នន័យ និងយុទ្ធសាស្ត្របង្ហាញ (Rendering) រវាង Framework ទាំងពីរ។",
    },
    date: "2026-02-03",
    readTime: "5 min",
  },
];