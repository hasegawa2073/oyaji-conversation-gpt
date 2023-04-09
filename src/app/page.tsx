'use client';

import Image from 'next/image';
import { Noto_Sans_JP } from 'next/font/google';
import { useState } from 'react';
import Button from '../components/Button';

const notoSansJP = Noto_Sans_JP({
  weight: ['300', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  const [isFight, setIsFight] = useState(false);
  const [existOyaji3, setExistOyaji3] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const [isFetching, setIsFetching] = useState(false);
  const [speakerIsLeft, setSpeakerIsLeft] = useState(true);
  const [prompt, setPrompt] = useState(
    isOpen
      ? '居酒屋で、高齢男性が2人で飲んでいます。一人目が言う挨拶を書いてください。相手は架空の日本人です。メッセージには相手の名前を含んでください。'
      : '居酒屋で食事を終えた高齢男性が2人います。一人目が言う挨拶を書いてください。相手は架空の日本人です。メッセージには相手の名前を含んでください。',
  );
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    setSpeakerIsLeft((prev) => !prev);
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
      ? setPrompt(`${data.response}に対して、関西の高齢漫才師っぽく、ツッコミを入れてください。`)
      : setPrompt(`${data.response}に対して、関西の高齢漫才師っぽく、ボケてください。`);
    setResponse(data.response);
    setIsFetching(false);
  };

  return (
    <main>
      <div className={notoSansJP.className}>
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
                      onClick={() => {
                        setIsFight(true);
                        handleSubmit();
                      }}
                    >
                      <Button label="会話を盗み聞きする" />
                    </div>
                  )}
                  {!isOpen && (
                    <div
                      onClick={() => {
                        setIsFight(true);
                        handleSubmit();
                      }}
                    >
                      <Button label="会話を聞く" />
                    </div>
                  )}
                  {!existOyaji3 && (
                    <div
                      onClick={() => {
                        setExistOyaji3((prev) => !prev);
                      }}
                    >
                      <Button label="閉店のお時間です" bgColor="bg-green-600" />
                    </div>
                  )}
                  {existOyaji3 && isOpen && (
                    <div onClick={() => setIsOpen(false)}>
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
                <p className={`pl-3 ${!speakerIsLeft && 'text-right'}`}>www</p>
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
              }}
            >
              <Button label="戻る" bgColor="bg-gray-700" />
            </div>
            <div
              className="absolute bottom-0 right-0 z-30"
              onClick={() => {
                handleSubmit();
              }}
            >
              <Button label="会話の続きを聞く" bgColor="bg-green-600" />
            </div>
            <div
              className="absolute bottom-20 right-0 z-30"
              onClick={() => {
                setIsFight(false);
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
            />
          </div>
        )}
        <div className="absolute bottom-0 z-0 flex w-full items-end justify-between -md:bottom-[45%]">
          <div className="max-h-[100vh] overflow-hidden">
            <Image
              src="/oyaji-01.png"
              width={810}
              height={1262}
              alt="おやじ1"
              className={`w-full max-w-[760px] transition-transform ${
                speakerIsLeft && 'scale-[1.35]'
              }`}
            />
          </div>
          <div className="max-h-[100vh] overflow-hidden">
            <Image
              src="/oyaji-02.png"
              width={805}
              height={864}
              alt="おやじ2"
              className={`w-full max-w-[760px] transition-transform ${
                !speakerIsLeft && 'scale-[1.35]'
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
