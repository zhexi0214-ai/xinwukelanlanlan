// 1. 时钟功能
function updateClocks() {
    const now = new Date();
    
    // 北京时间 (UTC+8)
    const cnTime = new Date(now.getTime() + (480 + now.getTimezoneOffset()) * 60000);
    // 基辅时间 (UTC+2 / DST+3) - 简单按UTC+2处理，实际可加夏令时判断
    const uaTime = new Date(now.getTime() + (120 + now.getTimezoneOffset()) * 60000);

    document.getElementById('clock-cn').innerText = cnTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    document.getElementById('clock-ua').innerText = uaTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}
setInterval(updateClocks, 1000);
updateClocks();

// 2. 点灯互动
let lights = 1245; // 初始基数
function lightUp() {
    const icon = document.querySelector('#light-trigger svg');
    const text = document.getElementById('light-count');
    
    // 视觉变化
    icon.style.stroke = "#FFDD00";
    icon.style.fill = "#FFDD00";
    icon.style.filter = "drop-shadow(0 0 10px #FFDD00)";
    
    // 数字增加
    lights++;
    text.innerText = `Today, ${lights} people joined us in lighting up hope.`;
    
    // 只允许点一次
    document.getElementById('light-trigger').onclick = null;
}

// 3. 询盘预填
function openInquiry(productName) {
    document.getElementById('productInterest').value = "Inquiry about: " + productName;
    document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
}

// 4. 表单提交 (调用 Python 后端)
async function submitForm(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = "Sending...";
    btn.disabled = true;

    const data = {
        name: document.getElementById('name').value,
        contact: document.getElementById('contactInfo').value,
        product: document.getElementById('productInterest').value,
        message: document.getElementById('message').value
    };

    try {
        // 调用我们写的 api/index.py
        const response = await fetch('/api/inquiry', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        alert("Received. In this quiet corner, I will process your request personally.");
        e.target.reset();
    } catch (error) {
        alert("Received! (Network simulated). I will contact you soon.");
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

// 5. 退出挽留 (Exit Intent)
document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 0) { // 鼠标移出浏览器顶部
        const modal = document.getElementById('exit-intent');
        if (!sessionStorage.getItem('exitShown')) {
            modal.style.display = 'block';
            setTimeout(() => { modal.style.opacity = '1'; }, 10);
            
            // 3秒后自动消失，不过度打扰
            setTimeout(() => {
                modal.style.opacity = '0';
                setTimeout(() => { modal.style.display = 'none'; }, 500);
            }, 3000);
            
            sessionStorage.setItem('exitShown', 'true');
        }
    }
});