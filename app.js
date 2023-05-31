import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js"

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
	if (inputValue) {
		push(listInDB, inputValue);
	}
	clearInput();
});

onValue(listInDB, function(snapshot) {
	if (snapshot.exists()) {
	let listItemsArray = Object.entries(snapshot.val());
		clearShoppingList();
		for (let i = 0; i < listItemsArray.length; i++) {
			let currentItem = listItemsArray[i];
			addItemToList(currentItem);
		}
	}
	else {
		shoppingListEl.innerHTML = "No items to see here... Yet";
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

function addItemToList(item)
{
	let itemID = item[0];
	let itemValue = item[1];
	let listItem = document.createElement("li");
	listItem.textContent = itemValue;
	listItem.addEventListener("click", function() {
		let locatinOfItemInDB = ref(database, `Shopping List/${itemID}`);
		remove(locatinOfItemInDB);
	})
	shoppingListEl.append(listItem);
}
