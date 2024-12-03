const apiUrl = "https://apifakedeliverynodejs-main.fly.dev/foods";
const foodList = document.getElementById("food-list");

async function fetchFoods() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const foods = await response.json();
    displayFoods(foods);
  } catch (error) {
    foodList.innerHTML = "<li>Erro ao carregar as comidas.</li>";
  }
}

function displayFoods(foods) {
  foodList.innerHTML = "";
  foods.forEach((food) => {
    const foodCard = document.createElement("li");
    foodCard.classList.add("food-card");

    const name = food.name || "Nome não disponível";
    const price = food.price ? `R$ ${food.price}` : "Preço não disponível";
    const description = food.description || "Descrição não disponível";
    const image = food.image || "https://via.placeholder.com/150";

    foodCard.innerHTML = `
      <img src="${image}" alt="${name}">
      <div class="food-details">
        <h3>${name}</h3>
        <p>${description}</p>
        <p class="price">${price}</p>
      </div>
      <button class="top-btn">TOP</button>
    `;

    foodCard.addEventListener("click", () => {
      window.location.href = `../apiDelivery/detalhes-comida.html?id=${food.id}`;
    });

    foodList.appendChild(foodCard);
  });
}

fetchFoods();
