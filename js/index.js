// 柱状图模块1 - 四大古桥年代对比 (保持不变)
(function() {
    var myChart = echarts.init(document.querySelector(".bar .chart"));
    
    // 四大古桥数据
    var bridges = ['赵州桥', '洛阳桥', '广济桥', '卢沟桥'];
    var years = [605, 1059, 1171, 1192];
    var currentYear = 2026;
    var ages = [currentYear - 605, currentYear - 1059, currentYear - 1171, currentYear - 1192];
    
    function getDesc(name) {
        var map = {
            '赵州桥': '',
            '洛阳桥': '',
            '广济桥': '',
            '卢沟桥': ''
        };
        return map[name] || '';
    }
    
    var option = {
        title: {
            text: '四大古桥历史年代对比',
            left: 'center',
            top: 0,
            textStyle: { color: '#fff', fontSize: 14, fontWeight: 'normal' }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: function(params) {
                var idx = params[0].dataIndex;
                return bridges[idx] + '<br/>建造年份：公元 ' + years[idx] + ' 年<br/>距今已有：' + ages[idx] + ' 年<br/>' + getDesc(bridges[idx]);
            }
        },
        legend: {
            data: ['距今年代（年）'],
            left: 'left',
            top: 30,
            textStyle: { color: 'rgba(255,255,255,.7)', fontSize: 11 },
            itemWidth: 20,
            itemHeight: 12
        },
        grid: { left: '8%', top: '18%', right: '5%', bottom: '8%', containLabel: true },
        xAxis: {
            type: 'category',
            data: bridges,
            axisLabel: { color: 'rgba(255,255,255,.8)', fontSize: 11, fontWeight: 'bold' },
            axisLine: { show: false }
        },
        yAxis: {
            type: 'value',
            name: '距今年代（年）',
            nameTextStyle: { color: 'rgba(255,255,255,.7)', fontSize: 11 },
            axisLabel: { color: 'rgba(255,255,255,.6)', fontSize: 10 },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,.1)' } }
        },
        series: [{
            name: '距今年代',
            type: 'bar',
            data: ages,
            barWidth: '50%',
            itemStyle: {
                borderRadius: [8, 8, 0, 0],
                color: { 
                    type: 'linear', 
                    x: 0, y: 0, x2: 0, y2: 1, 
                    colorStops: [
                        { offset: 0, color: '#6ab0de' },
                        { offset: 1, color: '#4a8cbb' }
                    ]
                }
            },
            label: { show: true, position: 'top', formatter: '{c} 年', color: '#ffeb7b', fontSize: 11 }
        }]
    };
    
    myChart.setOption(option);
    window.addEventListener("resize", function() { myChart.resize(); });
})();

// ========== 文学作品类型分布饼形图 ==========
(function() {
    var myChart = echarts.init(document.querySelector(".bar2 .chart"));
    
    var literatureTypes = [
        { name: '桥梁诗词', value: 124, color: '#6ab0de' },
        { name: '游记散文', value: 86, color: '#f5b042' },
        { name: '碑文铭记', value: 52, color: '#80cbc4' },
        { name: '民间传说', value: 38, color: '#f06292' },
        { name: '桥梁赋', value: 21, color: '#baa2ce' },
        { name: '历代修缮记', value: 15, color: '#ffa270' }
    ];
    
    var dataValues = literatureTypes.map(item => item.value);
    var dataNames = literatureTypes.map(item => item.name);
    var colorList = literatureTypes.map(item => item.color);
    
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {d}% ({c} 篇)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderColor: '#aaa',
            textStyle: { color: '#fff', fontSize: 12 }
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: 'middle',
            textStyle: { color: 'rgba(255,255,255,.8)', fontSize: 11 },
            itemWidth: 12,
            itemHeight: 12,
            formatter: function(name) {
                var total = dataValues.reduce((a, b) => a + b, 0);
                for (var i = 0; i < dataNames.length; i++) {
                    if (dataNames[i] === name) {
                        var percent = ((dataValues[i] / total) * 100).toFixed(1);
                        return name + '  (' + percent + '%)';
                    }
                }
                return name;
            }
        },
        series: [{
            name: '文学作品类型',
            type: 'pie',
            radius: ['45%', '70%'],
            avoidLabelOverlap: false,
            center: ['55%', '50%'],
            label: {
                show: true,
                position: 'outside',
                formatter: '{b}\n{d}%',
                color: '#f0f0f0',
                fontSize: 11,
                fontWeight: 'normal',
                lineHeight: 18,
                fontFamily: 'Microsoft YaHei'
            },
            emphasis: {
                scale: true,
                label: { show: true, fontWeight: 'bold', fontSize: 12 }
            },
            data: literatureTypes,
            color: colorList,
            itemStyle: {
                borderRadius: 6,
                borderColor: 'rgba(0,0,0,0.2)',
                borderWidth: 1,
                shadowBlur: 6,
                shadowColor: 'rgba(0,0,0,0.3)'
            },
            labelLine: {
                length: 12,
                length2: 8,
                smooth: true
            }
        }],
        graphic: [
            {
                type: 'text',
                left: 'center',
                top: '48%',
                style: {
                    text: '📖 古桥文献',
                    fill: '#ffeb7b',
                    fontSize: 14,
                    fontWeight: 'bold',
                    fontFamily: 'Microsoft YaHei'
                },
                z: 100,
                invisible: true
            }
        ]
    };
    
    myChart.setOption(option);
    window.addEventListener("resize", function() { myChart.resize(); });
})();

