<template>
  <TBox>
    <TText color="#42b883">
      Hi TEMIR !!
    </TText>
    <input type="text">
  </TBox>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TBox, TText } from '@temir/core'
const count = ref(0)
setInterval(() => {
  count.value++
}, 100)
</script>
