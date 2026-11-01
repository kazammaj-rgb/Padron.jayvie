export const siteConfig = {
  name: "JAYVIE PADRON",
  fullName: "JAYVIE GULAN PADRON",
  course: "BS - Information Technology",
  tagline:
    "A passionate IT student, aspiring developer, musician, singer, and creative leader dedicated to technology, innovation, and digital experiences.",
  roles: [
    "Web Developer",
    "UI/UX Designer",
    "Musician",
    "Music Director",
    "IT Student",
    "Creative Thinker",
  ],
};

export const socialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/share/1CThDq4kPL/",
    icon: "facebook",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/jayvie.padron?igsh=ZDNoYmM1ODlmdWQz",
    icon: "instagram",
  },
  {
    name: "X",
    url: "https://x.com/Jayvvvvvvvv",
    icon: "twitter",
  },
  {
    name: "Threads",
    url: "https://www.threads.com/@itsnot_pjay",
    icon: "threads",
  },
] as const;

export const personalData = {
  /** Used to compute age automatically (updates every April 5). */
  birthDate: "2002-04-05",
  identity: [
    { label: "Name", value: "JAYVIE GULAN PADRON" },
    { label: "Gender", value: "Male" },
    { label: "Birthday", value: "April 5, 2002" },
    { label: "Age", value: "" },
    {
      label: "Birthplace",
      value: "RSBS Building Camp Upi Gamu Isabela",
    },
  ],
  location: [
    { label: "Barangay", value: "Minante Uno" },
    { label: "City/Municipal", value: "Cauayan City" },
    { label: "Province", value: "Isabela" },
    { label: "Zip Code", value: "3305" },
  ],
  personal: [
    { label: "Civil Status", value: "Single" },
    { label: "Citizenship", value: "Filipino" },
    { label: "Religion", value: "Protestant" },
    { label: "Dialect", value: "English, Tagalog, Ilocano" },
    {
      label: "Hobby / Talent",
      value: "Singer, Musician, Music Director",
    },
  ],
};

export const education = [
  {
    id: "tertiary-isu",
    level: "Tertiary",
    school: "Isabela State University - Cauayan Campus",
    course: "Bachelor of Science in Information Technology",
    batch: "2024 - Present",
    image: "/education/isu.jpg",
  },
  {
    id: "tertiary-febi",
    level: "Tertiary",
    school: "Far East Bible Institute",
    course: "Bachelor of Theology",
    batch: "2022 - 2023",
    image: "/education/febi.jpg",
  },
  {
    id: "shs",
    level: "Senior High School",
    school: "East Asia International System College Inc.",
    course: "Information Communication Technology",
    batch: "2019 - 2020",
    image: "/education/eastasia.jpg",
  },
  {
    id: "jhs",
    level: "Junior High School",
    school: "Turod Integrated School",
    course: "Junior High School",
    batch: "2017 - 2018",
    image: "/education/tis.jpg",
  },
  {
    id: "elementary",
    level: "Elementary",
    school: "Turod Integrated School",
    course: "Elementary Education",
    batch: "2012 - 2013",
    image: "/education/tis.jpg",
  },
];

export const experience = [
  {
    id: "immersion",
    position: "Assistant Principal",
    institution: "Turod Integrated School",
    type: "Work Immersion",
    description:
      "Supported school administration, coordinated activities, and gained leadership experience in an educational environment.",
  },
];

export const professionalSummary =
  "I am a Full-Stack and Mobile Application Developer focused on building modern websites and mobile applications. I enjoy creating responsive, user-friendly, and scalable digital solutions using modern web and mobile technologies.";

export const skillCategories = [
  {
    title: "Frontend Development",
    description: "Building responsive, interactive, and polished user interfaces.",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    title: "Backend Development",
    description: "Creating reliable application logic and scalable server-side flows.",
    skills: ["PHP", "Laravel", "Node.js"],
  },
  {
    title: "Mobile Development",
    description: "Developing mobile-first experiences for Android environments.",
    skills: ["Kotlin", "XML"],
  },
] as const;

