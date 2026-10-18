// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Share functionality
document.addEventListener('DOMContentLoaded', function() {
    const shareBtn = document.querySelector('.share-btn');
    const shareDropdown = document.querySelector('.share-dropdown');

    // Toggle share dropdown
    shareBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        shareDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!shareBtn.contains(e.target) && !shareDropdown.contains(e.target)) {
            shareDropdown.classList.remove('show');
        }
    });

    // Add share option event listeners (persona and roadmap pages use ids instead of onclick)
    const shareHandlers = {
        emailShare: shareViaEmail,
        whatsappShare: shareViaWhatsApp,
        copyLink: copyLink
    };
    Object.entries(shareHandlers).forEach(([id, handler]) => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                handler();
            });
        }
    });
});

// Share functions
function shareViaEmail() {
    const subject = 'Check out Chinmay Shandilya\'s Portfolio';
    const body = 'Hi! I found this amazing portfolio that I thought you might be interested in:\n\n' + 
                window.location.href + '\n\n' +
                'Chinmay Shandilya - Building and scaling high-impact journeys in India\'s consumer tech';
    
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
    
    // Close dropdown
    document.querySelector('.share-dropdown').classList.remove('show');
}

function shareViaWhatsApp() {
    const text = 'Check out Chinmay Shandilya\'s Portfolio - Building and scaling high-impact journeys in India\'s consumer tech: ' + window.location.href;
    
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappLink, '_blank');
    
    // Close dropdown
    document.querySelector('.share-dropdown').classList.remove('show');
}

function copyLink() {
    const currentUrl = window.location.href;
    
    // Use the modern Clipboard API if available
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(currentUrl).then(() => {
            showCopySuccess();
        }).catch(() => {
            // Fallback to older method if Clipboard API fails
            fallbackCopyTextToClipboard(currentUrl);
        });
    } else {
        // Fallback for older browsers or non-secure contexts
        fallbackCopyTextToClipboard(currentUrl);
    }
    
    // Close dropdown
    const shareDropdown = document.querySelector('.share-dropdown');
    if (shareDropdown) {
        shareDropdown.classList.remove('show');
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        showCopyError();
    }
    
    document.body.removeChild(textArea);
}

function showCopySuccess() {
    // Create a temporary success message
    const successMsg = document.createElement('div');
    successMsg.textContent = 'Link copied to clipboard!';
    successMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 5px;
        z-index: 10000;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(successMsg);
    
    // Remove the message after 3 seconds
    setTimeout(() => {
        successMsg.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (successMsg.parentNode) {
                successMsg.parentNode.removeChild(successMsg);
            }
        }, 300);
    }, 3000);
}

function showCopyError() {
    // Create a temporary error message
    const errorMsg = document.createElement('div');
    errorMsg.textContent = 'Failed to copy link. Please try again.';
    errorMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f44336;
        color: white;
        padding: 12px 20px;
        border-radius: 5px;
        z-index: 10000;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(errorMsg);
    
    // Remove the message after 3 seconds
    setTimeout(() => {
        errorMsg.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (errorMsg.parentNode) {
                errorMsg.parentNode.removeChild(errorMsg);
            }
        }, 300);
    }, 3000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all sections for animation (except why-portfolio section, persona page sections, and roadmap page)
