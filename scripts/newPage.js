function newPage(page) {
	addStorage("current_page", page);
	console.log(getStorage("current_page") || "h");
	document.location.href = "MainPage/mainpage.html";
}

function frontPage() {
	removeStorage("current_page");
}