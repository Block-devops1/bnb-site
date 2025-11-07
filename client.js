//--------------------------------------------------
// PURPOSE: Simple Javascript for basic interactivity and new features
//--------------------------------------------------

document.addEventListener('DOMContentLoaded',() => {
    
    // ----------------------------------------------------------------
    // 1. Download Button Functionality (FIXED & Corrected)
    // ----------------------------------------------------------------
    // Fix: Corrected ID lookup to match HTML: id="downloadBtn"
    const downloadButton = document.getElementById('downloadBtn');

    if (downloadButton) {
        // Fix: Corrected variable typo (downloadButton instead of downloadButtoon)
        downloadButton.addEventListener('click',() => {
            // Fix: Corrected scroll target ID to match HTML: id="Download"
            document.getElementById('Download').scrollIntoView({ behavior:'smooth' });

            console.log('Download button clicked! Scrolling to download section.');
        });
    }

    // ----------------------------------------------------------------
    // 2. Search Dropdown Toggling & Filter Functionality (NEW FEATURE)
    // ----------------------------------------------------------------
    
    const searchIcon = document.getElementById('searchIcon');
    const searchDropdown = document.getElementById('searchDropdown');
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.getElementById('search-input');
    const priceFilter = document.getElementById('price-filter');
    const distanceFilter = document.getElementById('distance-filter');
    
    // Logic for showing/hiding the search filters
    if (searchIcon && searchDropdown) {
        searchIcon.addEventListener('click', () => {
            // Toggle the 'hidden' class to show/hide the dropdown
            searchDropdown.classList.toggle('hidden');
            
            // Change the button text/icon on toggle
            if (searchDropdown.classList.contains('hidden')) {
                searchIcon.innerHTML = '🔍 Search';
            } else {
                searchIcon.innerHTML = '❌ Close';
            }
        });
    }

    // Logic for what happens when the "Find Listings" button is clicked
    if (searchButton) {
        searchButton.addEventListener('click', (event) => {
            event.preventDefault(); 
            
            const searchTerm = searchInput.value.trim().toLowerCase();
            const selectedPrice = priceFilter.value; 
            const selectedDistance = distanceFilter.value; 
            
            console.log('--- Performing Search ---');
            console.log('Search Term:', searchTerm || 'None');
            console.log('Price Filter (Max ₦):', selectedPrice || 'None');
            console.log('Distance Filter (Max min):', selectedDistance || 'None');

            // Hide the dropdown after search (for better user experience)
            if (searchDropdown) {
                searchDropdown.classList.add('hidden');
                searchIcon.innerHTML = '🔍 Search';
            }
            
            // Scrolls the user down to the Features section (acting as the results section)
            document.getElementById('Features').scrollIntoView({ behavior:'smooth' });
            
            // Provides user feedback for the search
            alert(`Searching for: "${searchTerm}" with max price ₦${selectedPrice} and max distance ${selectedDistance} minutes.`);
        });
    }
});
