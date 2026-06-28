const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('shourav-theme');

function setTheme(theme) {
    const isDark = theme === 'dark';
    body.classList.toggle('dark-mode', isDark);
    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', String(isDark));
        themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
    localStorage.setItem('shourav-theme', theme);
}

if (savedTheme) {
    setTheme(savedTheme);
} else {
    setTheme('light');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const nextTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        setTheme(nextTheme);
    });
}

function calculateAge(birthDateString) {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

const ageValue = document.getElementById('ageValue');
if (ageValue) {
    ageValue.textContent = `${calculateAge('2003-01-19')} years`;
}

const pageLocation = document.getElementById('pageLocation');
if (pageLocation) {
    pageLocation.textContent = window.location.href;
}

const lastModified = document.getElementById('lastModified');
if (lastModified) {
    lastModified.textContent = document.lastModified;
}

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const accessKeyInput = contactForm.querySelector('input[name="access_key"]');
        const accessKey = accessKeyInput ? accessKeyInput.value.trim() : '';

        if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
            if (formStatus) {
                formStatus.textContent = 'Form setup needed: add your Web3Forms access key in index.html.';
                formStatus.className = 'form-status error';
            }
            return;
        }

        if (formStatus) {
            formStatus.textContent = 'Sending your message...';
            formStatus.className = 'form-status';
        }

        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                if (formStatus) {
                    formStatus.textContent = 'Message sent successfully. Thank you!';
                    formStatus.className = 'form-status success';
                }
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Unable to send message.');
            }
        } catch (error) {
            if (formStatus) {
                formStatus.textContent = 'Message could not be sent. Please try again later.';
                formStatus.className = 'form-status error';
            }
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Email';
            }
        }
    });
}
