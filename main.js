import matchStockCode from './script/search.js';

const searchInput = document.getElementById('search-input');
const searchInputIcon = document.getElementById('search-icon');

let currentStockData;

searchInput.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
        currentStockData = matchStockCode(this.value);
        this.value = '';
        console.table();
    }
});

searchInputIcon.addEventListener('click', () => {
    currentStockData = matchStockCode(searchInput.value);
    searchInput.value = '';
});
