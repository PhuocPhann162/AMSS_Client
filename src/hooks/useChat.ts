// hooks/useChat.ts
import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch } from '@/storage/redux/hooks/use-app-dispatch';
import { useAppSelector } from '@/storage/redux/hooks/use-app-selector';
import { signalRService } from '@/services/signalr-service';
import { addError, setCurrentRoom } from '@/storage/redux/chatSlice';
import { CreateMessageDto, MessageType } from '@/interfaces/chat/chat-system';
import { RootState } from '@/storage/redux/store';

export const useChat = () => {
  const dispatch = useAppDispatch();
  const chatState = useAppSelector((state: RootState) => state.chatStore);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Join room when current room changes
  useEffect(() => {
    if (chatState.currentRoom && chatState.isConnected) {
      signalRService.joinRoom(chatState.currentRoom);
    }
  }, [chatState.currentRoom, chatState.isConnected]);

  const joinRoom = useCallback(
    async (roomId: string) => {
      try {
        dispatch(setCurrentRoom(roomId));
        if (chatState.isConnected) {
          await signalRService.joinRoom(roomId);
        }
      } catch (error) {
        dispatch(addError('Failed to join room'));
      }
    },
    [dispatch, chatState.isConnected],
  );

  const leaveRoom = useCallback(
    async (roomId: string, options?: { setCurrentRoomNull?: boolean }) => {
      try {
        await signalRService.leaveRoom(roomId);
        if (options?.setCurrentRoomNull && chatState.currentRoom === roomId) {
          dispatch(setCurrentRoom(null));
        }
      } catch (error) {
        dispatch(addError('Failed to leave room'));
      }
    },
    [dispatch, chatState.currentRoom],
  );

  const sendMessage = useCallback(
    async (content: string, type: MessageType = MessageType.Text) => {
      if (!chatState.currentRoom || !content.trim()) return;

      const messageDto: CreateMessageDto = {
        content: content.trim(),
        chatRoomId: chatState.currentRoom,
        type,
      };

      try {
        await signalRService.sendMessage(messageDto);
      } catch (error) {
        dispatch(addError('Failed to send message'));
      }
    },
    [chatState.currentRoom, dispatch],
  );

  const sendPrivateMessage = useCallback(
    async (recipientId: string, content: string) => {
      if (!content.trim()) return;

      try {
        await signalRService.sendPrivateMessage(recipientId, content.trim());
      } catch (error) {
        dispatch(addError('Failed to send private message'));
      }
    },
    [dispatch],
  );

  const startTyping = useCallback(() => {
    if (!chatState.currentRoom) return;

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Send typing indicator
    signalRService.sendTyping(chatState.currentRoom, true);

    // Auto-stop typing after 3 seconds
    typingTimeoutRef.current = setTimeout(() => {
      if (chatState.currentRoom) {
        signalRService.sendTyping(chatState.currentRoom, false);
      }
    }, 3000);
  }, [chatState.currentRoom]);

  const stopTyping = useCallback(() => {
    if (!chatState.currentRoom) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    signalRService.sendTyping(chatState.currentRoom, false);
  }, [chatState.currentRoom]);

  const reconnect = useCallback(async () => {
    try {
      await signalRService.connect();
    } catch (error) {
      dispatch(addError('Failed to reconnect'));
    }
  }, [dispatch]);

  return {
    ...chatState,
    joinRoom,
    leaveRoom,
    sendMessage,
    sendPrivateMessage,
    startTyping,
    stopTyping,
    reconnect,
  };
};

export const useTyping = (
  onStartTyping: () => void,
  onStopTyping: () => void,
) => {
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const isTypingRef = useRef(false);

  const handleTyping = () => {
    if (!isTypingRef.current) {
      isTypingRef.current = true;
      onStartTyping();
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing
    typingTimeoutRef.current = setTimeout(() => {
      isTypingRef.current = false;
      onStopTyping();
    }, 1000);
  };

  const stopTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    if (isTypingRef.current) {
      isTypingRef.current = false;
      onStopTyping();
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return { handleTyping, stopTyping };
};
