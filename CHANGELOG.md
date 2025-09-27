## [1.2.0] - 2025-09-10

### New Features

Add api layer wrapper for cinfigurations and wrapper components

## [1.1.0] - 2025-08-25

### New Features

Add more callbacks and extend functions to app config for better customization.

```typescript
{
    errorCallback?: (errors: string[]) => void;
    extendHeaders?: (headers: AxiosRequestHeaders) => AxiosRequestHeaders;
    unhandledErrorCallback?: () => void;
    customAuthorizationHeader?: (token: string) => string;
}
```

## [1.0.0] - 2025-08-24

### Added

-   Initial release of Nuxt Api layer.

[1.2.0]: https://github.com/Byeto-Company/nuxt-api-layer/releases/tag/v1.2.0
[1.1.0]: https://github.com/Byeto-Company/nuxt-api-layer/releases/tag/v1.1.0
[1.0.0]: https://github.com/Byeto-Company/nuxt-api-layer/releases/tag/v1.0.0