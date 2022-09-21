<template>
    <div ref="chartPie" :style="style"></div>
</template>

<script>
export default {
    props: {
        size: {
            type: Object,
            default: function () {
                return {
                    height: '12rem',
                    width: '100vw'
                }
            }
        },
        chartData: {
            type: Object,
            default: null,
            require: true,
        }
    },
    computed: {
        style() {
            return {
                height: this.size.height + 'rem',
                width: this.size.width
            }
        }
    },
    data() {
        return {
            myChart: null,
            NewSeries: []
        }
    },
    mounted() {
        this.$nextTick(() => {
            // let that = this
            this.myChart = this.$echarts.init(this.$refs.chartPie)
            // 绘制图表
            let option = {
                title: {
                    text: this.chartData.title,
                    left: '15px',
                    top: '0%',
                    textStyle: {
                        fontSize: '14px',
                        fontFamily: 'PingFangSC-Medium',
                        fontWeight: '500',
                        color: '#262626'
                    }
                },
                grid: {
                    top: '23%',
                    left: '15%',
                    right: '10%',
                    bottom: '14%',
                },
                tooltip: {
                    formatter: '{b} ({c})'
                },
                legend: {
                    color: this.chartData.colorList,
                    right: '2%',
                    top: '2%'
                },
                xAxis: [
                    {
                        name: this.chartData.config.yUnit || '',
                        nameLocation: 'end',    //设置name位置  start或者end
                        nameTextStyle: {
                            color: "black",
                            fontSize: 12
                        },
                        gridIndex: 0,
                        axisTick:
                        {
                            show: false
                        },
                        axisLabel:
                        {
                            color: 'black',
                            textStyle: {
                                fontSize: 12,
                                color: "black"
                            }
                        },
                        splitLine:
                        {
                            show: true
                        },
                        axisLine:
                        {
                            show: true
                        }
                    },
                ],
                yAxis: [
                    {
                        name: this.chartData.config.xUnit || '',
                        nameLocation: 'end',    //设置name位置  start或者end
                        nameTextStyle: {
                            color: "black",
                            fontSize: 12
                        },
                        gridIndex: 0,
                        interval: this.chartData.config.xFullDisplay ? 0 : 'auto',
                        data: this.chartData.xData.reverse(),
                        axisTick: {
                            show: false
                        },
                        axisLabel:
                        {
                            color: 'black',
                            textStyle: {
                                fontSize: 12,
                                color: "black"
                            }
                        },
                        splitLine: { show: false },
                        axisLine:
                        {
                            show: true,
                            lineStyle:
                                { color: "#6173a3" }
                        },
                    }
                ],
                series: [
                    {
                        name: this.chartData.config.yName[0],
                        type: 'bar',
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        barWidth: '45%',
                        itemStyle:
                        {
                            normal:
                            {
                                color: this.chartData.colorList[0]
                            }
                        },
                        label:
                        {
                            normal:
                            {
                                show: this.chartData.config.yTopValue,
                                position: "right",
                                textStyle:
                                {
                                    color: "#9EA7C4"
                                }
                            }
                        },
                        data: this.chartData.yData,
                    },

                ]
            };
            this.myChart.setOption(option)
            window.addEventListener('resize', () => {
                if (this.myChart) {
                    this.myChart.resize()
                }
            })
        });
    },
    methods: {
    }
}
</script>

<style>

</style>