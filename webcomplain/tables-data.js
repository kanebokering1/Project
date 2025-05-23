// Paste your API Key, Spreadsheet ID, and Range here
const apiKey = 'AIzaSyBl8-vINAA37iZrK1pDHrs4LmivZtAAcPU'; // Ganti dengan API Key Anda
const spreadsheetId = '1KQ2_QIeLvoJIZCM6t4D5BRTgl6BQ84cT9eVvFRw_ySw'; // Ganti dengan Spreadsheet ID Anda
const sheetName = 'Data Work Order'; // Nama sheet Anda (perhatikan huruf besar/kecil dan spasi)
const range = `${sheetName}!A2:V`; // Rentang data Anda

$(document).ready(function() {
    fetchSpreadsheetData();
});

function fetchSpreadsheetData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?key=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.values) {
                populateTable(data.values);
                $('#dataTable').DataTable();
            } else {
                console.error("Error fetching data:", data);
                alert("Failed to fetch data from the spreadsheet.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while fetching data: " + error.message);
        });
}

function populateTable(data) {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "";

    data.forEach(row => {
        const newRow = tableBody.insertRow();
        row.forEach((cellData, index) => {
            const newCell = newRow.insertCell(index);
            newCell.textContent = cellData;
        });
    });
}