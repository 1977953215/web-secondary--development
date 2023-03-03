<template>
  <div :id="id" ref="app-secondary" class="app-secondary app-secondary_xue">
    <div class="bm_distribution">
      <div class="bm_distribution_head">
        <div class="title_zhu">江苏各组织分布情况</div>
        <div class="title_fu">数据来源于江苏妇幼官方公示信息</div>
      </div>
      <div :class="{ bm_distribution_body: true, putAwayX: !putAway }" ref="putAwayX">
        <div class="template">
          <div class="one_template bm_flex">
            <div class="template1 templatePublic">
              <div class="template_title">{{ analysisData[0]?.key }}</div>
              <div class="template_value">{{ analysisData[0]?.value }} </div>
            </div>
            <div class="three_template">
              <div class="template2 templatePublic">
                <div class="template_title">{{ analysisData[1]?.key }}</div>
                <div class="template_value">{{ analysisData[1]?.value }} </div>
              </div>
              <div class="four_template bm_flex">
                <div class="template3  templatePublic ">
                  <div class="template_title">{{ analysisData[2]?.key }}</div>
                  <div class="template_value">{{ analysisData[2]?.value }} </div>
                </div>
                <div class="template4 templatePublic">
                  <div class="template_title">{{ analysisData[3]?.key }}</div>
                  <div class="template_value">{{ analysisData[3]?.value }} </div>
                </div>
              </div>
            </div>
          </div>
          <div class="two_template bm_flex">
            <div class="kk_template bm_flex">
              <div class="template5  templatePublic">
                <div class="template_title">{{ analysisData[4]?.key }}</div>
                <div class="template_value">{{ analysisData[4]?.value }} </div>
              </div>
              <div class="template6  templatePublic">
                <div class="template_title">{{ analysisData[5]?.key }}</div>
                <div class="template_value">{{ analysisData[5]?.value }} </div>
              </div>
            </div>

            <div class="seven_template">
              <div class="five_template bm_flex">
                <div class="template7  templatePublic">
                  <div class="template_title">{{ analysisData[6]?.key }}</div>
                  <div class="template_value">{{ analysisData[6]?.value }} </div>
                </div>
                <div class="template8 templatePublic">
                  <div class="template_title">{{ analysisData[7]?.key }}</div>
                  <div class="template_value">{{ analysisData[7]?.value }} </div>
                </div>
              </div>
              <div class="six_template bm_flex">
                <div class="template9 templatePublic">
                  <div class="template_title">{{ analysisData[8]?.key }}</div>
                  <div class="template_value">{{ analysisData[8]?.value }} </div>
                </div>
                <div class="template10 templatePublic">
                  <div class="templateTest">
                    <div class="template_title">{{ analysisData[9]?.key }}</div>
                    <div class="template_value">{{ analysisData[9]?.value }} </div>
                  </div>

                </div>
                <div class="template11 templatePublic">
                  <div class="template_title">{{ analysisData[10]?.key }}</div>
                  <div class="template_value">{{ analysisData[10]?.value }} </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bm_distribution_fenge">
        <span @click="putAwayFn"> {{ putAway ? "展开" : "收起" }} <i
            :class='putAway ? "el-icon-arrow-down" : "el-icon-arrow-up"'></i></span>
      </div>
      <div class="bm_distribution_footer">
        <div class="footer_title_zhu">
          <div class="footer_tip">
            <div> 温馨提示</div>
          </div>
          <div class="title">
            公示组织实时变更，组织信息维护可能存在延时，请在前往组织前拨打电话进行确认
          </div>
        </div>
        <div class="footer_title_fu">如出现电话无法拨通的情况，建议前往组织官方平台咨询确认后再前往</div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryOffecid, userQuery } from '../../api/asset'
