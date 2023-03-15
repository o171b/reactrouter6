# First Pages

1. We import react router in app.js
```js
import {BrowserRouter, Routes, Route} from 'react-router-dom'
```
===============================================================

2. Wrapping return statement of App component inside <BrowserRouter> jsx element
```js
function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<div>home page</div>} />
    <Route path="about" element={<div>
      <h2>About</h2>
    </div>} />
  </Routes>
  </BrowserRouter>;
}
```
2. 
a. then we wrap our Routes inside Routes jsx element
b. for each <Route /> we provide two props, path and element, the element can be a div,h1 or a Component or whatever we want to render we pass it to element prop.

===============================================================

3. Linking Components
- lets say we have a Home component, that is the Homepage of our website, and we want to link the about component in our Home component, so that is done first by
--Home.js--
```js
import { Link } from 'react-router-dom'
```
then inside of our return statement
```js
const Home = () => {
  return (
    <section className='section'>
      <h2>Home Page</h2>
      <Link to="/about" className='btn'>About</Link>
    </section>
  );
};
//we link our Homepage to the about page
//Now we can go from page to page without full page refresh
```

===============================================================

4. Error Page
- what if by mistake you type a wrong url name, suppose instead of /about you type /abut ?
we have to setup an error for page for such scenarios.
below is the syntax in our Error component
```js
<Route path="*" element={<Error />} />
```

===============================================================

5. Nested Routes
```js
return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} > //instead of self closing /> we add >
    <Route path="about" element={<About />} />
    <Route path="products" element={<Products />} />
    <Route path="*" element={<Error />} />
    </Route> //and we nest all our route components below Home component hence we add </Route> self closing tag which is a jsx element at the end of the children routes.
    
  </Routes>
  </BrowserRouter>;
```

===============================================================

6. Shared Layout

- a. Now that in App.js we have nicely nested the Routes, for the parent we have the Home and inside of the Home we have
the outlet and there we display about, products aswell as the error page.
- b. Now the problem is for example if we display anything in Home which is the parent component, it will be shared all across the child components, for our example in products and about.
b1. So we go to our Home component or parent and import {Outlet} component and we need to display this <Outlet /> in our return statement, and whatever we setup around this outlet component is going to be the shared layout across the pages that are nested inside of the parent Home and the actual page content will be displayed in <Outlet />
b2. So we'll go to Home.js and import {Outlet} component
```js
import {Outlet} from 'react-router-dom'
const Home = () => {
  return (
    <section className='section>
    <h2> Home Page </h2>
    <Outlet />
      </section>
  );
};
export default Home;
```
b3. at this point of the code the <h2>Home Page </h2> is shared across child components of the parent Home.
b4. So now we'll put 2 and 2 together, if <h2>Home Page </h2> is shared all across the nested or child pages, why dont we setup the Navbar and add some links and as a result we'll be able to navigate.
b5. And inorder to set that up, we'll have to create a new component Navbar.js in the components folder. and we wanna import {Link} from react-router-dom, so we'll create the Navbar.js then we'll import it in Home.js and in Home.js if you decide to put up a footer you can do that under </section> .
b6. so in the src we'll first create components folder then inside it we'll create Navbar.js and import Link component from react-router-dom, we've already done the styling hence the className and we wanna link the Home,About and products inside the navbar.
```js
//Navbar.js
import { Link } from 'react-router-dom'
const Navbar = () => {
  return(
    <nav className='navbar'>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      <Link to='/products'>Products</Link>
    </nav>
  )
}
export default Navbar
```
b7. Then we'll navigate to Home.js and import that Navbar and i will not leave Home.js as it is, instead i will use react fragments <> </>, since we need to return an element, then i will put the <Navbar/> at the top then i will remove <h2>HomePage</h2> and with the below code the Navbar will be displayed with Home About Products and in the section i will have the <Outlet/> and as a result no only we display the contents of the About page or the Products page but we also have the Navbar so if you wanna add a footer go ahead, most likely you wanna do that beneath the </section>
```js
import { Link, Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar'
const Home = () => {
  return(
    <>
    <Navbar />
    <section className='section'>
    <Outlet />
    </ section>
    </>
  )
}
export default Home
```

