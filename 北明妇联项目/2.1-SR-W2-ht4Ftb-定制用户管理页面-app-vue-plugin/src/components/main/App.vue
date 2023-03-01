<template>
   <div :id="id" ref="app-secondary" class="app-secondary outermost">
      <!-- 个人信息 -->
      <div class="user_box">
         <!-- 未登录状态-用户信息 -->
         <div></div>
         <!-- 登录状态-用户信息 -->
         <div class="user_info">
            <!-- 用户头像 -->
            <div class="info_head_portrait" @click="openActionSheet">
               <img :src="userPicture" alt="" />
            </div>
            <template v-if="isLogin">
               <!-- 姓名、城市 -->
               <div class="info_name_city">
                  <div class="info_name">{{ userForm.nickname }}</div>
                  <div class="info_city">{{ `${userForm.province} ${userForm.city}` }}</div>
               </div>
               <!-- 切换用户 -->
               <div class="info_change_user">
                  <img src="../../assets/个人信息-切换用户.png" alt="" @click="openPopup" />
               </div>
               <!-- 积分 -->
               <!-- <div class="info_integral">
                  <div class="integral_box">
                     <div class="integral_number">{{ userForm.integral }} 积分</div>
                  </div>
               </div> -->
               <!-- 编辑资料 -->
               <div class="info_edit_button">
                  <van-button type="primary" @click="triggerEvent('editData', {})">编辑资料</van-button>
               </div>
            </template>
            <template v-if="!isLogin">
               <div class="please_login" @click="routerLink">请登录</div>
            </template>
         </div>
         <!-- 用户菜单 -->
         <div class="user_menu">
            <div class="swiper-container">
               <div class="swiper-wrapper">
                  <!-- 菜单一 -->
                  <div class="swiper-slide">
                     <div class="menu_left">
                        <div class="menu_box" v-for="(item, index) in menuLeftList" :key="index" @click="routerLink(item)">
                           <img :src="item.picture.url" alt="" />
                           <div>{{ item.title }}</div>
                        </div>
                     </div>
                  </div>
                  <!-- 菜单二 -->
                  <div class="swiper-slide">
                     <div class="menu_left">
                        <div class="menu_box" v-for="(item, index) in menuRightList" :key="index" @click="routerLink(item)">
                           <img :src="item.picture.url" alt="" />
                           <div>{{ item.title }}</div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="swiper-pagination"></div>
            </div>
         </div>
         <!-- 切换用户 -->
         <van-popup class="user_popup" v-model="popupIsShow" position="bottom" :style="{ height: '30%' }" round>
            <van-radio-group v-model="userAccount">
               <van-cell-group>
                  <van-cell v-for="(item, index) in userAccountList" :key="index" :title="intlGetKey(item.userName)" clickable @click="userAccount = item.id">
                     <template #icon>
                        <img class="user_account" :src="item.photo" />
                     </template>
                     <template #right-icon>
                        <van-radio :name="item.id" @click="changeUser(item)" />
                     </template>
                  </van-cell>
               </van-cell-group>
            </van-radio-group>
         </van-popup>

         <!-- 退出登录 -->
         <van-action-sheet v-model="actionSheetIsShow" :actions="[{ name: '退出登录' }]" cancel-text="取消" close-on-click-action @select="loginOut" @cancel="actionSheetIsShow = false" />
      </div>
   </div>
</template>

<script>
import "./app.less";
import { getDataApi, queryMenuData, getAccountList, user, loginByUser, logout } from "../../api/asset";

// 引入swiper插件
import Swiper, { Pagination } from "swiper";
import "swiper/swiper-bundle.css";
Swiper.use([Pagination]);

import defaultPicture from "../../assets/默认头像.png";

