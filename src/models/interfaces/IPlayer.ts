export default interface IPlayer {
    id: string,
    ws: WebSocket,
    ready: boolean,
    word: string | null
}