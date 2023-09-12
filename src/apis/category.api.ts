import http from '../utils/http.ts'
import { SuccessResponse } from '../types/utils.type.ts'
import { Category } from '../types/category.type.ts'

const URL = 'categories'

const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(URL)
  }
}

export default categoryApi
