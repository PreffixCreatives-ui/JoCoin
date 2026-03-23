// Interactive Features for JoCoin Landing Page

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

// Category tabs functionality
const tabs = document.querySelectorAll('.tab');
const cryptoRows = document.querySelectorAll('.crypto-row');

tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Get category
        const category = this.getAttribute('data-category');
        
        // Show notification
        showNotification(`Showing ${this.textContent} cryptocurrencies`);
        
        // Animate table rows
        cryptoRows.forEach((row, index) => {
            row.style.animation = 'none';
            setTimeout(() => {
                row.style.animation = 'fadeInUp 0.5s ease-out forwards';
                row.style.animationDelay = `${index * 0.05}s`;
            }, 10);
        });
    });
});

// Search functionality
const searchInput = document.getElementById('searchInput');
const tableBody = document.getElementById('marketTableBody');

searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    cryptoRows.forEach(row => {
        const cryptoName = row.getAttribute('data-name').toLowerCase();
        if (cryptoName.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Trade button functionality
const tradeButtons = document.querySelectorAll('.btn-trade');

tradeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const row = this.closest('tr');
        const cryptoName = row.getAttribute('data-name');
        showNotification(`Opening trade panel for ${cryptoName}...`, 'info');
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

// Crypto row click functionality
cryptoRows.forEach(row => {
    row.addEventListener('click', function() {
        const cryptoName = this.getAttribute('data-name');
        const price = this.querySelector('.price-cell').textContent;
        const change = this.querySelector('.change-cell').textContent;
        
        showNotification(`${cryptoName}: ${price} (${change})`, 'info');
    });
});

// Trend card interactions
const trendCards = document.querySelectorAll('.trend-card');

trendCards.forEach(card => {
    card.addEventListener('click', function() {
        const cryptoName = this.querySelector('.crypto-name').textContent;
        const price = this.querySelector('.price').textContent;
        const change = this.querySelector('.change').textContent;
        
        showNotification(`${cryptoName}: ${price} (${change})`, 'info');
    });
});

// Feature card interactions
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('click', function() {
        const featureTitle = this.querySelector('h3').textContent;
        showNotification(`Learn more about: ${featureTitle}`, 'info');
    });
});

// Get Started buttons
const getStartedButtons = document.querySelectorAll('.btn-primary');

getStartedButtons.forEach(button => {
    button.addEventListener('click', function() {
        showNotification('Redirecting to registration...', 'success');
        
        // Scroll to how to get started section
        const getStartedSection = document.querySelector('.get-started');
        if (getStartedSection) {
            setTimeout(() => {
                getStartedSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 500);
        }
    });
});

// Login button
const loginButton = document.querySelector('.btn-login');

loginButton.addEventListener('click', function() {
    showNotification('Opening login portal...', 'info');
});

// Step card interactions
const stepCards = document.querySelectorAll('.step-card');

stepCards.forEach((card, index) => {
    card.addEventListener('click', function() {
        const stepTitle = this.querySelector('h3').textContent;
        showNotification(`Step ${index + 1}: ${stepTitle}`, 'info');
    });
});

// Carousel dots functionality for Get Started section
const carouselContainer = document.querySelector('.get-started-right');
const carouselDots = document.querySelectorAll('.carousel-dots .dot');

if (carouselContainer && carouselDots.length > 0) {
    // Update dots on scroll
    carouselContainer.addEventListener('scroll', () => {
        const scrollLeft = carouselContainer.scrollLeft;
        const cardWidth = carouselContainer.querySelector('.step-card').offsetWidth;
        const gap = 16; // 1rem gap
        const activeIndex = Math.round(scrollLeft / (cardWidth + gap));
        
        carouselDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    });
    
    // Click on dots to navigate
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const cardWidth = carouselContainer.querySelector('.step-card').offsetWidth;
            const gap = 16;
            carouselContainer.scrollTo({
                left: index * (cardWidth + gap),
                behavior: 'smooth'
            });
        });
    });
}

