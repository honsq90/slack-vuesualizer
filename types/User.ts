export type Profile = {
  title: string;
  real_name: string;
  display_name: string;
  status_text: string;
  status_emoji: string;
  iamge_original: string;
  email: string;
  first_name: string;
  last_name: string;
  image_48: string;
  image_72: string;
  image_192: string;
  image_512: string;
  image_1024: string;
};

export type User = {
  id: string;
  name: string;
  real_name: string;
  profile: Profile;
  is_admin: boolean;
  is_owner: boolean;
};
