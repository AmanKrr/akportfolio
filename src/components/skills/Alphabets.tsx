import { memo, useMemo } from "react";

function Alphabets() {
  const allAlphabets = useMemo(
    () => new Array(26).fill(1).map((_, i) => String.fromCharCode(65 + i)),
    []
  );
  return (
    <div className="alphabetsContainer">
      {allAlphabets &&
        allAlphabets.map((char) => {
          return (
            <span key={char} className="alphaChar">
              {char}
            </span>
          );
        })}
    </div>
  );
}

export default memo(Alphabets);
