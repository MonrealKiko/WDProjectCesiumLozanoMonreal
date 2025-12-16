document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("accountsGrid");

  if (!grid) {
    console.error("accountsGrid element not found");
    return;
  }

  function renderAccounts(list) {
    grid.innerHTML = ""; // clear any previous content
    list.forEach(char => {
      const card = document.createElement("div");
      card.className = "character-card";
      card.innerHTML = `
        <div class="card-header">
          <img src="${char.header}" alt="${char.name} header" class="card-header-img">
        </div>
        <img src="${char.avatar}" alt="${char.name}" class="character-avatar">
        <h3>${char.name}</h3>
        <p>${char.vision}</p>
        <p>${char.nation}</p>
        <p>${char.bio}</p>
      `;
      grid.appendChild(card);
    });
  }

  renderAccounts(characters);
});