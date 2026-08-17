import { useEffect, useMemo, useState } from 'react'
import Header from './components/header.tsx';
import Dropdown from './components/dropdown.tsx';
import { routes } from './data/routes.ts';

function App() {
  const [selectedRoute, setSelectedRoute] = useState<string>();
  const [selectedStartingPoint, setSelectedStartingPoint] = useState<string>();
  const [selectedEndingPoint, setSelectedEndingPoint] = useState<string>();

  const routeOptions = useMemo(() => {
    return routes.map((route) => ({
      value: route.id,
      label: route.name,
    }));
  }, []);

  const stops = useMemo(() => {
    if (!selectedRoute) return [{ value: "", label: "" }];

    return (routes.find((route) => route.id === selectedRoute)?.stops.map((stop) => ({ value: stop.id, label: stop.name }))) ?? [];
  }, [selectedRoute]);

  useEffect(() => {
    setSelectedEndingPoint("");
    setSelectedStartingPoint("");
  }, [selectedRoute])

  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="m-5 flex flex-1 items-center justify-center">

          <div className="flex flex-col items-center justify-center gap-4 rounded-md border-border border py-5 px-8 shadow-md min-w-240">
              <h2 className="text-lg font-main font-semibold text-white">Route Info</h2>

              <fieldset className="flex min-w-full border-0 p-0 gap-2">
                <Dropdown
                    label="Route Name"
                    value={selectedRoute}
                    options={routeOptions}
                    onChange={setSelectedRoute}    
                />  

                <Dropdown
                  label="Start"
                  value={selectedStartingPoint}
                  options={stops}
                  disabled={selectedRoute == null}
                  onChange={setSelectedStartingPoint}
                />

                <Dropdown 
                  label="End"
                  value={selectedEndingPoint}
                  options={stops}
                  disabled={selectedRoute ==null}
                  onChange={setSelectedEndingPoint}
                />
              </fieldset>
          </div>
        </main>

      </div>

    </>
  )
}

export default App
