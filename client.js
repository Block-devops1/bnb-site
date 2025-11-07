//--------------------------------------------------
// PURPOSE: Simple Javascript for basic interactivity
//--------------------------------------------------

document.addEventListener('DOMContentLoaded',() => {
    const downloadButton =
 document.getElementById('download-btn');

        //Simple  scroll animation when the CTA button is clicked 
        if (downloadButton) {
        downloadButtoon.addEventListener('click',() => {
            // Scroll smoothly to the download section

document.getElementById('download').scrollIntoView({ behavior:'smooth' });

              // you can add analytics tracking here later!
              console.log('Download button clicked! Scrolling to download section.');
        });
     }

     //YOU could add dynamic content loading or form validation here later!
});     