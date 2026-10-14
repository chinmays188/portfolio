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

    // Add copy link event listener
    const copyLinkElement = document.getElementById('copyLink');
    if (copyLinkElement) {
        copyLinkElement.addEventListener('click', function(e) {
            e.preventDefault();
            copyLink();
        });
    }
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
        const target = document.querySelector(this.getAttribute('href'));
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
    
    console.log('Scroll arrows found:', scrollLeftArrow, scrollRightArrow);
    console.log('Projects grid found:', projectsGrid);
    
    if (scrollLeftArrow && scrollRightArrow && projectsGrid) {
        const scrollAmount = 350 + 32; // card width + gap
        
        // Right arrow scroll
        scrollRightArrow.addEventListener('click', function() {
            console.log('Right arrow clicked');
            projectsGrid.scrollLeft += scrollAmount;
            updateArrowVisibility();
        });
        
        // Left arrow scroll
        scrollLeftArrow.addEventListener('click', function() {
            console.log('Left arrow clicked');
            projectsGrid.scrollLeft -= scrollAmount;
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
        
        console.log('Event listeners added successfully');
    } else {
        console.log('Some elements not found');
    }
});

// Skill items hover effects
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.1)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// Social links hover effects
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});

// Table of contents items hover effects
document.querySelectorAll('.toc-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Persona items hover effects
document.querySelectorAll('.persona-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Solution items hover effects
document.querySelectorAll('.solution-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Resume stats hover effects
document.querySelectorAll('.resume-stat').forEach(stat => {
    stat.addEventListener('mouseenter', () => {
        stat.style.transform = 'translateY(-3px)';
    });
    
    stat.addEventListener('mouseleave', () => {
        stat.style.transform = 'translateY(0)';
    });
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add active class to nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = parseInt(counter.getAttribute('data-target') || counter.innerText.replace('+', ''));
            const count = parseInt(counter.innerText.replace('+', ''));
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment) + '+';
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + '+';
            }
        };
        updateCount();
    });
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
}

// Timeline animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// Trigger timeline animation when experience section is visible
const experienceSection = document.querySelector('.experience');
if (experienceSection) {
    const experienceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTimeline();
                experienceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    experienceObserver.observe(experienceSection);
}

// Roadmap animation
function animateRoadmap() {
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    roadmapItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 300);
    });
}

// Trigger roadmap animation when road-map section is visible
const roadMapSection = document.querySelector('.road-map');
if (roadMapSection) {
    const roadMapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateRoadmap();
                roadMapObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    roadMapObserver.observe(roadMapSection);
}

// Form validation (if you add a contact form later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading state and timeline initial state
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    body.loaded {
        opacity: 1;
    }
    .nav-link.active {
        color: #ffffff !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
    .timeline-item {
        opacity: 0;
        transform: translateX(-50px);
        transition: all 0.6s ease;
    }
    .timeline-item:nth-child(even) {
        transform: translateX(50px);
    }
    .roadmap-item {
        opacity: 0;
        transform: translateX(-50px);
        transition: all 0.6s ease;
    }
    .roadmap-item:nth-child(even) {
        transform: translateX(50px);
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
        const cards = Array.from(todoCards.querySelectorAll('.roadmap-card'));
        const draggedIndex = cards.indexOf(draggedCard);
        const targetIndex = cards.indexOf(targetCard);
        
        if (draggedIndex < targetIndex) {
            targetCard.parentNode.insertBefore(draggedCard, targetCard.nextSibling);
        } else {
            targetCard.parentNode.insertBefore(draggedCard, targetCard);
        }
    }
}