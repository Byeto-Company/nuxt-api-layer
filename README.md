### Installation and Dependencies

`npm i @tanstack/vue-query @tanstack/vue-query-devtools axios @nuxtjs/i18n`

### Global api types

---

```typescript
type ApiPaginated<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
};

type ApiErrorData = Record<string, (string | ApiErrorData)[]>;

type ApiError = AxiosError<ApiErrorData>;
```

### App configs

---

```typescript
    {
        appApi?: {
            errorCallback?: (errors: string[]) => void;
            unhandledErrorCallback?: () => void;
        };
    }
```

### Api composables list

---

- `composables/useCreate.ts`
- `composables/useDelete.ts`
- `composables/useInfiniteMany.ts`
- `composables/useMany.ts`
- `composables/useOne.ts`
- `composables/usePaginatedMany.ts`
- `composables/useUpdate.ts`
