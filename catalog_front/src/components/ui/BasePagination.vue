<template>
  <div class="pagination-container d-flex justify-content-center my-3">
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="isPreviousBtnUsable">
          <button class="page-link" @click="searchPlant(previousPageQuery)">Previous</button></li>
        <li
          class="page-item"
          v-if="paginationData.currentPage !== 1"
        ><button class="page-link" @click="searchPlant(firstPageQuery)">1</button>
        </li>

        <li
          class="page-item"
          v-if="paginationData.hasPreviousPage && paginationData.previousPage !== 1"
        ><button class="page-link" @click="searchPlant(previousPageQuery)">{{ paginationData.previousPage }}</button>
        </li>

        <li class="page-item active">
          <button class="page-link">{{ paginationData.currentPage }}</button>
        </li>

        <li
          class="page-item"
          v-if="paginationData.hasNextPage && paginationData.nextPage !== paginationData.lastPage"
        ><button class="page-link" @click="searchPlant(nextPageQuery)">{{ paginationData.nextPage }}</button>
        </li>

        <li
          class="page-item"
          v-if="paginationData.currentPage !== paginationData.lastPage"
        ><button class="page-link" @click="searchPlant(lastPageQuery)">{{ paginationData.lastPage }}</button>
        </li>

        <li class="page-item" :class="isNextBtnUsable">
          <button class="page-link" @click="searchPlant(nextPageQuery)">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('plants', [
      'paginationData',
      'searchQuery'
    ]),
    isPreviousBtnUsable() {
      return this.paginationData.currentPage === 1 ? 'disabled' : '';
    },
    isNextBtnUsable() {
      return this.paginationData.currentPage === this.paginationData.lastPage ? 'disabled' : '';
    },
    previousPageQuery() {
      return `${this.searchQuery}&page=${this.paginationData.previousPage}`;
    },
    nextPageQuery() {
      return `${this.searchQuery}&page=${this.paginationData.nextPage}`;
    },
    firstPageQuery() {
      return `${this.searchQuery}&page=1`;
    },
    lastPageQuery() {
      return `${this.searchQuery}&page=${this.paginationData.lastPage}`;
    }
  },
  methods: {
    async searchPlant(searchQuery) {
      console.log(searchQuery);
      this.hasSearched = false;
      this.isLoading = true;
      if (!searchQuery) return;

      try {
        this.hasSearched = true;
        await this.$store.dispatch('plants/fetchPlants', { searchQuery });
        this.isLoading = false;
        this.hasSearched = true;
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
li button {
  color: #3d008d;
}

.page-item.active
.page-link {
  color: #3d008d!important;
  background: #DFD6EB!important;
  border-color: #3d008d!important;
}

.page-link:hover {
  color: #3d008d!important;
  background: #DFD6EB!important;
}

.page-link:focus {
  z-index: 0;
  color: #3d008d!important;
  background-color: #FFF!important;
  box-shadow: none!important;
}

</style>