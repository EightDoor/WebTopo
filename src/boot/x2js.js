import X2JS from 'x2js' // xml数据处理插件

// "async" is optional
export default async ({ /* app, router, Vue, ... */ Vue }) => {
  Vue.prototype.$x2js = new X2JS() // 创建x2js对象，挂到vue原型上
}
