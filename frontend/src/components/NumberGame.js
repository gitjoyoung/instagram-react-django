import Card from "antd/lib/card/Card";
import React, { useState } from "react";

function NumberGame() {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [guesses, setGuesses] = useState([]);
  const [lastResult, setLastResult] = useState("");
  const [lowOrHi, setLowOrHi] = useState("");
  const [guessCount, setGuessCount] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  function checkGuess(event) {
    event.preventDefault();
    const userGuess = Number(event.target.elements.guessField.value);
    setGuesses([...guesses, userGuess]);

    if (userGuess === randomNumber) {
      setLastResult("Congratulations 정답 입니다 !");
      setLowOrHi("");
      setGameOver(true);
    } else if (guessCount === 7) {
      setLastResult("!!!GAME OVER!!!");
      setLowOrHi("");
      setGameOver(true);
    } else {
      setLastResult("틀렸습니다!!");
      if (userGuess < randomNumber) {
        setLowOrHi("입력하신 숫자보다 커요!");
      } else if (userGuess > randomNumber) {
        setLowOrHi("입력하신 숫자보다 낮아요!");
      }
      setGuessCount(guessCount + 1);
    }

    event.target.elements.guessField.value = "";
  }

  function resetGame() {
    setRandomNumber(generateRandomNumber());
    setGuesses([]);
    setLastResult("");
    setLowOrHi("");
    setGuessCount(1);
    setGameOver(false);
  }

  return (
      <Card className="contents">
        <h1>숫자 맞추기 게임</h1>

        <p>
          숫자 1부터 100 사이의 랜덤한 숫자를 뽑았습니다! 7번 이내로 램덤수를
          맞춰보세요.
        </p>
        <p>입력할때마다 랜덤한 숫자에 대한 힌트를 드립니다!</p>

        <form onSubmit={checkGuess}>
          <label htmlFor="guessField">당신의 추측한 숫자는?: </label>
          <input type="number" min="1" max="100" required id="guessField" />
          <button type="submit" disabled={gameOver}>
            제출
          </button>
        </form>

        <div>
          <p> 시도 횟수 : {guesses.join(" ")}</p>
          <p
            className="lastResult"
            style={{
              backgroundColor: lastResult.includes("Congratulations")
                ? "green"
                : "red",
            }}>
            {lastResult}
          </p>
          {randomNumber}
          <p className="lowOrHi">{lowOrHi}</p>
        </div>

        {gameOver && <button onClick={resetGame}>Start new game</button>}
      </Card>
  );
}

export default NumberGame;
