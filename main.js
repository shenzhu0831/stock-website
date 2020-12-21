import createTableBody from './dynamicComponents/createTable.js';
import { getStockData, findMatches } from './scripts/search.js';
import './scripts/checkIndent.js';
import transformData from './scripts/transformData.js'
import createChart from './dynamicComponents/creatChart.js'

const searchInput = document.getElementById('search-input');
const searchInputIcon = document.getElementById('search-icon');
const balanceSheetButton = document.getElementById('balance-sheet');
const perShareRatiosButton = document.getElementById('per_share_ratios');
const workingCapitalButton = document.getElementById('workingCapital');
const displayTitle = document.querySelector('div.data_title>h1');
const displayArea = document.querySelector('div[class="data_area"]');
const formTitle = displayArea.querySelector('div.form_title');
const formContainer = displayArea.querySelector('div.form_container');
const loadingBlock = document.getElementById('loading-animation');
const loadingAnimation = loadingBlock.querySelector('div');
const preMatch = document.querySelector('div.pre-match');

let reportYear = localStorage.getItem('reportYear') || undefined;
let reportRatioYear = localStorage.getItem('reportRatioYear') || undefined;
let chartAssetYear = localStorage.getItem('chartAssetYear') || undefined;
let whichPage;
let currentConpanyName;
let lastSearchedStockCode;

function afterGetStockDataHandler(data) {
    ({ reportYear, reportRatioYear, chartAssetYear } = data);
    currentConpanyName = reportYear.company_name;
    reportYear = transformData(reportYear, 'year_balance_sheets');
    reportRatioYear = transformData(reportRatioYear, 'year_per_share_ratios');
    chartAssetYear = transformData(chartAssetYear, 'workingCapital');

    
    reRender(whichPage);
}

function searchHandler(inputValue) {
    let stockCode = inputValue;
    loadingBlock.hidden = false;
    loadingAnimation.className = 'lds-hourglass';
    lastSearchedStockCode = stockCode
    localStorage.setItem('lastSearchedStockCode', lastSearchedStockCode);
    getStockData(stockCode)
        .then((data) => {
            afterGetStockDataHandler(data);
            loadingBlock.hidden = true;
            loadingAnimation.className = '';
        })
        .catch((error) => console.error(error));
    searchInput.value = '';
    preMatch.textContent = '';
}

searchInput.addEventListener('input', function () {
    preMatch.textContent = '';
    if (this.value === '') return;
    const preMatchArray = findMatches(this.value);
    preMatchArray.forEach(item => {
        const itemElement = document.createElement('a');
        itemElement.tabIndex = 0;
        itemElement.dataset.code = item;
        itemElement.className = 'pre-match-item';
        itemElement.innerText = item;
        itemElement.addEventListener('keydown', function (event) {
            event.preventDefault();
            if (event.code === 'ArrowDown' && this.nextElementSibling) this.nextElementSibling.focus();
            if (event.code === 'ArrowUp' && this.previousElementSibling) this.previousElementSibling.focus();
            if (event.code === 'ArrowUp' && !this.previousElementSibling) searchInput.focus();
            if (event.code === 'Enter') searchHandler(this.dataset.code);
        })
        itemElement.addEventListener('click', function () {
            searchHandler(this.dataset.code)
        });
        preMatch.append(itemElement);
    })
});

searchInput.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') { searchHandler(this.value) };
    if (event.code === 'ArrowDown' && preMatch.firstChild) {
        event.preventDefault();
        preMatch.firstChild.focus();
    }
});

searchInputIcon.addEventListener('click', () => { searchHandler(searchInput.value) });

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
        case 'workingCapital':
            displayTitle.textContent = '營運資金週期';
            tableBody = createChart(chartAssetYear);
            break;
        case 'balanceSheet':
            displayTitle.textContent = '資產負債表';
            tableBody = createTableBody(reportYear);
            break;
        case 'perShareRations':
            displayTitle.textContent = '每股比例表';
            tableBody = createTableBody(reportRatioYear);
            break;
        default:
            throw 'can not match any page';
    }
    formTitle.innerText = `${lastSearchedStockCode}_${currentConpanyName}_${displayTitle.textContent}_年`
    formContainer.textContent = '';
    formContainer.append(tableBody);
}

window.addEventListener('load', () => {
    lastSearchedStockCode = localStorage.getItem('lastSearchedStockCode') || '2330';
    whichPage = localStorage.getItem('whichPage') || 'balanceSheet';
    getStockData(lastSearchedStockCode)
    .then((data) => {
        afterGetStockDataHandler(data)
        reRender(whichPage);
        loadingBlock.hidden = true;
        loadingAnimation.className = '';
    })
    .catch((error) => console.error(error));
});
