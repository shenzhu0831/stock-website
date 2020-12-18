import translate from '../scripts/translate.js';
import { isNeedIndent } from '../scripts/checkIndent.js';

function createTableBody(incomeDataArray) {
    let wrapper = document.createElement('div');
    wrapper.className = 'form_wrapper';

        const firstTitle = document.createElement('div');
        firstTitle.innerHTML = `<p>期別</p><p>種類</p>`;
        firstTitle.className = 'form_item_title';
        wrapper.append(firstTitle);

        const incomeDataTitleArray = Object.keys(incomeDataArray[0]);

        let gridRows = 1;
        incomeDataTitleArray.forEach((keyString) => {
            if (keyString === 'year') return;
            gridRows += 1;

            const formTitle = document.createElement('div');
            if (isNeedIndent(keyString)) formTitle.style.paddingLeft = '20px';
            formTitle.innerText = translate(keyString) === undefined ? '' : translate(keyString);
            formTitle.className = 'form_item_title';

            wrapper.append(formTitle);
            wrapper.style.gridTemplateRows = `repeat(${gridRows}, 1fr)`;
        });

        let dataArray = Array.from(incomeDataArray);
        dataArray.forEach((obj) => {
            for (let key in obj) {
                const formItem = document.createElement('div');
                // 如果 key 是 year, 表示是第一行
                if (key === 'year') {
                    formItem.innerHTML = `<p>${obj[key]}</p><p>合併</p>`;
                } else {
                    let isNegative = obj[key] < 0;

                    let numString = String(obj[key]).replace(/(-?\d+)(\d{3})/, "$1,$2");
                    
                    formItem.innerText = isNegative
                        ? `(${numString.replace('-', '')})`
                        : numString;
                    if (isNegative) formItem.style.color = `red`;
                }
                wrapper.append(formItem);
            }
        });
        wrapper.style.gridTemplateColumns = `3fr repeat(${dataArray.length}, 1fr)`;
    return wrapper;
}

export { createTableBody };
