import type { Lang } from "../config";

/** Copy for /builders. `[plain, accent]` pairs render the second part in gold. */
const en = {
  metaTitle: "For Builders",
  metaDescription:
    "Why independent developers, software studios and development teams should join the GAB marketplace: professional profiles, portfolios, services and relevant project opportunities.",
  eyebrow: "For builders",
  title: ["Your skills,", "in front of the right projects."],
  lead: "GAB is being built for independent developers, software studios and technical teams who want to be discovered for what they do best — and spend less time chasing work that doesn't fit.",
  join: "Become a Builder",
  seeProfile: "See an example profile",
  joinNote: "Builder registration isn't open yet. “Become a Builder” lets you register interest so we can keep you informed.",
  who: [
    ["Independent developers", "Freelancers and solo engineers who want quality projects without endless cold outreach."],
    ["Development studios", "Small and mid-sized studios looking for clients whose projects fit their specialism."],
    ["Technical teams", "Established teams that take on larger platforms and long-term engagements."],
  ],
  whyEyebrow: "Why join GAB",
  whyTitle: ["Everything you need to be", "understood and chosen."],
  whyLead: "These are the capabilities GAB is being designed to give builders. They are planned features of a platform in development.",
  features: [
    ["PRF", "Professional profiles", "A consistent, credible profile that presents who you are, how you work and what you're best at."],
    ["SKL", "Technical skills", "Show the depth of your expertise — from domains like booking or ERP to disciplines like UX or DevOps."],
    ["TEC", "Technologies", "List the languages, frameworks and platforms you actually work with, so matches are meaningful."],
    ["PFL", "Portfolio", "Case studies structured around the problem, the solution and your role — not just screenshots."],
    ["SRV", "Services", "Define what you offer: discovery, design, development, integration, maintenance and more."],
    ["OPP", "Project opportunities", "Browse projects that arrive already organised into goals, users and prioritised features."],
    ["DSC", "Customer discovery", "Be found by businesses searching for exactly the skills and experience you bring."],
    ["MCH", "Project matching", "Planned matching that relates project scopes to builder profiles, highlighting relevant opportunities."],
  ],
  profileEyebrow: "Example builder profile",
  profileTitle: ["A profile that", "does the explaining."],
  profileLead: "Skills, technologies, services, portfolio and availability — presented the same way for every builder, so customers can compare with confidence.",
  profileBadge: "Fictional sample profile",
  workspaceEyebrow: "Your workspace",
  workspaceTitle: ["Opportunities,", "organised."],
  workspaceLead:
    "A planned builder dashboard surfaces projects relevant to your profile, tracks the proposals you've sent and shows how to strengthen your presence.",
  workspacePoints: ["Projects related to your skills", "Proposal pipeline at a glance", "Profile strength guidance"],
  workspaceNote: "Concept preview · demonstration values",
  ctaTitle: "Build what matters. Get found for it.",
  ctaText: "Register your interest as a developer, studio or technical team. We'll share updates as GAB moves toward its first release.",
  ctaSecondary: "Read the FAQ",
};

