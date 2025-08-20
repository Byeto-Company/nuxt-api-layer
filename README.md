### Dependencies

This layer is dependent on nuxt-api-layer

---

### Define account type

```typescript
export {};

declare global {
    type AccountProfile = /* Account Object */

    type UpdateAccountProfile = /* Account Updatable Object */
}
```

---

### Customize auth options

```typescript
  appAuth: {
      internalPage: false,
      otpCount: 4,
      otpTimer: 60,
      pagePath: "/login",
  }
```
