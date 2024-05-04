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

  getCurrentConditions: (locationKey) => {
    // Sample mock data for current conditions
    return [
      {
        "LocalObservationDateTime": "2024-05-01T04:47:00+03:00",
        "EpochTime": 1714528020,
        "WeatherText": "Mostly cloudy",
        "WeatherIcon": 38,
        "HasPrecipitation": false,
        "PrecipitationType": null,
        "IsDayTime": false,
        "Temperature": {
          "Metric": {
            "Value": 20,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 68,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
      }
    ];
  },

  getHistoricalConditions: (locationKey, hoursAgo) => {
    // Sample mock data for historical conditions (replace with logic to generate data for different hours)
    const conditions = [];
    for (let i = 0; i <= hoursAgo; i++) {
      const hoursBack = new Date();
      hoursBack.setHours(hoursBack.getHours() - i);
      const localDateTime = hoursBack.toISOString().slice(0, 16) + "+03:00";
      const epochTime = hoursBack.getTime() / 1000;
      
      conditions.push({
        "LocalObservationDateTime": localDateTime,
        "EpochTime": epochTime,
        "WeatherText": "Mostly cloudy", // Adjust weather text based on logic
        "WeatherIcon": 38,
        "HasPrecipitation": false,
        "PrecipitationType": null,
        "IsDayTime": hoursBack.getHours() >= 6 && hoursBack.getHours() < 18, // Assuming daytime between 6AM and 6PM
        "Temperature": {
          "Metric": {
            "Value": 20 - (i * 0.1), // Adjust temperature based on logic (e.g., decrease slightly for earlier hours)
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 68 - (i * 0.2), // Adjust temperature for Fahrenheit
            "Unit": "F",
            "UnitType": 18
          }
        },
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
      });
    }
    return conditions;
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
  },

  get12HoursForecast: () => {
    // Sample mock data for 12-hour forecast (modify based on your actual data structure)
    return [
      {
        "DateTime": "2024-05-04T22:00:00+03:00",
        "EpochDateTime": 1714849200,
        "WeatherIcon": 36,
        "IconPhrase": "Intermittent clouds",
        "HasPrecipitation": false,
        "IsDaylight": false,
        "Temperature": {
          "Value": 71,
          "Unit": "F",
          "UnitType": 18
        },
        "PrecipitationProbability": 0,
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=1&hbhhour=22&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=1&hbhhour=22&lang=en-us"
      },
      {
        "DateTime": "2024-05-04T23:00:00+03:00",
        "EpochDateTime": 1714852800,
        "WeatherIcon": 36,
        "IconPhrase": "Intermittent clouds",
        "HasPrecipitation": false,
        "IsDaylight": false,
        "Temperature": {
          "Value": 70,
          "Unit": "F",
          "UnitType": 18
        },
        "PrecipitationProbability": 0,
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=1&hbhhour=23&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=1&hbhhour=23&lang=en-us"
      },
      // Include remaining hours from your data (up to 12 entries)
      {
        "DateTime": "2024-05-05T09:00:00+03:00",
        "EpochDateTime": 1714888800,
        "WeatherIcon": 3,
        "IconPhrase": "Partly sunny",
        "HasPrecipitation": false,
        "IsDaylight": true,
        "Temperature": {
          "Value": 71,
          "Unit": "F",
          "UnitType": 18
        },
        "PrecipitationProbability": 0,
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=9&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/hourly-weather-forecast/215854?day=2&hbhhour=9&lang=en-us"
      }
    ];
  },

  get5DaysForecast: () => {
    return {
      "Headline": {
        "EffectiveDate": "2024-05-06T02:00:00+03:00",
        "EffectiveEpochDate": 1714950000,
        "Severity": 3,
        "Text": "Expect showery weather late Sunday night through Monday morning",
        "Category": "rain",
        "EndDate": "2024-05-06T14:00:00+03:00",
        "EndEpochDate": 1714993200,
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us"
      },
      "DailyForecasts": [
        {
          "Date": "2024-05-04T07:00:00+03:00",
          "EpochDate": 1714795200,
          "Temperature": {
            "Minimum": {
              "Value": 66,
              "Unit": "F",
              "UnitType": 18
            },
            "Maximum": {
              "Value": 78,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Day": {
            "Icon": 1,
            "IconPhrase": "Sunny",
            "HasPrecipitation": false
          },
          "Night": {
            "Icon": 35,
            "IconPhrase": "Partly cloudy",
            "HasPrecipitation": false
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
          "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us"
        }
    ]
  }
  }
};
