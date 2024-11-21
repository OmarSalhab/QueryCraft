// document.getElementById("submit-btn").addEventListener("click", async () => {

//     const imageInput = document.getElementById("image-upload");
//     const file = imageInput.files[0];

//     if (!file) {
//         alert("Please select an image file first.");
//         return;
//     }

//     // Create FormData to send the image
//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//         document.getElementById("submit-btn").style.display ="none"
//         document.getElementById("loading-img").style.display ="block"

//         // Send the image to the server
//         const response = await fetch("/process-image", {
//             method: "POST",
//             body: formData,
//         });

//         if (!response.ok) {
//             throw new Error("Failed to process the image.");
//         }

//         // Fetch the converted text from the server
//         const data = await response.json();
//         alert(`Text converted from Tesseract: ${data.text}`);
//         document.getElementById("submit-btn").style.display ="block"
//         document.getElementById("loading-img").style.display ="none"
//     } catch (error) {
//         console.error(error);
//         alert("An error occurred. Please try again.");
//     }
// });

const convertImageToText =  (image) => {
	Tesseract.recognize(image, "eng", { logger: (m) => console.log(m) })
		.then(({ data: { text } }) => {
			console.log(text);
		})
		.catch((error) => {
			console.log(`the Error from catch: ${error}`);
		});
};
// async event
document.getElementById("image-upload").addEventListener("change", (event) => {
	const file = event.target.files[0];

	if (file) {
		const reader = new FileReader();
		reader.onload = (e) => {
			const image = e.target.result;
            //async event
            document.getElementById("submit-btn").addEventListener("click", () => {
                convertImageToText(image)
            },{once: true});
		};
		reader.readAsDataURL(file);
	}
});


