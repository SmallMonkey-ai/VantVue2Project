<template>
    <div>
        <button ref="copyButton" :data-clipboard-text="copyNumber">复制数据</button>
    </div>
</template>

<script>
import Clipboard from 'clipboard';
export default {
    name: "copyData",
    components: {},
    props: {
        clipBoardData: {
            type: Object,
            require: true,
        }
    },
    data() {
        return {

        }
    },
    methods: {
        initClipboard() {
            const clipboard = new Clipboard(this.$refs.copyButton);
            clipboard.on('success',
                () => {
                    this.$alert('复制成功')
                });
            clipboard.on('error',
                (e) => {
                    console.log('复制失败，请再次尝试', e)
                });
        }
    },
    mounted() {
        this.initClipboard()
    },
    computed: {
        copyNumber() {
            let titleName = this.clipBoardData.xData.reduce((value, item) => {
                return `${value}${item}\t`
            }, '')
            let data1 = this.clipBoardData.yData.reduce((value, item) => {
                return `${value}${item}\t`
            }, '')
            let data2 = ''
            if (this.clipBoardData.yData1) {
                data2 = this.clipBoardData.yData1.reduce((value, item) => {
                    return `${value}${item}\t`
                }, '')
            }
            let data3 = ''
            if (this.clipBoardData.yData2) {
                data3 = this.clipBoardData.yData2.reduce((value, item) => {
                    return `${value}${item}\t`
                }, '')
            }
            return `${titleName}\n${data1}\n${data2}\n${data3}`
        }
    }
}
</script>

<style scoped lang="scss">
button {
    font-size: 14px;
}
</style>
