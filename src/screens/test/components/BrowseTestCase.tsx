import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {observer} from "mobx-react-lite";
import {useStores} from "../../../stores/root-store/root-store-context";
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Table} from "antd";
import {ColumnsType} from "antd/es/table";

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const {Column, ColumnGroup} = Table;

export const BrowseTestCase = observer(() => {
    // Get the store using hooks
    const {testCaseStore: store} = useStores();

    const [responseStats, setResponseStats] = useState(transformResponseStatsToArray(store.currentTestCaseMetrics.responseStatusMetricMap));
    const [metricsData, setMetricsData] = useState(store.currentTestCaseMetrics.memoryMetricsMap);

    function transformResponseStatsToArray(responseStats) {
        return Array.from(responseStats.entries()).map(
            ([key, value]) => ({
                key,
                value,
            })
        )
    }

    // Функция для обновления данных метрик
    const updateMetricsData = () => {
        store.getMetricsData();
        setResponseStats(transformResponseStatsToArray(store.currentTestCaseMetrics.responseStatusMetricMap));
        setMetricsData(store.currentTestCaseMetrics.memoryMetricsMap);
    };

    useEffect(() => {
        const intervalId = setInterval(updateMetricsData, 10000); // Обновлять каждые 10 секунд (или другой интервал)
        return () => clearInterval(intervalId); // Очистка интервала при размонтировании компонента
    }, []);


    // Распаковываем данные
    const {init, committed, max, used} = metricsData;

// Создаем массивы для меток времени и значений каждой метрики
    const labels = init.map((entry) => entry.dateTime.toISO().split('T')[1].split('+')[0]);
    const initValues = init.map((entry) => entry.value);
    const committedValues = committed.map((entry) => entry.value);
    const maxValues = max.map((entry) => entry.value);
    const usedValues = used.map((entry) => entry.value);

    // Создаем объект данных для графика
    const chartDataInit = {
        labels, // Форматируем метки времени
        datasets: [
            {
                label: 'init',
                data: initValues,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            },
        ],
    };

    const chartDataCommitted = {
        labels,
        datasets: [
            {
                label: 'committed',
                data: committedValues,
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
            },
        ],
    };

    const chartDataMax = {
        labels,
        datasets: [
            {
                label: 'max',
                data: maxValues,
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: false,
            },
        ],
    };

    const chartDataUsed = {
        labels,
        datasets: [
            {
                label: 'used',
                data: usedValues,
                borderColor: 'rgba(255, 206, 86, 1)',
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            category: {},
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                enabled: true
            }
        },


    };


    const columns: ColumnsType<{
        key,
        value,
    }> = [
        {
            title: 'Код',
            dataIndex: 'key',
        },
        {
            title: 'Количество ответов',
            dataIndex: 'value',
        },
    ];


    return (
        <div style={{marginTop: "20px"}}>
            <div style={{width: "40vh"}}>
                <Table dataSource={responseStats} columns={columns} pagination={false}></Table>
            </div>
            <div style={{marginTop: '20px'}}>
                <label style={{
                    fontWeight: 'bold',
                    fontSize: '24px', // Увеличьте размер шрифта по вашему усмотрению
                    textAlign: 'center',
                    marginBottom: '20px',
                }}>JVM Heap Metrics</label>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    <div style={{width: '50%', padding: '10px'}}>
                        <Line data={chartDataInit} options={options}/>
                    </div>
                    <div style={{width: '50%', padding: '10px'}}>
                        <Line data={chartDataUsed} options={options}/>
                    </div>
                    <div style={{width: '50%', padding: '10px'}}>
                        <Line data={chartDataCommitted} options={options}/>
                    </div>
                    <div style={{width: '50%', padding: '10px'}}>
                        <Line data={chartDataMax} options={options}/>
                    </div>
                </div>
            </div>

        </div>
    );
});
