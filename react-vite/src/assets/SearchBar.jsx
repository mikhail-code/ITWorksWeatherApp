import { useState, useEffect } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import axios from 'axios';

const cities = [
  { id: 1, name: 'Tel Aviv' },
  { id: 2, name: 'Moscow' },
  { id: 3, name: 'London' },
];

export default function Example() {
  const [selected, setSelected] = useState(cities[0].name);
  const [query, setQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);

  const fetchCitySuggestions = async (query) => {
    try {
      const response = await axios.get(`/searchCity?q=${query}`);
      setFilteredCities(response.data);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
    }
  };

  useEffect(() => {
    if (query.length > 0) {
      fetchCitySuggestions(query);
    } else {
      setFilteredCities([]);
    }
  }, [query]);

  return (
    <div className="">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1 min-w-72">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              optionToString={(option) => option}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <HiMagnifyingGlass className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition
            as={null}
            in={filteredCities.length > 0 || query === ''}
            appear={true}
            unmountOnExit={true}
            enter="transition ease-in duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredCities.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">Nothing found.</div>
              ) : (
                filteredCities.map((city) => (
                  <Combobox.Option
                    key={city.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={city.name}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {city.name}
                        </span>
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'}`}>
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
      </Combobox>
    </div>
  );
}
