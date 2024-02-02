import { WebSocket, WebSocketServer } from "ws";

export class Wsocket {
  private serverListener: any;
  private wsServer: WebSocketServer | null = null;

  constructor(serverListener: any) {
    this.serverListener = serverListener;
  }

  public start() {
    this.wsServer = new WebSocketServer({ server: this.serverListener });      

    this.wsServer.on("connection", (ws) => {   
      console.log("Client connected");

      ws.on("error", console.error);

      ws.on("message", (data, isBinary) => {
        console.log("received: %s", data);
      });

    //   ws.send("Hello from server");

      ws.on("close", () => {
        console.log("Client disconnected"); 
      });
    });
  }

  stop() {
    if (this.wsServer) {
      this.wsServer.close();
      this.wsServer = null;
    }
  }
}
