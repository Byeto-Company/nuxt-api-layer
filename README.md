### Installation and Dependencies

`npm i @tanstack/vue-query @tanstack/vue-query-devtools axios @nuxtjs/i18n`

### Global api types

---

```typescript
type ApiPaginated<T, D = object> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
    data?: D;
};

type ApiErrorData = Record<string, (string | ApiErrorData)[]>;

type ApiError = AxiosError<ApiErrorData>;
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

### Api components list

---

- `components/ApiLayerWrapper.vue`
