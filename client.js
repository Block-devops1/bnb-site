//--------------------------------------------------
// PURPOSE: Simple Javascript for basic interactivity
//--------------------------------------------------

document.addEventListener('DOMContentLoaded',() => {
    
    // ----------------------------------------------------------------
    // 1. Download Button Functionality (FIXED & Corrected)
    // ----------------------------------------------------------------
    // Fix: Corrected ID lookup to match HTML: id="downloadBtn"
    const downloadButton = document.getElementById('downloadBtn');

    if (downloadButton) {
        // Fix: Corrected variable typo from 'downloadButtoon' to 'downloadButton'
        downloadButton.addEventListener('click',() => {
            // Fix: Corrected scroll target ID to match HTML: id="Download"
            document.getElementById('Download').scrollIntoView({ behavior:'smooth' });

            console.log('Download button clicked! Scrolling to download section.');
        });
    }

    // ----------------------------------------------------------------
    // 2. Search & Filter Functionality (NEW FEATURE)
    // ----------------------------------------------------------------
    
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.getElementById('search-input');
    const priceFilter = document.getElementById('price-filter');
    const distanceFilter = document.getElementById('distance-filter');

    if (searchButton) {
        searchButton.addEventListener('click', (event) => {
            // Stop default button behavior
            event.preventDefault(); 
            
            // Get the values from the search fields (uses Naira and Minutes-Walk values)
            const searchTerm = searchInput.value.trim().toLowerCase();
            const selectedPrice = priceFilter.value; 
            const selectedDistance = distanceFilter.value; 
            
            // Output the search parameters to the console
            console.log('--- Performing Search ---');
            console.log('Search Term:', searchTerm || 'None');
            console.log('Price Filter (Max ₦):', selectedPrice || 'None');
            console.log('Distance Filter (Max min):', selectedDistance || 'None');

            // Scrolls the user down to the Features section (acting as the results section)
            document.getElementById('Features').scrollIntoView({ behavior:'smooth' });
            
            // Provides user feedback for the search
            alert(`Searching for: "${searchTerm}" with max price ₦${selectedPrice} and max distance ${selectedDistance} minutes.`);
        });
    }
});
