<template>
  <div :id="id" ref="app-secondary" class="app-secondary timeline_card_two">
    <template v-if="timeLineData.length != 0">
      <div class="template" v-for="(x, i) in timeLineData" :key="i">
        <Timeline :class="{ frist_timeline: i == 0 }">
          <TimelineItem v-for="(date, index ) in x" :key="index">
            <!-- <template #dot>
                                                              <div :style="{ width: '100%', height: '100%', background: colorList[i] }"></div>
                                                              <Icon type="ios-trophy"></Icon>
                                                            </template> -->
            <div class="tiemline_card" @click="handleOpneUrl(date)">
              <div class="time_date_detailed">
                <div class="time_date_month">{{ date.month }}</div>
                <div class="time_date_day">{{ date.day }}</div>
              </div>
              <div class="time_img"><img :src="date.publish_image" alt="" width="100%" height="100%" srcset=""></div>
              <div class="time_title" v-html='date.title'></div>
            </div>
          </TimelineItem>
        </Timeline>
        <div class="text_test" v-if="timeLineData?.[i + 1]">{{ timeLineData?.[i + 1][0].year }}年</div>

      </div>
    </template>
    <template v-else>
      <div class="empty_two">
        无发布活动记录
      </div>
    </template>

  </div>
</template>

<script>
// import Vue from "vue"
const Vue = window.Vue
import { TimelineItem, Timeline } from 'view-design';
import 'view-design/dist/styles/iview.css';
import { queryAssetById, userQuery, queryTimeline } from "../../api/asset";
import { translatePlatformDataToJsonArray } from '../../utils/handleData'
import moment from "moment";
// Vue.prototype.moment = moment
window?.Vue?.component('Timeline', Timeline);
window?.Vue?.component('TimelineItem', TimelineItem);
const mockData = [
  { creat_time: '2022-03-22', picture: '[{"uid":"rc-upload-1676013318689-3","name":"a86afaa4-1fce-4bac-b8ce-b948e2e475b8.png","url":"/storage_area/form/1234567890/45ee97adfa884a329a3d86a0d61c528a.png"}]', title: 'hdvjhasgdhasdgg' },
  { creat_time: '2021-02-22', picture: '[{"uid":"rc-upload-1676013318689-3","name":"a86afaa4-1fce-4bac-b8ce-b948e2e475b8.png","url":"/storage_area/form/1234567890/45ee97adfa884a329a3d86a0d61c528a.png"}]', title: 'hdvjhasgdhasdgg' },
  { creat_time: '2021-03-22', picture: '[{"uid":"rc-upload-1676013318689-3","name":"a86afaa4-1fce-4bac-b8ce-b948e2e475b8.png","url":"/storage_area/form/1234567890/45ee97adfa884a329a3d86a0d61c528a.png"}]', title: 'hdvjhasgdhasdgg' },
  { creat_time: '2021-01-22', picture: '[{"uid":"rc-upload-1676013318689-3","name":"a86afaa4-1fce-4bac-b8ce-b948e2e475b8.png","url":"/storage_area/form/1234567890/45ee97adfa884a329a3d86a0d61c528a.png"}]', title: 'hdvjhasgdhasdgg' },
  { creat_time: '2022-01-22', picture: '[{"uid":"rc-upload-1676013318689-3","name":"a86afaa4-1fce-4bac-b8ce-b948e2e475b8.png","url":"/storage_area/form/1234567890/45ee97adfa884a329a3d86a0d61c528a.png"}]', title: 'hdvjhasgdhasdgg' },
  { creat_time: '2023-01-22', picture: '[{"uid":"rc-upload-1676013318689-3","name":"a86afaa4-1fce-4bac-b8ce-b948e2e475b8.png","url":"/storage_area/form/1234567890/45ee97adfa884a329a3d86a0d61c528a.png"}]', title: 'hdvjhasgdhasdgg' },
  { creat_time: '2022-02-22', picture: '[{"uid":"rc-upload-1676013318689-3","name":"a86afaa4-1fce-4bac-b8ce-b948e2e475b8.png","url":"/storage_area/form/1234567890/45ee97adfa884a329a3d86a0d61c528a.png"}]', title: 'hdvjhasgdhasdgg' },
  { creat_time: '2023-03-22', picture: '[{"uid":"rc-upload-1676013318689-3","name":"a86afaa4-1fce-4bac-b8ce-b948e2e475b8.png","url":"/storage_area/form/1234567890/45ee97adfa884a329a3d86a0d61c528a.png"}]', title: 'hdvjhasgdhasdgg' },
  { creat_time: '2023-02-22', picture: '[{"uid":"rc-upload-1676013318689-3","name":"a86afaa4-1fce-4bac-b8ce-b948e2e475b8.png","url":"/storage_area/form/1234567890/45ee97adfa884a329a3d86a0d61c528a.png"}]', title: 'hdvjhasgdhasdgg' },
]
const month = [
  '一月', '二月', '三月',
  '四月', '五月', '六月',
  '七月', '八月', '九月',
  '十月', '十一月', '十二月',
]
const colorList = ['#3296FA', '#0FCBC5', '#FF9966', '#99CCCC', '#CCCCFF']
export default {
  name: "Main",
  props: {
    customConfig: Object,
    info: Object,
    //应用变量和系统变量 2022.7.26 V8R4C50SPC220需求新加 之前版本取不到appVariables和sysVariables
    appVariables: Array,
    sysVariables: Array,
    //2022.8.11 V8R4C60SPC100需求新加，之前版本取不到themeInfo
    themeInfo: Object,
    //2022.10新加，之前取不到国际化方法
    intlGetKey: Function,
    history: Object,
    mainInit: Function
  },
  computed: {},
  data() {
    return {
      //必需，不可删除
      id: "",
      timeLineData: [],
      assetid: this.customConfig?.assetid || 'bec9f122-afd7-08ec-42ec-165d700a1f73',
      colorList
    };
  },
  mounted() {
    //此方法封装了事件注册，不可删除
    this.mainInit(this);
    this.handleQueryData()
    // this.handleFilterTime()
  },
  methods: {
    //跳转网页
    handleOpneUrl(key) {
      this.history && this.history.push(`/application/mobileview/9f51c0ba-a991-addc-26a1-3b2ff9ba98ee?idType=page&wechatid=${key.data_id}`)
    },
    //数据请求
    async handleQueryData() {
      try {
        let { data } = await userQuery()
        console.log(data, '------a');
        queryTimeline({ user_id: data.id }).then(res => {
          let result = res.data
          this.handleFilterTime(result)
          // let filterData = result.filter((x) => x.publisher == data.id)
          // console.log('---->', filterData);
        })
      } catch (error) {

      }

    },
    //根据时间过滤
    handleFilterTime(mockData) {
      mockData.sort((a, b) => {
        return new Date(b.creat_time).getTime() - new Date(a.creat_time).getTime()
      })
      let referenceVar = new Date(mockData[0].creat_time).getFullYear()
      let timeLineData = []
      let lineDataItem = []
      mockData.forEach((x, i) => {
        console.log(referenceVar);
        if (referenceVar == new Date(x.creat_time).getFullYear()) {
          lineDataItem.push(x)
        } else {
          timeLineData.push(lineDataItem)
          lineDataItem = []
          lineDataItem.push(x)
          referenceVar = new Date(x.creat_time).getFullYear()
        }
      })
      timeLineData.push(lineDataItem)
      timeLineData.forEach(x => {
        x.forEach(item => {
          item.year = moment(item.creat_time).format('YYYY')
          item.month = month[moment(item.creat_time).format('M') - 1]
          item.day = moment(item.creat_time).format('DD')
          item.title = item.activity_details
          let imgUrl = JSON.parse(item.picture || '[]')[0]?.url
          if (imgUrl?.includes('http')) {
            item.publish_image = imgUrl
          } else {

            item.publish_image = window?.configuration?.system_resource_access_prefix ? window?.configuration?.system_resource_access_prefix + imgUrl : imgUrl
          }
          // item.publish_image = JSON.parse(item.picture || "[]")?.[0]?.url
        })

      })
      this.timeLineData = timeLineData
      console.log('------>时间过滤', timeLineData, mockData);
    },
    /**
   * 用于触发事件的方法，window.eventCenter?.triggerEvent封装了一层，
   * @param {String} eventName 事件名
   * @param {Object} payload 事件传参
   * @example triggerEvent("click",{value:"123"})
   *
   */
    triggerEvent(eventName, payload) {
      let { componentId, appId } = this.customConfig || {};
      componentId && appId && window.eventCenter?.triggerEvent(
        componentId,
        eventName,
        payload
      );
    },
    //必需，不可删除
    Event_Center_getName() {
      return this.id;
    }
  },
  beforeDestroy() {
    window.componentCenter?.removeInstance(this.customConfig?.componentId);
  }
};
</script>
<style lang="less" scoped>
.timeline_card_two {
  background: #FAFAFC;
  padding-left: 10px;
  padding-right: 10px;

  .tiemline_card {
    // width: 83%;
    height: 86px;
    background: #FFFFFF;
    box-shadow: 0px 2px 10px 0px #F2F2F6;
    border-radius: 8px;
    display: flex;
    box-sizing: border-box;
    padding: 6px 12px 4px 19px;
    justify-content: space-around;

    .time_date_detailed {
      margin-top: 13px;

      .time_date_month {
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 21px;
      }

      .time_date_day {
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 25px;
      }
    }

    .time_img {
      width: 30%;
      height: 70px;
      border-radius: 2px;
      // border: 1px solid #333333;
    }

    .time_title {
      width: 178px;
      height: 60px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 20px;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      /* 这里是超出几行省略 */

    }
  }

  /deep/ .ivu-timeline-item-content {
    top: -43px;
  }

  /deep/.template:nth-child(odd) {
    .ivu-timeline-item-head {
      background: #3296FA;
      box-shadow: 0px 2px 3px 0px rgba(50, 150, 250, 0.32);
    }
  }

  /deep/.template:nth-child(even) {
    .ivu-timeline-item-head {
      background: #0FCBC5;
      box-shadow: 0px 2px 3px 0px rgba(15, 203, 197, 0.2);
    }
  }

  /deep/ .ivu-timeline-item-head-blue {
    border-color: #fff;
    color: #fff;
    border-width: 2px solid;
  }

  .text_test {
    position: relative;
    top: -49px;
    // height: 30px;
    font-size: 22px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 800;
    color: #333333;
    line-height: 30px;
    padding: 10px 0;

    &::after {
      content: '';
      height: 55px;
      border-left: 1px solid #e8eaec;
      position: absolute;
      top: 44px;
      left: 6px;
    }

    &::before {
      content: '';
      height: 50px;
      border-left: 1px solid #e8eaec;
      position: absolute;
      top: -47px;
      left: 6px;
    }
  }

  .empty_two {
    color: #F2F2F6;
    text-align: center;
  }

  .frist_timeline {
    padding-top: 56px;
  }
}

@media (max-width: 420px) {
  .time_img {
    width: 70px !important;
  }

  // /deep/.tiemline_card {
  //   width: 335px !important;
  // }
}

@media (max-width: 500px) {
  .time_img {
    width: 25% !important;
  }

  // /deep/.tiemline_card {
  //   width: 90% !important;
  // }
}
</style>