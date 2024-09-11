import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  setImageLoading,
  setImageSrc,
  setPromptText,
} from "../lib/slices/userSlice";
import axios from "axios";

export const TextArea = () => {
  const selectedPrompt = useAppSelector((state) => state.user.selectedPrompt);
  const isLoading = useAppSelector((state) => state.user.isImageLoading);
  const dispatch = useAppDispatch();
  const [taskId, setTaskId] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const generateImageHandler = async (e: any) => {
    e.preventDefault();
    if (selectedPrompt === "") return;
    if (isLoading) return;
    try {
      const res = await axios.post("192.168.8.77:5000/enqueue", {
        data: {
          prompt: selectedPrompt,
          userId: Date.now(),
        },
      });
      setTaskId(res.data.task_id);
      pollTaskStatus(res.data.task_id);
    } catch (err: any) {
      setError(err?.message);
    }
  };

  const pollTaskStatus = (task_id: number) => {
    dispatch(setImageLoading(true));
    dispatch(setImageSrc(""));
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `http://192.168.8.77:5000/result/${task_id}`
        );
        console.log(res);
        if (res.data.state !== "PENDING") {
          clearInterval(interval);
          if (res.status === 200) {
            dispatch(setImageSrc(`data:image/png;base64,${res.data.image}`));
            dispatch(setImageLoading(false));
          } else {
            setError("Task failed or no result found.");
            dispatch(setImageLoading(false));
          }
        }
      } catch (err: any) {
        clearInterval(interval);
        setError(err?.message);
        dispatch(setImageLoading(false));
      }
    }, 2000);
  };
  return (
    <div className=" absolute bottom-20 w-full p-2">
      <form>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="px-4 py-2 bg-white rounded-t-lg">
            <label className="sr-only">Your prompt</label>
            <textarea
              id="comment"
              value={selectedPrompt}
              rows={5}
              onChange={(e) => dispatch(setPromptText(e.currentTarget.value))}
              className="w-full text-sm text-gray-900 bg-white p-2"
              placeholder="Write a prompt..."
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200">
            <button
              onClick={(e) => generateImageHandler(e)}
              className="inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-orange-700 rounded-lg focus:ring-4 focus:ring-blue-200"
            >
              generate image
            </button>
            <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
              <button
                type="button"
                className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 12 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                  />
                </svg>
                <span className="sr-only">Attach file</span>
              </button>
              <button
                type="button"
                className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 "
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
                <span className="sr-only">Upload image</span>
              </button>
            </div>
          </div>
        </div>
      </form>
      <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">
        Images generated by free and open sourced models can generate NSFW
        content! <br />
        <a
          href="#"
          className="text-blue-600 dark:text-blue-500 hover:underline"
        >
          Community Guidelines
        </a>
        .
      </p>
    </div>
  );
};
