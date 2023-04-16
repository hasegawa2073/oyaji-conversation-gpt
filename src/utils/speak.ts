export const speak = (text: string, speakerIsLeft = true, targetVoice = 'Google 日本語') => {
  const voice = speechSynthesis.getVoices().find((voice) => {
    return voice.name === targetVoice;
  });
  if ('speechSynthesis' in window) {
    const uttr = new SpeechSynthesisUtterance();
    uttr.text = text;
    uttr.lang = 'ja-JP';
    speakerIsLeft ? (uttr.pitch = 0.5) : (uttr.pitch = 0.3);
    speakerIsLeft ? (uttr.rate = 0.6) : (uttr.rate = 0.7);
    if (voice) {
      uttr.voice = voice;
    }
    window.speechSynthesis.speak(uttr);
  } else {
    alert('大変申し訳ありません。このブラウザは音声合成に対応していません。');
  }
};

export const speakWWW = (speakerIsLeft = true, targetVoice = 'Google 日本語') => {
  const voice = speechSynthesis.getVoices().find((voice) => {
    return voice.name === targetVoice;
  });
  if ('speechSynthesis' in window) {
    const uttr = new SpeechSynthesisUtterance();
    speakerIsLeft
      ? (uttr.text = 'あはははははははははははwwww')
      : (uttr.text = 'wwwwあはははははははははははw');
    uttr.lang = 'ja-JP';
    speakerIsLeft ? (uttr.pitch = 0.5) : (uttr.pitch = 0.3);
    speakerIsLeft ? (uttr.rate = 0.6) : (uttr.rate = 0.7);
    if (voice) {
      uttr.voice = voice;
    }
    window.speechSynthesis.speak(uttr);
  } else {
    alert('大変申し訳ありません。このブラウザは音声合成に対応していません。');
  }
};

export const speakOjikandesu = (targetVoice = 'Google 日本語') => {
  const voice = speechSynthesis.getVoices().find((voice) => {
    return voice.name === targetVoice;
  });
  if ('speechSynthesis' in window) {
    const uttr = new SpeechSynthesisUtterance();
    uttr.pitch = 0.3;
    uttr.rate = 0.7;
    uttr.text = 'お客様すんません。お時間ですぅ。';
    if (voice) {
      uttr.voice = voice;
    }
    window.speechSynthesis.speak(uttr);
  } else {
    alert('大変申し訳ありません。このブラウザは音声合成に対応していません。');
  }
};