===============================================================

7. Index pages

- if we have this nested Routes for the main one '/' , so for the parent we can setup this index route and it has a special syntax <Route index element={<Home />} />, we pass the prop by the name of index and this will always match with whatever we have in the parent route '/'
1. a. Now let us setup index page, because when we click on Home nothing displays as the content in the Home component is missing. Thats because in Home.js we dont have any content we just have the Navbar check the below code.
```js
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
    <Navbar/>
    <h3>Home</h3> //if we setup a h3 page and display Home, it will be displayed across the child components we dont want that.
    <section className='section'>
      <Outlet />
    </section>
    </>
  );
};
export default Home;

```
1. b. the solution is to setup index route, so we go to pages and create SharedLayout.js and grab the Home.js code and paste it in SharedLayout.js
```js
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
    <Navbar/>
    <section className='section'>
      <Outlet />
    </section>
    </>
  );
};
export default Home;
```
we remove the <section></section> as we dont need it
```js
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
    <Navbar/>
      <Outlet />
    </>
  );
};
export default Home;
```
1. c. once we have this in place, lets navigate to App.js
and instead of
```js
<Route path="/" element={<Home />} >
```
we set up shared layout
```js
<Route path="/" element={<SharedLayout />} >
```
1. d. and Now we want to work on that index page, so if we wanna setup a page that matches the parent which now is <SharedLayout /> we go with
```js
<Route index element={<Home />}/>
```
1. c. then we wanna navigate to Home.js i will remove the {Link,Outlet} and {Navbar} from imports, then we have to comeup with whatever we wanna render, so i will go with an <h2>home page</h2>
```js
const Home = () => {
  return (

    <section className='section'>
      <h2>Homepage</h2>
    </section>
  );
};
export default Home;
```
1. d. so i purposely did this the long way to showcase how we get to that shared layout and what issues we get along the way so we did a lil bit of refactoring. so now we have our Home page which displays home , products with display products and about which displays about.

===============================================================

8. NavLink Component

1. effectively it is when we click on a link or when we enter a particular like, lets say about, it should change its color indicating its active or we're inside of that link.
2. a. to do that we'll create a new file in components folder called StyledNavbar.js
b. and instead of <Link></Link> we'll grab <NavLink></NavLink>
c. whats special about <NavLink></NavLink> is that in style={} we can pass in a function where there is a property by the name of {({isActive})} , this is provided out of the box by React Router, and based on that property we can setup some type of style such as 
```js
style={({ isActive })} => {
  return {color: isActive ? 'red' : 'grey'}
}
```
this is inline styling , you can even give a className and style it in css
d. We move to SharedLayout.js and import StyledNavbar
and instead of typical <Navbar/> we will embed <StyledNavbar/> and once we save we right away notice that our active link is displayed, when we click on any of the link its color turns to red.
That's because by default when we use <NavLink></NavLink> React adds a class="active"
e. this is the css code that we added for the style of our links
``` js
//styledNavbar.js
import {NavLink} from 'react-router-dom'

const Navbar = () => {
    return(
        <nav className='navbar'>
            <NavLink to='/'
            className={({isActive})=>{
                return(
              isActive ? 'link active' : 'link'  
                )
            }}
            >
              Home</NavLink>
            <NavLink to='/about'
            className={({isActive})=>{
                return(
              isActive ? 'link active' : 'link'  
                )
            }}
            >
              About</NavLink>
            <NavLink to='/products'
            className={({isActive})=>{
                return(
              isActive ? 'link active' : 'link'  
                )
            }}
            >Products</NavLink>
            <NavLink to='/login'
            className={({isActive})=>{
                return(
              isActive ? 'link active' : 'link'  
                )
            }}
            >Login</NavLink>
        </nav>
    )
}

export default Navbar;

```

