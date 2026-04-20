import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import "./CareerPath.css";
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const labels = [
  "Year 1", "Year 2", "Year 3", "Year 4", "Year 5",
  "Year 6", "Year 7", "Year 8", "Year 9", "Year 10",
  "Year 11", "Year 12", "Year 13", "Year 14", "Year 15"
];

const chartData = {
  labels,
  datasets: [
    {
      fill: true,
      label: "No Degree (Retail - Best Buy)",
      data: [32000, 34000, 36000, 38000, 40000, 42000, 44000, 46000, 48000, 50000, 52000, 54000, 56000, 58000, 60000],
      borderColor: "rgb(34, 197, 94)",
      backgroundColor: "rgba(34, 197, 94, 0.2)",
    },
    {
      fill: true,
      label: "Bachelor's",
      data: [0, 0, 0, 0, 95000, 100000, 105000, 110000, 115000, 125000, 135000, 142000, 148000, 153000, 160000],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.2)",
    },
    {
      fill: true,
      label: "Master's",
      data: [0, 0, 0, 0, 0, 0, 110000, 115000, 120000, 125000, 140000, 150000, 160000, 170000, 180000],
      borderColor: "rgb(168, 85, 247)",
      backgroundColor: "rgba(168, 85, 247, 0.2)",
    },
    {
      fill: true,
      label: "PhD",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 130000, 145000, 160000, 175000, 185000, 195000, 210000],
      borderColor: "rgb(239, 68, 68)",
      backgroundColor: "rgba(239, 68, 68, 0.2)",
    },
  ],
};