// ========== 四大名桥基本尺寸比较 (保持不变) ==========
(function() {
    var myChart = echarts.init(document.querySelector(".line .chart"));
    
    const bridgeData = {
        names: ['赵州桥', '卢沟桥', '洛阳桥', '广济桥'],
        colors: ['#5470c6', '#91cc75', '#fac858', '#ee6666'],
        lengths: [50.82, 266.5, 1200, 518],
        widths: [9.6, 7.5, 7, 5],
        spans: [37.02, 13.5, 17, 18],
        heights: [7.23, 10, 5, 12]
    };
    
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
        },
        legend: {
            data: ['总长度(米)', '桥面宽度(米)', '最大跨度(米)', '桥体高度(米)'],
            top: 10,
            textStyle: { color: '#ddd' }
        },
        grid: {
            left: '8%',
            right: '5%',
            bottom: '10%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: bridgeData.names,
            axisLabel: {
                fontSize: 12,
                fontWeight: 'bold',
                color: '#fff'
            },
            axisLine: { lineStyle: { color: '#aaa' } }
        },
        yAxis: {
            type: 'value',
            name: '长度/宽度/高度(米)',
            nameTextStyle: { color: '#ddd', fontSize: 11 },
            axisLabel: { color: '#ccc' },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.15)' } }
        },
        series: [
            {
                name: '总长度(米)',
                type: 'bar',
                data: bridgeData.lengths.map((value, index) => {
                    return { value: value, itemStyle: { color: bridgeData.colors[index] } };
                }),
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}米',
                    color: '#ffeb7b'
                },
                barWidth: '18%'
            },
            {
                name: '桥面宽度(米)',
                type: 'bar',
                data: bridgeData.widths.map((value, index) => {
                    return { value: value, itemStyle: { color: bridgeData.colors[index], opacity: 0.8 } };
                }),
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}米',
                    color: '#ffeb7b'
                },
                barWidth: '18%'
            },
            {
                name: '最大跨度(米)',
                type: 'line',
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: { width: 2, color: '#f9a65a' },
                data: bridgeData.spans,
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}米',
                    color: '#f9a65a'
                }
            },
            {
                name: '桥体高度(米)',
                type: 'line',
                symbol: 'diamond',
                symbolSize: 10,
                lineStyle: { width: 2, type: 'dashed', color: '#6cd9b2' },
                data: bridgeData.heights,
                label: {
                    show: true,
                    position: 'bottom',
                    formatter: '{c}米',
                    color: '#6cd9b2'
                }
            }
        ]
    };
    
    myChart.setOption(option);
    window.addEventListener("resize", function() { myChart.resize(); });
})();

