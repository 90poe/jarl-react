# Dynamic Routing

Now we've seen how to set up some static URLs, let's look at something a bit more advanced. Routing isn't much use if we have to define every single URL statically!

JARL uses the [`url-pattern`](https://github.com/snd/url-pattern) package to match URLs. This uses a colon to denote dynamic path segments. We can now create a route as follows to display a product with a specific id:

routes.js:

```js
import { RouteMap } from "jarl-react";

const routes = new RouteMap([
    {
        path: "/",
        state: { page: "home" }
    },
    {
        path: "/products/:productId",
        state: { page: "product" }
    }
]);

export default routes;
```

This dynamic value will be merged into the resulting state object when navigating to a matching URL. We can therefore implement a ProductPage component like so:

```jsx
import { routing } from "jarl-react";

class ProductPage extends Component {
    componentDidMount() {
        fetch(`/api/products/${this.props.productId}`)
            .then(result => result.json())
            .then(product => this.setState({ product }));
    }
    render() {
        return this.state.product ? (
            <ProductView product={this.state.product} />
        ) : (
            "Loading..."
        );
    }
}

// Using the routing higher-order component to inject the
// location state as props into the component.
export default routing()(ProductPage);
```

Here we start to encounter one of the bigger problems that JARL aims to tackle. This route has a "data dependency": this will be dealt with in the next part.

Next: 03. Data Dependencies