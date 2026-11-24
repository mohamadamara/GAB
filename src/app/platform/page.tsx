import { permanentRedirect } from "next/navigation";

/** The platform concept previews now live under "Work". */
export default function PlatformPage() {
  permanentRedirect("/work");
}
