import translate from '../scripts/translate.js';
import { isNeedIndent } from '../scripts/checkIndent.js';

function createTableBody(incomeDataArray) {
    const wrapper = document.createElement('table');
    const caption = document.createElement('caption');
    caption.className = 'form_title';
    caption.style.captionSide = 'top';
    wrapper.append(caption);
    wrapper.theadText = caption;

    Object.keys(incomeDataArray).forEach((categoryKey) => {
        const tr = document.createElement('tr');
        const th = document.createElement('th');

        if (isNeedIndent(categoryKey) && categoryKey !== 'year') th.style.paddingLeft = '20px';
        
        if (categoryKey === 'year') th.innerText = `期別\n種類`;
        else th.innerText = translate(categoryKey);
        
        tr.append(th);
        
        incomeDataArray[categoryKey].forEach((data) => {
            const td = document.createElement('td');
            if (categoryKey === 'year') td.innerText = `${data}\n合併`;
            else {
                let isNegative = data < 0;

                let number = Number.isInteger(data)
                    ? Number(data)
                    : Number.parseFloat(data).toFixed(1);
                let numString = number.toLocaleString();

                td.innerText = isNegative
                    ? `(${numString.replace('-', '')})`
                    : numString;
                if (isNegative) td.style.color = `red`;
            }
            tr.append(td);
        });
        
        wrapper.append(tr);
    });
    return wrapper;
}

export default createTableBody;
