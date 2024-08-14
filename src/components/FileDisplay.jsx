import { useRef, useEffect } from "react";

export default function FileDisplay(props) {
  const { file, audioStream, handleAudioReset, handleFormSubmission } = props;
  const audioRef = useRef();

  return (
    <main className="flex-1 flex flex-col gap-3 sm:gap-4 justify-center text-center pb-20 w-72 max-w-full mx-auto sm:w-96">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
        Your <span className="text-violet-500 bold">File</span>
      </h1>
      <div className="flex flex-col text-left my-4">
        <h3 className="font-semibold">Name</h3>
        <p>{file ? file?.name : "Custom Audio"}</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <button
          className="text-slate-400 hover:text-violet-600 duration-200"
          onClick={handleAudioReset}
        >
          Reset
        </button>
        <button
          onClick={handleFormSubmission}
          className="specialBtn px-3 py-2 rounded-lg text-violet-500 flex items-center gap-2 font-medium"
        >
          <p>Transcribe</p>
          <i className="fa-solid fa-pencil"></i>
        </button>
      </div>
    </main>
  );
}
