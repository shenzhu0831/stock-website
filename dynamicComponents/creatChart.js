
function createChart() {
  var canvas = document.createElement('canvas')
  canvas.getContext('2d');

  // 繪製表格
  var myLineChart = new Chart(canvas, {
    type: 'line',
    data: {
      datasets: [
        {
          label: '應收帳款收現天數',
          data: [5.7, 6.2, 6, 5.9, 6.2, 6, 6, 6],
          fill: false,
          pointBackgroundColor: 'rgba(45, 135, 252, 1)',
          borderColor: 'rgba(45, 135, 252, 1)',
          lineTension: 0,
        },
        {
          label: '銷貨天數',
          data: [4, 3, 4, 4.2, 4.8, 4, 4.5, 3],
          fill: false,
          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
          borderColor: 'rgba(255, 99, 132, 1)',
          lineTension: 0,
        },
        {
          label: '應付帳款週轉天數',
          data: [5.5, 6, 5.3, 5.8, 6, 5.8, 6, 5.8],
          fill: false,
          pointBackgroundColor:'rgba(138, 44, 201, 1)',
          borderColor: 'rgba(138, 44, 201, 1)',
          lineTension: 0,
        },
        {
          label: '營運週轉天數',
          data: [2, 1, 2, 2.2, 2.8, 1.6, 2.2, 0.7],
          fill: false,
          pointBackgroundColor: 'rgba(255, 128, 43, 1)',
          borderColor: 'rgba(255, 128, 43, 1)',
          lineTension: 0,
        },
        {
          label: '現金週轉天數',
          data: [4.5, 3.5, 4.5, 4.5, 5, 4, 4.5, 3.5],
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
            labels: ['19', '18', '17', '16', '15', '14', '13', '12'],
        }],
        yAxes: [{
          display: true,
          type: 'category',
          // 由上到下
          labels: [0, 40, 80, 120, 160, 200, 240, 280, 320].reverse(),
        }]
      }
    }
  });

  return canvas;
}

export default createChart ;
