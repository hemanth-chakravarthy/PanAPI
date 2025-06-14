# Seller Store API (Tastezy) – Backend


## API Endpoints

### POST `/api/seller/company-details`
- **Description:** Register company details and upload logo/banner
- **Required fields:** businessName, address, sameAsBusinessAddress, etc.
- **File fields:** logo, banner

## Environment Variables
- `MONGO_URI`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Error Handling
Centralized error handler middleware is used for consistent error responses.

