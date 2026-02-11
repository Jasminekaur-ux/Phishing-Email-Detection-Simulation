// Phishing Email Detection System logic

// 1. Define our sample email data
// We use an array of objects to store different email scenarios.
const emails = [
    {
        id: 1,
        from: "Security Team <security-update@paypa1-support.com>",
        subject: "URGENT: Your account has been suspended!",
        body: "Dear Customer,\n\nWe noticed suspicious activity on your account. To prevent permanent localized lockout, please verify your identity immediately.\n\nClick here to restore access: http://bit.ly/secure-login-now\n\nIf you do not act within 24 hours, your account will be deleted.\n\nSincerely,\nSecurity Team",
        isPhishing: true,
        explanation: "Red Flags:\n1. 'paypa1-support.com' is a fake domain (spoofing PayPal).\n2. Creates false urgency ('deleted within 24 hours').\n3. Uses a generic greeting ('Dear Customer').\n4. Suspicious shortened link (bit.ly) instead of the official site."
    },
    {
        id: 2,
        from: "HR Department <hr@yourcompany.com>",
        subject: "Updates to Employee Handbook",
        body: "Hi Everyone,\n\nPlease find attached the updated employee handbook for 2024. Just wanted to make sure everyone has the latest version.\n\nLet me know if you have any questions.\n\nBest,\nSarah Johnson\nHR Manager",
        isPhishing: false,
        explanation: "This looks safe:\n1. The sender domain matches the company domain.\n2. The tone is professional and not urgent or threatening.\n3. The context (handbook update) is a normal business activity.\n4. No suspicious links or demands for passwords."
    },
    {
        id: 3,
        from: "Netflix Support <support@netflix-billing-update.net>",
        subject: "Payment Declined: Update Payment Method",
        body: "We were unable to process your payment for the next billing cycle.\n\nPlease update your payment details to avoid service interruption.\n\nUpdate now: www.netflix-billing-update.net/login\n\nThank you,\nNetflix Support",
        isPhishing: true,
        explanation: "Red Flags:\n1. The domain 'netflix-billing-update.net' is suspicious; real Netflix emails come from 'netflix.com'.\n2. Phishing often targets billing/payment fears to get credit card info.\n3. It asks you to click a link rather than telling you to log in to the official site yourself."
    },
    {
        id: 4,
        from: "Google <no-reply@accounts.google.com>",
        subject: "Security alert",
        body: "New sign-in on Windows.\n\nWe noticed a new sign-in to your Google Account on a Windows device. If this was you, you don't need to do anything. If not, please secure your account via your Security settings page.\n\nYou can verify this activity at https://myaccount.google.com/notifications",
        isPhishing: false,
        explanation: "This looks safe:\n1. It comes from the official 'accounts.google.com' domain.\n2. The link goes to a legitimate Google domain (myaccount.google.com).\n3. It doesn't ask for a password directly in the email or use threatening language."
    },
    {
        id: 5,
        from: "CEO <ceo.urgent.task@gmail.com>",
        subject: "Quick Task",
        body: "Are you at your desk?\n\nI need you to buy 5 Apple Gift Cards for a client presentation right now. I am in a meeting and can't use my phone. I will reimburse you later today.\n\nSend me the codes ASAP.\n\nSent from my iPhone",
        isPhishing: true,
        explanation: "Red Flags:\n1. CEO using a personal Gmail address instead of a company email.\n2. Request affects money/gift cards (classic CEO fraud/Business Email Compromise).\n3. 'In a meeting' excuse to avoid phone verification.\n4. Urgent pressure ('ASAP')."
    }
];

// 2. Variables to track game state
let currentIndex = 0;
let score = 0;
let attempts = 0;

// 3. Select DOM elements we need to update
const fromElement = document.getElementById('email-from');
const subjectElement = document.getElementById('email-subject');
const bodyElement = document.getElementById('email-body-text');
const feedbackArea = document.getElementById('feedback-area');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackMessage = document.getElementById('feedback-message');
const scoreElement = document.getElementById('score');
const totalElement = document.getElementById('total');

// Buttons
const btnSafe = document.getElementById('btn-safe');
const btnPhishing = document.getElementById('btn-phishing');
const btnNext = document.getElementById('btn-next');

// 4. Function to display the current email
function showEmail(index) {
    const email = emails[index];
    
    // Update text content
    fromElement.textContent = email.from;
    subjectElement.textContent = email.subject;
    bodyElement.textContent = email.body;
    
    // Hide previous feedback
    feedbackArea.classList.add('hidden');
    feedbackArea.classList.remove('correct', 'incorrect');
    
    // Enable buttons again
    btnSafe.disabled = false;
    btnPhishing.disabled = false;
}

// 5. Function to check the user's answer
function checkAnswer(userSaysPhishing) {
    const email = emails[currentIndex];
    const isCorrect = (userSaysPhishing === email.isPhishing);
    
    // Update score
    attempts++;
    if (isCorrect) {
        score++;
    }
    updateScoreBoard();
    
    // Show feedback
    feedbackTitle.textContent = isCorrect ? "Correct!" : "Incorrect";
    feedbackMessage.textContent = email.explanation;
    
    // Style the feedback box
    feedbackArea.classList.remove('hidden', 'correct', 'incorrect');
    feedbackArea.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    // Disable buttons so they can't answer twice for the same email
    btnSafe.disabled = true;
    btnPhishing.disabled = true;
}

// 6. Function to update the score display
function updateScoreBoard() {
    scoreElement.textContent = score;
    totalElement.textContent = attempts;
}

// 7. Event Listeners
btnSafe.addEventListener('click', function() {
    checkAnswer(false); // User says it's SAFE (not phishing)
});

btnPhishing.addEventListener('click', function() {
    checkAnswer(true); // User says it's PHISHING
});

btnNext.addEventListener('click', function() {
    // Move to next email
    currentIndex++;
    
    // Loop back to start if we run out of emails
    if (currentIndex >= emails.length) {
        currentIndex = 0;
        alert("You've completed all samples! Restarting from the beginning.");
    }
    
    showEmail(currentIndex);
});

// Initialize the first email on page load
showEmail(currentIndex);
