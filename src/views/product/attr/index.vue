<script setup lang="ts">
import Category from '@/components/Category/index.vue'
import userCategoryStore from "@/store/modules/category.ts";
import {nextTick, onBeforeUnmount, reactive, ref, watch} from "vue";
import {reqAddOrUpdateAttr, reqAttr, reqRemoveAttr} from "@/api/product/attr";
import type {AttrObj, AttrResponseData, AttrValue} from "@/api/product/attr/type.ts";
import {ElMessage} from "element-plus";

let categoryStore = userCategoryStore()


//存储已有的属性与属性值
let attrArr = ref<any>([])

//监听仓库三级分类ID变化
watch(() => categoryStore.c3Id, () => {
  getAttr()
})
//获取已有的属性与属性值方法
const getAttr = async () => {
  let {c1Id, c2Id, c3Id} = await categoryStore
  //获取分类下的已有的属性与属性值
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  // console.log('reqAttr', result);
  if (result.code === 200) {
    attrArr.value = result.data
  }
}
//定义card组件内容切换变量
let scene = ref<number>(0) //scene=0,显示table,scene=1,展示添加与修改属性结构

const cancel = () => {
  scene.value = 0
}

//收集新增的属性的数据
let attrParams = reactive<AttrObj>({
  attrName: '',//新增的属性的名字
  attrValueList: [], //新增的属性值数组
  categoryId: 0, //三级分类的ID
  categoryLevel: 3//代表的是三级分类
})

const addAttrValue = () => {
  //点击添加属性值按钮的时候,向数组添加一个属性值对象
  attrParams.categoryId = categoryStore.c3Id as number
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,//控制每一个属性值编辑模式与切换模式的切换
  })

  //获取最后el-input组件聚焦
  nextTick(()=>{
    inputAttr.value[attrParams.attrValueList.length-1].focus()
  })
}

//添加属性按钮的回调
const addAttr = () => {
  //每一次点击的时候,先清空一下数据再收集数据
  Object.assign(attrParams, {
    attrName: '',//新增的属性的名字
    attrValueList: [], //新增的属性值数组
    categoryId: categoryStore.c3Id, //三级分类的ID
    categoryLevel: 3//代表的是三级分类
  })

  //切换为添加与修改属性的结构
  scene.value = 1
}

//保存按钮的回调
const save = async () => {
  let result = await reqAddOrUpdateAttr(attrParams)
  if (result.code === 200) {
    //切换场景
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功'
    })

    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败'
    })
  }
}

//属性值表单元素失却焦点事件回调
const toLook = (row: AttrValue, $index: number) => {
  //非法情况判断1
  if(row.valueName.trim() === ''){
    //删除调用对应属性值为空的元素
    attrParams.attrValueList.splice($index,1)
    //提示信息
    ElMessage({
      type:  'error',
      message:  '属性值不能为空'
    })
    return
  }

  //非法情况2
  let repeat = attrParams.attrValueList.find((item)=>{
    //切记把当前失却焦点属性值对象从当前数组扣除判断
    if (item != row){
      return item.valueName ===  row.valueName
    }
  })

  if (repeat){
    //将重复的属性值从数组当中干掉
    attrParams.attrValueList.splice($index,1)

    ElMessage({
      type:'error',
      message:'属性值不能重复'
    })
    return;
  }

  //相应的属性值对象flag:变为false,展示div
  row.flag = false
}
//属性值div点击事件
const toEdit = (row: AttrValue, $index: number) => {
  //相应的属性值对象flag:变为true,展示input
  row.flag = true

  //nextTick:响应式数据发生变化,获取更新的DOM(组件实例)
  nextTick(()=>{
    inputAttr.value[$index].focus()
  })
}

//准备一个数组:将来存储对应的组件实例el-input
let inputAttr = ref<any>([])

