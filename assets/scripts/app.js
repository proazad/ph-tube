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
    btn.classList = 'btn btn-xs sm:btn-sm md:btn-md hover:text-black';
    btn.setAttribute('id', category.category_id)
    btn.setAttribute('onclick', "categoryId(this)")
    btn.innerText = category.category;
    categotyContainer.appendChild(btn);
  });
}

/**
 * Display or Load All Data 
 */

const LoadData = async (id = '1000') => {
  loadingSpinner(true);
  const url = `https://openapi.programming-hero.com/api/videos/category/${id}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const videos = data.data;
    if (!videos || videos.length === 0) {
      displayData(false);
    } else {
      displayData(videos);
    }
  } catch (error) {
    // Handle errors here
    const errorElement = document.getElementById('errorContainer');
    errorElement.classList.remove('hidden');
    console.error("An error occurred:", error);
  } finally {
    loadingSpinner(false);
  }
};



const displayData = (videos) => {
 
    // Get Videos/Card Container 
    const cardContainer = document.getElementById('mainContentContainer');
    cardContainer.innerHTML = '';

    /**
     * Calculate One Year's of Seconds
     * Calculate One Month's of Seconds
     * Calculate One Day's of Seconds
     */
    const OneYearSeconds = ((60 * 60) * 24) * 365;
    const oneMonthSeconds = ((60 * 60) * 24) * 30;
    const onedaySeconds = (60 * 60) * 24;

    /**
     * Print All Data 
     * Create Card
     */

    videos.forEach(video => {
      // Get Seconds from Every Post
      const seconds = video?.others?.posted_date;

      /**
       * Seconds to Years Convert and calculate Additional Seconds 
       */
      const years = Math.floor(seconds / OneYearSeconds);
      let tempSeconds = seconds - (years * OneYearSeconds);
      /**
       * After get Years then Additional Seconds to Months Convert and calculate Additional Seconds
       */
      const months = Math.floor(tempSeconds / oneMonthSeconds);
      tempSeconds = tempSeconds - (months * oneMonthSeconds);
      /**
       * After get Months then Additional Seconds to Days Convert and Calculate Additional Seconds
       */
      const days = Math.floor(tempSeconds / onedaySeconds);
      tempSeconds = tempSeconds - (days * onedaySeconds);
      /**
       * After get Days then Additional Secondas to Hours Convert and Calculate Additoional Seconds 
       */
      const hours = Math.floor(tempSeconds / 3600);
      tempSeconds = tempSeconds - (hours * 3600);
      /**
       * After Get Hours then Additional Seconds to Minutes convet
       */
      const minutes = Math.floor(tempSeconds / 60);
      /**
       * Here conditionly Check years, Months, Days, Hours and Minutes is not empty
       * and Finaly Its get in New Variabls 
       */
      // const year = years ? years + " Years " : '';
      // const month = months ? months + " months " : '';
      // const day = days ? days + " Days " : '';
      const hour = hours ? hours + " hours " : '';
      const minute = minutes ? minutes + "  minutes Ago" : '';
      /**
       * Here Check post time is Available or not 
       * if post time is less than 1 minute then post time initialize by empty value
       * if post time is grater than 1min then post time container element inject 
       */
      // let postTime = year + "" + month + "" + day + "" + hour + "" + "" + minute;
      let postTime = hour + "" + "" + minute;
      const postTimeElement = postTime ? `<span
    class="absolute bottom-3 right-3 rounded-md bg-slate-800 text-white px-2 py-1 text-sm font-normal"
    >${postTime}</span>` : '';

      //Create Card Div
      const card = document.createElement("div");
      //Add All Classes in the Card Div
      card.classList = 'card';
      // Create and Check Profile verified or Not 
      const verified = video?.authors[0]?.verified ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clip-path="url(#clip0_11_34)">
      <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
      <path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92668C6.88906 8.52512 6.2375 8.52512 5.83594 8.92668C5.43437 9.32824 5.43437 9.97981 5.83594 10.3814L8.43125 12.9767C8.82187 13.3673 9.45625 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
    </g>
    <defs>
      <clipPath id="clip0_11_34">
        <rect width="20" height="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>` : " ";
      //Create Card Div Inner HTML Element 
      card.innerHTML = `<figure class="relative">
    <img
      src="${video.thumbnail}"
      alt="${video.title}"
      class="w-full h-56"
    />
    ${postTimeElement}
  </figure>
  <div class="card-body px-0 pt-5">
    <div class="flex gap-3">
      <div>
        <div class="avatar">
          <div class="w-12 rounded-full">
            <img src="${video?.authors[0]?.profile_picture}" alt="${video?.authors[0]?.profile_name}"/>
          </div>
        </div>
      </div>
      <div class="space-y-3">
        <h2 class="card-title text-base">
        ${video.title}
        </h2>
        <h4 class="text-sm font-normal text-gray-600 flex gap-4">
        ${video?.authors[0]?.profile_name}
          ${verified}
        </h4>
        <h4 class="text-sm font-normal text-gray-600">${video?.others?.views} views</h4>
      </div>
    </div>
  </div>`;
      cardContainer.appendChild(card);
    });

  loadingSpinner(false);

};

/**
 * 
 * Loading Spinner 
 */
const loadingSpinner = (isLoaded) => {
  const loadingSpinnerContainer = document.getElementById('loadingSpinner');
  if (isLoaded) {
    loadingSpinnerContainer.classList.remove('hidden');
  } else {
    loadingSpinnerContainer.classList.add('hidden');
  }
}
/**
 * Get Category Id
 */
function categoryId(event) {
  LoadData(event.id);
  if (event.id !== 1005) {
    const errorElement = document.getElementById('errorContainer');
    errorElement.classList.add('hidden');
  }

}


loadCategory();
LoadData();


