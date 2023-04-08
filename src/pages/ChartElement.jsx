import { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from  'chart.js'
ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

const ChartElement = () => {  
  const { totalIncomes, totalSavings, totalExpenses } = useContext(DataContext)

  const barChartData = {
    labels: ["Incomes", "Expenses", "Savings"],
    datasets: [
      {
        data: [totalIncomes, totalExpenses, totalSavings],
        label: "Total",
        borderColor: ["#3333ff", "#ff3333", "#33ff33"],
        borderWidth: 3,
        borderRadius: 15, 
        // borderSkipped: false, 
        backgroundColor: ["rgba(0, 0, 255, 0.5)", "rgba(255, 0, 0, 0.5)", "rgba(0, 255, 0, 0.5)"],  
        barThickness: 60,      
        fill: false
      }
    ]
  }

  return (
    <div className="chart-element">
      <Bar
      type="bar"
      width={60}
      height={30}
      options={{        
        plugins: {
          title: {
            display: true,
            text: "Total Budget Chart",
            font: {
              family: "Poppins", 
              size: 16
            }
          },
          legend: {
            display: false,
          },
          datalabels: {
            display: true,
            color: "black",
            formatter: Math.round,
            anchor: "end",
            offset: -40,
            align: "start",
            font: {
              weight: 'bold'
            },
            color: "#666",
            textAlign: 'center',
            formatter: function(value){
              return Math.round(value/`${totalIncomes}`*100) +'% ' +'\n' + 'out of Total Income';
            }
          }
        },
        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          bodyFont: {
            family: "Poppins", 
            size: 14
          },
          titleFont: {
            family: "Poppins" ,
            size: 14 
          }
        },
        scales: {
          x: {
              ticks: {
                  font: {
                      size: 16
                  },
                    autoSkip: false,
                    maxRotation: 45,
                    minRotation: 45
              }
          },
          y: {
            ticks: {
                font: {
                    size: 16
                }
            }
          }
        }
      }}
      data={barChartData}
      plugins={[ChartDataLabels]}
      />
    </div>
  )
}

export default ChartElement