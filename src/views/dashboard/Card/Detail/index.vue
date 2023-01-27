<template>
  <div>
    <div class="card-header">
      <span>{{ title }}</span>
      <svg
        t="1674833168762"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3725"
        width="14"
        height="14"
      >
        <path
          d="M512 1024c282.771 0 512-229.23 512-512s-229.23-512-512-512-512 229.23-512 512 229.23 512 512 512zM432 256c0-44.183 35.817-80 80-80s80 35.817 80 80v31.999c0 44.183-35.817 80-80 80s-80-35.817-80-80v-31.999zM431.999 512c0-44.183 35.817-80 80-80s80 35.817 80 80v256c0 44.183-35.817 80-80 80s-80-35.817-80-80v-256z"
          p-id="3726"
          fill="#8a8a8a"
        />
      </svg>
    </div>
    <div class="card-content">{{ count }}</div>
    <div class="card-charts">
      <slot name="charts"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  props: ["title", "count"],
};
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  color: #999;
  font-size: 14px;
}
.card-content {
  margin: 10px 0;
  font-size: 20px;
  font-weight: 500;
}
.card-charts {
  display: flex;
  align-items: center;
  font-size: 12px;
  height: 40px;
  margin-bottom: 5px;
}
.card-footer {
  border-top: 1px solid #eee;
  padding-top: 5px;
  font-size: 13px;
  font-weight: 500;
}
</style>