// script.js

let globalData;
let formattedPages;

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

    for (let startIndex = 0; startIndex < totalItems; startIndex += itemsPerPage) {
        const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
        const pageItemKeys = itemKeys.slice(startIndex, endIndex);
        const pageItems = pageItemKeys.map(key => ({ name: key, ...data[key] }));
        pages.push({ page: currentPage, items: pageItems });
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
                console.log("already in memory or localStorage");
                resolve(globalData);
                return;
            }

            // Attempt to get data from localStorage
            const storedData = getDataFromStorage('jsonData');
            if (storedData) {
                console.log("data from localStorage");
                globalData = storedData;
                resolve(globalData);
                return;
            }

            // Access the embedded data directly from the script data.js
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

    localStorage.clear();
    // Fetch or initialize your data
    const jsonData = await fetchDataOrInitialize();

    // Use the raw data as needed
    console.log(jsonData);

    // Format the data into pages
    const itemsPerPage = 6;
    formattedPages = formatDataIntoPages(jsonData, itemsPerPage);

    // Save the formatted data for future use
    //saveDataToStorage('formattedPages', formattedPages);

    // Use the formatted data as needed
    console.log(formattedPages);

    // Create and append pagination buttons
    createPaginationButtons(formattedPages.length);

    // Add event listeners to pagination buttons
    //addEventListenersToButtons();
});

function createPaginationButtons(numPages) {
    if (numPages < 2) {
        return loadPage(1);
    }

    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';

    for (let i = 1; i <= numPages; i++) {
        const button = document.createElement('button');
        button.innerHTML = i === 1 ? '<img src="page1-icon.png" alt="Page 1">' : `<img src="page${i}-icon.png" alt="Page ${i}">`;
        button.onclick = function () {
            loadPage(i);
        };
        paginationContainer.appendChild(button);
    }

    const container = document.querySelector('.extra');
    if (container) {
        container.appendChild(paginationContainer);
    } else {
        console.error(`Container with class "${containerClass}" not found.`);
    }
}


window.addEventListener('beforeunload', function () {
    console.log("cleared")
    //localStorage.clear();
});
    