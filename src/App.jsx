import React, { useState, useEffect } from "react";
import GallerySection from './GallerySection.jsx'

export default function App() {
  const [showRSVP, setShowRSVP] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeAllSections = () => {
    setShowRSVP(false);
    setShowEvents(false);
    setShowContact(false);
    setShowMusic(false);
    setShowGallery(false);
  };

  return (
    <div className="relative flex flex-col md:flex-row h-screen bg-[#FFF0F5]">
      <Sidebar
        setShowRSVP={setShowRSVP}
        setShowEvents={setShowEvents}
        setShowContact={setShowContact}
        setShowMusic={setShowMusic}
        setShowGallery={setShowGallery}
        isMobile={isMobile}
        closeAllSections={closeAllSections}
      />
      {showRSVP ? (
        <RSVPSection />
      ) : showEvents ? (
        <EventsSection />
      ) : showContact ? (
        <ContactSection />
      ) : showMusic ? (
        <MusicSection />
      ) : showGallery ? (
        <GallerySection />
      ) : (
        <HeroSection onRSVPClick={() => setShowRSVP(true)} />
      )}
    </div>
  );
}

function Sidebar({
  setShowRSVP,
  setShowEvents,
  setShowContact,
  setShowMusic,
  setShowGallery,
  isMobile,
  closeAllSections,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative w-full md:w-1/2 h-[50vh] md:h-full">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Helykitöltő */}
        {!imageLoaded && isMobile && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFF0F5] to-[#f8d7e3] flex items-center justify-center">
            <div className="text-center p-6">
              <div className="animate-pulse flex justify-center">
                <div className="w-16 h-16 rounded-full bg-pink-200 opacity-70"></div>
              </div>
              <h2 className="mt-4 text-xl font-serif text-gray-700 animate-pulse">
                Mesi & János
              </h2>
            </div>
          </div>
        )}

        {/* Háttérkép - Pontos pozíció beállítása mobilnézetben */}
        <img
          src="https://i.imgur.com/tB4ek54.jpeg"
          alt="Esküvői háttér"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            objectPosition: isMobile ? "center 50%" : "center center",
            height: isMobile ? "50vh" : "100%",
          }}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>

      {!isMobile && (
        <div className="absolute top-16 left-16 text-white text-left">
          <h1 className="text-3xl md:text-5xl font-serif italic text-white drop-shadow-[2px_2px_3px_black]">
            Mesi & János
          </h1>
        </div>
      )}

      <Menu
        setShowRSVP={setShowRSVP}
        setShowEvents={setShowEvents}
        setShowContact={setShowContact}
        setShowMusic={setShowMusic}
        setShowGallery={setShowGallery}
        closeAllSections={closeAllSections}
      />
    </div>
  );
}

