import express from "express";
import tesseract from "tesseract.js";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public/pages/index.html"));
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});



app.post("/process-image", upload.single("image"), (req, res) => {
	const imagePath = req.file.path;

	tesseract
		.recognize(imagePath, "eng", { logger: (m) => console.log(m) })
		.then(({ data: { text } }) => {
			res.json({ text });
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({ error: "Failed to process the image" });
		});
});
