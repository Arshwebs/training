// npm install googleapis
// npm i express

const {google} = require("googleapis");
const key = require("./diesel-zenith-376015-524413cbc9e6.json");

const client = new google.auth.JWT(key.client_email, null, key.private_key, ["https://www.googleapis.com/auth/spreadsheets"]);

client.authorize(function (err, tokens) {
	if (err) {
		console.error("Authentication error:", err);
		return;
	}
	// The client is authorized and ready to write to the spreadsheet.
	writeDataToSheet(client);
});

async function writeDataToSheet(auth) {
	const sheets = google.sheets({version: "v4", auth});

	// Specify the spreadsheet ID and range.
	const spreadsheetId = "1f597ZHCsCWQMpD8WjojGTc4v9iM8QXC-0Ha_x8zDWk0";
	let startingIndex = 1;
	let endingIndex = 5;
	let range = `Sheet1!A${startingIndex}:E${endingIndex}`;

	// Specify the values to write.
	const values = [
		["Name", "Age", "Range"],
		["Doegvhgvkh", 30, 5],
	];

	try {
		sheets.spreadsheets.values
			.get({
				spreadsheetId: spreadsheetId,
				range: range,
			})
			.then(response => {
				startingIndex = startingIndex + response.data.values.length;
				console.log(range);
				console.log(response.data, response.data.values.length, startingIndex);
			});
		console.log("data captured");
	} catch (error) {
		console.log("Err in data capturing");
	}

	console.log(startingIndex);

	range = `Sheet1!A${startingIndex}:E${endingIndex}`;
	try {
		// Write the data to the spreadsheet.
		console.log(range);
		const response = await sheets.spreadsheets.values.update({
			spreadsheetId,
			range,
			valueInputOption: "RAW",
			resource: {
				values,
			},
		});

		console.log("Data written successfully.");
	} catch (err) {
		console.error("Error writing data:", err);
	}
}
