import { CategoryRepository, CreateCategoryRequest, UpdateCategoryRequest } from '../domain/Category';

export class CategoryService {
  constructor(private repository: CategoryRepository) {}

  async listCategories() {
    return this.repository.findAll();
  }

  async getCategoryTree() {
    return this.repository.findTree();
  }

  async createCategory(request: CreateCategoryRequest) {
    return this.repository.create(request);
  }

  async updateCategory(id: string, request: UpdateCategoryRequest) {
    return this.repository.update(id, request);
  }

  async deleteCategory(id: string) {
    return this.repository.delete(id);
  }
}

