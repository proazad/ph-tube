/**
 * 
 * Load All Category 
 */
const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/videos/categories`;
    const response = await fetch(url);
    const data = await response.json();
    const categories = data.data;
    const categotyContainer = document.getElementById('categroyContainer');
    categories.forEach(category => {
      const btn = document.createElement("button");
      btn.classList = 'btn btn-md hover:text-black';
      btn.innerText = category.category;
      categotyContainer.appendChild(btn);
    });
}

/**
 * Display or Load All Data 
 */
const displayData = async (id='1000') =>{
  const url = `https://openapi.programming-hero.com/api/videos/category/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  const videos = data.data;
  console.log(videos);
}

loadCategory();
displayData();
