import requests

url = "http://127.0.0.1:5000/predict"

data = {
    "layoff_count": 120,
    "stock_price_change_7d": -4,
    "revenue_growth_percent": -2,
    "market_cap_billion_usd": 50,
    "total_funding_million_usd": 200
}

response = requests.post(url, json=data)

print(response.json())