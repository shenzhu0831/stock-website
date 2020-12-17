import getStockData from './scripts/search.js';
import { createTitle, createBody } from './dynamicComponents/createSheet.js';
import './scripts/checkIndent.js';
import {reportYear2330} from './fake/data.js';

const searchInput = document.getElementById('search-input');
const searchInputIcon = document.getElementById('search-icon');
const balanceSheetButton = document.getElementById('balance-sheet');
const displayArea = document.querySelector('section[class="data"]');

let reportYear;
let reportRatioYear;
let chartAssetYear;

searchInput.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
        getStockData(this.value)
            .then((data) => {
                ({ reportYear, reportRatioYear, chartAssetYear } = data);
            })
            .catch((error) => console.error(error));
        this.value = '';
    }
});

searchInputIcon.addEventListener('click', () => {
    getStockData(this.value)
        .then((data) => {
            ({ reportYear, reportRatioYear, chartAssetYear } = data);
        })
        .catch((error) => console.error(error));
    searchInput.value = '';
});

function createTable(titlText, topText, incomeData) {
    const container = document.createElement('div');
    const title = createTitle(titlText);
    const body = createBody(topText, incomeData);
    body.setRowName('balance_sheets');
    body.setCell(incomeData);

    container.append(title, body);
    return container;
}

balanceSheetButton.addEventListener('click', function () {
    const balanceSheet = createTable(
        '資產負債表',
        '',
        reportYear2330.year_balance_sheets
    );
    displayArea.textContent = '';
    displayArea.append(balanceSheet);
});