// See All Coins link
const seeAllCoinsLink = document.getElementById('seeAllCoins');

seeAllCoinsLink.addEventListener('click', function(e) {
    e.preventDefault();
    showNotification('Loading all cryptocurrencies...', 'info');
    
    // Animate table
    const marketTable = document.querySelector('.market-table');
    marketTable.style.transform = 'scale(0.98)';
    setTimeout(() => {
        marketTable.style.transform = 'scale(1)';
    }, 200);
});

// Language selector
// Translation system
const translations = {
    en: {
        // Navigation
        product: "Product",
        company: "Company",
        press: "Press",
        learn: "Learn",
        login: "Login",
        
        // Hero
        heroTitle1: "Start and Build Your",
        heroTitle2: "Crypto Portfolio",
        heroTitle3: "Here",
        heroSubtitle: "Only at JoCoin, you can build a good portfolio and learn best practices about cryptocurrency",
        getStarted: "Get Started",
        
        // Market Trend
        marketTrend: "Market Trend",
        
        // Features
        amazingFeatures: "JoCoin Amazing Features",
        featuresSubtitle: "Explore sensational features to prepare your best investment in cryptocurrency",
        managePortfolio: "Manage Portfolio",
        protectedSecurely: "Protected Securely",
        cryptoVariety: "Cryptocurrency Variety",
        learnBestPractice: "Learn Best Practice",
        featureDesc: "Lorem ipsum faucibus pulvinar tincidunt habitasse bibendum turpis pulvinar facilisis",
        seeExplained: "See Explained →",
        
        // Market Update
        marketUpdate: "Market Update",
        cryptoCategories: "Cryptocurrency Categories",
        popular: "Popular",
        metaverse: "Metaverse",
        entertainment: "Entertainment",
        energy: "Energy",
        gaming: "Gaming",
        music: "Music",
        seeAll: "See All 12+",
        searchCoin: "Search Coin",
        no: "NO",
        name: "NAME",
        lastPrice: "LAST PRICE",
        change: "CHANGE",
        marketStats: "MARKET STATS",
        trade: "Trade",
        seeAllCoins: "See All Coins",
        
        // Get Started
        howToGetStarted: "How To Get Started",
        getStartedSubtitle: "Simple and easy way to start your investment in cryptocurrency",
        createAccount: "Create Your Account",
        createAccountDesc: "Your account and personal identity are guaranteed safe",
        connectBank: "Connect Bank Account",
        connectBankDesc: "Connect the bank account to start transactions",
        startPortfolio: "Start Build Portfolio",
        startPortfolioDesc: "Buy and sell popular currencies and keep track of them",
        
        // Footer
        aboutUs: "About Us",
        about: "About",
        careers: "Careers",
        blog: "Blog",
        legalPrivacy: "Legal & Privacy",
        services: "Services",
        products: "Products",
        buyCrypto: "Buy Crypto",
        affiliate: "Affiliate",
        institutionalServices: "Institutional Services",
        whatIsCrypto: "What is Cryptocurrency?",
        cryptoBasic: "Crypto Basic",
        tipsAndTutorials: "Tips and Tutorials",
        copyright: "Copyright 2024 © JoCoin. All Rights Reserved",
        
        // Language
        langChanged: "Language changed to English"
    },
    es: {
        // Navigation
        product: "Producto",
        company: "Empresa",
        press: "Prensa",
        learn: "Aprender",
        login: "Iniciar Sesión",
        
        // Hero
        heroTitle1: "Comienza y Construye Tu",
        heroTitle2: "Portafolio Cripto",
        heroTitle3: "Aquí",
        heroSubtitle: "Solo en JoCoin, puedes construir un buen portafolio y aprender las mejores prácticas sobre criptomonedas",
        getStarted: "Comenzar",
        
        // Market Trend
        marketTrend: "Tendencia del Mercado",
        
        // Features
        amazingFeatures: "Características Increíbles de JoCoin",
        featuresSubtitle: "Explora características sensacionales para preparar tu mejor inversión en criptomonedas",
        managePortfolio: "Gestionar Portafolio",
        protectedSecurely: "Protegido de Forma Segura",
        cryptoVariety: "Variedad de Criptomonedas",
        learnBestPractice: "Aprende Mejores Prácticas",
        featureDesc: "Lorem ipsum faucibus pulvinar tincidunt habitasse bibendum turpis pulvinar facilisis",
        seeExplained: "Ver Explicación →",
        
        // Market Update
        marketUpdate: "Actualización del Mercado",
        cryptoCategories: "Categorías de Criptomonedas",
        popular: "Popular",
        metaverse: "Metaverso",
        entertainment: "Entretenimiento",
        energy: "Energía",
        gaming: "Juegos",
        music: "Música",
        seeAll: "Ver Todo 12+",
        searchCoin: "Buscar Moneda",
        no: "NO",
        name: "NOMBRE",
        lastPrice: "ÚLTIMO PRECIO",
        change: "CAMBIO",
        marketStats: "ESTADÍSTICAS",
        trade: "Comerciar",
        seeAllCoins: "Ver Todas las Monedas",
        
        // Get Started
        howToGetStarted: "Cómo Empezar",
        getStartedSubtitle: "Forma simple y fácil de comenzar tu inversión en criptomonedas",
        createAccount: "Crea Tu Cuenta",
        createAccountDesc: "Tu cuenta e identidad personal están garantizadas seguras",
        connectBank: "Conectar Cuenta Bancaria",
        connectBankDesc: "Conecta la cuenta bancaria para comenzar transacciones",
        startPortfolio: "Comenzar a Construir Portafolio",
        startPortfolioDesc: "Compra y vende monedas populares y haz seguimiento de ellas",
        
        // Footer
        aboutUs: "Sobre Nosotros",
        about: "Acerca de",
        careers: "Carreras",
        blog: "Blog",
        legalPrivacy: "Legal y Privacidad",
        services: "Servicios",
        products: "Productos",
        buyCrypto: "Comprar Cripto",
        affiliate: "Afiliados",
        institutionalServices: "Servicios Institucionales",
        whatIsCrypto: "¿Qué es Criptomoneda?",
        cryptoBasic: "Cripto Básico",
        tipsAndTutorials: "Consejos y Tutoriales",
        copyright: "Copyright 2024 © JoCoin. Todos los Derechos Reservados",
        
        // Language
        langChanged: "Idioma cambiado a Español"
    },
    fr: {
        // Navigation
        product: "Produit",
        company: "Entreprise",
        press: "Presse",
        learn: "Apprendre",
        login: "Connexion",
        
        // Hero
        heroTitle1: "Commencez et Construisez Votre",
        heroTitle2: "Portefeuille Crypto",
        heroTitle3: "Ici",
        heroSubtitle: "Uniquement chez JoCoin, vous pouvez créer un bon portefeuille et apprendre les meilleures pratiques sur les cryptomonnaies",
        getStarted: "Commencer",
        
        // Market Trend
        marketTrend: "Tendance du Marché",
        
        // Features
        amazingFeatures: "Fonctionnalités Incroyables de JoCoin",
        featuresSubtitle: "Explorez des fonctionnalités sensationnelles pour préparer votre meilleur investissement en cryptomonnaie",
        managePortfolio: "Gérer le Portefeuille",
        protectedSecurely: "Protégé en Toute Sécurité",
        cryptoVariety: "Variété de Cryptomonnaies",
        learnBestPractice: "Apprendre les Meilleures Pratiques",
        featureDesc: "Lorem ipsum faucibus pulvinar tincidunt habitasse bibendum turpis pulvinar facilisis",
        seeExplained: "Voir l'Explication →",
        
        // Market Update
        marketUpdate: "Mise à Jour du Marché",
        cryptoCategories: "Catégories de Cryptomonnaies",
        popular: "Populaire",
        metaverse: "Métavers",
        entertainment: "Divertissement",
        energy: "Énergie",
        gaming: "Jeux",
        music: "Musique",
        seeAll: "Voir Tout 12+",
        searchCoin: "Rechercher Monnaie",
        no: "NO",
        name: "NOM",
        lastPrice: "DERNIER PRIX",
        change: "CHANGEMENT",
        marketStats: "STATISTIQUES",
        trade: "Échanger",
        seeAllCoins: "Voir Toutes les Monnaies",
        
        // Get Started
        howToGetStarted: "Comment Commencer",
        getStartedSubtitle: "Une façon simple et facile de commencer votre investissement en cryptomonnaie",
        createAccount: "Créez Votre Compte",
        createAccountDesc: "Votre compte et votre identité personnelle sont garantis en sécurité",
        connectBank: "Connecter Compte Bancaire",
        connectBankDesc: "Connectez le compte bancaire pour commencer les transactions",
        startPortfolio: "Commencer à Construire le Portefeuille",
        startPortfolioDesc: "Achetez et vendez des devises populaires et suivez-les",
        
        // Footer
        aboutUs: "À Propos de Nous",
        about: "À Propos",
        careers: "Carrières",
        blog: "Blog",
        legalPrivacy: "Légal et Confidentialité",
        services: "Services",
        products: "Produits",
        buyCrypto: "Acheter Crypto",
        affiliate: "Affiliés",
        institutionalServices: "Services Institutionnels",
        whatIsCrypto: "Qu'est-ce que la Cryptomonnaie?",
        cryptoBasic: "Base Crypto",
        tipsAndTutorials: "Conseils et Tutoriels",
        copyright: "Copyright 2024 © JoCoin. Tous Droits Réservés",
        
        // Language
        langChanged: "Langue changée en Français"
    }
};

