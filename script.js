// API Key setup
const NASA_API_KEY = "YCVmnLXgCSVICbVSbmsC4pfLpPPXNK3II9lzUssf";

// Base url for Fetch photos
const BASE_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";

async function fetchPhotos(date) {
    const url = `${BASE_URL}?earth_date=${date}&api_key=${NASA_API_KEY}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        return data.photos.slice(0, 3); // Return first 3 photos if available
    } catch (error) {
        console.error("Failed to fetch Mars Rover photos:", error);
        return [];
    }
}

// Function to load photos from a significant date on page load
async function loadInitialPhotos() {
    const significantDate = "2015-07-06"; // Example significant date
    const photos = await fetchPhotos(significantDate);
    displayPhotos(photos, `Significant Date: ${significantDate} - Curiosity Rover Landing`);
}

// Function to display photos in the photo gallery
function displayPhotos(photos, description) {
    const galleryDescription = document.getElementById("gallery-description");
    const photosContainer = document.getElementById("photos-container");

    // Update description and clear the previous photos
    galleryDescription.textContent = description;
    photosContainer.innerHTML = "";

    if (photos.length === 0) {
        photosContainer.innerHTML = "<p>No photos available for this date.</p>";
        return;
    }

    // Add photos to the gallery
    photos.forEach(photo => {
        const { img_src, earth_date, camera: { full_name } } = photo;
        
        const photoElement = document.createElement("div");
        photoElement.classList.add("photo");

        photoElement.innerHTML = `
            <img src="${img_src}" alt="Mars Rover photo taken by ${full_name} on ${earth_date}" />
            <p>Earth Date: ${earth_date}</p>
            <p>Camera: ${full_name}</p>
        `;

        photosContainer.appendChild(photoElement);
    });
}

// Event listener for "Load Photos" button
document.getElementById("load-photos-button").addEventListener("click", async () => {
    const dateInput = document.getElementById("date-input").value;
    if (dateInput) {
        const photos = await fetchPhotos(dateInput);
        displayPhotos(photos, `Mars Rover Photos for ${dateInput}`);
    } else {
        alert("Please select a date.");
    }
});

// Load initial photos on page load
window.addEventListener("load", loadInitialPhotos);
