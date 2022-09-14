<template>
    <div>
        <pieChart :chartData=chartData />
        <barChart :chartData=barChartData />
        <lineChart :chartData=lineChartData />
    </div>
</template>

<script>
import pieChart from '../chart/pieChart'
import lineChart from '../chart/lineChart'
import barChart from '../chart/barChart'
export default {
    name: "yearReportItem",
    components: { pieChart, barChart, lineChart },
    data() {
        return {
            chartData: {},
            option: {},
            lineChartData: {},
            barChartData: {}
        }
    },
    methods: {
        getDataTest() {
            // 饼图
            this.chartData = {
                data: [
                    { value: 1048, name: 'BYD1' },
                    { value: 500, name: '问界1' },
                    { value: 200, name: '蔚来1' },
                    { value: 1048, name: 'BYD2' },
                    { value: 500, name: '问界2' },
                    { value: 200, name: '蔚来2' },
                    { value: 1048, name: 'BYD3' },
                    { value: 500, name: '问界3' },
                ],
                title: '标题',
                colorList: ['#2C68FF', '#3DA8FF', '#27D1D0 ', '#2C68FF', '#3DA8FF', '#27D1D0 ', '#2C68FF', '#3DA8FF', '#27D1D0 '],
                config: {
                }
            },
                // 折线图
                this.lineChartData = {
                    // 数据
                    xData: ['12', '13', '14', '15', '16', '17', '18'],
                    yData1: [64, 159, 112, 86, 151, 131, 118],
                    yData2: [124, 30, 77, 97, 67, 75, 70],
                    // 图标名称
                    title: '标题',
                    colorList: ["#F58080", "#47D8BE"], //线条颜色
                    // 配置项
                    config: {
                        yName: ['线条1名称', '线条2名称'],
                        xUnit: '日',//x轴单位
                        yUnit: '个',//y轴单位
                        xFullDisplay: false,//默认false 当为true时表示x轴全显示，无省略
                        yTopValue: true,//默认false 当为true时表示柱状图上方有数据
                    }
                },
                // 柱状图
                this.barChartData = {
                    // 数据
                    xData: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
                    yData1: [64, 159, 112, 86, 151, 131, 118],
                    yData2: [124, 30, 77, 97, 67, 75, 70],
                    // 图标名称
                    title: '标题',
                    colorList: ["#F58080", "#47D8BE"], //柱子颜色
                    // 配置项
                    config: {
                        yName: ['线条1名称', '线条2名称'],
                        xUnit: '日',//x轴单位
                        yUnit: '个',//y轴单位
                        xFullDisplay: false,//默认false 当为true时表示x轴全显示，无省略
                        yTopValue: true,//默认false 当为true时表示柱状图上方有数据
                    }
                }
        }
    },
    created() {
        this.getDataTest()
    },
    watch: {
    },
    mounted() {
    }
}
</script>

<style scoped lang="scss">

</style>
