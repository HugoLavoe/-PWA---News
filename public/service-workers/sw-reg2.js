// Define variables to hold references to the registration objects
var regObject35, regObject36, regObject37, regObject38;

// Function to register a service worker
function registerServiceWorker(scriptPath) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(scriptPath)
            .then(reg => {
                console.log(`Service Worker Registered: ${scriptPath} (Scope: ${reg.scope})`);
                // Store the registration object in the corresponding variable
                if (scriptPath === '/service-workers/sw-35.js') {
                    regObject35 = reg;
                } else if (scriptPath === '/service-workers/sw-36.js') {
                    regObject36 = reg;
                } else if (scriptPath === '/service-workers/sw-37.js') {
                    regObject37 = reg;
                } else if (scriptPath === '/service-workers/sw-38.js') {
                    regObject38 = reg;
                }
            })
            .catch(error => {
                console.error(`Service Worker Registration Error (${scriptPath}): ${error}`);
                // Optionally display an alert using Sweet Alert 2 or another method
                Swal.fire('Registration Error', `Error registering ${scriptPath}: ${error}`, 'error');
            });
    } else {
        console.warn('Service Workers not supported in this browser.');
    }
}

// Register each service worker
registerServiceWorker('/service-workers/sw-35.js');
registerServiceWorker('/service-workers/sw-36.js');
registerServiceWorker('/service-workers/sw-37.js');
registerServiceWorker('/service-workers/sw-38.js');

// Define variables to hold references to the service worker registration object and the install prompt
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

// Check if service workers are supported
if ('serviceWorker' in navigator) {
    // Register the first service worker again (optional, can be removed if already registered)
    navigator.serviceWorker.register('/service-workers/sw-35.js')
        .then(reg => {
            console.log(`Service Worker Registered: ${reg.scope}`);
        })
        .catch(error => {
            console.error(`Service Worker Registration Error: ${error}`);
        });
}

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini info bar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Show the install button
    installBtn.style.display = 'block';
});

// Add a click event listener to the install button
installBtn.addEventListener('click', () => {
    // Hide the install button
    installBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null; // Clear the deferredPrompt variable
    });
});
