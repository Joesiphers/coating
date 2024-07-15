import Link from "next/link";

export default function About() {
  return (
    <div>
      <h1>About WanWei Coating </h1>
      <div className="text-center m-4 p-4">
        <p className="text-4xl p-4">
          Specialist in protecting under extrem condition
        </p>
        <div></div>
        <p>
          For 20 years experience we cooperate with German Cemaric Coating. We
          are the most experienced engineer team in applying
        </p>
        <p>Stratic partner of SinoPec </p>
        <div className="flex h-24 justify-evenly">
          <img src="/image/sinopec.png" alt="SinoPec" />
          <img src="/image/cnooc.png" size="" alt="SinoPec" />
          <img src="/image/petrochina.svg" alt="Petro China" />
        </div>
      </div>
    </div>
  );
}
