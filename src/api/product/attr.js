import request from '@/utils/request'

//平台属性管理
//一级分类
export const reqCategoryList1 = () => request({
    url: '/admin/product/getCategory1',
    method: 'get'
})
//二级分类
export const reqCategoryList2 = (category1Id) => request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: 'get'
})
//二级分类
export const reqCategoryList3 = (category2Id) => request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: 'get'
})
//获取平台属性接口
export const reqAttrList = ({ category1, category2, category3 }) => request({
    url: `/admin/product/attrInfoList/${category1}/${category2}/${category3}`,
    method: 'get'
})
//添加属性与属性值
export const reqAddOrUpdateAttr = (data) => request({
    url: `/admin/product/saveAttrInfo`,
    method: 'post',
    data:data
})
