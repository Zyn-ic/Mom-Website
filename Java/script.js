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
    const itemKeys = Object.keys(data);
    const totalItems = itemKeys.length;
    let currentPage = 1;
    let startIndex = 0;

    while (startIndex < totalItems) {
        const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
        const pageItemKeys = itemKeys.slice(startIndex, endIndex);
        const pageItems = pageItemKeys.map(key => ({ name: key, ...data[key] }));
        pages.push({ page: currentPage, items: pageItems });
        startIndex += itemsPerPage;
        currentPage++;
    }

    return pages;
}

// Function to retrieve data (without fetching)
function fetchDataOrInitialize() {
    return new Promise((resolve, reject) => {
        try {
            // Check if data is already in memory or localStorage
            if (globalData) {
                resolve(globalData);
                return;
            }

            // Attempt to get data from localStorage
            const storedData = getDataFromStorage('jsonData');
            if (storedData) {
                globalData = storedData;
                resolve(globalData);
                return;
            }

            // Access the embedded data directly
            if (typeof embeddedData === 'object') {
                globalData = embeddedData;

                // Save the data to localStorage for future use
                saveDataToStorage('jsonData', globalData);

                resolve(globalData);
            } else {
                reject(new Error('Error accessing embedded data'));
            }
        } catch (error) {
            console.error('Error fetching or parsing data:', error.message);
            // You can provide a default or fallback data here if needed
            reject(error);
        }
    });
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
    //saveDataToStorage('formattedPages', formattedPages);

    // Use the formatted data as needed
    console.log(formattedPages);
});

    
