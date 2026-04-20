import React, { useMemo, useState } from "react";
import "./BudgetPage.css";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";

const NC_RANGES = {
  housing: { min: 700, max: 1200 },
  utilities: { min: 0, max: 150 },
  groceries: { min: 20, max: 250 },
  transportation: { min: 25, max: 500 },
  books: { min: 0, max: 150 },
  entertainment: { min: 50, max: 250 },
};

const clampNum = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

const compareToRange = (value, range) => {
  if (!range) return { label: "—", tone: "neutral" };
  if (value === 0) return { label: "—", tone: "neutral" };
  if (value < range.min) return { label: "Below avg", tone: "good" };
  if (value > range.max) return { label: "Above avg", tone: "warn" };
  return { label: "In range", tone: "ok" };
};

const FieldRow = ({ label, name, value, onChange, hint, range }) => {
  const cmp = compareToRange(clampNum(value), range);

  return (
    <div className="bp-row">
      <div className="bp-row-left">
        <label className="bp-label" htmlFor={name}>
          {label}
        </label>
        {hint && <div className="bp-hint">{hint}</div>}
      </div>

      <div className="bp-row-right">
        <div className="bp-input-wrap">
          <span className="bp-dollar">$</span>
          <input
            id={name}
            name={name}
            className="bp-input"
            type="number"
            inputMode="decimal"
            min="0"
            step="1"
            placeholder="0"
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
          />
        </div>

        <div className={`bp-badge ${cmp.tone}`}>
          {cmp.label}
          {range ? (
            <span className="bp-badge-range">
              ${range.min}–${range.max}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const BudgetPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const [meta, setMeta] = useState({
    monthlyIncome: "",
    budgetStyle: "student",
  });

  const [form, setForm] = useState({
    housing: "",
    utilities: "",
    groceries: "",
    transportation: "",
    phone: "",
    medical: "",
    books: "",
    diningOut: "",
    entertainment: "",
    subscriptions: "",
    shopping: "",
    emergency: "",
    investing: "",
    savingsGoal: "",
  });

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const setMetaField = (name, value) => {
    setMeta((prev) => ({ ...prev, [name]: value }));
  };

  const totals = useMemo(() => {
    const needs =
      clampNum(form.housing) +
      clampNum(form.utilities) +
      clampNum(form.groceries) +
      clampNum(form.transportation) +
      clampNum(form.phone) +
      clampNum(form.medical) +
      clampNum(form.books);

    const wants =
      clampNum(form.diningOut) +
      clampNum(form.entertainment) +
      clampNum(form.subscriptions) +
      clampNum(form.shopping);

    const savings =
      clampNum(form.emergency) +
      clampNum(form.investing) +
      clampNum(form.savingsGoal);

    const total = needs + wants + savings;
    const income = clampNum(meta.monthlyIncome);
    const leftover = income - total;

    return { needs, wants, savings, total, income, leftover };
  }, [form, meta.monthlyIncome]);

  const guideline = useMemo(() => {
    const income = totals.income;
    if (!income) return null;
    return {
      needs: Math.round(income * 0.5),
      wants: Math.round(income * 0.3),
      savings: Math.round(income * 0.2),
    };
  }, [totals.income]);

  // Budget health score (0-100)
  const healthScore = useMemo(() => {
    if (!totals.income) return null;
    let score = 100;

    // Penalize if over budget
    if (totals.leftover < 0) {
      score -= Math.min(40, Math.abs(totals.leftover) / totals.income * 100);
    }

    // Reward savings (up to 20%)
    const savingsRatio = totals.savings / totals.income;
    if (savingsRatio < 0.1) score -= 20;
    else if (savingsRatio < 0.15) score -= 10;

    // Reward balanced spending
    const needsRatio = totals.needs / totals.income;
    const wantsRatio = totals.wants / totals.income;
    if (needsRatio > 0.6) score -= 10;
    if (wantsRatio > 0.4) score -= 10;

    return Math.max(0, Math.min(100, Math.round(score)));
  }, [totals]);

  // Percentage helpers
  const pct = (value) => {
    if (!totals.income) return 0;
    return Math.round((value / totals.income) * 100);
  };

  // Chart Data
  const pieData = [
    { name: "Needs", value: totals.needs },
    { name: "Wants", value: totals.wants },
    { name: "Savings", value: totals.savings },
  ];

  const PIE_COLORS = ["#22c55e", "rgba(46,204,113,0.6)", "rgba(255,255,255,0.3)"];

  const RANGE_FIELDS = [
    { key: "housing", label: "Housing", rangeKey: "housing" },
    { key: "utilities", label: "Utilities", rangeKey: "utilities" },
    { key: "groceries", label: "Groceries", rangeKey: "groceries" },
    { key: "transportation", label: "Transport", rangeKey: "transportation" },
    { key: "books", label: "Books", rangeKey: "books" },
    { key: "entertainment", label: "Fun", rangeKey: "entertainment" },
  ];

  const rangeData = RANGE_FIELDS.map((f) => {
    const user = clampNum(form[f.key]);
    const r = NC_RANGES[f.rangeKey];
    const min = r?.min ?? 0;
    const max = r?.max ?? 0;

    return {
      name: f.label,
      min,
      band: Math.max(0, max - min),
      user,
    };
  });

  const spendingData = [
    { name: "Income", amount: totals.income },
    { name: "Spending", amount: totals.total },
    { name: totals.leftover >= 0 ? "Leftover" : "Over", amount: Math.abs(totals.leftover) },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const getHealthLabel = () => {
    if (healthScore === null) return null;
    if (healthScore >= 85) return { label: "Excellent", tone: "excellent" };
    if (healthScore >= 70) return { label: "Healthy", tone: "good" };
    if (healthScore >= 50) return { label: "Needs Work", tone: "warn" };
    return { label: "At Risk", tone: "danger" };
  };

  const healthLabel = getHealthLabel();

  return (
    <div className="bp-page">
      {/* Hero */}
      <header className="bp-hero">
        <div className="bp-hero-text">
          <span className="bp-eyebrow">BUDGET BUILDER</span>
          <h1 className="bp-title">Plan Your Money</h1>
          <p className="bp-subtitle">
            Track every dollar, compare to student averages, and build healthy financial habits that last.
          </p>
        </div>

        {/* Live Stats - only show when income entered */}
        {totals.income > 0 && (
          <div className="bp-stat-bar">
            <div className="bp-stat">
              <div className="bp-stat-label">Monthly Income</div>
              <div className="bp-stat-value">${totals.income.toLocaleString()}</div>
            </div>
            <div className="bp-stat-divider" />
            <div className="bp-stat">
              <div className="bp-stat-label">Total Spending</div>
              <div className="bp-stat-value">${totals.total.toLocaleString()}</div>
              <div className="bp-stat-sub">{pct(totals.total)}% of income</div>
            </div>
            <div className="bp-stat-divider" />
            <div className="bp-stat">
              <div className="bp-stat-label">
                {totals.leftover >= 0 ? 'Leftover' : 'Over Budget'}
              </div>
              <div className={`bp-stat-value ${totals.leftover < 0 ? 'bp-stat-warn' : 'bp-stat-good'}`}>
                {totals.leftover < 0 ? '−' : ''}${Math.abs(totals.leftover).toLocaleString()}
              </div>
              <div className="bp-stat-sub">
                {totals.leftover >= 0 ? 'Available to save' : 'Cut back to balance'}
              </div>
            </div>
            {healthScore !== null && (
              <>
                <div className="bp-stat-divider" />
                <div className="bp-stat bp-stat-health">
                  <div className="bp-stat-label">Budget Health</div>
                  <div className="bp-health-score">
                    <span className="bp-health-number">{healthScore}</span>
                    <span className="bp-health-max">/100</span>
                  </div>
                  <div className={`bp-health-label bp-health-${healthLabel.tone}`}>
                    {healthLabel.label}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </header>

      <form className="bp-grid" onSubmit={handleSubmit}>
        {/* Setup Card */}
        <section className="bp-card bp-setup">
          <div className="bp-card-header">
            <div className="bp-card-heading">
              <span className="bp-card-step">01</span>
              <h2 className="bp-card-title">Setup</h2>
            </div>
            <p className="bp-card-desc">Tell us about your income and preferred budget style.</p>
          </div>

          <div className="bp-setup-grid">
            <div className="bp-row">
              <div className="bp-row-left">
                <label className="bp-label" htmlFor="monthlyIncome">
                  Monthly Income
                </label>
                <div className="bp-hint">Paychecks, support, scholarships, etc.</div>
              </div>

              <div className="bp-row-right">
                <div className="bp-input-wrap">
                  <span className="bp-dollar">$</span>
                  <input
                    id="monthlyIncome"
                    className="bp-input"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="1"
                    placeholder="0"
                    value={meta.monthlyIncome}
                    onChange={(e) => setMetaField("monthlyIncome", e.target.value)}
                  />
                </div>
                <div className="bp-badge neutral">Monthly</div>
              </div>
            </div>

            <div className="bp-row">
              <div className="bp-row-left">
                <label className="bp-label" htmlFor="budgetStyle">
                  Budget Mode
                </label>
                <div className="bp-hint">Choose a guideline to compare against</div>
              </div>

              <div className="bp-row-right">
                <select
                  id="budgetStyle"
                  className="bp-select"
                  value={meta.budgetStyle}
                  onChange={(e) => setMetaField("budgetStyle", e.target.value)}
                >
                  <option value="student">Student (NC averages)</option>
                  <option value="50-30-20">50 / 30 / 20 rule</option>
                </select>
                <div className="bp-badge neutral">Guide</div>
              </div>
            </div>
          </div>

          {meta.budgetStyle === "50-30-20" && guideline && (
            <div className="bp-guideline">
              <div className="bp-guideline-title">Your 50/30/20 Monthly Targets</div>
              <div className="bp-guideline-grid">
                <div className="guideline-item">
                  <span className="guideline-percent">50%</span>
                  <span className="guideline-label">Needs</span>
                  <span className="guideline-value">${guideline.needs.toLocaleString()}</span>
                </div>
                <div className="guideline-item">
                  <span className="guideline-percent">30%</span>
                  <span className="guideline-label">Wants</span>
                  <span className="guideline-value">${guideline.wants.toLocaleString()}</span>
                </div>
                <div className="guideline-item">
                  <span className="guideline-percent">20%</span>
                  <span className="guideline-label">Savings</span>
                  <span className="guideline-value">${guideline.savings.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Category Overview - only when income entered */}
        {totals.income > 0 && (
          <section className="bp-overview">
            <div className="bp-overview-card bp-overview-needs">
              <div className="bp-overview-header">
                <span className="bp-overview-dot" />
                <span className="bp-overview-label">Needs</span>
              </div>
              <div className="bp-overview-value">${totals.needs.toLocaleString()}</div>
              <div className="bp-overview-meta">
                <span>{pct(totals.needs)}% of income</span>
                <span className="bp-overview-target">target 50%</span>
              </div>
              <div className="bp-overview-bar">
                <div
                  className="bp-overview-fill bp-overview-fill-needs"
                  style={{ width: `${Math.min(pct(totals.needs) * 2, 100)}%` }}
                />
              </div>
            </div>

            <div className="bp-overview-card bp-overview-wants">
              <div className="bp-overview-header">
                <span className="bp-overview-dot" />
                <span className="bp-overview-label">Wants</span>
              </div>
              <div className="bp-overview-value">${totals.wants.toLocaleString()}</div>
              <div className="bp-overview-meta">
                <span>{pct(totals.wants)}% of income</span>
                <span className="bp-overview-target">target 30%</span>
              </div>
              <div className="bp-overview-bar">
                <div
                  className="bp-overview-fill bp-overview-fill-wants"
                  style={{ width: `${Math.min(pct(totals.wants) * 3.33, 100)}%` }}
                />
              </div>
            </div>

            <div className="bp-overview-card bp-overview-savings">
              <div className="bp-overview-header">
                <span className="bp-overview-dot" />
                <span className="bp-overview-label">Savings</span>
              </div>
              <div className="bp-overview-value">${totals.savings.toLocaleString()}</div>
              <div className="bp-overview-meta">
                <span>{pct(totals.savings)}% of income</span>
                <span className="bp-overview-target">target 20%</span>
              </div>
              <div className="bp-overview-bar">
                <div
                  className="bp-overview-fill bp-overview-fill-savings"
                  style={{ width: `${Math.min(pct(totals.savings) * 5, 100)}%` }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Needs */}
        <section
          className={`bp-card bp-card-needs-section ${activeSection === 'needs' ? 'active' : ''}`}
          onMouseEnter={() => setActiveSection('needs')}
          onMouseLeave={() => setActiveSection(null)}
        >
          <div className="bp-card-header">
            <div className="bp-card-heading">
              <span className="bp-card-step bp-step-needs">02</span>
              <h2 className="bp-card-title">Needs</h2>
              {totals.needs > 0 && <span className="bp-card-total">${totals.needs.toLocaleString()}</span>}
            </div>
            <p className="bp-card-desc">Essentials you must pay each month.</p>
          </div>

          <FieldRow label="Housing (rent)" name="housing" value={form.housing} onChange={setField} hint="Off-campus rent + fees" range={NC_RANGES.housing} />
          <FieldRow label="Utilities" name="utilities" value={form.utilities} onChange={setField} hint="Power, water, trash" range={NC_RANGES.utilities} />
          <FieldRow label="Groceries" name="groceries" value={form.groceries} onChange={setField} hint="Food you cook" range={NC_RANGES.groceries} />
          <FieldRow label="Transportation" name="transportation" value={form.transportation} onChange={setField} hint="Gas, bus, parking" range={NC_RANGES.transportation} />
          <FieldRow label="Phone / Internet" name="phone" value={form.phone} onChange={setField} hint="Phone or internet" />
          <FieldRow label="Medical" name="medical" value={form.medical} onChange={setField} hint="Copays, meds" />
          <FieldRow label="Books & Supplies" name="books" value={form.books} onChange={setField} hint="Textbooks, fees" range={NC_RANGES.books} />
        </section>

        {/* Wants */}
        <section
          className={`bp-card bp-card-wants-section ${activeSection === 'wants' ? 'active' : ''}`}
          onMouseEnter={() => setActiveSection('wants')}
          onMouseLeave={() => setActiveSection(null)}
        >
          <div className="bp-card-header">
            <div className="bp-card-heading">
              <span className="bp-card-step bp-step-wants">03</span>
              <h2 className="bp-card-title">Wants</h2>
              {totals.wants > 0 && <span className="bp-card-total">${totals.wants.toLocaleString()}</span>}
            </div>
            <p className="bp-card-desc">Lifestyle spending that improves your quality of life.</p>
          </div>

          <FieldRow label="Dining Out" name="diningOut" value={form.diningOut} onChange={setField} hint="Restaurants, coffee" />
          <FieldRow label="Entertainment" name="entertainment" value={form.entertainment} onChange={setField} hint="Movies, events, fun" range={NC_RANGES.entertainment} />
          <FieldRow label="Subscriptions" name="subscriptions" value={form.subscriptions} onChange={setField} hint="Spotify, Netflix" />
          <FieldRow label="Shopping / Misc" name="shopping" value={form.shopping} onChange={setField} hint="Clothes, random buys" />
        </section>

        {/* Savings */}
        <section
          className={`bp-card bp-card-savings-section ${activeSection === 'savings' ? 'active' : ''}`}
          onMouseEnter={() => setActiveSection('savings')}
          onMouseLeave={() => setActiveSection(null)}
        >
          <div className="bp-card-header">
            <div className="bp-card-heading">
              <span className="bp-card-step bp-step-savings">04</span>
              <h2 className="bp-card-title">Savings & Goals</h2>
              {totals.savings > 0 && <span className="bp-card-total">${totals.savings.toLocaleString()}</span>}
            </div>
            <p className="bp-card-desc">Pay yourself first — build an emergency fund and invest for the future.</p>
          </div>

          <div className="bp-savings-grid">
            <FieldRow label="Emergency Fund" name="emergency" value={form.emergency} onChange={setField} hint="Start with $25–$50" />
            <FieldRow label="Investing" name="investing" value={form.investing} onChange={setField} hint="Paper trading practice" />
            <FieldRow label="Savings Goal" name="savingsGoal" value={form.savingsGoal} onChange={setField} hint="Tuition, trip, laptop" />
          </div>
        </section>

        {/* Summary Card */}
        <section className="bp-card bp-summary-card">
          <div className="bp-card-header">
            <div className="bp-card-heading">
              <span className="bp-card-step bp-step-summary">05</span>
              <h2 className="bp-card-title">Your Budget Summary</h2>
            </div>
            <p className="bp-card-desc">Review everything before generating your visual breakdown.</p>
          </div>

          <div className="bp-summary-grid">
            <div className="bp-summary-row">
              <div className="bp-summary-label">
                <span className="bp-summary-dot bp-dot-needs" />
                Needs
              </div>
              <div className="bp-summary-value">${totals.needs.toLocaleString()}</div>
            </div>
            <div className="bp-summary-row">
              <div className="bp-summary-label">
                <span className="bp-summary-dot bp-dot-wants" />
                Wants
              </div>
              <div className="bp-summary-value">${totals.wants.toLocaleString()}</div>
            </div>
            <div className="bp-summary-row">
              <div className="bp-summary-label">
                <span className="bp-summary-dot bp-dot-savings" />
                Savings
              </div>
              <div className="bp-summary-value">${totals.savings.toLocaleString()}</div>
            </div>
            <div className="bp-summary-row bp-summary-total">
              <div className="bp-summary-label">Total Budget</div>
              <div className="bp-summary-value">${totals.total.toLocaleString()}</div>
            </div>
          </div>

          <div className={`bp-leftover ${totals.leftover < 0 ? "warn" : "good"}`}>
            <div className="bp-leftover-left">
              <div className="bp-leftover-label">
                {totals.leftover < 0 ? "Over Budget" : "Available Leftover"}
              </div>
              <div className="bp-leftover-sub">
                {totals.leftover < 0
                  ? "You're spending more than you earn"
                  : "Consider adding this to savings"}
              </div>
            </div>
            <div className="bp-leftover-value">
              {totals.leftover < 0 ? '−' : ''}${Math.abs(totals.leftover).toLocaleString()}
            </div>
          </div>

          <button className="bp-submit" type="submit">
            Generate Budget Visuals
            <span className="bp-submit-arrow">→</span>
          </button>
        </section>

        {submitted && totals.total > 0 && (
          <div className="bp-charts">
            <div className="bp-chart-card">
              <div className="bp-chart-header">
                <div className="bp-chart-title">Budget Breakdown</div>
                <div className="bp-chart-subtitle">How you're allocating your money</div>
              </div>
              <PieChart data={pieData} colors={PIE_COLORS} size={220} />
            </div>

            <div className="bp-chart-card">
              <div className="bp-chart-header">
                <div className="bp-chart-title">NC Student Comparison</div>
                <div className="bp-chart-subtitle">Your spending vs typical range</div>
              </div>
              <BarChart data={rangeData} color="#22c55e" showRange={true} />
            </div>

            <div className="bp-chart-card bp-chart-wide">
              <div className="bp-chart-header">
                <div className="bp-chart-title">Income vs Spending</div>
                <div className="bp-chart-subtitle">
                  {totals.leftover >= 0
                    ? "You're staying within budget — nice work"
                    : "You're over budget — try cutting wants or increasing income"}
                </div>
              </div>
              <BarChart data={spendingData} color="rgba(46, 204, 113, 0.8)" />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BudgetPage;
