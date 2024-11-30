import { create } from "zustand"; 

interface ConversationState {
    selectedConversation: any | null;
    setSelectedConversation: (selectedConversation: any) => void;
    messages: any[];
    setMessages: (messages: any[]) => void;
  }

  const useConversation = create<ConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation: any) => {
      set({ selectedConversation });
      if (selectedConversation) {
        localStorage.setItem("selectedConversation", JSON.stringify(selectedConversation));
      } else {
        localStorage.removeItem("selectedConversation");
      }
    },
    messages: [],
    setMessages: (newMessages: any[]) => set({ messages: newMessages }), 
    appendMessage: (newMessage: any) =>
      set((state) => ({ messages: [...state.messages, newMessage] })), 
  }));
  

export default useConversation