import {Component} from 'react'
import Cookies from 'js-cookie' // step 8 (iv)

import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    // step 8(i) initially it should be empty,after authenticated , want we make api and get the products list from api then will be  update this empty state
    productsList: [], // An API call has to be triggered and state should be updated to render the products
  }

  componentDidMount() {
    this.getProducts() // step 8 (ii) we always call api under componentDidMount
  }

  getProducts = async () => {
    // step 8 (iii)
    const apiUrl = 'https://apis.ccbp.in/products' //  step 8 (v) before this user should be authenticated to pass this APIs,calling apis
    // step 8 ,Both Prime and nonPrime users, who are authenticated can access Get Products API there for How to check whether the users authenticated or not
    const jwtToken = Cookies.get('jwt_token') // step 8(vi) ,by this we will get jwtToken,The client must send JWT token in the Authorization header while making APIs request
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`, // step 8(vii) from cookies we get jwtToken
        // ones the user is authenticated we store the jwtToken in the cookies ,so we are accessing the
        // the jwtToken from there and added into the headers.
      },
      method: 'GET', // Note : - The client must be send JWT token in the Authorization header when making request protected resources.
    }
    const response = await fetch(apiUrl, options) // step 9 ,calling APIs,fetch
    if (response.ok === true) {
      // step 10
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        // step 10 (i),here the products key contains the list of products
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        // step 11 , updating the products
        productsList: updatedData,
      })
    }
  }

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
