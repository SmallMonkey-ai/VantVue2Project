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
        }
    },
    mounted() {
        this.$nextTick(() => {
            let that = this
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
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function (params) {
                        that.$emit('openLowerLever', params);
                    }
                },
                grid: {
                    top: '28%',
                    right: '10%',
                    left: '10%',
                    bottom: '14%'
                },
                legend: {
                    right: '2%',
                    data: this.chartData.config.yName,
                    color: this.chartData.colorList,
                },
                xAxis: [{
                    name: this.chartData.config.xUnit || '',
                    nameTextStyle: {
                        color: "black",
                        fontSize: 12
                    },
                    type: 'category',
                    boundaryGap: true,
                    axisLine: { //坐标轴轴线相关设置。数学上的x轴
                        show: true,
                        lineStyle: {
                            color: 'black'
                        },
                    },
                    axisLabel: { //坐标轴刻度标签的相关设置
                        textStyle: {
                            color: 'black',
                            margin: 15,
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    data: this.chartData.xData,
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
                series: [{
                    name: this.chartData.config.yName[0] || '',
                    type: 'line',
                    // smooth: true, //是否平滑曲线显示
                    // symbol:'emptyCircle',  // 默认是空心圆（中间是白色的），改成实心圆
                    showAllSymbol: true,
                    symbol: 'circle',
                    symbolSize: 4,
                    lineStyle: {
                        normal: {
                            width: 2,
                            color: this.chartData.colorList[0], // 线条颜色
                        },
                        borderColor: this.chartData.colorList[0]
                    },
                    label: {
                        show: this.chartData.config.mixinTopValue[0],
                        position: 'top',
                        textStyle: {
                            color: 'black',
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: this.chartData.colorList[0],
                        }
                    },
                    emphasis: {
                        // 鼠标hover上去的时候，拐点的颜色和样式
                        itemStyle: {
                            color: this.chartData.colorList[0], //颜色
                            borderColor: '#fff', //图形的描边颜色
                            borderWidth: 0, // 描边的线宽
                            shadowBlur: 4, // 图形的阴影大小
                            shadowColor: '#fff', // 图形的阴影颜色
                        },
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    // areaStyle: { //区域填充样式
                    //     normal: {
                    //         //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                    //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    //                 offset: 0,
                    //                 color: 'rgba(0,154,120,1)'
                    //             },
                    //             {
                    //                 offset: 1,
                    //                 color: 'rgba(0,0,0, 0)'
                    //             }
                    //         ], false),
                    //         shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                    //         shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                    //     }
                    // },
                    data: this.chartData.yData
                }, {
                    name: this.chartData.config.yName[1] || '',
                    type: 'bar',
                    barWidth: 20,
                    tooltip: {
                        show: true
                    },
                    label: {
                        show: this.chartData.config.mixinTopValue[1],
                        position: 'top',
                        textStyle: {
                            color: 'black',
                        }
                    },
                    itemStyle: {
                        normal: {
                            // barBorderRadius: 5,
                            // color: new echarts.graphic.LinearGradient(
                            //     0, 0, 0, 1,
                            //     [{
                            //             offset: 0,
                            //             color: '#14c8d4'
                            //         },
                            //         {
                            //             offset: 1,
                            //             color: '#43eec6'
                            //         }
                            //     ]
                            // )
                            color: this.chartData.colorList[1]
                        }
                    },
                    data: this.chartData.yData1
                }]
            };
            this.myChart.setOption(option)
            window.addEventListener('resize', () => {
                if (this.myChart) {
                    this.myChart.resize()
                }
            })
        });
    },

}
</script>

<style>

</style>