import React, { useState, FormEvent } from 'react';
import './ReportsPage.scss';
import SearchIcon from './../../assets/images/search-bigiocn.svg';
import NoDataFoundIcon from './../../assets/images/no-searchfound.png';
import ReactECharts from 'echarts-for-react';
import { Data, updateData } from '../../utils/data';

const ReportsPage = () => {
    const [selectedName, setSelectedName] = useState<string | null>(null);
    const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showGenerateForm, setShowGenerateForm] = useState<boolean>(false);
    const [newData, setNewData] = useState<{
        name: string;
        data: { name: string; value: number; avg: number; diff: number; }[];
        insights?: string;
    } | null>(null);

    const handleNameClick = (name: string) => {
        setSelectedName(name);
    };

    const filteredData = Data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

    let option;
    let dataNotFoundMessage;

    if (selectedName) {
        const data = filteredData.find(item => item.name === selectedName) || newData;
        if (data) {
            option = {
                grid: {
                    left: 50,
                    right: 50,
                    bottom: 50,
                    top: 50
                },
                tooltip: {
                    trigger: chartType === 'pie' ? 'item' : 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                legend: {
                    bottom: 10,
                    data: ['Value', 'Avg', '% Diff']
                },
                xAxis: {
                    type: 'category',
                    data: data.data.map(item => item.name),
                },
                yAxis: [
                    {
                        type: 'value',
                        name: 'Value & Avg'
                    },
                    {
                        type: 'value',
                        name: '% Diff',
                    }
                ],
                series: [
                    {
                        name: 'Value',
                        data: data.data.map(item => item.value),
                        type: chartType,
                        yAxisIndex: 0
                    },
                    {
                        name: 'Avg',
                        data: data.data.map(item => item.avg),
                        type: chartType,
                        yAxisIndex: 0
                    },
                    {
                        name: '% Diff',
                        data: data.data.map(item => item.diff),
                        type: 'line',
                        yAxisIndex: 1
                    }
                ]
            };
        } else {
            dataNotFoundMessage = 'Data not found for the selected item';
        }
    }

    const handleGenerateData = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newName = formData.get('name') as string;
        // Generate new data here using the form data
        // For demonstration purposes, generate random data
        const generatedData = {
            name: newName,
            data: Array.from({ length: 5 }, (_, index) => ({
                name: `Asset ${index + 1}`,
                value: Math.floor(Math.random() * 50) + 1,
                avg: Math.floor(Math.random() * 30) + 1,
                diff: Math.floor(Math.random() * 30) + 1
            }))
        };

        // Update the existing data with the new entry
        updateData(generatedData);
        // Update the searchQuery to trigger the search with the new data
        setSearchQuery(newName);
        setShowGenerateForm(false);
    };

    return (
        <div className="page-wrapper">
            <section className="create-Report-Form-Header ps-4 pe-4 pb-4">
                <div className='page-title'>
                    <h1>Asset Performance Report</h1>
                </div>
                <div className='report-page-wrapper d-flex mt-4'>
                    <div className='col-lg-5 col-xl-4 col-xxl-4 container-opts'>
                        <div className='wrapper-in-con-opts p-4'>
                            <div className='input-search-wrapper position-relative'>
                                <img src={SearchIcon} alt="image search" className='position-absolute search-icon' />
                                <input
                                    type='text'
                                    className='input-seach w-100'
                                    placeholder='Search ...'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            {dataNotFoundMessage && !showGenerateForm && (
                                <button className="generate-data-btn" onClick={() => setShowGenerateForm(true)}>Generate Data</button>
                            )}
                            {showGenerateForm && (
                                <div className="generate-data-form-wrapper">
                                    <form onSubmit={handleGenerateData}>
                                        <label htmlFor="name">Enter Name for New Data:</label>
                                        <input type="text" id="name" name="name" />
                                        <label htmlFor="value">Enter Value:</label>
                                        <input type="number" id="value" name="value" />
                                        <label htmlFor="diff">Enter Difference:</label>
                                        <input type="number" id="diff" name="diff" />
                                        <label htmlFor="insights">Enter Insights:</label>
                                        <textarea id="insights" name="insights" />
                                        <button type="submit">Generate</button>
                                    </form>
                                </div>
                            )}
                            {filteredData.length === 0 && !showGenerateForm && (
                                <div className='d-flex align-items-center flex-column pt-5 pb-5 no-data'>
                                    <img src={NoDataFoundIcon} alt="nodata" />
                                    <p className='mb-0 mt-4'>No Data Found</p>
                                </div>
                            )}
                            <div className='asset-report-list d-flex flex-column mt-4'>
                                {filteredData.map((item, index) => (
                                    <div className='indi-report-name d-flex mb-2' key={index} onClick={() => handleNameClick(item.name)}>
                                        <span className='w-100'>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-7 col-xl-8 col-xxl-8 container-graph'>
                        <div className='wrapper-graph-report p-2 '>
                            <div className="wrapper-graph-section mb-5 d-flex flex-column">
                                <p className='text-center'>{selectedName || 'Select an item'}</p>

                                {option ? (
                                    <div className='graph-wrapper'>
                                        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} className="graph-charts" />
                                    </div>
                                ) : (
                                    <p>{dataNotFoundMessage}</p>
                                )}
                            </div>
                            <div className='button p-4'>
                                <button onClick={() => setChartType('bar')} className='barButton'>Bar Chart</button>
                                <button onClick={() => setChartType('line')} className='lineButton'>Line Chart</button>
                                <button onClick={() => setChartType('pie')} className='pieButton'>Pie Chart</button>
                            </div>
                            <div className="text-insights-wrapper">
                                <div className="in-insi-wrapper">
                                    {selectedName && (
                                        <p>{(filteredData.find(item => item.name === selectedName) as { name: string; data: { name: string; value: number; avg: number; diff: number; }[]; insights?: string })?.insights}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReportsPage;
