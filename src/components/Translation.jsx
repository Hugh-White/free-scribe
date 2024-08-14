import { LANGUAGES } from "../utils/presets";

export default function Translation(props) {
  const {
    textElement,
    toLanguage,
    setToLanguage,
    translating,
    generateTranslation,
  } = props;
  return (
    <>
      {/* <div className="flex flex-col gap-2 max-w-[400px] w-full mx-auto">
        {!translating && (
          <div className="flex flex-col gap-1">
            <p className="text-xs sm:text-sm font-medium text-slate-400 mr-auto">
              To Language:
            </p>
            <div className="flex items-stretch gap-2">
              <select
                value={toLanguage}
                className="flex-1 outline-none bg-white focus:outline-none border border-solid border-transparent hover:border-violet-300 duration-200 p-2 rounded"
                onChange={(e) => setToLanguage(e.target.value)}
              >
                <option value={"Select Language"}>Select Language</option>
                {Object.entries(LANGUAGES).map(([key, value]) => {
                  return (
                    <option key={key} value={value}>
                      {key}
                    </option>
                  );
                })}
              </select>
              <button
                onClick={generateTranslation}
                className="px-3 py-2 rounded-lg text-violet-300 hover:text-violet-700 specialBtn duration-300"
              >
                Translate
              </button>
            </div>
          </div>
        )}
        
      </div> */}
      {textElement && !translating && <p>{textElement}</p>}
      {!translating && (
        <div className="flex flex-col gap-1 mb-4">
          <p className="text-xs sm:text-sm font-medium text-slate-500 mr-auto">
            To language
          </p>
          <div className="flex items-stretch gap-2 sm:gap-4">
            <select
              value={toLanguage}
              className="flex-1 outline-none w-full focus:outline-none bg-white duration-200 p-2  rounded"
              onChange={(e) => setToLanguage(e.target.value)}
            >
              <option value={"Select language"}>Select language</option>
              {Object.entries(LANGUAGES).map(([key, value]) => {
                return (
                  <option key={key} value={value}>
                    {key}
                  </option>
                );
              })}
            </select>
            <button
              onClick={generateTranslation}
              className="specialBtn px-3 py-2 rounded-lg text-violet-400 hover:text-violet-600 duration-200"
            >
              Translate
            </button>
          </div>
        </div>
      )}

      {textElement && !translating && <p>{textElement}</p>}
      {translating && (
        <div className="grid place-items-center">
          <i className="fa-solid fa-spinner animate-spin"></i>
        </div>
      )}
    </>
  );
}
