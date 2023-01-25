import request from '@/utils/request'
//获取图片数据
export const reqSpuImageList=(spuId)=>request({
    url:`/admin/product/spuImageList/${spuId}`,
    method:'get'
})
//请求销售属性数据
export const reqspuSaleAttrList=(spuId)=>request({
    url:`/admin/product/spuSaleAttrList/${spuId}`,
    method:'get'
})
//请求平台数据
export const reqattrInfoList=({category1Id,category2Id,category3Id})=>request({
    url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method:'get'
})