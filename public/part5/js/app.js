// ORI ACADEMY - Main Application Logic

// 1. Application State
const state = {
    currentTab: 'dashboard', // dashboard | theory | practice | bookmarks
    theme: 'light',
    theoryMode: 'table', // table | flashcard
    searchKeyword: '',
    filterCategory: 'all', // all | cause | contrast | time | purpose | condition | addition | exception | other
    learnedWords: [], // Array of IDs
    bookmarkedQuestions: [], // Array of IDs
    quizHistory: [], // Array of objects { score, total, date }
    currentQuizQuestions: [],
    answeredQuestions: new Set(),
    quizScore: 0
};

// 2. Initialization & LocalStorage
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    applyTheme();
    setupEventListeners();
    switchTab('dashboard');
});

function loadState() {
    const saved = localStorage.getItem('oriToeicState');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            state.theme = parsed.theme || 'light';
            state.learnedWords = parsed.learnedWords || [];
            state.bookmarkedQuestions = parsed.bookmarkedQuestions || [];
            state.quizHistory = parsed.quizHistory || [];
        } catch (e) {
            console.error("Could not parse local storage data", e);
        }
    }
}

function saveState() {
    const dataToSave = {
        theme: state.theme,
        learnedWords: state.learnedWords,
        bookmarkedQuestions: state.bookmarkedQuestions,
        quizHistory: state.quizHistory
    };
    localStorage.setItem('oriToeicState', JSON.stringify(dataToSave));
    updateDashboardStats();
}

// 3. UI Events Setup
function setupEventListeners() {
    // Theme toggle
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if(themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Theory Search & Filter
    document.getElementById('searchInput')?.addEventListener('input', (e) => {
        state.searchKeyword = e.target.value.toLowerCase();
        renderTheory();
    });

    document.getElementById('categoryFilter')?.addEventListener('change', (e) => {
        state.filterCategory = e.target.value;
        renderTheory();
    });

    // Theory View Mode toggle (Table / Flashcard)
    document.getElementById('viewModeBtn')?.addEventListener('click', () => {
        state.theoryMode = state.theoryMode === 'table' ? 'flashcard' : 'table';
        const icon = document.getElementById('viewModeIcon');
        if(icon) icon.className = state.theoryMode === 'table' ? 'fa-solid fa-layer-group' : 'fa-solid fa-table-list';
        renderTheory();
    });
}

function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    applyTheme();
    saveState();
}

function applyTheme() {
    const icon = document.getElementById('themeIcon');
    if (state.theme === 'dark') {
        document.documentElement.classList.add('dark-mode');
        if(icon) icon.className = 'fa-solid fa-sun';
    } else {
        document.documentElement.classList.remove('dark-mode');
        if(icon) icon.className = 'fa-solid fa-moon';
    }
}

// 4. Tab Navigation
window.switchTab = function(tabId) {
    state.currentTab = tabId;
    
    // Update active button classes
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.classList.add('text-gray-300');
    });
    const activeBtn = document.getElementById(`tab-${tabId}`);
    if(activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.classList.remove('text-gray-300');
    }

    // Hide all sections, show active
    ['dashboard', 'theory', 'practice', 'bookmarks'].forEach(id => {
        const sec = document.getElementById(`section-${id}`);
        if(sec) {
            if(id === tabId) {
                sec.classList.remove('hidden');
                sec.classList.add('section-view'); // use animation class
            } else {
                sec.classList.remove('section-view');
                sec.classList.add('hidden');
            }
        }
    });

    // Execute specific logic per tab
    if(tabId === 'dashboard') updateDashboardStats();
    if(tabId === 'theory') renderTheory();
    if(tabId === 'practice' && state.currentQuizQuestions.length === 0) startNewQuiz();
    if(tabId === 'bookmarks') renderBookmarks();
};

// 5. Dashboard Logic
function updateDashboardStats() {
    const learnedCount = state.learnedWords.length;
    const totalWords = window.theoryData ? window.theoryData.length : 72;
    const progressEl = document.getElementById('dashboardProgress');
    const learnedCountEl = document.getElementById('dashboardLearnedCount');
    
    if(learnedCountEl) learnedCountEl.textContent = `${learnedCount} / ${totalWords}`;
    if(progressEl) progressEl.style.width = `${(learnedCount / totalWords) * 100}%`;

    // Calculate Average Score
    let avg = 0;
    if (state.quizHistory.length > 0) {
        const sum = state.quizHistory.reduce((acc, curr) => acc + (curr.score / curr.total), 0);
        avg = Math.round((sum / state.quizHistory.length) * 100);
    }
    const avgScoreEl = document.getElementById('dashboardAvgScore');
    if(avgScoreEl) avgScoreEl.textContent = `${avg}%`;

    const quizzesTakenEl = document.getElementById('dashboardQuizzesTaken');
    if(quizzesTakenEl) quizzesTakenEl.textContent = state.quizHistory.length;
}

