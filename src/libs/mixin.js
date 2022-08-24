
export default {
    methods: {
        // 跳转
        navTo(url) {
            const href = this.$route.path;
            if (url && url !== href) this.$router.push(url);
        },
        // 格式化日期
        formatDate(date) {
            const MM = date.getMonth() + 1;
            const dd = date.getDate();
            const HH = date.getHours();
            const mm = date.getMinutes();
            const ss = date.getSeconds();

            return {
                //年
                yyyy: date.getFullYear(),
                //月
                MM: MM >= 10 ? MM : '0' + MM,
                //日
                dd: dd >= 10 ? dd : '0' + dd,
                //时
                HH: HH >= 10 ? HH : '0' + HH,
                //分
                mm: mm >= 10 ? mm : '0' + mm,
                //秒
                ss: ss >= 10 ? ss : '0' + ss,
            }
        },
    },
}