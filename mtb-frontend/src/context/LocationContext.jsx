import { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext()


export const LocationProvider = ({ children }) => {

    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchLocationData = async (latitude, longitude) => {
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                );
                const data = await res.json();
                const userLocation = data?.address?.state;
                setLocation(userLocation);
            } catch (error) {
                setError("Failed to fetch location data");
            } finally {
                setLoading(false);
            }
        }

        // Logic to fetch and set location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchLocationData(latitude, longitude);
            },
            (error) => {
                console.error("Geolocation error:", error.code, error.message);

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setError("Location permission denied");
                        break;

                    case error.POSITION_UNAVAILABLE:
                        setError("Location information unavailable");
                        break;

                    case error.TIMEOUT:
                        setError("Location request timed out");
                        break;

                    default:
                        setError("Unable to retrieve your location");
                }

                setLoading(false);
            },
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 300000
            }
        )

    }, []);

    return (
        <LocationContext.Provider value={{ location, loading, error }}>
            {children}
        </LocationContext.Provider>
    )
}

export const useLocation = () => useContext(LocationContext);