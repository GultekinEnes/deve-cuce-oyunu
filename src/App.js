import React, { useState, useEffect } from "react";

const App = () => {
  const [score, setScore] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeve, setIsDeve] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3); // Başlangıçta 3 saniye

  // Yeni bir Deve/Cüce mesajı oluştur
  const generateMessage = () => {
    const isDeve = Math.random() < 0.5; // Rastgele Deve veya Cüce oluştur
    setIsDeve(isDeve);
    setDisplayText(isDeve ? "DEVE" : "CÜCE");

    // Rastgele pozisyon belirle
    const randomX = Math.floor(Math.random() * (window.innerWidth - 100)); // X koordinatı
    const randomY = Math.floor(Math.random() * (window.innerHeight - 50)); // Y koordinatı
    setDisplayPosition({ x: randomX, y: randomY });

    setTimeLeft(3); // Yeni mesaj oluşturulduğunda sayaçı sıfırla
  };

  const [displayPosition, setDisplayPosition] = useState({ x: 0, y: 0 });

  // İlk render'da ve her 3 saniyede bir yeni bir mesaj oluştur
  useEffect(() => {
    generateMessage(); // İlk mesajı oluştur
    const interval = setInterval(() => {
      generateMessage(); // Yeni bir mesaj oluştur
    }, 3010);
    return () => clearInterval(interval); // Temizleme
  }, []);

  // Her saniyede bir zamanı azalt
  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft >= 1) {
        // 0'a kadar say
        setTimeLeft(timeLeft - 1);
      }
      if (timeLeft <= 1) {
        // Zaman 0 olduğunda puanı azalt
        setScore(score - 1);
      }
    }, 1000);
    // Temizleme
    return () => clearTimeout(timer);
  });

  // Buton tıklamasını kontrol et
  const handleClick = (isCorrect) => {
    if ((isCorrect && isDeve) || (!isCorrect && !isDeve)) {
      setScore(score + 1); // Doğru ise puanı artır
    } else {
      setScore(score - 1); // Yanlış ise puanı azalt
    }
    generateMessage(); // Yeni bir mesaj oluştur
  };
  return (
    <div>
      <h1>Deve Cüce Oyunu</h1>
      <p>Etrafta dolaşan renkli yazıda ne yazıyorsa o butonuna tıkla.</p>
      <p>Puan: {score}</p>
      <p
        className="custom-text"
        style={{
          position: "absolute",
          top: `${displayPosition.y}px`,
          left: `${displayPosition.x}px`,
        }}
      >
        {displayText}
      </p>
      <p>Kalan Süre: {timeLeft >= 0 ? timeLeft : 0} saniye</p>
      <button onClick={() => handleClick(true)}>
        DEVE
      </button>
      <button onClick={() => handleClick(false)}>
        CÜCE
      </button>
    </div>
  );
};

export default App;

