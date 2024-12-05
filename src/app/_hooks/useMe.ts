import { fetchMe } from '../_services/membersService';
import useCustomQuery from './useCustomQuery';

interface User {
  email: string;
  memberId: number;
  name: string;
  nickname: string;
  profilePicUrl: string | null;
  username: string;
}

export default function useMe() {
  return useCustomQuery<User>(['me'], fetchMe, {
    retry: false,
  });
}
