import { useState, useEffect, useRef } from "react";
import Transcription from "./Transcription";
import Translation from "./Translation";

export default function Information(props) {
  const { output, finished } = props;
  const [tab, setTab] = useState("transcription");
  const [translation, setTranslation] = useState(null);
  const [toLanguage, setToLanguage] = useState("Select language");
  const [translating, setTranslating] = useState(null);
  console.log(output);

  const worker = useRef();

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("../utils/translate.worker.js", import.meta.url),
        {
          type: "module",
        }
      );
    }

    const onMessageReceived = async (e) => {
      switch (e.data.status) {
        case "initiate":
          console.log("DOWNLOADING");
          break;
        case "progress":
          console.log("LOADING");
          break;
        case "update":
          setTranslation(e.data.output);
          console.log(e.data.output);
          break;
        case "complete":
          setTranslating(false);
          console.log("DONE");
          break;
      }
    };

    worker.current.addEventListener("message", onMessageReceived);

    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  });

  const textElement =
    tab === "transcription" ? output.map((val) => val.text) : translation || "";

  function handleCopy() {
    navigator.clipboard.writeText(textElement);
  }

  function handleDownload() {
    const element = document.createElement("a");
    const file = new Blob([textElement], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Freescribe_${new Date().toString()}.txt`;
    document.body.appendChild(element);
    element.click();
  }

  function generateTranslation() {
    if (translating || toLanguage === "Select language") {
      return;
    }

    setTranslating(true);

    worker.current.postMessage({
      text: output.map((val) => val.text),
      src_lang: "eng_Latn",
      tgt_lang: toLanguage,
    });
  }

  return (
    <main className="flex-1 flex flex-col gap-3 sm:gap-4 justify-center text-center pb-20 mx-auto max-w-prose">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap">
        Your <span className="text-violet-500 bold">Transcription</span>
      </h1>

      <div className="grid grid-cols-2 mx-auto bg-white shadow rounded-full overflow-hidden items-center">
        <button
          onClick={() => setTab("transcription")}
          className={
            "px-4 py-2 duration-200 " +
            (tab === "transcription"
              ? " bg-violet-400 text-white"
              : " text-violet-300 hover:text-violet-800")
          }
        >
          Transcription
        </button>
        <button
          onClick={() => setTab("translation")}
          className={
            "px-4 py-2 duration-200 " +
            (tab === "translation"
              ? " bg-violet-400 text-white"
              : " text-violet-300 hover:text-violet-800")
          }
        >
          Translation
        </button>
      </div>
      <div className="my-8 flex flex-col-reverse max-w-prose mx-auto gap-4">
        {/* {(!finished || translating) && (
          <div className="grid place-items-center">
            <i className="fa-solid fa-spinner animate-spin"></i>
          </div>
        )} */}
        {tab === "transcription" ? (
          <Transcription {...props} textElement={textElement} />
        ) : (
          <Translation
            {...props}
            textElement={textElement}
            toLanguage={toLanguage}
            translating={translating}
            setTranslation={setTranslation}
            setTranslating={setTranslating}
            setToLanguage={setToLanguage}
            generateTranslation={generateTranslation}
          />
        )}
      </div>
      <div className="flex items-center gap-4 mx-auto">
        <button
          onClick={handleCopy}
          title="Copy"
          className="bg-white text-violet-400 px-2 aspect-square grid place-items-center hover:drop-shadow-glow duration-300 rounded-lg px-4"
        >
          <i className="fa-regular fa-copy"></i>
        </button>
        <button
          onClick={handleDownload}
          title="Download"
          className="bg-white text-violet-400 px-2 aspect-square grid place-items-center hover:drop-shadow-glow duration-300 rounded-lg px-4"
        >
          <i className="fa-solid fa-download"></i>
        </button>
      </div>
    </main>
  );
}