let currentLang = 'en';

function applyTranslations(lang) {
    const t = translations[lang];
    
    // Navigation
    const navLinks = document.querySelectorAll('.nav-menu a');
    if (navLinks[0]) navLinks[0].textContent = t.product;
    if (navLinks[1]) navLinks[1].textContent = t.company;
    if (navLinks[2]) navLinks[2].textContent = t.press;
    if (navLinks[3]) navLinks[3].textContent = t.learn;
    
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) loginBtn.textContent = t.login;
    
    // Hero
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.innerHTML = `${t.heroTitle1} <span class="highlight">${t.heroTitle2}</span> ${t.heroTitle3}`;
    }
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle;
    
    const getStartedBtns = document.querySelectorAll('.btn-primary');
    getStartedBtns.forEach(btn => btn.textContent = t.getStarted);
    
    // Section Titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((title, index) => {
        if (title.textContent.includes('Market Trend') || title.textContent.includes('Tendencia') || title.textContent.includes('Tendance')) {
            title.textContent = t.marketTrend;
        } else if (title.textContent.includes('Amazing') || title.textContent.includes('Increíbles') || title.textContent.includes('Incroyables')) {
            title.textContent = t.amazingFeatures;
        } else if (title.textContent.includes('Market Update') || title.textContent.includes('Actualización') || title.textContent.includes('Mise à Jour')) {
            title.textContent = t.marketUpdate;
        }
    });
    
    // Features Section
    const sectionSubtitle = document.querySelector('.section-subtitle');
    if (sectionSubtitle) sectionSubtitle.textContent = t.featuresSubtitle;
    
    const featureCards = document.querySelectorAll('.feature-card');
    const featureNames = ['managePortfolio', 'protectedSecurely', 'cryptoVariety', 'learnBestPractice'];
    featureCards.forEach((card, index) => {
        const h3 = card.querySelector('h3');
        const p = card.querySelector('p');
        const link = card.querySelector('.feature-link');
        if (h3 && featureNames[index]) h3.textContent = t[featureNames[index]];
        if (p) p.textContent = t.featureDesc;
        if (link) link.textContent = t.seeExplained;
    });
    
    // Market Update Section
    const tabLabel = document.querySelector('.tab-label');
    if (tabLabel) tabLabel.textContent = t.cryptoCategories;
    
    const tabs = document.querySelectorAll('.category-tabs .tab');
    const tabNames = ['popular', 'metaverse', 'entertainment', 'energy', 'gaming', 'music', 'seeAll'];
    tabs.forEach((tab, index) => {
        if (tabNames[index]) tab.textContent = t[tabNames[index]];
    });
    
    const searchInput = document.querySelector('#searchInput');
    if (searchInput) searchInput.placeholder = t.searchCoin;
    
    // Table headers
    const thElements = document.querySelectorAll('.market-table th');
    if (thElements[0]) thElements[0].textContent = t.no;
    if (thElements[1]) thElements[1].textContent = t.name;
    if (thElements[3]) thElements[3].textContent = t.lastPrice;
    if (thElements[4]) thElements[4].textContent = t.change;
    if (thElements[5]) thElements[5].textContent = t.marketStats;
    if (thElements[6]) thElements[6].textContent = t.trade;
    
    const tradeBtns = document.querySelectorAll('.btn-trade');
    tradeBtns.forEach(btn => btn.textContent = t.trade);
    
    const seeAllCoins = document.querySelector('#seeAllCoins');
    if (seeAllCoins) seeAllCoins.textContent = t.seeAllCoins;
    
    // Get Started Section
    const getStartedLeft = document.querySelector('.get-started-left');
    if (getStartedLeft) {
        const h2 = getStartedLeft.querySelector('h2');
        const p = getStartedLeft.querySelector('p');
        if (h2) h2.textContent = t.howToGetStarted;
        if (p) p.innerHTML = t.getStartedSubtitle;
    }
    
    const stepCards = document.querySelectorAll('.step-card');
    const stepData = [
        { title: 'createAccount', desc: 'createAccountDesc' },
        { title: 'connectBank', desc: 'connectBankDesc' },
        { title: 'startPortfolio', desc: 'startPortfolioDesc' }
    ];
    stepCards.forEach((card, index) => {
        const h3 = card.querySelector('h3');
        const p = card.querySelector('p');
        if (h3 && stepData[index]) h3.textContent = t[stepData[index].title];
        if (p && stepData[index]) p.innerHTML = t[stepData[index].desc];
    });
    
    // Footer
    const footerColumns = document.querySelectorAll('.footer-column');
    
    if (footerColumns[1]) {
        const h4 = footerColumns[1].querySelector('h4');
        const links = footerColumns[1].querySelectorAll('a');
        if (h4) h4.textContent = t.aboutUs;
        if (links[0]) links[0].textContent = t.about;
        if (links[1]) links[1].textContent = t.careers;
        if (links[2]) links[2].textContent = t.blog;
        if (links[3]) links[3].textContent = t.legalPrivacy;
    }
    
    if (footerColumns[2]) {
        const h4 = footerColumns[2].querySelector('h4');
        const links = footerColumns[2].querySelectorAll('a');
        if (h4) h4.textContent = t.services;
        if (links[0]) links[0].textContent = t.products;
        if (links[1]) links[1].textContent = t.buyCrypto;
        if (links[2]) links[2].textContent = t.affiliate;
        if (links[3]) links[3].textContent = t.institutionalServices;
    }
    
    if (footerColumns[3]) {
        const h4 = footerColumns[3].querySelector('h4');
        const links = footerColumns[3].querySelectorAll('a');
        if (h4) h4.textContent = t.learn;
        if (links[0]) links[0].textContent = t.whatIsCrypto;
        if (links[1]) links[1].textContent = t.cryptoBasic;
        if (links[2]) links[2].textContent = t.tipsAndTutorials;
        if (links[3]) links[3].textContent = t.marketUpdate;
    }
    
    const footerBottom = document.querySelector('.footer-bottom p');
    if (footerBottom) footerBottom.textContent = t.copyright;
    
    // Update html lang attribute
    document.documentElement.lang = lang;
}

