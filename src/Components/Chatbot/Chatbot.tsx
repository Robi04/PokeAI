import { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import "./Chatbot.css";

function Chatbot() {
  // Define the Message type -> The type that is either "user" or "pokeAI"
  // and the text that is the actual message
  type Message = {
    type: "user" | "pokeAI";
    text: string;
  };

  // Define the state variables
  // We first have the input text -> The value inside our testarea
  const [inputText, setInputText] = useState<string>("");
  // Then we have the conversation which act like an array of Messsage that we defined just before
  const [conversation, setConversation] = useState<Message[]>([]);
  // And we have the currentAiMessage which is the message that the LLM is currently generating
  const [currentAiMessage, setCurrentAiMessage] = useState<string>("");

  // This function is used to convert the innerHTML of the generated message to a good format
  // Create the back to line and the code tag for the code
  const convertGoodFormat = (id: number) => {
    var myDiv = document.getElementsByClassName("pokeAI")[id];
    // Get the current HTML content of the div
    var htmlContent = myDiv.innerHTML;
    console.log("Basic html : " + htmlContent);
    // Replace pairs of ``` with <pre><code> and </code></pre>
    htmlContent = htmlContent.replace(
      /```(.*?)```/gs,
      "<pre><code>$1</code></pre>",
    );

    htmlContent = htmlContent.replace(/\n/g, "<br>");
    // Set the new HTML content in the div
    myDiv.innerHTML = htmlContent;
  };

  // This function is used to handle the change of the input text and set it in the state
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  // This is the not funny function that query the API and get the stream of data in response
  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Create a new message with the type "user" and the text that was in the inputText
    const newMessage: Message = { type: "user", text: message };
    // Add the message to the conversation
    setConversation((conversation) => [...conversation, newMessage]);

    // Try to fetch the API
    try {
      //Send a Poost request to the API with the model
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama2:13b",
          stream: true,
          prompt: message,
        }),
      });

      // Get the response as a stream
      const reader = response.body.getReader();
      // Create a decoder to decode the stream
      let decoder = new TextDecoder();
      // This will be the message currently generated
      let aiMessageInProgress = "";

      // While the stream is not done
      while (true) {
        const { value: chunk, done } = await reader.read();
        if (done) {
          setCurrentAiMessage("");
          break;
        }
        // If there is a chunk of data
        if (chunk) {
          window.scrollTo(0, document.body.scrollHeight);
          // Decode the chunk of data
          const textChunk = decoder.decode(chunk, { stream: true });
          // Split the data by line
          // Filter the lines that are empty
          const jsonObjects = textChunk
            .split("\n")
            .filter((line) => line.trim().length > 0);

          // For each line
          for (const jsonObject of jsonObjects) {
            // Parse the JSON
            const data = JSON.parse(jsonObject);
            // Add the response to the message currently generated
            aiMessageInProgress += data.response;
            // Set the message currently generated in the state
            setCurrentAiMessage(aiMessageInProgress);

            if (data.done) {
              convertGoodFormat(0);
              const pokeReply: Message = {
                type: "pokeAI",
                text: aiMessageInProgress,
              };
              // Add the message currently generated to the conversation
              setConversation((c) => [...c, pokeReply]);
              aiMessageInProgress = "";
              setCurrentAiMessage("");
              break;
            }
          }
        }
      }
    } catch (error) {
      setCurrentAiMessage("");
    }
  };

  // This function is used to handle the click on the send button
  const handleSendClick = () => {
    sendMessage(inputText);
    setInputText("");
  };

  // This function is used to handle the key press on the input txetarea
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  useEffect(() => {
    // Get the index of the last PokeAI message in order to convert it
    const lastMessageIndex = conversation.findIndex(
      (m, index) => m.type === "pokeAI" && index === conversation.length - 1,
    );

    // If there is a last PokeAI message
    if (lastMessageIndex !== -1) {
      // Convert the format of the last PokeAI message
      convertGoodFormat(document.getElementsByClassName("pokeAI").length - 1);
      // Scroll to the bottom of the page
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [conversation]);

  // Return the JSX
  return (
    <div className="chatbot">
      <div className="conversation">
        {conversation.map((message, index) => (
          // Create a div with the class message and the type of the message
          <div key={index} className={`message ${message.type}`}>
            <div className="message-type">{message.type}</div> {message.text}
          </div>
        ))}
        {currentAiMessage && (
          <div className="message pokeAI">
            <div className="message-type">pokeAI</div> {currentAiMessage}
          </div>
        )}
      </div>{" "}
      <textarea
        id="inputContainer"
        value={inputText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
      />
      <button onClick={handleSendClick}>Send</button>
    </div>
  );
}

export default Chatbot;
