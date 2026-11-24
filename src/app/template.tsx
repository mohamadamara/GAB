/**
 * Page transition: a calm fade on every route change (the template re-mounts per navigation,
 * so the CSS animation replays). Done in CSS rather than Framer's `initial={{ opacity: 0 }}`
 * so the server-rendered page is never stuck invisible while JavaScript loads on a slow phone.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