//table表格修改已有属性按钮的回调
const updateAttr  = (row:AttrObj) =>{
  //切换为添加与修改属性的结构
  scene.value = 1
  //将已有的属性对象赋值给attrParams对象即为
  //ES6->Object.assign进行对象的合并

  // Object.assign(attrParams, row)  //浅拷贝
  Object.assign(attrParams,JSON.parse(JSON.stringify(row)))  // 深拷贝 (创建一个新的对象和数组，将原对象的各项属性的“值”（数组的所有元素）拷贝过来，是“值”而不是“引用”)
}
//删除某一个已有的属性方法回调
const deleteAttr = async (attrId:number)=>{
  //发相应的删除已有的属性的请求
  let result:any = await reqRemoveAttr(attrId)

  if (result.code ==200){
    ElMessage({
      type:'success',
      message:'删除成功'
    })
//获取一次已有的属性与属性值
    getAttr()

  }else{
    ElMessage({
      type:'error',
      message:'删除失败'
    })
  }
}
//路由组件销毁的时候，把仓库分类相关的数据清空
onBeforeUnmount(()=>{
  //清空仓库的数据
  categoryStore.$reset()
})

</script>

<template>

  <!-- 三级分类全局组件-->
  <category :scene="scene"/>

  <el-card style="margin: 10px 0px">
    <el-button type="primary" size="default" icon="Plus"
               :disabled="categoryStore.c3Id ? false : true"
               @click="addAttr"
    >添加属性
    </el-button>

    <div v-show="scene === 0">
      <el-table border style="margin:10px 0px" :data="attrArr">
        <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"></el-table-column>
        <el-table-column label="属性名称" width="120px" prop="attrName">

        </el-table-column>
        <el-table-column label="属性值名称">
          <!-- row：已有的属性对象 -->
          <template #="{row,index}">
            <el-tag v-for="(item,index) in row.attrValueList" :key="item.id">
              {{ item.valueName }}
            </el-tag>
          </template>

        </el-table-column>
        <el-table-column label="操作">
          <!-- row：已有的属性对象 -->
          <template #="{row,index}">
            <el-button type="primary" size="small" icon="Edit" @click="updateAttr(row)">编辑</el-button>
            <el-popconfirm :title="`你确定删除${row.attrName}`" width="200px" @confirm="deleteAttr(row.id)">
              <template #reference><el-button type="primary" size="small" icon="Delete"></el-button> </template>
            </el-popconfirm>
          </template>

        </el-table-column>
      </el-table>
    </div>

    <!--    展示添加属性与修改数据的结构-->
    <div v-show="scene === 1">
      <el-form>
        <el-form-item label="属性名称">
          <el-input v-model="attrParams.attrName" placeholder="请输入属性名称"></el-input>
        </el-form-item>

        <el-button type="primary" size="default" icon="Plus" @click="addAttrValue">添加属性值</el-button>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>

        <el-table border style="margin:10px 0px" :data="attrParams.attrValueList">
          <el-table-column
              label="序号"
              type="index"
              align="center"
              width="80px"></el-table-column>
          <el-table-column label="属性值名称" width="160px" prop="attrValueList">
            <!-- row:即为当前属性值对象 -->
            <template #default="{row,index}">
              <el-input
                  :ref="(vc:any) =>inputAttr[$index] = vc"
                  v-if="row.flag"
                  @blur="toLook(row,$index)"
                  size="small"
                  v-model="row.valueName" placeholder="请输入属性值名称"></el-input>
              <div v-else @click="toEdit(row,$index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>

          <el-table-column label="属性值操作">
            <template #="{row,index}">
              <el-button
                type="primary"
                size="small"
                icon="Delete"
                @click="attrParams.attrValueList.splice(index,1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--          保存和取消按钮-->
        <el-button type="primary" size="default" @click="save">保存</el-button>
        <el-button type="primary" size="default" @click="cancel">删除</el-button>


      </el-form>
    </div>
  </el-card>


</template>

<style scoped>

</style>