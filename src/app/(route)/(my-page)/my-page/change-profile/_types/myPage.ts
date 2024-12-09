export interface ProfileFormProps {
  name: string;
  blogIntro: string;
}

export interface ImageChangeProps {
  defaultPicUrl: string | null | undefined;
  setProfileImage: React.Dispatch<File | null>;
}
