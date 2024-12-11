import { useQueryClient } from '@tanstack/react-query';
import { putLike, putBookmark } from '../(route)/(blog)/blog/[username]/_services/blogService';
import { PostProps } from '../(route)/(main-page)/main/_types/main-page';
import useCustomMutation from './useCustomMutation';

type MutationContext = {
  previousPosts: PostProps[];
};

interface BookmarkResponse {
  data: {
    bookmark: boolean;
  };
}

const useLoveAndBookmark = (
  posts: PostProps[],
  setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>,
  memberId?: number,
  lastId?: string,
) => {
  const queryClient = useQueryClient();

  const loveMutation = useCustomMutation<unknown, number>(putLike, {
    // mutation 완료 후 실행되는 함수
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', memberId] });
    },
  });

  const bookmarkMutation = useCustomMutation<BookmarkResponse, number>(putBookmark, {
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['bookmarkPosts', lastId] });
      await queryClient.cancelQueries({ queryKey: ['post', memberId] });
      const previousPosts = [...posts];

      setPosts((prev) =>
        prev.map((post) => {
          if (post.postId === postId) {
            return {
              ...post,
              isBookmarked: !post.isBookmarked,
            };
          }
          return post;
        }),
      );

      return { previousPosts } as MutationContext;
    },
    onError: (_, __, context) => {
      if ((context as MutationContext)?.previousPosts) {
        setPosts((context as MutationContext).previousPosts);
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['bookmarkPosts', lastId] });
      queryClient.invalidateQueries({ queryKey: ['post', memberId] });
      return response.data.bookmark;
    },
  });

  return { loveMutation, bookmarkMutation };
};

export default useLoveAndBookmark;
