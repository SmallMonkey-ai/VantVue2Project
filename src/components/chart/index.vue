<template>
    <div :id='id' :style="style"></div>
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
            default: '20.1rem'
        },
        id: {
            type: String,
            default: 'main'
        },
        options: {
            type: Object,
            default: null
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
            this.myChart = this.$echarts.init(document.getElementById(this.id))
            // 绘制图表
            this.myChart.setOption(this.options)
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