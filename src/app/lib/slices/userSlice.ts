import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  generatedImageId: number;
  selectedPrompt: string;
  imageSrc: string;
  isImageLoading: boolean;
}

const initialState = {
  generatedImageId: 2394,
  selectedPrompt: "",
  imageSrc: "",
  isImageLoading: false,
} satisfies UserState as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setImageId(state, action: PayloadAction<number>) {
      state.generatedImageId = action.payload;
    },
    setPromptText(state, action: PayloadAction<string>) {
      state.selectedPrompt = action.payload;
    },
    setImageSrc(state, action: PayloadAction<string>) {
      state.imageSrc = action.payload;
    },
    setImageLoading(state, action: PayloadAction<boolean>) {
      state.isImageLoading = action.payload;
    },
  },
});

export const { setImageId, setPromptText, setImageSrc, setImageLoading } =
  userSlice.actions;
export default userSlice;
