<template>
    <div class="body">
        <managementItem v-model='message' />
    </div>
</template>
<script>
import managementItem from '../components/management/managementItem';


export default {
    name: "yearReport",
    components: { managementItem },
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
