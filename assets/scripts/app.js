/**
 * 
 * Load All Data 
 */
const loadData = async () => {
    const url = `https://openapi.programming-hero.com/api/videos/categories`;
    const response = await fetch(url);
    const data = await response.json();
    // const da = data;
    console.log(data)

}
loadData();

