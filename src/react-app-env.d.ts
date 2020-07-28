/// <reference types="react-scripts" />

//解决模块化引入less报错问题
declare module "*.less" {
    const less: any;
    export default less;
}