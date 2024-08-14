export default function Transcribing(props) {
  const { downloading } = props;
  //prettier-ignore
  return (
    <div className="flex flex-col items-center justify-center gap-10 md:gap-14 pb-24 p-4 flex-1">
      <div className="flex flex-col gap-2 sm:gap-4">
        <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
          <span className="text-violet-500 bold">Transcribing</span>
        </h1>
        <p className="italic text-slate-400 text-center">
          {!downloading
            ? "transcribing your garble..."
            : "gibberish decoding has commenced..."}
        </p>
      </div>
      
      <div className="flex flex-col gap-2 sm:gap-3 max-w-[400px] mx-auto w-full">
        {[0, 1, 2].map(val => {
          return (
            <div
              key={val}
              className={
                "rounded-full h-2 sm:h-3 bg-violet-500 loading " +
                `loading${val}`
              }
            ></div>
          );
        })}
      </div>
    </div>
  );
}
