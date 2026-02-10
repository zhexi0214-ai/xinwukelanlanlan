// 1. 修复跳转功能：让“Start a Conversation”按钮能够精准定位
function scrollToContact(productName) {
    document.getElementById('productInterest').value = "Inquiry: " + productName;
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// 2. 语言切换逻辑：不破坏按钮原有的点击属性
function changeLang(lang) {
    // 切换按钮样式
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase() === lang) btn.classList.add('active');
    });

    // 翻译所有带 data 属性的元素
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = text;
        } else {
            el.innerText = text;
        }
    });
}

// 3. 修复灯泡功能
function lightUp() {
    const bulb = document.getElementById('light-bulb-svg');
    bulb.classList.add('lit');
    const countEl = document.getElementById('light-count-text');
    countEl.innerHTML = "<strong>Thank you for the light.</strong>";
}

// 4. 时钟功能
function updateClocks() {
    const now = new Date();
    const cnTime = new Date(now.getTime() + (480 + now.getTimezoneOffset()) * 60000);
    const uaTime = new Date(now.getTime() + (120 + now.getTimezoneOffset()) * 60000);
    const options = { hour: '2-digit', minute: '2-digit', hour12: false };
    document.getElementById('clock-cn').innerText = cnTime.toLocaleTimeString('en-GB', options);
    document.getElementById('clock-ua').innerText = uaTime.toLocaleTimeString('en-GB', options);
    
    const uaHour = uaTime.getHours();
    document.getElementById('resting-icon').style.display = (uaHour >= 22 || uaHour <= 7) ? 'inline' : 'none';
}

// 5. 提交表单
function submitForm(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const info = document.getElementById('productInterest').value;
    const waUrl = `https://wa.me/8619991689868?text=Hi Zhexi, I am ${name}. Interested in ${info}`;
    window.open(waUrl, '_blank');
}

setInterval(updateClocks, 1000);
updateClocks();
