export const speak = (text: string, speakerIsLeft = true, targetVoice = 'Google 日本語') => {
  const voice = speechSynthesis.getVoices().find((voice) => {
    return voice.name === targetVoice;
  });
  if ('speechSynthesis' in window) {
    const uttr = new SpeechSynthesisUtterance();
    uttr.text = text;
    uttr.lang = 'ja-JP';
    speakerIsLeft ? (uttr.pitch = 0.5) : (uttr.pitch = 0.3);
    speakerIsLeft ? (uttr.rate = 0.8) : (uttr.rate = 0.9);
    if (voice) {
      uttr.voice = voice;
    }
    window.speechSynthesis.speak(uttr);
  } else {
    alert('大変申し訳ありません。このブラウザは音声合成に対応していません。');
  }
};
