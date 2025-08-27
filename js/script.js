document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const showMenu = document.getElementById('showMenu');
    const closeMenu = document.getElementById('closeMenu');
    const contactForm = document.getElementById('contactForm');
    const confirmationMessage = document.querySelector('.confirmation-message');
    const newMessageBtn = document.getElementById('newMessageBtn');
    const contactFormContainer = document.querySelector('.contact-form-container');
    
    // Menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            showMenu.style.display = navLinks.classList.contains('active') ? 'none' : 'block';
            closeMenu.style.display = navLinks.classList.contains('active') ? 'block' : 'none';
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });
    }
    
    // Fermer le menu au clic sur un lien
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            showMenu.style.display = 'block';
            closeMenu.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Animation de la navbar au scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Animation des éléments au scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .about-image, .about-text');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    // Détection de la visibilité des sections pour les animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    document.querySelectorAll('.service-card, .about-image, .about-text').forEach(element => {
        observer.observe(element);
    });
    
    // Validation du formulaire
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Réinitialiser les erreurs précédentes
            resetFormErrors();
            
            // Validation des champs
            const isNameValid = validateField('name', 'Veuillez entrer votre nom');
            const isEmailValid = validateEmail('email');
            const isSubjectValid = validateField('subject', 'Veuillez sélectionner un sujet');
            const isMessageValid = validateField('message', 'Veuillez entrer votre message', 10);
            
            // Si tout est valide, on peut soumettre le formulaire
            if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
                // Ici, vous pouvez ajouter le code pour envoyer le formulaire
                // Par exemple avec fetch() ou laisser le formulaire se soumettre normalement
                
                // Simulation d'envoi réussi
                showConfirmation();
            }
        });
        
        // Réinitialisation des erreurs lors de la saisie
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                const formGroup = this.closest('.form-group');
                if (formGroup) {
                    formGroup.classList.remove('error');
                    const errorElement = formGroup.querySelector('.error-message');
                    if (errorElement) {
                        errorElement.style.opacity = '0';
                        errorElement.style.height = '0';
                        errorElement.style.marginTop = '0';
                        // Réinitialiser l'icône d'erreur pour les champs de saisie
                        if (this.tagName === 'INPUT' || this.tagName === 'TEXTAREA') {
                            this.style.backgroundImage = 'none';
                            this.style.paddingRight = '15px';
                        } else if (this.tagName === 'SELECT') {
                            this.style.backgroundImage = "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23777' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")";
                        }
                    }
                }
            });
        });
    }
    
    // Fonction pour valider un champ requis
    function validateField(fieldId, errorMessage, minLength = 1) {
        const field = document.getElementById(fieldId);
        const value = field.value.trim();
        const formGroup = field.closest('.form-group');
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (!value || (minLength > 1 && value.length < minLength)) {
            showError(field, formGroup, errorElement, errorMessage);
            return false;
        }
        
        return true;
    }
    
    // Fonction pour valider l'email
    function validateEmail(fieldId) {
        const field = document.getElementById(fieldId);
        const email = field.value.trim();
        const formGroup = field.closest('.form-group');
        const errorElement = document.getElementById(`${fieldId}-error`);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showError(field, formGroup, errorElement, 'Veuillez entrer votre email');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(field, formGroup, errorElement, 'Veuillez entrer un email valide');
            return false;
        }
        
        return true;
    }
    
    // Fonction pour afficher une erreur
    function showError(field, formGroup, errorElement, message) {
        formGroup.classList.add('error');
        
        // Ajouter l'icône d'erreur
        if (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA') {
            field.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23e74c3c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='12' y1='8' x2='12' y2='12'%3E%3C/line%3E%3Cline x1='12' y1='16' x2='12.01' y2='16'%3E%3C/line%3E%3C/svg%3E\")";
            field.style.backgroundRepeat = 'no-repeat';
            field.style.backgroundPosition = 'right 10px center';
            field.style.backgroundSize = '20px';
            field.style.paddingRight = '40px';
        } else if (field.tagName === 'SELECT') {
            field.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23e74c3c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='12' y1='8' x2='12' y2='12'%3E%3C/line%3E%3Cline x1='12' y1='16' x2='12.01' y2='16'%3E%3C/line%3E%3C/svg%3E\") no-repeat right 10px center/20px";
        }
        
        // Afficher le message d'erreur
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.opacity = '1';
            errorElement.style.height = 'auto';
            errorElement.style.marginTop = '8px';
        }
        
        // Mettre le focus sur le premier champ en erreur
        if (!document.querySelector('.form-group.error:first-child')) {
            field.focus();
        }
    }
    
    // Fonction pour réinitialiser toutes les erreurs du formulaire
    function resetFormErrors() {
        const errorGroups = document.querySelectorAll('.form-group');
        errorGroups.forEach(group => {
            group.classList.remove('error');
            const errorElement = group.querySelector('.error-message');
            if (errorElement) {
                errorElement.style.opacity = '0';
                errorElement.style.height = '0';
                errorElement.style.marginTop = '0';
            }
            
            const input = group.querySelector('input, textarea, select');
            if (input) {
                if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
                    input.style.backgroundImage = 'none';
                    input.style.paddingRight = '15px';
                } else if (input.tagName === 'SELECT') {
                    input.style.backgroundImage = "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23777' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")";
                }
            }
        });
    }
    
    // Fonction pour afficher le message de confirmation
    function showConfirmation() {
        contactForm.reset();
        contactFormContainer.style.opacity = '0';
        contactFormContainer.style.visibility = 'hidden';
        confirmationMessage.style.opacity = '1';
        confirmationMessage.style.visibility = 'visible';
    }
    
    // Bouton pour écrire un nouveau message
    if (newMessageBtn) {
        newMessageBtn.addEventListener('click', function() {
            confirmationMessage.style.opacity = '0';
            confirmationMessage.style.visibility = 'hidden';
            contactFormContainer.style.opacity = '1';
            contactFormContainer.style.visibility = 'visible';
            resetFormErrors();
        });
    }
    
    // Initialisation des champs de formulaire
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    formInputs.forEach(input => {
        // Gérer le style des champs pré-remplis
        if (input.value.trim() !== '') {
            input.dispatchEvent(new Event('input'));
        }
        
        // Gérer le focus pour les labels flottants
        input.addEventListener('focus', function() {
            const label = this.nextElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.style.color = 'var(--primary-color)';
            }
        });
        
        input.addEventListener('blur', function() {
            const label = this.nextElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.style.color = 'var(--dark-gray)';
            }
        });
    });
    
    // Animation au chargement de la page
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        animateOnScroll();
    });
    
    // Détection du scroll pour les animations
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialisation des animations
    animateOnScroll();
});
