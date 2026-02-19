import { getRelativesTest } from "@/app/dal/testData";


export default function Page() {
  const relativesTE = getRelativesTest();
  return (<>
    <p>Customer Page</p>
    <p>{relativesTE} </p>
  </>
  )
}