===============================================================

9. Url params

1. a. Imagine a products page, that displays a bunch of products and when we click on one specific product we display it in a seperate page, However i dont wanna setup a seperate page for every product that i have, it makes more sense for me to setup one page :productID which is going to act as a placeholder and i just need the data that i need to display. So that way i can use the same page for thousands of products.
1. b. And inorder to setup URL Params we wanna go with this colon :productId and whatever the parameter name, you can name it :shakenbake or whatever you want but since we're displaying products we'll name it :productId
1. c. First let navigate to App.js and get that SingleProduct, if we take a look at the pages there is already a SingleProduct.js, so we'll set this up on App.js <Route path='products/:productId' element={<SingleProduct />} /> and the placeholder will be <SingleProduct />
``` js
function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<SharedLayout />} >
      <Route index element = {<Home />} />
      <Route path="about" element={<About />} />
      <Route path="products" element={<Products />} />
      <Route path='products/:productId' element={<SingleProduct />} />
      <Route path="*" element={<Error />} />
    </Route>
    
  </Routes>
  </BrowserRouter>;
}
```

1. d. now if we go to url click on products and then in the url type products/222 it will not show an error, as in theory its trying to show the thousands of products that we have in our page that has its own unique id.
1. e. so now the set up is that the parameter name is :productId , If we need to access that parameter we need to get the hook from react-router-dom so we'll fetch {Link, useParams} and then we wanna invoke that hook useParams() and notice this name `productId` needs to match whatever we have in our App.js `:productId` so as long as they match, you'll be good to go.
so this will be the code in SingleProduct.js for the time being
``` js
import { Link, useParams } from 'react-router-dom';
const SingleProduct = () => {
  const {productId} = useParams();
  return(
    <section className='section product'>
    <h4>{productId}</h4>
    <Link to='/products'>back to products</Link>
    </section>
  );
};
export default SingleProduct
```
1f. now when we navigate to the products page and in the url after the products type /iphone14, /galaxys23 it will display it in the products page.


===============================================================

10. single product

1. a. Once we have the SingleProduct page in place , now in the Products.js lets iterate over the products that are coming from the data.js, and for every item i wanna return an article, we'll have to use the key since ofcourse this is react and i wanna access product.name aswell as product.id which i will pass it to the <Link></Link> and once we set this up 
``` js
import { Link } from 'react-router-dom'
import products from '../data'

const Products = () => {
  return (
    
      <section className='section'>
        <div className='products'>
          {products.map((product)=>{
            return <article key={product.id}>
              <h5>{product.name}</h5>
              <Link to={`/products/${product.id}`}> more info
                </Link>
            </article>
          })}

        </div>
      </section>
    
  );
};

export default Products;
```
1. b. in the SingleProduct.js we will use that id {productId} and instead of rendering it on screen eg:iphone,galaxy like we have right now , we basically will pull out one specific product then w'll get the image and name const{image,name}=product. and then we'll display it 
return(
  <img src={img} alt={name}>
  <h5>{name}</h5>
)
normally we get this data from an api or database but in our case we've prepared this data.js and we'll fetch the products from there.

this is how the code looks in SingleProduct.js

``` js
import {Link, useParams} from 'react-router-dom'
import products from '../data';

const SingleProduct = () => {
  const {productId} = useParams()
  const product = products.find((product)=>
  product.id === productId);
  const {image, name} = product;
  //console.log(useParams())
  return (
    <section className='section product'>
      <img src={image} alt={name} />
      <h5>{name}</h5>
      <Link to='/products'>back to products</Link>
    </section>
  );
};

export default SingleProduct;
```
now the product name and image will be rendered in product page, and we can now render thousands of products from an api or database.

===============================================================

11. useNavigate()

