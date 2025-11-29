<script lang="ts" setup>

// imports

import { VueQueryDevtools } from "@tanstack/vue-query-devtools";

// types

type Props = {
    dir?: "ltr" | "rtl";
    queryDevtools?: InstanceType<typeof VueQueryDevtools>["$props"]
}

// props

withDefaults(defineProps<Props>(), {
    dir: "rtl"
});

</script>

<template>
    <slot />
    <div :dir="dir">
        <VueQueryDevtools
            :dir="dir"
            v-bind="$props.queryDevtools"
        />
    </div>
</template>
