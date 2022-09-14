<template>
    <div ref="chartLine" :style="style"></div>
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
            myChart: null
        }
    },
    mounted() {
        this.$nextTick(() => {
            // let that = this
            this.myChart = this.$echarts.init(this.$refs.chartLine)
            // 绘制图表
            let option = {
                title: {
                    text: this.chartData.title,
                    left: '24px',
                    top: '5%',
                    textStyle: {
                        fontSize: '14px',
                        fontFamily: 'PingFangSC-Medium',
                        fontWeight: '500',
                        color: '#262626'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    show:false,
                    position: function (point, params, dom, rect, size) {
                        // 其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，分别为外层div和tooltip提示框的大小
                        var x = point[0]; //
                        var y = point[1];
                        var boxWidth = size.contentSize[0];
                        var boxHeight = size.contentSize[1];
                        var posX = 0; // x坐标位置
                        var posY = 0; // y坐标位置
                        if (x < boxWidth) {
                            // 左边放不开
                            posX = 5;
                        } else {
                            // 左边放的下
                            posX = x - boxWidth;
                        }
                        if (y < boxHeight) {
                            // 上边放不开
                            posY = 5;
                        } else {
                            // 上边放得下
                            posY = y - boxHeight;
                        }
                        return [posX, posY];
                    },
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical', //图例列表的布局朝向（垂直排列）
                    left: '65%',
                    y: 'center',
                    itemGap: 12,//图例的上下间距
                    itemWidth: 8,//图例左侧图块的长度
                    textStyle: {
                        fontSize: 12,
                        fontFamily: 'Microsoft YaHei',
                        fontWeight: 400,
                    },
                    pageTextStyle: {//设置分页的当前页与总页码的文本样式
                        color: 'rgba(36, 196, 221, 0.95)'
                    },
                    pageIconColor: '#6495ed', //翻页下一页的三角按钮颜色
                    pageIconInactiveColor: '#aaa', //翻页（即翻页到头时）
                    pageIconSize: 10, //翻页按钮大小
                    pageButtonGap: 20,//翻页按钮与图例的间距
                    // pageFormatter: '',//隐藏翻页的数字
                    // pageButtonItemGap: 20,//翻页按钮的两个之间的间距
                    // selected:this.monitorData.name可不写
                    //格式化处理方案一： 
                    formatter: function (name) {
                        return name.length > 10 ? name.substr(0, 10) + '...' : name
                    },
                    //格式化处理方案二： 
                    // formatter: function (name) {
                    //     return that.$echarts.format.truncateText(name, 100, '14px Microsoft Yahei', '…');
                    // },
                    //开启tooltip
                    tooltip: {
                        show: false
                    }
                },
                color: this.chartData.colorList,
                series: [
                    {
                        name: this.chartData.title,
                        type: 'pie',
                        radius: ['35%', '55%'],
                        // 饼图位置参数
                        center: ['30%', '50%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderColor: '#fff',
                            borderWidth: 1
                        },
                        label: {
                            show: false,
                            position: 'center',
                            // color: '#4c4a4a',
                            formatter: function (item) {
                                return `${item.data.name} ${item.data.value}`
                            },
                            // '{total}' + '\n\r' + '{active|车辆总数}',
                            rich: {
                                total: {
                                    fontSize: '16px',
                                    fontFamily: 'Helvetica Neue Bold',
                                    fontWeight: 'bold',
                                    color: '#262626'
                                },
                                active: {
                                    fontSize: '12px',
                                    fontFamily: 'PingFangSC-Regular',
                                    fontWeight: '400',
                                    color: '#8C8C8C'
                                }
                            }
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '14',
                                fontWeight: 'normal'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: this.chartData.data
                    }
                ]
            }
            this.myChart.setOption(option)
            window.addEventListener('resize', () => {
                if (this.myChart) {
                    this.myChart.resize()
                }
            })
        });
    }
}
</script>

<style>

</style>