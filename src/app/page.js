"use client";

import { useMemo, useState } from "react";
import GameView from "@/components/GameView";

export default function Home() {
  return (
    <main className="p-5 space-y-4 bg-gray-800">
      <GameView></GameView>
    </main>
  );
}
