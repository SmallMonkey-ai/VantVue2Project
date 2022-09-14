import Vue from "vue";
const requireComponent = require.context(
    "./", //组件目录的相对路径
    true, //是否查询其子目录
    /\.vue$/ //匹配基础组件文件名的正则表达式
);
requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName); //获取组件配置
    Vue.component(
        componentConfig.default.name, //此处的name，是组件中定义的name属性
        componentConfig.default //如果这个组件选是通过 `export default` 导出的，那么会优先使用 `.default`，否则回退到使用模块的根
    );
});