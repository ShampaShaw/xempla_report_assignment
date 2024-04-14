const generateInsights = (data) => {
    const totalSets = data.length;
    const insights = [];

    data.forEach((set, index) => {
        const totalAssets = set.data.length;
        const totalAHUsAboveFDS = set.data.filter(asset => asset.value > asset.avg).length;
        const deviationRanges = set.data.map(asset => Math.abs(asset.value - asset.avg) / asset.avg * 100);
        const minDeviation = Math.min(...deviationRanges);
        const maxDeviation = Math.max(...deviationRanges);
        const avgDeviation = deviationRanges.reduce((sum, value) => sum + value, 0) / totalAssets;

        const insight = `${totalAHUsAboveFDS} AHUs are working above FDS levels. Deviation range is from ${minDeviation.toFixed(2)}% to ${maxDeviation.toFixed(2)}%. Potential increase in energy consumption would be around ${avgDeviation.toFixed(2)}% as compared to FDS levels.Only those assets have been listed where in the flow is below or at FDS level.`;

        insights.push(insight);
    });

    return insights;
};

const generateData = () => {
    const data = [];

    for (let i = 0; i < 100; i++) {
        const dataSet = {
            name: `Asset Set ${i + 1}`,
            data: Array.from({ length: 5 }, (_, index) => ({
                name: `Asset ${index + 1}`,
                value: Math.floor(Math.random() * 50) + 1,
                avg: Math.floor(Math.random() * 30) + 1,
                diff: Math.floor(Math.random() * 30) + 1
            }))
        };

        data.push(dataSet);
    }

    const insights = generateInsights(data);
    data.forEach((set, index) => {
        set.insights = insights[index];
    });

    return data;
};

let Data = generateData();

const updateData = (newData) => {
    Data = [...Data, newData];
};

export { Data, updateData };
