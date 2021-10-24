<template>
  <div class="list row">
    <div class="col-md-6">
      <h2 class="mb-4">Products List</h2>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(product, index) in products"
          :key="index"
          @click="setActiveProduct(product, index)"
        >
          {{ product.title }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentProduct">
        <product-details
          :product="currentProduct"
          @refreshList="refreshList"
        />
      </div>
      <div v-else>
        <br />
        <p>Please click on a Product to see info...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProductDataService from '../services/ProductDataService'
import ProductDetails from './Product'
import { onValue, onDisconnect } from 'firebase/database'

export default {
  name: 'products-list',
  components: { ProductDetails },
  data () {
    return {
      products: [],
      currentProduct: null,
      currentIndex: -1
    }
  },
  methods: {
    onDataChange (items) {
      const _products = []

      items.forEach((item) => {
        const key = item.key
        const data = item.val()
        _products.push({
          key: key,
          title: data.title,
          description: data.description,
          published: data.published
        })
      })

      console.log('_products', _products)
      this.products = _products
    },

    refreshList () {
      this.currentProduct = null
      this.currentIndex = -1
    },

    setActiveProduct (product, index) {
      this.currentProduct = product
      this.currentIndex = index
    }
  },
  mounted () {
    onValue(ProductDataService.productDb(), this.onDataChange)
  },
  beforeDestroy () {
    onDisconnect(ProductDataService.productDb())
  }
}
</script>
