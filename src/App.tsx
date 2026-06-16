import { useState } from "react";

import { Header } from "./app/layout/Header";
import { Sidebar } from "./app/layout/Sidebar";
import { MainLayout } from "./app/layout/MainLayout";

import { solids } from "./data/solids";

import { SceneCanvas } from "./scene/SceneCanvas";
import { SolidRenderer } from "./scene/SolidRenderer";

import { DynamicForm } from "./components/forms/DynamicForm";
import { ResultCard } from "./components/results/ResultCard";
import { StepsCard } from "./components/results/StepsCard";

function App() {
  const [solidId, setSolidId] =
    useState("sphere");

  const [result, setResult] =
    useState<any>(null);

  const [formValues, setFormValues] =
    useState<Record<string, number>>({});

  const solid =
    solids.find(
      (s) => s.id === solidId
    )!;

  return (
    <>
      <Header />

      <MainLayout
        sidebar={
          <Sidebar
            selected={solidId}
            onSelect={setSolidId}
          />
        }
      >
        <div className="space-y-6 p-6">
          <DynamicForm
            fields={solid.inputs}
            onValuesChange={
              setFormValues
            }
            onSubmit={(values) =>
              setResult(
                solid.calculate(values)
              )
            }
          />

          <SceneCanvas>
            <SolidRenderer 
              solidId={solidId}
              values={formValues}
            />
          </SceneCanvas>

          {result && (
            <>
              <StepsCard
                steps={result.steps}
              />

              <ResultCard
                volume={
                  result.volume
                }
              />
            </>
          )}
        </div>
      </MainLayout>
    </>
  );
}

export default App;