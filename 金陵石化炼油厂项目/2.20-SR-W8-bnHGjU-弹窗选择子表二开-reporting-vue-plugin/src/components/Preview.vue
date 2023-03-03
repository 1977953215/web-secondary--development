<template>
   <div class="outermest_preview">
      <!-- 物料清单 -->
      <el-table :data="matterDataForm.matterData" border>
         <!-- 暂无数据 -->
         <template slot="empty">
            <svg t="1677566804010" class="icon" viewBox="0 0 1638 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3037" width="64" height="40">
               <path
                  d="M0 844.8c0 97.450667 361.096533 176.469333 806.536533 176.469333s806.5024-79.018667 806.5024-176.469333c0-97.416533-361.096533-176.401067-806.5024-176.401067C361.096533 668.398933 0 747.383467 0 844.8z"
                  fill="#F5F5F5"
                  p-id="3038"
               ></path>
               <path
                  d="M1398.784 580.164267H214.254933v-249.514667l259.618134-294.877867C486.4 13.1072 509.1328 0.477867 531.797333 0.477867h549.444267c22.698667 0 45.397333 12.629333 60.484267 37.819733l257.092266 292.352v249.514667zM239.479467 555.008h1134.148266v-216.746667L1121.553067 50.858667C1108.992 33.245867 1096.362667 23.210667 1081.2416 23.210667H531.797333c-15.121067 0-27.716267 10.069333-37.819733 25.1904L239.445333 340.753067v214.2208z"
                  fill="#D9D9D9"
                  p-id="3039"
               ></path>
               <path
                  d="M1048.4736 413.832533c0-40.311467 25.1904-73.079467 55.466667-73.079466h282.282666v456.192c0 52.906667-32.768 98.304-75.639466 98.304H302.455467c-40.3456 0-75.605333-42.871467-75.605334-98.304V340.753067h282.282667c30.242133 0 55.432533 32.768 55.432533 73.079466s25.1904 73.079467 55.432534 73.079467h373.0432c30.242133 2.525867 55.432533-32.768 55.432533-73.079467z"
                  fill="#FAFAFA"
                  p-id="3040"
               ></path>
               <path
                  d="M1310.583467 907.844267H302.455467c-47.889067 0-88.234667-50.414933-88.234667-110.933334V328.192h294.912c37.7856 0 68.027733 37.7856 68.027733 85.674667 0 32.768 20.138667 60.484267 42.837334 60.484266h373.0432c22.664533 0 42.837333-27.716267 42.837333-60.484266 0-47.889067 30.242133-85.674667 68.061867-85.674667h294.877866v468.7872c0 60.484267-37.819733 110.8992-88.234666 110.8992zM239.445333 353.348267v443.5968c0 47.889067 27.716267 85.674667 63.010134 85.674666h1008.128c35.293867 0 63.010133-37.7856 63.010133-85.674666V353.348267h-269.653333c-22.698667 0-42.871467 27.716267-42.871467 60.484266 0 47.889067-30.242133 85.674667-68.027733 85.674667H619.997867c-37.7856 0-68.027733-37.7856-68.027734-85.674667 0-32.768-20.138667-63.010133-42.837333-63.010133H239.445333v2.525867z"
                  fill="#D9D9D9"
                  p-id="3041"
               ></path>
            </svg>
            <div class="empty_title">暂无数据</div>
         </template>

         <!-- 物料编码 -->
         <el-table-column label="物料编码" prop="material_code" align="center" :show-overflow-tooltip="true"></el-table-column>
         <!-- 物料名称 -->
         <el-table-column label="物料名称" prop="material_name" align="center" :show-overflow-tooltip="true"></el-table-column>

         <!-- 需求量 -->
         <el-table-column label="需求量" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
               <div :style="scope.row.formulas_flag.material_demand ? 'color: red;' : 'color: #111;'">{{ scope.row.material_demand }}</div>
            </template>
         </el-table-column>

         <!-- 采购量（主） -->
         <el-table-column label="采购量（主）" align="center" width="130" :show-overflow-tooltip="true">
            <template slot-scope="scope">
               <div :style="scope.row.formulas_flag.material_demand ? 'color: red;' : 'color: #111;'">{{ scope.row.material_purchase_main }}</div>
            </template>
         </el-table-column>

         <!-- 主单位 -->
         <el-table-column label="主单位" prop="main_unit" align="center" :show-overflow-tooltip="true"></el-table-column>

         <!-- 采购量（副） -->
         <el-table-column label="采购量（副）" align="center" width="130" :show-overflow-tooltip="true">
            <template slot-scope="scope">
               <div :style="scope.row.formulas_flag.material_demand ? 'color: red;' : 'color: #111;'">{{ scope.row.material_purchase_auxiliary }}</div>
            </template>
         </el-table-column>

         <!-- 副单位 -->
         <el-table-column label="副单位" prop="auxiliary_unit" align="center" :show-overflow-tooltip="true"></el-table-column>

         <!-- 材料标准 -->
         <el-table-column label="材料标准" prop="standard_materials" align="center" :show-overflow-tooltip="true"></el-table-column>

         <!-- 补充说明 -->
         <el-table-column label="补充说明" props="additional_note" align="center" :show-overflow-tooltip="true"></el-table-column>

         <!-- 供方 -->
         <el-table-column label="供方" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
               <div>{{ scope.row.whether_workshop_supply == "1" ? "是" : "否" }}</div>
            </template>
         </el-table-column>

         <!-- 操作 -->
         <el-table-column label="操作" align="center">
            <template slot-scope="scope">
               <el-button type="text" class="event_count" @click="handleCountButton(scope.row)">计算</el-button>
               <el-popconfirm title="确认删除这条记录吗？">
                  <el-button slot="reference" type="text" disabled>删除</el-button>
               </el-popconfirm>
            </template>
         </el-table-column>

         <!-- 新增 -->
         <div slot="append" class="table_footer" width="130">
            <div class="footer_button" style="pointer-events: none">新增</div>
         </div>
      </el-table>

      <!-- 计算弹窗 -->
      <CountDialog ref="countDialog"></CountDialog>
   </div>
