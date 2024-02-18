document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const qaContainer = document.getElementById('qa-container');
    let questionsData;

    // Function to fetch and display questions
    function fetchAndDisplayQuestions(jsonFile) {
        fetch(jsonFile)
            .then(response => response.json())
            .then(data => {
                questionsData = data;
                displayQuestions(questionsData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Fetch questions for level 1 by default
    fetchAndDisplayQuestions('data/level_1.json');

    // Event listener for search form submission
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchTerm = parseInt(document.getElementById('search-input').value);
        const matchingQuestion = questionsData.find(item => item.number === searchTerm);
        qaContainer.innerHTML = '';
        if (matchingQuestion) {
            displayQuestion(matchingQuestion);
        } else {
            qaContainer.innerHTML = '<p>No matching question found.</p>';
        }
    });

    // Function to display all questions
    function displayQuestions(data) {
        qaContainer.innerHTML = '';
        data.forEach(item => {
            displayQuestion(item);
        });
    }

    // Function to display a single question
    function displayQuestion(item) {
        const number = item.number;
        const question = item.question;
        const answer = item.answer;
        const qaElement = document.createElement('div');
        qaElement.innerHTML = `
            <div class="qa-item">
                <h3>Question ${number}: ${question}</h3>
                <p>${answer}</p>
            </div>
        `;
        qaContainer.appendChild(qaElement);
    }

    // Event listener for level selection
    const levelSelect = document.getElementById('level-select');
    levelSelect.addEventListener('change', function() {
        const selectedLevel = this.value;
        const jsonFile = `data/level_${selectedLevel}.json`;
        fetchAndDisplayQuestions(jsonFile);
    });
});
