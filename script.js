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

// Change colors every 10 seconds to allow the transition to complete
setInterval(changeColor, 10000);

const typewriter = new Typed('.js-typer', {
    strings: [
        'BRILLANZ provides elite business school assignment help.',
        '100% original, Turnitin-verified work.',
        'Secure crypto payments.'
    ],
    typeSpeed: 30,
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
    
    const telegramUrl = `https://t.me/stevebendict?text=${encodeURIComponent(message)}`;
    console.log('Telegram URL:', telegramUrl); // Debug the URL
    
    try {
        const telegramWindow = window.open(telegramUrl, '_blank');
        if (!telegramWindow) {
            throw new Error('Popup blocked or failed to open');
        }
    } catch (err) {
        console.error('Failed to open Telegram:', err);
        // Fallback: Display the link for the user to click manually
        const fallbackMessage = document.createElement('p');
        fallbackMessage.innerHTML = `Unable to open Telegram automatically. Please <a href="${telegramUrl}" target="_blank" class="underline">click here</a> to send your request.`;
        form.appendChild(fallbackMessage);
    }
});

// Intersection Observer for auto-highlighting sections when centered in viewport
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.highlightable-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const section = entry.target;
            if (entry.isIntersecting) {
                // Check if the section's center is within the middle 50% of the viewport
                const rect = section.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const sectionCenter = rect.top + rect.height / 2;
                const viewportCenterStart = viewportHeight * 0.25; // 25% from top
                const viewportCenterEnd = viewportHeight * 0.75;   // 75% from top

                if (sectionCenter >= viewportCenterStart && sectionCenter <= viewportCenterEnd) {
                    section.classList.add('is-highlighted');
                } else {
                    section.classList.remove('is-highlighted');
                }
            }
        });
    }, {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] // Multiple thresholds for smooth detection
    });

    sections.forEach(section => observer.observe(section));
});
