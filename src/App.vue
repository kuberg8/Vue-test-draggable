<template>
  <div>
    <router-view class="page" />
  </div>
</template>

<style>
body {
  background: #f8f9fa;
  margin: 20px;
}

.page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}

.title {
  display: inline;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