function Menu({
  setShowRSVP,
  setShowEvents,
  setShowContact,
  setShowMusic,
  setShowGallery,
  closeAllSections,
}) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuClick = (sectionHandler) => {
    closeAllSections();
    sectionHandler(true);
    setOpen(false);
  };

  return (
    <div
      className="fixed top-4 left-4 md:top-6 md:left-6 z-50"
      onMouseLeave={() => !isMobile && setOpen(false)}
    >
      <button
        onClick={() => setOpen(!open)}
        className="sticky top-4 p-1.5 bg-transparent border-2 border-white rounded-full shadow-md hover:scale-110 transition-transform duration-300 ease-in-out w-10 h-10 flex items-center justify-center"
      >
        <span className="text-white text-xl">☰</span>
      </button>

      {open && (
        <ul className="absolute top-12 left-0 w-60 bg-black bg-opacity-80 backdrop-blur-md shadow-xl rounded-xl p-4 border border-white space-y-2">
          <li className="py-2">
            <button
              onClick={() => handleMenuClick(() => closeAllSections())}
              className="flex items-center gap-2 text-white text-sm hover:text-lg hover:font-semibold hover:scale-105 hover:underline underline-offset-4 transform transition-all duration-300 ease-in-out"
            >
              🏠 Főoldal
            </button>
          </li>
          <li className="py-2">
            <button
              onClick={() => handleMenuClick(setShowEvents)}
              className="flex items-center gap-2 text-white text-sm hover:text-lg hover:font-semibold hover:scale-105 hover:underline underline-offset-4 transform transition-all duration-300 ease-in-out"
            >
              📅 Események
            </button>
          </li>
          <li className="py-2">
            <button
              onClick={() => handleMenuClick(setShowRSVP)}
              className="flex items-center gap-2 text-white text-sm hover:text-lg hover:font-semibold hover:scale-105 hover:underline underline-offset-4 transform transition-all duration-300 ease-in-out"
            >
              ✍️ RSVP
            </button>
          </li>
          <li className="py-2">
            <button
              onClick={() => handleMenuClick(setShowContact)}
              className="flex items-center gap-2 text-white text-sm hover:text-lg hover:font-semibold hover:scale-105 hover:underline underline-offset-4 transform transition-all duration-300 ease-in-out"
            >
              📞 Kapcsolat
            </button>
          </li>
          <li className="py-2">
            <button
              onClick={() => handleMenuClick(setShowGallery)}
              className="flex items-center gap-2 text-white text-sm hover:text-base hover:font-semibold hover:scale-105 hover:underline underline-offset-4 transform transition-all duration-300 ease-in-out"
            >
              🖼️ Galéria
            </button>
          </li>
          <li className="py-2">
            <button
              onClick={() => handleMenuClick(setShowMusic)}
              className="flex items-center gap-2 text-white text-sm hover:text-base hover:font-semibold hover:scale-105 hover:underline underline-offset-4 transform transition-all duration-300 ease-in-out"
            >
              🎵 Zene kívánságlista
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

function HeroSection({ onRSVPClick }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function getTimeLeft() {
    const targetDate = new Date("2025-06-07T14:00:00");
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  return (
    <div className="relative w-full md:w-1/2 flex flex-col justify-center items-center bg-[#FFF0F5] p-10 text-center shadow-lg border-4 border-dashed border-pink-200 rounded-[3rem]">
      <h2 className="text-2xl md:text-3xl font-serif italic">
        Szamosújvár, Románia
      </h2>
      <p className="text-gray-600 mt-2 text-lg font-medium">
        2025. Június 07.
      </p>
      <p className="mt-4 text-gray-800 text-lg font-semibold animate-fade-in">
        {Math.floor(timeLeft.days / 30)} hónap {timeLeft.days % 30} nap{" "}
        {timeLeft.hours} óra
      </p>
      <button
        onClick={onRSVPClick}
        className="mt-6 px-6 py-2 border-2 border-black text-black hover:bg-black hover:text-white transition rounded-full text-lg"
      >
        RSVP
      </button>
    </div>
  );
}

function EventsSection() {
  const events = [
    {
      icon: (
        <img
          src="https://img.icons8.com/emoji/48/dove-emoji.png"
          alt="dove icon"
          className="w-8 h-8"
        />
      ),
      title: "Búcsúztató",
      time: "10:00",
      link: "https://www.google.com/maps/place/Strada+Emil+Precup+13,+Gherla+405300,+Rom%C3%A1nia/@47.0372224,23.9160485,17z/data=!3m1!4b1!4m6!3m5!1s0x4749bdc1cdd8257f:0x708dba33b0dbbc2!8m2!3d47.0372225!4d23.9209194!16s%2Fg%2F11pzxhgxy5?hl=hu&entry=ttu&g_ep=EgoyMDI1MDMxOS4yIKXMDSoASAFQAw%3D%3D",
    },
    {
      icon: "⛪",
      title: "Templomi szertartás",
      time: "14:00",
      link: "https://www.google.com/maps/place/Biserica+Reformat%C4%83/@47.0275099,23.9069219,17z/data=!3m1!4b1!4m6!3m5!1s0x4749bdbd20aefe0d:0x3cc4476f3b2f22ce!8m2!3d47.0275099!4d23.9094968!16s%2Fg%2F1pp2tkbjq?hl=hu&entry=ttu&g_ep=EgoyMDI1MDMxOS4yIKXMDSoASAFQAw%3D%3D",
    },
    {
      icon: (
        <img
          src="https://img.icons8.com/color/48/champagne.png"
          alt="pezsgő ikon"
          className="w-8 h-8"
        />
      ),
      title: "Lakodalom",
      time: "18:00",
      link: "https://www.google.com/maps/place/Club+Escape/@47.0345001,23.9001655,17z/data=!3m1!4b1!4m6!3m5!1s0x4749bdb750c13141:0x6385487b5780214b!8m2!3d47.0345001!4d23.9027404!16s%2Fg%2F1tj5jybt?hl=hu&entry=ttu&g_ep=EgoyMDI1MDMxOS4yIKXMDSoASAFQAw%3D%3D",
    },
  ];

  return (
    <div className="relative w-full md:w-1/2 flex flex-col justify-start items-center bg-[#FFF0F5] p-10 animate-fade-in-up overflow-y-auto">
      <h2 className="text-3xl md:text-5xl font-serif italic mb-28 text-center">
        Események
      </h2>
      <div className="flex flex-col gap-20 w-full max-w-2xl">
        {events.map((event, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl bg-white shadow">
                {event.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <p className="text-sm text-gray-700">{event.time}</p>
              </div>
            </div>
            <div>
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow transform transition duration-300 hover:scale-110 hover:bg-black group"
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/google-maps.png"
                  alt="Térkép"
                  className="w-6 h-6 transition duration-300 group-hover:invert"
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RSVPSection() {
  return (
    <div className="relative w-full md:w-1/2 flex flex-col justify-center items-center bg-[#FFF0F5] p-10 text-center shadow-lg">
      <h3 className="text-xl font-semibold mb-4">RSVP</h3>
      {/* RSVP form will go here */}
    </div>
  );
}

function ContactSection() {
  return (
    <div className="relative w-full md:w-1/2 flex flex-col justify-start items-center bg-[#FFF0F5] p-10 animate-fade-in-up overflow-y-auto">
      <h2 className="text-3xl md:text-5xl font-serif italic mb-16 text-center">
        Kapcsolat
      </h2>

      <div className="flex flex-col gap-12 items-center justify-center">
        {/* János */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-4xl shadow-md">
            🤵
          </div>
          <h3 className="text-xl font-semibold">János</h3>
          <a
            href="mailto:vighjani95@gmail.com"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            📧 vighjani95@gmail.com
          </a>
          <a
            href="tel:+36501099018"
            className="text-gray-800 hover:underline flex items-center gap-2"
          >
            📱 +36 50 109 9018
          </a>
        </div>

        {/* Mesi */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-4xl shadow-md">
            👰
          </div>
          <h3 className="text-xl font-semibold">Mesi</h3>
          <a
            href="mailto:fulopemese.h@gmail.com"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            📧 fulopemese.h@gmail.com
          </a>
          <a
            href="tel:+36209243292"
            className="text-gray-800 hover:underline flex items-center gap-2"
          >
            📱 +36 20 924 3292
          </a>
        </div>
      </div>
    </div>
  );
}

function MusicSection() {
  const [formData, setFormData] = useState({ name: "", artist: "", song: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.name && formData.artist && formData.song) {
      try {
        const res = await fetch(
          "https://script.google.com/macros/s/AKfycby0qO7qwvs8GzeXI8MLkWJDSJKvmM6JL8FcC0cDjXfTDVuaIWcYqDWmhPt8dk5X3qtpSg/exec"
        );
        const data = await res.json();

        const isDuplicate = data.some(
          (entry) =>
            entry.artist?.toLowerCase().trim() ===
              formData.artist.toLowerCase().trim() &&
            entry.song?.toLowerCase().trim() === formData.song.toLowerCase().trim()
        );

        if (isDuplicate) {
          setError(
            "Ez a dal már szerepel a kívánságlistán! 🎵 Kérlek válassz másikat."
          );
          return;
        }

        const saveRes = await fetch(
          "https://script.google.com/macros/s/AKfycby0qO7qwvs8GzeXI8MLkWJDSJKvmM6JL8FcC0cDjXfTDVuaIWcYqDWmhPt8dk5X3qtpSg/exec",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const saveResult = await saveRes.text();
        console.log("Mentés válasza:", saveResult);

        setFormData({ name: "", artist: "", song: "" });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
      } catch (err) {
        console.error("Hiba a mentés során:", err);
        setError("Hiba történt az adatok mentése közben.");
      }
    }
  };

  return (
    <div className="relative w-full md:w-1/2 flex flex-col justify-start items-center bg-[#FFF0F5] p-10 animate-fade-in-up overflow-y-auto">
      <h2 className="text-3xl md:text-5xl font-serif italic mb-16 text-center">
        Zene kívánságlista
      </h2>

      <div className="w-full max-w-xs bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-white shadow flex items-center justify-center text-2xl">
            🎵
          </div>
        </div>

        {submitted && (
          <div className="mb-4 text-green-700 bg-green-100 border border-green-300 p-2 rounded text-center text-sm">
            Köszönjük! A kívánságot mentettük 🎉
          </div>
        )}

        {error && (
          <div className="mb-4 text-red-700 bg-red-100 border border-red-300 p-2 rounded text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Neved
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-pink-200 focus:border-pink-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Előadó
            </label>
            <input
              type="text"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-pink-200 focus:border-pink-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dal címe
            </label>
            <input
              type="text"
              name="song"
              value={formData.song}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-pink-200 focus:border-pink-300 text-sm"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition text-sm"
            >
              Küldés 🎵
            </button>
          </div>
        </form>

        <div className="mt-6">
          <AdminDownloadButton />
        </div>
      </div>
    </div>
  );
}

function AdminDownloadButton() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    const code = prompt("Kérlek add meg az admin letöltési kódot:");
    if (code !== "mesijani.DJ2025") {
      alert("Hibás kód! Nincs jogosultság a letöltéshez.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycby0qO7qwvs8GzeXI8MLkWJDSJKvmM6JL8FcC0cDjXfTDVuaIWcYqDWmhPt8dk5X3qtpSg/exec?code=" +
          code
      );
      const result = await response.json();

      if (result.url) {
        window.open(result.url, "_blank");
      } else {
        alert("Nem sikerült a letöltési linket lekérni.");
      }
    } catch (error) {
      console.error("Hiba a letöltés során:", error);
      alert("Hiba történt a letöltés közben.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="w-full bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition text-sm"
      disabled={loading}
    >
      {loading ? "Letöltés..." : "🎧 Admin letöltés"}
    </button>
  );
}