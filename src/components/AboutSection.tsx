const features = [
  {
    si: "නොමිලේ සහ රහස්‍ය — බ්‍රවුසරයෙන්ම කතාබහ කරන්න, app බාගන්න ඕනේ නැහැ",
    en: "Free & private — chat straight from your browser, no app to download.",
  },
  {
    si: "ක්ෂණික කතාබහය — පණිවිඩ මොහොතම පෙන්වනු ලැබේ",
    en: "Real-time messaging — messages appear instantly.",
  },
  {
    si: "පුද්ගලික පණිවිඩ — අන්‍ය පුද්ගලයෙකු සමඟ පුද්ගලිකව කතා කරන්න",
    en: "Private messages — talk one-to-one with another user.",
  },
  {
    si: "ඕනෑම උපාංගයකින් ක්‍රියා කරනවා — දුරකථනය, ටැබ්, පරිගණකය",
    en: "Works on any device — phone, tablet, or desktop.",
  },
];

export default function AboutSection() {
  return (
    <section className="w-full max-w-2xl text-center">
      <h2 className="text-xl font-bold text-white">
        නොමිලේ සිංහල කතාබහ වෙබ් අඩවිය
        <span className="block text-base font-semibold text-white/50 mt-1">
          Free Sinhala Chatroom
        </span>
      </h2>

      <p className="text-sm text-white/60 leading-relaxed mt-3">
        Chat Eka (චැට් එක) යනු නොමිලේ භාවිත කළ හැකි සිංහල කතාබහ වෙබ් අඩවියකි.
        ඔබගේ username එක සහ NIC එක පමණක් භාවිතයෙන් පිවිසීමෙන්, ලංකාවේ සහ
        ලංකාවෙන් පිටත ජීවත් සිංහල මිතුරන් සමඟ ක්ෂණිකව කතාබහ කළ හැක.
      </p>

      <p className="text-sm text-white/50 leading-relaxed mt-3">
        Chat Eka is a free real-time Sinhala chatroom. Sign in with just a
        username and your NIC, then chat instantly with Sinhala-speaking people
        in Sri Lanka and around the world — public chat plus one-to-one private
        messages. No fees, no app install, works on any device.
      </p>

      <p className="text-sm text-white/50 leading-relaxed mt-3">
        If you searched for{" "}
        <span className="text-white/70">lanka chat online</span>,{" "}
        <span className="text-white/70">sinhala chat</span>,{" "}
        <span className="text-white/70">chat srilanka</span>,{" "}
        <span className="text-white/70">lanka online chat</span>, or{" "}
        <span className="text-white/70">sinhala chat room</span> — you have come
        to the right place. Chat Eka also works as a simple{" "}
        <span className="text-white/70">sinhala group chat</span> and a{" "}
        <span className="text-white/70">
          sri lanka friends chat online free
        </span>{" "}
        service for anyone looking for{" "}
        <span className="text-white/70">lanka friends</span> to talk to.
      </p>

      <p className="text-sm text-white/50 leading-relaxed mt-3">
        ඔබ <span className="text-white/70">lanka chat online</span>,{" "}
        <span className="text-white/70">sinhala chat</span>,{" "}
        <span className="text-white/70">chat srilanka</span> හෝ{" "}
        <span className="text-white/70">සිංහල චැට්</span> ලෙස සොයන්නෙක් නම් ඔබ
        නිවැරදි තැනට පැමිණ ඇත. මෙය{" "}
        <span className="text-white/70">සිංහල group chat</span> එකක් ලෙසද
        ක්‍රියා කරයි.
      </p>

      <ul className="grid sm:grid-cols-2 gap-2 mt-5 text-left">
        {features.map((f) => (
          <li
            key={f.en}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5"
          >
            <p className="text-sm text-white/80">{f.si}</p>
            <p className="text-xs text-white/40 mt-0.5">{f.en}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
