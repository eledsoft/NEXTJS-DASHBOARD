
const relativesTE = (() => {
    const now = new Date().toISOString()
    console.log("ciao" + now)
    return now
})()

export async function getRelativesTest() {
    return relativesTE;
}
