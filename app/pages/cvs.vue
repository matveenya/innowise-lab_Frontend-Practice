<template>
  <div class="cvs-page">
    <h2 class="page-title-small">CVs</h2>

    <div class="cvs-page__controls-and-button">
      <div class="search-input-wrapper">
        <Icon name="ic:baseline-search" size="1.5em" mode="svg" class="search-icon" />
        <input type="text" placeholder="Search" class="search-input" />
      </div>
      <button class="create-button">
        <Icon name="ic:baseline-plus" size="1.2em" mode="svg" />
        CREATE CV
      </button>
    </div>

    <div class="cvs-page__table-wrapper">
      <div class="cvs-page__table-header">
        <span class="table-header__item sortable">
          Name
          <Icon name="ic:baseline-arrow-upward" size="1em" mode="svg" />
        </span>
        <span class="table-header__item">Education</span>
        <span class="table-header__item">Employee</span>
      </div>
    </div>

    <div class="cvs-page__content">
      <div class="no-results">No results found</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use 'sass:color';

.cvs-page {
  padding-top: $space-lg;

  .page-title-small {
    font-size: $font-size-md;
    font-weight: $font-weight-medium;
    color: $color-text-muted;
    text-transform: uppercase;
    margin-bottom: $space-lg;
  }

  &__controls-and-button {
    @include d-flex(space-between, center);
    margin-bottom: $space-4xl;

    .search-input-wrapper {
      position: relative;
      width: 300px;

      .search-input {
        width: 100%;
        padding: $space-md $space-lg $space-md $space-4xl;
        border-radius: $radius-2xl;
        border: $border-outline;
        background-color: $color-primary;
        color: $color-text-primary;
        font-size: $font-size-md;
        box-shadow: none;

        &:focus {
          outline: none;
          border: $border-outline-hover;
        }

        &::placeholder {
          color: $color-text-muted;
        }
      }

      .search-icon {
        position: absolute;
        left: $space-md;
        top: 50%;
        transform: translateY(-50%);
        color: $color-text-primary;
      }
    }

    .create-button {
      @include d-flex(center, center);
      gap: $space-xs;
      background-color: transparent;
      color: $color-secondary;
      text-transform: uppercase;
      font-size: $font-size-sm;
      font-weight: $font-weight-medium;
      cursor: pointer;
      padding: $space-lg $space-6xl;
      border-radius: $radius-2xl;

      &:hover {
        background-color: rgba(197, 48, 49, 0.1);
      }
    }
  }

  &__table-wrapper {
    padding-bottom: $space-md;
    border-bottom: 1px solid $color-border-subtle;
    margin-bottom: $space-md;

    .cvs-page__table-header {
      @include d-flex(flex-start, center);
      gap: $space-5xl;

      .table-header__item {
        color: $color-text-primary;
        font-size: $font-size-sm;
        font-weight: $font-weight-medium;
        flex: 1;

        &.sortable {
          @include d-flex(flex-start, center);
          gap: $space-2xs;
          color: $color-text-primary;
          cursor: pointer;

          svg {
            color: $color-text-primary;
          }
        }
      }
    }
  }

  &__content {
    @include d-flex(center, center, column);
    height: 60vh;
    width: 100%;

    .no-results {
      text-align: center;
      color: $color-text-primary;
      font-size: $font-size-2xl;
      font-weight: $font-weight-medium;
    }
  }
}
</style>
