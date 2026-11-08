/**
 * PORTFOLIO CLIENT-SIDE INTERACTIVITY & THEME ENGINE
 * Author: Revanth Vardhan Yasalapu
 * Profession: Front-End Developer
 * Email: yasalapurevanth97@gmail.com
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // -------------------------------------------------------------------------
    // 2. DARK & LIGHT THEME TOGGLE ENGINE
    // -------------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggle');
    const mobileThemeToggleBtn = document.getElementById('mobileThemeToggle');
    const htmlElement = document.documentElement;

    // Detect saved theme or system preference
    const savedTheme = localStorage.getItem('revanth-portfolio-theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Default to saved theme, or fallback to light/system
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    htmlElement.setAttribute('data-theme', initialTheme);

    const toggleTheme = () => {
        const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('revanth-portfolio-theme', newTheme);
        
        // Re-render icons if needed
        if (window.lucide) {
            window.lucide.createIcons();
        }
    };

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.addEventListener('click', toggleTheme);
    }

    // -------------------------------------------------------------------------
    // 3. UNIVERSAL GMAIL COMPOSE HANDLER (MOBILE & LAPTOP ALL DEVICES)
    // -------------------------------------------------------------------------
    const userGmail = 'yasalapurevanth97@gmail.com';
    const gmailButtons = document.querySelectorAll('.gmail-direct-btn');

    gmailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (isMobile) {
                // On mobile phones & tablets, launch native mail / Gmail app
                window.location.href = `mailto:${userGmail}?subject=Inquiry%20for%20Revanth%20Vardhan`;
            } else {
                // On laptop/desktop, open web Gmail compose directly in new tab
                const webGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${userGmail}&su=Inquiry%20for%20Revanth%20Vardhan`;
                const newWindow = window.open(webGmailUrl, '_blank');
                
                // Fallback if popup blocker catches it
                if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                    window.location.href = `mailto:${userGmail}?subject=Inquiry%20for%20Revanth%20Vardhan`;
                }
            }
        });
    });

    // -------------------------------------------------------------------------
    // 4. STICKY NAVBAR & BACK TO TOP BUTTON
    // -------------------------------------------------------------------------
    const navbarWrapper = document.getElementById('navbarWrapper');
    const backToTopBtn = document.getElementById('backToTop');
    const currentYearEl = document.getElementById('currentYear');

    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Sticky Navbar styling
        if (navbarWrapper) {
            if (scrollY > 40) {
                navbarWrapper.classList.add('scrolled');
            } else {
                navbarWrapper.classList.remove('scrolled');
            }
        }

        // Back to top button visibility
        if (backToTopBtn) {
            if (scrollY > 450) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // -------------------------------------------------------------------------
    // 5. MOBILE NAVIGATION DRAWER
    // -------------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileClose = document.getElementById('mobileClose');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    const openMobileMenu = () => {
        if (!mobileDrawer) return;
        mobileDrawer.classList.add('open');
        drawerBackdrop.classList.add('active');
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    };

    const closeMobileMenu = () => {
        if (!mobileDrawer) return;
        mobileDrawer.classList.remove('open');
        drawerBackdrop.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = mobileDrawer.classList.contains('open');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileMenu);
    }

    if (drawerBackdrop) {
        drawerBackdrop.addEventListener('click', closeMobileMenu);
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // -------------------------------------------------------------------------
    // 6. SMOOTH SCROLL WITH HEADER OFFSET & ACTIVE LINK SPY
    // -------------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = navbarWrapper ? navbarWrapper.offsetHeight : 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        root: null,
        rootMargin: '-25% 0px -65% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => navObserver.observe(section));

    // -------------------------------------------------------------------------
    // 7. SCROLL REVEAL ANIMATIONS
    // -------------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // -------------------------------------------------------------------------
    // 8. COPY EMAIL TO CLIPBOARD
    // -------------------------------------------------------------------------
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const copyText = document.getElementById('copyText');

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = copyEmailBtn.getAttribute('data-email') || userGmail;
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(email);
                } else {
                    const tempInput = document.createElement('input');
                    tempInput.value = email;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempInput);
                }

                copyText.textContent = 'Copied to Clipboard!';
                copyEmailBtn.style.backgroundColor = 'var(--color-gold)';
                copyEmailBtn.style.color = '#070B18';

                setTimeout(() => {
                    copyText.textContent = 'Copy Address';
                    copyEmailBtn.style.backgroundColor = '';
                    copyEmailBtn.style.color = '';
                }, 2400);
            } catch (err) {
                console.error('Copy failed:', err);
                copyText.textContent = 'Copied!';
                setTimeout(() => {
                    copyText.textContent = 'Copy Address';
                }, 2000);
            }
        });
    }

    // -------------------------------------------------------------------------
    // 9. WORKING CONTACT FORM (SENDS REAL EMAILS TO yasalapurevanth97@gmail.com)
    // -------------------------------------------------------------------------
    const contactForm = document.getElementById('portfolioContactForm');
    const formStatusAlert = document.getElementById('formStatusAlert');
    const submitFormBtn = document.getElementById('submitFormBtn');
    const submitBtnText = document.getElementById('submitBtnText');
    const submitBtnIcon = document.getElementById('submitBtnIcon');

    if (contactForm) {
        const nameInput = document.getElementById('userName');
        const emailInput = document.getElementById('userEmail');
        const subjectInput = document.getElementById('userSubject');
        const messageInput = document.getElementById('userMessage');

        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const subjectError = document.getElementById('subjectError');
        const messageError = document.getElementById('messageError');

        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        };

        const clearErrors = () => {
            nameError.textContent = '';
            emailError.textContent = '';
            subjectError.textContent = '';
            messageError.textContent = '';

            nameInput.closest('.input-container').classList.remove('has-error');
            emailInput.closest('.input-container').classList.remove('has-error');
            subjectInput.closest('.input-container').classList.remove('has-error');
            messageInput.closest('.input-container').classList.remove('has-error');
        };

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearErrors();
            let isValid = true;

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectInput.value.trim();
            const message = messageInput.value.trim();

            if (!name) {
                nameError.textContent = 'Please enter your name.';
                nameInput.closest('.input-container').classList.add('has-error');
                isValid = false;
            }

            if (!email) {
                emailError.textContent = 'Please enter your email address.';
                emailInput.closest('.input-container').classList.add('has-error');
                isValid = false;
            } else if (!validateEmail(email)) {
                emailError.textContent = 'Please provide a valid email address.';
                emailInput.closest('.input-container').classList.add('has-error');
                isValid = false;
            }

            if (!subject) {
                subjectError.textContent = 'Please enter an inquiry subject.';
                subjectInput.closest('.input-container').classList.add('has-error');
                isValid = false;
            }

            if (!message) {
                messageError.textContent = 'Please enter your message details.';
                messageInput.closest('.input-container').classList.add('has-error');
                isValid = false;
            } else if (message.length < 8) {
                messageError.textContent = 'Message should be at least 8 characters long.';
                messageInput.closest('.input-container').classList.add('has-error');
                isValid = false;
            }

            if (!isValid) return;

            // Prepare button state
            submitFormBtn.disabled = true;
            submitBtnText.textContent = 'Opening Gmail...';
            submitFormBtn.style.opacity = '0.85';

            // Prepare prefilled subject and body with all form details
            const formattedSubject = encodeURIComponent(subject || `Portfolio Inquiry from ${name}`);
            const formattedBody = encodeURIComponent(
                `Hello Revanth,\n\nI am contacting you through your portfolio website:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage Details:\n${message}\n\n---\nSent from Revanth Vardhan Portfolio Website`
            );

            // Web Gmail direct composer URL (for laptop/desktop)
            const webGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${userGmail}&su=${formattedSubject}&body=${formattedBody}`;
            // Universal mailto URL (for mobile phones and tablets)
            const mailtoUrl = `mailto:${userGmail}?subject=${formattedSubject}&body=${formattedBody}`;

            const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            // Directly open Gmail
            if (isMobile) {
                window.location.href = mailtoUrl;
            } else {
                const openedWindow = window.open(webGmailUrl, '_blank');
                if (!openedWindow || openedWindow.closed || typeof openedWindow.closed === 'undefined') {
                    window.location.href = mailtoUrl;
                }
            }

            // Also silently dispatch through FormSubmit in the background so messages are safely stored
            try {
                const formData = new FormData(contactForm);
                fetch('https://formsubmit.co/ajax/yasalapurevanth97@gmail.com', {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: formData
                }).catch(err => console.warn('Background FormSubmit logging:', err));
            } catch (err) {
                console.warn('FormSubmit fetch skip:', err);
            }

            // Display clear confirmation feedback with immediate 1-click links
            formStatusAlert.className = 'form-status-alert success';
            formStatusAlert.innerHTML = `
                <strong>Gmail is opening!</strong> Your message details have been pre-filled for <strong>${userGmail}</strong>.<br>
                If it didn't open automatically, <a href="${webGmailUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; font-weight: 700; color: inherit;">click here to open Gmail Web</a> or <a href="${mailtoUrl}" style="text-decoration: underline; font-weight: 700; color: inherit;">launch your Mobile Mail App</a>.
            `;

            submitBtnText.textContent = 'Gmail Opened!';
            submitFormBtn.style.backgroundColor = 'var(--color-success)';

            setTimeout(() => {
                contactForm.reset();
                submitFormBtn.disabled = false;
                submitBtnText.textContent = 'Send Message';
                submitFormBtn.style.backgroundColor = '';
                submitFormBtn.style.opacity = '1';
                if (window.lucide) window.lucide.createIcons();
            }, 5000);
        });

        // Clear error styling on input
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
            input.addEventListener('input', () => {
                input.closest('.input-container').classList.remove('has-error');
                const errSpan = input.closest('.form-field').querySelector('.error-msg');
                if (errSpan) errSpan.textContent = '';
            });
        });
    }
});
