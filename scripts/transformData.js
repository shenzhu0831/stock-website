function transformData(incomeData, targetKey) {
    const sortResult = incomeData[targetKey]
        .map((item, index) => {
            return { index, year: item.year };
        })
        .sort((a, b) => {
            if (a.year > b.year) return 1;
            if (a.year < b.year) return -1;
            return 0;
        })
        .map((item) => incomeData[targetKey][item.index]);

    const keyArray = Object.keys(incomeData[targetKey][0]);

    const transformedArray = {};

    keyArray.forEach((key) => {
        transformedArray[key] = sortResult.map((item) => item[key]);
    });

    return transformedArray;
}

export default transformData;
