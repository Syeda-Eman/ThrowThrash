const garbageItems = [
    { src: 'imgs/apple.png', type: 'organic' },
    { src: 'imgs/fish.png', type: 'organic' },
    { src: 'imgs/orange.png', type: 'organic' },
    { src: 'imgs/book.png', type: 'paper' },
    { src: 'imgs/newspaper.png', type: 'paper' },
    { src: 'imgs/paper.png', type: 'paper' },
    { src: 'imgs/scramblepaper.png', type: 'paper' },
    { src: 'imgs/bottle.png', type: 'plastic' },
    { src: 'imgs/red.png', type: 'plastic' },
    { src: 'imgs/blue.png', type: 'plastic' },
    { src: 'imgs/green.png', type: 'plastic' },
    { src: 'imgs/black.png', type: 'plastic' }
];
let score = 0;
const scoreDisplay=document.getElementById('score');
const garbageZone=document.getElementById('garbageZone');
const bins = document.querySelectorAll('.bin');

function initGame() {
    garbageZone.innerHTML = '';

    const shuffledItems = [...garbageItems].sort(() => 0.5 - Math.random());
    shuffledItems.slice(0, 4).forEach((item, index) => {
        const img = document.createElement('img');
        img.src = item.src;
        img.classList.add('garbage-item');
        img.draggable = true;
        img.id = `garbage-${index}`;
        img.dataset.type = item.type;
        img.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
        });
        garbageZone.appendChild(img);
    });
}
bins.forEach(bin => {
    bin.addEventListener('dragover', (e) => {
        e.preventDefault();
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
        if (itemType === binType) {
            score += 1;
            draggedItem.remove();
        } else {
            score -= 1;
        }
        scoreDisplay.textContent = score;
        if (garbageZone.children.length === 0) {
            setTimeout(initGame, 500);
        }
    });
});

initGame();     
