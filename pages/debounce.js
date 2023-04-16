import DebounceHooks from "@/components/DebounceHooks";
import DebounceTanStackQuery from "@/components/DebounceTanStackQuery";
import React, { useEffect, useState } from "react";

let timerId;

function Debounce() {
  return (
    <>
      <DebounceHooks></DebounceHooks>
      <DebounceTanStackQuery></DebounceTanStackQuery>
    </>
  );
}

export default Debounce;
