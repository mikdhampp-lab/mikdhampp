// Mobile Menu Toggle
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    nav.classList.toggle('mobile-nav-open');
    menuBtn.classList.toggle('active');
}

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.background = 'hsla(0, 0%, 100%, 0.98)';
        header.style.boxShadow = '0 2px 20px hsla(0, 0%, 0%, 0.1)';
    } else {
        header.style.background = 'hsla(0, 0%, 100%, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Cart Functionality (Basic Implementation)
let cart = {};

function addToCart(itemId, itemName, itemPrice) {
    if (cart[itemId]) {
        cart[itemId].quantity += 1;
    } else {
        cart[itemId] = {
            name: itemName,
            price: itemPrice,
            quantity: 1
        };
    }
    
    updateCartDisplay();
    showNotification(`${itemName} added to cart!`);
}

function updateCartDisplay() {
    const cartItems = Object.values(cart).reduce((total, item) => total + item.quantity, 0);
    const cartTotal = Object.values(cart).reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Update cart button if exists
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.textContent = `Cart (${cartItems}) - ₹${cartTotal}`;
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--kerala-green);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add click handlers for "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', function() {
    const addToCartBtns = document.querySelectorAll('.food-btn');
    
    addToCartBtns.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get item details from the card
            const foodCard = this.closest('.food-card');
            const itemName = foodCard.querySelector('.food-name').textContent;
            const itemPrice = parseInt(foodCard.querySelector('.food-price').textContent.replace('₹', ''));
            const itemId = `item-${index}`;
            
            addToCart(itemId, itemName, itemPrice);
        });
    });
});

// Intersection Observer for Animations
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

document.addEventListener('DOMContentLoaded', function() {
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.restaurant-card, .food-card, .stat-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Form Handling (if contact forms are added)
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    showNotification('Thank you! We will contact you soon.');
    
    event.target.reset();
}

// Search Functionality (can be extended)
function searchRestaurants(query) {
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    
    restaurantCards.forEach(card => {
        const restaurantName = card.querySelector('.restaurant-name').textContent.toLowerCase();
        const specialty = card.querySelector('.restaurant-specialty').textContent.toLowerCase();
        
        if (restaurantName.includes(query.toLowerCase()) || specialty.includes(query.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
const spinButton = document.getElementById('spin-button');
const wheel = document.getElementById('wheel');

// Existing pieces and seats
const chestPiece1 = document.getElementById('chest-piece-1');
const chestPiece2 = document.getElementById('chest-piece-2');
const seat1 = document.getElementById('seat-1');
const seat2 = document.getElementById('seat-2');

// New pieces and seats
const legPiece1 = document.getElementById('leg-piece-1');
const legPiece2 = document.getElementById('leg-piece-2');
const seat3 = document.getElementById('seat-3');
const seat4 = document.getElementById('seat-4');

spinButton.addEventListener('click', () => {
    spinButton.disabled = true;

    const randomDegree = Math.floor(Math.random() * 360) + 720;
    wheel.style.transition = 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)';
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    setTimeout(() => {
        wheel.style.transition = 'none';

        // Choose a random piece (1-4) to move
        const winningPiece = Math.floor(Math.random() * 4) + 1;

        // Reset all pieces to their starting positions before moving one
        // (You would need to define these initial positions in your CSS)
        // For example:
        // chestPiece1.style.top = '...';
        // chestPiece2.style.top = '...';
        // etc.

        // Based on the random result, move the correct piece to its seat
        switch(winningPiece) {
            case 1:
                chestPiece1.style.top = seat1.offsetTop + 'px';
                chestPiece1.style.left = seat1.offsetLeft + 'px';
                break;
            case 2:
                chestPiece2.style.top = seat2.offsetTop + 'px';
                chestPiece2.style.left = seat2.offsetLeft + 'px';
                break;
            case 3:
                legPiece1.style.top = seat3.offsetTop + 'px';
                legPiece1.style.left = seat3.offsetLeft + 'px';
                break;
            case 4:
                legPiece2.style.top = seat4.offsetTop + 'px';
                legPiece2.style.left = seat4.offsetLeft + 'px';
                break;
        }

        spinButton.disabled = false;
    }, 3000);
});
// Loading State Management
function showLoading(element) {
    element.disabled = true;
    element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
}

function hideLoading(element, originalText) {
    element.disabled = false;
    element.innerHTML = originalText;
}

// Responsive Image Loading
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
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
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .mobile-nav-open {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem;
        box-shadow: var(--shadow-lg);
        border-top: 1px solid var(--border);
    }
    
    @media (max-width: 767px) {
        .nav {
            display: none;
        }
    }
`;

document.head.appendChild(style);