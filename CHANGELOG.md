## [1.1.1] - 2025-09-27

### New Features

Add data field to ApaPaginated and also add D generic parameter to define its type

```typescript
type ApiPaginated<T, D = object> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
    data?: D;
};
```

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

[1.1.1]: https://github.com/Byeto-Company/nuxt-api-layer/releases/tag/v1.1.1
[1.1.0]: https://github.com/Byeto-Company/nuxt-api-layer/releases/tag/v1.1.0
[1.0.0]: https://github.com/Byeto-Company/nuxt-api-layer/releases/tag/v1.0.0
