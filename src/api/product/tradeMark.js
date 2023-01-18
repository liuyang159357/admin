import request from '@/utils/request'
//获取品牌列表
export const reqTradeMarkList = (page, limit) => request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
})

//处理品牌
export const reqAddOrUpdateTradeMark = (params) => {
    if(params.id){
        return request({
            url:'/admin/product/baseTrademark/update',
            method:'put',
            data:params
        })
    }else{
        return request({
            url:'/admin/product/baseTrademark/save',
            method:'post',
            data:params
        })
    }
}

//删除品牌
export const reqDeleteTradeMark = (id) =>request({
    url:`/admin/product/baseTrademark/remove/${id}`,
    method:'delete'
})
