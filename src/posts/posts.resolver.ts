import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { PaginationOptionsInterface } from 'src/common/paginate/pagination.options.interface';
import { CreatePostInput, UpdatePostInput } from './posts.interface';


@Resolver('Post')
export class PostsResolver {
  constructor(
    private readonly postService: PostsService,
  ) { }

  @Query()
  async getPost(@Args('id') id: number): Promise<any> {
    const data = await this.postService.get(id);
    return { code: 200, data };
  }

  @Query()
  async getAllPosts(@Args('limit') limit: number, @Args('offset') offset: number): Promise<any> {
    const options: PaginationOptionsInterface = { limit, offset };
    const data = await this.postService.getAll(options);
    return { code: 200, data };
  }

  @Mutation()
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput): Promise<any> {
    console.log('teste');
    const data = await this.postService.create(createPostInput);
    return { code: 200, message: 'Post criado com sucesso', data };
  }

  @Mutation()
  async updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput): Promise<any> {
    await this.postService.update(updatePostInput);
    return { code: 200, message: 'Post atualizado com sucesso' };
  }

  @Mutation()
  async deletePost(@Args('id') id: number) {
    await this.postService.delete(id);
    return { code: 200, message: 'Post deletado com sucesso' };
  }

}
