import api from '@/app/api/axiosInstance';

// (GET) 회원 정보 조회(블로그 접속 시)
export async function fetchMemberInfo(memberId: string) {
  try {
    const { data } = await api.get(`/members/${memberId}/info`);
    return data;
  } catch (error) {
    console.error('회원 정보 조회 실패:', error);
    throw error;
  }
}

// (POST) 사용자 팔로우
export async function postFollow(memberId: string) {
  try {
    const { data } = await api.post(`/members/${memberId}/follow`);
    return data;
  } catch (error) {
    console.error('사용자 팔로우 실패:', error);
    throw error;
  }
}

// (GET) 팔로잉 목록 조회
export async function fetchFollowing(memberId: string | string[], lastId: string) {
  try {
    const { data } = await api.get(`/members/${memberId}/following/${lastId}`);
    return data;
  } catch (error) {
    console.error('팔로잉 목록 조회 실패:', error);
    throw error;
  }
}

// (GET) 팔로워 목록 조회
export async function fetchFollowed(memberId: string | string[], lastId: string) {
  try {
    const { data } = await api.get(`/members/${memberId}/followed/${lastId}`);
    return data;
  } catch (error) {
    console.error('팔로워 목록 조회 실패:', error);
    throw error;
  }
}

// (GET) 사용자의 포스트 목록 조회
export async function fetchPost(memberId: string, lastId: string) {
  try {
    const { data } = await api.get(`/blog/posts/members/${memberId}/${lastId}`);
    return data;
  } catch (error) {
    console.error('사용자의 포스트 목록 조회 실패:', error);
    throw error;
  }
}

// (GET) 사용자의 특정 포스트 조회
export async function fetchPostPostId(postId: string | undefined) {
  try {
    const { data } = await api.get(`/blog/posts/${postId}`);
    return data;
  } catch (error) {
    console.error('사용자의 특정 포스트 조회 실패:', error);
    throw error;
  }
}

// (POST) 포스트 작성
export async function postPost(postData: unknown) {
  try {
    const { data } = await api.post('/blog/posts', postData);
    return data;
  } catch (error) {
    console.error('포스트 작성 실패:', error);
    throw error;
  }
}

// (POST) 포스트 이미지 업로드
export async function postPic(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('pic', file);

  try {
    const { data } = await api.post('/blog/posts/pic', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data.picUrl;
  } catch (error) {
    console.error('포스트 이미지 업로드 실패:', error);
    throw error;
  }
}

// (DELETE) 포스트 이미지 삭제
export async function deletePic(picUrl: string): Promise<void> {
  try {
    await api.delete(`/blog/posts/pic?url=${picUrl}`);
  } catch (error) {
    console.error('포스트 이미지 삭제 실패:', error);
    throw error;
  }
}

// (PUT) 포스트 수정
export async function putPost(postId: string, postData: unknown) {
  try {
    await api.put(`/blog/posts/${postId}`, postData);
  } catch (error) {
    console.error('포스트 수정 실패:', error);
    throw error;
  }
}

// (DELETE) 포스트 삭제
export async function deletePost(postId: string) {
  try {
    await api.delete(`/blog/posts/${postId}`);
  } catch (error) {
    console.error('포스트 삭제 실패:', error);
    throw error;
  }
}

// (POST) 댓글 작성
export async function postComments(commentData: unknown) {
  try {
    const { data } = await api.post('/blog/comments', commentData);
    return data;
  } catch (error) {
    console.error('댓글 작성 실패:', error);
    throw error;
  }
}

// (PUT) 댓글 수정
export async function putComments(commentId: string, commentData: unknown) {
  try {
    await api.put(`/blog/comments/${commentId}`, commentData);
  } catch (error) {
    console.error('댓글 수정 실패:', error);
    throw error;
  }
}

// (DELETE) 댓글 삭제
export async function deleteComments(commentId: string) {
  try {
    await api.delete(`/blog/comments/${commentId}`);
  } catch (error) {
    console.error('댓글 삭제 실패:', error);
    throw error;
  }
}

// (POST) 답글 작성
export async function postReplies(repliesData: unknown) {
  try {
    const { data } = await api.post('/blog/replies', repliesData);
    return data;
  } catch (error) {
    console.error('답글 작성 실패:', error);
    throw error;
  }
}

// (PUT) 답글 수정
export async function putReplies(replyId: string, repliesData: unknown) {
  try {
    const { data } = await api.put(`/blog/replies/${replyId}`, repliesData);
    return data;
  } catch (error) {
    console.error('답글 수정 실패', error);
    throw error;
  }
}

// (DELETE) 답글 삭제
export async function deleteReplies(replyId: string) {
  try {
    await api.delete(`/blog/replies/${replyId}`);
  } catch (error) {
    console.error('답글 삭제 실패:', error);
    throw error;
  }
}

// (PUT) 좋아요 표시
export async function putLike(postId: number) {
  try {
    const { data } = await api.put(`/blog/posts/${postId}/like`);
    return data;
  } catch (error) {
    console.error('좋아요 표시 실패:', error);
    throw error;
  }
}

// (PUT) 북마크 표시
export async function putBookmark(postId: number) {
  try {
    const { data } = await api.put(`/blog/posts/${postId}/bookmark`);
    return data;
  } catch (error) {
    console.error('북마크 표시 실패:', error);
    throw error;
  }
}

// (PUT) 신고하기
export async function putReport(postId: string) {
  try {
    await api.put(`/blog/posts/${postId}/report`);
  } catch (error) {
    console.error('신고하기 실패:', error);
    throw error;
  }
}
