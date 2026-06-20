// Simple scroll reveal interaction
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    if (!section.classList.contains('transition-all')) {
        section.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
    }
    observer.observe(section);
});

document.querySelectorAll('section > div > div').forEach(el => {
    if (!el.classList.contains('transition-all')) {
        el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
    }
    observer.observe(el);
});

// Toggle mobile menu logic (simplified for prototype)
const mobileMenuBtn = document.querySelector('nav button.md\\:hidden');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        alert('Mobile menu navigation triggered.');
    });
}
