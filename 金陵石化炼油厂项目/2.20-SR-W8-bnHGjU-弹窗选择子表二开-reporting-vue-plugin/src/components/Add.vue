<template>
   <div class="outermest_matter">
      <!-- <el-button type="primary" style="margin-bottom: 10px" size="small" @click="do_EventCenter_validateForm()">校验表单</el-button> -->

      <!-- 标题 -->
      <div class="matter_title">物料清单</div>
      <!-- 表单 -->
       <el-form :model="matterDataForm" ref="matterDataForm" @submit.native.prevent size="small">
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
            <el-table-column label="物料编码" align="center">
               <template slot-scope="scope">
                  <el-input v-model="scope.row.material_code" disabled size="small" />
               </template>
            </el-table-column>

            <!-- 物料名称 -->
            <el-table-column label="物料名称" align="center">
               <template slot-scope="scope">
                  <el-input v-model="scope.row.material_name" disabled size="small" />
               </template>
            </el-table-column>

            <!-- 需求量 -->
            <el-table-column label="需求量" align="center">
               <template slot-scope="scope">
                   <el-form-item :prop="`matterData.${scope.$index}.material_demand`" :rules="{ required: true, message: '请输入材料需求量', trigger: 'blur' }">
                     <el-input
                        :disabled="disabledAll"
                        :class="scope.row.formulas_flag.material_demand ? 'red_text' : 'black_text'"
                        v-model="scope.row.material_demand"
                        @change="changeInputValue(scope.row.formulas_flag, 'material_demand')"
                        size="small"
                     />
                  </el-form-item>
               </template>
            </el-table-column>

            <!-- 采购量（主） -->
            <el-table-column label="采购量（主）" align="center" width="130">
               <template slot-scope="scope">
                   <el-form-item :prop="`matterData.${scope.$index}.material_purchase_main`" :rules="{ required: true, message: '请输入采购量（主）', trigger: 'blur' }">
                     <el-input
                        :disabled="disabledAll"
                        :class="scope.row.formulas_flag.material_purchase_main ? 'red_text' : 'black_text'"
                        v-model="scope.row.material_purchase_main"
                        @change="changeInputValue(scope.row.formulas_flag, 'material_purchase_main')"
                        size="small"
                     ></el-input>
                  </el-form-item>
               </template>
            </el-table-column>

            <!-- 主单位 -->
            <el-table-column label="主单位" align="center">
               <template slot-scope="scope">
                  <el-input v-model="scope.row.main_unit" disabled size="small" />
               </template>
            </el-table-column>

            <!-- 采购量（副） -->
            <el-table-column label="采购量（副）" align="center" width="130">
               <template slot-scope="scope">
                   <el-form-item :prop="`matterData.${scope.$index}.material_purchase_auxiliary`" :rules="{ required: true, message: '请输入采购量（副）', trigger: 'blur' }">
                     <el-input
                        :disabled="disabledAll"
                        :class="scope.row.formulas_flag.material_purchase_auxiliary ? 'red_text' : 'black_text'"
                        @change="changeInputValue(scope.row.formulas_flag, 'material_purchase_auxiliary')"
                        v-model="scope.row.material_purchase_auxiliary"
                        size="small"
                     />
                  </el-form-item>
               </template>
            </el-table-column>

            <!-- 副单位 -->
            <el-table-column label="副单位" align="center">
               <template slot-scope="scope">
                  <el-input v-model="scope.row.auxiliary_unit" disabled size="small" />
               </template>
            </el-table-column>

            <!-- 材料标准 -->
            <el-table-column label="材料标准" align="center">
               <template slot-scope="scope">
                  <el-input v-model="scope.row.standard_materials" :disabled="disabledAll" size="small" @change="saveNowData" />
               </template>
            </el-table-column>

            <!-- 补充说明 -->
            <el-table-column label="补充说明" align="center">
               <template slot-scope="scope">
                  <el-input v-model="scope.row.additional_note" :disabled="disabledAll" size="small" @change="saveNowData" />
               </template>
            </el-table-column>

            <!-- 供方 -->
            <el-table-column label="供方" align="center">
               <template slot-scope="scope">
                  <el-select v-model="scope.row.whether_workshop_supply" placeholder="请选择" size="small" @change="saveNowData" :disabled="disabledAll">
                     <el-option label="是" value="1"></el-option>
                     <el-option label="否" value="0"></el-option>
                  </el-select>
               </template>
            </el-table-column>

            <!-- 操作 -->
            <el-table-column label="操作" align="center">
               <template slot-scope="scope">
                  <el-button type="text" class="event_count" @click="handleCountButton(scope.row)" :disabled="disabledAll">计算</el-button>
                  <el-popconfirm title="确认删除这条记录吗？" @confirm="handleDeleteButton(scope.$index)">
                     <el-button slot="reference" type="text" :disabled="disabledAll">删除</el-button>
                  </el-popconfirm>
               </template>
            </el-table-column>

            <!-- 新增 -->
            <div slot="append" class="table_footer" width="130">
               <div class="footer_button" :style="disabledAll ? 'pointer-events: none' : ''" @click="handleAddButton">新增</div>
            </div>
         </el-table>

         <!-- 新增物料 -->
         <el-dialog title="物料清单表" :visible.sync="matterDialogIsShow" :show-close="false" width="70%" class="matter_dialog">
            <!-- 查询条件 -->
            <el-row :gutter="20">
               <el-col :span="6">
                  <p>物料编号：</p>
                  <el-input width="250px" placeholder="请输入物料编号" v-model="queryParamsForm.material_code" size="small"></el-input>
               </el-col>
               <el-col :span="6">
                  <p>物料名称：</p>
                  <el-input placeholder="请输入物料名称" v-model="queryParamsForm.material_name" size="small"></el-input>
               </el-col>
               <el-col :span="6">
                  <p>物料分类：</p>
                  <el-input placeholder="请输入物料分类" v-model="queryParamsForm.material_type" size="small"></el-input>
               </el-col>
               <el-col :span="6" class="query_button">
                  <el-button type="primary" @click="handleAddButton" size="small">查询</el-button>
                  <el-button type="primary" @click="handleResetButton" size="small">重置</el-button>
               </el-col>
            </el-row>
            <!-- 列表 -->
            <el-table :data="addMatterDataList" border stripe row-key="data_id" ref="addMatterDataList" @selection-change="handleTableSelect">
               <el-table-column align="center" type="selection" :selectable="addMatterCheckType" :reserve-selection="true" width="55" fixed="left"></el-table-column>
               <el-table-column align="center" prop="material_code" label="物料编号"></el-table-column>
               <el-table-column align="center" prop="material_name" label="物料名称" width="350"></el-table-column>
               <el-table-column align="center" prop="material_type" label="物料分类" :show-overflow-tooltip="true"></el-table-column>
               <el-table-column align="center" prop="main_unit" label="主单位" width="150"></el-table-column>
               <el-table-column align="center" prop="auxiliary_unit" label="副单位" width="150"></el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination @current-change="handlePagerChange" @size-change="handleSizeChange" layout="prev, pager, next, sizes" :total="total" background class="pagination_box"></el-pagination>
            <!-- 外层弹窗底部按钮 -->
            <div slot="footer" class="bottom_button">
               <el-button size="small" type="primary" @click="handleSelectButton">确 定</el-button>
               <el-button size="small" @click="handleCancelButton">取 消</el-button>
            </div>
         </el-dialog>

         <!-- 计算弹窗 -->
         <CountDialog ref="countDialog" :saveNowData="saveNowData"></CountDialog>
      </el-form>
   </div>
