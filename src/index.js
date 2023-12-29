import updateUIWithData from './update.js';

async function handleFormSubmit(event) {
  event.preventDefault();

  try {
    const locationKeyword = document.getElementById('locationInput').value;

    // Show the loading spinner
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'block';

    const startTime = performance.now(); // Record the start time

    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=05a0b132f6cf42d694e34917232312&q=${encodeURIComponent(locationKeyword)}`, { mode: 'cors' });

    const endTime = performance.now(); // Record the end time

    // // Hide the loading spinner
    loadingSpinner.style.display = 'none';

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();

    // Update UI with data
    updateUIWithData(data);

    // Calculate and display the loading time
    const loadingTime = endTime - startTime;
    displayLoadingTime(loadingTime);
  } catch (error) {
    console.error(error);
  }
}

function displayLoadingTime(loadingTime) {
  // Create or select an element to display the loading time
  const loadingTimeElement = document.getElementById('loadingTime');

  // Update the content of the element with the loading time
  loadingTimeElement.textContent = `Data fetched in ${loadingTime.toFixed(2)} milliseconds`;
}

// Add an event listener to the form for the 'submit' event
document.getElementById('weatherLocationForm').addEventListener('submit', handleFormSubmit);
