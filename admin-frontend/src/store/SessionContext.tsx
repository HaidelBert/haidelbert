import React, { useEffect } from "react";

const SessionStateContext = React.createContext<SessionState | undefined>(
  undefined
);
const SessionDispatchContext = React.createContext<
  React.Dispatch<Action> | undefined
>(undefined);

type SessionState = {
  loggedIn: boolean;
  initializing: boolean;
  user?: any;
};

type Action = { type: "initialize_done" };

function sessionReducer(state: SessionState, action: Action): SessionState {
  switch (action.type) {
    case "initialize_done": {
      const { initializing, ...rest } = state;
      return {
        initializing: false,
        ...rest,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function SessionProvider(props: any) {
  const [state, dispatch] = React.useReducer(sessionReducer, {
    initializing: true,
    loggedIn: false,
  });
  return (
    <SessionStateContext.Provider value={state}>
      <SessionDispatchContext.Provider value={dispatch}>
        <InitializeAware>{props.children}</InitializeAware>
      </SessionDispatchContext.Provider>
    </SessionStateContext.Provider>
  );
}

export function useSessionState() {
  const context = React.useContext(SessionStateContext);
  if (context === undefined) {
    throw new Error("useSessionState must be used within a CountProvider");
  }
  return context;
}

export function useSessionDispatch() {
  const context = React.useContext(SessionDispatchContext);
  if (context === undefined) {
    throw new Error("useSessionDispatch must be used within a CountProvider");
  }
  return context;
}

async function initialize(dispatch: React.Dispatch<Action>) {
  dispatch({ type: "initialize_done" });
}

function InitializeAware(props: any) {
  const sessionDispatch = useSessionDispatch();
  const sessionState = useSessionState();
  useEffect(() => {
    initialize(sessionDispatch);
  }, []);
  if (sessionState.initializing) {
    return <div>Loading...</div>;
  }
  return <React.Fragment>{props.children}</React.Fragment>;
}
