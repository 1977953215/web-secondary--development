<template>
   <div ref="app-secondary" class="outermest_details">
      <!-- 导航 -->
      <!-- <div class="details_nav">
         <div class="nav_box">
            <div class="nav_title">习近平经济思想文献资料库</div>
            <div class="nav_button_list">
               <div class="button_collect" @click="hanldeCollectButton('list')">
                  <img src="../../assets/星形.png" alt="" />
                  <span>收藏</span>
               </div>
               <div class="button_history">
                  <img src="../../assets/历史.png" alt="" />
                  <span>历史</span>
               </div>
            </div>
         </div>
      </div> -->
      <!-- 页面整体 -->
      <div class="details_all">
         <!-- 头部 -->
         <div class="details_header">
            <!-- 面包屑 -->
            <div class="header_breadcrumb">
               <img src="../../assets/首页.png" alt="" />
               <el-breadcrumb separator="/">
                  <el-breadcrumb-item
                     ><a href="/applicationview/content/view?appid=c4024ef5-3721-17a6-7111-179df9b808ae&type=view&menuId=11a27d68-aed3-7ceb-0a9f-139a42f42f34%233  ">首页</a></el-breadcrumb-item
                  >
                  <el-breadcrumb-item
                     ><a href="/applicationview/content/view?appid=c4024ef5-3721-17a6-7111-179df9b808ae&type=view&menuId=bbab0754-6e39-57d1-b9f3-d5668524bba9%233">检索</a>
                  </el-breadcrumb-item>
                  <el-breadcrumb-item><a href="">详情</a></el-breadcrumb-item>
               </el-breadcrumb>
            </div>
            <!-- 按钮 -->
            <div class="header_button_list">
               <el-button v-if="detailsList.favorites == '0'" @click="hanldeCollectButton('essay')">
                  <img src="../../assets/收藏.png" alt="" />
                  <div>收藏</div>
               </el-button>
               <el-button v-if="detailsList.favorites == '1'" @click="hanldeCancelCollectButton">
                  <img src="../../assets/星形.png" alt="" class="activeCollect" />
                  <div>收藏</div>
               </el-button>
               <el-button>
                  <img src="../../assets/引用.png" alt="" />
                  <div>引用</div>
               </el-button>
               <el-button>
                  <img src="../../assets/下载.png" alt="" />
                  <div>下载</div>
               </el-button>
            </div>
         </div>
         <!-- 文章 -->
         <div class="details_content">
            <!-- 内容头部 -->
            <div class="content_header">
               <!-- <div class="header_subtitle">{{ detailsList.domain }}</div> -->
               <div class="header_maintitle">{{ detailsList.title }}</div>
               <!-- <div class="header_subtitle">{{ detailsList.articleType }}</div> -->
               <div class="header_source">
                  <div v-if="detailsList.source">来源：{{ detailsList.source }}</div>
                  <div v-if="detailsList.startTime">时间：{{ detailsList.startTime }}</div>
               </div>
            </div>
            <!-- 分割线 -->
            <div class="content_line"></div>
            <!-- 文章内容 -->
            <div v-for="(item, index) in detailsList.articleContent" :key="index" class="content_article">{{ item }}</div>
            <!-- 引用 -->
            <div class="content_article">{{ detailsList.quote }}</div>
            <!-- 责编 -->
            <!-- <div class="content_editor">{{ detailsList.editor }}</div> -->
         </div>
      </div>
   </div>
</template>

<script>
import platformMixin from "@/mixin/platform.js";
// 引入样式
import "./app.less";

import { queryEssayData, collectData, cancelCollectData, collectList } from "../../api/asset";

import qs from "querystringify";

export default {
   name: "Main",

   mixins: [platformMixin],

   props: {
      customConfig: Object,
      info: Object,
      appVariables: Array,
      sysVariables: Array,
      themeInfo: Object,
      intlGetKey: Function,
      history: Object,
   },

   computed: {},

   data() {
      return {
         // 列表数据
         lsitData: {},

         // 文章数据
         detailsList: {},

         // 收藏状态
         collectType: false,

         // 资产ID
         assetId: "",
      };
   },

   mounted() {
      // 保存资产ID
      this.assetId = this.customConfig["资产ID"];
      // 获取Url参数
      let search = qs.parse(window.location.search);
      // 保存接口参数
      this.lsitData = {
         id: search.article_id,
         title: search.article_name || "",
      };
      // 本地调试
      if (process.env.NODE_ENV === "development") {
         this.assetId = "3f929e08-3c27-b8f1-cca9-9879a283134a";
         // this.lsitData.id = "63e26183-89b7-4daf-9acb-c6a4ceef4014";
      }
      // 获取数据
      this.getEssayData();
   },

   methods: {
      // 获取数据
      getEssayData() {
         queryEssayData(this?.assetId, this.lsitData?.id).then((res) => {
            this.detailsList = res.data;
         });
      },

      // 收藏
      hanldeCollectButton(type) {
         if (type == "essay") {
            // 接口参数
            let dataForm = {
               article_id: this.lsitData?.id,
               title: this.lsitData?.title || "",
            };
            collectData(dataForm).then((res) => {
               this.getEssayData();
               this.$message.success("收藏成功");
            });
         } else {
            // 收藏列表
            collectList().then((res) => {
               this.getEssayData();
               this.$message.success("收藏列表成功");
            });
         }
      },

      // 取消收藏
      hanldeCancelCollectButton() {
         cancelCollectData(this.lsitData?.id).then((res) => {
            this.getEssayData();
            this.$message.warning("取消收藏成功");
         });
      },

      //action样例
      do_EventCenter_message({ value }) {
         alert(value);
      },
   },
};
</script>
