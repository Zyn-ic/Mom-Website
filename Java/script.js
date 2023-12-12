// script.js

let globalData;

// Function to save data to localStorage
function saveDataToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Function to retrieve data from localStorage
function getDataFromStorage(key) {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
}

// Function to dynamically format the data into pages
function formatDataIntoPages(data, itemsPerPage) {
    const pages = [];
    const totalItems = data.length;
    let currentPage = 1;
    let startIndex = 0;

    while (startIndex < totalItems) {
        const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
        const pageItems = data.slice(startIndex, endIndex);
        pages.push({ page: currentPage, items: pageItems });
        startIndex += itemsPerPage;
        currentPage++;
    }

    return pages;
}

// Function to fetch JSON data
async function fetchDataOrInitialize() {
    try {
        // Check if data is already in memory or localStorage
        if (globalData) {
            return globalData;
        }

        // Attempt to get data from localStorage
        const storedData = getDataFromStorage('jsonData');
        if (storedData) {
            globalData = storedData;
            return globalData;
        }

        // Change the URL to the actual location of your JSON file or API endpoint
        const response = await fetch("data.json");

        // Check if the fetch was successful (status code 200)
        if (!response.ok) {
            throw new Error(`Failed to fetch data (Status ${response.status})`);
        }

        // Parse the JSON response
        globalData = await response.json();

        // Save the data to localStorage for future use
        saveDataToStorage('jsonData', globalData);

        return globalData;
    } catch (error) {
        console.error('Error fetching or parsing data:', error.message);
        // You can provide a default or fallback data here if needed
        return null;
    }
}

// Example usage
document.addEventListener('DOMContentLoaded', async function () {
    // Fetch or initialize your data
    const jsonData = await fetchDataOrInitialize();

    // Use the raw data as needed
    console.log(jsonData);

    // Format the data into pages
    const itemsPerPage = 6;
    const formattedPages = formatDataIntoPages(jsonData, itemsPerPage);

    // Save the formatted data for future use
    saveDataToStorage('formattedPages', formattedPages);

    // Use the formatted data as needed
    console.log(formattedPages);
});
