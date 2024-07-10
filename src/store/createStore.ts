import { create } from "zustand";

interface TweetToCreate {
  postId: string;
  id: string;
  name: string;
  email: string;
  body: string;
}

interface TweetToCreateStore {
  postId: string;
  id: string;
  name: string;
  email: string;
  body: string;
  setTweetToCreate: (field: keyof TweetToCreate, value: string) => void;
  resetTweetToCreate: () => void;
}

export const useTweetToCreateStore = create<TweetToCreateStore>((set) => ({
  postId: "",
  id: "",
  name: "",
  email: "",
  body: "",
  setTweetToCreate: (field, value) =>
    set((state) => ({
      ...state,
      [field]: typeof value === "string" ? value.trim() : String(value).trim(),
    })),
  resetTweetToCreate: () =>
    set({
      postId: "",
      id: "",
      name: "",
      email: "",
      body: "",
    }),
}));
