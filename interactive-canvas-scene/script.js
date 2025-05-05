const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');
const characterContainer = document.getElementById('character-container');

const birdSound = new Audio('forest_birds.mp3');
const windSound = new Audio('https://www.soundjay.com/nature/sounds/wind-1.mp3');
const waterSound = new Audio('https://www.soundjay.com/nature/sounds/stream-1.mp3');

let currentAudio = null;

function playSound(sound) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    currentAudio = sound;
    sound.currentTime = 0;
    sound.play().catch(e => console.error("Error playing sound:", e));
}

function stopAllAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
}

const backgrounds = {
    bg1: new Image(),
    bg2: new Image(),
    bg3: new Image()
};

backgrounds.bg1.src = 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=60';
backgrounds.bg2.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60';
backgrounds.bg3.src = 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=60';

const mainCharacter = new Image();
mainCharacter.src = 'sans.png';

const items = {
    sun: new Image(),
    garfield: new Image(),
    clouds: new Image()
};

items.sun.src = 'sun.png';
items.garfield.src = 'garfield.png';
items.clouds.src = 'clouds.png';

const state = {
    background: 'bg1',
    characterX: 400,
    characterY: 300,
    showItem1: true,
    showItem2: true,
    showItem3: true
};

document.querySelectorAll('input[name="background"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        state.background = e.target.value;
        draw();
    });
});

document.getElementById('characterXPosition').addEventListener('input', (e) => {
    state.characterX = parseInt(e.target.value);
    draw();
});

document.getElementById('characterYPosition').addEventListener('input', (e) => {
    state.characterY = parseInt(e.target.value);
    draw();
});

document.getElementById('item1').addEventListener('change', (e) => {
    state.showItem1 = e.target.checked;
    draw();
});

document.getElementById('item2').addEventListener('change', (e) => {
    state.showItem2 = e.target.checked;
    draw();
});

document.getElementById('item3').addEventListener('change', (e) => {
    state.showItem3 = e.target.checked;
    draw();
});

document.getElementById('sound1').addEventListener('click', () => {
    playSound(birdSound);
});

document.getElementById('sound2').addEventListener('click', () => {
    playSound(windSound);
});

document.getElementById('sound3').addEventListener('click', () => {
    playSound(waterSound);
});

document.getElementById('stopAudio').addEventListener('click', stopAllAudio);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const bg = backgrounds[state.background];
    if (bg && bg.complete && bg.naturalWidth !== 0) {
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    }
    
    if (state.showItem1 && items.sun.complete) {
        ctx.drawImage(items.sun, 650, 50, 100, 100);
    }
    
    if (state.showItem2 && items.garfield.complete) {
        ctx.drawImage(items.garfield, 300, 400, 120, 120);
    }
    
    if (state.showItem3 && items.clouds.complete) {
        ctx.drawImage(items.clouds, 250, 50, 200, 100);
    }
    
    if (mainCharacter.complete && mainCharacter.naturalWidth !== 0) {
        ctx.drawImage(mainCharacter, state.characterX - 30, state.characterY - 30, 60, 60);
    }
}

function loadHandler() {
    draw();
    characterContainer.style.display = 'none';
}

items.sun.onload = draw;
items.garfield.onload = draw;
items.clouds.onload = draw;
mainCharacter.onload = draw;
backgrounds.bg1.onload = draw;
backgrounds.bg2.onload = draw;
backgrounds.bg3.onload = draw;

window.addEventListener('load', loadHandler); 