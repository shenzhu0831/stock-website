const accessibleStockCode = ['2330', '3043'];

async function getStockData(stockCodeString) {
    if (!accessibleStockCode.includes(stockCodeString)) return;

    let mockApiPrefix;

    switch (String(stockCodeString)) {
        case '2330':
            // mockApiPrefix = 'https://5fbd1e2b3f8f90001638cc76.mockapi.io/';
            mockApiPrefix = 'fake/';
            break;

        case '3043':
            // mockApiPrefix = 'https://5fbf2d965923c90016e6ba2d.mockapi.io/';
            mockApiPrefix = 'fake/';
            break;

        default:
            throw "can't match stock code.";
    }

    let apiList = ['reportYear', 'reportRatioYear', 'chartAssetYear'];

    let stockDataSet = {};
    for (const iterator of apiList) {
        // const url = mockApiPrefix + iterator + stockCodeString;
        const url = mockApiPrefix + iterator + stockCodeString + '.json';
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

export default getStockData;
