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
//添加sku
export const reqAddSku=(skuInfo)=>request({
    url:'/admin/product/saveSkuInfo',
    method:'post',
    data:skuInfo
})
//查看当前sku列表
export const reqcurrentSkuList=(spuId)=>request({
    url:`/admin/product/findBySpuId/${spuId}`,
    method:'get'
})
//sku路由组件列表数据
export const reqSkuInfoList = (page, limit) => request({
    url: `/admin/product/list/${page}/${limit}`,
    method: 'get',
})
//上架
export const reqOnSale=(skuId)=>request({
    url:`/admin/product/onSale/${skuId}`,
    method:'get'
})
//下架
export const reqCancelSale=(skuId)=>request({
    url:`/admin/product/cancelSale/${skuId}`,
    method:'get'
})
//获取右侧抽屉sku数据
export const reqSkuInfo=(skuId)=>request({
    url:`/admin/product/getSkuById/${skuId}`,
    method:'get'
})