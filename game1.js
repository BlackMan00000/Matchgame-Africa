    document.addEventListener('DOMContentLoaded', initializeGame);

    // Arrays for animals and statements
    const animals = [
        { id: 'lion', name: 'Lion', statement: 'Is the king of the jungle', imgSrc: 'https://matt.moses.name/matchgame/images/lion.png' },
        { id: 'elephant', name: 'Elephant', statement: 'Has a trunk', imgSrc: 'https://matt.moses.name/matchgame/images/elephant.png' },
        { id: 'dolphin', name: 'Dolphin', statement: 'Can swim in the ocean', imgSrc: 'https://matt.moses.name/matchgame/images/dolphin.png' },
        { id: 'penguin', name: 'Penguin', statement: 'Lives in cold climates', imgSrc: 'https://matt.moses.name/matchgame/images/penguin.png' },
        // Add more animals and statements as needed
    ];
    
       const possibleColors = [
        'hsla(60, 100%, 60%, .7)',   // yellow
        'hsla(30, 100%, 60%, .7)',   // orange
        'hsla(240, 100%, 60%, .7)',  // blue
        'hsla(120, 100%, 60%, .7)',  // green
        'hsla(270, 100%, 60%, .7)'   // purple
];

    const incorrectStatements = [
        'Can fly',
        'Makes very disturbing noises with its tail'// Incorrect statement that doesn't match any animal
        // Add more incorrect statements as needed
    ];

    let usedStatements = []; // To track used statements
    let correctMatchCount = 0; // To track number of correct matches
    let draggedItem = null; // Track the item being dragged
    let touchClone = null; // Clone of the dragged item for touch
    let colorAssignments = {}; // To store color assignments for each animal

    function initializeGame() {
        correctMatchCount = 0; // Reset correct match count
        colorAssignments = {}; // Reset color assignment
        populateGameItems();
        setupEventListeners();
    }

    function populateGameItems() {
        const draggableContainer = document.getElementById('draggable-container');
        const droppableContainer = document.getElementById('droppable-container');

        // Clear previous items
        draggableContainer.innerHTML = '';
        droppableContainer.innerHTML = '';

        // Shuffle and select 4 random animals
        const selectedAnimals = shuffleArray([...animals]).slice(0, 4);

        // Shuffle possible colors and assign them to animals
        const shuffledColors = shuffleArray([...possibleColors]).slice(0, selectedAnimals.length);
        selectedAnimals.forEach((animal, index) => {
        colorAssignments[animal.id] = shuffledColors[index];
    });

        // Populate draggable items with images
        selectedAnimals.forEach(animal => {
            const animalImg = document.createElement('img');
            animalImg.src = animal.imgSrc;
            animalImg.alt = animal.name;
            animalImg.id = animal.id;
            animalImg.classList.add('draggable');
            animalImg.setAttribute('draggable', true);
            animalImg.style.width = '260px'; // Set a width for the images
            draggableContainer.appendChild(animalImg);
        });

        // Collect and shuffle statements, ensuring no repeats until all are used
        const statements = selectedAnimals.map(a => a.statement);
        if (usedStatements.length + statements.length > animals.length) {
            usedStatements = []; // Reset if all statements have been shown
        }
        const uniqueStatements = statements.filter(s => !usedStatements.includes(s));
        usedStatements.push(...uniqueStatements);

        // Add one incorrect statement randomly
        const incorrect = shuffleArray(incorrectStatements.filter(i => !usedStatements.includes(i)))[0];
        usedStatements.push(incorrect);

        const allStatements = shuffleArray([...uniqueStatements, incorrect]);

        // Populate droppable items with statements
        allStatements.forEach(statement => {
            const statementDiv = document.createElement('div');
            statementDiv.textContent = statement;
            statementDiv.classList.add('droppable');
            droppableContainer.appendChild(statementDiv);
        });
    }

