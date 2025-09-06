import { useState, useEffect, useContext } from 'react';
import { LocationContext } from '../context/LocationContext';
import { getNotifications } from '../services/notifications';
import { getCategories } from '../services/categories';
import { getAddressFromCoordinates } from '../services/location';
import { getLatestProducts, getPopularProducts } from '../services/products';
import { getRestaurants } from '../services/restaurants';
import { getBanners } from '../services/banners';

interface LocationContextType {
  location: { latitude: number; longitude: number; zoneId?: string };
  setLocation: (location: { latitude: number; longitude: number; zoneId?: string }) => void;
}

const useHomeData = (routeParams?: any) => {
  const locationContext = useContext<LocationContextType | undefined>(LocationContext);

  const [address, setAddress] = useState('Loading...');
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loadingLatestProducts, setLoadingLatestProducts] = useState(true);
  const [popularProducts, setPopularProducts] = useState([]);
  const [loadingPopularProducts, setLoadingPopularProducts] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(true);
  const [banner, setBanner] = useState(null);
  const [loadingBanner, setLoadingBanner] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Location handling
  useEffect(() => {
    if (routeParams?.selectedLocation) {
      const { latitude, longitude, address: newAddress } = routeParams.selectedLocation;
      if (locationContext?.setLocation) {
        locationContext.setLocation({ latitude, longitude, zoneId: locationContext.location?.zoneId });
      }
      setAddress(newAddress || 'Could not find address');
    } else if (locationContext?.location) {
      const { latitude, longitude } = locationContext.location;
      getAddressFromCoordinates(latitude, longitude)
        .then(addr => setAddress(addr || 'Could not find address'))
        .catch(() => setAddress('Could not find address'));
    }
  }, [locationContext?.location, routeParams?.selectedLocation, locationContext]);

  // Fetch Banners
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoadingBanner(true);
        setError(null);
        const { latitude, longitude, zoneId } = locationContext?.location || {};
        if (zoneId) {
          const response = await getBanners(zoneId, longitude, latitude);
          if (response && response.banners && response.banners.length > 0) {
            setBanner(response.banners[0]);
          }
        } else {
          // Zone ID not available, skipping banner fetch.
        }
      } catch (err) {
        console.error('Failed to fetch banners:', err);
        setError('Failed to load banners.');
      } finally {
        setLoadingBanner(false);
      }
    };

    fetchBanners();
  }, [locationContext?.location]);

  // Fetch Notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setError(null);
        const response = await getNotifications();
        if (response && response.data) {
          setNotificationCount(response.data.length);
        }
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
        setError('Failed to load notifications.');
      }
    };

    fetchNotifications();
  }, []);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        setError(null);
        const response = await getCategories();
        if (response && Array.isArray(response.data)) {
          setCategories(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError('Failed to load categories.');
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch Latest Products
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        setLoadingLatestProducts(true);
        setError(null);
        const response = await getLatestProducts(1, 1, 10, 0);
        // console.log('API Response:', response); // Removed console.log
        if (response && Array.isArray(response.data.products)) {
          setLatestProducts(response.data.products);
        }
      } catch (err) {
        console.error('Failed to fetch latest products:', err);
        setError('Failed to load latest products.');
      } finally {
        setLoadingLatestProducts(false);
      }
    };

    fetchLatestProducts();
  }, []);

  // Fetch Popular Products
  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        setLoadingPopularProducts(true);
        setError(null);
        const response = await getPopularProducts();
        if (response && Array.isArray(response.data)) {
          setPopularProducts(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch popular products:', err);
        setError('Failed to load popular products.');
      } finally {
        setLoadingPopularProducts(false);
      }
    };

    fetchPopularProducts();
  }, []);

  // Fetch Restaurants
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoadingRestaurants(true);
        setError(null);
        const response = await getRestaurants(1, 10, 0);
        if (response && Array.isArray(response.data.restaurants)) {
          setRestaurants(response.data.restaurants);
        }
      } catch (err) {
        console.error('Failed to fetch restaurants:', err);
        setError('Failed to load restaurants.');
      } finally {
        setLoadingRestaurants(false);
      }
    };

    fetchRestaurants();
  }, []);

  return {
    address,
    notificationCount,
    categories,
    loadingCategories,
    latestProducts,
    loadingLatestProducts,
    popularProducts,
    loadingPopularProducts,
    restaurants,
    loadingRestaurants,
    banner,
    loadingBanner,
    error,
  };
};

export default useHomeData;
