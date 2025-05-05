const user = "fardin.ahmed00";
const domain = "bcmail.cuny.edu";
const email = `${user}@${domain}`;
const link = document.getElementById("emailLink");
link.setAttribute("href", `mailto:${email}`);

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCarousel();
    initAnimations();
});

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            if (pageYOffset >= (section.offsetTop - 150)) {
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
    
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetSection = document.querySelector(link.getAttribute('href'));
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
}

function initCarousel() {
    const wrapper = document.getElementById('carousel-wrapper');
    const items = wrapper.querySelectorAll('div.w-full.flex-none');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    let currentIndex = 0;
    const itemCount = items.length;
    
    function updateCarousel() {
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('bg-gray-800');
                indicator.classList.remove('bg-gray-300');
            } else {
                indicator.classList.remove('bg-gray-800');
                indicator.classList.add('bg-gray-300');
            }
        });
    }
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    });
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    }, 5000);
    
    updateCarousel();
}

function initAnimations() {
    const skillTags = document.querySelectorAll('.bg-blue-100, .bg-green-100, .bg-purple-100, .bg-yellow-100');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.classList.add('scale-110');
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.classList.remove('scale-110');
        });
    });
} 