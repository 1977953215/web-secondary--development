<template>
   <!-- 物料清单 -->
   <el-table :data="matterData" border stripe>
      <!-- 物料编码 -->
      <el-table-column label="物料编码" align="center">
         <template slot-scope="scope">
            <el-input v-model="scope.row.material_code" :disabled="true" size="small" />
         </template>
      </el-table-column>

      <!-- 物料名称 -->
      <el-table-column label="物料名称" align="center">
         <template slot-scope="scope">
            <el-input v-model="scope.row.material_name" :disabled="true" size="small" />
         </template>
      </el-table-column>

      <!-- 需求量 -->
      <el-table-column label="需求量" align="center">
         <template slot-scope="scope">
            <el-input v-model="scope.row.material_demand" size="small" />
         </template>
      </el-table-column>

      <!-- 采购量（主） -->
      <el-table-column label="采购量（主）" align="center" width="130">
         <template slot-scope="scope">
            <el-input v-model="scope.row.material_purchase_main" size="small"></el-input>
         </template>
      </el-table-column>

      <!-- 主单位 -->
      <el-table-column label="主单位" align="center">
         <template slot-scope="scope">
            <el-input v-model="scope.row.main_unit" :disabled="true" size="small" />
         </template>
      </el-table-column>

      <!-- 采购量（副） -->
      <el-table-column label="采购量（副）" align="center" width="130">
         <template slot-scope="scope">
            <el-input v-model="scope.row.material_purchase_auxiliary" size="small" />
         </template>
      </el-table-column>

      <!-- 副单位 -->
      <el-table-column label="副单位" align="center">
         <template slot-scope="scope">
            <el-input v-model="scope.row.auxiliary_unit" :disabled="true" size="small" />
         </template>
      </el-table-column>

      <!-- 材料标准 -->
      <el-table-column label="材料标准" align="center">
         <template slot-scope="scope">
            <el-input v-model="scope.row.standard_materials" size="small" />
         </template>
      </el-table-column>

      <!-- 补充说明 -->
      <el-table-column label="补充说明" align="center">
         <template slot-scope="scope">
            <el-input v-model="scope.row.additional_note" size="small" />
         </template>
      </el-table-column>

      <!-- 供方 -->
      <el-table-column label="供方" align="center">
         <template slot-scope="scope">
            <el-select v-model="scope.row.whether_workshop_supply" placeholder="请选择" size="small">
               <el-option label="是" value="1"></el-option>
               <el-option label="否" value="0"></el-option>
            </el-select>
         </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" align="center">
         <template slot-scope="scope">
            <el-button type="text" class="event_count" @click="handelCountButton(scope.row)">计算</el-button>
            <el-button type="text">删除</el-button>
         </template>
      </el-table-column>

      <!-- 新增 -->
      <div slot="append" class="table_footer">
         <div class="footer_button">新增</div>
      </div>
   </el-table>
</template>

<script>
import eventActionDefine from "./msgCompConfig";
export default {
   name: "Set",
   props: {
      customConfig: Object,
   },
   data() {
      return {
         data: this.customConfig.data,
         matterData: [],
      };
   },
   methods: {
      handelCountButton() {},

      Event_Center_getName() {
         let { formConfig, component } = this.customConfig;
         return `${formConfig?.form_name}-${component.columnStyle.title}`;
      },
   },
   mounted() {
      let { component, child_id, index } = this.customConfig;
      let initId = component.id;
      if (child_id) {
         initId = `${initId}__childId__${child_id.substr(0, 10)}`;
      }
      if (index > -1) {
         initId = `${initId}__index__${index}`;
      }
      window?.componentCenter?.register(initId, "comp", this, eventActionDefine);
   },
   destroyed() {
      let { component, child_id, index } = this.customConfig;
      let initId = component.id;
      if (child_id) {
         initId = `${initId}__childId__${child_id.substr(0, 10)}`;
      }
      if (index > -1) {
         initId = `${initId}__index__${index}`;
      }
      window?.componentCenter?.removeInstance(initId);
   },
};
</script>
