// Mobile toggle for new nav
const navToggle = document.getElementById('nav-toggle');
const navList = document.querySelector('.nav-list');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
        navList.style.flexDirection = 'column';
        navList.style.position = 'absolute';
        navList.style.right = '24px';
        navList.style.top = '64px';
        navList.style.background = 'rgba(0,0,0,0.85)';
        navList.style.padding = '12px';
        navList.style.borderRadius = '8px';
    });
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // close mobile nav after click
            if (window.innerWidth < 700 && navList) navList.style.display = 'none';
        }
    });
});

// Intersection Observer to add 'inview' class to sections
const sections = document.querySelectorAll('.section');
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('inview');
    });
}, { threshold: 0.12 });

sections.forEach(s => io.observe(s));

// Sticky header shadow on scroll
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});


// --- Cursor bubble: follow mouse with smoothing ---
;(function(){
    const bubble = document.createElement('div');
    bubble.className = 'cursor-bubble';
    document.body.appendChild(bubble);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let bubbleX = mouseX;
    let bubbleY = mouseY;
    let rafId;

    const ease = 0.16;

    function onMove(e){
        mouseX = e.clientX;
        mouseY = e.clientY;
        bubble.style.opacity = '1';
    }

    function animate(){
        bubbleX += (mouseX - bubbleX) * ease;
        bubbleY += (mouseY - bubbleY) * ease;
        bubble.style.transform = `translate3d(${bubbleX}px, ${bubbleY}px, 0) translate(-50%, -50%)`;
        rafId = requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(animate);

    // interactions: shrink on pointer down, grow on hover of links/buttons
    window.addEventListener('pointerdown', () => { bubble.style.transform += ' scale(0.85)'; bubble.style.opacity = '0.85'; });
    window.addEventListener('pointerup', () => { bubble.style.transform = bubble.style.transform.replace(' scale(0.85)', ''); bubble.style.opacity = '1'; });

    // highlight interactive elements
    document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => { bubble.style.transform += ' scale(1.25)'; bubble.style.opacity = '0.98'; });
        el.addEventListener('mouseleave', () => { bubble.style.transform = bubble.style.transform.replace(' scale(1.25)', ''); bubble.style.opacity = '0.9'; });
    });

    // hide on touch devices
    window.addEventListener('touchstart', () => { bubble.style.display = 'none'; cancelAnimationFrame(rafId); }, { passive: true });
})();