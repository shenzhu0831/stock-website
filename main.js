import getStockData from './scripts/search.js';
import { createTitle, createBody } from './dynamicComponents/createSheet.js';
import './scripts/checkIndent.js';
import {reportYear2330, reportRatioYear2330, chartAssetYear2330} from './fake/data.js';

const searchInput = document.getElementById('search-input');
const searchInputIcon = document.getElementById('search-icon');
const balanceSheetButton = document.getElementById('balance-sheet');
const perShareRatiosButton = document.getElementById('per_share_ratios');
const workingCapitalButton = document.getElementById('workingCapital');
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

function createTable(titlText, topText, incomeData, RowName) {
    const container = document.createElement('div');
    const title = createTitle(titlText);
    const body = createBody(topText, incomeData);
    body.setRowName(RowName);
    body.setCell(incomeData);

    container.append(title, body);
    return container;
}

balanceSheetButton.addEventListener('click', function () {
    const balanceSheet = createTable(
        '資產負債表',
        '2330_台積電_資產負債表_年',
        reportYear2330.year_balance_sheets,
        'balance_sheets'
    );
    displayArea.textContent = '';
    displayArea.append(balanceSheet);
});

perShareRatiosButton.addEventListener('click', function () {
    const balanceSheet = createTable(
        '每股比例表',
        '2330_台積電_資產負債表_年',
        reportRatioYear2330.year_per_share_ratios,
        'cash_flow_statements'
    );
    displayArea.textContent = '';
    displayArea.append(balanceSheet);
})

workingCapitalButton.addEventListener('click', function () {
    const balanceSheet = createTable(
        '營運資金週期',
        '2330_台積電_營運資金週期_年',
        chartAssetYear2330.workingCapital,
        'liquidity_analysis'
    );
    displayArea.textContent = '';
    displayArea.append(balanceSheet);
})
