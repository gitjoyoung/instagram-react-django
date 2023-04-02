import React, { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";

function ChatBot() {
  const [userInput, setUserInput] = useState("");
  const [botResponse, setBotResponse] = useState("");

  useEffect(() => {
    const fetchBotResponse = async () => {
      const configuration = new Configuration({
        organization: "org-RbQ76ulz1UHxBha6XfykIbWj",
        apiKey: "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",
      });
      const openai = new OpenAIApi(configuration);

      const completion = await openai.createCompletion(
        {
          model: "text-davinci-003",
          prompt: "Hello world",
        },
        {
          timeout: 1000,
          headers: {
            "Example-Header": "example",
          },
        }
      );

      console.log(completion)

      setBotResponse(completion.data.choices[0].text);
    };

    fetchBotResponse();
  }, []);

  return (
    <div>
      <p>{botResponse}</p>
    </div>
  );
}

export default ChatBot;