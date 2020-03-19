<template>
  <q-icon
    name="fas fa-info-circle"
    class="q-pl-sm"
    style="opacity:0.5;"
  >
    <q-tooltip :content-style="{ 'width': '200px' }">
      {{ message }}
    </q-tooltip>
  </q-icon>
</template>

<script>
export default {
  name: 'TemplateToolTip',

  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>
