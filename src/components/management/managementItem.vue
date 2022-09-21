<template>
    <div>
        <chart :chartContent="chartContent"></chart>
        <chart :chartContent="chartContent1"></chart>
        <chart :chartContent="chartContent2"></chart>
        <chart :chartContent="chartContent3"></chart>
        <chart :chartContent="chartContent4"></chart>
    </div>
</template>

<script>

export default {
    name: "managementItem",
    components: {},
    data() {
        return {
            chartContent: {
                titleData: {
                    title: '外面标题',
                    openClipboard: true
                },
                chartType: 'bar',
                size: {
                    height: 12,
                    width: '95vw'
                },
                chartData: {}
            },
            chartContent1: {
                titleData: {
                    title: '',
                    openClipboard: false
                },
                chartType: 'pie',
                size: {
                    height: 11,
                    width: '50vw'
                },
                chartData: {}
            },
            chartContent2: {
                titleData: {
                    title: '外面标题',
                    openClipboard: true
                },
                chartType: 'line',
                size: {
                    height: 12,
                    width: '95vw'
                },
                chartData: {}
            },
            chartContent3: {
                titleData: {
                    title: '外面标题',
                    openClipboard: true
                },
                chartType: 'transBar',
                size: {
                    height: 12,
                    width: '95vw'
                },
                chartData: {}
            },
            chartContent4: {
                titleData: {
                    title: '外面标题',
                    openClipboard: true
                },
                chartType: 'lineAndBar',
                size: {
                    height: 12,
                    width: '95vw'
                },
                chartData: {}
            },
        }
    },
    methods: {
        getDataTest() {
            // 柱状图
            this.chartContent.chartData = {
                // 数据
                xData: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
                yData: [64, 159, 112, 86, 151, 131, 118],
                yData1: [124, 30, 77, 97, 67, 75, 70],
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
            // 饼图
            this.chartContent1.chartData = {
                xData: ['问界', '长安', 'BYD'],
                yData: [533, 542, 271],
                title: '标题长度',
                colorList: ['#2C68FF', '#3DA8FF', '#27D1D0 ', '#2C68FF', '#3DA8FF', '#27D1D0 ', '#2C68FF', '#3DA8FF', '#27D1D0 '],
                config: {
                    yUnit: '万',//y轴单位
                }
            },
                // 折线图
                this.chartContent2.chartData = {
                    // 数据
                    xData: ['12', '13', '14', '15', '16', '17', '18'],
                    yData: [64, 159, 112, 86, 151, 131, 118],
                    yData1: [124, 30, 77, 97, 67, 75, 70],
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
                // 横向折线图
                this.chartContent3.chartData = {
                    // 数据
                    xData: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
                    yData: [64, 159, 112, 127, 151, 131, 118], //折线图数据
                    // 图标名称
                    title: '标题',
                    colorList: ['#86c9f4', "#47D8BE"], //第一个是折线图颜色，第二个是柱状图颜色
                    // 配置项
                    config: {
                        yName: ['线条1名称'],
                        xUnit: '日',//x轴单位
                        yUnit: '个',//y轴单位
                        xFullDisplay: false,//默认false 当为true时表示x轴全显示，无省略
                        yTopValue: false,//默认false 当为true时表示柱状图上方有数据
                        mixinTopValue: [false, true], //默认都为false,表示柱状图和折线图同时存在时，第一个元素表示折线图上标数据，第二个为柱状图上标数据
                        createLowLeverChart: false,  //默认生成 是否生成下一级图表                  
                    }
                }
            // 折线图和柱状图
            this.chartContent4.chartData = {
                // 数据
                xData: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
                yData: [64, 159, 112, 127, 151, 131, 118],//折线图数据
                yData1: [124, 30, 77, 97, 67, 75, 70], //柱状图数据
                // 图标名称
                title: '标题',
                colorList: ["#F58080", "#47D8BE"], //第一个是折线图颜色，第二个是柱状图颜色
                // 配置项
                config: {
                    yName: ['线条1名称', '线条2名称'],
                    xUnit: '日',//x轴单位
                    yUnit: '个',//y轴单位
                    xFullDisplay: false,//默认false 当为true时表示x轴全显示，无省略
                    yTopValue: false,//默认false 当为true时表示柱状图上方有数据
                    mixinTopValue: [false, true] //默认都为false,表示柱状图和折线图同时存在时，第一个元素表示折线图上标数据，第二个为柱状图上标数据
                }
            }

        },
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
