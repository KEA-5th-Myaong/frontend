export interface ProfileFormProps {
  nickname: string;
  blogIntro: string;
}

export interface ImageChangeProps {
  defaultPicUrl: string | null | undefined;
  setProfileImage: React.Dispatch<File | null>;
}
