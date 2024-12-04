document.getElementById("submit-btn").addEventListener("click", async () => {
	const imageInput = document.getElementById("image-upload");
	const file = imageInput.files[0];

	if (!file) {
		alert("Please select an image file first.");
		return;
	}

	// Create FormData to send the image
	const formData = new FormData();
	formData.append("image", file);

	try {
		document.getElementById("submit-btn").style.display = "none";
		document.getElementById("loading-img").style.display = "block";

		// Send the image to the server
		const response = await fetch("/process-image", {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			throw new Error("Failed to process the image.");
		}

		// Fetch the converted text from the server
		const data = await response.json();
		document.getElementById("user-text-output").textContent = data.text;
		document.getElementById("text-input-output").classList.remove("hidden");
		document.getElementById("submit-btn").style.display = "block";
		document.getElementById("loading-img").style.display = "none";
		document.getElementById("file-input-section").style.display = "none";
	} catch (error) {
		console.error(error);
		alert("An error occurred. Please try again.");
	}
});

document.querySelectorAll(".choice-btn").forEach((button) => {
	button.addEventListener("click", (event) => {
		const textInput = document.getElementById("text-input-section");
		const fileInput = document.getElementById("file-input-section");

		if (event.target.id === "text-option") {
			fileInput.classList.add("hidden");
			textInput.classList.toggle("hidden");
		} else if (event.target.id === "image-option") {
			textInput.classList.add("hidden");
			fileInput.classList.toggle("hidden");
		}
	});
});