const CareerPath = () => {
  const [activeTab, setActiveTab] = useState('bachelor');
  const [isMobileChart, setIsMobileChart] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 640 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileChart(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: isMobileChart ? "bottom" : "top",
        labels: {
          color: "rgba(255, 255, 255, 0.9)",
          boxWidth: isMobileChart ? 16 : 40,
          boxHeight: isMobileChart ? 8 : 12,
          usePointStyle: isMobileChart,
          pointStyle: isMobileChart ? "circle" : undefined,
          font: {
            size: isMobileChart ? 11 : 13,
            weight: 600,
          },
          padding: isMobileChart ? 10 : 15,
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#22c55e",
        bodyColor: "#ffffff",
        padding: 12,
        borderColor: "rgba(34, 197, 94, 0.5)",
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.28,
        borderWidth: isMobileChart ? 2.5 : 3,
      },
      point: {
        radius: isMobileChart ? 1.5 : 3,
        hoverRadius: isMobileChart ? 4 : 6,
        hitRadius: 14,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grace: "8%",
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          maxTicksLimit: isMobileChart ? 5 : 7,
          padding: 8,
          callback: function(value) {
            if (value === 0) return "$0";
            return `$${Math.round(Number(value) / 1000)}k`;
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      x: {
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          autoSkip: true,
          maxRotation: isMobileChart ? 0 : 50,
          minRotation: isMobileChart ? 0 : 0,
          maxTicksLimit: isMobileChart ? 5 : 8,
          padding: 8,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
      },
    },
  };

  // Calculate cumulative earnings
  const moneyEarnedByYear = chartData.datasets.map(dataset => ({
    label: dataset.label,
    cumulative: dataset.data.map((sum => value => sum += value)(0)),
    color: dataset.borderColor,
  }));

  return (
    <div className="career-path-page">
      {/* Hero Section */}
      <section className="career-hero">
        <h1 className="career-title">
          Your Career Path Navigator
        </h1>
        <p className="career-subtitle">
          Invest in your education, multiply your earning potential. Explore degree programs, 
          scholarships, and certifications to build your financial future.
        </p>
      </section>

      {/* Earnings Chart */}
      <section className="career-section">
        <div className="section-card chart-card">
          <div className="card-header">
            <h2 className="section-title">Earnings Comparison</h2>
            <p className="section-description">
              See how education impacts your lifetime earnings potential over 15 years
            </p>
          </div>
          <div className="chart-title-block">
            <h3 className="chart-title">Lifetime Earnings by Education Level</h3>
            <p className="chart-subtitle">Projected yearly earnings across 15 years</p>
          </div>
          <div className="chart-wrapper">
            <Line options={chartOptions} data={chartData} />
          </div>
        </div>
      </section>

      {/* Cumulative Earnings Table */}
      <section className="career-section">
        <div className="section-card">
          <div className="card-header">
            <h2 className="section-title">Total Money Earned Over 15 Years</h2>
            <p className="section-description">
              Cumulative earnings showing long-term financial impact
            </p>
          </div>
          <div className="cumulative-table">
            {moneyEarnedByYear.map((dataset, idx) => (
              <div key={idx} className="cumulative-row">
                <div className="cumulative-label" style={{ borderLeftColor: dataset.color }}>
                  {dataset.label}
                </div>
                <div className="cumulative-value">
                  ${dataset.cumulative[dataset.cumulative.length - 1].toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Pathways */}
      <section className="career-section">
        <div className="section-header">
          <h2 className="page-section-title">Education Pathways</h2>
          <p className="page-section-description">
            Choose your path and explore opportunities at each level
          </p>
        </div>

        {/* Tabs */}
        <div className="pathway-tabs">
          <button 
            className={`tab-btn ${activeTab === 'bachelor' ? 'active' : ''}`}
            onClick={() => setActiveTab('bachelor')}
          >
            Bachelor's
          </button>
          <button 
            className={`tab-btn ${activeTab === 'masters' ? 'active' : ''}`}
            onClick={() => setActiveTab('masters')}
          >
            Master's
          </button>
          <button 
            className={`tab-btn ${activeTab === 'phd' ? 'active' : ''}`}
            onClick={() => setActiveTab('phd')}
          >
            PhD
          </button>
          <button 
            className={`tab-btn ${activeTab === 'work' ? 'active' : ''}`}
            onClick={() => setActiveTab('work')}
          >
            Start Working
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'bachelor' && (
            <div className="pathway-content">
              <div className="pathway-grid">
                {/* Apply */}
                <div className="pathway-card">
                  <h3>Apply to NCAT</h3>
                  <p>Start your journey with a bachelor's degree</p>
                  <a href="https://apply.ncat.edu/apply/" target="_blank" rel="noopener noreferrer" className="pathway-link">
                    Apply Now
                  </a>
                </div>

                {/* Scholarships */}
                <div className="pathway-card">
                  <h3>Scholarships</h3>
                  <p>Financial aid to support your education</p>
                  <div className="link-list">
                    <a href="https://ncat.edu/admissions/financial-aid/types-of-aid/scholarships/index.php" target="_blank" rel="noopener noreferrer">NCAT Scholarships</a>
                    <a href="https://www.ncat.edu/admissions/financial-aid/types-of-aid/scholarships/chapter-scholarships.php" target="_blank" rel="noopener noreferrer">Freshman / Merit</a>
                    <a href="https://www.smartscholarship.org/smart" target="_blank" rel="noopener noreferrer">SMART Scholarship</a>
                    <a href="https://www.cfnc.org/pay-for-college/scholarship-search/" target="_blank" rel="noopener noreferrer">CFNC Search</a>
                    <a href="https://www.scholarships.com/" target="_blank" rel="noopener noreferrer">Scholarships.com</a>
                  </div>
                </div>

                {/* Benefits */}
                <div className="pathway-card highlight">
                  <h3>Why Bachelor's?</h3>
                  <ul className="benefit-list">
                    <li>Higher starting salary ($95K+)</li>
                    <li>Better career opportunities</li>
                    <li>Professional network access</li>
                    <li>Foundation for graduate school</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'masters' && (
            <div className="pathway-content">
              <div className="pathway-grid">
                {/* Apply */}
                <div className="pathway-card">
                  <h3>Apply to NCAT Grad</h3>
                  <p>Advance your career with a master's degree</p>
                  <a href="https://aggieadmissions.ncat.edu/graduateadmissions/" target="_blank" rel="noopener noreferrer" className="pathway-link">
                    Apply Now
                  </a>
                </div>

                {/* Fellowships */}
                <div className="pathway-card">
                  <h3>Major Fellowships</h3>
                  <p>Full funding and stipends available</p>
                  <div className="link-list">
                    <a href="https://www.gemfellowship.org/" target="_blank" rel="noopener noreferrer">GEM Fellowship</a>
                    <a href="https://www.smartscholarship.org/smart" target="_blank" rel="noopener noreferrer">SMART Scholarship</a>
                    <a href="https://www.nsfgrfp.org/" target="_blank" rel="noopener noreferrer">NSF GRFP (~$37K/yr)</a>
                    <a href="https://www.fordfoundation.org/work/our-grants/fellowships/" target="_blank" rel="noopener noreferrer">Ford Foundation</a>
                  </div>
                </div>

                {/* Benefits */}
                <div className="pathway-card highlight">
                  <h3>Why Master's?</h3>
                  <ul className="benefit-list">
                    <li>$110K+ starting salary</li>
                    <li>Specialized expertise</li>
                    <li>Leadership positions</li>
                    <li>Full funding often available</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'phd' && (
            <div className="pathway-content">
              <div className="pathway-grid">
                {/* Apply */}
                <div className="pathway-card">
                  <h3>Apply for PhD</h3>
                  <p>Become a research leader in your field</p>
                  <a href="https://aggieadmissions.ncat.edu/graduateadmissions/" target="_blank" rel="noopener noreferrer" className="pathway-link">
                    Apply Now
                  </a>
                </div>

                {/* Fellowships */}
                <div className="pathway-card">
                  <h3>Top Fellowships</h3>
                  <p>Prestigious fully-funded programs</p>
                  <div className="link-list">
                    <a href="https://www.nsfgrfp.org/" target="_blank" rel="noopener noreferrer">NSF GRFP</a>
                    <a href="https://www.gemfellowship.org/" target="_blank" rel="noopener noreferrer">GEM Fellowship (PhD)</a>
                    <a href="https://www.sfs.opm.gov/" target="_blank" rel="noopener noreferrer">CyberCorps SFS</a>
                    <a href="https://www.hertzfoundation.org/fellowships/" target="_blank" rel="noopener noreferrer">Hertz Fellowship</a>
                    <a href="https://www.dodndsegfellowship.org/" target="_blank" rel="noopener noreferrer">NDSEG Fellowship</a>
                  </div>
                </div>

                {/* Benefits */}
                <div className="pathway-card highlight">
                  <h3>Why PhD?</h3>
                  <ul className="benefit-list">
                    <li>$130K+ starting salary</li>
                    <li>Cutting-edge research</li>
                    <li>Highest expertise level</li>
                    <li>Usually fully funded</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'work' && (
            <div className="pathway-content">
              <div className="pathway-grid">
                {/* Apply */}
                <div className="pathway-card">
                  <h3>Start Your Career</h3>
                  <p>Begin earning immediately</p>
                  <a href="https://jobs.bestbuy.com/bby" target="_blank" rel="noopener noreferrer" className="pathway-link">
                    Apply to Best Buy
                  </a>
                </div>

                {/* Reality Check */}
                <div className="pathway-card">
                  <h3>Reality Check</h3>
                  <p>Immediate income vs. long-term growth</p>
                  <div className="reality-stats">
                    <div className="reality-stat">
                      <span className="stat-label">Starting</span>
                      <span className="stat-value">$32K/yr</span>
                    </div>
                    <div className="reality-stat">
                      <span className="stat-label">After 15 Years</span>
                      <span className="stat-value">$60K/yr</span>
                    </div>
                    <div className="reality-stat">
                      <span className="stat-label">Total Earned</span>
                      <span className="stat-value">$690K</span>
                    </div>
                  </div>
                </div>

                {/* Consider */}
                <div className="pathway-card highlight">
                  <h3>Consider This</h3>
                  <ul className="benefit-list">
                    <li>Start earning now</li>
                    <li>Lower lifetime earnings</li>
                    <li>Can pursue education later</li>
                    <li>Gain work experience</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Certificates Section */}
      <section className="career-section certificates-section">
        <div className="section-header">
          <h2 className="page-section-title">Professional Certificates</h2>
          <p className="page-section-description">
            Boost your skills and earning potential with industry-recognized certifications
          </p>
        </div>

        <div className="certificates-grid">
          {/* Software Engineering */}
          <div className="cert-category">
            <h3 className="cert-category-title">Software Engineering</h3>
            <div className="cert-links">
              <a href="https://www.coursera.org/professional-certificates/google-it-automation" target="_blank" rel="noopener noreferrer">Google IT Automation with Python</a>
              <a href="https://www.edx.org/certificates/professional-certificate/harvardx-computer-science-for-web-programming" target="_blank" rel="noopener noreferrer">Harvard CS50 Web Programming</a>
              <a href="https://www.coursera.org/professional-certificates/meta-back-end-developer" target="_blank" rel="noopener noreferrer">Meta Back-End Developer</a>
              <a href="https://www.coursera.org/professional-certificates/meta-front-end-developer" target="_blank" rel="noopener noreferrer">Meta Front-End Developer</a>
            </div>
          </div>

          {/* Cloud */}
          <div className="cert-category">
            <h3 className="cert-category-title">Cloud Computing</h3>
            <div className="cert-links">
              <a href="https://aws.amazon.com/certification/certified-solutions-architect-associate/" target="_blank" rel="noopener noreferrer">AWS Solutions Architect</a>
              <a href="https://aws.amazon.com/certification/certified-developer-associate/" target="_blank" rel="noopener noreferrer">AWS Developer Associate</a>
              <a href="https://cloud.google.com/certification/cloud-engineer" target="_blank" rel="noopener noreferrer">Google Cloud Engineer</a>
              <a href="https://learn.microsoft.com/en-us/certifications/azure-developer/" target="_blank" rel="noopener noreferrer">Azure Developer Associate</a>
            </div>
          </div>

          {/* Cybersecurity */}
          <div className="cert-category">
            <h3 className="cert-category-title">Cybersecurity</h3>
            <div className="cert-links">
              <a href="https://www.comptia.org/certifications/security" target="_blank" rel="noopener noreferrer">CompTIA Security+</a>
              <a href="https://www.isc2.org/certifications/cissp" target="_blank" rel="noopener noreferrer">CISSP (Advanced)</a>
              <a href="https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/" target="_blank" rel="noopener noreferrer">Certified Ethical Hacker</a>
              <a href="https://www.sans.org/cyber-security-courses/" target="_blank" rel="noopener noreferrer">SANS Certifications</a>
            </div>
          </div>

          {/* Data Science */}
          <div className="cert-category">
            <h3 className="cert-category-title">Data Science / AI</h3>
            <div className="cert-links">
              <a href="https://www.coursera.org/professional-certificates/google-data-analytics" target="_blank" rel="noopener noreferrer">Google Data Analytics</a>
              <a href="https://www.coursera.org/professional-certificates/ibm-data-science" target="_blank" rel="noopener noreferrer">IBM Data Science</a>
              <a href="https://www.deeplearning.ai/courses/machine-learning-specialization/" target="_blank" rel="noopener noreferrer">ML Specialization (Andrew Ng)</a>
              <a href="https://www.coursera.org/professional-certificates/tensorflow-in-practice" target="_blank" rel="noopener noreferrer">TensorFlow Developer</a>
            </div>
          </div>

          {/* DevOps */}
          <div className="cert-category">
            <h3 className="cert-category-title">DevOps / Systems</h3>
            <div className="cert-links">
              <a href="https://www.cncf.io/certification/cka/" target="_blank" rel="noopener noreferrer">Kubernetes Administrator (CKA)</a>
              <a href="https://www.hashicorp.com/certification/terraform-associate" target="_blank" rel="noopener noreferrer">Terraform Associate</a>
              <a href="https://aws.amazon.com/certification/certified-devops-engineer-professional/" target="_blank" rel="noopener noreferrer">AWS DevOps Engineer</a>
            </div>
          </div>

          {/* Project Management */}
          <div className="cert-category">
            <h3 className="cert-category-title">Project Management</h3>
            <div className="cert-links">
              <a href="https://www.pmi.org/certifications/project-management-pmp" target="_blank" rel="noopener noreferrer">PMP (Project Management Pro)</a>
              <a href="https://www.scrum.org/professional-scrum-master-i-certification" target="_blank" rel="noopener noreferrer">Scrum Master (PSM I)</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="career-cta">
        <div className="cta-content">
          <h2>Ready to Invest in Your Future?</h2>
          <p>Every dollar you invest in education multiplies your earning potential. Start your journey today.</p>
          <div className="cta-buttons">
            <button className="cta-btn primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Explore Pathways
            </button>
            <button className="cta-btn secondary" onClick={() => setActiveTab('bachelor')}>
              View Scholarships
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerPath;
