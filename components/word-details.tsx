import { Loader } from "lucide-react";
import React from "react";

const WordDetails = ({
  loading,
  error,
  wordDetails,
}: {
  loading: boolean;
  error: any;
  wordDetails: any[];
}) => {
  const wordData = [
    {
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
      origin:
        "early 19th century: variant of earlier hollo ; related to holla.",
      meanings: [
        {
          partOfSpeech: "exclamation",
          definitions: [
            {
              definition:
                "used as a greeting or to begin a phone conversation.",
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
    },
  ];

  if (loading)
    return (
      <div className="min-h-52 flex items-center justify-center">
        <Loader className="text-6xl md:w-16 md:h-16 animate-spin" />
      </div>
    );

  if (error)
    return (
      <>
      <pre>
        {JSON.stringify(error, null, 2)}
      </pre>
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
        {wordDetails.length > 0 &&
          wordDetails.map((wordDetail) => (
            <div className="">
              // display
              <div className="flex w-full items-center justify-between">
                <div className="">

                </div>
              </div>
              <div className="w-full p-5">
                <pre className="w-52 overflow-scroll">
                  {JSON.stringify(wordDetail, null, 2)}
                </pre>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WordDetails;
