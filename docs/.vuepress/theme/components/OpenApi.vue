<template>
  <div class="open-api-vuepress">
    <div v-if="hasSpec" class="download-spec" @click="download">
      Download Spec
    </div>
    <div :class="baseClass"></div>
  </div>
</template>

<script>
import axios from 'axios';
import { saveAs } from 'file-saver';
import 'swagger-ui-dist/swagger-ui.css';

// const typeReferenceRegExpr = /^\s*\$ref:\s*(".*")$/gm;

export default {
  name: 'OpenApi',
  props: {
    page: {
      type: Object,
      required: true,
    },
  },
  computed: {
    hasSpec() {
      return (
        typeof this.finalSpecName === 'string' && this.finalSpecName.length > 0
      );
    },
  },
  watch: {
    page: {
      handler() {
        this.loadSwagger();
      },
    },
  },
  data() {
    return {
      baseClass: 'open-api-container',
      finalSpec: null,
      finalSpecName: null,
      commonSchemasContent: null,
      typesReferenced: [],
    };
  },
  async mounted() {
    if (swaggerPagePaths?.includes(this.page.path)) {
      await this.loadCommonSchemas();
      await this.loadSwagger();
    }
  },

  methods: {
    download() {
      const blob = new Blob([JSON.stringify(this.finalSpec, null, 4)], {
        type: 'text/plain;charset=utf-8',
      });
      saveAs(blob, this.finalSpecName);
    },
    async loadCommonSchemas() {
      // commonSchemas is set in api-docs/docs/.vuepress/theme/client.js
      this.commonSchemasContent = await this.findCommonSchemas(commonSchemas);
    },
    async loadSwagger() {
      const SwaggerUI = (await import('swagger-ui-dist')).SwaggerUIBundle;

      const composedNameSpec = `${this.convertPagePathToSpecFilename()}.json`;
      try {
        const { data } = await axios.get(this.fileUrl(composedNameSpec));
        const spec = data;
        this.finalSpec = this.mixCommonSchemas(spec, this.commonSchemasContent);
        this.finalSpecName = `${this.convertPagePathToSpecFilename()}.json`;
        SwaggerUI({
          spec,
          domNode: this.$el.querySelector(`.${this.baseClass}`),
          persistAuthorization: true,
          deepLinking: true,
          docExpansion: 'none',
          showCommonExtensions: true,
        });
      } catch (err) {
        this.$el.querySelector(`.${this.baseClass}`).innerHTML = '';
        this.finalSpec = null;
        this.finalSpecName = null;
        console.warn('Spec file not  found:', this.fileUrl(composedNameSpec));
      }
    },
    convertPagePathToSpecFilename() {
      return this.page.path
        .split('/')
        .filter((item) => !!item)
        .pop()
        .replace(/\..*$/, '');
    },
    fileUrl(fileName) {
      return `${location.origin}${this.$site.base}specs/${fileName}`;
    },
    async findCommonSchemas(schemas) {
      try {
        const commonSchemasContent = await Promise.all(
          schemas.map((file) => axios.get(this.fileUrl(file)))
        );
        return commonSchemasContent.reduce(
          (obj, next) => ({ ...obj, ...(next.data || {}) }),
          {}
        );
      } catch (err) {
        console.warn(err);
      }
    },
    mixCommonSchemas(spec, schemas) {
      spec.components ??= {};
      if (!spec.components.schemas) {
        spec.components.schemas = {};
      }
      const typesToLoad = this.typesReferenced.filter(
        (typeName) => !spec.components.schemas[typeName]
      );
      typesToLoad
        .map((typeName) => ({ typeName, schema: schemas[typeName] }))
        .filter(({ schema }) => schema !== undefined)
        .forEach(({ typeName, schema }) => {
          spec.components.schemas[typeName] = schema;
        });
      return spec;
    },
  },
};
</script>

<style scope>
.open-api-vuepress {
  padding: 1rem 0;
  background: #fff;
}

.open-api-vuepress .swagger-ui .info .title {
  padding-right: 120px;
}

.open-api-container pre {
  background-color: rgb(125, 132, 146);
}

.download-spec {
  position: absolute;
  right: 20px;
  font-weight: 500;
  display: inline-block;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  vertical-align: middle;
  max-width: 100px;
  padding: 5px;
  text-align: center;
}

.download-spec:hover {
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.6);
}

.download-spec:active {
  color: red;
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.6);
}
</style>