// ========== 游客满意度评分雷达图 ==========
(function() {
    var myChart = echarts.init(document.querySelector(".line2 .chart"));

    var option = {
        title: {
            text: '游客满意度多维评估',
            left: 'center',
            top: 0,
            textStyle: { color: '#fff', fontSize: 12 }
        },
        tooltip: {},
        legend: {
            data: ['赵州桥', '卢沟桥', '广济桥', '洛阳桥'],
            bottom: 5,
            textStyle: { color: 'rgba(255,255,255,.7)', fontSize: 10 },
            itemWidth: 20,
            itemHeight: 10
        },
        radar: {
            indicator: [
                { name: '景观质量', max: 100 },
                { name: '文化体验', max: 100 },
                { name: '服务质量', max: 100 },
                { name: '设施完善', max: 100 },
                { name: '交通便利', max: 100 }
            ],
            center: ['50%', '50%'],
            radius: '60%',
            name: { textStyle: { color: '#ddd', fontSize: 10 } },
            splitArea: {
                areaStyle: { color: ['rgba(52,152,219,0.2)', 'rgba(52,152,219,0.1)'] }
            },
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.3)' } }
        },
        series: [
            {
                type: 'radar',
                data: [
                    {
                        value: [95, 90, 85, 80, 90],
                        name: '赵州桥',
                        areaStyle: { color: 'rgba(231, 76, 60, 0.3)' },
                        lineStyle: { color: '#e74c3c', width: 2 },
                        itemStyle: { color: '#e74c3c' }
                    },
                    {
                        value: [90, 95, 80, 75, 85],
                        name: '卢沟桥',
                        areaStyle: { color: 'rgba(52, 152, 219, 0.3)' },
                        lineStyle: { color: '#3498db', width: 2 },
                        itemStyle: { color: '#3498db' }
                    },
                    {
                        value: [85, 80, 85, 80, 75],
                        name: '广济桥',
                        areaStyle: { color: 'rgba(46, 204, 113, 0.3)' },
                        lineStyle: { color: '#2ecc71', width: 2 },
                        itemStyle: { color: '#2ecc71' }
                    },
                    {
                        value: [80, 85, 80, 75, 80],
                        name: '洛阳桥',
                        areaStyle: { color: 'rgba(241, 196, 15, 0.3)' },
                        lineStyle: { color: '#f1c40f', width: 2 },
                        itemStyle: { color: '#f1c40f' }
                    }
                ]
            }
        ],
        graphic: [{ type: 'text', left: 'center', top: 'middle', style: { text: '', fill: 'transparent' } }]
    };

    myChart.setOption(option);
    window.addEventListener("resize", function() { myChart.resize(); });
})();

// ========== 游客量与文学作品数量对比 ==========
(function() {
    var myChart = echarts.init(document.querySelector(".pie .chart"));
    
    const bridges = ['赵州桥', '洛阳桥', '广济桥', '卢沟桥'];
    const touristData = [120, 70, 65, 85];
    const literatureData = [600, 500, 400, 800];
    
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: function(params) {
                let res = params[0].axisValue + '<br/>';
                for (let i = 0; i < params.length; i++) {
                    let seriesName = params[i].seriesName;
                    let value = params[i].value;
                    if (seriesName === '年游客量(万人次)') {
                        res += `${seriesName}: ${value} 万人次<br/>`;
                    } else {
                        res += `${seriesName}: ${value} 篇<br/>`;
                    }
                }
                return res;
            }
        },
        legend: {
            data: ['年游客量(万人次)', '文学作品数量约(篇)'],
            top: 10,
            left: 'center',
            textStyle: { color: 'rgba(255,255,255,.8)', fontSize: 12 },
            itemWidth: 25,
            itemHeight: 14
        },
        grid: {
            left: '8%',
            right: '8%',
            bottom: '8%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: bridges,
            axisLabel: {
                fontSize: 12,
                fontWeight: 'bold',
                color: '#fff'
            },
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.5)' } },
            axisTick: { show: false }
        },
        yAxis: [
            {
                type: 'value',
                name: '年游客量 (万人次)',
                nameTextStyle: { color: '#ffeb7b', fontSize: 11 },
                axisLabel: { color: 'rgba(255,255,255,0.7)' },
                splitLine: { lineStyle: { color: 'rgba(255,255,255,0.15)' } },
                axisLine: { show: false }
            },
            {
                type: 'value',
                name: '文学作品数量 (篇)',
                nameTextStyle: { color: '#f9a65a', fontSize: 11 },
                axisLabel: { color: 'rgba(255,255,255,0.7)' },
                splitLine: { show: false },
                axisLine: { show: false }
            }
        ],
        series: [
            {
                name: '年游客量(万人次)',
                type: 'bar',
                data: touristData,
                barWidth: '35%',
                itemStyle: {
                    borderRadius: [6, 6, 0, 0],
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: '#5dade2' },
                            { offset: 1, color: '#2c6e9e' }
                        ]
                    }
                },
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c} 万',
                    color: '#ffeb7b',
                    fontSize: 11
                },
                tooltip: { valueFormatter: (value) => value + ' 万人次' }
            },
            {
                name: '文学作品数量(篇)',
                type: 'line',
                yAxisIndex: 1,
                data: literatureData,
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: {
                    width: 3,
                    color: '#f39c12',
                    type: 'solid',
                    shadowBlur: 8,
                    shadowColor: 'rgba(243,156,18,0.5)'
                },
                itemStyle: {
                    color: '#f1c40f',
                    borderColor: '#fff',
                    borderWidth: 1
                },
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c} 篇',
                    color: '#f9a65a',
                    fontSize: 11,
                    fontWeight: 'bold'
                },
                tooltip: { valueFormatter: (value) => value + ' 篇' }
            }
        ]
    };
    
    myChart.setOption(option);
    window.addEventListener("resize", function() { myChart.resize(); });
})();

