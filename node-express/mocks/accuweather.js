module.exports = {
  getLocationSuggestions: (query) => {
    // Sample data with relevant locations and some variations
    const mockLocations = [
      { Version: 1, Key: '215854', Type: 'City', Rank: 31, LocalizedName: 'Tel Aviv, Israel', Country: { ID: 'IL', LocalizedName: 'Israel' }, AdministrativeArea: { ID: 'TA', LocalizedName: 'Tel Aviv' } }, // Matches Tel Aviv
      { Version: 1, Key: '999999', Type: 'City', Rank: 40, LocalizedName: 'Greater Tel Aviv Area, Israel', Country: { ID: 'IL', LocalizedName: 'Israel' }, AdministrativeArea: { ID: 'TA', LocalizedName: 'Tel Aviv' } }, // Variation of Tel Aviv
      { Version: 1, Key: '54321', Type: 'City', Rank: 45, LocalizedName: 'London, UK', Country: { ID: 'GB', LocalizedName: 'United Kingdom' }, AdministrativeArea: { ID: 'UK', LocalizedName: 'London' } }, // Not relevant to query (optional)
      // Add more mock locations based on expected search results
      // (consider including variations like "Tel Aviv near me", misspellings, etc.)
    ];

    // Optional filtering based on query (customize based on API format)
    const filteredLocations = mockLocations.filter((location) => {
      const lowerCaseQuery = query.toLowerCase();
      const lowerCaseName = location.LocalizedName.toLowerCase();
      return lowerCaseName.includes(lowerCaseQuery); // Case-insensitive search
    });

    return filteredLocations;
  },
};