const sortArr = ["妇联组织",
  "妇女儿童之家",
  "婚姻家庭纠纷调解室",
  "妇女微家",
  "巾帼志愿者服务队",
  "女性社会组织",
  "母婴室",
  "妇女儿童活动中心",
  "三八红旗手工作室",
  "女性创业孵化中心",
  "直属单位"]
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
  computed: {
    conSortData() {
      let data = this.customConfig.sorData ? this.customConfig?.sorData?.split(',') : []
      data = data.length == 11 ? data : sortArr
      return data
    }
  },
  data() {
    return {
      //必需，不可删除
      id: "",
      putAway: true,
      assetId: this.customConfig?.assetId || '2444bc80-ee32-4f9b-8df7-08b55ba7a568',
      analysisData: []
    };
  },
  async mounted() {
    //此方法封装了事件注册，不可删除
    this.mainInit(this);
    try {
      let res = await userQuery(res.data.id)
      this.filterData(res.data.id)
    } catch (error) {
      this.filterData()
    }

  },
  methods: {
    //过滤数据
    filterData(user_id = 1234567890) {
      queryOffecid({ user_id }).then(res => {
        let arrData = res.data
        let ArrData = []
        arrData.forEach(x => {
          ArrData.push({ key: x.organization_type_name, value: x.associated_number })
        })

        // for (const key in tempData) {
        //   ArrData.push({ key: key, value: tempData[key] })
        // }
        let sortData = []
        this.conSortData.forEach(item => {
          ArrData.forEach(x => {
            if (x.key === item) sortData.push(x)
          })
        })
        // this.analysisData = ArrData
        this.analysisData = sortData
        // console.log(sortData, '=======>sort');
      }).catch(err => {

      })
    },
    //收起展开
    putAwayFn() {
      this.putAway = !this.putAway
      //  console.log(this.$refs.putAwayX);   
    },
    /**
     * 封装的触发事件方法 必需，不可删除
     * @param {String} eventName 事件名
     * @param {Object} payload 事件传参
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
.app-secondary_xue {
  padding: 0 15px 0 15px;

  .bm_distribution {
    // border: 1px solid black;
    background: #fff;
    padding: 14px 16px 15px 16px;
    box-shadow: 0px 2px 10px 0px #F2F2F6;
    border-radius: 8px;

    .bm_distribution_head {
      padding-bottom: 12px;

      .title_zhu {
        // width: 162px;
        height: 25px;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 25px;
      }

      .title_fu {
        // width: 180px;
        height: 17px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 17px;
      }
    }

    .bm_distribution_body {
      // height: 242px;
      height: 161px;
      overflow: hidden;
      // background-color: #999999;

      .template {
        height: 100%;

        .templatePublic {
          height: 100%;
          border-radius: 5px;
          box-sizing: border-box;
          padding: 4%;
          font-size: 18px;
          line-height: 1;
          color: white;
          text-shadow: 1px 1px 1px rgba(0, 0, 0, .2);

          .template_value {
            font-weight: 800;
            margin-top: 5px;
          }
        }

        .bm_flex {
          display: flex;
        }

        .one_template {
          // height: 68%;
          height: 164.547px;
        }

        .two_template {
          // height: 31.5%;
          height: 76.2188px;
          margin-top: 0.2%
        }

        .three_template {
          width: 54%;
        }

        .four_template {
          height: 48%;
          margin-top: 2%;

          .templatePublic {
            width: 49%;
            // background: blue;
            font-size: 12px;
          }

          .template3 {
            margin-right: 2%;
            width: 60%;
          }

          .template4 {
            width: 38%;
            white-space: nowrap;
          }


        }

        .five_template {
          height: 48%;
          margin-bottom: 2%;

          .templatePublic {
            width: 49%;
            // background: #fffd19;
            font-size: 10px;
            padding: 2%;
          }
        }

        .six_template {
          height: 48%;

          .templatePublic {
            font-size: 9px;
            // padding: 1%;
            padding: 2%;

            .template_title {
              transform: scale(0.80);
              transform-origin: 0 0;
            }

            .template_value {
              transform: scale(0.80);
              transform-origin: 0 0;
            }

          }
        }

        .seven_template {
          height: 100%;
          flex: 1;
        }

        .kk_template {
          width: 40%;

          .templatePublic {
            font-size: 11px;
          }
        }

        .template1 {
          background: url('../../api/image/1妇联组织.png');
          width: 45%;
          margin-right: 4px;
          height: 98%;
        }

        .template2 {
          height: 48%;
          // background: black;
          background: url('../../api/image/2妇女儿童之家.png');
        }

        .template3 {
          // background: #46af91;
          background: url('../../api/image/3婚姻家庭纠纷调解室.png');
        }

        .template4 {
          background: url('../../api/image/4妇女微家.png');
        }

        .template5 {
          width: 48%;
          background: url('../../api/image/5巾帼志愿者服务队.png');
          margin-right: 2%;
        }

        .template6 {
          width: 48%;
          margin-right: 2%;
          background: url('../../api/image/6女性社会组织.png');
        }

        .template7 {
          margin-right: 2%;
          background: url('../../api/image/7母婴室.png');
        }

        .template8 {
          white-space: nowrap;
          background: url('../../api/image/8妇女儿童活动中心.png');
        }

        .template9 {
          width: 43% !important;
          white-space: nowrap;
          // background: #6cb5fe !important;
          background: url('../../api/image/9三八红旗手工作室.png');
          margin-right: 2%;
        }

        .template10 {
          width: 34% !important;

          // display: flex;
          .templateTest {

            height: calc(100% - 10px);
          }

          // .template_title {
          //   max-width: 75%;
          //   min-width: 60%;
          //   // flex: 1;
          // }
          .template_value {
            margin-top: -1px;
          }

          // .template_value {
          //   min-width: 10%;
          //   max-width: 40%;
          //   margin-left: -18%;
          //   align-self: flex-end;
          //   margin-top: -1px;
          // }

          background: url('../../api/image/10女性创业孵化中心.png');
          margin-right: 2%;
        }

        .template11 {
          width: 23% !important;
          white-space: nowrap;
          // background: #6cb5fe !important;
          background: url('../../api/image/11直属单位.png');
        }

        .templatePublic {
          background-size: cover;
        }
      }
    }

    .putAwayX {
      height: 242px;
    }

    .bm_distribution_fenge {
      padding-top: 10px;
      text-align: center;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 17px;
    }

    .bm_distribution_fenge::after {
      display: block;
      content: '';
      margin-top: 10px;
      border-bottom: 1px solid #F0F0F0;
      transform: scaleY(.5);
    }

    .bm_distribution_footer {
      padding-top: 14px;

      .footer_title_zhu {
        display: flex;

        .footer_tip {
          width: 37px;
          height: 37px;
          background: rgba(224, 79, 114, .1);
          color: #E04F72;
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;

          div {
            width: 30px;
            font-weight: 800;
            font-style: italic;
            font-size: 14px;
            font-family: YouSheBiaoTiHei;
            color: #E04F72;
            line-height: 16px;
          }

        }

        .title {
          margin-left: 9px;
          // width: 90px;
          flex: 1;
          height: 34px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 17px;
        }
      }

      .footer_title_fu {
        margin-top: 7px;
        // width: 310px;
        height: 14px;
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 14px;
        // white-space: nowrap;
        // transform: scale(0.83333);
        // transform-origin: 0 0;
      }
    }
  }

}


// @media (max-width: 442px) {
//   .template10 {
//     .template_title {
//       max-width: 90% !important;
//     }
//   }

// }

// @media (min-width: 443px) {
//   .six_template {

//     .templatePublic {
//       font-size: 9px;
//       padding: 2% 0 0 3% !important;

//       .template_title {
//         transform: scale(0.9) !important;
//         transform-origin: 0 0;
//       }

//       .template_value {
//         transform: scale(0.9) !important;
//         transform-origin: 0 0;
//       }

//     }
//   }

//   .template10 {
//     .template_value {
//       margin-top: 11px !important;
//       margin-left: -8% !important;
//     }
//   }
// }

// @media (min-width: 476px) {
//   .six_template {

//     .templatePublic {
//       font-size: 9px;
//       padding: 3% 0 0 4% !important;

//       .template_title {
//         transform: scale(0.9) !important;
//         transform-origin: 0 0;
//       }

//       .template_value {
//         transform: scale(0.9) !important;
//         transform-origin: 0 0;
//       }

//     }
//   }

//   .template10 {
//     .template_value {
//       margin-top: 11px !important;
//       margin-left: -8% !important;
//     }
//   }
// }

// @media (min-width: 528px) {
//   .template10 {
//     .templateTest{
//         display:block;
//     }
//   }
// }
</style>
