import { ProductType, ProductList, ProductListConfig } from '../types/product.type.ts'
import http from '../utils/http.ts'
import { SuccessResponse } from '../types/utils.type.ts'

const URL = 'products'
const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(URL, {
      params
    })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<ProductType>>(`${URL}/${id}`)
  }
}

export default productApi
