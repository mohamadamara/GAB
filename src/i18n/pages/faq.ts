import type { Lang } from "../config";

export type Faq = { q: string; a: string };

/**
 * Copy for /faq. Answers describe how we work in general terms; anything that is a business
 * policy (pricing model, code ownership, warranty) should be added here only once it's decided.
 */
const en = {
  metaTitle: "FAQ",
  metaDescription: "Common questions about working with GAB: what we build, how a project starts, timelines, pricing and support after launch.",
  eyebrow: "FAQ",
  title: ["Common questions,", "straight answers."],
  lead: "What clients usually ask before we start working together. Don't see your question? Ask us directly.",
  statusEyebrow: "Still have a question?",
  statusTitle: "Talk to us directly.",
  statusText: "Tell us about your project or ask anything about how we work — we'll answer personally.",
  ask: "Ask a question",
  preview: "See our projects",
  items: [
    {
      q: "What does GAB do?",
      a: "GAB is a software development company. We design and build websites, mobile apps and business systems — from planning and design through development, launch and ongoing support.",
    },
    {
      q: "What kinds of software do you build?",
      a: "Websites and web applications, mobile apps, SaaS platforms, CRM and ERP systems, booking and appointment systems, business dashboards, workflow automation, online stores, AI-powered applications and custom software. The Services page has details on each.",
    },
    {
      q: "Do I need technical knowledge to work with you?",
      a: "No. Describe your business and the problem in your own words — turning that into a technical plan is our job. We'll ask the questions that matter and explain our recommendations in plain language.",
    },
    {
      q: "How does a project start?",
      a: "With a conversation about your business and goals. Then we put together a clear scope — features by priority, a timeline in phases and a quote. Design and development start only once you've approved it.",
    },
    {
      q: "How long does a project take?",
      a: "It depends on the scope: a focused website is very different from a full business system. After the planning stage you get a timeline broken into phases, so you know what will be ready and when.",
    },
    {
      q: "How much does it cost?",
      a: "Every project is priced by its scope. Once we understand what you need, you receive a quote before any work begins. Splitting the work into phases also makes it easier to start with what matters most and budget for the rest.",
    },
    {
      q: "Can you work on a system we already have?",
      a: "Yes. We can fix, improve, extend or maintain an existing website or system. We start by reviewing what's there, then recommend whether to build on it or replace parts of it.",
    },
    {
      q: "What happens after launch?",
      a: "We make sure your team knows how to use the system, and we remain available for fixes, improvements and the next version — with ongoing maintenance if you want it.",
    },
    {
      q: "Can I see examples of your work?",
      a: "Yes. Case studies are published on the Projects page as they're approved by our clients. If you'd like to see examples relevant to your project, get in touch and we'll walk you through them.",
    },
  ] as Faq[],
};

const he: typeof en = {
  metaTitle: "שאלות נפוצות",
  metaDescription: "שאלות נפוצות על עבודה עם GAB: מה אנחנו בונים, איך מתחיל פרויקט, לוחות זמנים, מחיר וליווי אחרי ההשקה.",
  eyebrow: "שאלות נפוצות",
  title: ["שאלות נפוצות,", "תשובות ישירות."],
  lead: "מה לקוחות בדרך כלל שואלים לפני שמתחילים לעבוד איתנו. לא מצאתם את השאלה שלכם? שאלו אותנו ישירות.",
  statusEyebrow: "נשארה לכם שאלה?",
  statusTitle: "דברו איתנו ישירות.",
  statusText: "ספרו לנו על הפרויקט שלכם או שאלו כל דבר על איך אנחנו עובדים — נענה לכם באופן אישי.",
  ask: "לשאול שאלה",
  preview: "לפרויקטים שלנו",
  items: [
    {
      q: "מה GAB עושה?",
      a: "GAB היא חברה לפיתוח תוכנה. אנחנו מתכננים ובונים אתרים, אפליקציות מובייל ומערכות לעסקים — מהתכנון והעיצוב, דרך הפיתוח, ועד העלייה לאוויר והליווי השוטף.",
    },
    {
      q: "איזה סוגי תוכנה אתם בונים?",
      a: "אתרים ואפליקציות ווב, אפליקציות מובייל, פלטפורמות SaaS, מערכות CRM ו־ERP, מערכות לזימון תורים, דשבורדים עסקיים, אוטומציה של תהליכים, חנויות אונליין, אפליקציות AI ותוכנה בהתאמה אישית. בעמוד השירותים יש פירוט על כל אחד מהם.",
    },
    {
      q: "צריך ידע טכני כדי לעבוד איתכם?",
      a: "לא. תתארו את העסק ואת הבעיה במילים שלכם — לתרגם את זה לתוכנית טכנית זה התפקיד שלנו. נשאל את השאלות החשובות ונסביר את ההמלצות שלנו בשפה פשוטה.",
    },
    {
      q: "איך מתחיל פרויקט?",
      a: "בשיחה על העסק ועל המטרות שלכם. אחר כך אנחנו מכינים הגדרה ברורה — פיצ׳רים לפי סדר עדיפות, לוח זמנים בשלבים והצעת מחיר. העיצוב והפיתוח מתחילים רק אחרי שאישרתם.",
    },
    {
      q: "כמה זמן לוקח פרויקט?",
      a: "זה תלוי בהיקף: אתר ממוקד שונה מאוד ממערכת עסקית מלאה. אחרי שלב התכנון תקבלו לוח זמנים מחולק לשלבים, כך שתדעו מה יהיה מוכן ומתי.",
    },
    {
      q: "כמה זה עולה?",
      a: "כל פרויקט מתומחר לפי ההיקף שלו. ברגע שנבין מה אתם צריכים, תקבלו הצעת מחיר — עוד לפני שמתחילה עבודה כלשהי. חלוקה לשלבים גם מאפשרת להתחיל ממה שהכי חשוב ולתכנן את התקציב להמשך.",
    },
    {
      q: "אתם יכולים לעבוד על מערכת שכבר קיימת אצלנו?",
      a: "כן. אנחנו יכולים לתקן, לשפר, להרחיב או לתחזק אתר או מערכת קיימים. מתחילים בבדיקה של מה שקיים, ואז ממליצים אם להמשיך לבנות עליו או להחליף חלקים ממנו.",
    },
    {
      q: "מה קורה אחרי ההשקה?",
      a: "אנחנו מוודאים שהצוות שלכם יודע לעבוד עם המערכת, ונשארים זמינים לתיקונים, לשיפורים ולגרסה הבאה — כולל תחזוקה שוטפת, אם תרצו.",
    },
    {
      q: "אפשר לראות דוגמאות לעבודות שלכם?",
      a: "כן. סיפורי פרויקטים עולים לעמוד הפרויקטים ברגע שהלקוחות שלנו מאשרים אותם. אם תרצו לראות דוגמאות שרלוונטיות לפרויקט שלכם — דברו איתנו ונציג לכם אותן.",
    },
  ],
};

export const faqCopy: Record<Lang, typeof en> = { en, he };