</template>

<script>
import "./index.less";
import CountDialog from "../common/countDialog.vue";

export default {
   components: { CountDialog },

   name: "Preview",

   props: {
      customConfig: Object,
   },

   data() {
      return {
         data: this.customConfig.data,
         propsConfiguration: this.customConfig.configuration || "{}",
         configuration: {},

         // 物料清单表单
         matterDataForm: {
            // 物料清单数据
            matterData: [],
         },
      };
   },

   mounted() {
      if (this.data) {
         this.matterDataForm.matterData = JSON.parse(this.data);
      }
   },

   methods: {
      // 判断输入框字体颜色
      changeInputValue(row, key) {
         // 修改为黑色
         row[key] = false;
      },

      // 计算
      handleCountButton(row) {
         // 打开计算弹窗
         this.$refs["countDialog"].openCountDialog(row, "preview");
      },

      // 组件名称
      Event_Center_getName() {
         return `弹窗子表-物料清单`;
      },
   },

   destroyed() {
      window?.componentCenter?.removeInstance(this.customConfig.componentId);
   },
};
</script>

<style lang="less">
.outermest_preview {
   // svg图片
   svg {
      top: 0;
   }
   // 暂无数据标题
   .empty_title {
      margin-top: -17px;
      font-size: 14px;
      color: #b8bac0;
      height: 22px;
      line-height: 22px;
   }

   // 计算按钮
   .event_count {
      margin-right: 10px;
   }
}

// 表格页脚
.table_footer {
   text-align: center;
   // background: #fafafa;
   padding: 17px 16px 19px 16px;
   // 页脚按钮
   .footer_button {
      border-radius: 4px;
      cursor: pointer;
      border: 1px #dedfe0 dashed;
      height: 32px;
      line-height: 32px;
      &:hover {
         color: #81befe;
         border-color: #81befe;
      }
   }
}

// 红色字体
.red_text {
   .el-input__inner {
      color: red;
   }
}
// 黑色字体
.black_text {
   .el-input__inner {
      color: #111;
   }
}
</style>
