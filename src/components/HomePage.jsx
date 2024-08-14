import { useState, useEffect, useRef } from "react";

export default function HomePage(props) {
  const { setFile, setAudioStream } = props;

  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);

  const mimeType = "audio/webm";

  async function startRecording() {
    let tempStream;

    console.log("Start Recording...");

    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      tempStream = streamData;
    } catch (err) {
      console.log(err.message);
      return;
    }

    setRecordingStatus("recording");
    //Create new media recorder instance using the stream
    const media = new MediaRecorder(tempStream, { type: mimeType });
    mediaRecorder.current = media;

    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") {
        return;
      }
      if (event.data.size === 0) {
        return;
      }
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  }

  async function stopRecording() {
    setRecordingStatus("inactive");

    console.log("Stopped Recording");

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      setAudioStream(audioBlob);
      setAudioChunks([]);
      setDuration(0);
    };
  }

  useEffect(() => {
    if (recordingStatus === "inactive") {
      return;
    }

    const interval = setInterval(() => {
      setDuration((curr) => curr + 1);
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <main className="flex-1 flex flex-col gap-3 sm:gap-4 justify-center text-center pb-20">
      <h1 className="font-semibold text-5xl sm:text-6xl mg:text-7xl">
        Voice<span className="text-violet-500 bold">Draft</span>
      </h1>
      <h3 className="font-medium md:text-large">
        Record <span className="text-violet-500">&rarr;</span> Transcribe{" "}
        <span className="text-violet-500">&rarr;</span> Translate
      </h3>
      <button
        onClick={
          recordingStatus === "recording" ? stopRecording : startRecording
        }
        className={
          "flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 specialBtn px-4 py-2 rounded-lg text-violet-500" +
          (recordingStatus === "recording" ? " drop-shadow-glow" : "")
        }
      >
        <p className="text-violet-500">
          {recordingStatus === "inactive" ? "Record" : `Stop Recording`}
        </p>
        <div className="flex items-center gap-2">
          {duration && <p className="text-sm">{duration}s</p>}
          <i
            className={
              "fa-solid fa-microphone duration-200" +
              (recordingStatus === "recording" ? " text-violet-300" : "")
            }
          ></i>
        </div>
      </button>
      <p className="text-base">
        Or{" "}
        <label className="text-violet-400 cursor-pointer hover:text-violet-700 duration-200">
          upload{" "}
          <input
            className="hidden"
            type="file"
            accept=".mp3, .wave"
            onChange={(e) => {
              const tempFile = e.target.files[0];
              setFile(tempFile);
            }}
          />
        </label>
        an mp3 file
      </p>
      <p className="italic text-slate-400">Free Now, Free Forever</p>
    </main>
  );
}
