<template>
  <div class="content-frame">
    <div class="content-left">
      <slot name="left"></slot>
    </div>
    <div class="content-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content-frame {
}
.content-left {
  width: var(--content-left-width);
  position: absolute;
  left: 0;
  top: var(--nav-bar-height);
  bottom: 0;
  background: #fff;
  display: flex;
}
.content-right {
  position: absolute;
  top: var(--nav-bar-height);
  left: calc(var(--content-left-width) + 20px);
  right: 0;
  bottom: 0;
}
</style>