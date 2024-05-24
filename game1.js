document.addEventListener('DOMContentLoaded', initializeGame);

    // Arrays for animals and statements
    const animals = [
        { id: 'aardvark', name: 'Aardvark', statement: 'Have teeth without enamel or roots', imgSrc: 'https://matt.moses.name/matchgame/images/Aardvark.png' },
        { id: 'aardwolf', name: 'Aardwolf', statement: 'Primarily eat termites, not meat', imgSrc: 'https://matt.moses.name/matchgame/images/Aardwolf.png' },
        { id: 'batearedfox', name: 'BatEaredFox', statement: 'Have 48 teeth', imgSrc: 'https://matt.moses.name/matchgame/images/BatearedFox.png' },
        { id: 'blackwildebeest', name: 'BlackWildeBeest', statement: 'Have white, horse-like tails', imgSrc: 'https://matt.moses.name/matchgame/images/BlackWildebeest.png' },
        { id: 'bluecrane', name: 'BlueCrane', statement: 'Perform intricate mating dances', imgSrc: 'https://matt.moses.name/matchgame/images/BlueCrane.png' },
        { id: 'bongo', name: 'Bongo', statement: 'Have spiral-shaped horns', imgSrc: 'https://matt.moses.name/matchgame/images/Bongo.png' },
        { id: 'bushbuck', name: 'Bushbuck', statement: 'Solitary and nocturnal', imgSrc: 'https://matt.moses.name/matchgame/images/Bushbuck.png' },
        { id: 'capebuffalo', name: 'CapeBuffalo', statement: 'Have unpredictable, aggressive behavior', imgSrc: 'https://matt.moses.name/matchgame/images/CapeBuffalo.png' },
        { id: 'civet', name: 'Civet', statement: 'Produce musk used in perfumes', imgSrc: 'https://matt.moses.name/matchgame/images/Civet.png' },
        { id: 'commonbaboon', name: 'CommonBaboon', statement: 'Have cheek pouches for food', imgSrc: 'https://matt.moses.name/matchgame/images/CommonBaboon.png' },
        { id: 'dikdik', name: 'DikDik', statement: 'Mark territory with tears', imgSrc: 'https://matt.moses.name/matchgame/images/DikDik.png' },
        { id: 'elandt', name: 'Eland', statement: 'Loud clicking knee sounds', imgSrc: 'https://matt.moses.name/matchgame/images/Eland.png' },
        { id: 'elephant', name: 'Elephant', statement: 'Communicate using infrasound vibration', imgSrc: 'https://matt.moses.name/matchgame/images/Elephant.png' },
        { id: 'gerenuk', name: 'Gerenuk', statement: 'Stand on hind legs to eat', imgSrc: 'https://matt.moses.name/matchgame/images/Gerenuk.png' },
        { id: 'giraffe', name: 'Giraffe', statement: 'Highest blood pressure', imgSrc: 'https://matt.moses.name/matchgame/images/Giraffe.png' },
        { id: 'greaterkudu', name: 'GreaterKudu', statement: 'Jump higher than gazelles', imgSrc: 'https://matt.moses.name/matchgame/images/GreaterKudu.png' },
        { id: 'greycrownedcrane', name: 'GreyCrownedCrane', statement: 'Dance to communicate', imgSrc: 'https://matt.moses.name/matchgame/images/GreyCrownedCrane.png' },
        { id: 'greyrhebok', name: 'GreyRhebok', statement: 'Adept at mountain climbing', imgSrc: 'https://matt.moses.name/matchgame/images/GreyRhebok.png' },
        { id: 'hartebeest', name: 'Hartebeest', statement: 'Oddly shaped, elongated heads', imgSrc: 'https://matt.moses.name/matchgame/images/Hartebeest.png' },
        { id: 'impala', name: 'Impala', statement: 'Can leap over 10 meters', imgSrc: 'https://matt.moses.name/matchgame/images/Impala.png' },
        { id: 'koribustard', name: 'KoriBustard', statement: 'Heaviest flying bird', imgSrc: 'https://matt.moses.name/matchgame/images/KoriBustard.png' },
        { id: 'leopard', name: 'Leopard', statement: 'Carry prey up trees', imgSrc: 'https://matt.moses.name/matchgame/images/Leopard.png' },
        { id: 'lion', name: 'Lion', statement: 'Live in groups called prides', imgSrc: 'https://matt.moses.name/matchgame/images/Lion.png' },
        { id: 'mariboustork', name: 'MaribouStork', statement: 'Have air sacs on their neck', imgSrc: 'https://matt.moses.name/matchgame/images/MaribouStork.png' },
        { id: 'martialeagle', name: 'MartialEagle', statement: 'exceptionally powerful talons', imgSrc: 'https://matt.moses.name/matchgame/images/MartialEagle.png' },
        { id: 'nyassawildebeest', name: 'NyassaWildebeest', statement: 'Distinctive white cheek stripes', imgSrc: 'https://matt.moses.name/matchgame/images/NyassaWildebeest.png' },
        { id: 'reddeer', name: 'RedDeer', statement: 'Extinct in the wild', imgSrc: 'https://matt.moses.name/matchgame/images/RedDeer.png' },
        { id: 'redlechwe', name: 'RedLechwe', statement: 'Excellent swamp swimmers', imgSrc: 'https://matt.moses.name/matchgame/images/RedLechwe.png' },
        { id: 'secratarybird', name: 'SecrataryBird', statement: 'Hunt snakes by stomping', imgSrc: 'https://matt.moses.name/matchgame/images/SecrataryBird.png' },
        { id: 'sgroundhornbill', name: 'SGroundHornbill', statement: 'Distinctive booming calls', imgSrc: 'https://matt.moses.name/matchgame/images/SGroundHornbill.png' },
        { id: 'sitatunga', name: 'Sitatunga', statement: 'Splayed hooves for swamps', imgSrc: 'https://matt.moses.name/matchgame/images/Sitatunga.png' },
        { id: 'stripedhyena', name: 'StripedHyena', statement: 'Can play dead convincingly', imgSrc: 'https://matt.moses.name/matchgame/images/StripedHyena.png' },
        { id: 'thompsonsgazelle', name: 'ThompsonsGazelle', statement: 'Perform high jumps ("pronking")', imgSrc: 'https://matt.moses.name/matchgame/images/ThompsonsGazelle.png' },
        { id: 'waterbuck', name: 'Waterbuck', statement: 'Secrete a waterproof substance', imgSrc: 'https://matt.moses.name/matchgame/images/Waterbuck.png' },
        { id: 'whiterhino', name: 'WhiteRhino', statement: 'Have square-shaped lips', imgSrc: 'https://matt.moses.name/matchgame/images/WhiteRhino.png' },
        { id: 'zebras', name: 'Zebras', statement: 'Stripes deter flies', imgSrc: 'https://matt.moses.name/matchgame/images/Zebras.png' },
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
        'Can fly backwards',
        'Makes very disturbing noises with its tail',
        'Produces a sticky coating',
        'Makes no noises',
        'Makes human-sounding vocals',
        'Protects other species young',
        'Eats sugar cane',
        'Climbs to the very top of trees',
        'Runs away from prey',
        'Is scared of termites',
        'Lives under mud',
        'Carries young on backs',
        'Can skip to save energy',
        'Jumps over 80 feet',
        'Has no tail',
        'Sings to find prey',
        'Can hunt prey for months',
        'Finds food with tools',
        'Runs faster than a Cheetah',
        'Eats primarily worms',
        'Enjoys a desert stroll',
        'Likes to sunbathe',
        'Prefers living in water',
        'Wishes it were human',
        'Wallows in swamps everyday',
        'Chooses its mate by body size',
        'Has bright orange fur when born',
        'Dwells on uncertainty',
        'Does not like being stared at',
        'Has misgivings about sharing',
        'Hairless when born',
        'Leaves no trace of where its been',
        'Is a master of disguise',
        'Walks all day long',
        'Sleeps only at night',
        'Stares at everyone and everything',
        'Has one very sharp tooth',
        // Incorrect statement that doesn't match any animal
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
