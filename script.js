// 1. 语言切换：使用 innerHTML 确保故事里的 <p> 标签不丢失
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

// 2. 修复灯泡和跳转
function lightUp() {
    document.getElementById('light-bulb-svg').classList.add('lit');
    document.getElementById('light-count-text').innerHTML = "Thank you.";
}

function scrollToContact(prod) {
    document.getElementById('productInterest').value = "Inquiry: " + prod;
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// 3. 表单提交：自动打开 WhatsApp，确保你能收到消息！
function submitForm(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const msg = document.getElementById('message').value;
    const waUrl = `https://wa.me/8619991689868?text=Hi Zhexi, I am ${name}. ${msg}`;
    window.open(waUrl, '_blank');
}

// 4. 时钟
function updateClocks() {
    const now = new Date();
    const cn = new Date(now.getTime() + (480 + now.getTimezoneOffset()) * 60000);
    const ua = new Date(now.getTime() + (120 + now.getTimezoneOffset()) * 60000);
    const opt = { hour: '2-digit', minute: '2-digit', hour12: false };
    document.getElementById('clock-cn').innerText = cn.toLocaleTimeString('en-GB', opt);
    document.getElementById('clock-ua').innerText = ua.toLocaleTimeString('en-GB', opt);
}
setInterval(updateClocks, 1000);
updateClocks();
