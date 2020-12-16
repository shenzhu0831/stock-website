import getStockData from './scripts/search.js';
import {createBalanceSheet} from './dynamicComponents/createBalanceSheet.js';

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

balanceSheetButton.addEventListener('click', function () {
    const balanceSheet = createBalanceSheet(reportYear.year_balance_sheets);
    displayArea.textContent = '';
    displayArea.append(balanceSheet);
});
