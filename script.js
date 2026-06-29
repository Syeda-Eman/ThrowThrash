// Map your images from image_e6e3bc.png to their correct categories
const garbageItems = [
    { src: 'apple.png', type: 'organic' },
    { src: 'fish.png', type: 'organic' },
    { src: 'orange.png', type: 'organic' },
    { src: 'book.png', type: 'paper' },
    { src: 'newspaper.png', type: 'paper' },
    { src: 'paper.png', type: 'paper' },
    { src: 'scramblepaper.png', type: 'paper' },
    { src: 'bottle.png', type: 'plastic' },
    // Grouping the soda cans into plastic/recycling for now
    { src: 'red.png', type: 'plastic' },
    { src: 'blue.png', type: 'plastic' },
    { src: 'green.png', type: 'plastic' },
    { src: 'black.png', type: 'plastic' }
];

let score = 0;
const scoreDisplay = document.getElementById('score');
const garbageZone = document.getElementById('garbageZone');
const bins = document.querySelectorAll('.bin');

// Initialize Game
function initGame() {
    garbageZone.innerHTML = '';
    // Shuffle and spawn items
    const shuffledItems = [...garbageItems].sort(() => 0.5 - Math.random());
    
    // Spawn 4 random items to keep the screen clear
    shuffledItems.slice(0, 4).forEach((item, index) => {
        const img = document.createElement('img');
        img.src = item.src;
        img.classList.add('garbage-item');
        img.draggable = true;
        img.id = `garbage-${index}`;
        img.dataset.type = item.type;

        // Drag Start Event
        img.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
        });

        garbageZone.appendChild(img);
    });
}

// Setup Bin Drop Zones
bins.forEach(bin => {
    bin.addEventListener('dragover', (e) => {
        e.preventDefault(); // Necessary to allow dropping
        bin.classList.add('hovered');
    });

    bin.addEventListener('dragleave', () => {
        bin.classList.remove('hovered');
    });

    bin.addEventListener('drop', (e) => {
        e.preventDefault();
        bin.classList.remove('hovered');
        
        const itemId = e.dataTransfer.getData('text/plain');
        const draggedItem = document.getElementById(itemId);
        
        if (!draggedItem) return;

        const itemType = draggedItem.dataset.type;
        const binType = bin.dataset.type;

        // Check matching rule
        if (itemType === binType) {
            score += 1;
            draggedItem.remove(); // Remove item from play area
        } else {
            score -= 1; // Lose a point on wrong matches
        }

        scoreDisplay.textContent = score;

        // Respawn items if the zone is completely empty
        if (garbageZone.children.length === 0) {
            setTimeout(initGame, 500);
        }
    });
});

// Start the game loop
initGame();