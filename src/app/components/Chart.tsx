// ApexChart.tsx
import ReactApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

const Chart = () => {
    const dates = [
        { x: new Date('2023-01-01').getTime(), y: 3200000 },
        { x: new Date('2023-01-02').getTime(), y: 3600000 },
        { x: new Date('2023-01-03').getTime(), y: 3300000 },
        { x: new Date('2023-01-04').getTime(), y: 3900000 },
        { x: new Date('2023-01-05').getTime(), y: 4100000 },
    ];

    const options: ApexOptions = {
        chart: {
            type: 'area', // ✅ specific string type
            stacked: false,
            height: 350,
            zoom: {
                type: 'x',
                enabled: false,
                autoScaleYaxis: true,
            },
            toolbar: {
                autoSelected: 'zoom',
            },
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 0,
        },
        title: {
            text: 'Salles',
            align: 'left',
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100],
            },
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return (val / 1000000).toFixed(0);
                },
            },
            title: {
                text: 'Price',
            },
        },
        xaxis: {
            type: 'datetime',
        },
        tooltip: {
            shared: false,
            y: {
                formatter: function (val) {
                    return (val / 1000000).toFixed(0);
                },
            },
        },
    };

    const series = [
        {
            name: 'XYZ MOTORS',
            data: dates,
        },
    ];

    return (
        <div className="p-4 bg-white rounded shadow">
            <ReactApexChart options={options} series={series} type="area" height={350} />
        </div>
    );
};

export default Chart;
