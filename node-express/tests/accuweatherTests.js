const mockAccuweather = require('../__mocks__/accuweather');
const { getLocationSuggestions } = require('../services/accuweather'); // Import original for testing
const { jest } = require('@jest/globals');

test('getLocationSuggestions returns suggestions for a query', async () => {
  const query = 'London';
  const suggestions = await getLocationSuggestions(query);
  expect(suggestions).toEqual([
    { Key: '12345', LocalizedName: 'New York City, NY' },
    { Key: '54321', LocalizedName: 'London, UK' },
  ]);
  expect(mockAccuweather.getLocationSuggestions).toHaveBeenCalledWith(query);
});
