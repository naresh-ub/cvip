// analytics.js

// Load the Google Analytics script asynchronously
(function() {
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-BRZ9RXC40W';
  document.head.appendChild(script);
})();

// Initialize dataLayer and gtag function
window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}

// Configure Google Analytics with your Measurement ID
gtag('js', new Date());
gtag('config', 'G-BRZ9RXC40W');