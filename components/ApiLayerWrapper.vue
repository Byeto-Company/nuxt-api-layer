<script lang="ts" setup>

// imports

import { VueQueryDevtools } from "@tanstack/vue-query-devtools";

// types

type Props = {
    queryDevtools?: InstanceType<typeof VueQueryDevtools>["$props"]
}

// props

defineProps<Props>();

</script>

<template>
    <slot />
    <VueQueryDevtools
        v-bind="$props.queryDevtools"
    />
</template>
