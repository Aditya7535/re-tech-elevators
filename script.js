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

// Mobile Menu Logic
window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobile-menu');
    const btnIcon = document.querySelector('#mobile-menu-btn span') || document.querySelector('nav button.md\\:hidden span');
    
    if (menu) {
        if (menu.classList.contains('-translate-y-full')) {
            menu.classList.remove('-translate-y-full', 'opacity-0', '-z-10', 'pointer-events-none');
            menu.classList.add('translate-y-0', 'opacity-100', 'z-40');
            if (btnIcon) btnIcon.textContent = 'close';
        } else {
            closeMobileMenu();
        }
    }
}

window.closeMobileMenu = function() {
    const menu = document.getElementById('mobile-menu');
    const btnIcon = document.querySelector('#mobile-menu-btn span') || document.querySelector('nav button.md\\:hidden span');
    
    if (menu && !menu.classList.contains('-translate-y-full')) {
        menu.classList.remove('translate-y-0', 'opacity-100', 'z-40');
        menu.classList.add('-translate-y-full', 'opacity-0', '-z-10', 'pointer-events-none');
        if (btnIcon) btnIcon.textContent = 'menu';
    }
}

const mobileMenuBtn = document.getElementById('mobile-menu-btn') || document.querySelector('nav button.md\\:hidden');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// --- Fade Page Transition Logic ---
function fadeOutOverlay() {
    const overlay = document.getElementById('fade-overlay');
    if(overlay) {
        overlay.classList.remove('opacity-100');
        overlay.classList.add('opacity-0');
        overlay.style.pointerEvents = 'none';
    }
}

function fadeInOverlay(callback) {
    const overlay = document.getElementById('fade-overlay');
    if(overlay) {
        overlay.style.pointerEvents = 'auto';
        overlay.classList.remove('opacity-0');
        overlay.classList.add('opacity-100');
        setTimeout(callback, 500); // Wait for transition duration
    } else {
        callback();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Reveal the page
    setTimeout(fadeOutOverlay, 50);
});

// Handle BFCache (when user navigates back)
window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
        fadeOutOverlay();
    }
});

// Intercept clicks on internal links
document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetUrl = link.getAttribute('href');
        
        // Ensure it's a valid internal link
        if (targetUrl && 
            !targetUrl.startsWith('#') && 
            targetUrl !== '#' && 
            !targetUrl.startsWith('http') && 
            !targetUrl.startsWith('mailto:') && 
            !targetUrl.startsWith('tel:') && 
            !link.hasAttribute('target')) {
            
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            const targetPath = targetUrl.split('#')[0];
            
            // If navigating to a hash on the same page, let normal anchor link behavior happen
            if(targetPath === currentPath || targetPath === '') {
                return;
            }

            e.preventDefault();
            fadeInOverlay(() => {
                window.location.href = targetUrl;
            });
        }
    });
});

// Engineer Modal Logic
window.openEngineerModal = function() {
    const modal = document.getElementById('engineer-modal');
    const content = document.getElementById('engineer-modal-content');
    if(modal && content) {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
    }
}

window.closeEngineerModal = function() {
    const modal = document.getElementById('engineer-modal');
    const content = document.getElementById('engineer-modal-content');
    if(modal && content) {
        modal.classList.add('opacity-0', 'pointer-events-none');
        content.classList.remove('scale-100');
        content.classList.add('scale-95');
    }
}

// AI Chatbot Logic
window.openChatBot = function() {
    closeEngineerModal();
    const chatbot = document.getElementById('ai-chatbot');
    if(chatbot) {
        chatbot.classList.remove('opacity-0', 'translate-y-8', 'pointer-events-none');
    }
}

window.closeChatBot = function() {
    const chatbot = document.getElementById('ai-chatbot');
    if(chatbot) {
        chatbot.classList.add('opacity-0', 'translate-y-8', 'pointer-events-none');
    }
}

window.handleChatSubmit = function(e) {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;

    const messagesContainer = document.getElementById('chat-messages');
    
    // Add user message
    messagesContainer.innerHTML += `
        <div class="flex gap-3 justify-end">
            <div class="bg-primary/20 p-3 rounded-2xl rounded-tr-none text-white text-sm border border-primary/30">
                ${message}
            </div>
        </div>
    `;
    input.value = '';
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simulate AI response
    setTimeout(() => {
        messagesContainer.innerHTML += `
            <div class="flex gap-3">
                <div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                    <span class="material-symbols-outlined text-white text-[12px]">smart_toy</span>
                </div>
                <div class="bg-white/10 p-3 rounded-2xl rounded-tl-none text-white text-sm border border-white/5 shadow-sm">
                    Thank you. A specialist will review your requirement for "${message}". Please provide your contact number so we can reach out directly.
                </div>
            </div>
        `;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
}

// Bind "Speak to an Engineer" buttons
document.addEventListener('DOMContentLoaded', () => {
    const speakBtns = document.querySelectorAll('a');
    speakBtns.forEach(btn => {
        if(btn.textContent.includes('Speak to an Engineer')) {
            btn.removeAttribute('href');
            btn.style.cursor = 'pointer';
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openEngineerModal();
            });
        }
    });
});
