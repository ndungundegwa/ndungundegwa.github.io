document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Header & Active Nav Links ---
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

    // --- 2. Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const mobilePanel = document.getElementById('mobilePanel');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    hamburger.addEventListener('click', () => {
        const isOpen = !mobilePanel.hasAttribute('hidden');
        if (isOpen) {
            mobilePanel.setAttribute('hidden', '');
        } else {
            mobilePanel.removeAttribute('hidden');
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobilePanel.setAttribute('hidden', '');
        });
    });

    // --- 3. Advanced Typing Effect (Rotating Text) ---
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');

    if (typedTextSpan) {
        const textArray = typedTextSpan.getAttribute('data-typed-items').split(', ');
        let textArrayIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = textArray[textArrayIndex];
            
            if (isDeleting) {
                typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = 100; 
            if (isDeleting) typeSpeed = 50; 

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                typeSpeed = 500; 
            }

            setTimeout(type, typeSpeed);
        }

        // Start typing
        if (textArray.length) setTimeout(type, 1000);

        // Blinking cursor
        setInterval(() => {
            if (cursorSpan.style.opacity === '0') {
                cursorSpan.style.opacity = '1';
            } else {
                cursorSpan.style.opacity = '0';
            }
        }, 500);
    }

    // --- 4. Portfolio Filtering ---
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

    // --- 5. Skills Bar Animation ---
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

    // --- 6. Number Counters Animation ---
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

    // --- 7. Back to Top Button ---
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
});