export const strengths = [
  {
    title: "AI-Assisted Productivity",
    description:
      "Efficiently uses AI tools to accelerate development, improve productivity, and deliver results faster.",
  },
  {
    title: "Performs Well Under Pressure",
    description:
      "Maintains focus and productivity in fast-paced environments and challenging situations.",
  },
  {
    title: "Emotionally and Mentally Resilient",
    description:
      "Handles responsibilities professionally while maintaining a positive and stable mindset.",
  },
  {
    title: "Purpose-Driven",
    description:
      "Motivated by goals, continuous learning, and meaningful impact.",
  },
  {
    title: "Deadline-Oriented",
    description:
      "Strong time management skills with a track record of completing tasks before deadlines.",
  },
] as const;

export const leadershipMentorship = {
  title: "Leadership & Mentorship",
  description:
    "Experienced in leading, mentoring, and guiding individuals toward personal and professional growth. Skilled in identifying strengths, fostering teamwork, encouraging continuous improvement, and helping others reach their full potential.",
  strengths: [
    {
      title: "Effective Communication",
      description:
        "Able to communicate ideas clearly, actively listen, and build positive relationships with diverse groups of people.",
    },
    {
      title: "Team Building",
      description:
        "Creates supportive environments that encourage collaboration, accountability, and mutual growth.",
    },
    {
      title: "Coaching and Mentoring",
      description:
        "Passionate about helping others develop their skills, confidence, and capabilities through guidance and encouragement.",
    },
  ],
} as const;

type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
} & (
  | { kind: "website"; liveUrl: string }
  | { kind: "android"; downloadUrl: string; githubUrl: string; icon?: "document" }
);

export const projects: Project[] = [
  {
    id: "pirccar",
    kind: "website",
    title: "Pirccar",
    category: "websites" as const,
    description: "Visit my deployed project.",
    liveUrl: "https://pirccar-a9456.web.app/",
  },
  {
    id: "pjrccar",
    kind: "android",
    title: "pjRcCar",
    category: "Android Application",
    description: "An Android application for controlling an Arduino-based remote-control car.",
    downloadUrl: "/api/download/pjrccar",
    githubUrl: "https://github.com/kazammaj-rgb/Pj_RC-car.-mobileapk/blob/fc15e7f9e0f3e4f52f03420b4ef901042ac9a7d1/app-debug.apk",
  },
  {
    id: "portfolio-cv",
    kind: "android",
    title: "padron.jayvie_CV APK",
    category: "Android Application",
    description: "My personal portfolio and CV application for Android.",
    downloadUrl: "/api/download/portfolio-cv",
    githubUrl: "https://github.com/kazammaj-rgb/padron.jayvie_CV-mobile-APK/blob/aa0e4c41db2074054d3967849b0c9481fffbd852/PadronJayvie-CV.apk",
    icon: "document",
  },
];

export const contactInfo = {
  address: "Minate I, Cauayan",
  phone: "09670560650",
  email: "kazammaj@gmail.com",
  /** Opens your exact pin in Google Maps */
  mapUrl: "https://maps.app.goo.gl/gjVLkXsjwykdyeMz8",
  map: {
    lat: 16.9103378,
    lng: 121.7557564,
    label: "Minate I, Cauayan",
    zoom: 17.2,
    pitch: 58,
    bearing: -24,
  },
  social: [
    {
      platform: "Facebook",
      handle: "Jayvie Padron",
      url: "https://www.facebook.com/share/1CThDq4kPL/",
    },
    {
      platform: "Instagram",
      handle: "jayvie.padron",
      url: "https://www.instagram.com/jayvie.padron?igsh=ZDNoYmM1ODlmdWQz",
    },
    {
      platform: "X / Twitter",
      handle: "Jayvvvvvvvv",
      url: "https://x.com/Jayvvvvvvvv",
    },
    {
      platform: "Threads",
      handle: "itsnot_pjay",
      url: "https://www.threads.com/@itsnot_pjay",
    },
  ],
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "personal", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
