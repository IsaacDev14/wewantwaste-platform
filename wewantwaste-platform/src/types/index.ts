// types.ts
// Type definition for a skip, representing a waste container option
export type Skip = {
  id: number; // Unique identifier for the skip
  size: number; // Volume of the skip in cubic yards
  hire_period_days: number; // Number of days for the hire period
  price_before_vat: number; // Base price before VAT
  vat: number; // VAT percentage applied to the price
  allowed_on_road: boolean; // Indicates if the skip can be placed on a road without a permit
};