const	inputEl = document.getElementById("input-el");
const	buttonEl = document.getElementById("button-el");

buttonEl.addEventListener("click", function() {
	const	inputValue = inputEl.value;
	console.log(inputValue);
});