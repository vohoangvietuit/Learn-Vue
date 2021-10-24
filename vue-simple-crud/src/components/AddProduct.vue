<template>
  <div class="submit-form">
    <h2 class="mb-4">Add Product</h2>
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="product.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="product.description"
          name="description"
        />
      </div>

      <button @click="saveProduct" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newProduct">Add</button>
    </div>
  </div>
</template>

<script>
import ProductDataService from '../services/ProductDataService'

export default {
  name: 'add-product',
  data () {
    return {
      product: {
        title: '',
        description: '',
        published: false
      },
      submitted: false
    }
  },
  methods: {
    saveProduct () {
      var data = {
        title: this.product.title,
        description: this.product.description,
        published: false
      }

      ProductDataService.create(data)
        .then(() => {
          console.log('Created new item successfully!')
          this.submitted = true
        })
        .catch(e => {
          console.log(e)
        })
    },

    newProduct () {
      this.submitted = false
      this.product = {
        title: '',
        description: '',
        published: false
      }
    }
  }
}
</script>

<style>
  .submit-form {
    width: 50%;
    margin: 0 auto;
  }
</style>
