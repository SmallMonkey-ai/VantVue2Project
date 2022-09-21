<template>
    <div class="main" :style="style" ref="content">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BetterScroll from 'better-scroll'
export default {
    name: "myScroll",
    props: {
        size: {
            type: Object,
            default: function () {
                return {
                    height: '10rem',
                    width: '100vw'
                }
            }
        },
        Configuration: {
            type: Object,
            default: function () {
                return {
                }
            }
        }
    },
    components: {},
    data() {
        return {
            scroll: null,
        }
    },
    methods: {},
    computed: {
        style() {
            return {
                height: this.size.height,
                width: this.size.width
            }
        }
    },
    mounted() {
        console.log(this.$refs.content.offsetHeight)
        this.$nextTick(() => {
            let scrollDom = this.$refs.content;
            this.scroll = new BetterScroll(scrollDom, {
                observeDOM: true, //开启侦测Dom变化  当dom发生变化,从新计算可滑动高度
                // pullUpLoad: true, //开启上拉加载
            })
            //监听上拉加载事件
            // this.scroll.on("pullingUp", this.add);
        })
    },
}
</script>

<style scoped lang="scss">
.main {
    overflow: hidden;
}
</style>
