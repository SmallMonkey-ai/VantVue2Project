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
                    width:'100vw'
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
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    color: this.chartData.colorList,
                    right: '2%',
                    top: '2%'
                },
                grid: {
                    top: '28%',
                    left: '10%',
                    right: '10%',
                    bottom: '14%',
                },
                xAxis: {
                    name: this.chartData.config.xUnit || '',
                    nameLocation: 'end',    //设置name位置  start或者end
                    nameTextStyle: {
                        color: "black",
                        fontSize: 12
                    },
                    type: 'category',
                    data: this.chartData.xData,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(193, 207, 220, 1)',
                        }
                    },
                    axisLabel: {
                        color: 'black',
                        interval: this.chartData.config.xFullDisplay ? 0 : 'auto',
                        textStyle: {
                            fontSize: 14,
                            color: "black"
                        }
                    },
                },
                yAxis: [{
                    name: this.chartData.config.yUnit || '',
                    nameLocation: 'end',    //设置name位置  start或者end
                    nameTextStyle: {
                        color: "black",
                        fontSize: 12
                    },
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: "rgba(0, 0, 0, 1)"
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#cdd5e2'
                        }
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(193, 207, 220, 1)',
                        }
                    },
                }
                ],
                series: this.NewSeries
            }
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
                    currentData = this.chartData.yData
                } else if (index == 1) {
                    currentData = this.chartData.yData1
                } else if (index == 2) {
                    currentData = this.chartData.yData2
                } else if (index == 3) {
                    currentData = this.chartData.yData3
                }
                let seriesItem = {
                    name: this.chartData.config.yName[index] || '',
                    type: 'line',
                    data: currentData,
                    color: item,
                    symbol: "circle", //标记的图形为实心圆
                    symbolSize: 4, //标记的大小
                    lineStyle: {
                        normal: {
                            width: 2,
                            color: item,
                            shadowOffsetY: 0
                        }
                    },
                    legend: {
                        icon: 'rect'
                    },
                    itemStyle: {
                        normal: {
                            color: item,
                        }
                    },
                    emphasis: {
                        // 鼠标hover上去的时候，拐点的颜色和样式
                        itemStyle: {
                            color: item, //颜色
                            borderColor: '#fff', //图形的描边颜色
                            borderWidth: 0, // 描边的线宽
                            shadowBlur: 4, // 图形的阴影大小
                            shadowColor: '#fff', // 图形的阴影颜色
                        },
                    },
                    smooth: false
                }
                this.NewSeries.push(seriesItem)
            })
        }
    }
}
</script>

<style>

</style>