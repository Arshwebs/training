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
	const range = "Sheet1!A1:E17";

	// Specify the values to write.
	const values = [
		["Name", "Age"],
		["John Doe", 30],
	];

	try {
		// Write the data to the spreadsheet.
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

	try {
		sheets.spreadsheets.values
			.get({
				spreadsheetId: spreadsheetId,
				range: range,
			})
			.then(response => {
				console.log(response.data.values, response.data.values.length);
			});
		console.log("data captured");
	} catch (error) {
		console.log("Err in data capturing");
	}
}
