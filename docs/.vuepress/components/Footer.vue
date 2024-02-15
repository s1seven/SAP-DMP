<script setup></script>

<template>
  <footer>
    <strong class="copy">© {{ year }} S1SEVEN GmbH</strong>
    <a
      v-for="(link, index) in data.footerLinks"
      :key="index"
      class="item-link"
      :href="link.link"
      :target="link.target || '_blank'"
      >{{ link.text }}</a
    >
  </footer>
</template>

<style lang="scss" scoped>
@media all and (max-width: 600px) {
  footer {
    flex-direction: column;
  }
}

footer {
  display: flex;
  gap: 1rem;
  margin: 2rem auto;
  max-width: var(--homepage-width);
  padding: var(--navbar-height) 2rem 0;
  justify-content: space-between;

  .copy {
    flex: 1;
  }

  a {
    color: var(--c-text-lighter);
    &:hover {
      color: var(--c-text-light);
    }
  }
}
</style>

<script>
export default {
  name: 'Footer',
  computed: {
    year() {
      return new Date().getFullYear();
    },
    data() {
      return this.$page.frontmatter;
    },
  },
};
</script>
