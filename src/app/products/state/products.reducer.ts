import { createReducer, on } from '@ngrx/store';
import { ProductsAPIActions, ProductsPageActions } from './products.actions';
import { Product } from '../product.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ProductsState extends EntityState<Product> {
  showProductCode: boolean;
  loading: boolean;
  errorMessage: string;
}

const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({});

const initialState: ProductsState = adapter.getInitialState({
  showProductCode: true,
  loading: false,
  errorMessage: '',
});
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
  on(ProductsPageActions.loadProducts, (state) =>
    adapter.setAll([], {
      ...state,
      loading: true,
      errorMessage: '',
    })
  ),
  on(ProductsAPIActions.productsLoadedSuccess, (state, { products }) =>
    adapter.setAll(products, {
      ...state,
      loading: false,
      errorMessage: '',
    })
  ),
  on(ProductsAPIActions.productsLoadedFail, (state, { message }) =>
    adapter.setAll([], {
      ...state,
      loading: false,
      errorMessage: message,
    })
  ),
  // three add handlers
  on(ProductsPageActions.addProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(ProductsAPIActions.productAddedSuccess, (state, { product }) =>
    adapter.addOne(product, {
      ...state,
      loading: false,
      errorMessage: '',
    })
  ),
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
  on(ProductsAPIActions.productUpdatedSuccess, (state, { update }) =>
    adapter.updateOne(update, {
      ...state,
      loading: false,
      errorMessage: '',
    })
  ),
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
  on(ProductsAPIActions.productDeletedSuccess, (state, { id }) =>
    adapter.removeOne(id, {
      ...state,
      loading: false,
      errorMessage: '',
    })
  ),
  on(ProductsAPIActions.productDeletedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  }))
);

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectProductEntities = selectEntities;
export const selectProducts = selectAll;
