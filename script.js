const foods = [
    { name: "Торт", description: "Утоление голода: 7 использований" },
    { name: "Тушёный кролик", description: "Утоление голода: 12" },
    { name: "Жареная говядина", description: "Утоление голода: 12,8" },
    { name: "Жареная свинина", description: "Утоление голода: 12,8" },
    { name: "Тыквенный пирог", description: "Утоление голода: 4,8" },
    { name: "Тушёные грибы", description: "Утоление голода: 7,2" },
    { name: "Свекольный суп", description: "Утоление голода: 7,2" },
    { name: "Золотая морковь", description: "Утоление голода: 14,4" },
    { name: "Жареная баранина", description: "Утоление голода: 9,6" },
    { name: "Жареная курятина", description: "Утоление голода: 7,2" },
    { name: "Жареный лосось", description: "Утоление голода: 9,6" },
    { name: "Подозрительный суп", description: "Утоление голода: 7,2" },
    { name: "Бутылочка мёда", description: "Утоление голода: 1,2" },
    { name: "Печёный картофель", description: "Утоление голода: 6" },
    { name: "Жареная крольчатина", description: "Утоление голода: 6" },
    { name: "Жареная треска", description: "Утоление голода: 6" },
    { name: "Хлеб", description: "Утоление голода: 6" },
    { name: "Зачарованное золотое яблоко", description: "Утоление голода: 9,6" },
    { name: "Золотое яблоко", description: "Утоление голода: 9,6" },
    { name: "Яблоко", description: "Утоление голода: 2,4" },
    { name: "Плод хоруса", description: "Утоление голода: 2,4" },
    { name: "Гнилая плоть", description: "Утоление голода: 0,8" },
    { name: "Морковь", description: "Утоление голода: 3,6" },
    { name: "Сырая говядина", description: "Утоление голода: 1,8" },
    { name: "Сырая крольчатина", description: "Утоление голода: 1,8" },
    { name: "Сырая свинина", description: "Утоление голода: 1,8" },
    { name: "Сладкие ягоды", description: "Утоление голода: 0,6" },
    { name: "Светящиеся ягоды", description: "Утоление голода: 0,4" },
    { name: "Ломтик арбуза", description: "Утоление голода: 1,2" },
    { name: "Сырая курятина", description: "Утоление голода: 1,2" },
    { name: "Сырая треска", description: "Утоление голода: 0,4" },
    { name: "Сырой лосось", description: "Утоление голода: 0,4" },
    { name: "Печенье", description: "Утоление голода: 0,4" },
    { name: "Сырая баранина", description: "Утоление голода: 1,2" },
    { name: "Паучий глаз", description: "Утоление голода: 3,2" },
    { name: "Ядовитый картофель", description: "Утоление голода: 1,2" },
    { name: "Свёкла", description: "Утоление голода: 1,2" },
    { name: "Картофель", description: "Утоление голода: 0,6" },
    { name: "Тропическая рыба", description: "Утоление голода: 0,2" },
    { name: "Иглобрюх", description: "Утоление голода: 0,6" }
];

const foodListContainer = document.querySelector('.food-list');

// Функция для создания бокса еды
function createFoodBox(food, isEaten = false) {
    const foodItem = document.createElement('div');
    foodItem.classList.add('food-item');
    
    // Если еда съедена, добавляем класс
    if (isEaten) {
        foodItem.classList.add('eaten');
    }

    foodItem.innerHTML = `
        <h2>${food.name}</h2>
        <p>${food.description}</p>
    `;

    // Добавление обработчика клика
    foodItem.addEventListener('click', () => {
        foodItem.classList.toggle('eaten');
        saveFoodState(); // Сохраняем состояние
    });

    return foodItem;
}

// Заполнение списка еды
function renderFoodList() {
    foodListContainer.innerHTML = '';
    foods.forEach((food, index) => {
        const isEaten = JSON.parse(localStorage.getItem(`food_${index}`)) || false;
        const foodBox = createFoodBox(food, isEaten);
        foodListContainer.appendChild(foodBox);
    });
}

// Сохранение состояния еды в LocalStorage
function saveFoodState() {
    const foodItems = document.querySelectorAll('.food-item');
    foodItems.forEach((item, index) => {
        const isEaten = item.classList.contains('eaten');
        localStorage.setItem(`food_${index}`, JSON.stringify(isEaten));
    });
}

// Фильтрация по поисковому запросу
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const foodItems = document.querySelectorAll('.food-item');
    
    foodItems.forEach(item => {
        const foodName = item.querySelector('h2').textContent.toLowerCase();
        if (foodName.includes(query)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// Инициализация
renderFoodList();
