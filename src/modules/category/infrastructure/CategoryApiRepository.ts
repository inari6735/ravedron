import { CategoryRepository, Category, CreateCategoryRequest, UpdateCategoryRequest } from '../domain/Category';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export class CategoryApiRepository implements CategoryRepository {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://127.0.0.1:8000/api') {
    this.baseUrl = baseUrl;
  }

  async findAll(): Promise<Category[]> {
    const response = await fetch(`${this.baseUrl}/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const result: ApiResponse<Category[]> = await response.json();
    return result.data;
  }

  async findById(id: string): Promise<Category | null> {
    const response = await fetch(`${this.baseUrl}/categories/${id}`);
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error('Failed to fetch category');
    }
    const result: ApiResponse<Category> = await response.json();
    return result.data;
  }

  async findTree(): Promise<Category[]> {
    const response = await fetch(`${this.baseUrl}/categories/tree`);
    if (!response.ok) {
      throw new Error('Failed to fetch category tree');
    }
    const result: ApiResponse<Category[]> = await response.json();
    return result.data;
  }

  async create(data: CreateCategoryRequest): Promise<Category> {
    const response = await fetch(`${this.baseUrl}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create category');
    }
    const result: ApiResponse<Category> = await response.json();
    return result.data;
  }

  async update(id: string, data: UpdateCategoryRequest): Promise<Category> {
    const response = await fetch(`${this.baseUrl}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update category');
    }
    const result: ApiResponse<Category> = await response.json();
    return result.data;
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/categories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete category');
    }
  }
}
