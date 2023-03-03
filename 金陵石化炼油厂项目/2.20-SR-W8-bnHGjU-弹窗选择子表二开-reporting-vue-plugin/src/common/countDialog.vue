<template>
   <el-dialog :visible.sync="countDialogIsShow" append-to-body width="60%" class="count_dialog" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <!-- 表格 -->
      <el-table :data="countTableData" stripe border>
         <!-- 公式类型 -->
         <el-table-column prop="formulaType" label="公式类型" align="center"></el-table-column>
         <!-- 公式名称 -->
         <el-table-column prop="formulaName" label="公式名称" align="center" :show-overflow-tooltip="true"></el-table-column>
         <!-- 公式模板 -->
         <el-table-column label="公式模板" align="center" width="300" :show-overflow-tooltip="true">
            <template slot-scope="scope">
               {{ fiflterParams(scope.row.formulaTemplate) }}
            </template>
         </el-table-column>
         <!-- 参数信息 -->
         <el-table-column prop="formulaContent" label="参数信息" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
               {{ scope.row.formulaContent }}
            </template>
         </el-table-column>
         <!-- 消耗系数 -->
         <el-table-column prop="stuffCoefficient" label="消耗系数" align="center" width="100"></el-table-column>
         <!-- 需求量 -->
         <el-table-column prop="stuffDemand" label="需求量" align="center" width="100" :show-overflow-tooltip="true"></el-table-column>
         <!-- 采购量(副) -->
         <el-table-column prop="stuffPurchase" label="采购量(副)" align="center" width="100" :show-overflow-tooltip="true"></el-table-column>
         <!-- 操作 -->
         <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
               <el-button type="text" class="event_count" @click="handleEditButton(scope.row)">编辑</el-button>
               <el-popconfirm title="确认删除这条记录吗？" @confirm="handleDeleteButton(scope.$index)">
                  <el-button slot="reference" type="text" :disabled="dialogType ? true : false">删除</el-button>
               </el-popconfirm>
            </template>
         </el-table-column>
         <!-- 新增 -->
         <div slot="append" class="table_footer">
            <div class="footer_button" @click="handleAddButton" :style="dialogType ? 'pointer-events: none;' : ''">新增公式</div>
         </div>
      </el-table>
      <!-- 单位转换 & 转换关系 -->
      <div class="transform_box">
         <!-- 单位转换 -->
         <el-row :gutter="20">
            <el-col :span="3" class="unit_title">
               <p>单位转换</p>
            </el-col>
            <el-col :span="10">
               <p>主单位：</p>
               <el-input v-model="countData.main_unit" placeholder="主单位" readonly></el-input>
            </el-col>
            <el-col :span="10">
               <p>副单位：</p>
               <el-input v-model="countData.auxiliary_unit" placeholder="副单位" readonly></el-input>
            </el-col>
         </el-row>
         <!-- 转换关系 -->
         <el-row :gutter="20">
            <el-col :span="3" class="unit_title">
               <p>转换关系</p>
            </el-col>
            <el-col :span="7">
               <p>{{ countData.coefficient_transformation }}</p>
               <el-input v-model="countData.main_unit" placeholder="主单位名称" readonly></el-input>
            </el-col>
            <el-col :span="1">
               <p>=</p>
            </el-col>
            <el-col :span="6">
               <el-input v-model="countData.parameter_transformation" placeholder="转换参数" readonly></el-input>
            </el-col>
            <el-col :span="6">
               <el-input v-model="countData.auxiliary_unit" placeholder="副单位名称" readonly></el-input>
            </el-col>
         </el-row>
      </div>
      <!-- 汇总计算 -->
      <div class="gather_button">
         <el-button type="primary" size="small" @click="hanldeGatherButton" :disabled="dialogType ? true : false">汇总计算</el-button>
      </div>
      <!-- 计算输入框 -->
      <div class="gather_box">
         <div class="outer_input">
            <div>需求量：</div>
            <el-input v-model="material_demand" placeholder="需求量" readonly></el-input>
         </div>
         <div class="outer_input">
            <div>采购量(副)：</div>
            <el-input v-model="material_purchase_auxiliary" placeholder="采购量(副)" readonly></el-input>
         </div>
         <div class="outer_input">
            <div>采购量(主)：</div>
            <el-input v-model="material_purchase_main" placeholder="采购量(主)" readonly></el-input>
         </div>
      </div>
      <!-- 外层弹窗底部按钮 -->
      <div slot="footer" class="bottom_button">
         <el-button size="small" type="primary" @click="handleSaveButton" :disabled="isGather">确 定</el-button>
         <el-button size="small" @click="handleCancelButton">取 消</el-button>
      </div>
      <!-- 内层弹窗 -->
      <el-dialog :visible.sync="formulaDialogIsShow" append-to-body class="formula_dialog" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
         <!-- 下拉选择 -->
         <el-row :gutter="20">
            <el-col :span="3">
               <p>公式类型</p>
            </el-col>
            <el-col :span="9">
               <el-select v-model="formulaTypeSelect" placeholder="请选择" @change="handleFormulaTypeSelect" clearable :disabled="dialogType ? true : false">
                  <el-option v-for="(item, index) in formulaTypeData" :key="index" :label="item.type_of_formula" :value="item.type_of_formula"> </el-option>
               </el-select>
            </el-col>
            <el-col :span="3">
               <p>公式名称</p>
            </el-col>
            <el-col :span="9">
               <el-select v-model="formulaNameSelect" placeholder="请选择" @change="handleFormulaNameSelect" clearable :disabled="dialogType ? true : false">
                  <el-option v-for="(item, index) in formulaNameData" :key="index" :label="item.formula_name" :value="item.formula_name"> </el-option>
               </el-select>
            </el-col>
         </el-row>
         <!-- 公式模板 -->
         <el-row :gutter="20" class="inner_template">
            <el-col :span="3">公式模板</el-col>
            <el-col :span="9">{{ formulaTemplateShowText }}</el-col>
         </el-row>
         <!-- 参数 -->
         <el-row :gutter="20" class="inner_params">
            <el-col :span="3" class="title">参数：</el-col>
            <div class="row_box">
               <el-col :span="24" class="params_content" v-for="(item, index) in formulaParamsData" :key="index">
                  <div class="content_title">{{ fiflterParams(item.label) }} ：</div>
                  <el-input v-model="item.value" :disabled="dialogType ? true : false"></el-input>
               </el-col>
            </div>
         </el-row>
         <!-- 备注 -->
         <el-row :gutter="20" class="inner_remarks">
            <el-col :span="3" class="title">备注：</el-col>
            <el-col :span="24" class="row_box">{{ formulaRemarksText }}</el-col>
         </el-row>
         <!-- 底部按钮 -->
         <div slot="footer" class="bottom_button">
            <el-button size="small" type="primary" @click="handleFormulaSaveButton" :disabled="dialogType ? true : false">确 定</el-button>
            <el-button size="small" @click="resetFormulaDialog">取 消</el-button>
         </div>
      </el-dialog>
   </el-dialog>
