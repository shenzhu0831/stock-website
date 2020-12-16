var canvas = document.getElementById('myChart').getContext('2d');

// 繪製表格
var myLineChart = new Chart(canvas, {
  type: 'line',
  data: {
    datasets: [{
      label: 'test',
      data: [
        {
          // 從右往左數來第五格
          x: 5,
          // 從上到下數來第2格
          y: 2
        },
        {
          x: 4,
          y: 3
        },
        {
          x: 3,
          y: 2
        },
        {
          x: 2,
          y: 1
        },
        {
          x: 1,
          y: 3
        },
        {
          x: 0,
          y: 0
        },
      ],
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderColor: 'rgba(255, 99, 132, 1)',
    }]
  },
  options: {
    scales: {
      xAxes: [{
          type: 'category',
          // 由左到右
          labels: ['aa', 'bb', 'cc', 'dd', 'ee', 'ff'],
      }],
      yAxes: [{
        type: 'category',
        // 由上到下
        labels: ['1', '2', '3', '4', '5', '6'],
    }]
    }
  }
});
