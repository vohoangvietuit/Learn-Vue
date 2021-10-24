import database from '../firebase'
import { ref, get, set, push, update, remove, child } from 'firebase/database'

const productsRef = ref(database, '/products')

class ProductDataService {
  productDb () {
    return productsRef
  }

  getAll () {
    return get(productsRef)
  }

  create (product) {
    return set(push(productsRef), product)
  }

  update (key, value) {
    return update(child(productsRef, key), value)
  }

  delete (key) {
    return remove(child(productsRef, key))
  }

  // deleteAll() {
  //   return db.remove();
  // }
}

export default new ProductDataService()
