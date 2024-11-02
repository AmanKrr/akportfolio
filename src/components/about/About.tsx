"use client";
import "../../styles/About/about.scss";
import { useRef, useState, useEffect } from "react";
import { isElementInViewport } from "@/utils/checkViewPort";
import { getRandomCharacter, getRandomMathCharacter } from "@/utils/randomGen";

const About = () => {
  const [head, setHead] = useState("Who is Aman?");
  const randomCharactersUpperLeft = useRef<HTMLDivElement>(null);
  const randomCharacterUpperRight = useRef<HTMLDivElement>(null);
  const [randomUpperLeft, setRandomUpperLeft] = useState<string[]>([]);
  const [randomUpperRight, setRandomUpperRight] = useState<string[]>([]);

  useEffect(() => {
    if (randomUpperLeft && randomUpperLeft.length > 1) {
      return;
    }
    if (randomCharactersUpperLeft && randomCharactersUpperLeft.current) {
      const focusedElement = randomCharactersUpperLeft.current;
      if (isElementInViewport(focusedElement)) setRandomUpperLeft([...randomUpperLeft, getRandomMathCharacter()]);
    }
  }, [randomCharactersUpperLeft, randomUpperLeft]);

  useEffect(() => {
    if (randomCharacterUpperRight && randomCharacterUpperRight.current) {
      const focusedElement = randomCharacterUpperRight.current;
      if (isElementInViewport(focusedElement)) setRandomUpperRight([...randomUpperRight, getRandomCharacter()]);
    }
  }, [randomCharacterUpperRight, randomUpperRight]);

  return (
    <div className="aboutContainer">
      <div className="aboutHeading">
        <div ref={randomCharactersUpperLeft} className="randomCharacterLeft ul">
          {randomUpperLeft &&
            randomUpperLeft.map((characters, index) => {
              return (
                <span className="randomCharsAbout" key={characters + index}>
                  {characters.toUpperCase()}
                </span>
              );
            })}
        </div>
        <div className="about">
          {head &&
            head.split("").map((characters, index) => {
              return (
                <span className={"firstNameChar"} key={characters + index}>
                  {characters.toUpperCase()}
                </span>
              );
            })}
        </div>
        <div ref={randomCharacterUpperRight} className="randomCharacterRight ur">
          {randomUpperRight &&
            randomUpperRight.map((characters, index) => {
              return (
                <span className="randomCharsAbout" key={characters + index}>
                  {characters.toUpperCase()}
                </span>
              );
            })}
        </div>
      </div>
      <div className="aboutDescription">
        {/* <p>
          I am an accomplished <span className="role">frontend developer</span> deeply passionate about meticulously designing captivating and user-centric digital experiences.
        </p> */}
        <p>Greetings, fellow digital sorcerer! 🧙‍♂️</p>
        <br />
        <p>
          I am not just your run-of-the-mill frontend developer; I am a code-wielding maestro on a quest to craft digital delights that make unicorns
          jealous! 🦄
        </p>
        <br />
        <p>
          Picture this: I don my virtual wizard hat and summon pixels and CSS incantations to create web experiences so mesmerizing, they make users
          forget they ever needed a &quot;back&quot; button. 😲
        </p>
        <br />
        <p>
          While others merely dabble in the dark arts of web development, I dance with divs and tango with typography. My passion for creating
          user-centric designs is stronger than a triple-shot espresso on a Monday morning! ☕
        </p>
      </div>
    </div>
  );
};

export default About;
