import request from '@/utils/request'
//获取SPU信息列表
export const reqSpuInfoList = (page, limit, category3Id) => request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: { category3Id }
})
//获取Spu信息
export const reqSpu = (id) => request({
    url: `/admin/product/getSpuById/${id}`,
    method: 'get'
})
//获取品牌信息
export const reqTrademarkList = () => request.get('/admin/product/baseTrademark/getTrademarkList')
//获取SPU图标的接口
export const reqSpuImageList = (id) => request({
    url: `/admin/product/spuImageList/${id}`,
    method: 'get'
})
//获取销售属性  (最多3个)
export const reqSaleAttrList = () => request.get('/admin/product/baseSaleAttrList')
//添加spu
export const reqAddSpu=(data)=>request({
    url:'/admin/product/saveSpuInfo',
    method:'post',
    data:data
})
//修改或者添加spu
export const reqUpdateOrAddSpu=(spuInfo)=>{
    if(spuInfo.id){
        return request({
            url:'/admin/product/updateSpuInfo',
            method:'post',
            data:spuInfo
        })
    }else{
        return request({
            url:'/admin/product/saveSpuInfo',
            method:'post',
            data:spuInfo
        })
    }
}
//删除Spu
export const reqDeleteSpu=(spuId)=>request({
    url:`/admin/product/deleteSpu/${spuId}`,
    method:'delete'
})