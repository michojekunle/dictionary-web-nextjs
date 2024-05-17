import { Loader, Play } from "lucide-react";
import React from "react";
import { Separator } from "./ui/separator";

const WordDetails = ({
  loading,
  error,
  wordDetail,
}: {
  loading: boolean;
  error: any;
  wordDetail: any;
}) => {
  const wordData = {
    word: "hello",
    phonetic: "həˈləʊ",
    phonetics: [
      {
        text: "həˈləʊ",
        audio:
          "//ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3",
      },
      {
        text: "hɛˈləʊ",
      },
    ],
    origin: "early 19th century: variant of earlier hollo ; related to holla.",
    meanings: [
      {
        partOfSpeech: "exclamation",
        definitions: [
          {
            definition: "used as a greeting or to begin a phone conversation.",
            example: "hello there, Katie!",
            synonyms: [],
            antonyms: [],
          },
        ],
      },
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition: "an utterance of ‘hello’; a greeting.",
            example: "she was getting polite nods and hellos from people",
            synonyms: [],
            antonyms: [],
          },
        ],
      },
      {
        partOfSpeech: "verb",
        definitions: [
          {
            definition: "say or shout ‘hello’.",
            example: "I pressed the phone button and helloed",
            synonyms: [],
            antonyms: [],
          },
        ],
      },
    ],
  };

  const pronounceWord = (url: string | undefined) => {
    if (url) {
      const audio = new Audio(url);

      const handleEnded = () => {
        // Handle any cleanup or additional logic when audio playback ends
        audio.removeEventListener("ended", handleEnded);
      };

      audio.addEventListener("ended", handleEnded);

      return audio.play();
    } else return;
  };

  if (loading)
    return (
      <div className="min-h-52 flex items-center justify-center">
        <Loader className="text-6xl md:w-16 md:h-16 animate-spin" />
      </div>
    );

  if (error)
    return (
      <>
        {error?.server ? (
          <div className="flex flex-col gap-4 items-center text-center justify-center min-h-48">
            <p className="text-4xl md:text-7xl">🤔</p>
            <p className="text-xl">{error?.server?.title}</p>
            <p className="text-sm">{error?.server?.message}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 items-center text-center justify-center min-h-48">
            <p className="text-4xl md:text-7xl">🤔</p>
            <p className="text-xl">{error?.title}</p>
            <p className="text-sm">{error?.message}</p>
            <p className="text-sm">{error?.resolution}</p>
          </div>
        )}
      </>
    );

  return (
    <div className="w-full">
      <div className="w-full">
        {wordDetail && (
          <div className="" key={wordDetail.word}>
            <div className="flex w-full items-center justify-between mb-5">
              <div className="space-y-3">
                <h1 className="text-4xl md:text-6xl">{wordDetail?.word}</h1>
                {wordDetail?.phonetic && (
                  <p className="text-sm md:text-lg opacity-70">
                    {wordDetail?.phonetic}
                  </p>
                )}
              </div>
              {wordDetail?.phonetics.length > 0 && (
                <div className="w-12 h-12 md:w-16 md:h-16 flex rounded-full items-center justify-center border focus:border-orange-400 hover:border-orange-400 cursor-pointer">
                  <Play
                    className="w-5 h-5 md:w-7 md:h-7 text-gray-600 dark:text-white"
                    onClick={() =>
                      pronounceWord(wordDetail?.phonetics[0]?.audio)
                    }
                  />
                </div>
              )}
            </div>
            {wordDetail?.origin && (
              <div className="py-2 px-4 rounded-md border bg-inherit/70">
                <span className="italic font-bold">Origin:</span>{" "}
                {wordDetail?.origin}
              </div>
            )}
            <div className="mt-4 space-y-2">
              <p className="text-lg">
                Meaning{wordDetail.meanings.length > 1 && "s"}
              </p>
              <div className="space-y-4">
                {wordDetail?.meanings.map((meaning: any) => (
                  <div className="">
                    <div className="flex items-center gap-3">
                      <span className="font-bold italic">
                        {meaning.partOfSpeech}
                      </span>
                      <Separator className="flex-1" />
                    </div>
                    <div className="mt-3">
                      {meaning.definitions.map((definition: any, i: number) => (
                          <div className="flex items-start" key={definition.definition ?? i}>
                            <span className="mr-1 opacity-80 text-[7px] border rounded-full px-1 py-0.5">
                              {i + 1}
                            </span>
                            <div>
                              <p className="mb-2">{definition.definition}</p>
                              {definition?.example && (
                                <p className="opacity-60">
                                  i.e. {definition.example}
                                </p>
                              )}
                            </div>
                          </div>
                      ))}
                      <div className="mt-4 space-y-2">
                            {meaning.synonyms.length > 0 && (
                              <div className="flex gap-2 italic">
                                <span>
                                  Synonym{meaning.synonyms.length > 1 && "s"}
                                  :
                                </span>
                                {meaning.synonyms.join(", ")}
                              </div>
                            )}
                            {meaning.antonyms.length > 0 && (
                              <div className="flex gap-2 italic">
                                <span>
                                  Antonym{meaning.synonyms.length > 1 && "s"}
                                  :
                                </span>
                                {meaning.antonyms.join(", ")}
                              </div>
                            )}
                          </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordDetails;
