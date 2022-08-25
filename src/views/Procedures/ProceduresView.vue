<template>
  <!-- Sticky top nav -->
  <div
    class="text-center flex flex-col justify-center items-center my-auto sticky top-0 z-40 h-24 shadow bg-white"
  >
    <h2 class="text-3xl font-semibold my-2 sm:my-0">KANTAR PROCEDURES</h2>

    <!-- Search and Filter options -->
    <div class="flex justify-end w-full">
      <div class="px-2 flex items-center">
        <!-- Search Bar -->
        <a-input
          v-model="search"
          :style="{ width: '220px' }"
          placeholder="Search procedure.."
          allow-clear
          class="mr-2"
        >
          <template #prefix>
            <icon-search />
          </template>
        </a-input>

        <!-- Category filter -->
        <a-dropdown>
          <a-button type="primary" class="py-2">
            <template #icon>
              <icon-filter />
            </template>
            <template #default> Category</template>
          </a-button>
          <template #content>
            <!-- Set all categories -->
            <a-doption @click="setAllCategory">All Categories</a-doption>

            <!-- Set allglobal categories -->
            <a-dsubmenu value="option-1">
              <template #default>All Global</template>
              <template #content>
                <a-doption @click="setAgEscalation">Escalation</a-doption>
                <a-doption @click="setAgHonorarium">Honorarium</a-doption>
                <a-doption @click="setAgOther">Other</a-doption>
                <a-doption @click="setAgSurvey">Survey</a-doption>
                <a-doption @click="setAgValidation">Validation</a-doption>
              </template>
            </a-dsubmenu>

            <!-- Set lifepoints categories -->
            <a-dsubmenu value="option-2">
              <template #default>Lifepoints</template>
              <template #content>
                <a-doption @click="setLpCampaigns">Campaigns</a-doption>
                <a-doption @click="setLpEscalations">Escalations</a-doption>
                <a-doption @click="setLpMembership">Membership</a-doption>
                <a-doption @click="setLpOther">Other</a-doption>
                <a-doption @click="setLpPoints">Points</a-doption>
                <a-doption @click="setLpRewards">Rewards</a-doption>
                <a-doption @click="setLpSpecialSurveys">Special Surveys</a-doption>
                <a-doption @click="setLpSurvey">Survey</a-doption>
              </template>
            </a-dsubmenu>

            <!-- Set other categories -->
            <a-dsubmenu value="option-3">
              <template #default>Other</template>
              <template #content>
                <a-doption @click="setIhut">IHUT</a-doption>
                <a-doption @click="setMePanel">ME Panel</a-doption>
                <a-doption @click="setMobiworkx">Mobiworkx</a-doption>
                <a-doption @click="setSocialMedia">Social Media</a-doption>
              </template>
            </a-dsubmenu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
  <!-- End of sticky top nav -->

  <div class="viewBackgrounds">
    <div class="px-14 mx-auto py-2" v-if="posts.length != 0">
      <!-- Loading component if no procedures are found -->
      <div
        v-if="$apollo.queries.postsConnection.loading"
        class="mt-56 flex justify-center items-center"
      >
        <svg
          role="status"
          class="mr-2 w-8 h-8 text-gray-200 animate-spin fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>

      <!-- Posts container -->
      <div
        class="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        v-else
      >
        <!-- POST CARD  -->

        <div
          class="rounded-lg overflow-hidden bg-white shadow-lg"
          v-for="post in posts"
          :key="post.node.id"
        >
          <img
            class="w-full max-h-60 shadow object-cover"
            :src="post.node.featuredImage.url"
            alt="big ben and sunset"
          />
          <div class="px-4 py-2">
            <!-- POST TITLE -->

            <div class="font-bold text-xl title py-1">{{ post.node.title }}</div>
            <!-- POST EXCERPT -->
            <p class="text-gray-700 text-base excerpt">
              {{ post.node.excerpt }}
            </p>
          </div>

          <!-- POST CATEGORIES -->
          <div class="px-6 py-2">
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              v-for="category in post.node.categories"
              :key="category.name"
            >
              #{{ category.name }}
            </span>
          </div>

          <!-- POST AUTHOR AND DATE -->
          <div class="flex-shrink-0 flex px-6">
            <a-avatar>
              <img alt="avatar" :src="post.node.author.photo.url" />
            </a-avatar>
            <div class="ml-3">
              <span class="text-sm leading-5 font-medium text-gray-900">
                <p>{{ post.node.author.name }}</p>
              </span>
              <div class="flex text-sm leading-5 text-gray-500">
                <time datetime="2020-03-16"
                  >{{
                    new Date(post.node.updatedAt).toLocaleDateString("en-GB", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                </time>
              </div>
            </div>
          </div>

          <!-- READ MORE BTN -->
          <div class="flex justify-center my-4">
            <button
              class="border border-indigo-600 text-indigo-600 font-montserrat py-2 px-8 font-medium rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300"
            >
              <router-link
                :to="{
                  name: 'singleProcedure',
                  params: { slug: post.node.slug },
                }"
              >
                Read More
              </router-link>
            </button>
          </div>
        </div>
        <!-- END OF POST CARD -->
      </div>
    </div>

    <!-- Content Shown if no procedure available -->
    <div class="flex justify-center mt-20" v-else>
      <div class="fof">
        <h1 class="text-indigo-200">No procedure found...</h1>
      </div>
    </div>

    <!-- PAGINATION -->
    <div
      class="flex py-1 justify-center items-center w-full sticky bottom-0 shadow h-auto bg-white"
    >
      <a-button
        type="primary"
        class="disabled:bg-gray-400"
        :disabled="!pageInfo.hasPreviousPage"
        @click="decreaseSkip"
        >Prev</a-button
      >
      <div class="px-2">Current page: {{ currentPage }}</div>
      <a-button
        type="primary"
        class="disabled:bg-gray-400"
        :disabled="!pageInfo.hasNextPage"
        @click="increaseSkip"
        >Next</a-button
      >
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { ref } from "@vue/reactivity";
import { IconSort, IconFilter } from "@arco-design/web-vue/es/icon";

export default {
  components: {
    IconSort,
    IconFilter,
  },

  data() {
    return {
      posts: "",
      search: "",
      newSearch: "",
      category: "",
      currentPage: 1,
      pageInfo: {},
      skip: 0,
    };
  },

  methods: {
    increaseSkip() {
      this.skip = this.skip + 8;
      this.currentPage = this.currentPage + 1;
    },

    decreaseSkip() {
      this.skip = this.skip - 8;
      this.currentPage = this.currentPage - 1;
    },

    // Set All categories
    setAllCategory() {
      this.category = "";
    },

    // Set AG Categories
    setAgEscalation() {
      this.category = "ag_escalation";
    },

    setAgHonorarium() {
      this.category = "ag_honorarium";
    },

    setAgOther() {
      this.category = "ag_other";
    },

    setAgSurvey() {
      this.category = "ag_survey";
    },

    setAgValidation() {
      this.category = "ag_validation";
    },

    // Set LP Categories

    setLpSurvey() {
      this.category = "lp_survey";
    },

    setLpPoints() {
      this.category = "lp_points";
    },

    setLpMembership() {
      this.category = "lp_membership";
    },

    setLpRewards() {
      this.category = "lp_rewards";
    },

    setLpCampaigns() {
      this.category = "lp_campaigns";
    },

    setLpEscalations() {
      this.category = "lp_escalations";
    },

    setLpSpecialSurveys() {
      this.category = "lp_special surveys";
    },

    setLpOther() {
      this.category = "lp_other";
    },

    // Set Other Categories

    setIhut() {
      this.category = "ihut";
    },

    setMobiworkx() {
      this.category = "mobiworkx";
    },

    setMePanel() {
      this.category = "me panel";
    },

    setSocialMedia() {
      this.category = "social media";
    },
  },

  // vue apollo query
  apollo: {
    postsConnection: {
      query: gql`
        query MyQuery($skip: Int, $search: String, $category: String) {
          postsConnection(
            first: 8
            skip: $skip
            orderBy: updatedAt_DESC
            where: { _search: $search, categories_every: { name_contains: $category } }
          ) {
            edges {
              node {
                id
                title
                author {
                  name
                  photo {
                    url
                  }
                }
                categories {
                  name
                }

                createdAt
                updatedAt
                slug
                attachments {
                  url
                }
                excerpt
                featuredImage {
                  url
                }
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              pageSize
            }
          }
        }
      `,
      variables() {
        return {
          skip: this.skip,
          search: this.search,
          category: this.category,
        };
      },
      update(data) {
        this.posts = data.postsConnection.edges;
        this.pageInfo = data.postsConnection.pageInfo;
      },
    },
  },
};
</script>

<style scoped>
.excerpt {
  min-height: 8rem;
}

.title {
  min-height: 3rem;
  text-align: center;
}

.viewBackgrounds {
  height: auto;
  background: rgba(255, 255, 255, 0.116);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}

/* media query */
@media (max-width: 768px) {
  .viewBackgrounds {
    height: auto;
  }
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
