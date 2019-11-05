
export interface CreatePostInput {
  texto: string;
}

export interface UpdatePostInput {
  id: number;
  texto?: string;
}