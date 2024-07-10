import { create } from "zustand";

interface TweetToUpdate {
  postId: string;
  id: string;
  name: string;
  email: string;
  body: string;
}

interface TweetToUpdateStore {
  postId: string;
  id: string;
  name: string;
  email: string;
  body: string;
  setTweetToUpdate: (field: keyof TweetToUpdate, value: string) => void;
  initializeTweetToUpdate: (tweet: Partial<TweetToUpdate>) => void;
  resetTweetToUpdate: () => void;
}

export const useTweetToUpdateStore = create<TweetToUpdateStore>((set) => ({
  postId: "",
  id: "",
  name: "",
  email: "",
  body: "",
  setTweetToUpdate: (field, value) =>
    set((state) => ({
      ...state,
      [field]: typeof value === "string" ? value.trim() : String(value).trim(),
    })),
  initializeTweetToUpdate: (tweet) =>
    set({
      postId: tweet.postId || "",
      id: tweet.id || "",
      name: tweet.name || "",
      email: tweet.email || "",
      body: tweet.body || "",
    }),
  resetTweetToUpdate: () =>
    set({
      postId: "",
      id: "",
      name: "",
      email: "",
      body: "",
    }),
}));
