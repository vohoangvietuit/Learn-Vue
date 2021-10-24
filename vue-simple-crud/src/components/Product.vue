<template>
  <div v-if="currentProduct" class="edit-form">
    <h4>Product</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentProduct.title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentProduct.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentProduct.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      class="btn btn-primary mr-2"
      v-if="currentProduct.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="btn btn-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="btn btn-danger mr-2" @click="deleteProduct">
      Delete
    </button>

    <button type="submit" class="btn btn-success" @click="updateProduct">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Product to see info...</p>
  </div>
</template>

<script>
import ProductDataService from '../services/ProductDataService'

export default {
  name: 'product',
  props: ['product'],
  data () {
    return {
      currentProduct: null,
      message: ''
    }
  },
  watch: {
    product: function (product) {
      this.currentProduct = { ...product }
      this.message = ''
    }
  },
  methods: {
    updatePublished (status) {
      ProductDataService.update(this.currentProduct.key, {
        published: status
      })
        .then(() => {
          this.currentProduct.published = status
          this.message = 'The status was updated successfully!'
        })
        .catch((e) => {
          console.log(e)
        })
    },

    updateProduct () {
      const data = {
        title: this.currentProduct.title,
        description: this.currentProduct.description
      }

      ProductDataService.update(this.currentProduct.key, data)
        .then(() => {
          this.message = 'The product was updated successfully!'
        })
        .catch((e) => {
          console.log(e)
        })
    },

    deleteProduct () {
      ProductDataService.delete(this.currentProduct.key)
        .then(() => {
          this.$emit('refreshList')
        })
        .catch((e) => {
          console.log(e)
        })
    }
  },
  mounted () {
    this.message = ''
    this.currentProduct = { ...this.product }
  }
}
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