const he: typeof en = {
  metaTitle: "למפתחים",
  metaDescription:
    "למה מפתחים עצמאיים, סטודיואים וצוותי פיתוח יצטרפו ל־GAB: פרופיל מקצועי, תיק עבודות, שירותים ופרויקטים שמתאימים בדיוק למה שאתם עושים.",
  eyebrow: "למפתחים",
  title: ["הכישורים שלכם,", "מול הפרויקטים הנכונים."],
  lead: "GAB נבנית בשביל מפתחים עצמאיים, סטודיואים וצוותי פיתוח שרוצים שימצאו אותם בזכות מה שהם עושים הכי טוב — ופחות לרדוף אחרי עבודות שלא מתאימות להם.",
  join: "הצטרפו כמפתחים",
  seeProfile: "לפרופיל לדוגמה",
  joinNote: "ההרשמה למפתחים עוד לא נפתחה. בינתיים, ״הצטרפו כמפתחים״ משאיר לנו את הפרטים שלכם כדי שנעדכן אתכם.",
  who: [
    ["מפתחים עצמאיים", "פרילנסרים ומפתחים יחידים שרוצים פרויקטים טובים בלי לרדוף כל הזמן אחרי לקוחות."],
    ["סטודיואים לפיתוח", "סטודיואים קטנים ובינוניים שמחפשים לקוחות עם פרויקטים שמתאימים להתמחות שלהם."],
    ["צוותי פיתוח", "צוותים ותיקים שלוקחים על עצמם מערכות גדולות והתקשרויות ארוכות טווח."],
  ],
  whyEyebrow: "למה להצטרף ל־GAB",
  whyTitle: ["כל מה שצריך כדי שיבינו אתכם", "ויבחרו בכם."],
  whyLead: "אלה היכולות שאנחנו מתכננים לתת למפתחים ב־GAB. הן עדיין בפיתוח, כחלק מפלטפורמה שנמצאת בהקמה.",
  features: [
    ["PRF", "פרופיל מקצועי", "פרופיל אחיד ואמין שמציג מי אתם, איך אתם עובדים ובמה אתם הכי חזקים."],
    ["SKL", "כישורים", "להראות את עומק המומחיות שלכם — מתחומים כמו מערכות זימון תורים או ERP ועד UX או DevOps."],
    ["TEC", "טכנולוגיות", "השפות, הספריות והפלטפורמות שאתם באמת עובדים איתן — כדי שההתאמות יהיו רלוונטיות."],
    ["PFL", "תיק עבודות", "סיפורי פרויקטים שמסבירים מה הייתה הבעיה, מה בניתם ומה היה התפקיד שלכם — לא רק צילומי מסך."],
    ["SRV", "שירותים", "להגדיר מה אתם מציעים: אפיון, עיצוב, פיתוח, חיבור למערכות, תחזוקה ועוד."],
    ["OPP", "פרויקטים פתוחים", "פרויקטים שמגיעים כבר מסודרים: מטרות, משתמשים ופיצ׳רים לפי סדר עדיפות."],
    ["DSC", "חשיפה ללקוחות", "עסקים שמחפשים בדיוק את הכישורים והניסיון שלכם — ימצאו אתכם."],
    ["MCH", "התאמה לפרויקטים", "התאמה מתוכננת בין דרישות הפרויקט לפרופיל שלכם, שתציף את ההזדמנויות הרלוונטיות."],
  ],
  profileEyebrow: "פרופיל מפתח לדוגמה",
  profileTitle: ["פרופיל", "שמסביר את עצמו."],
  profileLead: "כישורים, טכנולוגיות, שירותים, תיק עבודות וזמינות — באותו מבנה אצל כל המפתחים, כדי שלקוחות יוכלו להשוות בביטחון.",
  profileBadge: "פרופיל בדוי לדוגמה",
  workspaceEyebrow: "סביבת העבודה שלכם",
  workspaceTitle: ["הזדמנויות,", "מסודרות."],
  workspaceLead: "לוח בקרה מתוכנן למפתחים: פרויקטים שמתאימים לפרופיל שלכם, מעקב אחרי ההצעות ששלחתם, וטיפים לחיזוק הפרופיל.",
  workspacePoints: ["פרויקטים שמתאימים לכישורים שלכם", "כל ההצעות שלכם במבט אחד", "המלצות לשיפור הפרופיל"],
  workspaceNote: "סקיצה · נתונים לדוגמה",
  ctaTitle: "תבנו את מה שחשוב. שימצאו אתכם בזכותו.",
  ctaText: "השאירו פרטים כמפתחים, כסטודיו או כצוות פיתוח. נעדכן אתכם ככל ש־GAB מתקדמת לקראת הגרסה הראשונה.",
  ctaSecondary: "לשאלות נפוצות",
};

export const buildersCopy: Record<Lang, typeof en> = { en, he };
