<template>
    <div ref="chartPie" :style="style"></div>
</template>

<script>
export default {
    props: {
        height: {
            type: String,
            default: '10.9rem'
        },
        width: {
            type: String,
            default: '100vw'
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
                height: this.height,
                width: this.width
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
        this.createNewSeries()
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
                legend: {
                    color: this.chartData.colorList,
                    data: this.chartData.config.yName,
                    right: '2%',
                    top: '2%'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    top: '28%',
                    right: '10%',
                    left: '10%',
                    bottom: '14%'
                },
                xAxis: [{
                    name: this.chartData.config.xUnit ||'',
                    nameLocation: 'end' ,    //设置name位置  start或者end
                    nameTextStyle: {
                        color: "black",
                        fontSize:12
                    },
                    type: 'category',
                    data: this.chartData.xData,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0,186,255,.6)'
                        }
                    },
                    axisLabel: {
                        margin: 10,
                        color: 'black',
                        interval: this.chartData.config.xFullDisplay ? 0 : 'auto',
                        textStyle: {
                            fontSize: 14,
                            color: "black"
                        },
                    },

                    axisTick: {
                        show: false
                    }
                }],
                yAxis: [{
                    name: this.chartData.config.yUnit || '',
                    nameLocation: 'end',    //设置name位置  start或者end
                    nameTextStyle: {
                        color: "black",
                        fontSize: 12
                    },
                    axisLabel: {
                        formatter: '{value}',
                        color: 'black',
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(0,186,255,.6)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,0.12)'
                        }
                    }
                }],
                series: this.NewSeries
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
        createNewSeries() {
            this.chartData.colorList.map((item, index) => {
                let currentData = []
                if (index == 0) {
                    currentData = this.chartData.yData1
                } else if (index == 1) {
                    currentData = this.chartData.yData2
                } else if (index == 2) {
                    currentData = this.chartData.yData3
                } else if (index == 3) {
                    currentData = this.chartData.yData4
                }
                let seriesItem = {
                    name: this.chartData.config.yName[index] || '',
                    symbol: "circle",
                    type: 'bar',
                    data: currentData,
                    barWidth: '14px',
                    itemStyle: {
                        normal: {
                            // color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            //     offset: 0,
                            //     color: item // 0% 处的颜色
                            // }, {
                            //     offset: 1,
                            //     color: item // 100% 处的颜色
                            // }], false),
                            color: item,
                            shadowColor: item,
                            shadowBlur: 4,
                        }
                    },
                    label: {
                        normal: {
                            show: this.chartData.config.yTopValue,
                            lineHeight: 30,
                            formatter: '{c}',
                            position: 'top',
                            textStyle: {
                                color: item,
                                fontSize: 14
                            }

                        }
                    }
                }
                this.NewSeries.push(seriesItem)
            })
        }
    }
}
</script>

<style>

</style>