
const XLSX = require('xlsx');
const fs = require('fs');

try {
    console.log("Reading Excel file...");
    const workbook = XLSX.readFile('career data.xlsx');
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    console.log(`Total rows: ${data.length}`);

    const careerMap = {};
    data.forEach(row => {
        const title = row['Career Title'];
        const domain = row['Domain'];
        if (title && domain) {
            careerMap[title] = domain;
        }
    });

    const uniqueCount = Object.keys(careerMap).length;
    console.log(`Unique Career Titles found: ${uniqueCount}`);

    const fileContent = `export const ALL_CAREERS: Record<string, string> = ${JSON.stringify(careerMap, null, 2)};`;

    fs.writeFileSync('data/allCareers.ts', fileContent);
    console.log('Saved to data/allCareers.ts');

} catch (error) {
    console.error("Error:", error);
}