1. a. Now lets see how we can navigate around our project programmatically, in our case thats gonna be once we submit the form , and also lets see how we can restrict access to certain routes.
1. b. we wanna start in the App.js where we wanna setup const[user, setUser] = UseState(null) the initial value is null
1. c. then we wanna import two more pages, we wanna import login and dashboard, in the login one we wanna pass in the function setUser={setUser} and in the dashboard we wanna pass the actual user.
1. d. so lets start in the app.js and import {useState} and setup the state values const[user,setUser] = useState(null)
1. e. then right after that SingleProduct we will add the Routes for login and Dashboard.
these are the lines that we'll add to App.js

``` js
import useState from 'react'
import Dashboard from "./"
import Login from "./"

const [user,setUser] = useState(null)
<Route path='login'  element={<Login setUser={setUser}></Login>} />
<Route path='dashboard'  element={<Dashboard user={user}></Dashboard>} />
```

1. f. Then lets navigate to StyledNavbar.js and add a link for login
```js
<NavLink
to='/login'
className={({isActive}) => (isActive ? 'link active' : 'link')}>Login
</NavLink>
```

1. g. Then we'll navigate to Login.js
and we'll grab useNavigate import ```js {useNavigate} = from 'react-router-dom' ```
1. h. then above handleSubmit we'll add

``` js
const navigate = useNavigate()
```
then we'll go with if conditional

```js
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!name || !email) return; //then we wanna return
  setUser({name:name, email:email}) //if both are provided
  navigate('/dashboard') //after loggin in we'll navigate to dashboard
}
```
but before that make sure to put setUser in const Login

```js
const Login = ({setUser}) =>
```
now if we provide just the email it will not do anything, but if we provide email and name we will be taken to dashboard

1. i. in the Dashboard.js we wanna just grab the {user} and there is gonna be optional chaining to display the name
<h4> Hello, {user?.name} </h4>

```js
const Dashboard = ({user}) => {
  return (
    <section className='section'>
      <h4>Hello, {user?.name}</h4>
    </section>
  );
};
export default Dashboard;
```
===============================================================

12. Protected Route
1. a. Now lets see how we can restrict access to certain route.
1. b. first in pages we need to create a component and lets name it ProtectedRoute.js
1. c. then in the app.js we wanna wrap whatever page you wanna restrict access to in that protected route, in our case that is the Dashboard
``` js
<Route path='dashboard' element={
      <ProtectedRoute user={user}>
        <Dashboard user={user}/>
      </ProtectedRoute>
      }
      />

      <Route path="*" element={<Error />} />
    </Route>
    
  </Routes>
  </BrowserRouter>;
}
//so if the user exists only then we will display the dashboard
```
1. d. upnext we will set up the functionality where in the ProtectedRoute.js we wanna import {Navigate} component from react-router-dom and we wanna access two things {children,user}, so children is going to be that dashboard page or whatever we place in that ProtectedRoute and also a user and then we'll check if the !user doesnt exist we'll use Navigate component and we will say where we wanna navigate, in our code example its the home '/' , if everything is correct we'll return children thats the dashboard page which says Hi username, Hi peter etc etc.
```js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children, user}) => {
    if(!user){
        return <Navigate to='/' />;
    }
    return children;
};

export default ProtectedRoute
```
- with this in place if we refresh the page, it will take us to homepage, and if we try to access the dashboard using /dashboard we'll be restricted access as we havent logged in.

===============================================================

13. Refactor

1. a. at the very end, i wanna setup the products and the product.id as a nested route, just as we did it with Home we will do it with products.
1. b. in pages folder, we'll create a new component called SharedProductLayout.js
``` js
import { Outlet } from "react-router-dom";
const Home = () => {
    return(
        <>
        <h2>products</h2>
        <Outlet />
        </>
    );
};

export default Home;
```

1. c. then lets go back to our app.js , we wanna grab SharedProductLayout so we'll import it. and set up the entire logic.
``` js
<Route path='products' element={<SharedProductLayout/>}>
      <Route index element={<Products />} />
      <Route path=':productId' element={<SingleProduct />} />
    </Route>
```