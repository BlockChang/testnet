const colors = ['#e699a6', '#4fd1c5', '#f6ad55', '#a78bfa', '#f687b3'];
let colorIndex = 0;

function changeColor() {
    colorIndex = (colorIndex + 1) % colors.length;
    document.documentElement.style.setProperty('--color', colors[colorIndex]);
    console.log('Color changed to:', colors[colorIndex]);
}

// Continuous color change every 5 seconds
setInterval(changeColor, 5000);

// Fallback for viewport height adjustment
function adjustContentMargin() {
    const heroHeight = window.innerHeight;
    const contentSection = document.querySelector('.content-section');
    contentSection.style.marginTop = `calc(${heroHeight}px - 84px)`;
}
window.addEventListener('load', adjustContentMargin);
window.addEventListener('resize', adjustContentMargin);

// Typewriter Effect (single string, no loop)
setTimeout(() => {
    try {
        new Typed('.js-typer', {
            strings: ['BRILLANZ crafts unparalleled academic solutions for the world’s brightest minds.'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: false,
            showCursor: true,
            cursorChar: '|'
        });
        console.log('Typewriter initialized successfully');
    } catch (error) {
        console.error('Typewriter initialization failed:', error);
    }
}, 1000);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Support Form
const form = document.querySelector('#support-form');
const deadlineInput = document.querySelector('#deadline');
deadlineInput.addEventListener('change', () => {
    const today = new Date().toISOString().split('T')[0];
    const error = deadlineInput.nextElementSibling;
    if (deadlineInput.value < today) {
        error.classList.add('is-active');
        deadlineInput.setCustomValidity('Please select a future date.');
    } else {
        error.classList.remove('is-active');
        deadlineInput.setCustomValidity('');
    }
});

form.addEventListener('submit', e => {
    e.preventDefault();
    const level = document.querySelector('#academic-level').value;
    const type = document.querySelector('#support-type').value;
    const deadline = deadlineInput.value;
    const details = document.querySelector('#details').value;
    const message = encodeURIComponent(`Support Request\nLevel: ${level}\nType: ${type}\nDeadline: ${deadline}\nDetails: ${details}`);
    window.open(`https://t.me/stevebendict?text=${message}`, '_blank');
    form.reset();
    gtag('event', 'form_submission', { 'form_id': 'support-form' });
});

// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX', { 'anonymize_ip': true });
