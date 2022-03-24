import { useState } from 'react';

const defaultMapData = <T, U>(data: T) => data as unknown as U;

export default <T, U, V>(postMethod: (data: U) => Promise<V>, mapData: (data: T) => U = defaultMapData) => {
  const [isSubmitted, setSubmitted] = useState(false);
  const [data, setData] = useState<T>();

  const onSubmit = async (data: T) => {
    setSubmitted(true);
    setData(data);
  };

  const onSubmitConfirm = async () => {
    if (data === undefined) return;
    const result = await postMethod(mapData(data));
    setSubmitted(false);
    return result;
  };

  const onCancelConfirm = () => {
    setSubmitted(false);
  };

  return {
    isSubmitted,
    data,
    onSubmit,
    onSubmitConfirm,
    onCancelConfirm,
  };
};
