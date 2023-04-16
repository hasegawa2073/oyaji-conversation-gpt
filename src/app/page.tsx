'use client';

import Image from 'next/image';
import { Noto_Sans_JP } from 'next/font/google';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import { speak, speakNothing, speakOjikandesu, speakWWW } from '@/utils/speak';

const notoSansJP = Noto_Sans_JP({
  weight: ['300', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  const [isFight, setIsFight] = useState(false);
  const [existOyaji3, setExistOyaji3] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [speakOk, setSpeakOk] = useState(true);

  const [isFetching, setIsFetching] = useState(false);
  const [speakerIsLeft, setSpeakerIsLeft] = useState(true);
  const [prompt, setPrompt] = useState(
    isOpen
      ? '今から会話をしてもらいます。シチュエーション：居酒屋で、高齢男性が2人で飲んでいます。あなたはそのうちの一人です。最初に発する挨拶を関西弁で書いてください。条件：挨拶には相手の名前を含めること(一般的な日本人の苗字でお願いします)'
      : '今から会話をしてもらいます。シチュエーション：居酒屋で食事を終えた高齢男性が2人います。あなたはそのうちの一人です。最初に発する挨拶を関西弁で書いてください。条件：挨拶には相手の名前を含めること(一般的な日本人の苗字でお願いします)',
  );
  const [response, setResponse] = useState('');

  type AudioObj = {
    bell: HTMLAudioElement;
    shrine: HTMLAudioElement;
    pour: HTMLAudioElement;
    people: HTMLAudioElement;
  };
  const [audioObj, setAudioObj] = useState<AudioObj>();

  useEffect(() => {
    speakNothing();
    setAudioObj({
      bell: new Audio('/bell.mp3'),
      shrine: new Audio('/shrine.mp3'),
      pour: new Audio('/pour.mp3'),
      people: new Audio('/people.mp3'),
    });
  }, []);

  const stopAllAudio = () => {
    for (const value of Object.values(audioObj as AudioObj)) {
      value.pause();
    }
  };

  const handleSubmit = async (): Promise<string> => {
    setSpeakerIsLeft((prev) => !prev);
    speakOk && speakWWW(speakerIsLeft);
    setIsFetching(true);
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    speakerIsLeft
      ? setPrompt(
          `あなたは関西の高齢漫才師でツッコミ担当です。会話相手の言葉${data.response}に対して、ツッコミを入れて返答してください。口語表現が好ましいです。`,
        )
      : setPrompt(
          `あなたは関西の高齢漫才師でボケ担当です。会話相手の言葉${data.response}に対して、ボケて返答してください。口語表現が好ましいです。`,
        );
    setResponse(data.response);
    setIsFetching(false);
    return data.response;
  };

  return (
    <main>
      <div className={notoSansJP.className}>
        <button
          className="absolute right-0 top-0 z-50 bg-black p-5 text-white"
          onClick={() => {
            setSpeakOk((prev) => !prev);
            speakOk && stopAllAudio();
          }}
        >
          {speakOk ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
          )}
        </button>
        <div className={`relative ${isOpen ? 'z-30' : 'z-0'}`}>
          <Image
            src="/shop-curtain.png"
            width={1280}
            height={640}
            alt="暖簾"
            className="mx-auto"
            priority
          />
        </div>
        {!isFight ? (
          <>
            <div className="absolute bottom-8 left-[50%] z-30 min-w-max max-w-5xl -translate-x-[50%] bg-yellow-900 -sm:max-w-[90%]">
              <div className="px-40 pb-16 pt-10 -xl:px-20 -sm:px-10">
                <p className="mb-8 text-center text-3xl font-bold text-white">本日のお品書き</p>
                <div className="flex justify-center gap-10 text-center -lg:flex-col -sm:gap-5">
                  {!existOyaji3 && (
                    <div
                      onClick={async () => {
                        setIsFight(true);
                        speakOk && audioObj?.pour.play();
                        speakOk && audioObj?.people.play();
                        const message = await handleSubmit();
                        speakOk && speak(message, speakerIsLeft);
                      }}
                    >
                      <Button label="会話を盗み聞きする" />
                    </div>
                  )}
                  {!isOpen && (
                    <div
                      onClick={async () => {
                        setIsFight(true);
                        const message = await handleSubmit();
                        speakOk && speak(message, speakerIsLeft);
                      }}
                    >
                      <Button label="会話を聞く" />
                    </div>
                  )}
                  {!existOyaji3 && (
                    <div
                      onClick={() => {
                        setExistOyaji3((prev) => !prev);
                        speakOjikandesu();
                      }}
                    >
                      <Button label="閉店のお時間です" bgColor="bg-green-600" />
                    </div>
                  )}
                  {existOyaji3 && isOpen && (
                    <div
                      onClick={() => {
                        setIsOpen(false);
                        speakOk && audioObj?.bell.play();
                      }}
                    >
                      <Button label="店を出る" bgColor="bg-blue-600" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className={`absolute bottom-20 z-30 max-w-xl rounded-xl bg-gray-900 px-10 py-7 text-white -xl:bottom-40 -xl:left-0 -xl:right-0 -xl:mx-auto -md:max-w-md -sm:max-w-xs ${
                speakerIsLeft ? 'left-[30%]' : 'right-[30%]'
              }`}
            >
              <p
                className={`relative mb-5 text-xl font-bold before:absolute before:top-0 before:block before:border-[20px] before:border-transparent before:content-[''] ${
                  speakerIsLeft
                    ? 'text-left before:-left-20 before:border-r-gray-900'
                    : 'text-right before:-right-20 before:border-l-gray-900'
                }`}
              >
                {speakerIsLeft ? '左のおやじ' : '右のおやじ'}
              </p>
              {isFetching ? (
                <p className={`flex gap-4 pl-3 ${!speakerIsLeft && 'justify-end'}`}>
                  <span>www</span>
                  <span className="animate-spin">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </span>
                </p>
              ) : (
                <p className={`pl-3 ${!speakerIsLeft && 'text-right'}`}>
                  {response ? response : prompt}
                </p>
              )}
            </div>
            <div
              className="absolute left-0 top-0 z-30"
              onClick={() => {
                setIsFight(false);
                setIsOpen(true);
                setExistOyaji3(false);
                speakOk && audioObj?.shrine.play();
              }}
            >
              <Button label="戻る" bgColor="bg-gray-700" />
            </div>
            <div
              className="absolute bottom-0 right-0 z-30"
              onClick={async () => {
                const message = await handleSubmit();
                speakOk && speak(message, speakerIsLeft);
              }}
            >
              <Button label="会話の続きを聞く" bgColor="bg-green-600" isFetching={isFetching} />
            </div>
            <div
              className="absolute bottom-20 right-0 z-30"
              onClick={() => {
                setIsFight(false);
                speakOk && audioObj?.shrine.play();
              }}
            >
              <Button label="会話を止める" bgColor="bg-gray-600" />
            </div>
          </>
        )}
        {existOyaji3 && isOpen && (
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <Image
              src="/oyaji-03.png"
              width={999}
              height={889}
              alt="おやじ3"
              className="mx-auto w-full max-w-[1080px]"
              priority
            />
          </div>
        )}
        <div className="absolute bottom-0 z-0 flex min-h-[100vh] w-full items-end justify-between overflow-hidden -md:bottom-[40%]">
          <div className={`max-h-[100vh]`}>
            <Image
              src="/oyaji-01.png"
              width={810}
              height={1262}
              alt="おやじ1"
              className={`w-full max-w-[680px] transition-transform ${
                speakerIsLeft && 'scale-[1.2] -sm:scale-[1.3]'
              }`}
            />
          </div>
          <div className={`max-h-[100vh]`}>
            <Image
              src="/oyaji-02.png"
              width={805}
              height={864}
              alt="おやじ2"
              className={`w-full max-w-[760px] transition-transform ${
                !speakerIsLeft && 'scale-[1.3]'
              }`}
            />
          </div>
        </div>
        <Image
          src="/background-image.jpg"
          alt="居酒屋の前"
          fill
          priority
          style={{ objectFit: 'cover' }}
          className="relative -z-50"
        />
      </div>
    </main>
  );
}
