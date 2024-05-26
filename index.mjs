import express from "express";
import multer from "multer";
import fs from "fs";
import { csvParser } from "./controller/csv-parser-controller.mjs";
const app = express();
const port = 3000;

const upload = multer({ dest: "uploads/" });
app.use(express.json());

app.get("/", (req, res) => {
	res
		.status(200)
		.json({ status: "200", data: [], message: "Hello world!!", error: "" });
});
app.get("*", (req, res) => {
	res.status(404).json({
		status: "404",
		data: [],
		message: "Route not found",
		error: "Page not found",
	});
});

app.post("/upload", upload.single("file"), (req, res) => {
	const file = req.file;
	if (!file) {
		return res.status(400).json({
			status: 400,
			data: [],
			message: "No file uploaded",
			error: "Bad request",
		});
	}
	fs.readFile(file.path, "utf-8", (err, data) => {
		if (err) {
			return res.status(500).json({
				status: "500",
				data: [],
				message: "Failed to read file",
				error: err.message,
			});
		}
		let result;
		try {
			result = csvParser(data);
		} catch (err) {
			return res.status(500).json({
				status: "500",
				data: [],
				message: "Failed to parse CSV",
				error: err.message,
			});
		}
        
        fs.unlink(file.path, (unlinkErr) => {
            if (unlinkErr) {
                console.error('Failed to delete file:', unlinkErr.message);
            }
        });
		res
			.status(200)
			.json({ status: "200", data: result, message: "", error: "" });


	});
});

app.listen(port, () => {
	console.log("Server listening on port", port);
});
