import React from "react";
import NumberGame from "components/NumberGame";
import AppHeader from "components/applayout/AppHeader";
import AppFooter from "components/applayout/AppFooter";
import "./Game.scss";

export const Game = () => {
  return (
    <div className="Game">
      <div className="game_header">
        <AppHeader />
      </div>
      <div className="game_contents">
        <NumberGame />
      </div>
      <div className="game_footer">
        <AppFooter />
      </div>

    
    </div>
  );
};
export default Game;
