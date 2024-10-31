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
