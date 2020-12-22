const accessibleStock = [
    { code: '2330', name: '台積電' }, { code: '3043', name: '科風' }
];
const accessibleStockCode = accessibleStock.map(stock => stock.code);

function findMatches(wordToMatch) {
    return accessibleStock.filter(item => {
        const regex = new RegExp('^' + wordToMatch);
        return item.code.match(regex);
    });
}

async function getStockData(stockCodeString) {
    if (!accessibleStockCode.includes(stockCodeString)) return;

    let mockApiPrefix;

    switch (String(stockCodeString)) {
        case '2330':
            mockApiPrefix = 'https://5fbd1e2b3f8f90001638cc76.mockapi.io/';
            break;

        case '3043':
            mockApiPrefix = 'https://5fbf2d965923c90016e6ba2d.mockapi.io/';
            break;

        default:
            throw "can't match stock code.";
    }

    let apiList = ['reportYear', 'reportRatioYear', 'chartAssetYear'];

    let stockDataSet = {};
    for (const iterator of apiList) {
        const url = mockApiPrefix + iterator + stockCodeString;
        await fetch(url)
            .then((result) => {
                if (result.ok) return result.json();
                else {
                    console.error('internet connect fail.');
                    console.error(error);
                }
            })
            .catch(error => console.error(error))
            .then((data) => {
                stockDataSet[iterator] = data;
                localStorage.setItem(iterator, JSON.stringify(data));
            });
    }
    return stockDataSet;
}

export { getStockData, findMatches };
