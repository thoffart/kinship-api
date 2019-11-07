import { AuthService } from '../auth/auth.service';
import { HttpException, Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './posts.entity';
import { Pagination } from 'src/common/paginate/pagination';
import { PaginationOptionsInterface } from 'src/common/paginate/pagination.options.interface';
import { CreatePostInput, UpdatePostInput } from './posts.interface';

@Injectable()
export class PostsService {
  private _relations: string[] = [
    'usuario',
    'likes',
    'comentarios'
  ];

  constructor(
    @InjectRepository(Posts) private readonly postsRepository: Repository<Posts>,
    @Inject(AuthService) private readonly authService: AuthService,
  ) { }

  get relations(): string[] {
    return this._relations;
  }

  set relations(relation: string[]) {
    this._relations = relation;
  }

  async get(id: number): Promise<Posts> {
    const post = await this.postsRepository.findOne(id, {
      relations: this.relations
    });

    return post;
  }
  
  async getAll(options: PaginationOptionsInterface): Promise<Pagination<Posts>> {
    const [posts, total] = await this.postsRepository.findAndCount(
      {
        relations: this.relations,
        take: options.limit,
        skip: options.offset,
        order: { created_at: "DESC" }
      }
    );
    const list: any[] = posts;

    return await new Pagination<Posts>({ list, total });
  }

  async create(createPostInput: CreatePostInput): Promise<Posts> {
    const usuario = await this.authService.getAuthUser();
    const post = await this.postsRepository.save(this.postsRepository.create({ ...createPostInput, usuario }));
    return await this.get(post.id);
  }

  async update(updatePostInput: UpdatePostInput): Promise<void> {
    const post = await this.postsRepository.findOne(updatePostInput.id);

    if (!post) {
      throw new HttpException('Post não encontrado', 409);
    }

    await this.postsRepository.save(await this.postsRepository.preload(updatePostInput));
  }

  async delete(id: number): Promise<void> {
    const post = await this.postsRepository.findOne(id);
    await this.postsRepository.remove(post);
  }

}