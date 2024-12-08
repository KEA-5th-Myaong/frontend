import { useQueryClient } from '@tanstack/react-query';
import { putLike, putBookmark } from '../(route)/(blog)/blog/[username]/_services/blogService';
import { PostProps } from '../(route)/(main-page)/main/_types/main-page';
import useCustomMutation from './useCustomMutation';

type MutationContext = {
  previousPosts: PostProps[];
};

const useLoveAndBookmark = (
  posts: PostProps[],
  setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>,
  memberId?: string,
  lastId?: string,
) => {
  const queryClient = useQueryClient();

  const loveMutation = useCustomMutation<unknown, number>(putLike, {
    // mutation 실행 전에 실행되는 onMutate
    onMutate: async (postId) => {
      // 진행중인 post 쿼리를 취소하여 충돌 방지
      await queryClient.cancelQueries({ queryKey: ['post', memberId] });
      const previousPosts = [...posts]; // 롤백을 위한 현재 posts 상태 저장
      // 낙관적 업데이트, UI 즉시 업데이트
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.postId === postId) {
            return {
              ...post,
              isLoved: !post.isLoved, // 좋아요 상태 토글
              lovedCount: post.isLoved ? post.lovedCount - 1 : post.lovedCount + 1,
            };
          }
          return post;
        }),
      );

      return { previousPosts } as MutationContext; // 이전 상태를 context로 반환하여 오류 발생 시 복구
    },
    onError: (_, __, context) => {
      if ((context as MutationContext)?.previousPosts) {
        setPosts((context as MutationContext).previousPosts);
      }
    },
    // mutation 완료 후 실행되는 함수
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', memberId] });
    },
  });

  const bookmarkMutation = useCustomMutation<unknown, number>(putBookmark, {
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['bookmarkPosts', lastId] });
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarkPosts', lastId] });
      queryClient.invalidateQueries({ queryKey: ['post', memberId] });
    },
  });

  return { loveMutation, bookmarkMutation };
};

export default useLoveAndBookmark;
