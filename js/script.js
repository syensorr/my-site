// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('reservation-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
        this.reset();
    });
}

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature, .menu-item, .team-member, .contact-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
window.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature, .menu-item, .team-member, .contact-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger initial animation check
    animateOnScroll();
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Add active class to current navigation item
const currentLocation = location.href;
const menuItems = document.querySelectorAll('nav ul li a');
const menuLength = menuItems.length;

for (let i = 0; i < menuLength; i++) {
    if (menuItems[i].href === currentLocation) {
        menuItems[i].classList.add('active');
    }
}

// Order button click handler
document.querySelectorAll('.order-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const phoneNumber = this.getAttribute('href').replace('tel:', '');
        const dishName = this.closest('.menu-item').querySelector('h4').textContent;
        
        if (confirm(`Вы хотите заказать: ${dishName}?\n\nНажмите ОК, чтобы позвонить по номеру: ${phoneNumber}`)) {
            window.location.href = `tel:${phoneNumber}`;
        }
    });
});