</template>

<script>
import "./countDialog.less";

import { queryFormulaTypeData, queryFormulaNameData } from "../api/asset";

export default {
   props: {
      saveNowData: Function,
   },

   data() {
      return {
         // 计算弹窗开关
         countDialogIsShow: false,
         // 计算弹窗回显数据
         countData: {},
         // 计算表格数据
         countTableData: [],

         // 需求量
         material_demand: "",
         // 采购量(副)
         material_purchase_auxiliary: "",
         // 采购量(主)
         material_purchase_main: "",

         // 是否汇总计算过
         isGather: true,

         // 当前编辑数据
         nowEditData: null,

         // 公式弹窗开关
         formulaDialogIsShow: false,
         // 公式类型数据
         formulaTypeData: [],
         // 公式类型选中值
         formulaTypeSelect: "",
         // 公式名称数据
         formulaNameData: [],
         // 公式名称选中值
         formulaNameSelect: "",

         // 公式模板
         formulaTemplate: "",
         // 公式模板展示文本
         formulaTemplateShowText: "",
         // 公式参数数据
         formulaParamsData: [],
         // 公式备注
         formulaRemarksText: "",

         // 消耗系数
         stuffCoefficient: "",

         // 打开的弹窗类型
         dialogType: null,
      };
   },

   methods: {
      // 获取UUID
      get_UUID() {
         return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            return (c === "x" ? (Math.random() * 16) | 0 : "r&0x3" | "0x8").toString(16);
         });
      },

      // 打开计算弹窗
      openCountDialog(row, type) {
         this.isGather = true;
         this.dialogType = type;

         this.countData = row;
         this.material_demand = row.material_demand;
         this.material_purchase_auxiliary = row.material_purchase_auxiliary;
         this.material_purchase_main = row.material_purchase_main;
         this.countTableData = row.formulas && row.formulas.length ? JSON.parse(row.formulas) : [];
         // 打开弹窗
         this.countDialogIsShow = true;
      },

      // 汇总
      hanldeGatherButton() {
         // 判断是否可以进行汇总计算
         if (!this.countTableData.length) {
            this.$message.warning("请先新增公式");
            return;
         }
         let _stuffDemand = 0;
         let _stuffPurchase = 0;
         let _stuffPurchaseMain = 0;
         this.countTableData.forEach((item) => {
            _stuffDemand += Number(item.stuffDemand);
            _stuffPurchase += Number(item.stuffPurchase);
         });
         // 计算采购需求量汇总
         this.material_demand = _stuffDemand.toFixed(4);
         // 计算采购量(副单位)汇总
         this.material_purchase_auxiliary = _stuffPurchase.toFixed(4);
         // 计算采购量(主单位)汇总
         _stuffPurchaseMain = Number(this.material_purchase_auxiliary) / Number(this.countData.parameter_transformation);
         this.material_purchase_main = _stuffPurchaseMain.toFixed(4);

         // 记录汇总计算过
         this.isGather = false;
      },
      // 新增
      handleAddButton() {
         this.nowEditData = null;
         // 获取公式类型数据
         queryFormulaTypeData().then((res) => {
            this.formulaTypeData = res.data;
         });
         this.formulaDialogIsShow = true;
      },
      // 编辑
      handleEditButton(row) {
         this.nowEditData = row;
         // 类型
         this.formulaTypeSelect = row.formulaType;
         // 名称
         this.formulaNameSelect = row.formulaName;
         // 模板
         this.formulaTemplate = row.formulaTemplate;
         this.formulaTemplateShowText = this.fiflterParams(row.formulaTemplate);
         // 备注
         this.formulaRemarksText = row.formulaRemarksText;
         // 参数
         this.formulaParamsData = row.formulaParamsData;

         // 获取参数名称
         this.handleFormulaTypeSelect();
         // 打开弹窗
         this.formulaDialogIsShow = true;
      },
      // 删除
      handleDeleteButton(index) {
         this.countTableData.splice(index, 1);
      },
      // 确认
      handleSaveButton() {
         // 再次进行汇总计算
         this.hanldeGatherButton();

         // 赋值表格数据
         this.countData.material_demand = this.material_demand;
         this.countData.material_purchase_auxiliary = this.material_purchase_auxiliary;
         this.countData.material_purchase_main = this.material_purchase_main;
         this.countData.formulas_flag = {
            material_demand: true,
            material_purchase_auxiliary: true,
            material_purchase_main: true,
         };
         this.countData.formulas = JSON.stringify(this.countTableData);

         // 置空表单
         this.material_demand = "";
         this.material_purchase_auxiliary = "";
         this.material_purchase_main = "";

         // 关闭弹窗
         this.countDialogIsShow = false;

         // 保存数据
         this.saveNowData();
      },
      // 内嵌弹窗确认
      handleFormulaSaveButton() {
         if (this.innnerDialogRules()) {
            // 转换模板参数
            let contentStr = [];
            // 替换模板参数
            let contentTemplate = this.formulaTemplate;
            this.formulaParamsData.forEach((item) => {
               contentTemplate = contentTemplate.replace(item.label, `${item.value}`);
               contentStr.push(`${this.fiflterParams(item.label)}:${item.value}`);
            });

            // 表格行数据
            let formulaData = {
               id: this.get_UUID(),
               // 公式类型
               formulaType: this.formulaTypeSelect,
               // 公式名称
               formulaName: this.formulaNameSelect,
               // 公式模板
               formulaTemplate: this.formulaTemplate,
               // 公式内容
               formulaContent: contentStr.join(" "),
               // 材料消耗系数
               stuffCoefficient: this.stuffCoefficient,
               // 材料需求量
               stuffDemand: "",
               // 材料采购量
               stuffPurchase: "",
               // 参数列表
               formulaParamsData: this.formulaParamsData,
               // 备注
               formulaRemarksText: this.formulaRemarksText,
            };

            // 计算材料需求量
            let formulaStr = contentTemplate.split("=");
            formulaData.stuffDemand = eval(formulaStr[1]).toFixed(4);

            // 计算材料采购量
            formulaData.stuffPurchase = Number(formulaData.stuffCoefficient) * Number(formulaData.stuffDemand);
            formulaData.stuffPurchase = formulaData.stuffPurchase.toFixed(4);

            // 判断编辑还是新增
            if (this.nowEditData) {
               this.countTableData.forEach((item) => {
                  if (item.id == this.nowEditData.id) {
                     item.formulaType = formulaData.formulaType;
                     item.formulaName = formulaData.formulaName;
                     item.formulaTemplate = formulaData.formulaTemplate;
                     item.formulaContent = formulaData.formulaContent;
                     item.stuffCoefficient = formulaData.stuffCoefficient;
                     item.stuffDemand = formulaData.stuffDemand;
                     item.stuffPurchase = formulaData.stuffPurchase;
                     item.formulaParamsData = formulaData.formulaParamsData;
                     item.formulaRemarksText = formulaData.formulaRemarksText;
                  }
               });
            } else {
               this.countTableData.push(formulaData);
            }

            // 重置内嵌弹窗
            this.resetFormulaDialog();
         }
      },
      // 取消
      handleCancelButton() {
         this.countTableData = [];

         this.material_demand = "";
         this.material_purchase_auxiliary = "";
         this.material_purchase_main = "";

         this.countDialogIsShow = false;
      },

      // 重置内嵌弹窗
      resetFormulaDialog() {
         // 清空所有内容
         this.formulaTypeData = [];
         this.formulaTypeSelect = "";
         this.formulaNameData = [];
         this.formulaNameSelect = "";
         this.formulaTemplate = "";
         this.formulaTemplateShowText = "";
         this.formulaParamsData = [];
         this.formulaRemarksText = "";
         // 清空当前选中行
         this.nowEditData = null;
         // 关闭弹窗
         this.formulaDialogIsShow = false;
      },

      // 公式类型切换
      handleFormulaTypeSelect() {
         // 获取公式名称数据
         queryFormulaNameData(this.formulaTypeSelect).then((res) => {
            this.formulaNameData = res.data;
         });
      },
      // 公式名称切换
      handleFormulaNameSelect(value) {
         // 过滤出模板数据
         let templateData = this.formulaNameData.filter((item) => {
            return item.formula_name == value;
         })[0];
         // 添加公式模板
         this.formulaTemplate = templateData.formula;
         this.formulaTemplateShowText = this.fiflterParams(templateData.formula);
         // 添加备注
         this.formulaRemarksText = templateData.note;
         // 添加消耗系数
         this.stuffCoefficient = templateData.material_consumption_oefficient;

         // 获取公式模板中参数
         let templateField = templateData.formula.match(/\$\{[a-zA-Z]+\}/g);
         // 生成参数列表数据
         this.formulaParamsData = templateField.map((item) => {
            return { label: item, value: "" };
         });
      },

      // 截取参数
      fiflterParams(str) {
         str = str.replace(/\$\{/g, "");
         str = str.replace(/\}/g, "");
         return str;
      },
      // 内层弹窗校验
      innnerDialogRules() {
         // 校验公式类型
         if (!this.formulaTypeSelect) {
            this.$message.error("请选择公式类型");
            return false;
         }
         // 校验公式模板
         if (!this.formulaNameSelect) {
            this.$message.error("请选择公式名称");
            return false;
         }
         // 校验模板
         for (let i in this.formulaParamsData) {
            if (!this.formulaParamsData[i].value) {
               this.$message.error(`请输入 ${this.formulaParamsData[i].label} 参数`);
               return;
            }
         }
         return true;
      },
   },
};
</script>
