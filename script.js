// API Key setup
const NASA_API_KEY = "YCVmnLXgCSVICbVSbmsC4pfLpPPXNK3II9lzUssf";

// Fetch photos
const BASE_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";

async function fetchPhotos(date) {
    const url = `${BASE_URL}?earth_date=${date}&api_key=${NASA_API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const photos = data.photos;

        if (photos.length === 0) {
            console.log("No photos available for this date.");
            return;
        }

        // Extract and display the first 3 photos
        const selectedPhotos = photos.slice(0, 3); // first 3 photos
        selectedPhotos.forEach(photo => {
            const { img_src, earth_date, camera: { full_name } } = photo;
            console.log("Photo URL:", img_src);
            console.log("Earth Date:", earth_date);
            console.log("Camera Name:", full_name);
            // Here, you would add these photos to the DOM
        });

    } catch (error) {
        console.error("Failed to fetch Mars Rover photos:", error);
    }
}

// Function to load photos from a significant date on page load
async function loadInitialPhotos() {
    const significantDate = '2012-06-07'; // Example date: Curiosity Rover landing date
    const photos = await fetchPhotos(significantDate);
    displayPhotos(photos, `Significant Date: ${significantDate} - Curiosity Rover Landing`);
}

window.addEventListener('load', loadInitialPhotos);

function displayPhotos(photos, description) {
    const gallery = document.getElementById('photoGallery');
    gallery.innerHTML = `<h2>${description}</h2>`; // Set the description

    if (photos.length === 0) {
        gallery.innerHTML += "<p>No photos available for this date.</p>";
        return;
    }

    photos.forEach(photo => {
        const photoElement = document.createElement('div');
        photoElement.classList.add('photo');

        photoElement.innerHTML = `
            <img src="${photo.img_src}" alt="Mars Rover photo taken by ${photo.camera.full_name}" />
            <p>Earth Date: ${photo.earth_date}</p>
            <p>Camera: ${photo.camera.full_name}</p>
        `;

        gallery.appendChild(photoElement);
    });
}

document.getElementById('loadPhotosBtn').addEventListener('click', async () => {
    const dateInput = document.getElementById('dateInput').value;
    if (dateInput) {
        const photos = await fetchPhotos(dateInput);
        displayPhotos(photos, `Mars Rover Photos for ${dateInput}`);
    } else {
        alert("Please select a date.");
    }
});