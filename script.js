// 1. ВСТАВЬ СВОЮ ССЫЛКУ ИЗ SHEETDB ТУТ:
const API_URL = "https://sheetdb.io/api/v1/959hac2s6kb4q"; 

const questions = [
    "Как тебя зовут? 😊", "Сколько тебе лет? 🎂", "Твой любимый цвет? 🎨",
    "Какую музыку слушаешь? 🎵", "Твое хобби? 🎮", "Любимый фильм? 🍿",
    "О чем мечтаешь? ✨", "Любимая еда? 🍕", "Кем станешь через 5 лет? 🚀",
    "Что пожелаешь автору? ❤️"
];

// Эти названия должны быть в первой строке твоей таблицы!
const keys = ["name", "age", "color", "music", "hobby", "movie", "dream", "food", "future", "wish"];

let currentIdx = 0;
let answers = {}; 

const qText = document.getElementById('question-text');
const input = document.getElementById('answer-input');
const nextBtn = document.getElementById('next-btn');

function updateUI() {
    if (currentIdx < questions.length) {
        qText.innerText = questions[currentIdx];
        input.value = "";
        input.focus();
    } else {
        saveData();
    }
}

nextBtn.onclick = () => {
    if (input.value.trim() === "") return alert("Напиши ответ!");
    answers[keys[currentIdx]] = input.value;
    currentIdx++;
    updateUI();
};

input.addEventListener("keypress", (e) => { if (e.key === "Enter") nextBtn.click(); });

async function saveData() {
    qText.innerText = "Сохраняю твои ответы... ✨";
    input.style.display = "none";
    nextBtn.style.display = "none";

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: [answers] })
        });
        showFinal();
    } catch (e) {
        alert("Ошибка! Проверь интернет.");
    }
}

function showFinal() {
    document.getElementById('survey-box').classList.add('hide');
    document.getElementById('result-box').classList.remove('hide');
}

updateUI();
