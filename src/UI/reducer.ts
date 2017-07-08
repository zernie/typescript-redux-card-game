export interface Action<P> {
  type: string;
  payload: P;
  error?: boolean;
  meta?: Object;
}

// export interface IActionCreator<P> {
//   type: string;
//   (payload: P): Action<P>;
// }

const START_GAME = 'START_GAME';
export const startGame = ({type: START_GAME});

const reducer = (state: any = [], action: Action<any>) => {
  switch (action.type) {
    case START_GAME:

    default:
      return state;
  }
};

export default reducer;
