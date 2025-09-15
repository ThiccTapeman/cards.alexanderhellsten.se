import { useEffect, useState } from "react";
import { Playtime } from "./Playtime";

const playtime = new Playtime();

export function PlaytimeTracker() {
  const [active, setActive] = useState(0);
  const [passive, setPassive] = useState(0);

  useEffect(() => {
    playtime.start();
    const uiInterval = setInterval(() => {
      setActive(playtime.getActive());
      setPassive(playtime.getPassive());
    }, 1000);

    return () => {
      playtime.stop();
      clearInterval(uiInterval);
    };
  }, []);

  return (
    <div>
      <div>Active: {active}s</div>
      <div>Passive: {passive}s</div>
    </div>
  );
}
