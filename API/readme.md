# Seller Store API (Tastezy) – Backend

## API Endpoints

### POST `/api/seller/company-details`

- **Description:** Register company details and upload logo/banner
- **Required fields:** businessName, address, sameAsBusinessAddress, etc.
- **File fields:** logo, banner

### POST `/api/gstin`

- **Description:** Verifies the validity of a given GSTIN (Goods and Services Tax Identification Number).
- **Required Field:**
  - `gstin` (string) – GST number to be verified.
- **Success Response:**

```json
{
  "message": "",
  "data": {
    "gstin": "",
    "legalName": "",
    "taxPayerType": "",
    "gstinStatus": ""
  }
}
```

## Environment Variables

- `MONGO_URI`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CASHFREE_CLIENT_ID`
- `CASHFREE_CLIENT_SECRET`

## Error Handling

Centralized error handler middleware is used for consistent error responses.
