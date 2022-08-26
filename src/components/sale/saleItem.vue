<template>
    <div class="header">
        销售组件
        <!-- <iframe seamless frameBorder="0" scrolling="no" id="iframe" class="iframe"
            src="http://172.16.80.52:8080/superset/explore/p/LXW8YLj5mrp/?standalone=1">
        </iframe>
        <iframe seamless frameBorder="0" scrolling="no" id="iframe" class="iframe"
            src="http://172.16.80.52:8080/superset/explore/p/x2a09JO4Qrp/?standalone=1">
        </iframe> -->
    </div>
</template>

<script>
export default {
    name: "saleItem",
    components: {},
    data() {
        return {
        }
    },
    methods: {},
    mounted() {

    },
}
</script>

<style scoped lang="scss">
.header {
    width: 100vw;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .iframe {
        margin-top: 1rem;
        height: 300px;
        width: 90%;
    }
}
</style>
