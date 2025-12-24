// Sticky header & active nav links
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('topbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navlink');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const mobilePanel = document.getElementById('mobilePanel');

    hamburger.addEventListener('click', () => {
        const isOpen = !mobilePanel.hasAttribute('hidden');
        if (isOpen) {
            mobilePanel.setAttribute('hidden', '');
        } else {
            mobilePanel.removeAttribute('hidden');
        }
    });
    
    document.querySelectorAll('.mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobilePanel.setAttribute('hidden', '');
      });
    });

    // Typing effect for hero title
    const typedText = document.querySelector('.typed-text');
    const textToType = typedText.textContent;
    typedText.textContent = '';
    let i = 0;
    function type() {
        if (i < textToType.length) {
            typedText.textContent += textToType.charAt(i);
            i++;
            setTimeout(type, 90);
        }
    }
    type();

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.pill');
    const portfolioItems = document.querySelectorAll('.gallery .item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.cat === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Skills bar animation on scroll
    const skillBars = document.querySelectorAll('.skill .bar span');
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const span = entry.target;
                const width = span.dataset.width;
                span.style.width = width + '%';
                observer.unobserve(span);
            }
        });
    }, { threshold: 0.6 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Counters animation
    const counters = document.querySelectorAll('.counter-box .num');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.dataset.count;
                let currentCount = 0;
                const increment = target / 100;

                const updateCounter = () => {
                    if (currentCount < target) {
                        currentCount += increment;
                        counter.textContent = Math.ceil(currentCount);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.6 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
});
