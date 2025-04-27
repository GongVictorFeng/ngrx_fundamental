import { createReducer, on } from '@ngrx/store';
import { ProductsAPIActions, ProductsPageActions } from './products.actions';
import { Product } from '../product.model';

export interface ProductsState {
  showProductCode: boolean;
  loading: boolean;
  products: Product[];
  errorMessage: string;
}

const initialState: ProductsState = {
  showProductCode: true,
  loading: false,
  products: [],
  errorMessage: '',
};
// export const productsReducer = createReducer(
//   initialState,
//   on(createAction('[Products Page] Toggle Show Product Code'), (state) => ({
//     ...state,
//     showProductCode: !state.showProductCode,
//   }))
// );

export const productsReducer = createReducer(
  initialState,
  on(ProductsPageActions.toggleShowProductCode, (state) => ({
    ...state,
    showProductCode: !state.showProductCode,
  })),
  // three load handlers
  on(ProductsPageActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    products: [],
    errorMessage: '',
  })),
  on(ProductsAPIActions.productsLoadedSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products,
    errorMessage: '',
  })),
  on(ProductsAPIActions.productsLoadedFail, (state, { message }) => ({
    ...state,
    loading: false,
    products: [],
    errorMessage: message,
  })),
  // three add handlers
  on(ProductsPageActions.addProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(ProductsAPIActions.productAddedSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    products: [...state.products, product],
    errorMessage: '',
  })),
  on(ProductsAPIActions.productAddedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  })),
  // three update handlers
  on(ProductsPageActions.updateProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(ProductsAPIActions.productUpdatedSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    products: state.products.map((existingProduct) =>
      existingProduct.id === product.id ? product : existingProduct
    ),
    errorMessage: '',
  })),
  on(ProductsAPIActions.productUpdatedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  })),
  // three delete handlers
  on(ProductsPageActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(ProductsAPIActions.productDeletedSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    products: state.products.filter((product) => product.id !== id),
    errorMessage: '',
  })),
  on(ProductsAPIActions.productDeletedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  }))
);
