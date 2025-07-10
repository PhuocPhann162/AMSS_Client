// services/signalrService.ts
import * as signalR from '@microsoft/signalr';
import {
  setConnectionStatus,
  addMessage,
  setUserOnline,
  setUserOffline,
  setUserTyping,
  addError,
  setOnlineUsers,
} from '@/storage/redux/chatSlice';
import { CreateMessageDto, MessageDto } from '@/interfaces/chat/chat-system';
import { store } from '@/storage/redux/store';
import { authStorage } from '@/utils/auth-storage';

class SignalRService {
  private connection: signalR.HubConnection | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor() {
    // Không tự động khởi tạo connection ở đây nữa
  }

  private initializeConnection() {
    // Nếu đã có connection cũ thì stop và xóa
    console.log(this.reconnectAttempts);
    console.log(this.maxReconnectAttempts);
    if (this.connection) {
      this.connection.stop();
      this.connection = null;
    }
    // Thay đổi URL này thành URL của backend API của bạn
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_SERVER_BASE_URL}/chathub`, {
        accessTokenFactory: () => {
          // Lấy token từ localStorage hoặc store
          return authStorage.getAccessToken() || '';
        },
      })
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => {
          if (retryContext.previousRetryCount < 4) {
            return Math.random() * 10000 + 1000; // 1-11 seconds
          } else {
            return null; // Stop retrying
          }
        },
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    if (!this.connection) return;

    // Connection events
    this.connection.onclose((error) => {
      console.log('SignalR connection closed', error);
      store.dispatch(
        setConnectionStatus({ isConnected: false, isConnecting: false }),
      );
    });

    this.connection.onreconnecting((error) => {
      console.log('SignalR reconnecting', error);
      store.dispatch(
        setConnectionStatus({ isConnected: false, isConnecting: true }),
      );
    });

    this.connection.onreconnected((connectionId) => {
      console.log('SignalR reconnected', connectionId);
      store.dispatch(
        setConnectionStatus({ isConnected: true, isConnecting: false }),
      );
      this.reconnectAttempts = 0;
    });

    // Chat events
    this.connection.on('ReceiveMessage', (message: MessageDto) => {
      console.log('Received message:', message);
      store.dispatch(addMessage(message));
    });

    this.connection.on('UserOnline', (userId: string) => {
      console.log('User online:', userId);
      store.dispatch(setUserOnline(userId));
    });

    this.connection.on('UserOffline', (userId: string) => {
      console.log('User offline:', userId);
      store.dispatch(setUserOffline(userId));
    });

    this.connection.on('UserJoinedRoom', (userId: string, roomId: string) => {
      console.log(`User ${userId} joined room ${roomId}`);
    });

    this.connection.on('UserLeftRoom', (userId: string, roomId: string) => {
      console.log(`User ${userId} left room ${roomId}`);
    });

    this.connection.on('UserTyping', (userId: string, isTyping: boolean) => {
      store.dispatch(setUserTyping({ userId, isTyping }));
    });

    this.connection.on('Error', (error: string) => {
      console.error('SignalR error:', error);
      store.dispatch(addError(error));
    });

    this.connection.on('OnlineUsers', (userIds: string[]) => {
      store.dispatch(setOnlineUsers(userIds));
    });
  }

  async connect(): Promise<void> {
    // Nếu chưa có connection hoặc connection đã bị disposed thì khởi tạo lại
    if (
      !this.connection ||
      this.connection.state === signalR.HubConnectionState.Disconnected
    ) {
      this.initializeConnection();
    }

    if (this.connection?.state === signalR.HubConnectionState.Disconnected) {
      try {
        store.dispatch(
          setConnectionStatus({ isConnected: false, isConnecting: true }),
        );
        await this.connection.start();
        console.log('SignalR connected');
        store.dispatch(
          setConnectionStatus({ isConnected: true, isConnecting: false }),
        );
      } catch (error) {
        console.error('Error connecting to SignalR:', error);
        store.dispatch(
          setConnectionStatus({ isConnected: false, isConnecting: false }),
        );
        store.dispatch(addError('Failed to connect to chat server'));
        throw error;
      }
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      try {
        await this.connection.stop();
      } catch (e) {
        // ignore
      }
      this.connection = null;
      store.dispatch(
        setConnectionStatus({ isConnected: false, isConnecting: false }),
      );
    }
  }

  async joinRoom(roomId: string): Promise<void> {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      try {
        await this.connection.invoke('JoinRoom', roomId);
        console.log(`Joined room: ${roomId}`);
      } catch (error) {
        console.error('Error joining room:', error);
        throw error;
      }
    }
  }

  async leaveRoom(roomId: string): Promise<void> {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      try {
        await this.connection.invoke('LeaveRoom', roomId);
        console.log(`Left room: ${roomId}`);
      } catch (error) {
        console.error('Error leaving room:', error);
        throw error;
      }
    }
  }

  async sendMessage(messageDto: CreateMessageDto): Promise<void> {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      try {
        await this.connection.invoke('SendMessageToRoom', messageDto);
      } catch (error) {
        console.error('Error sending message:', error);
        throw error;
      }
    }
  }

  async sendPrivateMessage(
    recipientId: string,
    content: string,
  ): Promise<void> {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      try {
        await this.connection.invoke(
          'SendPrivateMessage',
          recipientId,
          content,
        );
      } catch (error) {
        console.error('Error sending private message:', error);
        throw error;
      }
    }
  }

  async sendTyping(roomId: string, isTyping: boolean): Promise<void> {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      try {
        await this.connection.invoke('SendTyping', roomId, isTyping);
      } catch (error) {
        console.error('Error sending typing status:', error);
      }
    }
  }

  async createGroupChat(
    roomName: string,
    roomDescription: string,
    memberIds: string[],
  ): Promise<void> {
    try {
      await this.connection?.invoke(
        'CreateGroupChat',
        roomName,
        roomDescription,
        memberIds,
      );
    } catch (error) {
      console.error('Error creating group chat:', error);
    }
  }

  getConnectionState(): signalR.HubConnectionState | null {
    return this.connection?.state || null;
  }

  isConnected(): boolean {
    return this.connection?.state === signalR.HubConnectionState.Connected;
  }

  public on(event: string, callback: (...args: any[]) => void) {
    this.connection?.on(event, callback);
  }

  public off(event: string, callback: (...args: any[]) => void) {
    this.connection?.off(event, callback);
  }
}

export const signalRService = new SignalRService();
