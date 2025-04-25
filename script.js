const colors = ['#e699a6', '#4fd1c5', '#f6ad55', '#a78bfa', '#f687b3'];
let colorIndex = 0;

function changeColor() {
    colorIndex = (colorIndex + 1) % colors.length;
    document.documentElement.style.setProperty('--color', colors[colorIndex]);
}

// Interaction-based color changes
document.addEventListener('click', changeColor);
document.addEventListener('scroll', () => {
    if (Math.random() > 0.7) changeColor();
});
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseover', () => {
        if (Math.random() > 0.5) changeColor();
    });
});

// Idle-based color change
let idleTimer;
function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(changeColor, 5000);
}
document.addEventListener('mousemove', resetIdleTimer);
document.addEventListener('keydown', resetIdleTimer);
resetIdleTimer();

// Typewriter Effect
setTimeout(() => {
    new Typed('.js-typer', {
        strings: [
            'Elite Academic Writing.',
            'For Top Scholars.',
            'Secure. Original.'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });
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