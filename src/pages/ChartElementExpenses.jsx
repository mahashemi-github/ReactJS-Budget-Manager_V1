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

const ChartElementExpenses = () => {  
  const { totalIncomes, expensesList } = useContext(DataContext)

  const expensesNames = expensesList.map((expense) => expense.name )   
  const expensesValues = expensesList.map((expense) => expense.amount )   
  const expensesPercentages = expensesList.map((expense) => Math.round(expense.amount/`${totalIncomes}`*100) )   
  
  const barChartData = {
    labels: expensesNames,
    datasets: [
      {
        data: expensesPercentages,
        label: "Expense out of Total Income",
        borderColor: ["#ff3333"],
        borderWidth: 3,
        borderRadius: 5, 
        // borderSkipped: false, 
        backgroundColor: ["rgba(255, 0, 0, 0.5)"],  
        barThickness: 30,      
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
            text: "Expenses Chart",
            font: {
              family: "Poppins", 
              size: 16
            }
          },
          datalabels: {
            display: true,
            color: "black",
            formatter: Math.round,
            anchor: "end",
            offset: -20,
            align: "start",
            font: {
              weight: 'bold'
            },
            color: "#666",
            textAlign: 'center',
            formatter: function(value){
              return value +'%';
            }
          }, 
          tooltip: {
            enabled: false
          }
        },
        // tooltips: {
        //   backgroundColor: "#f5f5f5",
        //   titleFontColor: "#333",
        //   bodyFontColor: "#666",
        //   bodySpacing: 4,
        //   xPadding: 12,
        //   mode: "nearest",
        //   intersect: 0,
        //   position: "nearest",
        //   bodyFont: {
        //     family: "Poppins", 
        //     size: 14
        //   },
        //   titleFont: {
        //     family: "Poppins" ,
        //     size: 14 
        //   }
        // },
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

export default ChartElementExpenses