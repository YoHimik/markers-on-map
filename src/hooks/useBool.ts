import { useCallback, useState } from 'react';

export default function useBool(defaultValue = false):
[boolean, () => void, () => void, () => void] {
  const [value, setValue] = useState<boolean>(defaultValue);

  const setTrue = useCallback(() => setValue(true), []);

  const setFalse = useCallback(() => setValue(false), []);

  const switchValue = useCallback(() => setValue((prev) => !prev), []);

  return [value, switchValue, setTrue, setFalse];
}
