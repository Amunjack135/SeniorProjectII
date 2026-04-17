import React, { useEffect, useRef, useState } from "react";
import "./LearningcenterPage.css";

const LearningCenter = () => {
  const [expandedUnit, setExpandedUnit] = useState(null);
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const unitsSectionRef = useRef(null);
  const quizSectionRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowCourseDetails(false);
        setShowLeaderboard(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Track completed lessons
  const [completedLessons, setCompletedLessons] = useState([]);

  // Track passed unit quizzes
  const [passedUnitQuizzes, setPassedUnitQuizzes] = useState([]);

  // Track active lesson (for video/content display)
  const [activeLesson, setActiveLesson] = useState(null);

  // Unit quiz state - tracks which unit's quiz is active and its progress
  const [activeUnitQuiz, setActiveUnitQuiz] = useState(null);
  const [unitQuizState, setUnitQuizState] = useState({
    currentQuestion: 0,
    score: 0,
    showScore: false,
    selectedAnswer: null,
  });

  // Final quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const courseUnits = [
    {
      id: 1,
      title: "Understanding Personal Finance",
      description: "Build the foundation for lifelong financial success by understanding core personal finance principles.",
      locked: false,
      lessons: [
        {
          id: 'intro-personal-finance',
          title: 'What is Personal Finance?',
          duration: '6 min',
          type: 'video',
          videoUrl: 'https://www.youtube.com/embed/WN9Mks1s4tM',
          content: 'Introduction to personal finance and why it matters.'
        },
        {
          id: 'smart-goals',
          title: 'Setting SMART Financial Goals',
          duration: '10 min',
          type: 'article',
          content: `
            <h4>Why Financial Goals Matter</h4>
            <p>Financial goals give your money a purpose. Without clear goals, it's easy to spend aimlessly and miss opportunities to build wealth.</p>

            <h4>The SMART Framework</h4>
            <p>SMART goals are:</p>
            <ul>
              <li><strong>Specific:</strong> Clear and well-defined</li>
              <li><strong>Measurable:</strong> You can track progress</li>
              <li><strong>Achievable:</strong> Realistic given your situation</li>
              <li><strong>Relevant:</strong> Matters to your life</li>
              <li><strong>Time-bound:</strong> Has a deadline</li>
            </ul>

            <h4>Example SMART Goal</h4>
            <p>Bad: "Save more money"</p>
            <p>Good: "Save $5,000 for an emergency fund within 12 months by setting aside $417 per month"</p>

            <h4>Types of Financial Goals</h4>
            <ul>
              <li><strong>Short-term (under 1 year):</strong> Emergency fund, vacation, new phone</li>
              <li><strong>Medium-term (1-5 years):</strong> Car down payment, wedding, home down payment</li>
              <li><strong>Long-term (5+ years):</strong> Retirement, children's education, financial independence</li>
            </ul>
          `
        },
        {
          id: 'creating-budget',
          title: 'Creating Your First Budget',
          duration: '12 min',
          type: 'article',
          content: `
            <h4>What is a Budget?</h4>
            <p>A budget is a plan for how you'll spend your money each month. It helps you live within your means and work toward your financial goals.</p>

            <h4>The 50/30/20 Rule</h4>
            <p>A simple budgeting framework that divides after-tax income into three categories:</p>
            <ul>
              <li><strong>50% Needs:</strong> Rent, utilities, groceries, transportation, insurance</li>
              <li><strong>30% Wants:</strong> Dining out, entertainment, hobbies, subscriptions</li>
              <li><strong>20% Savings & Debt:</strong> Emergency fund, retirement, extra debt payments</li>
            </ul>

            <h4>Steps to Build Your Budget</h4>
            <ol>
              <li>Calculate your monthly after-tax income</li>
              <li>List all fixed expenses (rent, insurance, subscriptions)</li>
              <li>Track variable expenses for a month (food, gas, entertainment)</li>
              <li>Assign every dollar a category</li>
              <li>Review and adjust monthly</li>
            </ol>

            <h4>Budget Methods</h4>
            <ul>
              <li><strong>Zero-Based Budget:</strong> Every dollar assigned a purpose</li>
              <li><strong>Envelope System:</strong> Cash in envelopes for each category</li>
              <li><strong>Pay Yourself First:</strong> Save/invest before spending</li>
            </ul>
          `
        },
        {
          id: 'cash-flow',
          title: 'Understanding Cash Flow',
          duration: '8 min',
          type: 'article',
          content: `
            <h4>What is Cash Flow?</h4>
            <p>Cash flow is the movement of money in and out of your accounts. Positive cash flow means you earn more than you spend.</p>

            <h4>Income Sources</h4>
            <ul>
              <li>Salary and wages</li>
              <li>Side hustles and freelance work</li>
              <li>Investment returns (dividends, interest)</li>
              <li>Rental income</li>
              <li>Business income</li>
            </ul>

            <h4>Expense Categories</h4>
            <ul>
              <li><strong>Fixed Expenses:</strong> Rent, insurance, loan payments</li>
              <li><strong>Variable Expenses:</strong> Groceries, gas, utilities</li>
              <li><strong>Discretionary Spending:</strong> Entertainment, dining out</li>
            </ul>

            <h4>Improving Your Cash Flow</h4>
            <p>Increase income through raises, side work, or investments. Decrease expenses by cutting unnecessary spending and negotiating bills. Track everything to find leaks.</p>
          `
        },
        {
          id: 'time-value-money',
          title: 'The Time Value of Money',
          duration: '9 min',
          type: 'video',
          videoUrl: 'https://www.youtube.com/embed/733mgqrzNKs',
          content: 'Why a dollar today is worth more than a dollar tomorrow.'
        }
      ],
      quiz: [
        {
          question: "What does the 'M' stand for in SMART goals?",
          options: ["Money", "Measurable", "Monthly", "Managed"],
          correct: 1
        },
        {
          question: "In the 50/30/20 budget rule, what percentage goes toward savings and debt?",
          options: ["10%", "20%", "30%", "50%"],
          correct: 1
        },
        {
          question: "What does positive cash flow mean?",
          options: [
            "You earn more than you spend",
            "You spend more than you earn",
            "Your bank account is full",
            "You have no debt"
          ],
          correct: 0
        },
        {
          question: "Which is an example of a fixed expense?",
          options: ["Groceries", "Entertainment", "Rent", "Gas"],
          correct: 2
        },
        {
          question: "The time value of money principle states that:",
          options: [
            "Money loses value over time",
            "A dollar today is worth more than a dollar in the future",
            "All money is equal regardless of when you receive it",
            "Only cash has time value"
          ],
          correct: 1
        }
      ]
    },
    {
      id: 2,
      title: "Managing Checking and Savings Accounts",
      description: "Master the basics of banking and keep your money safe and accessible.",
      locked: true,
      lessons: [
        {
          id: 'types-bank-accounts',
          title: 'Types of Bank Accounts',
          duration: '8 min',
          type: 'article',
          content: `
            <h4>Checking Accounts</h4>
            <p>Designed for everyday transactions. Used to pay bills, receive paychecks, and make purchases with a debit card. Usually offers little to no interest.</p>

            <h4>Savings Accounts</h4>
            <p>For money you don't need immediately. Earns interest, though typically modest amounts. Federal law limits withdrawals in some cases.</p>

            <h4>High-Yield Savings Accounts</h4>
            <p>Offer significantly higher interest rates than traditional savings accounts, often 10-20 times more. Usually offered by online banks with low overhead costs.</p>

            <h4>Money Market Accounts</h4>
            <p>Combines features of checking and savings. Higher interest rates but often require higher minimum balances. May include limited check-writing abilities.</p>

            <h4>Certificates of Deposit (CDs)</h4>
            <p>Lock your money for a fixed term (3 months to 5 years) in exchange for guaranteed higher interest. Early withdrawal usually results in penalties.</p>
          `
        },
        {
          id: 'choosing-bank',
          title: 'Choosing the Right Bank',
          duration: '10 min',
          type: 'article',
          content: `
            <h4>Types of Financial Institutions</h4>
            <ul>
              <li><strong>Traditional Banks:</strong> Physical branches, full services, lower interest rates</li>
              <li><strong>Online Banks:</strong> No branches, higher interest rates, lower fees</li>
              <li><strong>Credit Unions:</strong> Member-owned, often better rates, community focused</li>
              <li><strong>Investment Banks:</strong> Combined banking and investment services</li>
            </ul>

            <h4>What to Look For</h4>
            <ul>
              <li><strong>FDIC Insurance:</strong> Your deposits are protected up to $250,000</li>
              <li><strong>Fees:</strong> Monthly maintenance, ATM, overdraft, minimum balance</li>
              <li><strong>Interest Rates:</strong> APY on savings and checking</li>
              <li><strong>ATM Network:</strong> Free ATM access in your area</li>
              <li><strong>Mobile App:</strong> Quality of digital banking experience</li>
              <li><strong>Customer Service:</strong> Hours and accessibility</li>
            </ul>

            <h4>Red Flags to Avoid</h4>
            <ul>
              <li>High monthly maintenance fees</li>
              <li>Expensive overdraft fees</li>
              <li>Poor mobile app ratings</li>
              <li>Limited ATM access</li>
              <li>Hidden fees</li>
            </ul>
          `
        },
        {
          id: 'understanding-interest',
          title: 'Understanding Interest Rates',
          duration: '7 min',
          type: 'video',
          videoUrl: 'https://www.youtube.com/embed/qJY35EvDg4Y',
          content: 'How interest rates work on savings and loans.'
        },
        {
          id: 'online-banking',
          title: 'Online and Mobile Banking',
          duration: '6 min',
          type: 'article',
          content: `
            <h4>Modern Banking Features</h4>
            <p>Online and mobile banking have transformed how we manage money. Most banks now offer comprehensive digital services.</p>

            <h4>Common Features</h4>
            <ul>
              <li><strong>Balance Checking:</strong> Real-time account balances</li>
              <li><strong>Transfers:</strong> Between accounts or to other people</li>
              <li><strong>Mobile Deposit:</strong> Deposit checks with your phone camera</li>
              <li><strong>Bill Pay:</strong> Schedule and automate bill payments</li>
              <li><strong>Alerts:</strong> Notifications for transactions and balances</li>
              <li><strong>Zelle/Venmo Integration:</strong> Quick peer-to-peer payments</li>
            </ul>

            <h4>Security Best Practices</h4>
            <ul>
              <li>Use strong, unique passwords</li>
              <li>Enable two-factor authentication</li>
              <li>Never use public Wi-Fi for banking</li>
              <li>Log out after each session</li>
              <li>Monitor accounts regularly</li>
              <li>Set up account alerts</li>
            </ul>

            <h4>Avoiding Scams</h4>
            <p>Banks will never ask for your password or PIN via email, text, or phone. Be cautious of phishing attempts and always verify suspicious communications directly with your bank.</p>
          `
        },
        {
          id: 'protecting-accounts',
          title: 'Protecting Your Accounts',
          duration: '8 min',
          type: 'article',
          content: `
            <h4>Account Security Fundamentals</h4>
            <p>Your bank accounts are primary targets for fraudsters. Taking proper security measures protects your hard-earned money.</p>

            <h4>Strong Authentication</h4>
            <ul>
              <li>Use passwords with 12+ characters, mixed case, numbers, and symbols</li>
              <li>Never reuse passwords across sites</li>
              <li>Use a password manager</li>
              <li>Enable biometric authentication when available</li>
              <li>Set up two-factor authentication (2FA)</li>
            </ul>

            <h4>Monitoring Your Accounts</h4>
            <p>Review your accounts regularly to catch fraud early:</p>
            <ul>
              <li>Check balances weekly</li>
              <li>Review statements monthly</li>
              <li>Set up transaction alerts</li>
              <li>Verify unknown charges immediately</li>
            </ul>

            <h4>What to Do If Compromised</h4>
            <ol>
              <li>Contact your bank immediately</li>
              <li>Change all account passwords</li>
              <li>Review recent transactions</li>
              <li>File a police report for identity theft</li>
              <li>Place a fraud alert with credit bureaus</li>
            </ol>

            <h4>FDIC Insurance</h4>
            <p>The Federal Deposit Insurance Corporation insures deposits up to $250,000 per depositor per bank. This protects you if your bank fails.</p>
          `
        }
      ],
      quiz: [
        {
          question: "What does FDIC insurance cover?",
          options: [
            "Up to $100,000 per account",
            "Up to $250,000 per depositor per bank",
            "Up to $500,000 for all accounts",
            "Only business accounts"
          ],
          correct: 1
        },
        {
          question: "What is the main benefit of a high-yield savings account?",
          options: [
            "Free checking",
            "Significantly higher interest rates",
            "No minimum balance",
            "Unlimited withdrawals"
          ],
          correct: 1
        },
        {
          question: "What is a CD (Certificate of Deposit)?",
          options: [
            "A type of credit card",
            "A savings product with fixed term and guaranteed interest",
            "A music disc",
            "A type of loan"
          ],
          correct: 1
        },
        {
          question: "Which is a security best practice for online banking?",
          options: [
            "Using the same password everywhere",
            "Banking on public Wi-Fi",
            "Enabling two-factor authentication",
            "Sharing your PIN with family"
          ],
          correct: 2
        },
        {
          question: "Credit unions are:",
          options: [
            "Owned by shareholders",
            "Member-owned financial institutions",
            "Government agencies",
            "Investment firms"
          ],
          correct: 1
        }
      ]
    },
    {
      id: 3,
      title: "Building and Maintaining Good Credit",
      description: "Your credit score impacts everything from loans to apartment rentals. Master how to build and protect it.",
      locked: true,
      lessons: [
        {
          id: 'what-is-credit',
          title: 'What is Credit?',
          duration: '7 min',
          type: 'video',
          videoUrl: 'https://www.youtube.com/embed/33J86AKJUGM',
          content: 'Understanding credit and its importance.'
        },
        {
          id: 'credit-score',
          title: 'Understanding Your Credit Score',
          duration: '12 min',
          type: 'article',
          content: `
            <h4>What is a Credit Score?</h4>
            <p>A credit score is a three-digit number (300-850) that represents your creditworthiness. Higher scores mean better loan terms and lower interest rates.</p>

            <h4>Credit Score Ranges</h4>
            <ul>
              <li><strong>Excellent (800-850):</strong> Best interest rates, easy approval</li>
              <li><strong>Very Good (740-799):</strong> Above average rates</li>
              <li><strong>Good (670-739):</strong> Average rates</li>
              <li><strong>Fair (580-669):</strong> Higher rates, may need cosigner</li>
              <li><strong>Poor (Below 580):</strong> Limited credit options</li>
            </ul>

            <h4>What Makes Up Your FICO Score</h4>
            <ul>
              <li><strong>Payment History (35%):</strong> Do you pay on time?</li>
              <li><strong>Credit Utilization (30%):</strong> How much credit do you use?</li>
              <li><strong>Credit History Length (15%):</strong> How long have you had credit?</li>
              <li><strong>Credit Mix (10%):</strong> Variety of credit types</li>
              <li><strong>New Credit (10%):</strong> Recent applications</li>
            </ul>

            <h4>The Three Credit Bureaus</h4>
            <p>Equifax, Experian, and TransUnion each maintain your credit report. Check all three annually for free at AnnualCreditReport.com.</p>
          `
        },
        {
          id: 'building-credit',
          title: 'Building Credit History',
          duration: '10 min',
          type: 'article',
          content: `
            <h4>Starting from Scratch</h4>
            <p>Building credit takes time, but there are several ways to start:</p>

            <h4>Methods to Build Credit</h4>
            <ul>
              <li><strong>Secured Credit Card:</strong> Deposit acts as collateral</li>
              <li><strong>Student Credit Card:</strong> Designed for college students</li>
              <li><strong>Authorized User:</strong> Added to a parent's account</li>
              <li><strong>Credit Builder Loan:</strong> Payments build credit history</li>
              <li><strong>Report Rent/Utilities:</strong> Services like Experian Boost</li>
            </ul>

            <h4>Best Practices</h4>
            <ol>
              <li>Pay every bill on time, every time</li>
              <li>Keep credit utilization below 30% (ideally below 10%)</li>
              <li>Don't close old accounts</li>
              <li>Limit new credit applications</li>
              <li>Check credit reports annually</li>
            </ol>

            <h4>How Long It Takes</h4>
            <p>You need at least 6 months of credit history for a FICO score. Reaching excellent credit typically takes 2-3 years of responsible use.</p>

            <h4>Common Mistakes</h4>
            <ul>
              <li>Missing payments</li>
              <li>Maxing out credit cards</li>
              <li>Closing old accounts</li>
              <li>Applying for too much credit at once</li>
              <li>Ignoring credit reports</li>
            </ul>
          `
        },
        {
          id: 'repairing-credit',
          title: 'Repairing Bad Credit',
          duration: '14 min',
          type: 'article',
          content: `
            <h4>Assessing the Damage</h4>
            <p>Start by pulling your credit reports from all three bureaus. Identify negative items and understand what's impacting your score.</p>

            <h4>Fixing Errors</h4>
            <p>About 1 in 5 credit reports contain errors. Dispute them:</p>
            <ol>
              <li>Gather documentation proving the error</li>
              <li>Contact the credit bureau in writing</li>
              <li>File disputes with the original creditor</li>
              <li>Follow up until resolved (30-45 days typical)</li>
            </ol>

            <h4>Strategies for Improvement</h4>
            <ul>
              <li><strong>Pay Down Debt:</strong> Lower credit utilization quickly boosts scores</li>
              <li><strong>Become Current:</strong> Catch up on any late payments</li>
              <li><strong>Negotiate with Creditors:</strong> Ask for pay-for-delete agreements</li>
              <li><strong>Dispute Inaccuracies:</strong> Remove errors from your reports</li>
              <li><strong>Add Positive History:</strong> Open new accounts and use responsibly</li>
            </ul>

            <h4>Avoiding Scams</h4>
            <p>Beware of credit repair companies promising quick fixes. There's nothing they can do that you can't do yourself for free. Legitimate improvement takes time.</p>

            <h4>Timeline for Improvement</h4>
            <ul>
              <li><strong>Late payments:</strong> Stay on report for 7 years</li>
              <li><strong>Bankruptcies:</strong> 7-10 years</li>
              <li><strong>Hard inquiries:</strong> 2 years</li>
              <li><strong>Collections:</strong> 7 years</li>
            </ul>
          `
        },
        {
          id: 'identity-theft',
          title: 'Protecting Against Identity Theft',
          duration: '9 min',
          type: 'article',
          content: `
            <h4>Understanding Identity Theft</h4>
            <p>Identity theft happens when someone uses your personal information to commit fraud. It can devastate your credit and take years to fully resolve.</p>

            <h4>Prevention Strategies</h4>
            <ul>
              <li><strong>Freeze Your Credit:</strong> Free protection that stops new accounts</li>
              <li><strong>Monitor Accounts:</strong> Check statements and credit reports regularly</li>
              <li><strong>Shred Documents:</strong> Destroy anything with personal info</li>
              <li><strong>Secure Mail:</strong> Use locked mailbox or P.O. Box</li>
              <li><strong>Be Wary Online:</strong> Recognize phishing attempts</li>
              <li><strong>Use Strong Passwords:</strong> Unique for each account</li>
            </ul>

            <h4>Warning Signs</h4>
            <ul>
              <li>Unexpected bills or collection calls</li>
              <li>Missing mail or bills</li>
              <li>Unfamiliar credit report entries</li>
              <li>Denied credit unexpectedly</li>
              <li>IRS notices about duplicate returns</li>
            </ul>

            <h4>If You're a Victim</h4>
            <ol>
              <li>Contact fraud departments of affected companies</li>
              <li>Place fraud alert with credit bureaus</li>
              <li>File report at IdentityTheft.gov</li>
              <li>File police report</li>
              <li>Close compromised accounts</li>
              <li>Monitor credit reports closely</li>
            </ol>
          `
        }
      ],
      quiz: [
        {
          question: "What is the range of FICO credit scores?",
          options: ["0-100", "300-850", "100-1000", "500-999"],
          correct: 1
        },
        {
          question: "What factor most impacts your credit score?",
          options: [
            "Credit mix",
            "New credit inquiries",
            "Payment history",
            "Credit history length"
          ],
          correct: 2
        },
        {
          question: "What is considered a good credit utilization rate?",
          options: [
            "Below 30%, ideally below 10%",
            "50% or higher",
            "Exactly 100%",
            "Utilization doesn't matter"
          ],
          correct: 0
        },
        {
          question: "How long do late payments stay on your credit report?",
          options: ["1 year", "3 years", "7 years", "Forever"],
          correct: 2
        },
        {
          question: "What's the best way to protect against identity theft?",
          options: [
            "Never use credit cards",
            "Freeze your credit and monitor accounts",
            "Keep all documents in plain sight",
            "Share passwords with family"
          ],
          correct: 1
        }
      ]
    },
    {
      id: 4,
      title: "Credit Cards and Consumer Loans",
      description: "Learn to use credit wisely and avoid the debt traps that hurt your finances.",
      locked: true,
      lessons: [
        {
          id: 'how-credit-cards-work',
          title: 'How Credit Cards Work',
          duration: '8 min',
          type: 'video',
          videoUrl: 'https://www.youtube.com/embed/HjuKZa5UxKE',
          content: 'Understanding credit card basics.'
        },
        {
          id: 'choosing-credit-card',
          title: 'Choosing a Credit Card',
          duration: '12 min',
          type: 'article',
          content: `
            <h4>Types of Credit Cards</h4>
            <ul>
              <li><strong>Rewards Cards:</strong> Earn cash back, points, or miles</li>
              <li><strong>Travel Cards:</strong> Points for flights and hotels</li>
              <li><strong>Balance Transfer Cards:</strong> Low intro APR for moving debt</li>
              <li><strong>Secured Cards:</strong> For building/rebuilding credit</li>
              <li><strong>Student Cards:</strong> Designed for college students</li>
              <li><strong>Business Cards:</strong> For business expenses</li>
            </ul>

            <h4>What to Compare</h4>
            <ul>
              <li><strong>APR:</strong> The interest rate on carried balances</li>
              <li><strong>Annual Fee:</strong> Yearly cost for having the card</li>
              <li><strong>Rewards Structure:</strong> How much you earn and where</li>
              <li><strong>Sign-up Bonus:</strong> Initial rewards for new cardholders</li>
              <li><strong>Credit Requirements:</strong> Score needed for approval</li>
              <li><strong>Foreign Transaction Fees:</strong> Important for travelers</li>
            </ul>

            <h4>Reading the Fine Print</h4>
            <p>Always read the Schumer Box (the standardized disclosure). Pay attention to:</p>
            <ul>
              <li>Regular APR vs. intro APR</li>
              <li>Late payment fees</li>
              <li>Cash advance APR and fees</li>
              <li>Minimum payment calculation</li>
              <li>Grace period length</li>
            </ul>

            <h4>Matching Cards to Habits</h4>
            <p>The best card depends on your spending. Heavy travelers benefit from travel rewards. Everyday shoppers may prefer flat-rate cash back. Choose based on where you actually spend money.</p>
          `
        },
        {
          id: 'understanding-apr',
          title: 'Understanding APR and Fees',
          duration: '10 min',
          type: 'article',
          content: `
            <h4>What is APR?</h4>
            <p>Annual Percentage Rate (APR) is the yearly cost of borrowing money, expressed as a percentage. For credit cards, APRs typically range from 15% to 30%.</p>

            <h4>Types of APR</h4>
            <ul>
              <li><strong>Purchase APR:</strong> Interest on regular purchases</li>
              <li><strong>Balance Transfer APR:</strong> Rate for transferred debt</li>
              <li><strong>Cash Advance APR:</strong> Usually highest, starts immediately</li>
              <li><strong>Penalty APR:</strong> Applied after missed payments</li>
              <li><strong>Introductory APR:</strong> Temporary promotional rate</li>
            </ul>

            <h4>How Interest Is Calculated</h4>
            <p>Most cards use the average daily balance method. The APR is divided by 365 to get a daily rate, then applied to your balance each day. This compounds, making interest expensive quickly.</p>

            <h4>The Grace Period</h4>
            <p>If you pay your statement balance in full by the due date, you pay zero interest on purchases. This is the best way to use credit cards.</p>

            <h4>Common Fees</h4>
            <ul>
              <li><strong>Annual Fee:</strong> $0-$695+ per year</li>
              <li><strong>Late Payment:</strong> Up to $40</li>
              <li><strong>Over-limit:</strong> If you exceed credit line</li>
              <li><strong>Balance Transfer:</strong> 3-5% of transferred amount</li>
              <li><strong>Cash Advance:</strong> 3-5% of advance</li>
              <li><strong>Foreign Transaction:</strong> 0-3% per transaction</li>
            </ul>

            <h4>The True Cost of Debt</h4>
            <p>A $5,000 balance at 20% APR making only minimum payments takes over 25 years to pay off and costs $8,000+ in interest. Pay off balances quickly.</p>
          `
        },
        {
          id: 'consumer-loans',
          title: 'Types of Consumer Loans',
          duration: '11 min',
          type: 'article',
          content: `
            <h4>What Are Consumer Loans?</h4>
            <p>Consumer loans are money borrowed for personal use, typically repaid with interest over a fixed period.</p>

            <h4>Secured vs. Unsecured Loans</h4>
            <ul>
              <li><strong>Secured Loans:</strong> Backed by collateral (home, car). Lower interest rates but risk losing asset if you default.</li>
              <li><strong>Unsecured Loans:</strong> No collateral required. Higher rates but nothing at risk if you default (besides credit damage).</li>
            </ul>

            <h4>Common Loan Types</h4>
            <ul>
              <li><strong>Personal Loans:</strong> Flexible use, typically $1,000-$50,000</li>
              <li><strong>Auto Loans:</strong> Secured by vehicle, 3-7 year terms</li>
              <li><strong>Student Loans:</strong> Federal (better terms) and private options</li>
              <li><strong>Mortgages:</strong> Home loans, typically 15-30 years</li>
              <li><strong>Home Equity Loans:</strong> Borrow against home value</li>
              <li><strong>Payday Loans:</strong> Short-term, extremely high rates — AVOID</li>
            </ul>

            <h4>Understanding Loan Terms</h4>
            <ul>
              <li><strong>Principal:</strong> The amount borrowed</li>
              <li><strong>Interest Rate:</strong> Cost of borrowing (fixed or variable)</li>
              <li><strong>Term:</strong> Length of repayment period</li>
              <li><strong>Monthly Payment:</strong> Fixed amount paid monthly</li>
              <li><strong>Origination Fee:</strong> Upfront cost for processing</li>
            </ul>

            <h4>Shopping for Loans</h4>
            <p>Always compare offers from multiple lenders. Look at APR (not just interest rate), fees, terms, and total cost. Pre-qualifying doesn't hurt your credit and helps you compare.</p>
          `
        },
        {
          id: 'avoiding-debt-traps',
          title: 'Avoiding Debt Traps',
          duration: '9 min',
          type: 'article',
          content: `
            <h4>Common Debt Traps</h4>
            <p>Some financial products are designed to keep you in debt. Recognizing them helps you avoid financial disaster.</p>

            <h4>Payday Loans</h4>
            <p>Small, short-term loans with APRs often exceeding 400%. The average borrower is in debt 5 months per year. A $500 loan can cost $1,000+ in fees.</p>

            <h4>Rent-to-Own</h4>
            <p>You pay far more than retail price for furniture, electronics, or appliances. A $500 TV may cost $2,000+ over the rental period.</p>

            <h4>Minimum Payment Trap</h4>
            <p>Credit card companies design minimum payments to maximize interest. Paying only the minimum on $5,000 debt can take 25+ years.</p>

            <h4>Predatory Lending</h4>
            <ul>
              <li>Extremely high interest rates</li>
              <li>Hidden fees</li>
              <li>Balloon payments</li>
              <li>Aggressive sales tactics</li>
              <li>No affordability assessment</li>
            </ul>

            <h4>Healthy Debt Strategies</h4>
            <ul>
              <li><strong>Debt Snowball:</strong> Pay smallest debts first for motivation</li>
              <li><strong>Debt Avalanche:</strong> Pay highest interest first to save money</li>
              <li><strong>Debt Consolidation:</strong> Combine high-interest debts into one loan</li>
              <li><strong>Balance Transfer:</strong> Move debt to 0% intro APR card</li>
            </ul>

            <h4>When to Seek Help</h4>
            <p>If debt feels overwhelming, contact a nonprofit credit counseling agency (NFCC.org). They provide free advice and debt management plans. Avoid for-profit "debt settlement" companies.</p>
          `
        }
      ],
      quiz: [
        {
          question: "What does APR stand for?",
          options: [
            "Annual Payment Rate",
            "Annual Percentage Rate",
            "Average Payment Rate",
            "Applied Purchase Rate"
          ],
          correct: 1
        },
        {
          question: "What is a grace period on a credit card?",
          options: [
            "Extra time to apply",
            "Time after purchase when no interest is charged if paid in full",
            "The time before the card expires",
            "A forgiveness of late fees"
          ],
          correct: 1
        },
        {
          question: "Why should you avoid payday loans?",
          options: [
            "They're too easy to get",
            "APRs often exceed 400%",
            "They require collateral",
            "They build credit too quickly"
          ],
          correct: 1
        },
        {
          question: "What's the difference between secured and unsecured loans?",
          options: [
            "Secured loans require collateral; unsecured don't",
            "Unsecured loans have lower rates",
            "Secured loans are for businesses only",
            "There's no real difference"
          ],
          correct: 0
        },
        {
          question: "The debt avalanche method focuses on paying off:",
          options: [
            "Smallest debts first",
            "Highest interest debts first",
            "Newest debts first",
            "Random debts"
          ],
          correct: 1
        }
      ]
    },
    {
      id: 5,
      title: "Managing Income Taxes",
      description: "Understand how taxes work and strategies to minimize what you owe legally.",
      locked: true,
      lessons: [
        {
          id: 'tax-basics',
          title: 'Tax Basics',
          duration: '10 min',
          type: 'video',
          videoUrl: 'https://www.youtube.com/embed/s0oMdNybD2c',
          content: 'Introduction to the US tax system.'
        },
        {
          id: 'filing-taxes',
          title: 'Filing Your Taxes',
          duration: '14 min',
          type: 'article',
          content: `
            <h4>Who Must File?</h4>
            <p>Generally, if you earn above certain thresholds, you must file taxes. For 2024, single filers under 65 must file if earning $14,600+. Even if you're below the threshold, you may want to file to get refunds for withheld taxes.</p>

            <h4>Filing Status Options</h4>
            <ul>
              <li><strong>Single:</strong> Unmarried, no dependents</li>
              <li><strong>Married Filing Jointly:</strong> Combined return with spouse</li>
              <li><strong>Married Filing Separately:</strong> Separate returns</li>
              <li><strong>Head of Household:</strong> Unmarried with dependents</li>
              <li><strong>Qualifying Widow(er):</strong> Recent spouse death with dependent</li>
            </ul>

            <h4>Key Documents Needed</h4>
            <ul>
              <li><strong>W-2:</strong> Employment income</li>
              <li><strong>1099-NEC:</strong> Freelance/contract income</li>
              <li><strong>1099-INT:</strong> Interest income</li>
              <li><strong>1099-DIV:</strong> Dividend income</li>
              <li><strong>1098:</strong> Mortgage interest</li>
              <li><strong>1098-T:</strong> Tuition payments</li>
            </ul>

            <h4>Filing Options</h4>
            <ul>
              <li><strong>Tax Software:</strong> TurboTax, H&R Block, FreeTaxUSA</li>
              <li><strong>IRS Free File:</strong> Free for incomes under $79,000</li>
              <li><strong>Tax Professional:</strong> CPA or enrolled agent for complex returns</li>
              <li><strong>Paper Filing:</strong> Mail forms directly to IRS</li>
            </ul>

            <h4>Important Deadlines</h4>
            <p>Federal taxes are due April 15 each year. Extensions to file (not to pay) are available. Missing deadlines results in penalties and interest.</p>
          `
        },
        {
          id: 'tax-deductions',
          title: 'Tax Deductions and Credits',
          duration: '12 min',
          type: 'article',
          content: `
            <h4>Deductions vs. Credits</h4>
            <p><strong>Deductions</strong> reduce your taxable income. <strong>Credits</strong> directly reduce your tax bill dollar-for-dollar, making them more valuable.</p>

            <h4>Standard vs. Itemized Deductions</h4>
            <p>Take the larger of:</p>
            <ul>
              <li><strong>Standard Deduction:</strong> Set amount ($14,600 single, $29,200 joint for 2024)</li>
              <li><strong>Itemized Deductions:</strong> Specific expenses totaled up</li>
            </ul>

            <h4>Common Itemized Deductions</h4>
            <ul>
              <li>Mortgage interest</li>
              <li>State and local taxes (SALT, capped at $10,000)</li>
              <li>Charitable contributions</li>
              <li>Medical expenses over 7.5% of AGI</li>
              <li>Investment interest</li>
            </ul>

            <h4>Valuable Tax Credits</h4>
            <ul>
              <li><strong>Earned Income Tax Credit:</strong> For low-to-moderate income workers</li>
              <li><strong>Child Tax Credit:</strong> Up to $2,000 per qualifying child</li>
              <li><strong>American Opportunity Credit:</strong> Up to $2,500 for education</li>
              <li><strong>Lifetime Learning Credit:</strong> Up to $2,000 for continuing education</li>
              <li><strong>Saver's Credit:</strong> For retirement contributions</li>
              <li><strong>Residential Energy Credit:</strong> For solar and efficiency upgrades</li>
            </ul>

            <h4>Refundable vs. Non-Refundable Credits</h4>
            <p>Refundable credits can result in a refund even if you owe no tax. Non-refundable credits only reduce your tax to zero.</p>
          `
        },
        {
          id: 'tax-advantaged',
          title: 'Tax-Advantaged Accounts',
          duration: '11 min',
          type: 'article',
          content: `
            <h4>Why They Matter</h4>
            <p>Tax-advantaged accounts are powerful tools for building wealth while reducing your tax burden. Understanding them is essential for long-term financial success.</p>

            <h4>Retirement Accounts</h4>
            <ul>
              <li><strong>401(k):</strong> Employer-sponsored, pre-tax contributions, $23,000 limit (2024)</li>
              <li><strong>Roth 401(k):</strong> After-tax contributions, tax-free growth and withdrawals</li>
              <li><strong>Traditional IRA:</strong> Pre-tax, $7,000 limit ($8,000 if 50+)</li>
              <li><strong>Roth IRA:</strong> After-tax, tax-free growth</li>
              <li><strong>SEP-IRA:</strong> For self-employed</li>
              <li><strong>SIMPLE IRA:</strong> For small businesses</li>
            </ul>

            <h4>Health Savings Account (HSA)</h4>
            <p>Triple tax advantage: pre-tax contributions, tax-free growth, tax-free withdrawals for medical expenses. Best savings vehicle available. Requires high-deductible health plan.</p>

            <h4>Education Accounts</h4>
            <ul>
              <li><strong>529 Plan:</strong> Tax-free growth for education expenses</li>
              <li><strong>Coverdell ESA:</strong> Limited to $2,000 annually</li>
            </ul>

            <h4>Flexible Spending Accounts (FSA)</h4>
            <p>Pre-tax dollars for healthcare or dependent care expenses. Use-it-or-lose-it rule applies.</p>

            <h4>Priority Order</h4>
            <ol>
              <li>401(k) up to employer match (free money)</li>
              <li>HSA (if eligible)</li>
              <li>Max out Roth IRA</li>
              <li>Continue 401(k) contributions</li>
              <li>529 for kids' education</li>
              <li>Taxable brokerage accounts</li>
            </ol>
          `
        },
        {
          id: 'tax-planning',
          title: 'Planning for Taxes',
          duration: '8 min',
          type: 'article',
          content: `
            <h4>Year-Round Tax Planning</h4>
            <p>Smart tax planning happens all year, not just at filing time. Small moves throughout the year can save hundreds or thousands.</p>

            <h4>Adjusting Withholding</h4>
            <p>Use IRS's Tax Withholding Estimator to ensure you're having the right amount withheld. Update your W-4 when life changes occur (marriage, kids, new job).</p>

            <h4>Tax-Loss Harvesting</h4>
            <p>Sell investments at a loss to offset gains. You can deduct up to $3,000 of net losses against ordinary income annually.</p>

            <h4>Bunching Deductions</h4>
            <p>Consolidate deductible expenses into one year to exceed the standard deduction, then take the standard deduction next year.</p>

            <h4>Retirement Contributions</h4>
            <ul>
              <li>Max contributions lower taxable income</li>
              <li>Backdoor Roth for high earners</li>
              <li>Catch-up contributions if 50+</li>
            </ul>

            <h4>Avoiding Audits</h4>
            <ul>
              <li>Report all income accurately</li>
              <li>Keep detailed records</li>
              <li>Be reasonable with deductions</li>
              <li>File electronically</li>
              <li>Respond quickly to IRS notices</li>
            </ul>

            <h4>Record Keeping</h4>
            <p>Keep tax records for at least 3 years, 7 years for complex returns. Store digitally with backups. Organize as you go to simplify next year's filing.</p>
          `
        }
      ],
      quiz: [
        {
          question: "Which is more valuable to a taxpayer?",
          options: [
            "A $1,000 deduction",
            "A $1,000 credit",
            "They're identical",
            "Depends on the year"
          ],
          correct: 1
        },
        {
          question: "When are federal taxes typically due?",
          options: ["January 15", "April 15", "July 15", "December 31"],
          correct: 1
        },
        {
          question: "Which account offers a triple tax advantage?",
          options: [
            "Traditional 401(k)",
            "Roth IRA",
            "Health Savings Account (HSA)",
            "529 Plan"
          ],
          correct: 2
        },
        {
          question: "What is the standard deduction?",
          options: [
            "A credit applied to all returns",
            "A fixed amount reducing taxable income that you can take instead of itemizing",
            "A penalty for late filing",
            "An extra tax for high earners"
          ],
          correct: 1
        },
        {
          question: "What's a good first priority for retirement savings?",
          options: [
            "Max out a taxable brokerage account",
            "Buy real estate",
            "Contribute to 401(k) up to employer match",
            "Put everything in savings"
          ],
          correct: 2
        }
      ]
    },
    {
      id: 6,
      title: "Stock Market Fundamentals",
      description: "Your foundation of investing knowledge starts with understanding how the stock market works.",
      locked: true,
      lessons: [
        {
          id: 'intro-stock-market',
          title: 'What is the Stock Market?',
          duration: '5 min',
          type: 'video',
          videoUrl: 'https://www.youtube.com/embed/p7HKvqRI_Bo',
          content: 'Learn the basics of how the stock market works and why it exists.'
        },
        {
          id: 'how-stocks-work',
          title: 'How Stocks Work',
          duration: '8 min',
          type: 'article',
          content: `
            <h4>Understanding Stock Ownership</h4>
            <p>When you buy a stock, you're purchasing a small piece of ownership in a company. This makes you a shareholder, giving you a claim on the company's assets and earnings.</p>

            <h4>How Stock Prices Change</h4>
            <p>Stock prices fluctuate based on supply and demand. When more people want to buy a stock (demand) than sell it (supply), the price goes up. Conversely, if more people want to sell than buy, the price falls.</p>

            <h4>Making Money from Stocks</h4>
            <p>There are two main ways to profit from stocks:</p>
            <ul>
              <li><strong>Capital Gains:</strong> Selling your stock for more than you paid for it</li>
              <li><strong>Dividends:</strong> Regular payments companies make to shareholders from their profits</li>
            </ul>

            <h4>Stock Classes</h4>
            <p>Companies may offer different classes of stock, most commonly:</p>
            <ul>
              <li><strong>Common Stock:</strong> Includes voting rights and potential dividends</li>
              <li><strong>Preferred Stock:</strong> Priority for dividends but typically no voting rights</li>
            </ul>
          `
        },
        {
          id: 'stock-exchanges',
          title: 'Stock Exchanges Explained',
          duration: '6 min',
          type: 'article',
          content: `
            <h4>What is a Stock Exchange?</h4>
            <p>A stock exchange is a regulated marketplace where stocks and other securities are bought and sold. It provides a transparent, organized environment for trading.</p>

            <h4>Major Stock Exchanges</h4>
            <ul>
              <li><strong>New York Stock Exchange (NYSE):</strong> The world's largest stock exchange, home to many blue-chip companies</li>
              <li><strong>NASDAQ:</strong> Known for technology and growth companies, fully electronic trading platform</li>
              <li><strong>London Stock Exchange (LSE):</strong> One of the oldest exchanges, serving international markets</li>
            </ul>

            <h4>How Exchanges Work</h4>
            <p>Stock exchanges match buyers and sellers through electronic systems. They ensure fair pricing through continuous bidding and asking, creating market transparency.</p>

            <h4>Trading Hours</h4>
            <p>Most exchanges operate during regular business hours in their time zones. The NYSE and NASDAQ trade from 9:30 AM to 4:00 PM Eastern Time on weekdays.</p>
          `
        },
        {
          id: 'market-participants',
          title: 'Market Participants',
          duration: '7 min',
          type: 'article',
          content: `
            <h4>Who Trades in the Stock Market?</h4>
            <p>The stock market includes various types of participants, each with different roles and strategies:</p>

            <h4>Retail Investors</h4>
            <p>Individual investors like you and me who buy and sell stocks through brokerage accounts. Retail investors typically trade smaller amounts and invest for long-term goals.</p>

            <h4>Institutional Investors</h4>
            <ul>
              <li><strong>Mutual Funds:</strong> Pool money from many investors to buy diversified portfolios</li>
              <li><strong>Pension Funds:</strong> Manage retirement savings for millions of workers</li>
              <li><strong>Hedge Funds:</strong> Use sophisticated strategies for high-net-worth clients</li>
              <li><strong>Insurance Companies:</strong> Invest premiums to meet future obligations</li>
            </ul>

            <h4>Market Makers</h4>
            <p>Firms that provide liquidity by always being ready to buy or sell specific stocks, ensuring smooth market operations.</p>

            <h4>Brokers</h4>
            <p>Licensed professionals or firms that execute trades on behalf of investors, connecting buyers and sellers.</p>
          `
        },
        {
          id: 'bull-bear',
          title: 'Bull vs Bear Markets',
          duration: '9 min',
          type: 'video',
          videoUrl: 'https://www.youtube.com/embed/4S3AkR22lSE',
          content: 'Understanding market trends and cycles.'
        }
      ],
      quiz: [
        {
          question: "What is a Bull Market?",
          options: [
            "A market where prices are falling",
            "A market where prices are rising consistently",
            "A market with no price movement",
            "A market only for livestock trading"
          ],
          correct: 1
        },
        {
          question: "What does buying a stock mean?",
          options: [
            "Loaning money to a company",
            "Buying a piece of ownership in a company",
            "Renting stock from an exchange",
            "Paying interest to a broker"
          ],
          correct: 1
        },
        {
          question: "What are the two main ways to profit from stocks?",
          options: [
            "Interest and fees",
            "Capital gains and dividends",
            "Loans and bonds",
            "Taxes and rebates"
          ],
          correct: 1
        },
        {
          question: "When do NYSE and NASDAQ trade?",
          options: [
            "24/7",
            "9:30 AM to 4:00 PM Eastern, weekdays",
            "Only on weekends",
            "9:00 AM to 5:00 PM, all days"
          ],
          correct: 1
        },
        {
          question: "What role do market makers play?",
          options: [
            "They set stock prices",
            "They provide liquidity by being ready to buy or sell",
            "They only buy stocks for hedge funds",
            "They manage individual retirement accounts"
          ],
          correct: 1
        }
      ]
    },
    {
      id: 7,
      title: "Investment Terminology",
      description: "Master the essential terms every investor needs to know.",
      locked: true,
      lessons: [
        {
          id: 'portfolio-diversification',
          title: 'Portfolio & Diversification',
          duration: '12 min',
          type: 'video',
          videoUrl: 'https://www.youtube.com/embed/gF_uTM_B5qk',
          content: 'Learn about portfolio diversification strategies.'
        },
        {
          id: 'dividends-yields',
          title: 'Dividends & Yields',
          duration: '10 min',
          type: 'article',
          content: `
            <h4>What are Dividends?</h4>
            <p>Dividends are payments companies make to shareholders from their profits. They're typically paid quarterly and represent a share of the company's earnings.</p>

            <h4>Understanding Dividend Yield</h4>
            <p>Dividend yield is a financial ratio that shows how much a company pays in dividends relative to its stock price:</p>
            <p><strong>Dividend Yield = (Annual Dividends Per Share / Stock Price) × 100</strong></p>

            <h4>Example Calculation</h4>
            <p>If a stock costs $100 and pays $4 in annual dividends, the dividend yield is 4%.</p>

            <h4>Types of Dividend Stocks</h4>
            <ul>
              <li><strong>High-Yield Stocks:</strong> Offer higher dividend payments, often mature companies</li>
              <li><strong>Dividend Growth Stocks:</strong> Consistently increase dividends over time</li>
              <li><strong>Dividend Aristocrats:</strong> Companies that have increased dividends for 25+ consecutive years</li>
            </ul>

            <h4>Why Companies Pay Dividends</h4>
            <p>Mature, profitable companies often pay dividends to reward shareholders and demonstrate financial health. Growth companies typically reinvest profits instead.</p>
          `
        },
        {
          id: 'market-cap',
          title: 'Market Cap & Valuation',
          duration: '15 min',
          type: 'article',
          content: `
            <h4>What is Market Capitalization?</h4>
            <p>Market capitalization (market cap) is the total value of all a company's outstanding shares. It's calculated by multiplying the stock price by the number of shares.</p>
            <p><strong>Market Cap = Stock Price × Total Outstanding Shares</strong></p>

            <h4>Market Cap Categories</h4>
            <ul>
              <li><strong>Large-Cap:</strong> $10 billion+ (e.g., Apple, Microsoft) - Established, stable companies</li>
              <li><strong>Mid-Cap:</strong> $2-10 billion - Growing companies with expansion potential</li>
              <li><strong>Small-Cap:</strong> $300 million-$2 billion - Smaller companies with higher growth potential and risk</li>
              <li><strong>Micro-Cap:</strong> Under $300 million - Very small, highly volatile companies</li>
            </ul>

            <h4>Why Market Cap Matters</h4>
            <p>Market cap helps investors understand a company's size, risk profile, and growth potential. Larger companies tend to be more stable, while smaller companies may offer higher growth potential with increased risk.</p>

            <h4>Market Cap vs. Company Value</h4>
            <p>Market cap represents what investors think the company is worth, not necessarily its book value or intrinsic value. It fluctuates with stock price changes.</p>
          `
        },
        {
          id: 'pe-ratio',
          title: 'P/E Ratio Explained',
          duration: '8 min',
          type: 'article',
          content: `
            <h4>Understanding P/E Ratio</h4>
            <p>The Price-to-Earnings (P/E) ratio is one of the most widely used valuation metrics in investing. It compares a company's stock price to its earnings per share (EPS).</p>
            <p><strong>P/E Ratio = Stock Price / Earnings Per Share</strong></p>

            <h4>Interpreting P/E Ratios</h4>
            <ul>
              <li><strong>High P/E (20+):</strong> Investors expect high growth, stock may be overvalued</li>
              <li><strong>Low P/E (Under 15):</strong> May be undervalued, or company faces challenges</li>
              <li><strong>Average P/E (15-20):</strong> Fairly valued relative to earnings</li>
            </ul>

            <h4>Example</h4>
            <p>If a stock trades at $50 and the company earned $5 per share last year, the P/E ratio is 10 ($50 / $5 = 10). This means investors are willing to pay $10 for every $1 of earnings.</p>

            <h4>Limitations</h4>
            <p>P/E ratios should be compared within the same industry, as different sectors have different typical ranges. Also, one-time events can distort earnings and the P/E ratio.</p>

            <h4>Forward P/E vs. Trailing P/E</h4>
            <p>Trailing P/E uses past earnings, while forward P/E uses estimated future earnings, giving insight into growth expectations.</p>
          `
        }
      ],
      quiz: [
        {
          question: "What does 'Portfolio Diversification' mean?",
          options: [
            "Investing all money in one stock",
            "Spreading investments across different assets to reduce risk",
            "Only investing in technology companies",
            "Keeping all money in cash"
          ],
          correct: 1
        },
        {
          question: "What are Dividends?",
          options: [
            "Fees charged by brokers",
            "Payments made by companies to shareholders from profits",
            "The price you pay for a stock",
            "Losses in your investment"
          ],
          correct: 1
        },
        {
          question: "What does Market Capitalization represent?",
          options: [
            "The total value of a company's outstanding shares",
            "The number of employees in a company",
            "The physical size of company buildings",
            "The company's annual revenue"
          ],
          correct: 0
        },
        {
          question: "What does P/E Ratio stand for?",
          options: [
            "Profit/Expense Ratio",
            "Price/Earnings Ratio",
            "Portfolio/Equity Ratio",
            "Performance/Evaluation Ratio"
          ],
          correct: 1
        },
        {
          question: "A large-cap company has a market cap of:",
          options: [
            "Under $300 million",
            "$300 million to $2 billion",
            "$2 billion to $10 billion",
            "$10 billion or more"
          ],
          correct: 3
        }
      ]
    },
    {
      id: 8,
      title: "Investment Strategies",
      description: "Learn proven strategies for building long-term wealth through smart investing.",
      locked: true,
      lessons: [
        {
          id: 'value-investing',
          title: 'Value Investing',
          duration: '15 min',
          type: 'video',
          videoUrl: 'https://www.youtube.com/embed/gF_uTM_B5qk',
          content: 'Value investing principles and strategies.'
        },
        {
          id: 'growth-investing',
          title: 'Growth Investing',
          duration: '12 min',
          type: 'article',
          content: `
            <h4>What is Growth Investing?</h4>
            <p>Growth investing focuses on companies expected to grow at an above-average rate compared to other companies. These companies typically reinvest earnings rather than paying dividends.</p>

            <h4>Characteristics of Growth Stocks</h4>
            <ul>
              <li><strong>High Revenue Growth:</strong> Rapidly increasing sales year over year</li>
              <li><strong>Innovative Products:</strong> Leading-edge technology or unique offerings</li>
              <li><strong>Market Expansion:</strong> Entering new markets or disrupting existing ones</li>
              <li><strong>High P/E Ratios:</strong> Investors willing to pay premium prices for future growth</li>
            </ul>

            <h4>Growth vs. Value Investing</h4>
            <p>While value investors look for underpriced stocks, growth investors focus on companies with strong future potential, even if currently expensive.</p>

            <h4>Risks of Growth Investing</h4>
            <p>Growth stocks can be volatile. If growth expectations aren't met, prices can fall dramatically. They're also more sensitive to interest rate changes and economic conditions.</p>

            <h4>Examples of Growth Sectors</h4>
            <p>Technology, biotechnology, renewable energy, and e-commerce are common growth sectors with high expansion potential.</p>
          `
        },
        {
          id: 'index-funds',
          title: 'Index Fund Investing',
          duration: '18 min',
          type: 'article',
          content: `
            <h4>What are Index Funds?</h4>
            <p>Index funds are investment funds that track a specific market index, such as the S&P 500. They provide instant diversification by holding all (or a representative sample) of the securities in an index.</p>

            <h4>Benefits of Index Funds</h4>
            <ul>
              <li><strong>Low Costs:</strong> Minimal management fees compared to actively managed funds</li>
              <li><strong>Diversification:</strong> Instant exposure to hundreds or thousands of stocks</li>
              <li><strong>Consistent Returns:</strong> Match market performance over time</li>
              <li><strong>Simplicity:</strong> Easy to understand and manage</li>
              <li><strong>Tax Efficiency:</strong> Lower turnover means fewer taxable events</li>
            </ul>

            <h4>Popular Index Funds</h4>
            <ul>
              <li><strong>S&P 500 Index:</strong> Tracks 500 largest U.S. companies</li>
              <li><strong>Total Stock Market Index:</strong> Covers entire U.S. stock market</li>
              <li><strong>International Index:</strong> Provides global diversification</li>
              <li><strong>Bond Index:</strong> Tracks fixed-income securities</li>
            </ul>

            <h4>Why Index Funds Work</h4>
            <p>Studies show that most actively managed funds fail to beat index funds over long periods after accounting for fees. Index funds offer a reliable path to market returns.</p>

            <h4>Getting Started</h4>
            <p>Most brokerages offer low-cost index funds. Start with broad market funds like S&P 500 or total market indexes for core holdings.</p>
          `
        },
        {
          id: 'dollar-cost-avg',
          title: 'Dollar-Cost Averaging',
          duration: '10 min',
          type: 'video',
          videoUrl: 'https://www.youtube.com/embed/gF_uTM_B5qk',
          content: 'Dollar-cost averaging strategy explained.'
        }
      ],
      quiz: [
        {
          question: "What is value investing?",
          options: [
            "Buying only the most expensive stocks",
            "Looking for undervalued companies trading below intrinsic value",
            "Investing only in new companies",
            "Selling stocks quickly for profit"
          ],
          correct: 1
        },
        {
          question: "What is dollar-cost averaging?",
          options: [
            "Converting dollars to other currencies",
            "Investing a fixed amount at regular intervals regardless of price",
            "Buying only cheap stocks",
            "A type of currency trading"
          ],
          correct: 1
        },
        {
          question: "What do index funds track?",
          options: [
            "One specific stock",
            "Only dividend stocks",
            "A specific market index like the S&P 500",
            "Commodity prices"
          ],
          correct: 2
        },
        {
          question: "Growth stocks typically have:",
          options: [
            "Low P/E ratios",
            "High dividend yields",
            "High P/E ratios and low or no dividends",
            "Stable, slow growth"
          ],
          correct: 2
        },
        {
          question: "A major advantage of index funds is:",
          options: [
            "Guaranteed high returns",
            "Low costs and instant diversification",
            "They beat the market every year",
            "No risk involved"
          ],
          correct: 1
        }
      ]
    },
    {
      id: 9,
      title: "Risk Management",
      description: "Protect your investments and manage portfolio risk effectively.",
      locked: true,
      lessons: [
        {
          id: 'risk-basics',
          title: 'Understanding Investment Risk',
          duration: '20 min',
          type: 'video',
          videoUrl: 'https://www.youtube.com/embed/gF_uTM_B5qk',
          content: 'Understanding different types of investment risk.'
        },
        {
          id: 'asset-allocation',
          title: 'Asset Allocation Strategies',
          duration: '15 min',
          type: 'article',
          content: `
            <h4>What is Asset Allocation?</h4>
            <p>Asset allocation is the process of dividing your investment portfolio among different asset categories such as stocks, bonds, cash, and real estate. It's one of the most important investment decisions you'll make.</p>

            <h4>Main Asset Classes</h4>
            <ul>
              <li><strong>Stocks (Equities):</strong> Higher risk, higher potential returns, best for long-term growth</li>
              <li><strong>Bonds (Fixed Income):</strong> Lower risk, steady income, provides stability</li>
              <li><strong>Cash & Cash Equivalents:</strong> Lowest risk, highest liquidity, minimal returns</li>
              <li><strong>Real Estate:</strong> Tangible assets, inflation hedge, rental income potential</li>
            </ul>

            <h4>Factors Affecting Your Allocation</h4>
            <ul>
              <li><strong>Risk Tolerance:</strong> How much volatility can you handle?</li>
              <li><strong>Time Horizon:</strong> When will you need the money?</li>
              <li><strong>Financial Goals:</strong> Retirement, home purchase, education?</li>
              <li><strong>Age:</strong> Younger investors can typically take more risk</li>
            </ul>

            <h4>Common Allocation Strategies</h4>
            <p><strong>Age-Based Rule:</strong> Hold (100 - your age)% in stocks. A 30-year-old would hold 70% stocks, 30% bonds.</p>
            <p><strong>Conservative:</strong> 40% stocks, 50% bonds, 10% cash</p>
            <p><strong>Moderate:</strong> 60% stocks, 35% bonds, 5% cash</p>
            <p><strong>Aggressive:</strong> 80% stocks, 15% bonds, 5% cash</p>

            <h4>Why It Matters</h4>
            <p>Studies show that asset allocation accounts for over 90% of portfolio returns over time - more important than individual security selection.</p>
          `
        },
        {
          id: 'rebalancing',
          title: 'Portfolio Rebalancing',
          duration: '12 min',
          type: 'article',
          content: `
            <h4>What is Rebalancing?</h4>
            <p>Rebalancing is the process of realigning your portfolio back to your target asset allocation. As markets move, your portfolio drifts from its original allocation.</p>

            <h4>Why Rebalance?</h4>
            <ul>
              <li><strong>Maintain Risk Level:</strong> Keep your desired risk exposure</li>
              <li><strong>Discipline:</strong> Forces you to "buy low, sell high"</li>
              <li><strong>Avoid Concentration:</strong> Prevent overexposure to any asset</li>
              <li><strong>Stay on Track:</strong> Align with your long-term goals</li>
            </ul>

            <h4>Example of Portfolio Drift</h4>
            <p>You start with 60% stocks, 40% bonds. After a strong year for stocks, your portfolio becomes 70% stocks, 30% bonds. Rebalancing means selling some stocks and buying bonds to return to 60/40.</p>

            <h4>When to Rebalance</h4>
            <ul>
              <li><strong>Calendar-Based:</strong> Quarterly, semi-annually, or annually</li>
              <li><strong>Threshold-Based:</strong> When allocation drifts 5% or more from target</li>
              <li><strong>Combination:</strong> Check quarterly but only rebalance if thresholds are exceeded</li>
            </ul>

            <h4>How to Rebalance</h4>
            <p>You can rebalance by selling overweight assets and buying underweight ones, or by directing new contributions to underweight assets.</p>

            <h4>Tax Considerations</h4>
            <p>Rebalancing in tax-advantaged accounts (401k, IRA) avoids capital gains taxes. In taxable accounts, consider tax implications before rebalancing.</p>
          `
        }
      ],
      quiz: [
        {
          question: "What accounts for over 90% of portfolio returns over time?",
          options: [
            "Picking individual stocks",
            "Asset allocation",
            "Market timing",
            "Trading frequency"
          ],
          correct: 1
        },
        {
          question: "The age-based rule for asset allocation suggests holding this percentage in stocks:",
          options: [
            "Your age percent",
            "100 minus your age percent",
            "Always 50%",
            "Always 100%"
          ],
          correct: 1
        },
        {
          question: "What is portfolio rebalancing?",
          options: [
            "Selling all your investments",
            "Realigning your portfolio back to your target allocation",
            "Changing your investment goals",
            "Switching brokerages"
          ],
          correct: 1
        },
        {
          question: "Which asset class typically has the highest returns with highest risk?",
          options: [
            "Cash",
            "Bonds",
            "Stocks (Equities)",
            "Savings accounts"
          ],
          correct: 2
        },
        {
          question: "A common threshold for rebalancing is when allocation drifts:",
          options: [
            "1% from target",
            "5% or more from target",
            "50% from target",
            "Never — don't rebalance"
          ],
          correct: 1
        }
      ]
    },
    {
      id: 10,
      title: "Retirement and Estate Planning",
      description: "Secure your financial future and protect your legacy with proper planning.",
      locked: true,
      lessons: [
        {
          id: 'why-retirement',
          title: 'Why Plan for Retirement?',
          duration: '10 min',
          type: 'video',
          videoUrl: 'https://www.youtube.com/embed/7QalEsStqDQ',
          content: 'The importance of early retirement planning.'
        },
        {
          id: '401k-iras',
          title: '401(k) Plans and IRAs',
          duration: '15 min',
          type: 'article',
          content: `
            <h4>401(k) Plans</h4>
            <p>Employer-sponsored retirement accounts that allow employees to save and invest with tax advantages. Contributions are typically deducted from your paycheck before taxes.</p>

            <h4>Key 401(k) Features</h4>
            <ul>
              <li><strong>Contribution Limit:</strong> $23,000 in 2024 ($30,500 if 50+)</li>
              <li><strong>Employer Match:</strong> Many employers match 3-6% of salary</li>
              <li><strong>Tax Benefits:</strong> Lower current taxable income</li>
              <li><strong>Investment Options:</strong> Usually mutual funds and target-date funds</li>
              <li><strong>Vesting Schedule:</strong> Time needed to fully own employer match</li>
            </ul>

            <h4>Traditional vs. Roth 401(k)</h4>
            <ul>
              <li><strong>Traditional:</strong> Pre-tax contributions, taxed in retirement</li>
              <li><strong>Roth:</strong> After-tax contributions, tax-free withdrawals in retirement</li>
            </ul>

            <h4>Individual Retirement Accounts (IRAs)</h4>
            <p>IRAs are retirement accounts you open yourself, independent of your employer.</p>

            <ul>
              <li><strong>Traditional IRA:</strong> Tax-deductible contributions, taxed in retirement</li>
              <li><strong>Roth IRA:</strong> After-tax contributions, tax-free growth and withdrawals</li>
              <li><strong>Contribution Limit:</strong> $7,000 in 2024 ($8,000 if 50+)</li>
              <li><strong>Income Limits:</strong> Roth IRAs phase out at higher incomes</li>
            </ul>

            <h4>The Power of Compound Interest</h4>
            <p>Starting early makes a huge difference. $5,000/year invested from age 25 to 65 at 7% returns grows to over $1 million. Starting at 35 only reaches about $500,000.</p>

            <h4>Contribution Priority</h4>
            <ol>
              <li>401(k) up to employer match</li>
              <li>Max out Roth IRA</li>
              <li>Max out 401(k)</li>
              <li>Backdoor Roth if eligible</li>
              <li>Taxable brokerage account</li>
            </ol>
          `
        },
        {
          id: 'social-security',
          title: 'Social Security Basics',
          duration: '10 min',
          type: 'article',
          content: `
            <h4>What is Social Security?</h4>
            <p>Social Security is a federal program that provides retirement, disability, and survivor benefits to eligible Americans. It's funded through payroll taxes.</p>

            <h4>How Benefits Are Calculated</h4>
            <p>Benefits are based on your 35 highest-earning years. Your Primary Insurance Amount (PIA) is calculated using a formula that favors lower lifetime earners.</p>

            <h4>When to Claim</h4>
            <ul>
              <li><strong>Age 62:</strong> Earliest, but reduced benefits (about 70% of full)</li>
              <li><strong>Full Retirement Age (67 for most):</strong> 100% of calculated benefit</li>
              <li><strong>Age 70:</strong> Delayed retirement credits (132% of full)</li>
            </ul>

            <h4>Working While Collecting</h4>
            <p>Before full retirement age, earnings above certain limits reduce benefits. After full retirement age, there's no reduction regardless of earnings.</p>

            <h4>Spousal Benefits</h4>
            <p>Spouses can claim up to 50% of their partner's benefit, even if they didn't work. Divorced spouses may qualify if the marriage lasted 10+ years.</p>

            <h4>Will Social Security Run Out?</h4>
            <p>The program faces funding challenges, but claims of "running out" are exaggerated. Even in worst-case scenarios, benefits would continue at reduced levels. Don't rely solely on Social Security.</p>

            <h4>Planning Considerations</h4>
            <ul>
              <li>Create a My Social Security account at ssa.gov</li>
              <li>Review your earnings record annually</li>
              <li>Consider taxes on benefits</li>
              <li>Coordinate with spouse's benefits</li>
              <li>Factor into overall retirement plan</li>
            </ul>
          `
        },
        {
          id: 'estate-planning',
          title: 'Estate Planning Basics',
          duration: '12 min',
          type: 'article',
          content: `
            <h4>What is Estate Planning?</h4>
            <p>Estate planning is preparing for the transfer of your assets and responsibilities after death or incapacitation. Everyone needs an estate plan, regardless of wealth.</p>

            <h4>Essential Documents</h4>
            <ul>
              <li><strong>Will:</strong> Directs asset distribution and names guardians for minor children</li>
              <li><strong>Power of Attorney:</strong> Authorizes someone to act on your behalf</li>
              <li><strong>Healthcare Directive:</strong> Medical decisions if you're incapacitated</li>
              <li><strong>Living Will:</strong> End-of-life medical preferences</li>
              <li><strong>Beneficiary Designations:</strong> On retirement accounts and insurance</li>
            </ul>

            <h4>Understanding Trusts</h4>
            <p>Trusts provide more control and privacy than wills. Common types include:</p>
            <ul>
              <li><strong>Revocable Living Trust:</strong> Avoid probate, maintain control</li>
              <li><strong>Irrevocable Trust:</strong> Asset protection, tax benefits</li>
              <li><strong>Special Needs Trust:</strong> Provides for disabled beneficiaries</li>
            </ul>

            <h4>Probate Explained</h4>
            <p>Probate is the legal process of settling an estate. It can be expensive, time-consuming, and public. Good estate planning minimizes probate.</p>

            <h4>Estate Taxes</h4>
            <p>Federal estate tax only applies to estates over $13.61 million (2024). Some states have lower thresholds. Proper planning can minimize tax impact.</p>

            <h4>Digital Assets</h4>
            <p>Don't forget online accounts, cryptocurrency, digital photos, and social media. Create an inventory with access instructions.</p>

            <h4>When to Update</h4>
            <ul>
              <li>Marriage, divorce, or death of spouse</li>
              <li>Birth or adoption of children</li>
              <li>Significant financial changes</li>
              <li>Moving to a new state</li>
              <li>Every 3-5 years regardless</li>
            </ul>
          `
        },
        {
          id: 'long-term-strategy',
          title: 'Long-term Financial Strategy',
          duration: '10 min',
          type: 'article',
          content: `
            <h4>The Big Picture</h4>
            <p>Long-term financial planning integrates all aspects of your financial life: income, spending, saving, investing, protection, and legacy. It's a continuous process, not a one-time event.</p>

            <h4>Financial Life Stages</h4>
            <ul>
              <li><strong>Early Career (20s-30s):</strong> Build emergency fund, pay off debt, start investing</li>
              <li><strong>Mid-Career (30s-50s):</strong> Maximize retirement contributions, buy home, family planning</li>
              <li><strong>Pre-Retirement (50s-60s):</strong> Catch-up contributions, plan transition</li>
              <li><strong>Retirement (65+):</strong> Manage withdrawals, healthcare, legacy</li>
            </ul>

            <h4>The Financial Planning Pyramid</h4>
            <ol>
              <li><strong>Foundation:</strong> Emergency fund, insurance, basic estate plan</li>
              <li><strong>Security:</strong> Retirement savings, home equity</li>
              <li><strong>Growth:</strong> Additional investments, education funds</li>
              <li><strong>Legacy:</strong> Estate planning, charitable giving</li>
            </ol>

            <h4>Building Wealth Principles</h4>
            <ul>
              <li><strong>Start Early:</strong> Time is your greatest asset</li>
              <li><strong>Pay Yourself First:</strong> Save before spending</li>
              <li><strong>Diversify:</strong> Don't put all eggs in one basket</li>
              <li><strong>Live Below Your Means:</strong> Spend less than you earn</li>
              <li><strong>Increase Income:</strong> Focus on career growth</li>
              <li><strong>Avoid Lifestyle Inflation:</strong> Don't increase spending with income</li>
            </ul>

            <h4>Common Mistakes to Avoid</h4>
            <ul>
              <li>Waiting too long to start</li>
              <li>Trying to time the market</li>
              <li>Not having an emergency fund</li>
              <li>Ignoring insurance needs</li>
              <li>Letting emotions drive decisions</li>
              <li>Not updating plans</li>
            </ul>

            <h4>Working with Professionals</h4>
            <p>Consider hiring a fee-only fiduciary financial advisor for complex situations. They're legally required to act in your best interest. Avoid commission-based advisors with conflicts of interest.</p>

            <h4>Your Action Plan</h4>
            <ol>
              <li>Set clear, written financial goals</li>
              <li>Create a realistic budget</li>
              <li>Build an emergency fund</li>
              <li>Eliminate high-interest debt</li>
              <li>Invest for retirement automatically</li>
              <li>Protect with proper insurance</li>
              <li>Create an estate plan</li>
              <li>Review and adjust annually</li>
            </ol>
          `
        }
      ],
      quiz: [
        {
          question: "What's the main benefit of a 401(k) employer match?",
          options: [
            "It's free money that boosts your retirement savings",
            "It reduces your taxes",
            "It lets you retire earlier automatically",
            "It guarantees investment returns"
          ],
          correct: 0
        },
        {
          question: "What's the key difference between a Traditional and Roth IRA?",
          options: [
            "They have different contribution limits",
            "Traditional is pre-tax; Roth is after-tax with tax-free withdrawals",
            "Roth IRAs are only for business owners",
            "Traditional IRAs don't grow"
          ],
          correct: 1
        },
        {
          question: "What is the earliest age you can claim Social Security retirement benefits?",
          options: ["55", "62", "65", "70"],
          correct: 1
        },
        {
          question: "Which document directs how your assets are distributed after death?",
          options: [
            "Power of Attorney",
            "Living Will",
            "Will",
            "Healthcare Directive"
          ],
          correct: 2
        },
        {
          question: "What's the best way to build long-term wealth?",
          options: [
            "Time the market perfectly",
            "Start early, stay consistent, and live below your means",
            "Invest all money in one stock",
            "Keep everything in cash"
          ],
          correct: 1
        }
      ]
    }
  ];

  // Final comprehensive quiz
  const finalQuizQuestions = [
    {
      question: "What is the 50/30/20 budget rule?",
      options: [
        "50% needs, 30% wants, 20% savings and debt",
        "50% savings, 30% spending, 20% investing",
        "50% rent, 30% food, 20% other",
        "A tax calculation formula"
      ],
      correct: 0
    },
    {
      question: "What factor most impacts your credit score?",
      options: ["Credit mix", "New inquiries", "Payment history", "Credit age"],
      correct: 2
    },
    {
      question: "What does APR stand for?",
      options: [
        "Annual Payment Rate",
        "Annual Percentage Rate",
        "Average Price Ratio",
        "Asset Performance Rate"
      ],
      correct: 1
    },
    {
      question: "Which retirement account offers tax-free withdrawals in retirement?",
      options: ["Traditional 401(k)", "Traditional IRA", "Roth IRA", "Savings Account"],
      correct: 2
    },
    {
      question: "What is a Bull Market?",
      options: [
        "A market where prices are falling",
        "A market where prices are rising consistently",
        "A market with no movement",
        "An animal market"
      ],
      correct: 1
    },
    {
      question: "What does 'diversification' mean?",
      options: [
        "Investing all money in one stock",
        "Spreading investments across different assets to reduce risk",
        "Only investing in tech",
        "Keeping everything in cash"
      ],
      correct: 1
    },
    {
      question: "What is an index fund?",
      options: [
        "A fund that tracks a specific market index",
        "A hedge fund",
        "A type of savings account",
        "A company stock"
      ],
      correct: 0
    },
    {
      question: "What's the FDIC insurance limit?",
      options: [
        "$100,000 per account",
        "$250,000 per depositor per bank",
        "$500,000 total",
        "No limit"
      ],
      correct: 1
    },
    {
      question: "What's the best way to avoid payday loans?",
      options: [
        "Use them sparingly",
        "Build an emergency fund and seek alternatives",
        "Only borrow small amounts",
        "Pay them off quickly"
      ],
      correct: 1
    },
    {
      question: "What does dollar-cost averaging involve?",
      options: [
        "Currency conversion",
        "Investing a fixed amount at regular intervals regardless of price",
        "Only buying cheap stocks",
        "Day trading"
      ],
      correct: 1
    }
  ];

  // Calculate if unit is locked
  const isUnitLocked = (unitIndex) => {
    if (unitIndex === 0) return false;
    const previousUnit = courseUnits[unitIndex - 1];
    const allLessonsComplete = getUnitProgress(previousUnit) === 100;
    const quizPassed = passedUnitQuizzes.includes(previousUnit.id);
    return !(allLessonsComplete && quizPassed);
  };

  // Calculate progress for a specific unit
  const getUnitProgress = (unit) => {
    const totalLessons = unit.lessons.length;
    const completed = unit.lessons.filter(lesson =>
      completedLessons.includes(lesson.id)
    ).length;
    return Math.round((completed / totalLessons) * 100);
  };

  // Check if all lessons in a unit are complete
  const areUnitLessonsComplete = (unit) => {
    return unit.lessons.every(lesson => completedLessons.includes(lesson.id));
  };

  // Toggle unit expansion
  const toggleUnit = (unitId, unitIndex) => {
    if (isUnitLocked(unitIndex)) return;
    setExpandedUnit(expandedUnit === unitId ? null : unitId);
  };

  // Check if lesson is completed
  const isLessonCompleted = (lessonId) => {
    return completedLessons.includes(lessonId);
  };

  // Handle lesson click
  const handleLessonClick = (lesson) => {
    if (activeLesson?.id === lesson.id) {
      setActiveLesson(null);
    } else {
      setActiveLesson(lesson);
      if (!completedLessons.includes(lesson.id)) {
        setCompletedLessons([...completedLessons, lesson.id]);
      }
    }
  };

  // Unit quiz handlers
  const startUnitQuiz = (unitId) => {
    setActiveUnitQuiz(unitId);
    setUnitQuizState({
      currentQuestion: 0,
      score: 0,
      showScore: false,
      selectedAnswer: null,
    });
  };

  const handleUnitQuizAnswer = (answerIndex) => {
    setUnitQuizState({ ...unitQuizState, selectedAnswer: answerIndex });
  };

  const handleUnitQuizNext = () => {
    const unit = courseUnits.find(u => u.id === activeUnitQuiz);
    if (!unit) return;

    const currentQ = unit.quiz[unitQuizState.currentQuestion];
    const isCorrect = unitQuizState.selectedAnswer === currentQ.correct;
    const newScore = isCorrect ? unitQuizState.score + 1 : unitQuizState.score;

    const nextQuestion = unitQuizState.currentQuestion + 1;
    if (nextQuestion < unit.quiz.length) {
      setUnitQuizState({
        currentQuestion: nextQuestion,
        score: newScore,
        showScore: false,
        selectedAnswer: null,
      });
    } else {
      // Finished quiz
      const passed = newScore >= Math.ceil(unit.quiz.length * 0.7);
      setUnitQuizState({
        ...unitQuizState,
        score: newScore,
        showScore: true,
      });
      if (passed && !passedUnitQuizzes.includes(unit.id)) {
        setPassedUnitQuizzes([...passedUnitQuizzes, unit.id]);
      }
    }
  };

  const resetUnitQuiz = (unitId) => {
    setUnitQuizState({
      currentQuestion: 0,
      score: 0,
      showScore: false,
      selectedAnswer: null,
    });
    setActiveUnitQuiz(unitId);
  };

  const closeUnitQuiz = () => {
    setActiveUnitQuiz(null);
    setUnitQuizState({
      currentQuestion: 0,
      score: 0,
      showScore: false,
      selectedAnswer: null,
    });
  };

  // Get total lessons across all units
  const getTotalLessons = () => {
    return courseUnits.reduce((total, unit) => total + unit.lessons.length, 0);
  };

  const getCompletedCount = () => {
    return completedLessons.length;
  };

  const getOverallProgress = () => {
    const total = getTotalLessons();
    const completed = getCompletedCount();
    return Math.round((completed / total) * 100);
  };

  // Check if everything is completed (all lessons + all unit quizzes)
  const areAllUnitsCompleted = () => {
    const allLessonsDone = completedLessons.length === getTotalLessons();
    const allQuizzesPassed = passedUnitQuizzes.length === courseUnits.length;
    return allLessonsDone && allQuizzesPassed;
  };

  const getQuizzesPassed = () => {
    return passedUnitQuizzes.length;
  };

  const scrollToRef = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const findFirstIncompleteUnit = () => {
    for (let i = 0; i < courseUnits.length; i++) {
      const unit = courseUnits[i];
      if (isUnitLocked(i)) continue;
      const hasIncomplete = unit.lessons.some((l) => !isLessonCompleted(l.id));
      const quizPending = !passedUnitQuizzes.includes(unit.id);
      if (hasIncomplete || quizPending) return unit;
    }
    return courseUnits[0];
  };

  const handleResumeLearning = () => {
    const unit = findFirstIncompleteUnit();
    if (!unit) return;
    setExpandedUnit(unit.id);

    requestAnimationFrame(() => {
      const el = document.getElementById(`unit-${unit.id}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else scrollToRef(unitsSectionRef);
    });
  };

  // Final quiz handlers
  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === finalQuizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < finalQuizQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setQuizStarted(false);
  };

  // Calculate progress circle
  const progress = getOverallProgress();
  const circumference = 2 * Math.PI * 62;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Get active unit quiz data
  const activeUnit = activeUnitQuiz ? courseUnits.find(u => u.id === activeUnitQuiz) : null;
  const activeUnitQuizData = activeUnit?.quiz || [];

  return (
    <div className="learning-page">
      <div className="learning-container">
        {/* Header */}
        <header className="learning-header">
          <span className="header-badge">FINANCIAL LITERACY</span>
          <h1 className="learning-title">Personal Finance Mastery</h1>
          <p className="learning-subtitle">
            A comprehensive course covering everything from personal finance basics to advanced investing
            and retirement planning. Build the knowledge you need for lifelong financial success.
          </p>
          <div className="header-actions">
            <button className="primary-btn" onClick={handleResumeLearning}>
              {completedLessons.length > 0 ? 'Continue Learning' : 'Start Learning'}
            </button>
            <button className="secondary-btn" onClick={() => setShowCourseDetails(true)}>
              Course Details
            </button>
          </div>
        </header>

        {/* Course Layout */}
        <div className="course-layout">
          {/* Main Content */}
          <main className="course-main" ref={unitsSectionRef}>
            <div className="section-header">
              <h2 className="section-title">
                Course Units
              </h2>
            </div>

            <div className="units-list">
              {courseUnits.map((unit, index) => {
                const unitProgress = getUnitProgress(unit);
                const locked = isUnitLocked(index);
                const isExpanded = expandedUnit === unit.id;
                const lessonsComplete = areUnitLessonsComplete(unit);
                const quizPassed = passedUnitQuizzes.includes(unit.id);
                const unitComplete = lessonsComplete && quizPassed;

                return (
                  <div
                    key={unit.id}
                    id={`unit-${unit.id}`}
                    className={`unit-card ${locked ? 'locked' : ''}`}
                  >
                    <div
                      className="unit-header"
                      onClick={() => toggleUnit(unit.id, index)}
                    >
                      <div className="unit-info">
                        <div className="unit-meta">
                          <span className="unit-number">UNIT {unit.id}</span>
                          {unitComplete ? (
                            <span className="completion-badge">
                              <span className="check-icon">✓</span>
                              Complete
                            </span>
                          ) : locked ? (
                            <span className="locked-badge">Locked</span>
                          ) : null}
                        </div>
                        <h3 className="unit-title">{unit.title}</h3>
                        <p className="unit-description">{unit.description}</p>
                      </div>
                      {locked ? (
                        <div className="lock-icon">🔒</div>
                      ) : (
                        <div className="expand-icon">
                          {isExpanded ? '−' : '+'}
                        </div>
                      )}
                    </div>

                    {isExpanded && !locked && (
                      <div className="lessons-list">
                        {unit.lessons.map((lesson) => {
                          const completed = isLessonCompleted(lesson.id);
                          const isActive = activeLesson?.id === lesson.id;

                          return (
                            <div key={lesson.id}>
                              <div
                                className={`lesson-item ${completed ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                                onClick={() => handleLessonClick(lesson)}
                              >
                                <div className="lesson-icon">
                                  {lesson.type === 'video' ? '🎥' :
                                   lesson.type === 'quiz' ? '📝' : '📄'}
                                </div>
                                <div className="lesson-content">
                                  <div className="lesson-title">{lesson.title}</div>
                                  <div className="lesson-duration">{lesson.duration}</div>
                                </div>
                                {completed && (
                                  <div className="completion-check">✓</div>
                                )}
                              </div>

                              {isActive && (
                                <div className="lesson-player">
                                  {lesson.type === 'video' && lesson.videoUrl ? (
                                    <div className="video-container">
                                      <iframe
                                        src={lesson.videoUrl}
                                        title={lesson.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                      ></iframe>
                                    </div>
                                  ) : (
                                    <div
                                      className="article-content"
                                      dangerouslySetInnerHTML={{ __html: lesson.content }}
                                    />
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {/* Unit Quiz Section */}
                        <div className="unit-quiz-section">
                          {!lessonsComplete ? (
                            <div className="unit-quiz-locked">
                              <span className="unit-quiz-lock-icon">🔒</span>
                              <div>
                                <div className="unit-quiz-title">Unit Quiz</div>
                                <div className="unit-quiz-subtitle">
                                  Complete all lessons to unlock
                                </div>
                              </div>
                            </div>
                          ) : quizPassed ? (
                            <div className="unit-quiz-passed">
                              <span className="unit-quiz-check">✓</span>
                              <div>
                                <div className="unit-quiz-title">Unit Quiz Passed</div>
                                <div className="unit-quiz-subtitle">
                                  Unit complete — next unit unlocked
                                </div>
                              </div>
                              <button
                                className="unit-quiz-retake"
                                onClick={() => startUnitQuiz(unit.id)}
                              >
                                Retake
                              </button>
                            </div>
                          ) : (
                            <div className="unit-quiz-ready">
                              <div>
                                <div className="unit-quiz-title">Unit Quiz Ready</div>
                                <div className="unit-quiz-subtitle">
                                  {unit.quiz.length} questions · Pass with 70% to unlock next unit
                                </div>
                              </div>
                              <button
                                className="unit-quiz-start"
                                onClick={() => startUnitQuiz(unit.id)}
                              >
                                Start Quiz
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {isExpanded && locked && (
                      <div className="locked-message">
                        <span className="lock-icon-large">🔒</span>
                        <p>Complete the previous unit's lessons and quiz to unlock this content</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </main>

          {/* Sidebar */}
          <aside className="course-sidebar">
            {/* Progress Card */}
            <div className="progress-card">
              <div className="progress-header">
                <h3>Your Progress</h3>
              </div>

              <div className="progress-circle-container">
                <div className="progress-circle">
                  <svg viewBox="0 0 140 140">
                    <circle className="progress-bg" cx="70" cy="70" r="62" />
                    <circle
                      className="progress-fill"
                      cx="70"
                      cy="70"
                      r="62"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                    />
                  </svg>
                  <div className="progress-percentage">{progress}%</div>
                </div>
                <div className="progress-level">
                  {progress === 100 ? 'Course Complete!' :
                   progress >= 75 ? 'Almost There!' :
                   progress >= 50 ? 'Halfway!' :
                   progress >= 25 ? 'Making Progress!' :
                   'Just Getting Started!'}
                </div>
              </div>

              <div className="progress-stats">
                <div className="stat-item">
                  <span className="stat-label">Lessons Completed</span>
                  <span className="stat-value">
                    {getCompletedCount()} / {getTotalLessons()}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Current Streak</span>
                  <span className="stat-value streak">5 days</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Quizzes Passed</span>
                  <span className="stat-value">{getQuizzesPassed()} / {courseUnits.length}</span>
                </div>
              </div>

              <div className="achievements">
                <h4>Recent Badges</h4>
                <div className="badges">
                  <div className={`badge ${completedLessons.length >= 5 ? 'earned' : 'locked'}`} title="First Steps">
                    🎯
                  </div>
                  <div className={`badge ${progress >= 50 ? 'earned' : 'locked'}`} title="Halfway Hero">
                    🏆
                  </div>
                  <div className={`badge ${progress === 100 ? 'earned' : 'locked'}`} title="Course Master">
                    👑
                  </div>
                </div>
              </div>

              <button className="leaderboard-btn" onClick={() => setShowLeaderboard(true)}>
                View Leaderboard
              </button>
            </div>

            {/* Milestone Card */}
            <div className="milestone-card">
              <h3>Next Milestone</h3>
              <p>
                {areAllUnitsCompleted()
                  ? "You're ready for the final assessment!"
                  : `${getTotalLessons() - getCompletedCount()} lessons and ${courseUnits.length - getQuizzesPassed()} quizzes to go!`}
              </p>
              <div className="milestone-progress">
                <div className="milestone-bar">
                  <div className="milestone-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="milestone-text">
                  {getCompletedCount()}/{getTotalLessons()}
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* Unit Quiz Modal */}
        {activeUnitQuiz && activeUnit && (
          <div className="modal-overlay" onClick={closeUnitQuiz}>
            <div className="modal unit-quiz-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">
                  Unit {activeUnit.id} Quiz: {activeUnit.title}
                </h3>
                <button
                  className="modal-close"
                  onClick={closeUnitQuiz}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="modal-body">
                {unitQuizState.showScore ? (
                  <div className="quiz-results">
                    <h3 className="results-title">
                      {unitQuizState.score >= Math.ceil(activeUnitQuizData.length * 0.7)
                        ? "Quiz Passed!"
                        : "Keep Learning"}
                    </h3>
                    <div className="score-display">
                      <span className="score-number">{unitQuizState.score}</span>
                      <span className="score-total">/ {activeUnitQuizData.length}</span>
                    </div>
                    <p className="score-message">
                      {unitQuizState.score === activeUnitQuizData.length
                        ? "Perfect score! You've mastered this unit."
                        : unitQuizState.score >= Math.ceil(activeUnitQuizData.length * 0.7)
                        ? "Great work! You've unlocked the next unit."
                        : `You need ${Math.ceil(activeUnitQuizData.length * 0.7)} correct to pass. Review the material and try again.`}
                    </p>
                    <div className="modal-actions">
                      {unitQuizState.score >= Math.ceil(activeUnitQuizData.length * 0.7) ? (
                        <button className="primary-btn" onClick={closeUnitQuiz}>
                          Continue
                        </button>
                      ) : (
                        <>
                          <button
                            className="primary-btn"
                            onClick={() => resetUnitQuiz(activeUnit.id)}
                          >
                            Try Again
                          </button>
                          <button
                            className="secondary-btn"
                            onClick={closeUnitQuiz}
                          >
                            Review Lessons
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="quiz-progress">
                      <span className="progress-text">
                        Question {unitQuizState.currentQuestion + 1} of {activeUnitQuizData.length}
                      </span>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${((unitQuizState.currentQuestion + 1) / activeUnitQuizData.length) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="question-card">
                      <h3 className="question-text">
                        {activeUnitQuizData[unitQuizState.currentQuestion].question}
                      </h3>
                      <div className="options-grid">
                        {activeUnitQuizData[unitQuizState.currentQuestion].options.map((option, index) => (
                          <button
                            key={index}
                            className={`option-btn ${
                              unitQuizState.selectedAnswer === index ? "selected" : ""
                            }`}
                            onClick={() => handleUnitQuizAnswer(index)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      <button
                        className="quiz-next-btn"
                        onClick={handleUnitQuizNext}
                        disabled={unitQuizState.selectedAnswer === null}
                      >
                        {unitQuizState.currentQuestion === activeUnitQuizData.length - 1
                          ? "Finish Quiz"
                          : "Next Question"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Details / Leaderboard Modals */}
        {(showCourseDetails || showLeaderboard) && (
          <div
            className="modal-overlay"
            onClick={() => {
              setShowCourseDetails(false);
              setShowLeaderboard(false);
            }}
          >
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">
                  {showCourseDetails ? "Course Details" : "Leaderboard"}
                </h3>
                <button
                  className="modal-close"
                  onClick={() => {
                    setShowCourseDetails(false);
                    setShowLeaderboard(false);
                  }}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {showCourseDetails ? (
                <div className="modal-body">
                  <p className="modal-lead">
                    A comprehensive financial literacy journey — from budgeting basics
                    through advanced investing and retirement planning.
                  </p>

                  <div className="detail-grid">
                    <div className="detail-item">
                      <div className="detail-label">Units</div>
                      <div className="detail-value">{courseUnits.length}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Lessons</div>
                      <div className="detail-value">{getTotalLessons()}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Quizzes</div>
                      <div className="detail-value">{courseUnits.length + 1}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Difficulty</div>
                      <div className="detail-value">Beginner → Advanced</div>
                    </div>
                  </div>

                  <div className="modal-actions">
                    <button
                      className="primary-btn"
                      onClick={() => {
                        setShowCourseDetails(false);
                        handleResumeLearning();
                      }}
                    >
                      Continue Learning
                    </button>
                    {areAllUnitsCompleted() && (
                      <button
                        className="secondary-btn"
                        onClick={() => {
                          setShowCourseDetails(false);
                          scrollToRef(quizSectionRef);
                        }}
                      >
                        Take Final Quiz
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="modal-body">
                  <div className="leaderboard-list">
                    {[
                      { name: "A. Morgan", points: 1280, streak: 12 },
                      { name: "J. Patel", points: 1215, streak: 9 },
                      { name: "E. Carter", points: 1180, streak: 5 },
                      { name: "S. Nguyen", points: 1105, streak: 7 },
                      { name: "R. Kim", points: 995, streak: 3 }
                    ].map((row, i) => (
                      <div key={row.name} className="leaderboard-row">
                        <div className="lb-rank">#{i + 1}</div>
                        <div className="lb-name">{row.name}</div>
                        <div className="lb-meta">
                          <span className="lb-points">{row.points} pts</span>
                          <span className="lb-streak">{row.streak}d</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="modal-actions">
                    <button
                      className="primary-btn"
                      onClick={() => {
                        setShowLeaderboard(false);
                        handleResumeLearning();
                      }}
                    >
                      Resume Learning
                    </button>
                    <button className="secondary-btn" onClick={() => setShowLeaderboard(false)}>
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Final Assessment */}
        {areAllUnitsCompleted() ? (
          <section className="quiz-section" ref={quizSectionRef} id="quiz">
            <div className="quiz-header">
              <h2 className="quiz-title">Final Assessment</h2>
              <p className="quiz-description">
                Test everything you've learned and earn your Personal Finance Mastery certificate.
              </p>
            </div>

            {!quizStarted ? (
              <div className="quiz-start">
                <button className="quiz-start-btn" onClick={() => setQuizStarted(true)}>
                  Start Final Quiz
                </button>
              </div>
            ) : (
              <div className="quiz-container">
                {showScore ? (
                  <div className="quiz-results">
                    <h3 className="results-title">Final Assessment Complete</h3>
                    <div className="score-display">
                      <span className="score-number">{score}</span>
                      <span className="score-total">/ {finalQuizQuestions.length}</span>
                    </div>
                    <p className="score-message">
                      {score === finalQuizQuestions.length
                        ? "Perfect score! You've mastered personal finance."
                        : score >= finalQuizQuestions.length * 0.7
                        ? "Excellent work — you have a solid understanding of personal finance."
                        : score >= finalQuizQuestions.length * 0.5
                        ? "Good effort. Review the material and try again to solidify your knowledge."
                        : "Keep studying. Review the course content and retake the assessment."}
                    </p>
                    <button className="quiz-retry-btn" onClick={resetQuiz}>
                      Try Again
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="quiz-progress">
                      <span className="progress-text">
                        Question {currentQuestion + 1} of {finalQuizQuestions.length}
                      </span>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${((currentQuestion + 1) / finalQuizQuestions.length) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="question-card">
                      <h3 className="question-text">
                        {finalQuizQuestions[currentQuestion].question}
                      </h3>
                      <div className="options-grid">
                        {finalQuizQuestions[currentQuestion].options.map((option, index) => (
                          <button
                            key={index}
                            className={`option-btn ${
                              selectedAnswer === index ? "selected" : ""
                            }`}
                            onClick={() => handleAnswerClick(index)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      <button
                        className="quiz-next-btn"
                        onClick={handleNextQuestion}
                        disabled={selectedAnswer === null}
                      >
                        {currentQuestion === finalQuizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </section>
        ) : (
          <section className="quiz-section" ref={quizSectionRef} id="quiz">
            <div className="quiz-header">
              <h2 className="quiz-title">Final Assessment Locked</h2>
              <p className="quiz-description">
                Complete all {courseUnits.length} units and their quizzes to unlock the final assessment.
              </p>
            </div>
            <div className="locked-message" style={{ padding: '64px 32px' }}>
              <span className="lock-icon-large" style={{ fontSize: '72px', marginBottom: '24px' }}>🔒</span>
              <p style={{ fontSize: '16px', marginBottom: '16px' }}>
                Progress: {getCompletedCount()} of {getTotalLessons()} lessons · {getQuizzesPassed()} of {courseUnits.length} unit quizzes
              </p>
              <p style={{ fontSize: '14px', color: 'var(--green)' }}>
                {getTotalLessons() - getCompletedCount()} lessons and {courseUnits.length - getQuizzesPassed()} quizzes remaining
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default LearningCenter;
