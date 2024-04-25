import React from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { background } from '@chakra-ui/react'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)

const Chart = ({ arr = [], currency, days }) => {

    // const prices = [1, 2, 3, 4];
    // const dates = ['12/1/23', '14/4/23', '21/8/23']
    const prices = [];
    const dates = [];

    for (let i = 0; i < arr.length; i++) {
        days === '24h'
            ? dates.push(new Date(arr[i][0]).toLocaleTimeString())
            : dates.push(new Date(arr[i][0]).toLocaleDateString());
        prices.push(arr[i][1]);
    }

    const data = {
        labels: dates,
        datasets: [
            {
                label: `price in ${currency}`,
                data: prices,
                borderColor: 'rgb(255,99,132)',
                backgroundColor: 'rgb(255,99,132,0.5)'
            }
        ]
    }

    return (
        <div className='w-full'>

            <Line
                options={{ responsive: true }}
                data={data}
            />
        </div>
    )
}

export default Chart