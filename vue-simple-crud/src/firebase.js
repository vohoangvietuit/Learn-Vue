import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyB_FghqNDCMXkHQa8nFmxzDGQW4JDHbK4k',
  authDomain: 'vue-crud-demo-e1943.firebaseapp.com',
  databaseURL: 'https://vue-crud-demo-e1943-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'vue-crud-demo-e1943',
  storageBucket: 'vue-crud-demo-e1943.appspot.com',
  messagingSenderId: '383648793479',
  appId: '1:383648793479:web:68c6abc5b6c7c79434c922'
}

const app = initializeApp(firebaseConfig)

export default getDatabase(app)
