let layerArray;
let orderList = {};
function isNeedIndent(keyString) {
    return (orderList[keyString] === 2) ? true : false;
}

(async function () {
    await fetch('https://5fbd1e2b3f8f90001638cc76.mockapi.io/layer')
        .then((result) => {
            if (result.ok) return result.json();
            else console.error('something wrong when fetch layer.');
        })
        .catch((error) => console.error(error))
        .then((data) => {
            console.log(data)
            layerArray = data;
        });
    layerArray.forEach(element => {
        orderList[element.column_name] = element.order;
    });
})();

export { layerArray, orderList, isNeedIndent }
