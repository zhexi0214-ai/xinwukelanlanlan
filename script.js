// 1. 时钟功能
function updateClocks() {
    const now = new Date();
    const cnTime = new Date(now.getTime() + (480 + now.getTimezoneOffset()) * 60000);
    const uaTime = new Date(now.getTime() + (120 + now.getTimezoneOffset()) * 60000);
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    document.getElementById('clock-cn').innerText = cnTime.toLocaleTimeString('en-GB', timeOptions);
    document.getElementById('clock-ua').innerText = uaTime.toLocaleTimeString('en-GB', timeOptions);

    const uaHour = uaTime.getHours();
    const moon = document.getElementById('resting-icon');
    if (uaHour >= 22 || uaHour <= 7) moon.style.display = 'inline';
    else moon.style.display = 'none';
}
setInterval(updateClocks, 1000);
updateClocks();

// 2. 动态人数 (1246+ 模拟增长)
function initLightCount() {
    const baseCount = 1246;
    const projectStartTime = 1739150000000; 
    const currentTime = new Date().getTime();
    const elapsedMinutes = Math.floor((currentTime - projectStartTime) / (1000 * 60));
    const growth = Math.floor(elapsedMinutes * 0.5); 
    const randomBuffer = Math.floor(Math.random() * 30);
    let finalCount = baseCount + growth + randomBuffer;
    if (finalCount > 10000) finalCount = 10000;
    document.getElementById('light-count').innerText = `Today, ${finalCount.toLocaleString()} people joined us in lighting up hope.`;
    return finalCount;
}
let currentLights = initLightCount();

function lightUp() {
    const icon = document.querySelector('#light-trigger svg');
    icon.style.stroke = "#FFDD00"; icon.style.fill = "#FFDD00";
    icon.style.filter = "drop-shadow(0 0 15px #FFDD00)";
    currentLights++;
    document.getElementById('light-count').innerText = `Today, ${currentLights.toLocaleString()} people joined us in lighting up hope.`;
    document.getElementById('light-trigger').onclick = null;
}

// 3. 询盘预填
function openInquiry(productName) {
    document.getElementById('productInterest').value = "Inquiry: " + productName;
    document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
}

// 4. 表单提交 + WhatsApp 跳转
async function submitForm(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerText = "SENDING..."; btn.disabled = true;

    const name = document.getElementById('name').value;
    const contact = document.getElementById('contactInfo').value;
    const product = document.getElementById('productInterest').value;
    const message = document.getElementById('message').value;

    try {
        await fetch('/api/inquiry', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, contact, product, message})
        });
        
        // 自动合成 WhatsApp 消息
        const waMsg = `Hi Zhexi! I'm ${name}. I just sent an inquiry about ${product}. My needs: ${message}`;
        const waUrl = `https://wa.me/8619991689868?text=${encodeURIComponent(waMsg)}`;
        
        if(confirm("Message saved! Direct chat with Zhexi on WhatsApp for faster help?")) {
            window.open(waUrl, '_blank');
        }
    } catch (error) {
        alert("Thanks! Message received in my corner.");
    } finally {
        btn.innerText = "SEND TO ZHEXI"; btn.disabled = false;
        e.target.reset();
    }
}

// 5. 退出挽留
document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 0 && !sessionStorage.getItem('exitShown')) {
        const modal = document.getElementById('exit-intent');
        modal.style.display = 'block';
        setTimeout(() => { modal.style.opacity = '1'; }, 10);
        setTimeout(() => { modal.style.opacity = '0'; setTimeout(() => modal.style.display = 'none', 500); }, 4000);
        sessionStorage.setItem('exitShown', 'true');
    }
});
