export default interface IResponse {
    response: {
        type: string,
        payload: any,
    }
    to: 'player' | 'players' | 'all'
}