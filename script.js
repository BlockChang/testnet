const colors = [
    '#f9d1d1', // Pastel Pink
    '#d1e8f9', // Pastel Blue
    '#e2d1f9', // Pastel Purple
    '#f9f3d1', // Pastel Yellow
    '#d1f9e2', // Pastel Green
    '#f9e2d1', // Pastel Orange
    '#d1f9f9'  // Pastel Cyan
];

let colorIndex = 0;

function changeColor() {
    const newColor = colors[colorIndex];
    // Change the content section background color
    document.querySelector('.content-section').style.backgroundColor = newColor;
    // Set a CSS variable for the hero text and logo to match
    document.body.style.setProperty('--current-color', newColor);
    console.log(`Content section color changed to: ${newColor}`);
    colorIndex = (colorIndex + 1) % colors.length;
}

// Change colors every 3 seconds to allow the transition to complete
setInterval(changeColor, 3000);

const typewriter = new Typed('.js-typer', {
    strings: [
        'BRILLANZ provides elite business school assignment help.',
        '100% original, Turnitin-verified work.',
        'Secure crypto payments.'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1000,
    startDelay: 500,
    loop: true,
    onStart: () => console.log('Typewriter initialized successfully')
});

document.querySelectorAll('.view-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        const targetList = button.parentElement.previousElementSibling;
        targetList.classList.toggle('expanded');
        button.textContent = targetList.classList.contains('expanded') ? 'View Less' : 'View More';
    });
});

const form = document.getElementById('support-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const deadline = new Date(document.getElementById('deadline').value);
    const today = new Date();
    const error = document.querySelector('.form-error');
    
    if (deadline < today) {
        error.classList.add('is-active');
        return;
    }
    
    error.classList.remove('is-active');
    const academicLevel = document.getElementById('academic-level').value;
    const supportType = document.getElementById('support-type').value;
    const details = document.getElementById('details').value;
    
    const message = `
        New support request:
        - Academic Level: ${academicLevel}
        - Support Type: ${supportType}
        - Deadline: ${deadline.toISOString().split('T')[0]}
        - Details: ${details || 'None provided'}
    `.trim();
    
    window.open(`https://t.me/stevebendict?text=${encodeURIComponent(message)}`);
});
