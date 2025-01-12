
document.addEventListener('DOMContentLoaded', function() {
    const quizList = document.querySelector('.quiz-list');
    const quizDisplay = document.querySelector('.quiz-display');
    const scoreDisplay = document.querySelector('.score-display');

    const quizzes = [
        {
            title: 'Quiz 1',
            questions: [
                { question: 'What is 2 + 2?', options: ['3', '4', '5'], answer: '4' },
                { question: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris'], answer: 'Paris' }
            ]
        },
        {
            title: 'Quiz 2',
            questions: [
                { question: 'What is the largest planet?', options: ['Earth', 'Jupiter', 'Mars'], answer: 'Jupiter' },
                { question: 'What is the boiling point of water?', options: ['90°C', '100°C', '110°C'], answer: '100°C' }
            ]
        }
    ];
    
    let currentQuiz = null;
    let currentQuestionIndex = 0;
    let score = 0;
    
    function renderQuizList() {
        quizList.innerHTML = '';
        quizzes.forEach((quiz, index) => {
            const quizItem = document.createElement('div');
            quizItem.classList.add('quiz-item');
            quizItem.innerHTML = `
                <span>${quiz.title}</span>
                <button onclick="startQuiz(${index})">Start Quiz</button>
            `;
            quizList.appendChild(quizItem);
        });
    }
    
    function startQuiz(index) {
        currentQuiz = quizzes[index];
        currentQuestionIndex = 0;
        score = 0;
        renderQuestion();
    }
    
    function renderQuestion() {
        if (currentQuestionIndex < currentQuiz.questions.length) {
            const question = currentQuiz.questions[currentQuestionIndex];
            quizDisplay.innerHTML = `
                <h2>${question.question}</h2>
                ${question.options.map((option, i) => `
                    <p>
                        <input type="radio" name="option" id="option${i}" value="${option}">
                        <label for="option${i}">${option}</label>
                    </p>
                `).join('')}
                <button onclick="submitAnswer()">Submit Answer</button>
            `;
        } else {
            endQuiz();
        }
    }
    
    function submitAnswer() {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            const answer = selectedOption.value;
            if (answer === currentQuiz.questions[currentQuestionIndex].answer) {
                score++;
            }
            currentQuestionIndex++;
            renderQuestion();
        } else {
            alert('Please select an option!');
        }
    }
    
    function endQuiz() {
        quizDisplay.innerHTML = '';
        scoreDisplay.innerHTML = `
            <h2>Your Score: ${score} / ${currentQuiz.questions.length}</h2>
        `;
        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        scores.push({ quiz: currentQuiz.title, score });
        localStorage.setItem('scores', JSON.stringify(scores));
    }
    
    window.startQuiz = startQuiz;
    renderQuizList();
});