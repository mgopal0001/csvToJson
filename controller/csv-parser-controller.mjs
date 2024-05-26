import fs from "fs";
function csvParser(data) {
	fs.readFile("../CSV.csv", "utf-8", (err, data) => {
		const lines = data.trim().split("\n");
		const headers = parseCSVLine(lines[0]);
        let result = lines.slice(1).map((line) => {
            let obj = {};
            let values = parseCSVLine(line);
            headers.map((key, index) => {
                if(!obj[key]){
                   obj[key] = values[index];
                }
            })
            return obj;
        })
        return result;
	});
}

function parseCSVLine(line) {
	const result = [];
	let current = "";
	let inQuotes = false;

	for (let i = 0; i < line.length; i++) {
		const char = line[i];

		if (char === '"' && inQuotes && line[i + 1] === '"') {
			current += '"';
			i++;
		} else if (char === '"') {
			inQuotes = !inQuotes;
		} else if (char === "," && !inQuotes) {
			result.push(current.trim());
			current = "";
		} else {
			current += char;
		}
	}
	result.push(current.trim());
	return result;
}

csvParser();
export { csvParser };
