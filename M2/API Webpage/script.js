document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('cycling-form');
    const experienceSelect = document.getElementById('experience');
    const beginnerInputs = document.getElementById('beginner-inputs');
    const experiencedInputs = document.getElementById('experienced-inputs');
    const recommendationsSection = document.getElementById('recommendations');
    const recommendationsContainer = document.getElementById('recommended-components');

    // Show the correct input fields based on experience level
    experienceSelect.addEventListener('change', (event) => {
        const experienceLevel = event.target.value;
        if (experienceLevel === 'beginner') {
            beginnerInputs.classList.remove('hidden');
            experiencedInputs.classList.add('hidden');
        } else {
            experiencedInputs.classList.remove('hidden');
            beginnerInputs.classList.add('hidden');
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Collect user input
        const experienceLevel = experienceSelect.value;
        const budget = document.getElementById('budget').value;
        const terrain = document.getElementById('terrain').value;

        // Clear previous recommendations
        recommendationsContainer.innerHTML = '';

        // Send user input to server and fetch recommendations
        fetch('/recommendations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ experienceLevel, budget, terrain }),
        })
        .then(response => response.json())
        .then(data => {
            // Show the fetched recommendations
            data.recommendations.forEach(item => {
                recommendationsContainer.innerHTML += `
                    <p><strong>Recommended Bike:</strong> ${item.bike_name}</p>
                    <p><strong>Recommended Components:</strong> ${item.components}</p>
                `;
            });

            // Show recommendations section
            recommendationsSection.classList.remove('hidden');
        })
        .catch(error => console.error('Error fetching recommendations:', error));
    });
});
