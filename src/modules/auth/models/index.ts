export type TUser = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
};

export interface IFirebaseContext {
  user?: TUser | null;
  loading: boolean;
  error?: string;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, displayNamename: string) => void;
  logout: () => void;
}
