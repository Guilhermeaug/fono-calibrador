import * as React from "react";

type Props = {
  children: React.ReactNode;
};

type EvaluationData = {
  duration: number;
  numberOfAttempts: number;
  roughness: number;
  breathiness: number;
};

const TestsContext = React.createContext({
  evaluations: [] as EvaluationData[],
  setEvaluations: (evaluations: EvaluationData[]) => {},
});

export function TestsProvider({ children }: Props) {
  const [evaluations, setEvaluations] = React.useState<EvaluationData[]>([]);

  return (
    <TestsContext.Provider
      value={{
        evaluations,
        setEvaluations,
      }}
    >
      {children}
    </TestsContext.Provider>
  );
}
