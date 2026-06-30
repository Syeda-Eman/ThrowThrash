const garbageItems=[
    {src:'apple.png', name:'Apple', type:'Organic'},
    {src:'fish.png', name:'Fish', type:'Organic'},
    {src:'orange.png', name:'Orange', type:'Organic'},
    {src:'bottle.png', name:'Bottle', type:'Plastic'},
    {src:'red.png', name:'Red Can', type:'Plastic'},
    {src:'blue.png', name:'Blue Can', type:'Plastic'},
    {src:'green.png', name:'Green Can', type:'Plastic'},
    {src:'black.png', name:'Black Can', type:'Plastic'},
    {src:'paper.png', name:'Paper', type:'Paper'},
    {src:'newspaper.png', name:'Newspaper', type:'Paper'},
    {src:'scramblepaper.png', name:'Scrambled Paper', type:'Paper'},
    {src:'book.png', name:'Book', type:'Paper'},
];
let score = 0;
const scoreDisplay=document.getElementById('score');
const garbageZone=document.getElementById('garbageZone');
const bins = document.querySelectorAll('.bin');

function initGame() {
    garbageZone.innerHTML = '';

    const shuffledItems = [...garbageItems].sort(() => Math.random() - 0.5);
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
        bin.classList.remove('hovered')
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
            score+=1;
            draggedItem.remove();
        } else {
            score-=1;
        }
        scoreDisplay.textContent = score;
        if (garbageZone.children.length === 0) {
            setTimeout(initGame, 500);
        }
    });
});
initGame();      
