import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUrlLoader = (url: string, deps: any[] = []) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(url).then(res => {
      setData(res.data);
      setLoading(false);
    })
  }, deps)

  return [data, loading];
}