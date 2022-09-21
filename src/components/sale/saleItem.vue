<template>
    <div class="header">
        <myHeader :basicsData="basicsData" @changeTime="changeTime" @changeDepartment="changeDepartment"></myHeader>
    </div>

</template>
<script>
var dayjs = require('dayjs')
export default {
    name: "saleItem",
    components: {},
    data() {
        return {
            basicsData: {
                time: dayjs(new Date()).format('YYYY-MM-DD HH:mm'),
                timeFormatter: 'year-month-day',
                department: ['一部', '一区','一组'],
            },

        }
    },
    methods: {
        changeTime(time) {
            this.basicsData.time = time
        },
        changeDepartment(department) {
            this.basicsData.department = department
        }
    },
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
}
</style>
