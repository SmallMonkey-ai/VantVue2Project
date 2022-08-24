<template>
    <div>年报组件
        <chart id="pieChart2" :options="option" />
        <chart id="pieChart3" :options="option" />
    </div>
</template>

<script>
import chart from '../chart'
export default {
    name: "yearReportItem",
    components: { chart },
    data() {
        return {
            chartData: [],
            option: {}
        }
    },
    methods: {
        getDataTest() {
            this.chartData = [
                { value: 1048, name: 'BYD' },
                { value: 500, name: '问界' },
                { value: 200, name: '蔚来' }
            ]
            this.option = {
                title: {
                    text: '车辆型号分布(辆)',
                    left: '24px',
                    top: '24px',
                    textStyle: {
                        fontSize: '14px',
                        fontFamily: 'PingFangSC-Medium',
                        fontWeight: '500',
                        color: '#262626'
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    right: '15%',
                    icon: 'circle',
                    top: '50%',
                    itemWidth: 10,
                    itemHeight: 10
                },
                color: ['#2C68FF', '#3DA8FF', '#27D1D0 '],
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['35%', '55%'],
                        // 饼图位置参数
                        center: ['40%', '60%'],
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
                                console.log(item)
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
                        data: this.chartData
                    }
                ]
            }
        }
    },
    created() {
        this.getDataTest()
    },
    mounted() {
    },
}
</script>

<style scoped lang="scss">
</style>
