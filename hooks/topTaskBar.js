      import {reactive,toRefs } from 'vue'
      // 1. 模块切换
        const moduleSwiper = reactive({
          moduleCurrent: 0,
        })
      // 2. 顶部样式栏状态切换
      const topStyle = reactive({
        topActive: 0,
      })
      const clickBar = function(index) {
        moduleSwiper.moduleCurrent = index
      }
      const changeTopStyle = function(e) {
        moduleSwiper.moduleCurrent = e.detail.current;
        topStyle.topActive = e.detail.current
      }
      export {topStyle,moduleSwiper,clickBar, changeTopStyle}