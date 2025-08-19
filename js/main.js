document.addEventListener('DOMContentLoaded', function() {
    // Prevent default touch behaviors
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });

    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });

    // Initialize Ruffle
    const ruffle = window.RufflePlayer.newest();
    const player = ruffle.createPlayer();
    const playerContainer = document.getElementById('ruffle-player');
    const controllerToggle = document.getElementById('controller-toggle-btn');
    const mobileControls = document.getElementById('mobile-controls');
    
    // Configure player
    player.style.width = '100%';
    player.style.height = '100%';
    
    // Load the SWF file
    playerContainer.appendChild(player);
    player.load('assets/swf/Mama_Vana.swf');
    
    // Mobile controls toggle
    controllerToggle.addEventListener('click', function() {
        mobileControls.classList.toggle('visible');
    });
    
    // Handle touch controls
    const buttons = document.querySelectorAll('.d-pad button, .action-btn');
    
    buttons.forEach(button => {
        const key = button.dataset.key;
        
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            simulateKeyEvent('keydown', key);
        });
        
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            simulateKeyEvent('keyup', key);
        });
        
        // For testing on desktop
        button.addEventListener('mousedown', () => simulateKeyEvent('keydown', key));
        button.addEventListener('mouseup', () => simulateKeyEvent('keyup', key));
    });
    
    function simulateKeyEvent(type, key) {
        const event = new KeyboardEvent(type, {
            key: key,
            code: key,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(event);
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        if (window.innerWidth < 768) {
            const rotateMessage = document.getElementById('rotate-message');
            if (window.orientation === 0) { // Portrait
                rotateMessage.style.display = 'flex';
            } else { // Landscape
                rotateMessage.style.display = 'none';
            }
        }
    });
});
