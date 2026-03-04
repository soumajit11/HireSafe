# HireSafe – AI-Based Hiring Risk Prediction System

HireSafe is a Machine Learning system that predicts the **hiring stability of companies** using financial indicators, layoffs data, and market signals.
The system provides a **Hiring Status Prediction and Risk Score (0–100)** to help job seekers understand the stability of companies before applying.

---

# 1. Project Overview

In recent years, hiring trends have become highly unstable due to:

- Economic fluctuations
- AI-driven automation
- Global layoffs
- Market volatility

HireSafe analyzes workforce and financial indicators to predict whether a company is in a:

- **Hiring Phase**
- **Hiring Freeze**
- **Slowdown / Layoff Risk**

The model also generates a **Hiring Risk Score (0–100)**.

---

# 2. Features

1. Hiring status prediction (Hiring / Freeze / Slowdown)
2. Hiring risk score (0–100)
3. Industry stability ranking
4. Risk analytics visualizations
5. Machine learning model deployment with Flask API

---

# 3. Tech Stack

**Programming**

- Python

**Machine Learning**

- Scikit-learn
- RandomForestClassifier
- SMOTE (class balancing)

**Data Processing**

- Pandas
- NumPy

**Visualization**

- Matplotlib
- Seaborn

**Backend**

- Flask API

---

# 4. Machine Learning Pipeline

1. Data Collection
2. Data Cleaning and Preprocessing
3. Feature Engineering
4. Label Engineering
5. Handling Class Imbalance using SMOTE
6. Model Training using RandomForest
7. Model Evaluation
8. Risk Score Generation
9. API Deployment

---

# 5. Model Details

Model Used:

RandomForestClassifier

Why Random Forest?

1. Handles tabular data well
2. Robust against overfitting
3. Works well with mixed features
4. Provides feature importance insights

---

# 6. Risk Score System

The system converts model probabilities into a **Hiring Risk Score (0–100)**.

Risk levels:

| Risk Score | Risk Level    |
| ---------- | ------------- |
| 0 – 35     | Low Risk      |
| 35 – 65    | Moderate Risk |
| 65 – 100   | High Risk     |

Example Output:

Prediction: Freeze
Risk Score: 61.3
Risk Level: Moderate Risk

---

# 7. Project Structure

```
HireSafe/
│
├── hiresafe.ipynb
├── hiresafe_ml_dataset.csv
├── hiresafe_model.pkl
├── model_features.pkl
│
├── api/
│   └── app.py
│
└── README.md
```

---

# 8. Running the API

1. Navigate to the API folder

```
cd api
```

2. Install dependencies

```
pip install flask pandas scikit-learn joblib
```

3. Run the API

```
python app.py
```

Server will start at:

```
http://127.0.0.1:5000
```

---

# 9. API Endpoint

POST request:

```
/predict
```

Example Input:

```json
{
  "layoff_count": 120,
  "stock_price_change_7d": -4,
  "revenue_growth_percent": -2,
  "market_cap_billion_usd": 50,
  "total_funding_million_usd": 200
}
```

Example Output:

```json
{
  "prediction": "Freeze",
  "risk_score": 30.99
}
```

---

# 10. Visualizations

The project includes analytical visualizations such as:

1. Hiring risk score distribution
2. Industry stability ranking
3. Hiring risk heatmap (Industry vs Company Size)
4. Feature importance

These help understand **which factors influence hiring stability**.

---

# 11. Future Improvements

1. Integrate real-time financial APIs
2. Add company search interface
3. Build interactive dashboard
4. Deploy the system as a web application

---

# 12. License

This project is for educational and research purposes.
