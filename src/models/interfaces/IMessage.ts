export default interface IMessage {
    type: string,
    payload: any
    prefix: string,
    surfix: string,
    ws: any
}