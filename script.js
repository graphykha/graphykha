/**
 * Graphykha - Site Vitrine
 * JavaScript pour animations et interactivité
 */

// ============================
// Variables globales
// ============================
let lastScrollTop = 0;
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// ============================
// Navigation et Menu Mobile
// ============================

// Toggle du menu hamburger
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
}

// Fermer le menu mobile lors du clic sur un lien
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners pour le menu mobile
if (hamburger && navMenu) {
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Fermer le menu lors du clic sur un lien de navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

// ============================
// Navigation fluide
// ============================

// Scroll fluide vers les sections
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Event listeners pour les liens d'ancrage
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            if (targetId) {
                smoothScrollTo(targetId);
                closeMobileMenu();
            }
        });
    });
});

// ============================
// Header dynamique au scroll
// ============================
function handleHeaderScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Ajouter/retirer la classe scrolled pour les styles
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Masquer/afficher le header lors du scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        // Scroll vers le bas - masquer le header
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scroll vers le haut - afficher le header
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
}

// ============================
// Animations au défilement
// ============================

// Observer pour les animations fade-in
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Éléments à animer
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll(`
        .service-card,
        .portfolio-item,
        .about .section-header,
        .contact-item,
        .hero-content,
        .section-header
    `);
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        fadeInObserver.observe(element);
    });
}

// ============================
// Effets de survol avancés
// ============================

// Effet parallaxe léger sur le hero
function initParallaxEffect() {
    const heroGraphic = document.querySelector('.hero-graphic');
    
    if (heroGraphic) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            heroGraphic.style.transform = `translateY(${parallax}px)`;
        });
    }
}

// Effet de suivi de la souris sur les cartes
function initMouseFollowEffect() {
    const cards = document.querySelectorAll('.service-card, .portfolio-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// ============================
// Formulaire de contact
// ============================

// Validation et envoi du formulaire
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation des champs
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                field.classList.remove('error');
                
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                }
                
                // Validation email
                if (field.type === 'email' && field.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        field.classList.add('error');
                        isValid = false;
                    }
                }
            });
            
            if (isValid) {
                // Simuler l'envoi (remplacer par la vraie logique Formspree)
                showFormSuccess();
                
                // Optionnel : envoyer réellement le formulaire
                // this.submit();
            } else {
                showFormError('Veuillez corriger les erreurs dans le formulaire.');
            }
        });
        
        // Retirer la classe d'erreur lors de la saisie
        const formFields = form.querySelectorAll('input, select, textarea');
        formFields.forEach(field => {
            field.addEventListener('input', () => {
                field.classList.remove('error');
            });
        });
    }
}

// Affichage des messages de retour
function showFormSuccess() {
    const form = document.querySelector('.contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Changer temporairement le texte du bouton
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Message envoyé !';
    submitButton.style.background = 'var(--primary-sage)';
    submitButton.disabled = true;
    
    // Réinitialiser après 3 secondes
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.style.background = '';
        submitButton.disabled = false;
        form.reset();
    }, 3000);
}

function showFormError(message) {
    // Créer ou mettre à jour le message d'erreur
    let errorDiv = document.querySelector('.form-error');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.style.cssText = `
            color: #d32f2f;
            background: #ffebee;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px solid #ffcdd2;
        `;
        
        const form = document.querySelector('.contact-form');
        form.insertBefore(errorDiv, form.firstChild);
    }
    
    errorDiv.textContent = message;
    
    // Retirer le message après 5 secondes
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

// ============================
// Amélioration de l'accessibilité
// ============================

// Navigation au clavier
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Fermer le menu mobile avec Escape
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
        
        // Navigation rapide avec les touches numériques
        const sections = ['hero', 'services', 'portfolio', 'about', 'contact'];
        const keyNumber = parseInt(e.key);
        
        if (keyNumber >= 1 && keyNumber <= sections.length && e.altKey) {
            e.preventDefault();
            smoothScrollTo(sections[keyNumber - 1]);
        }
    });
}

// Focus visible pour l'accessibilité
function initFocusManagement() {
    // Ajouter une classe pour les utilisateurs navigant au clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// ============================
// Performance et optimisations
// ============================

// Throttle pour les événements de scroll
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================
// Initialisation
// ============================

// Initialiser toutes les fonctionnalités
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si les éléments essentiels existent
    if (!header) {
        console.warn('Header element not found');
        return;
    }
    
    // Initialiser les fonctionnalités
    initScrollAnimations();
    initFormValidation();
    initKeyboardNavigation();
    initFocusManagement();
    
    // Délai pour les effets de performance
    setTimeout(() => {
        initParallaxEffect();
        initMouseFollowEffect();
    }, 100);
    
    console.log('Graphykha website initialized');
});

// Event listeners pour le scroll (avec throttle pour les performances)
window.addEventListener('scroll', throttle(handleHeaderScroll, 10));

// Event listener pour le redimensionnement
window.addEventListener('resize', () => {
    // Fermer le menu mobile si on passe en desktop
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Prévenir le zoom sur iOS lors du focus des inputs
document.addEventListener('touchstart', function() {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
        viewportMeta.content = 'width=device-width, initial-scale=1, maximum-scale=1';
    }
});

// ============================
// CSS personnalisé pour les animations
// ============================

// Ajouter les styles pour les animations dynamiques
const dynamicStyles = `
    <style>
        .fade-in {
            animation: fadeInUp 0.8s ease-out forwards !important;
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .form-error {
            animation: slideInDown 0.3s ease-out;
        }
        
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .keyboard-navigation button:focus,
        .keyboard-navigation a:focus,
        .keyboard-navigation input:focus,
        .keyboard-navigation select:focus,
        .keyboard-navigation textarea:focus {
            outline: 3px solid var(--primary-sage) !important;
            outline-offset: 2px;
        }
        
        .service-card.error,
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: #d32f2f !important;
            box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.1) !important;
        }
        
        #header.scrolled {
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
            background: rgba(255, 255, 255, 0.98);
        }
        
        .portfolio-item:hover .portfolio-image::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(107, 142, 107, 0.1);
            z-index: 1;
        }
    </style>
`;

// Injecter les styles dynamiques
document.head.insertAdjacentHTML('beforeend', dynamicStyles); 