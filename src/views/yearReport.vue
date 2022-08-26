<template>
    <div>
        <yearReportItem v-model='message'/>
    </div>
</template>
<script>
import yearReportItem from '../components/yearReport/yearReportItem';

export default {
    name: "yearReport",
    components: { yearReportItem },
    data() {
        return {
            message:'hello'
        }
    },
    methods: {},
    mounted() {
        // console.log(this.message)
     },
}
</script>

<style scoped lang="scss">
</style>
