// 1. 语言切换核心逻辑
function changeLang(lang) {
    // 切换按钮状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase() === lang) btn.classList.add('active');
    });

    // 遍历所有需要翻译的元素
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
            el.placeholder = text;
        } else {
            el.innerHTML = text; // 使用 innerHTML 兼容品牌故事里的 <p> 标签
        }
    });

    // 存储语言偏好
    localStorage.setItem('preferredLang', lang);
}

// 页面加载时自动应用上次的选择
window.onload = () => {
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    changeLang(savedLang);
    updateClocks();
    initLightCount();
};

// 2. 时钟功能
function updateClocks() {
    const now = new Date();
    const cnTime = new Date(now.getTime() + (480 + now.getTimezoneOffset()) * 60000);
    const uaTime = new Date(now.getTime() + (120 + now.getTimezoneOffset()) * 60000);
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    document.getElementById('clock-cn').innerText = cnTime.toLocaleTimeString('en-GB', timeOptions);
    document.getElementById('clock-ua').innerText = uaTime.toLocaleTimeString('en-GB', timeOptions);
    const uaHour = uaTime.getHours();
    if (uaHour >= 22 || uaHour <= 7) document.getElementById('resting-icon').style.display = 'inline';
}
setInterval(updateClocks, 1000);

// 3. 动态人数
function initLightCount() {
    const baseCount = 1246;
    const projectStartTime = 1739150000000; 
    const currentTime = new Date().getTime();
    const elapsedMinutes = Math.floor((currentTime - projectStartTime) / (1000 * 60));
    const finalCount = baseCount + Math.floor(elapsedMinutes * 0.5);
    document.getElementById('light-count').innerText = `${finalCount.toLocaleString()} people joined.`;
}

// 4. 表单提交 (保持 WhatsApp 跳转)
async function submitForm(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const msg = document.getElementById('message').value;
    const waUrl = `https://wa.me/8619991689868?text=Hi, I am ${name}. ${msg}`;
    window.open(waUrl, '_blank');
}
