<template>
  <div class="custom-layout">
    <ParentLayout>
      <template v-slot:page-bottom>
        <component v-if="dynamicComponent" :is="dynamicComponent" :page="page"> </component>
      </template>
    </ParentLayout>
    <Footer />
  </div>
</template>

<script>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue';
import { markRaw } from 'vue';
import Footer from '../../components/Footer.vue';

export default {
  components: {
    ParentLayout,
    Footer,
  },

  data() {
    return {
      dynamicComponent: null,
    };
  },

  computed: {
    page() {
      // this.$page is a proxy object, this creates a new object with the same properties
      return Object.assign({}, this.$page);
    },
  },

};
</script>
