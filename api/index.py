from fastapi import FastAPI, Request
from pydantic import BaseModel
import random

app = FastAPI()

class Inquiry(BaseModel):
    name: str
    contact: str
    product: str
    message: str

@app.post("/api/inquiry")
async def submit_inquiry(inquiry: Inquiry):
    # 这里模拟发送邮件或保存数据库
    # 未来可以对接 DeepSeek 自动回复
    return {
        "status": "success", 
        "message": f"Message received. Thank you, {inquiry.name}. I will contact you via {inquiry.contact}."
    }

@app.post("/api/calculate_power")
async def calculate(request: Request):
    data = await request.json()
    items = data.get('items', [])
    
    # 简单的功率计算逻辑
    total_watts = 0
    for item in items:
        if item == 'fridge': total_watts += 150
        if item == 'phone': total_watts += 10
        if item == 'lights': total_watts += 20
        if item == 'laptop': total_watts += 60
        if item == 'heater': total_watts += 1500

    recommendation = ""
    if total_watts > 2000:
        recommendation = "High Demand: We recommend our 5000W Mobile Power Station."
    elif total_watts > 500:
        recommendation = "Medium Demand: Our 3500Wh Station is perfect for you."
    else:
        recommendation = "Basic Demand: Solar Lights + Small Battery fits your needs."

    return {
        "total_watts": total_watts,
        "recommendation": recommendation,
        "note": "Based on average device consumption."
    }