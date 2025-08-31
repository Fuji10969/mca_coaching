document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM chargé, initialisation...');
    
    // Variables principales
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const showMenu = document.getElementById('showMenu');
    const closeMenu = document.getElementById('closeMenu');
    
    // Variables du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    const confirmationMessage = document.querySelector('.confirmation-message');
    const newMessageBtn = document.getElementById('newMessageBtn');
    
    // Variables de validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Fonction pour afficher les messages d'erreur
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        
        formGroup.classList.add('error');
        if (errorMessage) {
            errorMessage.textContent = message;
        }
    }
    
    // Fonction pour effacer les messages d'erreur
    function clearError(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        
        formGroup.classList.remove('error');
        if (errorMessage) {
            errorMessage.textContent = '';
        }
    }
    
    // Fonctions de validation
    function validateName() {
        const value = nameInput.value.trim();
        if (value === '') {
            showError(nameInput, 'Le nom est requis');
            return false;
        } else if (value.length < 2) {
            showError(nameInput, 'Le nom doit contenir au moins 2 caractères');
            return false;
        } else {
            clearError(nameInput);
            return true;
        }
    }
    
    function validateEmail() {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value === '') {
            showError(emailInput, 'L\'email est requis');
            return false;
        } else if (!emailRegex.test(value)) {
            showError(emailInput, 'Veuillez entrer un email valide');
            return false;
        } else {
            clearError(emailInput);
            return true;
        }
    }
    
    function validateSubject() {
        const value = subjectInput.value;
        if (value === '') {
            showError(subjectInput, 'Veuillez sélectionner un sujet');
            return false;
        } else {
            clearError(subjectInput);
            return true;
        }
    }
    
    function validateMessage() {
        const value = messageInput.value.trim();
        if (value === '') {
            showError(messageInput, 'Le message est requis');
            return false;
        } else if (value.length < 10) {
            showError(messageInput, 'Le message doit contenir au moins 10 caractères');
            return false;
        } else {
            clearError(messageInput);
            return true;
        }
    }
    
    function validateForm() {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        return isNameValid && isEmailValid && isSubjectValid && isMessageValid;
    }
    
    // Événements de validation en temps réel
    if (nameInput) nameInput.addEventListener('input', validateName);
    if (emailInput) emailInput.addEventListener('input', validateEmail);
    if (subjectInput) subjectInput.addEventListener('change', validateSubject);
    if (messageInput) messageInput.addEventListener('input', validateMessage);

    // Gestion de la soumission du formulaire
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Cacher le formulaire
                contactForm.style.opacity = '0';
                contactForm.style.visibility = 'hidden';
                
                // Afficher le message de confirmation
                if (confirmationMessage) {
                    confirmationMessage.style.opacity = '1';
                    confirmationMessage.style.visibility = 'visible';
                }
            }
        });
    }

    // Réinitialiser le formulaire
    if (newMessageBtn) {
        newMessageBtn.addEventListener('click', function() {
            // Masquer le message de confirmation
            if (confirmationMessage) {
                confirmationMessage.style.opacity = '0';
                confirmationMessage.style.visibility = 'hidden';
            }
            
            // Réafficher le formulaire
            if (contactForm) {
                contactForm.style.opacity = '1';
                contactForm.style.visibility = 'visible';
                contactForm.reset();
                
                // Réinitialiser les messages d'erreur
                const errorMessages = contactForm.querySelectorAll('.error-message');
                errorMessages.forEach(error => error.textContent = '');
                
                const formGroups = contactForm.querySelectorAll('.form-group');
                formGroups.forEach(group => group.classList.remove('error'));
            }
        });
    }
    
    // Variables
    const serviceButtons = document.querySelectorAll('.service-button');
    const serviceDetailsSection = document.querySelector('.service-details');
    const serviceDetailsContainer = document.querySelector('.service-details-container');

    console.log('Boutons de service trouvés:', serviceButtons.length);
    console.log('Section détails:', serviceDetailsSection);
    console.log('Conteneur détails:', serviceDetailsContainer);

    // Contenu des différents services
    const servicesContent = {
        'Cours Particulier': {
            title: 'Cours Particulier',
            description: 'Chaque séance est conçue pour vous permettre de progresser à votre rythme, avec des exercices ciblés et des conseils personnalisés.',
            details: '• Durée : 1h30\n• Lieu : Vertical\'Art Brest\n• Niveaux : Tous niveaux\n• Matériel fourni.',
            price: '',
            images: [
                'pictures/photos/muscu_escalade_2.jpg',
                'pictures/photos/va_2.jpg',
                'pictures/photos/va.jpg'
            ],
            prices: [
                { label: 'Abonnés Vertical\'Art', amount: '40€ la séance' },
                { label: 'Non-abonnés', amount: '50€ la séance' },
            ]
        },
        'Entraînement': {
            title: 'Programme d\'Entraînement',
            description: 'Un programme personnalisé pour progresser efficacement, que vous soyez débutant ou grimpeur confirmé.',
            details: '• Programme sur mesure\n• Suivi personnalisé\n• Exercices techniques et physiques\n• Conseils nutritionnels',
            price: '',
            images: [
                'pictures/photos/muscu_escalade_2.jpg',
                'pictures/photos/va_1.jpg'
            ],
            prices: [
                { label: 'Plannication mensuelle, 1 fiche étirement, 1 fiche échauffement', amount: '80€ / mois' },
            ]
        },
        'Ouvreur': {
            title: 'Ouverture',
            description: 'Depuis 6 ans, je conçois et ouvre des blocs en salle privée. J’ai eu l’opportunité de contribuer à l’ouverture de compétitions FFME et d’organiser de nombreux contests. Aujourd’hui, en tant que référent ouvreur chez Vertical’Art Brest, je mets ma créativité et mon expérience au service des grimpeurs, en proposant des ouvertures variées, et accessibles.',
            details: '• Ouverture de blocs en salle privée\n• Participation à des compétitions FFME\n• Organisation d\'événements',
            price: '',
            images: [
                'pictures/photos/va_2.jpg',
                'pictures/photos/va.jpg'
            ],
            prices: [
                { label: 'Ouverture en bloc ou en voie', amount: '250€ / jour' },
            ]
        }
    };

    // Fonction pour initialiser le carrousel
    function initCarousel(images) {
        const track = document.querySelector('.carousel-track');
        const nav = document.querySelector('.carousel-nav');
        const prevButton = document.querySelector('.carousel-button.prev');
        const nextButton = document.querySelector('.carousel-button.next');
        
        // Vider le carrousel existant
        track.innerHTML = '';
        nav.innerHTML = '';
        
        // Si pas d'images, masquer le carrousel
        if (!images || images.length === 0) {
            document.querySelector('.carousel-container').style.display = 'none';
            return;
        }
        
        // Afficher le carrousel
        document.querySelector('.carousel-container').style.display = 'block';
        
        // Ajouter les images au carrousel
        images.forEach((image, index) => {
            // Ajouter l'image
            const img = document.createElement('img');
            img.src = image;
            img.alt = `${servicesContent[document.getElementById('serviceTitle')?.textContent]?.title || 'Service'} - Image ${index + 1}`;
            track.appendChild(img);
            
            // Ajouter l'indicateur
            const indicator = document.createElement('button');
            indicator.classList.add('carousel-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            nav.appendChild(indicator);
        });
        
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-track img');
        const indicators = document.querySelectorAll('.carousel-indicator');
        
        // Fonction pour aller à un slide spécifique
        function goToSlide(index) {
            if (slides.length === 0) return;
            currentSlide = (index + slides.length) % slides.length;
            const offset = -currentSlide * 100;
            track.style.transform = `translateX(${offset}%)`;
            
            // Mettre à jour les indicateurs
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentSlide);
            });
        }
        
        // Événements des boutons
        if (prevButton) {
            prevButton.addEventListener('click', (e) => {
                e.stopPropagation();
                goToSlide(currentSlide - 1);
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', (e) => {
                e.stopPropagation();
                goToSlide(currentSlide + 1);
            });
        }
        
        // Navigation au clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
            if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
        });
    }

    // Mettre à jour la fonction showServiceDetails
    function showServiceDetails(service) {
        const serviceData = servicesContent[service];
        if (!serviceData) return;
        
        // Mettre à jour le contenu du service
        const titleElement = document.getElementById('serviceTitle');
        const descElement = document.getElementById('serviceDescription');
        const detailsElement = document.getElementById('serviceDetails');
        const priceElement = document.getElementById('servicePrice');
        
        if (titleElement) titleElement.textContent = serviceData.title;
        if (descElement) descElement.textContent = serviceData.description;
        if (detailsElement) detailsElement.textContent = serviceData.details;
        if (priceElement) priceElement.textContent = serviceData.price;
        
        // Mettre à jour les tarifs
        const pricingSection = document.getElementById('servicePricing');
        if (pricingSection) {
            if (serviceData.prices && serviceData.prices.length > 0) {
                let pricesHTML = `
                    <h4>Tarifs</h4>
                    <div class="pricing-list">`;
                
                serviceData.prices.forEach(price => {
                    pricesHTML += `
                        <div class="pricing-item">
                            <span class="pricing-label">${price.label} :</span>
                            <span class="pricing-amount">${price.amount}</span>
                        </div>`;
                });
                
                pricesHTML += `</div>`;
                pricingSection.innerHTML = pricesHTML;
            } else {
                pricingSection.innerHTML = '';
            }
        }
        
        // Initialiser le carrousel avec les images du service
        initCarousel(serviceData.images || []);
        
        // Afficher la section des détails
        const detailsSection = document.querySelector('.service-details');
        if (detailsSection) {
            detailsSection.classList.add('visible');
            document.body.style.overflow = 'hidden'; // Empêcher le défilement de la page
        }
    }

    // Gérer la fermeture des détails
    const closeButton = document.querySelector('.close-details');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            const detailsSection = document.querySelector('.service-details');
            if (detailsSection) {
                detailsSection.classList.remove('visible');
                document.body.style.overflow = ''; // Rétablir le défilement
            }
        });
    }

    // Initialiser les boutons de service
    document.querySelectorAll('.service-button').forEach(button => {
        button.addEventListener('click', () => {
            const service = button.getAttribute('data-service');
            if (service) {
                showServiceDetails(service);
            }
        });
    });

    // Fonction pour gérer les animations au défilement
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Si l'élément est dans la fenêtre visible
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }

    // Détecter le défilement
    window.addEventListener('scroll', handleScrollAnimations);

    // Détecter le chargement initial
    document.addEventListener('DOMContentLoaded', () => {
        // Lancer une première fois au chargement
        handleScrollAnimations();
        
        // Ajouter un délai pour les éléments qui pourraient être chargés plus tard
        setTimeout(handleScrollAnimations, 1000);
    });

    // Animation au défilement
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100; // Déclenche l'animation quand l'élément est à 100px du bas de l'écran
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };
    
    // Détection de la visibilité des sections pour les animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observer les éléments avec la classe animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
    
    // Gestion du menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            
            if (showMenu && closeMenu) {
                showMenu.style.display = isExpanded ? 'block' : 'none';
                closeMenu.style.display = isExpanded ? 'none' : 'block';
            }
        });
    }
    
    // Initialisation des animations au chargement
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});