// Language selector functionality
const languageSelector = document.querySelector('.language-selector');
const langText = document.querySelector('.lang-text');
const langOptions = document.querySelectorAll('.lang-option');

const languageNames = {
    en: 'English',
    es: 'Spanish',
    fr: 'French'
};

langOptions.forEach(option => {
    option.addEventListener('click', function(e) {
        e.stopPropagation();
        const selectedLang = this.getAttribute('data-lang');
        
        // Update the displayed text
        langText.textContent = languageNames[selectedLang];
        
        // Update active state
        langOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        
        // Apply translations
        currentLang = selectedLang;
        applyTranslations(selectedLang);
        
        // Show notification
        showNotification(translations[selectedLang].langChanged, 'success');
    });
});

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        backgroundColor: type === 'success' ? '#10b981' : 
                         type === 'info' ? '#14b8a6' : '#ef4444',
        color: '#ffffff',
        fontWeight: '600',
        fontSize: '0.95rem',
        zIndex: '10000',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        animation: 'slideInRight 0.3s ease-out',
        maxWidth: '400px'
    });
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < 800) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / 800);
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Update prices with animation (simulated real-time updates)
function updatePrices() {
    const priceElements = document.querySelectorAll('.price, .price-cell');
    
    priceElements.forEach(element => {
        // Random chance to update
        if (Math.random() > 0.7) {
            element.style.transition = 'color 0.3s';
            element.style.color = '#14b8a6';
            
            setTimeout(() => {
                element.style.color = '';
            }, 300);
        }
    });
}

