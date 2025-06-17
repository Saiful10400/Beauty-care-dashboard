import { useGetBrandsQuery } from "../../redux/api";


const Home = () => {
    const {data}=useGetBrandsQuery({ offset: 0, limit: 10 });
    console.log(data);
    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to the home page!</p>
            <p>This is a simple React application demonstrating routing.</p>
        </div>
    );
};

export default Home;