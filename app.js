import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js"

const	inputEl = document.getElementById("input-el");
const	buttonEl = document.getElementById("button-el");
const	shoppingListEl = document.getElementById("shopping-list");

const appSettings = {
	databaseURL : "https://marketmate-b1086-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const listInDB = ref(database, "Shopping List");

buttonEl.addEventListener("click", function() {
	const	inputValue = inputEl.value;
	push(listInDB, inputValue); 
	clearInput();
});

onValue(listInDB, function(snapshot) {
	let listItemsArray = Object.entries(snapshot.val());
	clearShoppingList();
	for (let i = 0; i < listItemsArray.length; i++) {
		let currentItemID = listItemsArray[i][0];
		let currentItemValue = listItemsArray[i][1];
		addItemToList(currentItemValue);
	}
})

function clearShoppingList()
{
	shoppingListEl.innerHTML = "";
}

function clearInput()
{
	inputEl.value = "";
}

function addItemToList(itemValue)
{
	shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
}
