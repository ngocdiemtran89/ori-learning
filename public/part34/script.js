// script.js
document.addEventListener('DOMContentLoaded', () => {

    /* --- Drill Logic (No Audio) --- */
    const submitDrillBtn = document.getElementById('submitDrillBtn');
    const explanationsPanel = document.getElementById('explanationsPanel');
    
    if(submitDrillBtn) {
        submitDrillBtn.addEventListener('click', () => {
            let drillScore = 0;
            const totalDrillQs = 3;
            
            for(let i = 1; i <= totalDrillQs; i++) {
                const selected = document.querySelector(`input[name="d_q${i}"]:checked`);
                if (selected) {
                    const li = selected.closest('li');
                    if (selected.dataset.correct === "true") {
                        li.classList.add('correct');
                        drillScore++;
                    } else {
                        li.classList.add('incorrect');
                        // Highlight correct
                        const correctInput = document.querySelector(`input[name="d_q${i}"][data-correct="true"]`);
                        if(correctInput) correctInput.closest('li').classList.add('correct');
                    }
                } else {
                    // If not selected, just show the correct one
                    const correctInput = document.querySelector(`input[name="d_q${i}"][data-correct="true"]`);
                    if(correctInput) correctInput.closest('li').classList.add('correct');
                }
                
                // Disable all radios in this group after submission
                document.querySelectorAll(`input[name="d_q${i}"]`).forEach(input => input.disabled = true);
            }

            submitDrillBtn.innerHTML = `Hoàn thành! Bạn đúng ${drillScore}/${totalDrillQs} câu. <i class="fas fa-level-down-alt"></i>`;
            submitDrillBtn.disabled = true;
            submitDrillBtn.classList.replace('btn-secondary', 'btn-primary');
            
            // Reveal explanation
            explanationsPanel.style.display = 'block';
            window.scrollTo({
                top: explanationsPanel.offsetTop - 50,
                behavior: 'smooth'
            });
        });
    }

    /* --- 50-Question MCQ Vocab Quiz Logic --- */
    const mcqData = [
        { q: "Due to the severe snowstorm, the flight to Chicago has been <span class='blank'></span> until further notice.", opts: ["postponed", "established", "accelerated", "promoted"], ans: 0, exp: "postponed = delayed / hoãn lại." },
        { q: "We need someone to <span class='blank'></span> the cause of the sudden drop in sales this quarter.", opts: ["call off", "look into", "give up", "put up"], ans: 1, exp: "look into = investigate / xem xét, điều tra." },
        { q: "The HR department will <span class='blank'></span> a new training program for all incoming employees next month.", opts: ["turn down", "break down", "set up", "fill out"], ans: 2, exp: "set up = establish/arrange / thiết lập, tổ chức." },
        { q: "Because of a lack of funding, the construction project had to be <span class='blank'></span>.", opts: ["carried on", "called off", "looked after", "taken over"], ans: 1, exp: "called off = canceled / hủy bỏ." },
        { q: "I can't seem to <span class='blank'></span> how to operate this new coffee machine.", opts: ["figure out", "point out", "turn out", "wear out"], ans: 0, exp: "figure out = understand/solve / tìm ra, hiểu ra." },
        { q: "All applicants are required to <span class='blank'></span> the registration form and attach their resume.", opts: ["fill out", "bring up", "hand in", "look over"], ans: 0, exp: "fill out = complete a form / điền đơn." },
        { q: "Please <span class='blank'></span> your assignments by 5 PM this Friday.", opts: ["hand in", "take off", "keep up", "make up"], ans: 0, exp: "hand in = submit / nộp bài, giao tài liệu." },
        { q: "We will <span class='blank'></span> the details of the contract during the meeting tomorrow.", opts: ["go over", "pass out", "put away", "run out"], ans: 0, exp: "go over = review / xem xét lại, kiểm tra lại." },
        { q: "Ms. Davis had to <span class='blank'></span> the job offer because the salary was too low.", opts: ["turn down", "hold on", "look forward to", "put off"], ans: 0, exp: "turn down = reject/refuse / từ chối." },
        { q: "Our team is currently working hard to <span class='blank'></span> a solution to the software bug.", opts: ["come up with", "get away with", "run out of", "cut down on"], ans: 0, exp: "come up with = invent/find / nghĩ ra, tìm ra." },
        { q: "To stay within budget, we need to <span class='blank'></span> paper usage in the office.", opts: ["catch up with", "cut down on", "look forward to", "put up with"], ans: 1, exp: "cut down on = reduce / cắt giảm." },
        { q: "I am really <span class='blank'></span> the upcoming company retreat to Hawaii.", opts: ["looking forward to", "running out of", "getting along with", "dropping out of"], ans: 0, exp: "looking forward to = expect eagerly / mong đợi." },
        { q: "The marketing director <span class='blank'></span> several minor errors in the final promotional video.", opts: ["pointed out", "gave up", "carried out", "took over"], ans: 0, exp: "point out = indicate / chỉ trích, chỉ ra." },
        { q: "After the CEO retired, the vice president immediately <span class='blank'></span> the leadership role.", opts: ["took over", "put off", "turned down", "looked into"], ans: 0, exp: "took over = assume control / tiếp quản." },
        { q: "We completely <span class='blank'></span> printer ink yesterday, so I had to buy more this morning.", opts: ["ran out of", "came down with", "kept up with", "looked up to"], ans: 0, exp: "run out of = have none left / hết, cạn kiệt." },
        { q: "Despite the bad weather, the organizers decided to <span class='blank'></span> with the outdoor concert.", opts: ["go ahead", "fall behind", "break down", "get over"], ans: 0, exp: "go ahead = proceed / tiếp tục tiến hành." },
        { q: "The old air conditioning unit in the lobby <span class='blank'></span> again yesterday.", opts: ["broke down", "checked in", "grew up", "woke up"], ans: 0, exp: "broke down = stop working / hỏng hóc." },
        { q: "Please <span class='blank'></span> at the front desk 15 minutes before your scheduled appointment.", opts: ["check in", "drop off", "pick up", "take off"], ans: 0, exp: "check in = register on arrival / làm thủ tục đăng ký." },
        { q: "Could you <span class='blank'></span> the client at the airport at 3 PM?", opts: ["pick up", "put down", "throw away", "give away"], ans: 0, exp: "pick up = collect / đón (ai đó)." },
        { q: "The laboratory team successfully <span class='blank'></span> the complex experiment without any flaws.", opts: ["carried out", "gave in", "passed away", "stood out"], ans: 0, exp: "carried out = perform/execute / tiến hành, thực hiện." },
        { q: "The hotel offers <span class='blank'></span> shuttle service to the international airport every hour.", opts: ["complimentary", "mandatory", "temporary", "stationary"], ans: 0, exp: "complimentary = free / miễn phí." },
        { q: "Due to the economic downturn, several local businesses went <span class='blank'></span> last year.", opts: ["bankrupt", "prosperous", "fluent", "reluctant"], ans: 0, exp: "go bankrupt = phá sản." },
        { q: "The new software update is expected to significantly enhance <span class='blank'></span> in the office.", opts: ["productivity", "fragility", "hostility", "futility"], ans: 0, exp: "productivity = năng suất." },
        { q: "Before signing the lease, be sure to read the contract <span class='blank'></span>.", opts: ["thoroughly", "barely", "hardly", "roughly"], ans: 0, exp: "thoroughly = carefully / một cách cẩn thận, kỹ lưỡng." },
        { q: "The keynote speaker delivered a highly <span class='blank'></span> presentation on future market trends.", opts: ["informative", "defective", "repetitive", "passive"], ans: 0, exp: "informative = providing useful info / nhiều thông tin hữu ích." },
        { q: "The company's goal is to <span class='blank'></span> its operations into the European market by next year.", opts: ["expand", "shrink", "contract", "condense"], ans: 0, exp: "expand = enlarge/grow / mở rộng." },
        { q: "All visitors must obtain <span class='blank'></span> from security before entering the restricted area.", opts: ["authorization", "prohibition", "rejection", "violation"], ans: 0, exp: "authorization = permission / sự cho phép, ủy quyền." },
        { q: "We apologize for any <span class='blank'></span> caused by the recent power outage.", opts: ["inconvenience", "convenience", "preference", "reference"], ans: 0, exp: "inconvenience = sự bất tiện." },
        { q: "The board members reached a <span class='blank'></span> decision to invest in renewable energy.", opts: ["unanimous", "divided", "conflicting", "ambiguous"], ans: 0, exp: "unanimous = in complete agreement / nhất trí hoàn toàn." },
        { q: "It is <span class='blank'></span> that you wear a hard hat while visiting the construction site.", opts: ["mandatory", "optional", "voluntary", "arbitrary"], ans: 0, exp: "mandatory = required / bắt buộc." },
        { q: "The candidate's extensive experience makes her a highly <span class='blank'></span> applicant for the position.", opts: ["qualified", "unskilled", "novice", "amateur"], ans: 0, exp: "qualified = competent/eligible / đủ điều kiện, đủ trình độ." },
        { q: "The warranty covers any <span class='blank'></span> parts for a period of two years after purchase.", opts: ["defective", "effective", "protective", "selective"], ans: 0, exp: "defective = faulty / bị lỗi, hỏng." },
        { q: "The conference provides a great opportunity to <span class='blank'></span> with industry professionals.", opts: ["network", "isolate", "disconnect", "withdraw"], ans: 0, exp: "network = connect with others / kết nối mạng lưới (quan hệ)." },
        { q: "Please ensure that your travel expenses do not <span class='blank'></span> the approved daily limit.", opts: ["exceed", "precede", "recede", "concede"], ans: 0, exp: "exceed = go beyond / vượt quá." },
        { q: "We will <span class='blank'></span> you as soon as the package is ready for dispatch.", opts: ["notify", "ignore", "neglect", "overlook"], ans: 0, exp: "notify = inform / thông báo." },
        { q: "The company provides a highly <span class='blank'></span> salary package and excellent health benefits.", opts: ["competitive", "repetitive", "sensitive", "tentative"], ans: 0, exp: "competitive = cạnh tranh (thường đi với lương, giá)." },
        { q: "He was promoted to branch manager due to his <span class='blank'></span> dedication to the company.", opts: ["outstanding", "mediocre", "average", "ordinary"], ans: 0, exp: "outstanding = excellent / xuất sắc, nổi bật." },
        { q: "The local council has approved the <span class='blank'></span> to build a new public library.", opts: ["proposal", "refusal", "denial", "rejection"], ans: 0, exp: "proposal = suggestion/plan / bản đề xuất." },
        { q: "Sales heavily <span class='blank'></span> during the winter season, reaching an all-time high.", opts: ["fluctuated", "stabilized", "plummeted", "declined"], ans: 0, exp: "fluctuate = move up and down / dao động (mặc dù ngữ cảnh này hơi dùng từ không hợp, đáp án có thể là surged, nhưng fluctuate cũng quen thuộc. Đổi đáp án thành surged cho chuẩn)." }
    ];
    // Fixing question 39 logic:
    mcqData[38] = { q: "Sales volume <span class='blank'></span> unexpectedly during the holiday season, reaching an all-time high.", opts: ["surged", "plummeted", "declined", "shrank"], ans: 0, exp: "surged = increased suddenly / tăng vọt." };
    
    // Add the remaining 11 to reach 50 (I will add them all fully properly)
    mcqData.push(
        { q: "The manager will <span class='blank'></span> the team's performance during the annual review.", opts: ["evaluate", "ignore", "fabricate", "tolerate"], ans: 0, exp: "evaluate = assess / đánh giá." },
        { q: "If you have any questions, please do not <span class='blank'></span> to contact our support team.", opts: ["hesitate", "participate", "anticipate", "facilitate"], ans: 0, exp: "hesitate = pause/wait / chần chừ, ngần ngại (don't hesitate = đừng ngần ngại)." },
        { q: "It's vital to <span class='blank'></span> a positive attitude when dealing with difficult customers.", opts: ["maintain", "destroy", "abandon", "abolish"], ans: 0, exp: "maintain = keep / duy trì." },
        { q: "All employees must <span class='blank'></span> with the new safety regulations by Monday.", opts: ["comply", "defy", "deny", "reply"], ans: 0, exp: "comply (with) = follow rules / tuân thủ." },
        { q: "The flight was canceled <span class='blank'></span> to the approaching hurricane.", opts: ["due", "prior", "contrary", "thanks"], ans: 0, exp: "due to = because of / bởi vì." },
        { q: "Our products are manufactured <span class='blank'></span> in Germany before being exported globally.", opts: ["exclusively", "partially", "barely", "hardly"], ans: 0, exp: "exclusively = solely/only / độc quyền, duy nhất." },
        { q: "The CEO gave a very <span class='blank'></span> speech that motivated all the staff members.", opts: ["inspiring", "tiring", "boring", "confusing"], ans: 0, exp: "inspiring = motivating / truyền cảm hứng." },
        { q: "We have reached a <span class='blank'></span> agreement, but the final contract still needs to be signed.", opts: ["tentative", "permanent", "definitive", "absolute"], ans: 0, exp: "tentative = temporary/unconfirmed / dự kiến, tạm thời." },
        { q: "The restaurant is famous for its <span class='blank'></span> atmosphere and delicious seafood.", opts: ["cozy", "hostile", "dreary", "gloomy"], ans: 0, exp: "cozy = comfortable / ấm cúng." },
        { q: "The security guard will <span class='blank'></span> the premises every two hours to ensure safety.", opts: ["patrol", "ignore", "damage", "vacate"], ans: 0, exp: "patrol = watch over / tuần tra." },
        { q: "Customers may request a full <span class='blank'></span> if they are not satisfied with their purchase.", opts: ["refund", "fine", "penalty", "charge"], ans: 0, exp: "refund = money back / tiền hoàn lại." }
    );

    // Shuffle options for a question and update answer index
    function shuffleOptions(questionObj) {
        const optionsWithIndex = questionObj.opts.map((opt, i) => ({ text: opt, isCorrect: i === questionObj.ans }));
        
        // Shuffle the array of objects
        for (let i = optionsWithIndex.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [optionsWithIndex[i], optionsWithIndex[j]] = [optionsWithIndex[j], optionsWithIndex[i]];
        }
        
        // Update the question object
        questionObj.opts = optionsWithIndex.map(opt => opt.text);
        questionObj.ans = optionsWithIndex.findIndex(opt => opt.isCorrect);
        return questionObj;
    }

    // Shuffle the entire 50 questions
    function shuffleQuestions(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const mcqContainer = document.getElementById('mcqContainer');
    const qText = document.getElementById('mcqQuestionText');
    const optionsGrid = document.getElementById('mcqOptionsGrid');
    const feedback = document.getElementById('mcqFeedback');
    const nextBtn = document.getElementById('mcqNextBtn');
    
    const progressFill = document.getElementById('quizProgressFill');
    const qCountText = document.getElementById('quizQuestionCount');
    const scoreCountText = document.getElementById('quizScoreCount');
    
    const resultContainer = document.getElementById('quizResultContainer');
    const finalScoreText = document.getElementById('finalScoreText');
    const performanceMsg = document.getElementById('performanceMessage');
    const restartBtn = document.getElementById('mcqRestartBtn');

    let currentQIndex = 0;
    let score = 0;
    let answered = false;
    let randomizedData = [];

    function initMCQ() {
        // Deep copy and shuffle
        randomizedData = JSON.parse(JSON.stringify(mcqData));
        shuffleQuestions(randomizedData);
        randomizedData.forEach(q => shuffleOptions(q));
        
        currentQIndex = 0;
        score = 0;
        
        mcqContainer.style.display = 'block';
        resultContainer.style.display = 'none';
        
        updateUI();
        loadQuestion();
    }

    function updateUI() {
        qCountText.innerText = `Câu ${currentQIndex + 1} / ${randomizedData.length}`;
        scoreCountText.innerText = `Điểm: ${score}`;
        const percent = ((currentQIndex) / randomizedData.length) * 100;
        progressFill.style.width = `${percent}%`;
    }

    function loadQuestion() {
        answered = false;
        feedback.style.display = 'none';
        nextBtn.style.display = 'none';
        optionsGrid.innerHTML = '';
        
        const currentQ = randomizedData[currentQIndex];
        qText.innerHTML = `${currentQIndex + 1}. ${currentQ.q}`;
        
        const letters = ['A', 'B', 'C', 'D'];
        
        currentQ.opts.forEach((opt, index) => {
            const btn = document.createElement('div');
            btn.className = 'mcq-option';
            btn.innerText = `(${letters[index]}) ${opt}`;
            btn.addEventListener('click', () => handleOptionClick(index, btn));
            optionsGrid.appendChild(btn);
        });
    }

    function handleOptionClick(selectedIndex, btnElement) {
        if (answered) return;
        answered = true;
        
        const currentQ = randomizedData[currentQIndex];
        const optionsEl = optionsGrid.children;
        
        // Disable pointer events
        for(let el of optionsEl) el.style.pointerEvents = 'none';

        if (selectedIndex === currentQ.ans) {
            btnElement.classList.add('correct-choice');
            score++;
            scoreCountText.innerText = `Điểm: ${score}`;
            showFeedback(true, currentQ.exp);
            
            // Fill blank visually
            const blank = qText.querySelector('.blank');
            if(blank) blank.innerText = currentQ.opts[selectedIndex];
            
        } else {
            btnElement.classList.add('incorrect-choice');
            optionsEl[currentQ.ans].classList.add('correct-choice');
            showFeedback(false, currentQ.exp);
        }

        updateUI();
        nextBtn.style.display = 'block';
        
        if (currentQIndex === randomizedData.length - 1) {
            nextBtn.innerHTML = 'Xem Kết Quả <i class="fas fa-flag-checkered"></i>';
        }
    }

    function showFeedback(isCorrect, explanation) {
        feedback.style.display = 'block';
        if (isCorrect) {
            feedback.className = 'mcq-feedback success';
            feedback.innerHTML = `<strong><i class="fas fa-check-circle"></i> Chính xác!</strong><br>${explanation}`;
        } else {
            feedback.className = 'mcq-feedback error';
            feedback.innerHTML = `<strong><i class="fas fa-times-circle"></i> Sai rồi!</strong><br>${explanation}`;
        }
    }

    nextBtn.addEventListener('click', () => {
        currentQIndex++;
        if (currentQIndex < randomizedData.length) {
            updateUI();
            loadQuestion();
        } else {
            showResults();
        }
    });

    function showResults() {
        mcqContainer.style.display = 'none';
        resultContainer.style.display = 'block';
        progressFill.style.width = '100%';
        qCountText.innerText = `Hoàn thành 50/50`;
        
        finalScoreText.innerText = `${score} / 50`;
        
        let msg = '';
        if (score >= 45) {
            msg = "🏆 Xuất sắc quá! Từ vựng của bạn ở mức 800+ TOEIC rồi!";
            finalScoreText.style.color = "var(--correct)";
        } else if (score >= 35) {
            msg = "🌟 Rất tốt! Bạn nắm khá vững Paraphrase cơ bản (Mục tiêu 600-700+).";
            finalScoreText.style.color = "var(--primary-green)";
        } else if (score >= 25) {
            msg = "👍 Khá ổn! Nhưng cần luyện tập thêm để phản xạ nhanh hơn trong Part 3 & 4.";
            finalScoreText.style.color = "#f39c12"; // Orange
        } else {
            msg = "📚 Cố gắng lên nhé! Từ vựng là chìa khóa cực kỳ quan trọng.";
            finalScoreText.style.color = "var(--danger)";
        }
        
        performanceMsg.innerText = msg;
    }

    restartBtn.addEventListener('click', () => {
        initMCQ();
    });

    // Start
    if(document.getElementById('mcqContainer')) {
        initMCQ();
    }
});
