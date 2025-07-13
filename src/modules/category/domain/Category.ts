export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  position: number;
  active: boolean;
  parent_id?: string | null;
  created_at: string;
  updated_at: string;
  children?: Category[];
}

export interface CreateCategoryRequest {
  name: string;
  slug: string;
  description?: string;
  meta_title?: string;
  meta_description?: string;
  position?: number;
  active?: boolean;
  parent_id?: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  slug?: string;
  description?: string;
  meta_title?: string;
  meta_description?: string;
  position?: number;
  active?: boolean;
  parent_id?: string;
}

export interface CategoryRepository {
  findAll(): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  findTree(): Promise<Category[]>;
  create(data: CreateCategoryRequest): Promise<Category>;
  update(id: string, data: UpdateCategoryRequest): Promise<Category>;
  delete(id: string): Promise<void>;
}
