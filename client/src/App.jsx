import {Navbar, Main,  Metrics, Transactions} from "./components";

const App = () => {
    return (

       <div className="min-h-screen">
            <div className="background-siiu-uce">
                <Navbar />

                <Main />
            </div>
           <Transactions />
           <Metrics />

        </div>
    );
}

export default App;

