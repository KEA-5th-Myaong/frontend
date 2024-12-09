export interface ProfileFormProps {
  userName: string;
  userEmail: string;
}

export interface ImageChangeProps {
  defaultPicUrl: string | null | undefined;
  setProfileImage: React.Dispatch<File | null>;
}