// ========== 中国古桥地图模块 ==========
(function() {
    const ancientBridges = [
        { name: '赵州桥', city: '河北赵县', lng: 114.78, lat: 37.82 },
        { name: '洛阳桥', city: '福建泉州', lng: 118.68, lat: 24.91 },
        { name: '广济桥', city: '广东潮州', lng: 116.65, lat: 23.67 },
        { name: '卢沟桥', city: '北京', lng: 116.22, lat: 39.85 }
    ];

    const scatterData = ancientBridges.map(bridge => ({
        name: bridge.name,
        value: [bridge.lng, bridge.lat],
        city: bridge.city
    }));

    const mapChart = echarts.init(document.querySelector("#ancientBridgeMap"));
    
    // 直接使用 china.js 中注册的地图，无需额外请求
    const option = {
        geo: {
            map: 'china',
            roam: true,
            zoom: 1.2,
            center: [108, 35],
            label: {
                show: true,
                fontSize: 10,
                color: '#555'
            },
            emphasis: {
                label: { show: true, fontWeight: 'bold' },
                itemStyle: { areaColor: '#ffd966' }
            },
            itemStyle: {
                borderColor: '#cbb386',
                borderWidth: 0.8,
                areaColor: '#f7efdf'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                if (params.seriesType === 'scatter') {
                    return `<b>${params.data.name}</b><br/>${params.data.city}<br/>点击查看详细介绍`;
                } else if (params.componentSubType === 'geo') {
                    return `<b>${params.name}</b><br/>该地区古桥信息请点击红色标记点`;
                }
                return params.name;
            }
        },
        series: [{
            type: 'scatter',
            coordinateSystem: 'geo',
            data: scatterData,
            symbolSize: 22,
            symbol: 'circle',
            itemStyle: {
                color: '#ff4444',
                borderColor: '#ffffff',
                borderWidth: 2,
                shadowBlur: 8,
                shadowColor: 'rgba(0,0,0,0.3)'
            },
            label: {
                show: true,
                formatter: function(params) {
                    return params.data.name;
                },
                position: 'top',
                offset: [0, 8],
                fontSize: 12,
                fontWeight: 'bold',
                color: '#c0392b',
                textShadowBlur: 2,
                textShadowColor: '#fff'
            },
            emphasis: {
                scale: true,
                label: { show: true, fontWeight: 'bold', fontSize: 13 },
                itemStyle: { color: '#ff6666', shadowBlur: 15 }
            }
        }]
    };

    mapChart.setOption(option);

    // 点击事件
    mapChart.off('click');
    mapChart.on('click', function(params) {
        if (params.seriesType === 'scatter' && params.data) {
            const bridge = params.data;
            const pageMap = {
                '赵州桥': 'zhaozhou.html',
                '洛阳桥': 'luoyang.html',
                '广济桥': 'guangji.html',
                '卢沟桥': 'lugou.html'
            };
            
            const targetPage = pageMap[bridge.name];
            if (targetPage) {
                window.open(targetPage, '_blank');
            } else {
                window.open(`bridge-detail.html?bridge=${encodeURIComponent(bridge.name)}`, '_blank');
            }
        }
    });

    window.addEventListener("resize", function() {
        if (mapChart) {
            mapChart.resize();
        }
    });
})();

