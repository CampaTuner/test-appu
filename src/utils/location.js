import Geolocation from 'react-native-geolocation-service';

const getCurrentLocation = async () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async (pos) => {
        const { longitude, latitude } = pos.coords;

        const details = {
          coordinates: [longitude, latitude],
          address: '',
          state: '',
          city: '',
          postcode: '',
          country: '',
          district: '',
        };

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            {
              headers: { 'User-Agent': 'ReactNativeApp' },
            }
          );

          const data = await res.json();

          details.address = data.display_name || '';

          if (data.address) {
            details.state = data.address.state || '';
            details.city = data.address.city || data.address.town || data.address.village || '';
            details.postcode = data.address.postcode || '';
            details.country = data.address.country || '';
            details.district = data.address.county || data.address.suburb || '';
          }

          resolve(details);
        } catch (err) {
          console.error('Reverse geocoding failed:', err);
          reject('Unable to fetch address.');
        }
      },
      (err) => {
        console.error('Geolocation error:', err);
        reject('Unable to retrieve GPS coordinates.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
};

export default getCurrentLocation;
