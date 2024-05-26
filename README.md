# CSV File Upload and Parsing with Express

This project demonstrates how to upload and parse CSV files using Node.js, Express, and Multer. It provides a REST API to upload a CSV file, parse its content, and return the parsed data as JSON.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
  - [Start the Server](#start-the-server)
  - [Upload a CSV File using Postman](#upload-a-csv-file-using-postman)
  - [Upload a CSV File using HTML Form](#upload-a-csv-file-using-html-form)
- [Code Explanation](#code-explanation)
  - [Backend Code (`index.js`)](#backend-code-indexjs)
 


## Requirements

- Node.js
- npm

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/mgopal0001/csvToJson.git
    cd csvToJson
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

### Start the Server

1. Run the server:
    ```bash
    node index.js
    ```

2. The server will start on `http://localhost:3000`.

### Upload a CSV File using Postman

1. Open Postman.
2. Select the `POST` method.
3. Enter the URL `http://localhost:3000/upload`.
4. Go to the `Body` tab and select `form-data`.
5. Add a key named `file` with type `File`.
6. Choose the CSV file you want to upload.
7. Send the request.

### Upload a CSV File using HTML Form

Create an HTML file with the following content to upload the CSV file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSV Upload</title>
</head>
<body>
    <input type="file" id="csvFileInput" name="file" accept=".csv">
    <button onclick="uploadCSV()">Upload CSV</button>

    <script>
        function uploadCSV() {
            const input = document.getElementById('csvFileInput');
            if (input.files.length === 0) {
                alert("Please select a file first.");
                return;
            }
            const file = input.files[0];
            const formData = new FormData();
            formData.append('file', file);

            fetch('/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
        }
    </script>
</body>
</html>
```
## Code Explation
### Backend Code (index.js)
```javascript
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { csvParser } = require("./controller/csv-parser-controller.js");

const app = express();
const port = 3000;

// Set up multer for file upload
const upload = multer({ dest: 'upload/' });

app.use(express.json());

// Define routes...

app.listen(port, () => {
    console.log("Server listening on port", port);
});
```

## Notes
 - Ensure the upload directory exists or is created automatically by Multer.
- Ensure the upload directory exists or is created automatically by Multer.
- For a more robust CSV parsing solution, consider handling edge cases such as quoted fields with commas inside.
