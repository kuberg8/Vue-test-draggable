<template>
  <div
    class="card text-white bg-primary mb-3"
    style="max-width: 18rem;"
    @click="$emit('click')"
    @dragstart="$emit('dragstart', $event)"
    @drop="$emit('drop', $event)"
    @dragenter.prevent
    @dragover.prevent
  >
    <div class="card-header title">{{ name }}</div>
    <div class="card-body" style="max-height: 147px; overflow: auto">
      <p class="card-text">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
};
</script>
