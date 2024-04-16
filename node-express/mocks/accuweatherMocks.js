module.exports = {
    getLocationSuggestions: jest.fn((query) => {
      // Simulate some sample data based on your API response format
      return [
        { Key: '12345', LocalizedName: 'New York City, NY' },
        { Key: '54321', LocalizedName: 'London, UK' },
      ];
    }),
  };