function setupEventListeners() {
    // Event listeners for draggable items
    document.querySelectorAll('.draggable').forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);

        // Touch events for draggable items
        item.addEventListener('touchstart', handleTouchStart);
        item.addEventListener('touchmove', handleTouchMove);
        item.addEventListener('touchend', handleTouchEnd);
    });

    // Event listeners for droppable containers
    document.querySelectorAll('.droppable').forEach(target => {
        target.addEventListener('dragover', handleDragOver);
        target.addEventListener('drop', handleDrop);
    });

    // Play Again button event listener
    document.getElementById('play-again').addEventListener('click', initializeGame);
}

function handleDragStart(e) {
    draggedItem = this;
    this.style.opacity = '0.5';
}

function handleDragEnd(e) {
    this.style.opacity = '';
    draggedItem = null;
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    if (!draggedItem) return;

    const correctMatch = checkMatch(draggedItem, this.textContent);

    if (!correctMatch) {
        flashRed(this, draggedItem);
        document.getElementById('incorrect-sound').play(); // Play incorrect sound
    } else {
        const assignedColor = colorAssignments[draggedItem.id];
        this.style.backgroundColor = assignedColor;
        draggedItem.style.backgroundColor = assignedColor;
        document.getElementById('correct-sound').play(); // Play correct sound
        correctMatchCount++; // Increment correct match count
        disableMatchedItem(draggedItem); // Disable the matched item
        if (correctMatchCount === 4) { // Check if all matches are correct
            document.getElementById('hooray-sound').play(); // Play hooray sound
        }
    }

    draggedItem = null; // Reset the draggedItem after the drop
}

// Touch event handlers
function handleTouchStart(e) {
    e.preventDefault();
    draggedItem = this;
    this.style.opacity = '1';

    // Create a clone of the dragged item
    touchClone = this.cloneNode(true);
    touchClone.style.position = 'absolute';
    touchClone.style.pointerEvents = 'none'; // Ignore pointer events on the clone
    touchClone.style.opacity = '1';
    document.body.appendChild(touchClone);
}

function handleTouchMove(e) {
    e.preventDefault();
    if (!touchClone) return;
    const touch = e.touches[0];
    touchClone.style.left = `${touch.pageX - 50}px`; // Adjust the position according to your needs
    touchClone.style.top = `${touch.pageY - 50}px`;
}

function handleTouchEnd(e) {
    e.preventDefault();
    this.style.opacity = '';

    if (touchClone) {
        document.body.removeChild(touchClone);
        touchClone = null;
    }

    // Trigger the drop event manually
    const touch = e.changedTouches[0];
    const target = document.elementFromPoint(touch.pageX, touch.pageY);
    if (target && target.classList.contains('droppable')) {
        handleDrop.call(target, e);
    }
}
function checkMatch(draggable, statement) {
    // Find the animal object that matches the draggable id
    const animal = animals.find(a => a.id === draggable.id);
    return animal && animal.statement === statement;
}

    function flashRed(target, item) {
        // Temporarily flash the background color to red for both the target and the item
        const originalTargetBg = target.style.backgroundColor;
        const originalItemBg = item.style.backgroundColor;

        target.style.backgroundColor = 'red';
        item.style.backgroundColor = 'red';

        setTimeout(() => {
            target.style.backgroundColor = originalTargetBg;
            item.style.backgroundColor = originalItemBg;
        }, 500); // Duration of the flash effect in milliseconds
    }

function disableMatchedItem(item) {
    // Remove event listeners and add a class to indicate the item is disabled
    item.removeEventListener('dragstart', handleDragStart);
    item.removeEventListener('dragend', handleDragEnd);
    item.removeEventListener('touchstart', handleTouchStart);
    item.removeEventListener('touchmove', handleTouchMove);
    item.removeEventListener('touchend', handleTouchEnd);
    item.classList.add('disabled'); // Add a class for styling
    item.style.opacity = '1'; // Visually indicate the item is disabled
}

    // Function to shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }
