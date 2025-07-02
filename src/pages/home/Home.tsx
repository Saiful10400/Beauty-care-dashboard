import { useEffect } from "react";
import { useNavigate } from "react-router";




const Home = () => {
    const move = useNavigate()


    useEffect(() => {
        move("/order")
    }, [move])

    return <div></div>

};

export default Home;