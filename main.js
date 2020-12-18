import getStockData from './scripts/search.js';
import { createTableBody } from './dynamicComponents/createSheet.js';
import './scripts/checkIndent.js';

const searchInput = document.getElementById('search-input');
const searchInputIcon = document.getElementById('search-icon');
const balanceSheetButton = document.getElementById('balance-sheet');
const perShareRatiosButton = document.getElementById('per_share_ratios');
const workingCapitalButton = document.getElementById('workingCapital');
const displayTitle = document.querySelector('div.data_title>h1');
const displayArea = document.querySelector('div[class="data_area"]');
const formTitle = displayArea.querySelector('div.form_title');
const formContainer = displayArea.querySelector('div.form_container');

let reportYear = localStorage.getItem('reportYear') || undefined;
let reportRatioYear = localStorage.getItem('reportRatioYear') || undefined;
let chartAssetYear = localStorage.getItem('chartAssetYear') || undefined;
let whichPage;

function searchHandler() {
    let stockCode = searchInput.value;
    getStockData(stockCode)
        .then((data) => {
            ({ reportYear, reportRatioYear, chartAssetYear } = data);
            reRender(whichPage);
            localStorage.setItem('lastSearchedStockCode', stockCode);
        })
        .catch((error) => console.error(error));
    searchInput.value = '';
}

searchInput.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') { searchHandler() }
});

searchInputIcon.addEventListener('click', () => { searchHandler() });

balanceSheetButton.addEventListener('click', function () {
    whichPage = 'balanceSheet';
    reRender(whichPage);
    localStorage.setItem('whichPage', whichPage);
});

perShareRatiosButton.addEventListener('click', function () {
    whichPage = 'perShareRations';
    reRender(whichPage);
    localStorage.setItem('whichPage', whichPage);
});

workingCapitalButton.addEventListener('click', function () {
    whichPage = 'workingCapital';
    reRender(whichPage);
    localStorage.setItem('whichPage', whichPage);
});

// ====

function reRender(whichPage) {
    let tableBody;
    switch (whichPage) {
        case 'balanceSheet':
            displayTitle.textContent = '資產負債表';
            tableBody = createTableBody(reportYear.year_balance_sheets);
            break;
        case 'perShareRations':
            displayTitle.textContent = '每股比例表';
            tableBody = createTableBody(reportRatioYear.year_per_share_ratios);
            break;
        case 'workingCapital':
            displayTitle.textContent = '營運資金週期';
            tableBody = createTableBody(chartAssetYear.workingCapital);
            break;
        default:
            throw 'can not match any page';
    }
    formTitle.textContent = `${reportYear.stock_symbol}_${reportYear.company_name}_${displayTitle.textContent}_年`;
    formContainer.textContent = '';
    formContainer.append(tableBody);
}

window.addEventListener('load', () => {
    const lastSearchedStockCode = localStorage.getItem('lastSearchedStockCode') || '2330';
    whichPage = localStorage.getItem('whichPage') || 'balanceSheet';
    getStockData(lastSearchedStockCode)
        .then((data) => {
            ({ reportYear, reportRatioYear, chartAssetYear } = data);
            reRender(whichPage);
        })
        .catch((error) => console.error(error));
});
