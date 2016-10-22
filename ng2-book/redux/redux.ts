interface ListenerCallback {
    (): void
}
interface UnsubscribeCallback {
    (): void
}
interface Action {
    type: string;
    payload?: any;
}

interface Reducer<T> {
    (state: T, action: Action): T;
}

let reducer: Reducer<number> = (state: number, action: Action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        case 'PLUS':
            return state + action.payload;
        default:
            return state;
    }
}

let incrementAction: Action = { type: 'INCREMENT' };
let decrementAction: Action = { type: 'DECREMENT' };
let plusSevenAction: Action = { type: 'PLUS', payload: 7 };
console.log(reducer(0, incrementAction));
console.log(reducer(0, decrementAction));


console.log(reducer(3, {
    type: 'PLUS',
    payload: 9000
}));

class Store<T> {
    private _state: T;
    private _listeners: ListenerCallback[] = [];

    constructor(
        private reducer: Reducer<T>,
        initialState: T
    ) {
        this._state = initialState;
    }

    getState(): T {
        return this._state;
    }

    dispatch(action: Action): void {
        this._state = this.reducer(this._state, action);
        this._listeners.forEach((listener: ListenerCallback) => listener());
    }

    subscribe(listener: ListenerCallback): UnsubscribeCallback {
        this._listeners.push(listener);
        return () => {
            this._listeners = this._listeners.filter(l => l !== listener);
        }
    }
}

let store = new Store<number>(reducer, 0);

console.log(store.getState());

let unsubscribe = store.subscribe(() => {
    console.log('subscribed:', store.getState());
})

store.dispatch({
    type: "INCREMENT"
});

store.dispatch({
    type: 'INCREMENT'
});

unsubscribe();

store.dispatch({
    type: 'DECREMENT'
});

interface AppState {
    message: string[]
}

interface AddMessageAction extends Action {
    message: string;
}
interface DeleteMessageAction extends Action {
    index: number;
}
let messageReducer: Reducer<AppState> = (state: AppState, action: Action): AppState => {
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

let messageStore = new Store<AppState>(messageReducer, { message: [] });

messageStore.subscribe(()=>{
    console.log(messageStore.getState());
})
messageStore.dispatch(MessageAction.addMessage('Would you say the fringe was mode of silk?'));

messageStore.dispatch(MessageAction.addMessage('Wouldnt hace no other kind but silk'))

messageStore.dispatch(MessageAction.addMessage('Has it relly got a team of snow white horses?'));

messageStore.dispatch(MessageAction.deleteMessage(2));