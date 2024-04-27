function fetchAndDisplayImages(iso) {
    fetch(`https://eneb453.s3.us-east-2.amazonaws.com/${iso}/pictures.json`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const imagesGrid = document.getElementById('imagesGrid');
            imagesGrid.innerHTML = '';
            data.forEach(picture => {
                const imageUrl = `https://eneb453.s3.us-east-2.amazonaws.com/${iso}/${picture.filename}`;
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.alt = picture.title; 
                imagesGrid.appendChild(imgElement);
            });
        })
}

document.addEventListener('DOMContentLoaded', function () {
    const fetchCountriesButton = document.getElementById('fetchCountries');
    const countriesSelect = document.getElementById('countries');

    fetchCountriesButton.addEventListener('click', function() {
        fetch('https://eneb453.s3.us-east-2.amazonaws.com/country.json')
            .then(response => response.json())
            .then(data => {
                countriesSelect.innerHTML = data.map(country => `<option value="${country.iso}">${country.name}</option>`).join('');
                document.getElementById('dropdownContainer').style.display = 'block';
            })
    });

    countriesSelect.addEventListener('change', function(event) {
        const selectedIso = event.target.value;
        if (selectedIso) {
            fetchAndDisplayImages(selectedIso);
        }
    });
});
