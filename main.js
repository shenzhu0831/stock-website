import getStockData from './scripts/search.js';
import createTableBody from './dynamicComponents/createTable.js';
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
// const formTitle = displayArea.querySelector('div.form_title');
const formContainer = displayArea.querySelector('div.form_container');
const loadingBlock = document.getElementById('loading-animation');
const loadingAnimation = loadingBlock.querySelector('div');

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
    
    reRender(whichPage);
}

function searchHandler() {
    let stockCode = searchInput.value;
    loadingBlock.hidden = false;
    loadingAnimation.className = 'lds-hourglass';
    getStockData(stockCode)
        .then((data) => {
            afterGetStockDataHandler(data);
            loadingBlock.hidden = true;
            loadingAnimation.className = '';
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
        case 'workingCapital':
            displayTitle.textContent = '營運資金週期';
            tableBody = createChart();
            break;
        case 'balanceSheet':
            displayTitle.textContent = '資產負債表';
            tableBody = createTableBody(reportYear);
            tableBody.theadText.innerText = `${lastSearchedStockCode}_${currentConpanyName}_${displayTitle.textContent}_年`;
            break;
        case 'perShareRations':
            displayTitle.textContent = '每股比例表';
            tableBody = createTableBody(reportRatioYear);
            tableBody.theadText.innerText = `${lastSearchedStockCode}_${currentConpanyName}_${displayTitle.textContent}_年`;
            break;
        default:
            throw 'can not match any page';
    }
    // tableBody.theadText.innerText = `${lastSearchedStockCode}_${currentConpanyName}_${displayTitle.textContent}_年`;
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
