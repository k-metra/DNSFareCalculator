import { useCallback, useEffect, useMemo, useState } from 'react'
import Header from './components/header.tsx';
import Dropdown from './components/dropdown.tsx';
import { routes } from './data/routes.ts';
import Value from './components/value.tsx';
import calculateFare from '@utils/calculateFare.ts';
import { useSearchParams } from 'react-router-dom';

import { type PassengerType } from "./utils/types";
import RecentCalculationsTab from './components/recentCalculationsTab.tsx';
import { clearRecentCalculations, getRecentCalculations, saveRecentCalculation, type RecentCalculation } from './utils/recentCalculations.ts';

function App() {

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedRoute = searchParams.get("route") ?? undefined;
  const selectedStartingPoint = searchParams.get("start") ?? undefined;
  const selectedEndingPoint = searchParams.get("end") ?? undefined;
  const numberOfPassengers = searchParams.get("passengers") ?? undefined;
  const passengerType = searchParams.get("type") ?? undefined;
  const bill = searchParams.get("bill") ?? undefined;

  const [recentCalculations, setRecentCalculations] = useState<RecentCalculation[]>();

  const [totalFare, setTotalFare] = useState<string>();
  const [farePerPerson, setFarePerPerson] = useState<string>();
  const [change, setChange] = useState<string>();

  const handleChange = useCallback((key: string, value: string | undefined) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(key, value ?? "");
    setSearchParams(newSearchParams);
  }, [searchParams]);

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
    if (!selectedRoute || !selectedStartingPoint || !selectedEndingPoint || !passengerType || !bill) {
      setFarePerPerson(undefined);
      setChange(undefined);
      setTotalFare(undefined);

      return;
    }

    const startingIndex = routes.find((route) => route.id === selectedRoute)?.stops.findIndex((stop) => stop.id === selectedStartingPoint);
    const endingIndex = routes.find((route) => route.id === selectedRoute)?.stops.findIndex((stop) => stop.id === selectedEndingPoint);

    const { farePerPerson, change, totalFare } = calculateFare(passengerType as PassengerType, Number(numberOfPassengers)!, Number(bill)!, startingIndex!, endingIndex!);

    setFarePerPerson("₱" + String(farePerPerson));
    setChange("₱" + String(change));
    setTotalFare("₱" + String(totalFare));

  }, [selectedRoute, selectedStartingPoint, numberOfPassengers, selectedEndingPoint, passengerType, bill]);

  useEffect(() => {
    const calculations = getRecentCalculations();
    setRecentCalculations(calculations);
  }, []);

  useEffect(() => {
    const allInputsAreComplete = selectedRoute && selectedStartingPoint && selectedEndingPoint && numberOfPassengers && passengerType && bill;
    
    if (!allInputsAreComplete) return;

 
    const timer = setTimeout(() => {
      const result = calculateFare(passengerType as PassengerType, Number(numberOfPassengers)!, Number(bill)!, routes.find((route) => route.id === selectedRoute)?.stops.findIndex((stop) => stop.id === selectedStartingPoint)!, routes.find((route) => route.id === selectedRoute)?.stops.findIndex((stop) => stop.id === selectedEndingPoint)!);

      const newCalculation: RecentCalculation = {
        route: selectedRoute,
        startingPoint: selectedStartingPoint,
        endingPoint: selectedEndingPoint,
        passengerAmount: numberOfPassengers,
        type: passengerType,
        bill: bill,
        farePerPerson: result.farePerPerson,
        totalFare: result.totalFare,
        timestamp: Date.now()
      };

      saveRecentCalculation(newCalculation);

      setRecentCalculations(getRecentCalculations());
    }, 3000);
    

    return () => clearTimeout(timer);
  }, [
    selectedRoute, selectedStartingPoint, selectedEndingPoint, numberOfPassengers, passengerType, bill
  ]);

  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="mx-auto flex flex-col w-full max-w-6xl flex-1 items-center justify-center px-3 py-4 sm:px-5 sm:py-6">

          <section className="mx-auto mt-3 max-w-4xl px-5 py-12 text-center">
            <h1 className="font-main text-2xl font-bold text-white">
              Diesel N' Steel Fare Calculator
            </h1>

            <p className="mx-auto mt-3 max-w-2xl font-main text-white/80">
              Calculate estimated passenger fare with ease in Diesel N Steel. Select your route, starting point, destination, and passenger information to get your fare instantly.
            </p>
          </section>

          <div className="flex w-full flex-col items-stretch justify-center gap-4 rounded-md border border-border px-4 py-5 shadow-md sm:px-6 md:px-8">
              <h2 className="text-lg font-main font-semibold text-white">Route Info</h2>

              <fieldset className="flex w-full flex-col gap-4 border-0 p-0 md:flex-row">
                <div className="w-full md:flex-1">
                  <Dropdown
                      label="Route Name"
                      name="route"
                      value={selectedRoute}
                      options={routeOptions}
                      onChange={handleChange}    
                  />
                </div>

                <div className="w-full md:flex-1">
                  <Dropdown
                    label="Start"
                    name="start"
                    value={selectedStartingPoint}
                    options={stops}
                    disabled={selectedRoute == null}
                    onChange={handleChange}
                  />
                </div>

                <div className="w-full md:flex-1">
                  <Dropdown 
                    name="end"
                    label="End"
                    value={selectedEndingPoint}
                    options={stops}
                    disabled={selectedRoute == null}
                    onChange={handleChange}
                  />
                </div>
              </fieldset>

              <h2 className="text-lg font-main font-semibold text-white">Passenger Info</h2>

              <fieldset className="flex w-full flex-col gap-4 border-0 p-0 md:flex-row">

                <div className="w-full md:flex-1">
                  <Dropdown
                      name="passengers"
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
                      onChange={handleChange}
                  />
                </div>

                <div className="w-full md:flex-1">
                  <Dropdown
                    name="type"
                    label="Passenger Type"
                    options={
                      [
                        {value: "regular", label: "Regular"},
                        {value: "senior", label: "Senior"}
                      ]
                    }
                    value={passengerType}
                    onChange={handleChange}
                  />
                </div>

                <div className="w-full md:flex-1">
                  <Dropdown
                    name="bill"
                    label="Bill"
                    options={
                      [
                        { value: "20", label: "₱20" },
                        { value: "50", label: "₱50" },
                        { value: "100", label: "₱100" }
                      ]
                    }
                    value={bill}
                    onChange={handleChange}
                  />
                </div>
              </fieldset>

              <h2 className="text-white font-semibold text-lg font-main">Total Fare Calculations</h2>

              <fieldset className="flex w-full flex-col gap-2 border-0 p-0 md:flex-row">
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

          <RecentCalculationsTab 

                    calculations={recentCalculations ?? []}
                    onSelect={(calculation) => {

                      const newSearchParams = new URLSearchParams(searchParams);

                      newSearchParams.set("route", calculation.route);
                      newSearchParams.set("start", calculation.startingPoint);
                      newSearchParams.set("end", calculation.endingPoint);
                      newSearchParams.set("passengers", String(calculation.passengerAmount));
                      newSearchParams.set("type", calculation.type);
                      newSearchParams.set("bill", String(calculation.bill));

                      setSearchParams(newSearchParams);
            
                    }}
                    onClear={() => {
                      clearRecentCalculations();
                      setRecentCalculations([]);
                    }}
          />
          

          <section className="mx-auto mt-2 max-w-4xl px-5 py-12">
              <h2 className="font-main text-1xl font-semibold text-white">About the Diesel N Steel Fare Calculator</h2>
              <p className="mt-4 font-main leading-7 text-white/80">
                  The Diesel N Steel Fare Calculator is a fan-made tool designed to help players quickly estimate fares for routes in the Roblox game Diesel N Steel.
              </p>
              <p className="mt-4 font-main leading-7 text-white/80">
                  Select your route, starting point and destination, then enter the passenger information to get an accurate calculation of the estimated fare and the total amount of change.
              </p>
          </section>

          <section className="mx-auto mt-2 max-w-4xl px-5 py-12">
            <h2 className="font-main text-1xl font-semibold text-white">How are fares calculated?</h2>

            <p className="mt-4 font-main leading-7 text-white/80">
              Fares are calculated based on the distance between the starting barangay and the ending barangay. For regular passengers, the minimum fare is ₱13, while for senior passengers, the minimum fare is ₱11. For the first 4 barangays, each passenger pays the minimum fare only. For every succeeding barangay, the fare increases by ₱2, then multiplied by the number of passengers. To get the change, the total fare is subtracted from the bill amount.
            </p>

            <p className="mt-4 font-main leading-7 text-white/80">
              For example, when taking the Malolos-Bulakan route and picking up a passenger from <i>Barangay San Nicolas</i>, they may pay a bill of ₱100 to stop at <i>Barangay Panasahan</i>. The overall route is:
            </p>

            <p className="mt-4 font-main leading-7 text-white/80">
              San Nicolas → Pitpitan → Mambog → Matimbo → <b>Panasahan</b>
            </p>

            <p className="mt-4 font-main leading-7 text-white/80">
              Counting the initial Barangay, for the first 4 barangays, there is no increment. Only the minimum fare. So barangays <i>San Nicolas</i>, <i>Pitpitan</i>, <i>Mambog</i>, and <i>Matimbo</i> would only be charged the minimum fare of ₱13. For Panasahan, since it is past 4 barangays, the fare would be incremented by ₱2. So when calculating the fare, it would be ₱13 + ₱2 = <b>₱15</b>.
            </p>

            <p className="mt-4 font-main leading-7 text-white/80">
              To get the change, simply subtract the total fare from the bill. In this case, ₱100 - ₱15 = <b>₱85</b> change.
            </p>
          </section>

          <section className="mx-auto max-w-4xl p-5">
              <h2 className="font-main text-1xl font-semibold text-white">Available Routes</h2>

                    <p className="mt-4 font-main leading-7 text-white/80">
                      As of August 19, 2026, the following routes listed below are the ones currently available in Diesel N' Steel. <b>Malolos - Bulakan</b> is the most <i>profitable</i> route due to its distance and the number of passengers you could pick up, but its multiple stops can make fare calculation more complicated.
                    </p>

                    <p className="mt-4 font-main leading-7 text-white/80">
                      For beginners, the most recommended route is <b>Guiguinto - Bulakan</b>, as it is the shortest route and has the least number of barangays, meaning all fares are the same.
                    </p>

                    <p className="mt-4 font-main leading-7 text-white/80">
                      For a fair mix of distance and profitability, <b>Balagtas - Bulakan</b> is the recommended route. It is not too long, but has enough barangays to make profit in least amount of hours with a total of <b>5 stops</b>.
                    </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {routes .map((route) => (
                      <div
                        key={route.id}
                        className="rounded-md border-border border p-5 bg-black/15 shadow-lg"
                      >
                        <h3 className="font-main font-semibold text-white">{route.name}</h3>
                        <p className="mt-2 font-main text-sm text-white/80">{route.stops.length} stops</p>
                        <p className="mt-3 font-main text-sm text-white/70">
                          {route.stops.map((stop) => stop.name).join(" → ")}
                        </p>

                      </div>
                    ))}
              </div>
          </section>

          <section className="mx-auto max-w-4xl px-5 py-8">
                    <h2 className="font-main text-1xl font-semibold text-white">About Diesel N Steel</h2>


                    <p className="mt-4 font-main leading-7 text-white/80">
                      Diesel N Steel is a Roblox game centered around the experience of a day-to-day jeepney driver in the Philippines in a Philippine setting. Players can operate jeepneys on different route, each with its own unique stops. The game boasts a highly intuitive customization system that allows players to modify their jeepneys with a variety of colors, designs, and accessories. Players mainly earn money by picking up passengers and collecting their fares, which can be used to upgrade their jeepney or purchase new ones. The game also features a dynamic day-night cycle, weather effects, and a variety of challenges that keep players engaged.
                    </p>

                    <p className="mt-4 font-main leading-7 text-white/80">
                      Aside from fare collection, players also earn a money through a variety of different ways, such as in-game code redemptions, jeepney rentals, and conductor services. The game has a strong community of players who find different ways to maximize earnings throughout the game, with or without a jeepney.
                    </p>

                    <img className="my-5 mx-auto" src="https://tr.rbxcdn.com/180DAY-4123bd0ffb53d8df3d886e38fe9392cd/768/432/Image/Webp/noFilter" alt="Image of 3 in-game player-driven jeepneys from Diesel N' Steel "/>
                    <img className="my-5 mx-auto" src="https://tr.rbxcdn.com/180DAY-8668091968c42c87e9a8ed4247567d5d/768/432/Image/Webp/noFilter" alt="Image of 4 jeepneys lined up in Diesel N' Steel" />
          </section>

          <section className="mx-auto max-w-4xl px-5 py-8">
              <p className="font-main text-sm text-white/50">
                    This is an independent fan-made fare calculator for Diesel N Steel. The creator or this website is not officially affiliated with the game or its developers and moderation team. Fare information may change as the game is updated. 
              </p>
          </section>
        </main>

        <footer className="bg-black/20 border-t-border border-t min-h-20 py-4 px-3 flex justify-center items-center">
            <p className="font-main text-sm text-center text-white/50">
              © 2026 <a className="underline hover:font-semibold hover:cursor-pointer" href="https://github.com/k-metra" rel="noopener" target="_blank">Kurt Metra</a>. All rights reserved.
            </p>
        </footer>

      </div>

    </>
  )
}

export default App