// 6. Theory Rendering (Table & Flashcards)
function getFilteredTheoryData() {
    let data = window.theoryData || [];
    if (state.filterCategory !== 'all') {
        data = data.filter(item => item.category === state.filterCategory);
    }
    if (state.searchKeyword) {
        data = data.filter(item => 
            item.word.toLowerCase().includes(state.searchKeyword) || 
            item.meaning.toLowerCase().includes(state.searchKeyword)
        );
    }
    return data;
}

function renderTheory() {
    const data = getFilteredTheoryData();
    const containerTable = document.getElementById('theoryTableContainer');
    const containerFlashcard = document.getElementById('theoryFlashcardContainer');

    if (state.theoryMode === 'table') {
        containerFlashcard.classList.add('hidden');
        containerTable.classList.remove('hidden');
        renderTheoryTable(data);
    } else {
        containerTable.classList.add('hidden');
        containerFlashcard.classList.remove('hidden');
        renderTheoryFlashcards(data);
    }
}

function renderTheoryTable(data) {
    const tbody = document.getElementById('theoryTableBody');
    if(!tbody) return;
    tbody.innerHTML = '';
    
    if(data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-8 text-center text-muted">Không tìm thấy từ vựng nào phù hợp.</td></tr>`;
        return;
    }

    data.forEach((item, index) => {
        const isLearned = state.learnedWords.includes(item.id);
        const btnClass = isLearned ? 'text-green-500' : 'text-gray-300 hover:text-brand-orange';
        const btnIcon = isLearned ? 'fa-solid fa-check-circle' : 'fa-regular fa-circle';

        const row = `
            <tr class="border-b border-color hover:bg-opacity-50 transition-colors ${index % 2 === 0 ? '' : 'bg-gray-50 dark:bg-slate-800'}">
                <td class="px-3 sm:px-6 py-4 text-center">
                    <button onclick="toggleLearnedWord(${item.id})" class="text-xl ${btnClass} transition-colors tooltip" data-tooltip="Đánh dấu đã thuộc">
                        <i class="${btnIcon}"></i>
                    </button>
                </td>
                <td class="px-3 sm:px-6 py-4 text-sm font-bold text-brand-blue dark:text-blue-400">
                    <div class="flex items-center gap-2">
                        <span>${item.word}</span>
                        <button onclick="speakText('${item.word}')" class="text-gray-400 hover:text-brand-orange tooltip" data-tooltip="Phát âm">
                            <i class="fa-solid fa-volume-high"></i>
                        </button>
                    </div>
                    <div class="text-xs text-brand-orange font-normal mt-1">${formatType(item.type)} • ${formatCategory(item.category)}</div>
                </td>
                <td class="px-3 sm:px-6 py-4 text-sm text-main font-medium">${item.meaning}</td>
                <td class="px-3 sm:px-6 py-4 text-sm text-muted italic">"${item.example}"</td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

function renderTheoryFlashcards(data) {
    const container = document.getElementById('theoryFlashcardGrid');
    if(!container) return;
    container.innerHTML = '';

    if(data.length === 0) {
        container.innerHTML = `<div class="col-span-full py-8 text-center text-muted">Không tìm thấy từ vựng nào phù hợp.</div>`;
        return;
    }

    data.forEach(item => {
        const isLearned = state.learnedWords.includes(item.id);
        const checkIcon = isLearned ? 'text-green-500' : 'text-gray-300';
        
        const card = document.createElement('div');
        card.className = 'flashcard-container group';
        card.innerHTML = `
            <div class="flashcard" onclick="this.classList.toggle('flipped')">
                <!-- Mặt trước -->
                <div class="flashcard-front flex flex-col justify-center items-center text-center">
                    <div class="absolute top-3 right-3 text-sm text-muted">${formatCategory(item.category)}</div>
                    <h3 class="text-xl sm:text-2xl font-bold text-brand-blue dark:text-blue-400 mb-2">${item.word}</h3>
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded-full font-medium mb-4">${formatType(item.type)}</span>
                    <p class="text-muted text-sm mt-4 italic">Bấm để lật thẻ</p>
                    
                    <div class="absolute bottom-4 flex gap-4" onclick="event.stopPropagation()">
                        <button onclick="speakText('${item.word}')" class="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-brand-orange hover:text-white transition-colors flex items-center justify-center shadow-sm">
                            <i class="fa-solid fa-volume-high"></i>
                        </button>
                        <button onclick="toggleLearnedWord(${item.id}); renderTheoryFlashcards(getFilteredTheoryData());" class="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 ${checkIcon} hover:text-green-500 transition-colors flex items-center justify-center shadow-sm tooltip" data-tooltip="Đánh dấu đã thuộc">
                            <i class="fa-solid fa-check"></i>
                        </button>
                    </div>
                </div>
                <!-- Mặt sau -->
                <div class="flashcard-back flex flex-col justify-center items-center text-center">
                    <h3 class="text-lg font-bold text-brand-orange mb-3">${item.meaning}</h3>
                    <div class="w-full h-px bg-border-color my-3"></div>
                    <p class="text-main text-sm italic">"${item.example}"</p>
                    <p class="text-muted text-xs mt-4">Bấm để lật lại</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

window.toggleLearnedWord = function(id) {
    const index = state.learnedWords.indexOf(id);
    if (index === -1) {
        state.learnedWords.push(id);
    } else {
        state.learnedWords.splice(index, 1);
    }
    saveState();
    if (state.theoryMode === 'table') {
        renderTheoryTable(getFilteredTheoryData());
    }
};

// 7. Practice Quiz Logic
window.startNewQuiz = function() {
    // Reset state
    state.quizScore = 0;
    state.answeredQuestions.clear();
    
    // Pick 10 random questions from the pool
    const pool = window.quizData || [];
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    state.currentQuizQuestions = shuffled.slice(0, 10);
    
    const scoreDisplay = document.getElementById('scoreDisplay');
    const totalDisplay = document.getElementById('totalDisplay');
    if(scoreDisplay) scoreDisplay.textContent = '0';
    if(totalDisplay) totalDisplay.textContent = state.currentQuizQuestions.length;

    renderQuiz();
    
    // Hide completion modal
    document.getElementById('quizCompletionModal')?.classList.add('hidden');
};

function renderQuiz() {
    const container = document.getElementById('quizContainer');
    if(!container) return;
    container.innerHTML = '';

    state.currentQuizQuestions.forEach((q, index) => {
        const labels = ['A', 'B', 'C', 'D'];
        const isBookmarked = state.bookmarkedQuestions.includes(q.id);
        const bookmarkClass = isBookmarked ? 'text-brand-orange' : 'text-gray-300';
        
        let optionsHtml = '';
        q.options.forEach((opt, optIndex) => {
            optionsHtml += `
                <button id="btn-${index}-${optIndex}" onclick="checkAnswer(${index}, ${optIndex})" class="option-btn w-full text-left p-3 sm:p-4 border-2 rounded-xl flex items-center gap-3 bg-card mb-3 shadow-sm transition-all text-main">
                    <span class="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm shrink-0 transition-colors border-color bg-hover text-muted">
                        ${labels[optIndex]}
                    </span>
                    <span class="text-base font-medium">${opt}</span>
                </button>
            `;
        });

        const questionBlock = `
            <div class="bg-card p-5 sm:p-8 rounded-2xl shadow-sm border border-color mb-8 relative hover:shadow-md transition-shadow animate-fade-in-up" style="animation-delay: ${index * 0.05}s">
                <div class="absolute top-4 right-4">
                    <button onclick="toggleBookmark(${q.id}, this)" class="text-xl ${bookmarkClass} hover:text-brand-orange transition-colors tooltip" data-tooltip="Lưu câu hỏi">
                        <i class="fa-solid fa-bookmark"></i>
                    </button>
                </div>
                <div class="flex gap-4 mb-6 pr-8">
                    <div class="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center font-bold shrink-0 text-lg shadow-sm">
                        ${index + 1}
                    </div>
                    <h3 class="text-lg font-semibold text-main pt-1 leading-relaxed">
                        ${q.question}
                    </h3>
                </div>
                
                <div class="pl-0 sm:pl-14">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                        ${optionsHtml}
                    </div>
                    
                    <div id="explanation-${index}" class="hidden mt-6 p-5 rounded-xl bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-600 shadow-inner">
                        <div class="flex items-start gap-3">
                            <div class="mt-1 w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                                <i class="fa-solid fa-lightbulb"></i>
                            </div>
                            <div class="flex-grow">
                                <p class="font-bold text-brand-blue dark:text-blue-400 mb-2 text-base uppercase tracking-wide">Giải thích chi tiết:</p>
                                <div class="text-sm sm:text-base text-main leading-relaxed border-t border-blue-200 dark:border-slate-600 pt-3">
                                    ${q.explanation}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', questionBlock);
    });
}

window.checkAnswer = function(questionIndex, selectedOptionIndex) {
    if (state.answeredQuestions.has(questionIndex)) return;
    
    const q = state.currentQuizQuestions[questionIndex];
    const isCorrect = (selectedOptionIndex === q.correctAnswer);
    
    const buttons = document.querySelectorAll(`[id^="btn-${questionIndex}-"]`);
    
    buttons.forEach((btn, index) => {
        btn.disabled = true;
        btn.style.cursor = 'default';
        
        if (index === q.correctAnswer) {
            btn.classList.add('correct');
            const spanIcon = btn.querySelector('span');
            spanIcon.innerHTML = `<i class="fa-solid fa-check"></i>`;
        }
        
        if (index === selectedOptionIndex && !isCorrect) {
            btn.classList.add('incorrect');
            const spanIcon = btn.querySelector('span');
            spanIcon.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        }
        
        if (index !== q.correctAnswer && index !== selectedOptionIndex) {
            btn.classList.add('opacity-50');
        }
    });

    if (isCorrect) {
        state.quizScore++;
        const scoreDisplay = document.getElementById('scoreDisplay');
        if(scoreDisplay) {
            scoreDisplay.textContent = state.quizScore;
            scoreDisplay.classList.add('scale-150', 'text-green-500');
            setTimeout(() => scoreDisplay.classList.remove('scale-150', 'text-green-500'), 300);
        }
    }

    state.answeredQuestions.add(questionIndex);

    // Show Explanation
    const expDiv = document.getElementById(`explanation-${questionIndex}`);
    if(expDiv) {
        expDiv.classList.remove('hidden');
        expDiv.classList.add('animate-fade-in-up');
    }

    // Check if quiz is finished
    if (state.answeredQuestions.size === state.currentQuizQuestions.length) {
        finishQuiz();
    }
};

window.toggleBookmark = function(questionId, btnElement) {
    const index = state.bookmarkedQuestions.indexOf(questionId);
    if (index === -1) {
        state.bookmarkedQuestions.push(questionId);
        btnElement.classList.replace('text-gray-300', 'text-brand-orange');
    } else {
        state.bookmarkedQuestions.splice(index, 1);
        btnElement.classList.replace('text-brand-orange', 'text-gray-300');
    }
    saveState();
};

function finishQuiz() {
    // Save to history
    state.quizHistory.push({
        score: state.quizScore,
        total: state.currentQuizQuestions.length,
        date: new Date().toISOString()
    });
    saveState();

    // Show Modal
    setTimeout(() => {
        const modal = document.getElementById('quizCompletionModal');
        const scoreText = document.getElementById('modalScoreText');
        const feedbackText = document.getElementById('modalFeedbackText');
        
        if(modal && scoreText && feedbackText) {
            const percentage = (state.quizScore / state.currentQuizQuestions.length) * 100;
            scoreText.textContent = `${state.quizScore} / ${state.currentQuizQuestions.length}`;
            
            if (percentage >= 80) {
                feedbackText.textContent = "Xuất sắc! Bạn nắm rất vững kiến thức phần này.";
                feedbackText.className = "text-green-600 font-medium";
                triggerConfetti();
            } else if (percentage >= 50) {
                feedbackText.textContent = "Khá tốt! Hãy ôn tập thêm ở tab Lý Thuyết để đạt điểm cao hơn nhé.";
                feedbackText.className = "text-brand-orange font-medium";
            } else {
                feedbackText.textContent = "Cần cố gắng hơn. Bạn hãy xem lại kỹ giải thích các câu sai và ôn lại flashcard nha.";
                feedbackText.className = "text-red-500 font-medium";
            }
            
            modal.classList.remove('hidden');
        }
    }, 1000);
}

// 8. Bookmarks Rendering
function renderBookmarks() {
    const container = document.getElementById('bookmarksContainer');
    if(!container) return;
    container.innerHTML = '';

    const bQuestions = window.quizData.filter(q => state.bookmarkedQuestions.includes(q.id));

    if (bQuestions.length === 0) {
        container.innerHTML = `
            <div class="text-center py-16 bg-card rounded-2xl border border-color shadow-sm">
                <div class="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 text-3xl">
                    <i class="fa-regular fa-bookmark"></i>
                </div>
                <h3 class="text-xl font-bold text-main mb-2">Chưa có câu hỏi nào được lưu</h3>
                <p class="text-muted">Khi làm bài tập, hãy bấm vào biểu tượng Bookmark để lưu lại các câu hỏi khó nhé.</p>
                <button onclick="switchTab('practice')" class="mt-6 px-6 py-2 bg-brand-blue text-white rounded-lg font-medium hover:bg-blue-800 transition-colors">
                    Đi Luyện Tập Ngay
                </button>
            </div>
        `;
        return;
    }

    bQuestions.forEach((q, index) => {
        // Just render the question with explanation revealed
        const optionsHtml = q.options.map((opt, optIndex) => {
            const isCorrect = optIndex === q.correctAnswer;
            const bgClass = isCorrect ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-50 border-border-color text-muted dark:bg-slate-800';
            const icon = isCorrect ? '<i class="fa-solid fa-check"></i>' : labels[optIndex];
            
            return `
                <div class="w-full text-left p-3 sm:p-4 border-2 rounded-xl flex items-center gap-3 mb-3 ${bgClass}">
                    <span class="w-8 h-8 rounded-full border-2 border-color flex items-center justify-center font-bold text-sm shrink-0">
                        ${icon}
                    </span>
                    <span class="text-base font-medium">${opt}</span>
                </div>
            `;
        }).join('');

        const labels = ['A', 'B', 'C', 'D'];

        const html = `
            <div class="bg-card p-5 sm:p-8 rounded-2xl shadow-sm border border-color mb-8 relative">
                <div class="absolute top-4 right-4 flex gap-3">
                    <button onclick="toggleBookmark(${q.id}, this); setTimeout(renderBookmarks, 300)" class="text-xl text-brand-orange hover:text-red-500 transition-colors tooltip" data-tooltip="Bỏ lưu">
                        <i class="fa-solid fa-bookmark"></i>
                    </button>
                </div>
                <div class="flex gap-4 mb-6 pr-8">
                    <div class="w-10 h-10 rounded-xl bg-brand-orange text-white flex items-center justify-center font-bold shrink-0 text-lg shadow-sm">
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-main pt-1 leading-relaxed">
                        ${q.question}
                    </h3>
                </div>
                <div class="pl-0 sm:pl-14">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                        ${optionsHtml}
                    </div>
                    <div class="mt-6 p-5 rounded-xl bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-600 shadow-inner">
                        <div class="flex items-start gap-3">
                            <div class="mt-1 w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                                <i class="fa-solid fa-lightbulb"></i>
                            </div>
                            <div class="flex-grow">
                                <p class="font-bold text-brand-blue dark:text-blue-400 mb-2 text-base uppercase tracking-wide">Giải thích chi tiết:</p>
                                <div class="text-sm sm:text-base text-main leading-relaxed border-t border-blue-200 dark:border-slate-600 pt-3">
                                    ${q.explanation}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', html);
    });
}

// 9. Utilities
window.speakText = function(text) {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9; // Slightly slower for clear learning
    window.speechSynthesis.speak(utterance);
};

function triggerConfetti() {
    if (typeof confetti === 'function') {
        var duration = 3 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function() {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            }));
            confetti(Object.assign({}, defaults, { particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            }));
        }, 250);
    }
}

// Formatting helpers
const formatType = (type) => {
    switch(type) {
        case 'conj': return 'Liên từ';
        case 'pre': return 'Giới từ';
        case 'conj-pre': return 'Liên từ / Giới từ';
        case 'conj-adv': return 'Trạng từ liên kết';
        default: return 'Khác';
    }
};

const formatCategory = (cat) => {
    switch(cat) {
        case 'cause': return 'Nguyên nhân / Kết quả';
        case 'contrast': return 'Nhượng bộ / Tương phản';
        case 'time': return 'Thời gian';
        case 'purpose': return 'Mục đích';
        case 'condition': return 'Điều kiện';
        case 'addition': return 'Bổ sung / Liệt kê';
        case 'exception': return 'Ngoại trừ';
        default: return 'Khác';
    }
};
