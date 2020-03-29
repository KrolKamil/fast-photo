export default interface IResponse {
    type: string,
    payload: any,
    to: 'player' | 'players' | 'all'
}