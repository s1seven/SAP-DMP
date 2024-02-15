<template>
  <main
    class="home"
    :aria-labelledby="data.heroText !== null ? 'main-title' : null"
  >
    <header>
      <div class="hero-image-container">
        <img
          v-if="data.heroImage"
          :src="$withBase(data.heroImage)"
          :alt="data.heroAlt || 'S1SEVEN Docs'"
        />
      </div>

      <h2 v-if="data.title !== null" class="title">
        {{ data.title }}
      </h2>

      <p v-if="data.description !== null">
        {{
          data.tagline ||
          data.description ||
          'Explore our guides and examples to integrate our platform.'
        }}
      </p>
    </header>

    <div v-if="data.features && data.features.length" class="quicklinks">
      <a
        v-for="(feature, index) in data.features"
        :key="index"
        class="item-link"
        :href="feature.link"
        :target="feature.target || '_self'"
        >{{ feature.text }}</a
      >
    </div>

    <Content class="theme-default-content custom" />
  </main>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    data() {
      return this.$page.frontmatter;
    },
  },
};
</script>

<style lang="scss">
@media all and (max-width: 600px) {
  .home .quicklinks {
    grid-template-columns: 1fr !important;
  }
}
.home {
  margin: 0px auto;
  display: block;

  .hero-image-container {
    text-align: center;
    padding-top: 2rem;
    img {
      width: 320px;
      max-width: 100%;
    }
  }

  .quicklinks {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr 1fr;

    a {
      list-style: none;
      padding: 1.5rem 1rem;
      background: var(--c-bg-lighter);
      border-radius: 0.25rem;
      color: var(--c-text);

      &:hover {
        background: var(--c-bg-light);
      }
    }
  }
}
</style>
