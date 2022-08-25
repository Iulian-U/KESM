<template>
  <div v-for="post in posts" :key="post.id" class="post viewBackgroundx bg-slate-200">
    <header class="bg-white py-2 shadow-xl flex justify-center">
      <h1 class="text-2xl font-semibold uppercase md:text-3xl">{{ post.node.title }}</h1>
    </header>
    <div class="bg-slate-200 text-black w-auto h-auto">
      <div class="text-base flex justify-around">
        <div class="px-2 py-2">
          <Markdown :source="post.node.content" />
          <div v-show="attachments.length != 0">
            <h2 class="font-semibold mt-5">Fisiere atasate:</h2>
            <div v-for="file in attachments" :key="file.fileName">
              <a-button type="primary" class="mt-2" @click="downloadFile(file.url)">
                <template #icon>
                  <icon-download />
                </template>
                <!-- Use the default slot to avoid extra spaces -->
                <template #default>{{ file.fileName }}</template>
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { ref } from "@vue/reactivity";
import { IconSort, IconFilter } from "@arco-design/web-vue/es/icon";
import Markdown from "vue3-markdown-it";

export default {
  components: {
    IconSort,
    IconFilter,
    Markdown,
  },

  data() {
    return {
      posts: "",
      attachments: "",
    };
  },

  methods: {
    //function to download file directly
    downloadFile(url) {
      window.open(url);
    },
  },

  // vue apollo query
  apollo: {
    postsConnection: {
      query: gql`
        query MyQuery($slug: String) {
          postsConnection(where: { slug: $slug }) {
            edges {
              node {
                id
                title
                updatedAt
                content
                featuredImage {
                  url
                }

                categories {
                  name
                }
                author {
                  name
                  photo {
                    url
                  }
                }
                attachments {
                  url
                  fileName
                }
              }
            }
          }
        }
      `,
      variables() {
        return {
          slug: this.$route.params.slug,
        };
      },
      update(data) {
        this.posts = data.postsConnection.edges;
        this.attachments = data.postsConnection.edges[0].node.attachments;
      },
    },
  },
};
</script>

<style scoped>
.viewBackgroundx {
  height: 100%;

  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}
.fof {
  display: table-cell;
  vertical-align: middle;
}

.fof h1 {
  font-size: 50px;
  display: inline-block;
  padding-right: 12px;
  animation: type 0.5s alternate infinite;
}

@keyframes type {
  from {
    box-shadow: inset -3px 0px 0px rgb(199 210 254);
  }
  to {
    box-shadow: inset -3px 0px 0px transparent;
  }
}
</style>
