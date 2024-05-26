import express from "express";
import fs from "fs";
import { csvParser } from "./controller/csv-parser-controller.mjs";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
	res
		.status(200)
		.json({ status: "200", data: [], message: "hello world", error: "" });
});
app.get("*", (req, res) => {
	res
		.status(404)
		.json({
			status: "404",
			data: [],
			message: "Route not found",
			error: "Page not found",
		});
});

app.post("/request", (req, res) => {
	fs.readFile("./CSV.csv", "utf-8", (err, data) => {
		csvParser(data);
		res
			.status(200)
			.json({ status: "200", data: [data], message: "", error: "" });
	});
});

app.listen(port, () => {
	console.log("Server listening on port", port);
});
