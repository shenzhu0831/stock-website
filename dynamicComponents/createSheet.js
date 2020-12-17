import translate from '../scripts/translate.js';
import { layerArray, isNeedIndent } from '../scripts/checkIndent.js';

function createTitle(h1Text) {
    let container, h1, subTitle, yearButton, quarterButton;

    container = document.createElement('div');
    container.className = 'data_title';

    h1 = document.createElement('h1');
    h1.innerText = h1Text;

    subTitle = document.createElement('div');
    subTitle.className = 'sub_title';

    // input 改成 a 可能比較好
    yearButton = document.createElement('input');
    yearButton.className = 'year_form';
    yearButton.type = 'button';
    yearButton.value = '年表';

    quarterButton = document.createElement('input');
    quarterButton.className = 'quarter_form';
    quarterButton.type = 'button';
    quarterButton.value = '季表';

    subTitle.append(yearButton, quarterButton);
    container.append(h1, subTitle);

    return container;
}

function createBody(formTitleText) {
    let dataArea, wrapper, formTitle;
    dataArea = document.createElement('div');
    dataArea.className = 'data_area';

    wrapper = document.createElement('div');
    wrapper.className = 'form_wrapper';

    dataArea.append(wrapper);

    // 先生成最上方的 form_title
    formTitle = document.createElement('div');
    formTitle.className = 'form_title';
    formTitle.innerText = formTitleText;

    wrapper.append(formTitle);

    // fixme 這裡只是再次確認是 reportYear 是 array

    dataArea.setRowName = function (tableName) {
        console.log(tableName);
        let gridRows = 2;

        const firstTitle = document.createElement('div');
        firstTitle.innerHTML = `<p>期別</p><p>種類</p>`;
        // 不確定 class name
        // firstTitle.className = 'form_item_title';
        wrapper.append(firstTitle);

        layerArray.forEach((item) => {
            if (item.table_name !== tableName) return;
            gridRows += 1;

            const formTitle = document.createElement('div');
            if (isNeedIndent(item.column_name))
                formTitle.style.paddingLeft = '20px';
            // 不確定 class name
            // formTitle.className = 'form_item_title';
            formTitle.innerText = translate(item.column_name);

            wrapper.append(formTitle);
            console.log(wrapper);
            wrapper.style.gridTemplateRows = `repeat(${gridRows}, 1fr)`;
            console.log(wrapper.style.gridTemplateRows);
        });
        console.log(gridRows);
    };

    dataArea.setCell = function (incomeData) {
        let dataArray = Array.from(incomeData);
        dataArray.forEach((obj) => {
            for (let key in obj) {
                const formItem = document.createElement('div');
                // 如果 key 是 year, 表示是第一行
                if (key === 'year') {
                    formItem.innerHTML = `<p>${obj[key]}</p><p>合併</p>`;
                } else {
                    formItem.innerText = obj[key];
                }
                wrapper.append(formItem);
            }
        });
        wrapper.style.gridTemplateColumns = `3fr repeat(${dataArray.length}, 1fr)`;
    };
    return dataArea;
}

export { createTitle, createBody };
