document.addEventListener("DOMContentLoaded", function() {
    var videos = document.querySelectorAll('video');

    videos.forEach(function(video) {
        var hasPlayed = false; // Flag to track if the video has started playing

        // Use 'mouseover' event for more consistent behavior
        video.addEventListener('mouseover', function() {
            if (!hasPlayed) {
                video.play();  // Play the video on the first hover
                hasPlayed = true;  // Set flag to true to ensure it only plays once
            }
        });
        
        // Set video attributes
        video.loop = true;  // Loop the video indefinitely
        video.muted = true;  // Ensure the video remains muted (to comply with autoplay policies)
        video.controls = true;  // Ensure controls are visible
    });
});
