const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    deferredPrompt = event
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    console.log('button clicked')
    deferredPrompt.prompt()
    deferredPrompt.userChoice
        .then((choiceResult) => {
             if (choiceResult.outcome === 'accepted') {
                 console.log('User installed')
             } else {
                 console.log('User did not install')
             }
             deferredPrompt = null
            
        })
    butInstall.classList.toggle('hidden', true)

});

    
// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null
});