// Update prices every 5 seconds
setInterval(updatePrices, 5000);

// Partner logo interactions
const partnerLogos = document.querySelectorAll('.partner-logo');

partnerLogos.forEach(logo => {
    logo.addEventListener('click', function() {
        showNotification(`Visit ${this.textContent} partner page`, 'info');
    });
});

// Partners Carousel - Pause on hover functionality
const partnersTrack = document.querySelector('.partners-track');
if (partnersTrack) {
    partnersTrack.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    partnersTrack.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
}

// Add hover sound effect simulation
const interactiveElements = document.querySelectorAll('button, .trend-card, .feature-card, .step-card, .crypto-row');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease-out';
    });
});

// Initialize tooltips for crypto icons
const cryptoIcons = document.querySelectorAll('.crypto-icon, .table-crypto-icon');

cryptoIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function(e) {
        const cryptoName = this.parentElement.querySelector('.crypto-name, span')?.textContent;
        if (cryptoName) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = cryptoName;
            tooltip.style.cssText = `
                position: absolute;
                background: #0f1419;
                color: #14b8a6;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                font-size: 0.85rem;
                font-weight: 600;
                z-index: 10000;
                pointer-events: none;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                border: 1px solid #14b8a6;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = `${rect.top - 40}px`;
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            
            this.addEventListener('mouseleave', function() {
                tooltip.remove();
            }, { once: true });
        }
    });
});

// Social media links
const socialIcons = document.querySelectorAll('.social-icon');

socialIcons.forEach(icon => {
    icon.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Connect with us on social media!', 'info');
    });
});

// Footer links
const footerLinks = document.querySelectorAll('.footer-column a');

footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification(`Navigating to ${this.textContent}...`, 'info');
    });
});

// Add loading animation when page loads
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-out';
        document.body.style.opacity = '1';
    }, 100);
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome to JoCoin - Your Crypto Portfolio Platform!', 'success');
    }, 500);
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

console.log('JoCoin Interactive Features Loaded Successfully! 🚀');
