<template>
  <div class="form-group">
    <div class="password-wrapper">
      <input type="password" placeholder="Password" class="form-input" />
      <Icon name="mdi:eye" size="1.2em" class="password-icon" mode="svg" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.form-group {
  text-align: left;
  width: 100%;
}

.form-input {
  width: 100%;
  padding: $space-md $space-lg;
  border-radius: $radius-sm;
  border: $border-outline;
  background-color: transparent;
  color: $color-text-primary;
  font-size: $font-size-md;

  &:focus {
    outline: none;
    border: $border-outline-hover;
  }
}

.password-wrapper {
  position: relative;

  .form-input {
    padding-right: $space-4xl;
  }

  .password-icon {
    position: absolute;
    right: $space-lg;
    top: 50%;
    transform: translateY(-50%);
    color: $color-text-primary;
    z-index: 10;
    cursor: pointer;
  }
}
</style>
