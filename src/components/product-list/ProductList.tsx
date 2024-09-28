import { useEffect, useState } from 'react';
import { Product, productsUrl } from '../../constants';

export const ProductList = () => {
  const [keyword, setKeyword] = useState('');
  const [isFetching, setFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setFetching(true);
    fetch(productsUrl)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error();
      })
      .then(setData)
      .catch(() => setIsError(true))
      .finally(() => setFetching(false));
  }, []);

  return (
    <main>
      <h1>Products</h1>
      <label htmlFor="keyword">Keyword</label>
      <input
        id="keyword"
        type="text"
        value={keyword}
        onChange={(event) => {
          setKeyword(event.target.value);
        }}
      />
      {isFetching && (
        <div role="status" aria-label="Loading">
          Loading
        </div>
      )}
      {isError && (
        <div role="alert" aria-label="Error">
          Error
        </div>
      )}
      {data && (
        <ul>
          {filterProducts(data, keyword).map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
};

export const filterProducts = (
  products: Product[] | undefined,
  keyword: string,
) => {
  if (products === undefined) return [];
  if (keyword === '') return products;
  return products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase()),
  );
};
