import { useEffect, useMemo, useState } from 'react'
import Header from './components/header.tsx';
import Dropdown from './components/dropdown.tsx';
import { routes } from './data/routes.ts';
import Value from './components/value.tsx';

function App() {
  const [selectedRoute, setSelectedRoute] = useState<string>();
  const [selectedStartingPoint, setSelectedStartingPoint] = useState<string>();
  const [selectedEndingPoint, setSelectedEndingPoint] = useState<string>();
  const [numberOfPassengers, setNumberOfPassengers] = useState<string>();
  const [passengerType, setPassengerType] = useState("regular");
  const [bill, setBill] = useState<string>();

  const [totalFare, setTotalFare] = useState<string>();
  const [farePerPerson, setFarePerPerson] = useState<string>();
  const [change, setChange] = useState<string>();

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

              <h2 className="text-lg font-main font-semibold text-white">Passenger Info</h2>

              <fieldset className="flex min-w-full border-0 p-0 gap-2">

                <Dropdown
                    label="No. of Passengers"
                    value={numberOfPassengers}
                    options={
                      [
                        {value: "1", label: "1"},
                        {value: "2", label: "2"},
                        {value: "3", label: "3"},
                        {value: "4", label: "4"},
                        {value: "5", label: "5"}
                      ]
                    }
                    onChange={(value) => setNumberOfPassengers(value)}
                />

                <Dropdown
                  label="Passenger Type"
                  options={
                    [
                      {value: "regular", label: "Regular"},
                      {value: "senior", label: "Senior"}
                    ]
                  }
                  value={passengerType}
                  onChange={(value) => setPassengerType(value)}
                />

                <Dropdown
                  label="Bill"
                  options={
                    [
                      { value: "20", label: "₱20" },
                      { value: "50", label: "₱50" },
                      { value: "100", label: "₱100" }
                    ]
                  }
                  value={bill}
                  onChange={(value) => setBill(value)}
                />
              </fieldset>

              <h2 className="text-white font-semibold text-lg font-main">Total Fare Calculations</h2>

              <fieldset className="flex w-full p-0 gap-2 border-0">
                <Value
                  label="FARE PER PERSON"
                  value={farePerPerson}
                />

                <Value
                  label="TOTAL FARE"
                  value={totalFare}
                />

                <Value
                  label="CHANGE"
                  value={change}
                />
              </fieldset>
          </div>
        </main>

      </div>

    </>
  )
}

export default App
