
const XLSX = require('xlsx');
const fs = require('fs');

try {
    console.log("Reading file...");
    const workbook = XLSX.readFile('career data.xlsx');
    const sheetName = workbook.SheetNames[0];
    console.log(`Sheet Name: ${sheetName}`);
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    console.log(`Rows found: ${data.length}`);
    fs.writeFileSync('career_data_converted.json', JSON.stringify(data, null, 2));
    console.log('Conversion successful. Saved to career_data_converted.json');
} catch (error) {
    console.error("Error converting file:", error);
}
