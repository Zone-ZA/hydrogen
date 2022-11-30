export const RESOURCE_TYPES = Object.freeze({
  BLOG: 'BLOG',
  ARTICLE: 'ARTICLE',
  CATALOG: 'CATALOG',
  COLLECTION: 'COLLECTION',
  COLLECTIONS: 'COLLECTIONS',
  FRONT_PAGE: 'FRONT_PAGE',
  PAGE: 'PAGE',
  PRODUCT: 'PRODUCT',
  SEARCH: 'SEARCH',
  POLICIES: 'POLICIES',
});

export const REQUIRED_RESOURCES = Object.freeze([
  RESOURCE_TYPES.PRODUCT,
  RESOURCE_TYPES.COLLECTION,
  RESOURCE_TYPES.FRONT_PAGE,
]);