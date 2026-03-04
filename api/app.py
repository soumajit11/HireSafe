import joblib
import pandas as pd
from flask import Flask, request, jsonify

app = Flask(__name__)

# load model and features
model = joblib.load("../hiresafe_model.pkl")
features = joblib.load("../model_features.pkl")


@app.route("/")
def home():
    return "HireSafe API is running"


@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    input_df = pd.DataFrame([data])

    # match training features
    input_df = input_df.reindex(columns=features, fill_value=0)

    prediction = model.predict(input_df)[0]

    probs = model.predict_proba(input_df)[0]

    slowdown_prob = probs[list(model.classes_).index("Slowdown")]

    risk_score = round(slowdown_prob * 100, 2)

    return jsonify({
        "prediction": prediction,
        "risk_score": risk_score
    })


if __name__ == "__main__":
    app.run(debug=True)