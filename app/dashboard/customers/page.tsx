import { getRelativesTest } from "@/app/dal/testData";
import DateDisplay from "@/app/ui/date-display";

export default async function Page() {
  const relativesTE = await getRelativesTest();
  return (<>
    <p>Customer Page</p>
    <DateDisplay value={relativesTE} label="Data di TEST" />
  </>
  )
}