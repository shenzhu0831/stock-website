import translate from '../scripts/translate.js';

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

// 直接裝假資料 year_balance_sheets
function createBody(formTitleText, reportYear) {
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
    let dataArray = Array.from(reportYear);

    // 生成 左側中文項目
    let gridRows = 1;
    Object.keys(dataArray[0]).forEach((key) => {
        gridRows += 1;
        const formTitle = document.createElement('div');
        
        // 如果 key 是 year, 表示是第一行
        if (key === 'year') {
            formTitle.innerHTML = `<p>期別</p><p>種類</p>`;
        } else {
            formTitle.innerText = translate(key);
        }

        wrapper.append(formTitle);
    });
    wrapper.style.gridTemplateRows = `repeat(${gridRows}, 1fr)`;

    // 生成其他資料表格
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

    return dataArea;
}

function createBalanceSheet(incomeData) {
    const container = document.createElement('div');
    const title = createTitle('test title text');
    const body = createBody('top text', incomeData);

    container.append(title, body);
    return container;
}

export {
    createBalanceSheet,
    createTitle,
    createBody,
}
