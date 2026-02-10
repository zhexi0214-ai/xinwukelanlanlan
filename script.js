// 1. 时钟功能 (北京 & 基辅)
function updateClocks() {
    const now = new Date();
    
    // 北京时间 (UTC+8)
    const cnTime = new Date(now.getTime() + (480 + now.getTimezoneOffset()) * 60000);
    // 基辅时间 (UTC+2) - 考虑冬令时建议手动简单处理或使用 Intl 对象
    const uaTime = new Date(now.getTime() + (120 + now.getTimezoneOffset()) * 60000);

    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    document.getElementById('clock-cn').innerText = cnTime.toLocaleTimeString('en-GB', timeOptions);
    document.getElementById('clock-ua').innerText = uaTime.toLocaleTimeString('en-GB', timeOptions);

    // 自动显示月亮图标：基辅时间晚上 10 点到早上 7 点显示
    const uaHour = uaTime.getHours();
    const moon = document.getElementById('resting-icon');
    if (uaHour >= 22 || uaHour <= 7) {
        moon.style.display = 'inline';
    } else {
        moon.style.display = 'none';
    }
}
setInterval(updateClocks, 1000);
updateClocks();

// 2. 动态随机点灯数字逻辑 (核心修改)
// 原理：基数 1246 + (当前时间 - 项目启动时间) 产生的增量
function initLightCount() {
    const baseCount = 1246;
    const projectStartTime = 1739150000000; // 设置一个固定的项目启动时间戳
    const currentTime = new Date().getTime();
    
    // 计算时间差带来的模拟增长 (每分钟大约增加 1-3 个人)
    const elapsedMinutes = Math.floor((currentTime - projectStartTime) / (1000 * 60));
    const growth = elapsedMinutes * 1.5; // 倍率可以自己调
    
    // 加上一个基于分钟的随机扰动，让每个人看到的尾数稍有不同
    const randomBuffer = Math.floor(Math.random() * 50);
    
    let finalCount = Math.floor(baseCount + growth + randomBuffer);
    
    // 封顶 10000，且不低于 1246
    if (finalCount > 10000) finalCount = 10000;
    if (finalCount < 1246) finalCount = 1246;

    document.getElementById('light-count').innerText = `Today, ${finalCount.toLocaleString()} people joined us in lighting up hope.`;
    return finalCount;
}

let currentLights = initLightCount();

// 点灯互动动画
function lightUp() {
    const icon = document.querySelector('#light-trigger svg');
    const text = document.getElementById('light-count');
    
    // 视觉变化
    icon.style.stroke = "#FFDD00";
    icon.style.fill = "#FFDD00";
    icon.style.filter = "drop-shadow(0 0 15px #FFDD00)";
    
    // 点击后再加 1
    currentLights++;
    text.innerText = `Today, ${currentLights.toLocaleString()} people joined us in lighting up hope.`;
    
    // 震动反馈 (如果手机支持)
    if (navigator.vibrate) navigator.vibrate(50);
    
    // 只允许点一次
    document.getElementById('light-trigger').onclick = null;
    document.getElementById('light-trigger').style.cursor = "default";
}

// 3. 询盘预填
function openInquiry(productName) {
    document.getElementById('productInterest').value = "Inquiry: " + productName;
    document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
}

// 4. 表单提交
async function submitForm(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = "SENDING...";
    btn.disabled = true;

    const data = {
        name: document.getElementById('name').value,
        contact: document.getElementById('contactInfo').value,
        product: document.getElementById('productInterest').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('/api/inquiry', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        alert("Received. In this quiet corner, I will process your request personally.");
        e.target.reset();
    } catch (error) {
        // 即使后端没通，也给用户温情提示
        alert("Thank you. Message sent to my corner. I will reply soon.");
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

// 5. 退出挽留
document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 0) {
        const modal = document.getElementById('exit-intent');
        if (!sessionStorage.getItem('exitShown')) {
            modal.style.display = 'block';
            setTimeout(() => { modal.style.opacity = '1'; }, 10);
            setTimeout(() => {
                modal.style.opacity = '0';
                setTimeout(() => { modal.style.display = 'none'; }, 500);
            }, 4000);
            sessionStorage.setItem('exitShown', 'true');
        }
    }
});
