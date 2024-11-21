import React, { useState, useEffect } from "react";
import Card from "./components/Card";

const App = () => {
  const [dob, setDob] = useState(localStorage.getItem("dob") || ""); // Tug'ilgan sana
  const [ageDetails, setAgeDetails] = useState(null); // Yosh ma'lumotlari
  const [zodiacSign, setZodiacSign] = useState(
    localStorage.getItem("zodiacSign") || ""
  ); // Burj
  const [chineseZodiac, setChineseZodiac] = useState(
    localStorage.getItem("chineseZodiac") || ""
  ); // Muchal
  const [showDetails, setShowDetails] = useState(false); // Batafsil ko'rsatish holati
  const [zodiacOpen, setZodiacOpen] = useState(false); // Batafsil ko'rsatish holati
  const [animalsOpen, setAnimalsOpen] = useState(false); // Batafsil ko'rsatish holati

  // Tug'ilgan sanani hisoblash
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const ageInMilliseconds = today - birthDate;
    return {
      Yil: Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)),
      Oy: Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 30.44)),
      Hafta: Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 7)),
      Kun: Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24)),
      Soat: Math.floor(ageInMilliseconds / (1000 * 60 * 60)),
      Minut: Math.floor(ageInMilliseconds / (1000 * 60)),
      Sekund: Math.floor(ageInMilliseconds / 1000),
    };
  };

  // Burj va Muchal hisoblash
  const getZodiacSign = (dob) => {
    const month = new Date(dob).getMonth() + 1;
    const day = new Date(dob).getDate();
    const zodiac = [
      { sign: "Qo'y", months: [3, 4], days: [21, 19] },
      { sign: "Buzoq", months: [4, 5], days: [20, 20] },
      { sign: "Egizaklar", months: [5, 6], days: [21, 20] },
      { sign: "Qisqichbaqa", months: [6, 7], days: [21, 22] },
      { sign: "Arslon", months: [7, 8], days: [23, 22] },
      { sign: "Parizod", months: [8, 9], days: [23, 22] },
      { sign: "Tarozi", months: [9, 10], days: [23, 22] },
      { sign: "Chayon", months: [10, 11], days: [23, 21] },
      { sign: "Qavs", months: [11, 12], days: [22, 21] },
      { sign: "Tog' echkisi", months: [12, 1], days: [22, 19] },
      { sign: "Suv parvati", months: [1, 2], days: [20, 18] },
      { sign: "Baliq", months: [2, 3], days: [19, 20] },
    ];
    return (
      zodiac.find(
        (z) =>
          (month === z.months[0] && day >= z.days[0]) ||
          (month === z.months[1] && day <= z.days[1])
      )?.sign || ""
    );
  };

  const getChineseZodiac = (dob) => {
    const animals = [
      "Sichqon",
      "Buqa",
      "Yo'lbars",
      "Xo'roz",
      "Quyon",
      "Ajdar",
      "Ilon",
      "Ot",
      "Qo'y",
      "Maymun",
      "Tovuq",
      "It",
    ];
    return animals[new Date(dob).getFullYear() % 12];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dob) {
      const calculatedAge = calculateAge(dob);
      const zodiac = getZodiacSign(dob);
      const chineseZodiacSign = getChineseZodiac(dob);

      setAgeDetails(calculatedAge);
      setZodiacSign(zodiac);
      setChineseZodiac(chineseZodiacSign);

      // Ma'lumotlarni localStorage ga saqlash
      localStorage.setItem("dob", dob);
      localStorage.setItem("zodiacSign", zodiac);
      localStorage.setItem("chineseZodiac", chineseZodiacSign);
    }
  };

  const resetForm = () => {
    setDob("");
    setAgeDetails(null);
    setZodiacSign("");
    setChineseZodiac("");
    setShowDetails(false);
    setZodiacOpen(false);
    setAnimalsOpen(false);

    // localStorage dan barcha ma'lumotlarni o'chirish
    localStorage.removeItem("dob");
    localStorage.removeItem("zodiacSign");
    localStorage.removeItem("chineseZodiac");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (dob) setAgeDetails(calculateAge(dob));
    }, 1000);

    return () => clearInterval(interval);
  }, [dob]);

  return (
    <main className="flex flex-col p-5 items-center justify-center min-h-screen bg-gray-900 text-white">
      <section className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Tug'ilgan sana hisoblash
        </h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <label
            htmlFor="dob"
            className="block text-sm sm:text-lg font-semibold mb-2"
          >
            Tug'ilgan sana
          </label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full p-2 mb-4 rounded border border-gray-600 bg-gray-700 text-white"
            required
          />
          <button
            type="submit"
            disabled={!dob}
            className="w-full p-2 bg-blue-600 rounded hover:bg-blue-700 text-white disabled:bg-gray-500"
          >
            Hisoblash
          </button>
        </form>

        <button
          onClick={resetForm}
          disabled={!dob}
          className="w-full p-2 mb-5 bg-red-600 rounded hover:bg-red-700 text-white disabled:bg-gray-500"
        >
          Tozalash
        </button>

        {ageDetails && (
          <div>
            <div className="text-center flex justify-center gap-2 flex-wrap">
              {Object.entries(ageDetails).map(([key, value]) => (
                <Card key={key} title={key} count={value} />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <p className="text-md mt-4 sm:text-xl">
                Burj va Muchal hisongizni:
              </p>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-blue-400 mt-4 text-md sm:text-xl"
              >
                {showDetails ? "Berkitish" : "Ko'rsatish"}
              </button>
            </div>
          </div>
        )}
      </section>

      {showDetails && (
        <section className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg mt-5">
          <div className="flex items-center justify-between">
            <p className="text-lg sm:text-x flex gap-3 ">
              <strong>Burj:</strong>
              {zodiacSign}
            </p>
            <button
              onClick={() => setZodiacOpen(!zodiacOpen)}
              className="p-2  bg-blue-600 rounded hover:bg-blue-700 text-white"
            >
              {zodiacOpen ? "Yopish" : "Ochish"}
            </button>
          </div>
          {zodiacOpen && (
            <p className="mt-2 text-lg">
              {zodiacSign} burji - Har bir burjning o'ziga xos xususiyatlari va
              ta'siri bor, sizning burjingiz hayotingizda qanday o'zgarishlar
              olib keladi.
            </p>
          )}
          <div className="flex items-center justify-between mt-5">
            <p className="text-lg sm:text-xl flex gap-3">
              <strong>Muchal:</strong>
              {chineseZodiac}
            </p>
            <button
              onClick={() => setAnimalsOpen(!animalsOpen)}
              className="p-2 bg-blue-600 rounded hover:bg-blue-700 text-white"
            >
              {animalsOpen ? "Yopish" : "Ochish"}
            </button>
          </div>
          {animalsOpen && (
            <p className="mt-2 text-lg">
              Sizning muchal yiliga mos keluvchi kuchli va dinamik hayvon, bu
              sizning xususiyatlaringizni aks ettiradi.
            </p>
          )}
        </section>
      )}
    </main>
  );
};

export default App;