document.querySelectorAll('section').forEach(section => {
    if (!section.id || (section.id !== 'why-portfolio' && !section.classList.contains('persona-page') && !section.classList.contains('roadmap-page'))) {
        observer.observe(section);
    }
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads (only for main page, not persona page)
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && !document.querySelector('.persona-hero')) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Horizontal scrolling for projects grid
document.addEventListener('DOMContentLoaded', function() {
    const scrollLeftArrow = document.getElementById('scrollLeftArrow');
    const scrollRightArrow = document.getElementById('scrollRightArrow');
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (scrollLeftArrow && scrollRightArrow && projectsGrid) {
        // One card per click: measured, because cards are narrower on small phones
        const scrollAmount = () => {
            const card = projectsGrid.querySelector('.project-card');
            const gap = parseFloat(getComputedStyle(projectsGrid).columnGap) || 32;
            return card.offsetWidth + gap;
        };
        
        // Right arrow scroll
        scrollRightArrow.addEventListener('click', function() {
            projectsGrid.scrollLeft += scrollAmount();
            updateArrowVisibility();
        });
        
        // Left arrow scroll
        scrollLeftArrow.addEventListener('click', function() {
            projectsGrid.scrollLeft -= scrollAmount();
            updateArrowVisibility();
        });
        
        // Update arrow visibility based on scroll position
        function updateArrowVisibility() {
            scrollLeftArrow.style.opacity = projectsGrid.scrollLeft > 0 ? '1' : '0.3';
            scrollRightArrow.style.opacity = 
                projectsGrid.scrollLeft >= projectsGrid.scrollWidth - projectsGrid.clientWidth - 10 ? '0.3' : '1';
        }
        
        // Initial arrow visibility
        updateArrowVisibility();
    }
});

// Add active class to nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Parallax effect for hero section (desktop only: on phones it pushes the hero over the next section)
window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) return;
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #ffffff !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style); 

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const lightIcon = document.getElementById('lightIcon');
    const darkIcon = document.getElementById('darkIcon');
    
    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.body.className = currentTheme === 'light' ? 'light-theme' : '';
    
    // Update icon display based on current theme
    updateThemeIcons();
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('light-theme')) {
            // Switch to dark theme
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            // Switch to light theme
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        }
        updateThemeIcons();
    });
    
    function updateThemeIcons() {
        if (document.body.classList.contains('light-theme')) {
            lightIcon.style.display = 'none';
            darkIcon.style.display = 'block';
        } else {
            lightIcon.style.display = 'block';
            darkIcon.style.display = 'none';
        }
    }
}); 

// Drag and Drop functionality for To Do cards
document.addEventListener('DOMContentLoaded', function() {
    const todoCards = document.getElementById('todoCards');
    if (todoCards) {
        const cards = todoCards.querySelectorAll('.roadmap-card');
        
        cards.forEach(card => {
            card.addEventListener('dragstart', handleDragStart);
            card.addEventListener('dragend', handleDragEnd);
            card.addEventListener('dragover', handleDragOver);
            card.addEventListener('drop', handleDrop);
        });
    }
});

function handleDragStart(e) {
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
    e.preventDefault();
    
    const draggedCard = document.querySelector('.dragging');
    const targetCard = e.target.closest('.roadmap-card');
    
    if (draggedCard && targetCard && draggedCard !== targetCard) {
        const cards = Array.from(targetCard.parentNode.querySelectorAll('.roadmap-card'));
        const draggedIndex = cards.indexOf(draggedCard);
        const targetIndex = cards.indexOf(targetCard);
        
        if (draggedIndex < targetIndex) {
            targetCard.parentNode.insertBefore(draggedCard, targetCard.nextSibling);
        } else {
            targetCard.parentNode.insertBefore(draggedCard, targetCard);
        }
    }
}

// Touch drag for To Do cards: HTML5 drag-and-drop doesn't fire on phones,
// so dragging by the grip handle reorders cards with touch events instead
document.addEventListener('DOMContentLoaded', function() {
    const todoCards = document.getElementById('todoCards');
    if (!todoCards) return;

    let draggedCard = null;

    todoCards.querySelectorAll('.drag-handle').forEach(handle => {
        handle.style.touchAction = 'none';

        handle.addEventListener('touchstart', function(e) {
            draggedCard = handle.closest('.roadmap-card');
            draggedCard.classList.add('dragging');
            e.preventDefault();
        }, { passive: false });
    });

    document.addEventListener('touchmove', function(e) {
        if (!draggedCard) return;
        e.preventDefault();
        const touch = e.touches[0];
        const targetCard = document.elementFromPoint(touch.clientX, touch.clientY)?.closest('#todoCards .roadmap-card');
        if (!targetCard || targetCard === draggedCard) return;

        const rect = targetCard.getBoundingClientRect();
        const after = touch.clientY > rect.top + rect.height / 2;
        todoCards.insertBefore(draggedCard, after ? targetCard.nextSibling : targetCard);
    }, { passive: false });

    document.addEventListener('touchend', function() {
        if (!draggedCard) return;
        draggedCard.classList.remove('dragging');
        draggedCard = null;
    });
});

// Back-to-top button: appears after scrolling down, on every page
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.createElement('button');
    backToTop.type = 'button';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
    document.body.appendChild(backToTop);

    const toggleVisibility = () => backToTop.classList.toggle('visible', window.scrollY > 400);
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    backToTop.addEventListener('click', () => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
});
