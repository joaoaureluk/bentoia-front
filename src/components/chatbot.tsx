import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/providers/auth-provider";

export const ChatBot = () => {
  const { session } = useAuth();
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot" }[]
  >([]);
  const [input, setInput] = useState("");

  // Substitua por uma forma real de obter o nome do usuário logado
  const usuarioLogado = session.user?.name;

  const handleSendMessage = async () => {
    if (input.trim()) {
      // Adiciona a mensagem do usuário
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");

      try {
        // Usando a variável de ambiente para pegar a URL da API
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        // Envia a mensagem para a API do seu back-end com axios
        const response = await axios.post(`${apiUrl}/ia`, {
          prompt: input, // A mensagem enviada pelo usuário
          name: usuarioLogado, // O nome do usuário logado
        });

        // Adiciona a resposta do bot
        setMessages((prev) => [
          ...prev,
          { text: response.data.result, sender: "bot" }, // "result" é o campo com a resposta do bot
        ]);
      } catch (error) {
        console.error("Erro ao se comunicar com a API", error);
        setMessages((prev) => [
          ...prev,
          { text: "Desculpe, houve um erro. Tente novamente.", sender: "bot" },
        ]);
      }
    }
  };

  return (
    <div className="w-full h-[calc(100vh-100px)] overflow-auto">
      <div className="flex flex-col h-full gap-4">
        <div className="flex-1 overflow-y-auto  p-4 border border-gray-300 rounded-lg bg-background">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-white ${
                  message.sender === "user" ? "bg-blue-500" : "bg-gray-500"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg"
            placeholder="Digite sua mensagem..."
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-blue-300"
            disabled={!input.trim()}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};
