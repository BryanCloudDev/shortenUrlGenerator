"use strict";

let form = document.getElementById("form");
let input = document.getElementById("input-text");
let linkSquare = document.getElementById("link");
let refresh = document.getElementById("clear");
let loading = document.getElementById("loading");

refresh.style.display = "none";
loading.style.display = "none";

async function getShortUrl(url) {
	const body = {
		destination: url,
		domain: {
			fullname: "rebrand.ly",
		},
	};

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			apikey: "caf054fcb9cf4ce9ba95d569e8eaa21c",
		},
		body: JSON.stringify(body),
	};

	try {
		const request = await fetch("https://api.rebrandly.com/v1/links", options);
		const response = await request.json();
		return response;
	} catch (error) {
		throw new Error("Please try again later");
	}
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	let url = input.value.trim();
	loading.style.display = "block";
	getShortUrl(url)
		.then((response) => {
			loading.style.display = "none";
			linkSquare.innerHTML = `https://${response.shortUrl}`;
			linkSquare.setAttribute("href", `https://${response.shortUrl}`);
			refresh.style.display = "inline-block";
		})
		.catch((error) => {
			linkSquare.innerHTML = error.message;
		});
});

refresh.addEventListener("click", () => {
	input.value = "";
	linkSquare.innerHTML = "";
	refresh.style.display = "none";
});
