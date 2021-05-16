<template>
  <div :style="{ width: formatWidth }" class="panel">
    <div class="header">
      <slot name="header" />
    </div>
    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
// 这是一个布局组件 panel
export default {
  props: {
    width: {
      type: [String, Number],
      default: "100%",
    },
  },
  computed: {
    formatWidth() {
      const { width } = this;
      //   return typeof width === "number"  ? width + "px" :Number(width)? width+'px':width;
      return typeof width === "number" || Number(width) ? width + "px" : width;
    },
  },
};
</script>

<style lang='less'>
.panel {
  width: 100%;
  border-radius: 4px;
  .header {
    padding: 10px;
    background-color: #f6f6f6;
    color: #51585c;
  }
  .content {
    padding: 10px;
    background-color: #fff;
  }
}
</style>