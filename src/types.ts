/**
 * Can be used to make a type of an existing object.
 * @example type RootModule = Identity<typeof rootModule>
 */
export type Identity<T> = T;

/**
 *
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 *
 */
export type RequireAll<T> = T & {
  [P in keyof T]: T[P];
}

/**
 *
 */
export type Optionalize<T, K extends keyof T> = Omit<T, K> & Partial<T>;

/**
 *
 */
export type Require<T, K extends keyof T> = T & {
  [P in K]: T[P];
}


// https://stackoverflow.com/questions/49682569/typescript-merge-object-types

// Names of properties in T with types that include undefined
type OptionalPropertyNames<T> =
  { [K in keyof T]: undefined extends T[K] ? K : never }[keyof T];

// Common properties from L and R with undefined in R[K] replaced by type in L[K]
type SpreadProperties<L, R, K extends keyof L & keyof R> =
  { [P in K]: L[P] | Exclude<R[P], undefined> };

type Id<T> = {[K in keyof T]: T[K]} // see note at bottom*

// Type of { ...L, ...R }
export type Spread<L, R> = Id<
  // Properties in L that don't exist in R
  & Pick<L, Exclude<keyof L, keyof R>>
  // Properties in R with types that exclude undefined
  & Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>>
  // Properties in R, with types that include undefined, that don't exist in L
  & Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>>
  // Properties in R, with types that include undefined, that exist in L
  & SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
  >;