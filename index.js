document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const clearButton = document.getElementById('clear-button');
    const listContainer = document.getElementById('list-container');

    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

    function renderList() {
        listContainer.innerHTML = '';
        shoppingList.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item.name;
            li.className = item.purchased ? 'purchased' : '';
            li.addEventListener('click', () => togglePurchased(index));
            li.addEventListener('dblclick', () => editItem(index));
            listContainer.appendChild(li);
        });
    }

    function addItem() {
        const itemName = itemInput.value.trim();
        if (itemName) {
            shoppingList.push({ name: itemName, purchased: false });
            itemInput.value = '';
            saveAndRender();
        }
    }

    function togglePurchased(index) {
        shoppingList[index].purchased = !shoppingList[index].purchased;
        saveAndRender();
    }

    function editItem(index) {
        const newName = prompt('Edit item name:', shoppingList[index].name);
        if (newName) {
            shoppingList[index].name = newName.trim();
            saveAndRender();
        }
    }

    function clearList() {
        shoppingList = [];
        saveAndRender();
    }

    function saveAndRender() {
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        renderList();
    }

    addButton.addEventListener('click', addItem);
    clearButton.addEventListener('click', clearList);

    renderList();
});
