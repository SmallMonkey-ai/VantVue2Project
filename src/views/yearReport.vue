<template>
    <div class="body">
        <yearReportItem v-model='message' />
    </div>
</template>
<script>
import yearReportItem from '../components/yearReport/yearReportItem';


export default {
    name: "yearReport",
    components: { yearReportItem },
    data() {
        return {
            message: 'hello'
        }
    },
    methods: {},
    mounted() {
    },
}
</script>

<style scoped lang="scss">
.body {
    width: 100vw;
}
</style>
