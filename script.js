function changeLang(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase() === lang) btn.classList.add('active');
    });
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') { el.placeholder = text; } 
        else { el.innerHTML = text; }
    });
}

function lightUp() {
    document.getElementById('light-bulb-svg').classList.add('lit');
    document.getElementById('light-count-text').innerHTML = "<strong>Lighted.</strong>";
}

function scrollToContact(prod) {
    document.getElementById('productInterest').value = "Inquiry: " + prod;
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function submitForm(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const prod = document.getElementById('productInterest').value;
    const waUrl = `https://wa.me/8619991689868?text=Hi Zhexi, I am ${name}. Inquiry about ${prod}`;
    window.open(waUrl, '_blank');
}

function updateClocks() {
    const now = new Date();
    const cn = new Date(now.getTime() + (480 + now.getTimezoneOffset()) * 60000);
    const ua = new Date(now.getTime() + (120 + now.getTimezoneOffset()) * 60000);
    const opt = { hour: '2-digit', minute: '2-digit', hour12: false };
    document.getElementById('clock-cn').innerText = cn.toLocaleTimeString('en-GB', opt);
    document.getElementById('clock-ua').innerText = ua.toLocaleTimeString('en-GB', opt);
    const uaHour = ua.getHours();
    document.getElementById('resting-icon').style.display = (uaHour >= 22 || uaHour <= 7) ? 'inline' : 'none';
}

setInterval(updateClocks, 1000);
updateClocks();
