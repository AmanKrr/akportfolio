"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "../../styles/AuthorTitle/authorTitle.scss";
import "../../styles/canvas.scss";
import { isElementInViewport } from "@/utils/checkViewPort";
import { getRandomCharacter, getRandomMathCharacter } from "@/utils/randomGen";
import BallsInSpace from "./BallsInSpace";
import Pointer2d from "./Pointer2d";

const AuthorTitle = () => {
  const randomCharactersUpperLeft = useRef<HTMLDivElement>(null);
  const randomCharacterUpperRight = useRef<HTMLDivElement>(null);

  const randomCharactersLowerLeft = useRef<HTMLDivElement>(null);
  const randomCharacterLowerRight = useRef<HTMLDivElement>(null);

  const [author, setAuthor] = useState("Aman Kumar");
  const [firstName, setFirstName] = useState("Aman");
  const [lastName, setLastName] = useState("Kumar");

  const [randomUpperLeft, setRandomUpperLeft] = useState<string[]>([]);
  const [randomUpperRight, setRandomUpperRight] = useState<string[]>([]);

  const [randomLowerLeft, setRandomLowerLeft] = useState<string[]>([]);
  const [randomLowerRight, setRandomLowerRight] = useState<string[]>([]);

  useEffect(() => {
    document.title = "Aman Kumar.";
  }, []);

  useEffect(() => {
    if (randomCharactersUpperLeft && randomCharactersUpperLeft.current) {
      const focusedElement = randomCharactersUpperLeft.current;
      if (isElementInViewport(focusedElement))
        setRandomUpperLeft([...randomUpperLeft, getRandomMathCharacter()]);
    }
  }, [randomCharactersUpperLeft, randomUpperLeft]);

  useEffect(() => {
    if (randomCharacterUpperRight && randomCharacterUpperRight.current) {
      const focusedElement = randomCharacterUpperRight.current;
      if (isElementInViewport(focusedElement))
        setRandomUpperRight([...randomUpperRight, getRandomCharacter()]);
    }
  }, [randomCharacterUpperRight, randomUpperRight]);

  useEffect(() => {
    if (randomCharactersLowerLeft && randomCharactersLowerLeft.current) {
      const focusedElement = randomCharactersLowerLeft.current;
      if (isElementInViewport(focusedElement))
        setRandomLowerLeft([...randomLowerLeft, getRandomCharacter()]);
    }
  }, [randomCharactersLowerLeft, randomLowerLeft]);

  useEffect(() => {
    if (randomCharacterLowerRight && randomCharacterLowerRight.current) {
      const focusedElement = randomCharacterLowerRight.current;
      if (isElementInViewport(focusedElement))
        setRandomLowerRight([...randomLowerRight, getRandomMathCharacter()]);
    }
  }, [randomCharacterLowerRight, randomLowerRight]);

  return (
    <div className="authorTitleContainer">
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" fill="none" viewBox="0 0 232 226">
        <path
          stroke="#000"
          strokeOpacity="0.01"
          d="M13.5 171c-37.2-62 19.833-128.833 53-154.5 79.2-41.6 136 12.667 154.5 45 33.6 80.4-28.667 138.167-64 157C87.8 242.1 32.5 196.667 13.5 171z"
        ></path>
      </svg> */}
      <div className="wrapperFirstName wrapperName">
        <div ref={randomCharactersUpperLeft} className="randomCharacterLeft ul">
          {randomUpperLeft &&
            randomUpperLeft.map((characters, index) => {
              return (
                <span className="randomChars" key={characters + index}>
                  {characters.toUpperCase()}
                </span>
              );
            })}
        </div>
        <div className="firstName">
          {firstName.split("").map((characters, index) => {
            return (
              <span className={"firstNameChar"} key={characters + index}>
                {characters.toUpperCase()}
              </span>
            );
          })}
        </div>
        <div
          ref={randomCharacterUpperRight}
          className="randomCharacterRight ur"
        >
          {randomUpperRight &&
            randomUpperRight.map((characters, index) => {
              return (
                <span className="randomChars" key={characters + index}>
                  {characters.toUpperCase()}
                </span>
              );
            })}
        </div>
      </div>
      <div className="wrapperLastName wrapperName">
        <div ref={randomCharactersLowerLeft} className="randomCharacterLeft ll">
          {randomLowerLeft &&
            randomLowerLeft.map((characters, index) => {
              return (
                <span className="randomChars" key={characters + index}>
                  {characters.toUpperCase()}
                </span>
              );
            })}
        </div>
        <div className="lastName">
          {lastName.split("").map((characters, index) => {
            return (
              <span className={"firstNameChar"} key={characters + index}>
                {characters.toUpperCase()}
              </span>
            );
          })}
        </div>
        <div
          ref={randomCharacterLowerRight}
          className="randomCharacterRight lr"
        >
          {randomLowerRight &&
            randomLowerRight.map((characters, index) => {
              return (
                <span className="randomChars" key={characters + index}>
                  {characters.toUpperCase()}
                </span>
              );
            })}
        </div>
      </div>
      <Pointer2d />
      <BallsInSpace />
    </div>
  );
};

export default AuthorTitle;