export default {
   name: "Main",

   props: {
      customConfig: Object,
      info: Object,
      appletiables: Array,
      sysletiables: Array,
      themeInfo: Object,
      // intlGetKey: Function,
      history: Object,
      mainInit: Function,
   },

   data() {
      return {
         id: "",

         // 是否登录
         isLogin: true,

         // 用户信息
         userForm: {
            nickname: "昵称",
            integral: 0,
            province: "",
            city: "",
         },
         // 用户头像
         userPicture: defaultPicture,

         // 左侧菜单
         menuLeftList: [],
         // 右侧菜单
         menuRightList: [],

         // 弹出层开关
         popupIsShow: false,

         // 用户账号
         userAccount: "",
         // 用户账号列表
         userAccountList: [],

         // 用户account_code
         accountCode: "",
         // 用户id
         accountId: "",

         // 动作面板
         actionSheetIsShow: false,
      };
   },

   mounted() {
      this.userForm.nickname = "昵称";
      this.userForm.integral = 0;
      this.userPicture = defaultPicture;
      this.userForm.province = "";
      this.userForm.city = "";

      // 事件注册
      this.mainInit(this);
      // 创建轮播图
      this.createSwiper();
      // 获取个人信息
      this.getUserInfoData();
   },

   methods: {
      intlGetKey(name) {
         return name;
      },

      // 创建轮播图
      createSwiper() {
         this.swiperBox = new Swiper(".swiper-container", {
            pagination: {
               el: ".swiper-pagination",
               clickable: true,
            },

            // swiper的滑动方式,水平(horizontal),垂直(vertical)
            direction: "horizontal",
            // 鼠标覆盖Swiper时指针会变成手掌形状
            grabCursor: true,
            // 每页显示的side个数
            slidesPerView: 1,
            // 选中的slider居中
            centeredSlides: true,
            // 每个side的距离
            spaceBetween: 0,
            // 初始位置
            initialSlide: 0,
            // 可点击选择slider
            slideToClickedSlide: true,
         });
      },

      // 数据转换
      translatePlatformDataToJsonArray(originTableData) {
         let originTableHeader = originTableData.data[0];
         let tableHeader = [];
         originTableHeader.forEach((item) => {
            tableHeader.push(item.col_name);
         });
         let tableBody = originTableData.data[1];
         let tableData = [];
         tableBody.forEach((tableItem) => {
            let temp = {};
            tableItem.forEach((item, index) => {
               temp[tableHeader[index]] = item;
            });
            tableData.push(temp);
         });
         return tableData;
      },

      // 获取个人信息数据
      async getUserInfoData() {
         this.menuLeftList = [];
         this.menuRightList = [];
         // 获取用户信息
         await user().then((res) => {
            if (res.data) {
               this.accountId = res.data.id;
               this.accountCode = res.data.account_code;
               this.userAccount = res.data.id;
            } else {
               this.isLogin = false;
               return;
            }
         });
         // 获取菜单数据
         let dataForm = {
            queryCondition: {
               queryColumns: ["title", "title", "link", "picture", "data_id"],
            },
         };
         await queryMenuData(dataForm).then((res) => {
            res.data.results.forEach((item, index) => {
               item.picture = JSON.parse(item.picture)[0];

               if (index < 4) {
                  this.menuLeftList.push(item);
               } else {
                  this.menuRightList.push(item);
               }
            });
         });
         // 获取个人信息
         await getDataApi({ user_id: this.accountId })
            .then((res) => {
               this.userForm = res.data[0];
               if (this.userForm.head_picture) {
                  let picture = JSON.parse(this.userForm.head_picture);

                  console.log("头像数据-->", picture);

                  this.userPicture = picture[0].url;
                  if (window?.configuration?.system_resource_access_prefix) {
                     this.userPicture = `${window?.configuration?.system_resource_access_prefix}${picture[0].url}`;
                  }

                  this.$forceUpdate();
               } else {
                  this.userPicture = defaultPicture;
               }
            })
            .catch(() => {
               this.userPicture = defaultPicture;
            });
      },

      // 打开弹出层
      async openPopup() {
         // 获取角色列表
         await getAccountList(this.accountCode).then((res) => {
            this.userAccountList = res.data;
         });
         // 打开弹出层
         this.popupIsShow = true;
      },

      //切换用户
      async changeUser(row) {
         // 设置新的id
         this.accountId = row.id;
         this.accountCode = row.account_code;
         // 获取参数
         let dataForm = { id: row.id, account_code: row.account_code };
         // 获取其他账户信息
         await loginByUser(dataForm).then((res) => {
            this.getUserInfoData();
            this.popupIsShow = false;
         });
      },

      // 打开动作面板
      openActionSheet() {
         console.log("isLogin", this.isLogin);
         if (this.isLogin) {
            this.actionSheetIsShow = true;
         }
      },

      // 退出登录
      loginOut() {
         logout();
         let href = `${window.location.origin}/application/firstpage/9b7b76e8-3099-aa84-305c-7a7a456f287b`;
         window.location.href = href;
      },

      // 跳转地址
      routerLink(menu) {
         // 未登录跳转登录页
         if (this.isLogin) {
            if (menu.link.indexOf("http") != -1) {
               window.location.href = menu.link;
            } else {
               this.history.push(menu.link);
            }
         } else {
            let href = `${window.location.origin}/login?redirect_url=%2Fapplication%2Fmobileview%2F604e00d4-66a7-4df3-043d-4f0f326a323e%3FidType%3Dpage&appid=9b7b76e8-3099-aa84-305c-7a7a456f287b`;
            window.location.href = href;
         }
      },

      // 逻辑控制事件方法
      triggerEvent(eventName, payload) {
         let { componentId, appId } = this.customConfig || {};
         componentId && appId && window.eventCenter?.triggerEvent(componentId, eventName, payload);
      },

      //必需，不可删除
      Event_Center_getName() {
         return this.id;
      },
   },

   beforeDestroy() {
      window.componentCenter?.removeInstance(this.customConfig?.componentId);
   },
};
</script>

<style lang="less"></style>
