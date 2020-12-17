import getStockData from './scripts/search.js';
import { createBody } from './dynamicComponents/createSheet.js';
import './scripts/checkIndent.js';
import {reportYear2330, reportRatioYear2330, chartAssetYear2330} from './fake/data.js';

const searchInput = document.getElementById('search-input');
const searchInputIcon = document.getElementById('search-icon');
const balanceSheetButton = document.getElementById('balance-sheet');
const perShareRatiosButton = document.getElementById('per_share_ratios');
const workingCapitalButton = document.getElementById('workingCapital');
const displayTitle = document.querySelector('div.data_title>h1');
const displayArea = document.querySelector('div[class="data_area"]');

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
    displayTitle.textContent = '資產負債表';
    const tableBody = createBody('2330_台積電_資產負債表_年');
    tableBody.setRowName('balance_sheets');
    tableBody.setCell(reportYear2330.year_balance_sheets);

    displayArea.textContent = '';
    displayArea.append(tableBody);
});

perShareRatiosButton.addEventListener('click', function () {
    displayTitle.textContent = '每股比例表';

    const tableBody = createBody('2330_台積電_資產負債表_年');
    tableBody.setRowName('cash_flow_statements');
    tableBody.setCell(reportRatioYear2330.year_per_share_ratios);

    displayArea.textContent = '';
    displayArea.append(tableBody);
});

workingCapitalButton.addEventListener('click', function () {
    displayTitle.textContent = '營運資金週期';

    const tableBody = createBody('2330_台積電_營運資金週期_年');
    tableBody.setRowName('liquidity_analysis');
    tableBody.setCell(chartAssetYear2330.workingCapital);

    displayArea.textContent = '';
    displayArea.append(tableBody);
});
