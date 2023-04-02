import React, { useState, useEffect } from "react";

function ModalEvent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;

      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrolledToBottom = scrollHeight - scrollPosition === clientHeight;

      if (scrolledToBottom) {
        setIsModalOpen(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rightStyle = {
    width: "100%",
    height: "3000px",
    float: "left",
    backgroundColor: "lightgreen",
    overflow: "auto",
  };

  return (
    <>
      <div style={rightStyle}>{isModalOpen && alert("깜짝")}</div>
    </>
  );
}

export default ModalEvent;
