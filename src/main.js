import { consultOracle } from './oracle.js';

// DOM Elements
const views = {
  idle: document.getElementById('state-idle'),
  tossing: document.getElementById('state-tossing'),
  result: document.getElementById('state-result')
};

const btnToss = document.getElementById('btn-toss');
const btnReset = document.getElementById('btn-reset');
const coins = document.querySelectorAll('.coin');
const hexVisual = document.getElementById('hexagram-visual');
const hexName = document.getElementById('hex-name');
const hexNumber = document.getElementById('hex-number');
const hexComp = document.getElementById('hex-comp');
const hexDesc1 = document.getElementById('hex-desc-1');
const hexDesc2 = document.getElementById('hex-desc-2');
const poemLine = document.getElementById('moving-line-poem');

/**
 * Switches the current visible section
 */
function switchView(viewName) {
  Object.keys(views).forEach(key => {
    views[key].classList.toggle('active', key === viewName);
  });
}

/**
 * Handles the oracle consultation process
 */
async function handleConsultation() {
  // 1. Switch to tossing view
  switchView('tossing');
  
  // 2. Start coin animation
  coins.forEach(coin => coin.classList.add('flipping'));
  
  // 3. Wait for animation (~2.5 seconds for dramatic effect)
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  // 4. Get oracle result
  const result = consultOracle();
  console.log('Oracle Result:', result);
  
  // 5. Update UI with results
  updateResultUI(result);
  
  // 6. Stop animation and switch view
  coins.forEach(coin => coin.classList.remove('flipping'));
  switchView('result');
}

/**
 * Updates the result screen with hexagram data
 */
function updateResultUI(result) {
  const { hexagram, movingLine, lines } = result;
  
  // Clear and inject lines (bottom to top)
  hexVisual.innerHTML = '';
  lines.forEach((type, index) => {
    const lineNum = index + 1;
    const lineEl = document.createElement('div');
    lineEl.className = 'hex-line';
    if (type === 0) lineEl.classList.add('yin');
    if (lineNum === movingLine) lineEl.classList.add('moving');
    
    // Add staggered animation delay
    lineEl.style.animationDelay = `${index * 0.1}s`;
    
    hexVisual.appendChild(lineEl);
  });
  
  // Basic info
  hexName.textContent = hexagram.name;
  hexNumber.textContent = `#${hexagram.number}`;
  hexComp.textContent = hexagram.composition;
  
  // Description (verbatim from Crowley)
  hexDesc1.textContent = hexagram.description[0] || '';
  hexDesc2.textContent = hexagram.description[1] || '';
  
  // The full poem with highlighting for the moving line
  poemLine.innerHTML = '';
  hexagram.poem.forEach((text, index) => {
    const isMoving = (index + 1) === movingLine;
    const lEl = document.createElement('div');
    lEl.className = 'poem-line-item';
    if (isMoving) lEl.classList.add('active');
    lEl.textContent = text;
    poemLine.appendChild(lEl);
  });
}

// Event Listeners
btnToss.addEventListener('click', handleConsultation);
btnReset.addEventListener('click', () => switchView('idle'));

// Initial State
switchView('idle');
console.log('The Yi King Oracle initialized.');