// ========== 替换原“地区分布饼形图”为“四大名桥技术特征对比雷达图”（按照您提供的维度） ==========
(function() {
    var radarChart = echarts.init(document.querySelector(".pie2 .chart"));

    // 四大名桥名称（与项目保持一致顺序：赵州桥、卢沟桥、洛阳桥、广济桥）
    const bridgeNames = ['赵州桥', '卢沟桥', '洛阳桥', '广济桥'];
    // 配色沿用项目原有风格
    const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666'];

    // 根据您提供的雷达图数据定义（维度：技术创新、结构耐久、艺术价值、历史影响、保存状况）
    // 数据来源于您原文件中的 bridgeData
    const radarData = [
        {   // 赵州桥
            value: [9, 10, 8, 9, 9.5],
            name: '赵州桥',
            areaStyle: { color: 'rgba(84,112,198,0.3)' },
            lineStyle: { color: '#5470c6', width: 2 },
            itemStyle: { color: '#5470c6' }
        },
        {   // 卢沟桥
            value: [7, 9, 10, 8, 8.5],
            name: '卢沟桥',
            areaStyle: { color: 'rgba(145,204,117,0.3)' },
            lineStyle: { color: '#91cc75', width: 2 },
            itemStyle: { color: '#91cc75' }
        },
        {   // 洛阳桥
            value: [8, 8, 7, 7, 8.0],
            name: '洛阳桥',
            areaStyle: { color: 'rgba(250,200,88,0.3)' },
            lineStyle: { color: '#fac858', width: 2 },
            itemStyle: { color: '#fac858' }
        },
        {   // 广济桥
            value: [8, 7, 9, 7, 8.0],
            name: '广济桥',
            areaStyle: { color: 'rgba(238,102,102,0.3)' },
            lineStyle: { color: '#ee6666', width: 2 },
            itemStyle: { color: '#ee6666' }
        }
    ];

    var option = {
        title: {
            text: '四大名桥技术特征对比',
            left: 'center',
            top: 0,
            textStyle: { color: '#fff', fontSize: 14, fontWeight: 'normal' }
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                if (params.seriesName && params.value) {
                    let unit = '';
                    if (params.name === '保存状况') unit = ' 分';
                    else unit = ' 分';
                    return `<strong>${params.seriesName}</strong><br/>${params.name} : ${params.value}${unit}`;
                }
                return params.name;
            }
        },
        legend: {
            data: bridgeNames,
            orient: 'horizontal',
            left: 'center',
            bottom: 0,
            textStyle: { color: 'rgba(255,255,255,0.8)', fontSize: 10 },
            itemWidth: 20,
            itemHeight: 12
        },
        radar: {
            indicator: [
                { name: '技术创新', max: 10 },
                { name: '结构耐久', max: 10 },
                { name: '艺术价值', max: 10 },
                { name: '历史影响', max: 10 },
                { name: '保存状况', max: 10 }
            ],
            center: ['50%', '50%'],
            radius: '62%',
            name: {
                textStyle: { color: '#f0f0f0', fontSize: 10, fontWeight: 'bold' }
            },
            splitArea: {
                areaStyle: { color: ['rgba(52,152,219,0.15)', 'rgba(52,152,219,0.05)'] }
            },
            axisLine: { lineStyle: { color: 'rgba(255,215,0,0.3)' } },
            axisTick: { lineStyle: { color: 'rgba(255,255,255,0.4)' } }
        },
        series: radarData.map(bridge => ({
            name: bridge.name,
            type: 'radar',
            data: [{ value: bridge.value, name: bridge.name }],
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: { width: 2, color: bridge.lineStyle.color },
            areaStyle: bridge.areaStyle,
            itemStyle: { color: bridge.itemStyle.color, borderColor: '#fff', borderWidth: 1 },
            emphasis: { scale: true, label: { show: true, fontWeight: 'bold' } }
        }))
    };

    radarChart.setOption(option);
    window.addEventListener("resize", function() { radarChart.resize(); });
})();

