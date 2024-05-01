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

  getCityDataByLocationKey: (query) => {
    // Sample data for city details based on location key
    const mockCityData = {
      Version: 1,
      Key: '215854',
      Type: 'City',
      Rank: 31,
      LocalizedName: 'Tel Aviv',
      EnglishName: 'Tel Aviv',
      PrimaryPostalCode: '',
      Region: { ID: 'MEA', LocalizedName: 'Middle East', EnglishName: 'Middle East' },
      Country: { ID: 'IL', LocalizedName: 'Israel', EnglishName: 'Israel' },
      AdministrativeArea: { ID: 'TA', LocalizedName: 'Tel Aviv', EnglishName: 'Tel Aviv', Level: 1, LocalizedType: 'District', EnglishType: 'District', CountryID: 'IL' },
      TimeZone: { Code: 'IDT', Name: 'Asia/Jerusalem', GmtOffset: 3, IsDaylightSaving: true, NextOffsetChange: '2024-10-26T23:00:00Z' },
      GeoPosition: { Latitude: 32.045, Longitude: 34.77, Elevation: { Metric: { Value: 34, Unit: 'm', UnitType: 5 }, Imperial: { Value: 111, Unit: 'ft', UnitType: 0 } } },
      IsAlias: false,
      SupplementalAdminAreas: [],
      DataSets: ['AirQualityCurrentConditions', 'AirQualityForecasts', 'Alerts', 'DailyPollenForecast', 'ForecastConfidence', 'FutureRadar', 'MinuteCast']
    };

    // In a real scenario, you might want to handle different queries and return appropriate mock data

    return mockCityData;
  }
};
