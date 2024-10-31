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
