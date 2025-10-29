<template>
  <div class="auth-content">
    <h2 class="auth-content__title">Forgot password</h2>
    <p class="auth-content__subtitle">We will send you an email with further instructions</p>

    <form class="auth-form">
      <div class="form-group">
        <input type="email" placeholder="example@email.com" class="form-input" />
      </div>

      <button type="submit" class="auth-button auth-button--primary">RESET PASSWORD</button>

      <NuxtLink to="/auth/login" class="auth-link auth-link--muted">CANCEL</NuxtLink>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});
</script>

<style scoped lang="scss">
.auth-content {
  text-align: center;

  &__title {
    font-size: $font-size-4xl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    margin-bottom: $space-xs;
  }

  &__subtitle {
    font-size: $font-size-md;
    color: $color-text-secondary;
    margin-bottom: $space-5xl;
  }
}

.auth-form {
  @include d-flex(center, center, column);
  gap: $space-xl;
}

.form-group {
  text-align: left;
}

.form-input {
  width: 560px;
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
    color: $color-text-muted;
    cursor: pointer;
  }
}

.auth-button {
  width: 220px;
  padding: $space-md $space-lg;
  border-radius: $radius-2xl;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: $font-weight-medium;
  transition: background-color 0.2s ease;

  &--primary {
    background-color: $button-primary-bg;
    color: $button-primary-text;

    &:hover {
      background-color: $button-primary-hover;
    }
  }
}

.auth-link {
  font-size: $font-size-sm;
  text-transform: uppercase;
  margin-top: $space-md;
  text-align: center;

  &--muted {
    color: $color-text-muted;

    &:hover {
      color: $color-text-secondary;
    }
  }
}
</style>
