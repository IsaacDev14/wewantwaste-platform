import { useState, useEffect } from "react";
import axios from "axios";
import type { Skip } from "../types";

// Centralize the API endpoint
const API_URL = "https://app.wewantwaste.co.uk/api/skips/by-location";

export const useSkips = (postcode: string, area: string) => {
  // Group related states into a single state object for cleaner management
  const [data, setData] = useState<{
    skips: Skip[];
    loading: boolean;
    error: string | null;
  }>({
    skips: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Create a cancel token for cleanup
    const source = axios.CancelToken.source();
    
    const fetchSkips = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: { postcode, area },
          cancelToken: source.token,
        });
        setData({ skips: response.data, loading: false, error: null });
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled");
        } else {
          setData({
            skips: [],
            loading: false,
            error: "Unable to load skip sizes. Please try again later.",
          });
        }
      }
    };

    fetchSkips();

    // Cleanup function: This will be called when the component unmounts
    // to prevent memory leaks or state updates on unmounted components.
    return () => {
      source.cancel();
    };
  }, [postcode, area]); // Re-run the effect if postcode or area changes

  // Return the state for the component to use
  return data;
};