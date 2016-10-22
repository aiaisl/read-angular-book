import { Action, Reducer, Store, createStore } from 'redux';
interface AppState {
    message: string[]
}

interface AddMessageAction extends Action {
    message: string;
}
interface DeleteMessageAction extends Action {
    index: number;
}
let initialState: AppState = {message: []};
let reducer: Reducer<AppState> = (state: AppState = initialState, action: Action)=> {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return {
                message: state.message.concat((<AddMessageAction>action).message)
            }
        case 'DELETE_MESSAGE':
            let idx = (<DeleteMessageAction>action).index;
            return {
                message: [
                    ...state.message.slice(0, idx),
                    ...state.message.slice(idx + 1, state.message.length)
                ]
            }
    }
}
class MessageAction {
    static addMessage(message: string): AddMessageAction {
        return {
            type: 'ADD_MESSAGE',
            message: message
        }
    }
    static deleteMessage(index: number): DeleteMessageAction {
        return {
            type: 'DELETE_MESSAGE',
            index: index
        }
    }
}
let store: Store<AppState> = createStore<AppState>(reducer);

console.log(store.getState());
store.dispatch(MessageAction.addMessage('Would you say the fringe was mode of silk?'));

store.dispatch(MessageAction.addMessage('Wouldnt hace no other kind but silk'))

store.dispatch(MessageAction.addMessage('Has it relly got a team of snow white horses?'));

console.log(store.getState());