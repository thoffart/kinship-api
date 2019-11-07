import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { LikeService } from './like.service';
import { Response } from '../common/response.interface';

@Resolver('Like')
export class LikeResolver {
  constructor(
    @Inject('LikeService') private readonly likeService: LikeService
  ) { }

  @Query()
  async getCountPostLikes(@Args('id_post') id_post: number): Promise<Response> {
    const data = await this.likeService.getCountPostLikes(id_post);
    return { code: 200, data };
  }

  @Mutation()
  async likePost(@Args('id_post') id_post: number) {
    await this.likeService.likePost(id_post);
    return { code: 200, message: 'Post curtida com sucesso' };
  }

  @Mutation()
  async dislikePost(@Args('id_post') id_post: number) {
    await this.likeService.dislikePost(id_post);
    return { code: 200, message: 'Post descurtida com sucesso' };
  }

}