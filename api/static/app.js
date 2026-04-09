const form = document.getElementById('predictionForm');
const predictBtn = document.getElementById('predictBtn');
const statusEl = document.getElementById('formStatus');
const predictionEl = document.getElementById('predictionValue');
const riskLevelEl = document.getElementById('riskLevelValue');
const scoreEl = document.getElementById('riskScoreValue');
const gaugeEl = document.getElementById('riskGauge');
const explanationEl = document.getElementById('explanationValue');

function getRiskLevel(score) {
  if (score < 35) return { label: 'Low Risk', color: '#22c55e' };
  if (score < 65) return { label: 'Moderate Risk', color: '#eab308' };
  return { label: 'High Risk', color: '#ef4444' };
}

function animateScore(target) {
  const duration = 600;
  const start = performance.now();

  const tick = (t) => {
    const progress = Math.min((t - start) / duration, 1);
    const value = (target * progress).toFixed(1);
    scoreEl.textContent = value;
    gaugeEl.style.setProperty('--value', value);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function getExplanation(data, riskScore) {
  const reasons = [];
  if (data.layoff_count > 100) reasons.push('high layoff count');
  if (data.revenue_growth_percent < 0) reasons.push('negative revenue growth');
  if (data.stock_price_change_7d < 0) reasons.push('recent stock decline');
  if (data.market_cap_billion_usd < 10) reasons.push('lower market capitalization');

  if (!reasons.length && riskScore < 35) {
    return 'Strong financial and market signals reduced the model risk estimate.';
  }

  return `Primary factors: ${reasons.join(', ')}.`;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  Object.keys(data).forEach((key) => {
    data[key] = Number(data[key]);
  });

  predictBtn.disabled = true;
  statusEl.textContent = 'Calculating risk score...';

  try {
    const res = await fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Prediction request failed.');

    const result = await res.json();
    const riskScore = Number(result.risk_score || 0);
    const risk = getRiskLevel(riskScore);

    predictionEl.textContent = result.prediction;
    riskLevelEl.textContent = risk.label;
    riskLevelEl.style.color = risk.color;
    gaugeEl.style.setProperty('--gauge-color', risk.color);

    animateScore(riskScore);
    explanationEl.textContent = getExplanation(data, riskScore);

    statusEl.textContent = 'Prediction complete.';
  } catch (err) {
    statusEl.textContent = 'Unable to get prediction. Ensure Flask API is running.';
  } finally {
    predictBtn.disabled = false;
  }
});

const commonOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
};

new Chart(document.getElementById('riskDistribution'), {
  type: 'bar',
  data: {
    labels: ['0-20', '20-40', '40-60', '60-80', '80-100'],
    datasets: [{ data: [6, 14, 21, 10, 5], backgroundColor: '#3b82f6' }],
  },
  options: commonOptions,
});

new Chart(document.getElementById('stabilityRanking'), {
  type: 'bar',
  data: {
    labels: ['Healthcare', 'FinTech', 'SaaS', 'E-commerce', 'Media'],
    datasets: [{ data: [82, 73, 66, 58, 44], backgroundColor: '#10b981' }],
  },
  options: { ...commonOptions, indexAxis: 'y' },
});

new Chart(document.getElementById('heatmapChart'), {
  type: 'bubble',
  data: {
    datasets: [
      { label: 'Low', data: [{ x: 1, y: 1, r: 8 }, { x: 2, y: 2, r: 10 }], backgroundColor: 'rgba(34,197,94,0.6)' },
      { label: 'Moderate', data: [{ x: 3, y: 2, r: 10 }, { x: 2, y: 3, r: 9 }], backgroundColor: 'rgba(234,179,8,0.6)' },
      { label: 'High', data: [{ x: 4, y: 4, r: 11 }, { x: 5, y: 4, r: 10 }], backgroundColor: 'rgba(239,68,68,0.6)' },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'Industry Index' }, min: 0, max: 6 },
      y: { title: { display: true, text: 'Company Size Index' }, min: 0, max: 5 },
    },
  },
});

new Chart(document.getElementById('featureImportance'), {
  type: 'bar',
  data: {
    labels: ['Layoff Count', 'Revenue Growth', 'Stock Change', 'Market Cap', 'Funding'],
    datasets: [{ data: [0.31, 0.27, 0.19, 0.13, 0.1], backgroundColor: '#6366f1' }],
  },
  options: commonOptions,
});
