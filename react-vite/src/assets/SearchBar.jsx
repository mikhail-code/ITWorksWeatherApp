import { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import axios from "axios";

const SearchBar = ({ onCitySelected }) => {
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //  function to update city on click
  const handleCitySelected = (chosenCity) => {
    console.log('You chose:', chosenCity);
    setSelected(chosenCity); // Update the selected state
    onCitySelected(chosenCity); // Notify the parent component about the selected city
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/weather/searchCity?q=${query}`);
        console.log(response);
        setFilteredCities(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (query !== "") {
      fetchData();
    } else {
      setFilteredCities([]);
    }
  }, [query]);

  return (
    <div className="relative mt-1 min-w-96">
      <Combobox
        value={selected}
        onChange={handleCitySelected}
        selectedCity={selected}
      >
        <div className="combobox-wrapper">
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                displayValue={(person) => person.name}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 theme-secondary-color">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {loading ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                    Loading...
                  </div>
                ) : error ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-red-600">
                    Error: {error.message}
                  </div>
                ) : filteredCities.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredCities.map((city) => (
                    <Combobox.Option
                      key={city.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-teal-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={city} // Ensure that value is set to the city object
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {city.LocalizedName}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-teal-600"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </div>
      </Combobox>
    </div>
  );
}

export default SearchBar;