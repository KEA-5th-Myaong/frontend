import api from '../api/axiosInstance';

// (POST) 로그인
export async function postLogin(postData: unknown) {
  try {
    const { data } = await api.post('/auth/login', postData);
    return data;
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
}

// (POST)관리자 로그인
export async function postAdminLogin(postData: unknown) {
  try {
    const { data } = await api.post('/auth/admin-login', postData);
    return data;
  } catch (error) {
    console.error('관리자 로그인 실패:', error);
    throw error;
  }
}

// (GET) 이메일 중복 확인
export async function fetchCheckEmail(email: string) {
  try {
    const { data } = await api.get(`/auth/check-duplicate/email?email=${email}`);
    return data;
  } catch (error) {
    console.error('이메일 중복 확인 실패:', error);
    throw error;
  }
}

// (GET) 아이디 중복 확인
export async function fetchCheckUsername(username: string) {
  try {
    const { data } = await api.get(`/auth/check-duplicate/username?username=${username}`);
    return data;
  } catch (error) {
    console.error('아이디 중복 확인 실패:', error);
    throw error;
  }
}

// (POST) 로컬 회원가입
export async function postSignUp(signupData: unknown) {
  try {
    const { data } = await api.post('/auth/sign-up', signupData);
    return data;
  } catch (error) {
    console.error('로컬 회원가입 실패:', error);
    throw error;
  }
}

// (POST) 소셜 회원가입 추가 정보 입력
export async function postSignUpDetail(signupData: unknown) {
  try {
    const { data } = await api.post('/members', signupData);
    return data;
  } catch (error) {
    console.error('소셜 회원가입 추가 정보 입력 실패:', error);
    throw error;
  }
}

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

// (PUT) 비밀번호 변경
export async function putChangePassword(passwordData: { originPassword: string; newPassword: string }) {
  try {
    const { data } = await api.put('/members/password', passwordData);
    return data;
  } catch (error) {
    console.error('비밀번호 변경 실패:', error);
    throw error;
  }
}

// (POST) 프로필 사진 수정
export async function postProfilePic(formData: FormData) {
  try {
    const { data } = await api.post('/blog/profiles/pic', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    console.error('프로필 사진 수정 실패:', error);
    throw error;
  }
}

// (PUT) 프로필 정보 수정
export async function putChangeProfile(profileData: unknown) {
  try {
    await api.put('/blog/profiles', profileData);
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
