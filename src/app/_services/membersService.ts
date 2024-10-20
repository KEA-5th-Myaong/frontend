import api from '../api/axiosInstance';

// (GET) 현재 로그인한 회원의 정보 조회
export async function fetchMe() {
  try {
    const { data } = await api.get('/members/me');
    return data;
  } catch (error) {
    console.error('현재 로그인한 회원의 정보 조회 실패:', error);
    throw error;
  }
}

// (GET) 회원 정보 조회
export async function fetchMember(memberId: string) {
  try {
    const { data } = await api.get(`/members/${memberId}`);
    return data;
  } catch (error) {
    console.error('회원 정보 조회 실패:', error);
    throw error;
  }
}

// (GET) 회원 정보 조회(username만을 가지고)
export async function fetchMemberUsername(username: string) {
  try {
    const { data } = await api.get(`/members?username=${username}`);
    return data;
  } catch (error) {
    console.error('회원 정보 조회(username만을 가지고) 실패:', error);
    throw error;
  }
}

// (POST) 비밀번호 확인
export async function postCheckPassword(passwordData: unknown) {
  try {
    const { data } = await api.post('/members/check-password', passwordData);
    return data;
  } catch (error) {
    console.error('비밀번호 확인 실패:', error);
    throw error;
  }
}

// (POST) 프로필 사진 수정
export async function postProfilPic(formData: unknown) {
  try {
    const { data } = await api.post('/members/profile-pic', formData);
    return data;
  } catch (error) {
    console.error('프로필 사진 수정 실패:', error);
    throw error;
  }
}

// (POST) 기본 정보 수정
export async function postChangeProfile(memberData: unknown) {
  try {
    await api.post('/members', memberData);
  } catch (error) {
    console.error('기본 정보 수정 실패:', error);
    throw error;
  }
}

// (DELETE) 회원 탈퇴
export async function deleteMember() {
  try {
    await api.delete('/members');
  } catch (error) {
    console.error('회원 탈퇴 실패:', error);
    throw error;
  }
}
