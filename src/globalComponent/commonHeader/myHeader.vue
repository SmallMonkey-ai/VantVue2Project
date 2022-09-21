<template>
    <div style="width:100vw;height:100%">
        <div :class="showStyle==3?'allHeader':showStyle==2?'leftHeader':'rightHeader'">
            <div class="time" v-if="showStyle > 1">
                <span @click="showTimePopup">
                    时间：{{basicsData.time}}
                </span>
            </div>
            <div class="department" v-if="showStyle == 3|| showStyle == 1">
                <span @click="showDepartmentPopup">
                    范围：{{basicsData.department[0]}}{{basicsData.department[1]}}{{basicsData.department[2]}}
                </span>
            </div>
        </div>
        <div v-if="timeFormatter=='year'">
            <van-popup v-model="showTime" position='bottom' :style="{ height: '30%',width:'100vw '}">
                <van-picker type="year" title="选择年" show-toolbar :columns='yearColumns' :default-index='2'
                    @confirm='yearConfirm' @cancel='timeCancel' />
            </van-popup>
        </div>
        <div v-else-if="timeFormatter=='year-month'">
            <van-popup v-model="showTime" position='bottom' :style="{ height: '30%',width:'100vw '}">
                <van-datetime-picker v-model="currentDate" type="year-month" title="选择年月" :min-date="minDate"
                    :max-date="maxDate" :formatter="formatter" @cancel='timeCancel' @confirm='monthConfirm' />
            </van-popup>
        </div>
        <div v-else-if="timeFormatter=='year-month-day'">
            <van-popup v-model="showTime" position='bottom' :style="{ height: '60%',width:'100vw '}">
                <van-datetime-picker v-model="currentDate" type="date" title="修改日期" cancel-button-text='设为上月末'
                    confirm-button-text='确定选择' :min-date="minDate" visible-item-count="4" @cancel='chooseEndMonth'
                    @confirm='timeConfirm' :max-date="maxDate" />
                <van-datetime-picker v-model="currentTime" type="time" title="修改时间" :min-hour="0" :max-hour="23"
                    cancel-button-text='昨日23:59' confirm-button-text='设为最新' :filter="filter" @cancel='chooseTime'
                    @confirm='chooseCurrentTime' />
            </van-popup>
        </div>
        <div>
            <van-popup v-model="showDepartment" position="bottom" :style="{  height: '30%',width:'100vw' }">
                <van-picker show-toolbar :columns="orgData" title="选择组织" @cancel="departmentCancel"
                    @confirm="departmentConfirm" value-key="text" @change=changeDepartment ref="chooseDepartment" />
            </van-popup>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Popup, DatetimePicker } from 'vant';
Vue.use(Popup).use(DatetimePicker);
import OrgJson from "@/assets/json/org.json";
var dayjs = require('dayjs')
export default {
    name: "myHeader",
    components: {},
    props: {
        basicsData: {
            type: Object,
        },
    },
    data() {
        return {
            showTime: false,
            showDepartment: false,
            yearColumns: [],
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2025, 10, 1),
            currentDate: new Date(),
            currentTime: '',
            orgData: [],
        }
    },
    methods: {
        // 打开时间相关弹窗
        showTimePopup() {
            this.showTime = true
        },
        // 确认年份选择弹窗
        yearConfirm(value) {
            this.$emit('change', `${value}`)
            this.showTime = false
        },
        // 确认月份选择弹窗
        monthConfirm(value) {
            let time = dayjs(value).format('YYYY-MM')
            this.$emit('changeTime', time)
            this.showTime = false
        },
        // 确认完整时间选择弹窗
        timeConfirm(value) {
            let time = dayjs(value).format('YYYY-MM-DD')
            this.$emit('changeTime', `${time} ${this.currentTime}`)
            this.showTime = false
        },
        // 关闭时间相关弹窗
        timeCancel() {
            this.showTime = false
        },
        // 实现自定义时间间隔
        filter(type, options) {
            if (type === "minute") {
                return options.filter(option => option % 10 === 0 || option == 59);
            }
            return options;
        },
        // 选择月末
        chooseEndMonth() {
            let currentDate = new Date()
            let currentYear = currentDate.getFullYear()
            let currentMonth = currentDate.getMonth()
            let endMonth = new Date(currentYear, currentMonth, 0).getDate()
            this.currentDate = new Date(currentYear, currentMonth-1, endMonth)
            this.currentTime = '00:00'
        },
        // 设置昨日最后时刻
        chooseTime() {
            this.currentDate = dayjs().subtract(1, 'day').$d
            this.currentTime = '23:59'
        },
        // 选择当前时间
        chooseCurrentTime() {
            let currentDate = new Date()
            let currentHours = currentDate.getHours()
            let currentMinutes = currentDate.getMinutes()
            if (currentMinutes != 59) {
                currentMinutes = parseInt(currentMinutes / 10) * 10
            }
            let currentTime = `${currentHours}:${currentMinutes}`
            this.currentDate = currentDate
            this.currentTime = currentTime
        },
        // 打开部门选择弹窗
        showDepartmentPopup() {
            this.showDepartment = true
            this.$nextTick(() => {
                this.$refs.chooseDepartment.setValues(this.basicsData.department)
            })

        },
        changeDepartment(value, key) {
            console.log(value, key)
        },
        // 部门确认
        departmentConfirm(value) {
            console.log(value)
            if (value[0] == '营销中心' || value[0] == '资源管理部') {
                this.$emit('changeDepartment', value)
                this.showDepartment = false
            } else {
                if (value[1] && value[2]) {
                    this.$emit('changeDepartment', value)
                    this.showDepartment = false
                } else {
                    this.$alert('请将区或组选择完整！')
                }
            }
        },
        // 部门取消
        departmentCancel() {
            this.showDepartment = false
        }
    },
    computed: {
        timeFormatter() {
            return this.basicsData.timeFormatter
        },
        showStyle() {
            return Object.keys(this.basicsData).length
        }
    },
    created() {
        this.org = this.organization;
        this.orgData = OrgJson.data;
    },
    mounted() {
        let date = new Date()
        this.yearColumns.push(`${date.getFullYear() - 2}年`)
        this.yearColumns.push(`${date.getFullYear() - 1}年`)
        this.yearColumns.push(`${date.getFullYear()}年`)
        this.yearColumns.push(`${date.getFullYear() + 1}年`)
        this.yearColumns.push(`${date.getFullYear() + 2}年`)
        if (date.getMinutes() != 59) {
            let minute = parseInt(date.getMinutes() / 10) * 10
            this.currentTime = `${date.getHours()}:${minute}`
        } else {
            this.currentTime = `${date.getHours()}:${date.getMinutes()}`
        }

    },
}
</script>

<style scoped lang="scss">
.allHeader {
    height: 1.5rem;
    width: 100vw;
    padding: 0 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    div {
        span {
            font-size: 16px;
            color: #204791;
            border-bottom: 1px solid #204791;
        }
    }
}

.leftHeader {
    height: 3rem;
    width: 100vw;
    padding: 0 1rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    div {
        span {
            color: #204791;
            border-bottom: 1px solid #204791;
        }
    }
}

.rightHeader {
    height: 3rem;
    width: 100vw;
    padding: 0 1rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    div {
        span {
            color: #204791;
            border-bottom: 1px solid #204791;
        }
    }
}

::v-deep .van-picker__cancel {
    color: #576b95 !important;
}

.van-popup {
    overflow: hidden;
}
</style>
