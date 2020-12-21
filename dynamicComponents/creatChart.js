function createChart(incomeData) {
  var canvas = document.createElement('canvas')
  canvas.getContext('2d');

  const years = incomeData.year.reverse()
  const daysOfCashReceivable = incomeData.days_of_cash_receivable.reverse();
  const daysOfSales = incomeData.days_of_sales.reverse();
  const daysOfAccountsPayableTurnover = incomeData.days_of_accounts_payable_turnover.reverse();
  const daysOfOperationTurnover = incomeData.days_of_operation_turnover.reverse();
  const daysOfCashTurnove = incomeData.days_of_cash_turnover.reverse();

  let yearsArray = years.map(year => year.toString());
    // yearsArray.push(numberOfYear);

  let yAxes = yearsArray.reverse()
  
  // 繪製表格
  var myLineChart = new Chart(canvas, {
    type: 'line',
    data: {
      datasets: [
        {
          label: '應收帳款收現天數',
          data: daysOfCashReceivable,
          fill: false,
          pointBackgroundColor: 'rgba(45, 135, 252, 1)',
          borderColor: 'rgba(45, 135, 252, 1)',
          lineTension: 0,
        },
        {
          label: '銷貨天數',
          data: daysOfSales,
          fill: false,
          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
          borderColor: 'rgba(255, 99, 132, 1)',
          lineTension: 0,
        },
        {
          label: '應付帳款週轉天數',
          data: daysOfAccountsPayableTurnover,
          fill: false,
          pointBackgroundColor:'rgba(138, 44, 201, 1)',
          borderColor: 'rgba(138, 44, 201, 1)',
          lineTension: 0,
        },
        {
          label: '營運週轉天數',
          data: daysOfOperationTurnover,
          fill: false,
          pointBackgroundColor: 'rgba(255, 128, 43, 1)',
          borderColor: 'rgba(255, 128, 43, 1)',
          lineTension: 0,
        },
        {
          label: '現金週轉天數',
          data: daysOfCashTurnove,
          fill: false,
          pointBackgroundColor: 'rgba(56, 201, 82, 1)',
          borderColor: 'rgba(56, 201, 82, 1)',
          lineTension: 0,
        },
      ]
    },
    options: {
      scales: {
        xAxes: [{
          display: true,
            type: 'category',
            // 由左到右
            labels: yAxes,
        }],
        yAxes: [{
          ticks: {
            // min: 0,
            max: 320,
            stepSize: 40
          }
        }]
      }
    }
  });

  return canvas;
}

export default createChart ;
