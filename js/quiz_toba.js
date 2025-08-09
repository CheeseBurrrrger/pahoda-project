const quizData = [
            {
                question: "Apa arti dari aksara Batak ini?",
                script: "ᯀ", // You can replace with image src
                options: ["A", "Ka", "Ba", "Ta"],
                correct: 0,
                explanation: "Ini adalah aksara 'A' dalam tulisan Batak"
            },
            {
                question: "Aksara Batak berikut ini dibaca sebagai?",
                script: "ᯅᯀ", // You can replace with image src
                options: ["Ma", "Na", "Ba", "Ha"],
                correct: 2,
                explanation: "Ini adalah aksara 'Ba' dalam tulisan Batak"
            },
            {
                question: "Bagaimana cara membaca aksara ini?",
                script: "ᯇᯀ", // You can replace with image src
                options: ["Da", "Ga", "Ka", "La"],
                correct: 0,
                explanation: "Ini adalah aksara 'Da' dalam tulisan Batak"
            },
            {
                question: "Aksara Batak ini melambangkan huruf?",
                script: "ᯉᯀ", // You can replace with image src
                options: ["Pa", "Ma", "Na", "Ra"],
                correct: 1,
                explanation: "Ini adalah aksara 'Ma' dalam tulisan Batak"
            },
            {
                question: "Apa bunyi dari aksara Batak berikut?",
                script: "ᯘᯀ", // You can replace with image src
                options: ["Sa", "Ta", "Wa", "Ya"],
                correct: 0,
                explanation: "Ini adalah aksara 'Sa' dalam tulisan Batak"
            }
        ];

        // Quiz State
        let currentQuestion = 0;
        let score = 0;
        let answered = false;

        // DOM Elements
        const currentQuestionEl = document.getElementById('current-question');
        const totalQuestionsEl = document.getElementById('total-questions');
        const progressBar = document.getElementById('progress-bar');
        const questionText = document.getElementById('question-text');
        const scriptPlaceholder = document.getElementById('script-placeholder');
        const answersGrid = document.getElementById('answers-grid');
        const nextSection = document.getElementById('next-section');
        const nextBtn = document.getElementById('next-btn');
        const quizContent = document.getElementById('quiz-content');
        const quizComplete = document.getElementById('quiz-complete');
        const finalScore = document.getElementById('final-score');
        const restartBtn = document.getElementById('restart-btn');

        // Initialize Quiz
        function initQuiz() {
            totalQuestionsEl.textContent = quizData.length;
            loadQuestion();
        }

        // Load Current Question
        function loadQuestion() {
            const question = quizData[currentQuestion];
            
            // Update question counter and progress
            currentQuestionEl.textContent = currentQuestion + 1;
            progressBar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
            
            // Update question content
            questionText.textContent = question.question;
            scriptPlaceholder.textContent = question.script;
            
            // Clear and populate answers
            answersGrid.innerHTML = '';
            question.options.forEach((option, index) => {
                const answerDiv = document.createElement('div');
                answerDiv.className = 'answer-option';
                answerDiv.innerHTML = `
                    ${option}
                    <span class="result-icon"></span>
                `;
                answerDiv.addEventListener('click', () => selectAnswer(index));
                answersGrid.appendChild(answerDiv);
            });
            
            // Reset state
            answered = false;
            nextSection.classList.remove('show');
        }

        // Handle Answer Selection
        function selectAnswer(selectedIndex) {
            if (answered) return;
            
            answered = true;
            const question = quizData[currentQuestion];
            const answerOptions = document.querySelectorAll('.answer-option');
            
            // Show correct/incorrect for all options
            answerOptions.forEach((option, index) => {
                option.classList.add('disabled');
                
                if (index === question.correct) {
                    option.classList.add('correct');
                    option.querySelector('.result-icon').textContent = '✓';
                } else if (index === selectedIndex) {
                    option.classList.add('incorrect');
                    option.querySelector('.result-icon').textContent = '✗';
                }
            });
            
            // Update score
            if (selectedIndex === question.correct) {
                score++;
            }
            
            // Show next button after delay
            setTimeout(() => {
                nextSection.classList.add('show');
            }, 1000);
        }

        // Next Question
        function nextQuestion() {
            if (currentQuestion < quizData.length - 1) {
                currentQuestion++;
                
                // Add fade transition
                quizContent.classList.add('fade-out');
                
                setTimeout(() => {
                    loadQuestion();
                    quizContent.classList.remove('fade-out');
                    quizContent.classList.add('fade-in');
                    
                    setTimeout(() => {
                        quizContent.classList.remove('fade-in');
                    }, 300);
                }, 300);
            } else {
                showResults();
            }
        }

        // Show Final Results
        function showResults() {
            quizContent.style.display = 'none';
            quizComplete.classList.add('show');
            
            const percentage = Math.round((score / quizData.length) * 100);
            finalScore.textContent = `Skor Anda: ${score}/${quizData.length} (${percentage}%)`;
            
            // Update complete icon based on score
            const completeIcon = document.querySelector('.complete-icon');
            if (percentage >= 80) {
                completeIcon.textContent = '🏆';
            } else if (percentage >= 60) {
                completeIcon.textContent = '🎉';
            } else {
                completeIcon.textContent = '📚';
            }
        }

        // Restart Quiz
        function restartQuiz() {
            currentQuestion = 0;
            score = 0;
            answered = false;
            
            quizComplete.classList.remove('show');
            quizContent.style.display = 'block';
            
            loadQuestion();
        }

        // Event Listeners
        nextBtn.addEventListener('click', nextQuestion);
        restartBtn.addEventListener('click', restartQuiz);

        // Initialize Quiz on Load
        initQuiz();