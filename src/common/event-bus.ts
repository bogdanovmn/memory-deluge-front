import mitt from 'mitt'

export enum Event {
    logout = 'logoutEvent',
    login = 'loginEvent',
    authError = 'authErrorEvent'
}

export const eventBus = mitt()