</template>

<script>
import eventActionDefine from "./msgCompConfig";
import "./index.less";

import { queryMatteList } from "../api/asset";

import CountDialog from "../common/countDialog.vue";

export default {
   components: { CountDialog },

   name: "Add",

   props: {
      customConfig: Object,
   },

   data() {
      return {
         data: this.customConfig.data,
         propsConfiguration: this.customConfig.configuration || "{}",
         configuration: {},

         disabledAll: false,

         // 主表ID
         dataId: "",
         // 资产ID
         assetId: "",

         // 物料清单表单
         matterDataForm: {
            // 物料清单数据
            matterData: [],
         },

         // 新增物料清单弹窗
         matterDialogIsShow: false,
         // 新增物料清单查询参数
         queryParamsForm: {
            material_code: "",
            material_name: "",
            material_type: "",
         },
         // 新增物料清单数据
         addMatterDataList: [],
         // 新增物料清单选中数据
         tableSelectData: [],

         // 分页
         total: 0,
         // 页数
         pageNumber: 1,
         // 页码
         pageSiza: 10,
      };
   },

   mounted() {
      //  注册逻辑控制
      window?.componentCenter?.register(this.customConfig.componentId, "comp", this, eventActionDefine);
      this.configuration = JSON.parse(this.propsConfiguration);

      if (this.propsConfiguration) {
         this.disabledAll = JSON.parse(this.propsConfiguration).isDisabled;
      }

      if (this.data) {
         this.matterDataForm.matterData = JSON.parse(this.data);
      }
   },

   methods: {
      // 判断新增物料清单是否可选中
      addMatterCheckType(value) {
         // 过滤数据
         let checkValue = this.matterDataForm.matterData.filter((item) => {
            return item.data_id == value.data_id;
         });
         // 判断是否禁选
         if (checkValue[0]) {
            return false;
         }
         return true;
      },

      // 判断输入框字体颜色
      changeInputValue(row, key) {
         // 修改为黑色
         row[key] = false;

         // 保存数据
         this.saveNowData();
      },

      // 计算
      handleCountButton(row) {
         // 打开计算弹窗
         this.$refs["countDialog"].openCountDialog(row);
      },
      // 删除
      handleDeleteButton(index) {
         this.matterDataForm.matterData.splice(index, 1);
      },
      // 新增
      handleAddButton() {
         // 接口参数
         let dataForm = {
            ...this.queryParamsForm,
            page_num: this.pageNumber,
            page_size: this.pageSiza,
         };
         // 获取表格数据
         queryMatteList(dataForm).then((res) => {
            // 赋值
            // this.addMatterDataList = res.data;
            this.addMatterDataList = res.data.informationPOList;
            this.total = res.data.total_num;
         });
         // 打开弹窗
         this.matterDialogIsShow = true;
      },
      // 重置
      handleResetButton() {
         this.queryParamsForm = {
            material_code: "",
            material_name: "",
            material_type: "",
         };
         this.handleAddButton();
      },
      // 表格选中
      handleTableSelect(dataList) {
         this.tableSelectData = dataList;
      },
      // 改变页码
      handlePagerChange(page) {
         this.pageNumber = page;
         this.handleAddButton();
      },
      // 改变页数
      handleSizeChange(size) {
         this.pageSiza = size;
         this.handleAddButton();
      },
      // 确定
      handleSelectButton() {
         // 动态添加选中的数据
         this.tableSelectData.forEach((item) => {
            // 判断是否存在
            let selectValue = this.matterDataForm.matterData.filter((e) => {
               return e.data_id == item.data_id;
            });
            // 不存在则添加新数据
            if (!selectValue[0]) {
               item.material_demand = "";
               item.material_purchase_main = "";
               item.material_purchase_auxiliary = "";
               item.formulas_flag = {};
               item.standard_materials = "";
               item.additional_note = "";
               item.whether_workshop_supply = "";
               this.matterDataForm.matterData.push(JSON.parse(JSON.stringify(item)));
            }
         });

         // 清空选项
         this.$refs["addMatterDataList"].clearSelection();

         // 关闭弹窗
         this.matterDialogIsShow = false;

         // 储存当前值
         this.saveNowData();
      },
      // 取消
      handleCancelButton() {
         // 置空搜索条件
         this.queryParamsForm = {
            material_code: "",
            material_name: "",
            material_type: "",
         };
         // 关闭弹窗
         this.matterDialogIsShow = false;
      },

      // 将当前值保存至平台
      saveNowData() {
         let { onChange } = this.customConfig;

         // 保存新增的数据
         onChange(JSON.stringify(this.matterDataForm.matterData));
         // console.log(JSON.stringify(this.matterDataForm.matterData));
      },

      // 校验表单
      do_EventCenter_validateForm() {
         let isSave = "false";

         this.$refs["matterDataForm"].validate((valid) => {
            if (!valid) return;
            isSave = "true";
            this.saveNowData();
         });

         return {
            isSave,
         };
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

<style></style>
