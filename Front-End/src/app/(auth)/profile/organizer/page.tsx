import OrganizerProfile from "./OrganizerProfile";
import { getOrganizerData } from "@/lib/organizer";

export default async function Page() {
  const organizer = await getOrganizerData();

  if (!organizer) {
    return <div>Organizer not found</div>;
  }

  return <OrganizerProfile organizer={organizer} />;
}
