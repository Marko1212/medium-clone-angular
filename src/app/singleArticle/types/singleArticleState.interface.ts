import { ArticleInterface } from 'src/app/shared/types/article.interface';

export interface SingleArticleStateInterface {
  isLoading: boolean;
  error: string | null;
  data: ArticleInterface | null;
}
