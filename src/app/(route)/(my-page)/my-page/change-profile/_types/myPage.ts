export interface ProfileFormProps {
  userName: string;
  userEmail: string;
}

export interface ImageChangeProps {
  setProfileImage: React.Dispatch<File | null>;
}
