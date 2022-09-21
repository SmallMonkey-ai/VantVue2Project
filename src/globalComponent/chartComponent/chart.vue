<template>
    <div>
        <div v-if="chartContent.chartType == 'bar'" class="commonStyle" :style="style">
            <div class="cardTitle"
                :class="showStyle==4?'flexBetween':showStyle==3?'flexStart':showStyle==2?'flexEnd':''">
                <span v-if="chartContent.titleData.title">{{chartContent.titleData.title}} 总量：{{countData}} </span>
                <copyData :clipBoardData=chartContent.chartData v-if='chartContent.titleData.openClipboard' />
            </div>
            <div class="cardMain">
                <barChart :chartData=chartContent.chartData :size=chartContent.size />
            </div>
        </div>
        <div v-else-if="chartContent.chartType == 'pie'" class="commonStyle" :style="style">
            <div class="cardTitle"
                :class="showStyle==4?'flexBetween':showStyle==3?'flexStart':showStyle==2?'flexEnd':''">
                <span v-if="chartContent.titleData.title">{{chartContent.titleData.title}}总量：{{countData}}</span>
                <copyData :clipBoardData=chartContent.chartData v-if='chartContent.titleData.openClipboard' />
            </div>
            <pieChart :chartData='chartContent.chartData' :size=chartContent.size />
        </div>
        <div v-else-if="chartContent.chartType == 'line'" class="commonStyle" :style="style">
            <div class="cardTitle"
                :class="showStyle==4?'flexBetween':showStyle==3?'flexStart':showStyle==2?'flexEnd':''">
                <span v-if="chartContent.titleData.title">{{chartContent.titleData.title}}总量：{{countData}}</span>
                <copyData :clipBoardData=chartContent.chartData v-if='chartContent.titleData.openClipboard' />
            </div>
            <lineChart :chartData=chartContent.chartData :size=chartContent.size />
        </div>
        <div v-else-if="chartContent.chartType == 'lineAndBar'" class="commonStyle" :style="style">
            <div class="cardTitle"
                :class="showStyle==4?'flexBetween':showStyle==3?'flexStart':showStyle==2?'flexEnd':''">
                <span v-if="chartContent.titleData.title">{{chartContent.titleData.title}}总量：{{countData}}</span>
                <copyData :clipBoardData=chartContent.chartData v-if='chartContent.titleData.openClipboard' />
            </div>
            <lineAndBarChart :chartData=chartContent.chartData :size=chartContent.size
                @openLowerLever='openLowerLever' />
        </div>
        <div v-else class="commonStyle" :style="style">
            <div class="cardTitle"
                :class="showStyle==4?'flexBetween':showStyle==3?'flexStart':showStyle==2?'flexEnd':''">
                <span v-if="chartContent.titleData.title">{{chartContent.titleData.title}}总量：{{countData}}</span>
                <copyData :clipBoardData=chartContent.chartData v-if='chartContent.titleData.openClipboard' />
            </div>
            <transBarChart :chartData=chartContent.chartData :size=chartContent.size></transBarChart>
        </div>
    </div>
</template>

<script>
import pieChart from '../../components/chart/pieChart'
import lineChart from '../../components/chart/lineChart'
import barChart from '../../components/chart/barChart'
import lineAndBarChart from '../../components/chart/lineAndBarChart'
import transBarChart from '../../components/chart/transBarChart'
export default {
    name: "chart",
    components: { pieChart, lineChart, barChart, lineAndBarChart, transBarChart },
    props: {
        chartContent: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
        }
    },
    methods: {
        openLowerLever(value) {
            console.log('打开下一层', value)
        }
    },
    computed: {
        currentData() {
            return this.chartContent.chartData.yData || this.chartContent.chartData.data || this.chartContent.chartData.yData1
        },
        showStyle() {
            if (this.chartContent.titleData.title && this.chartContent.titleData.openClipboard) {
                return 4
            } else if (this.chartContent.titleData.title && !this.chartContent.titleData.openClipboard) {
                return 3
            } else if (!this.chartContent.titleData.title && this.chartContent.titleData.openClipboard) {
                return 2
            } else {
                return 1
            }
        },
        style() {
            if (this.showStyle != 1) {
                return {
                    height: this.chartContent.size.height + 2 + 'rem',
                    width: this.chartContent.size.width,
                }
            } else {
                return {
                    height: this.chartContent.size.height + 'rem',
                    width: this.chartContent.size.width,
                }
            }
        },
        countData() {
            return this.currentData.reduce((result, item) => result + item)
        }

    },
    created() {

    },
    mounted() { }

}
</script>

<style scoped lang="scss">
.commonStyle {
    margin-bottom: 1.5rem;
    border: 0.5px solid #D9D9D9;
    padding: 4px;

    .cardTitle {
        display: flex;
        padding: 0 10px;
        flex-direction: row;
        align-items: center;
        font-size: 14px;
    }

    .flexBetween {
        justify-content: space-between;
    }

    .flexStart {
        justify-content: flex-start;
    }

    .flexEnd {
        justify-content: flex-end;
    }
}
</style>
