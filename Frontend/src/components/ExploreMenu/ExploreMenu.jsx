import React, { useContext } from 'react';
import './ExploreMenu.css';
import { StoreContext } from '../../Context/StoreContext.jsx';
import Loaderfrount from '../MyLottieAnimation/Loaderfrount.jsx';

const ExploreMenu = ({ category, setCategory }) => {
    const { categorylist } = useContext(StoreContext);

    // Show loader while data is loading
    if (!categorylist || categorylist.length === 0) {
        return <div className='loader-category-list'><Loaderfrount className="loader-category-list-loader" /></div>;
    }

    if (!category) {
        setCategory(() => "All");
    }

    // console.log(categorylist);

    return (
        <section className='explore-menu' id='exploremenu'>
            <h1>Explore Menu</h1>
            <p className='explore-menu-text'>Choose From This Menu.</p>
            <div className="explore-menu-list">
                <div className="explore-menu-list-all">
                    <img
                        onClick={() => setCategory("All")}
                        className={category === "All" ? "active" : null}
                        src="/Images/all-foods.jpg"
                        alt="all image"
                     style={{borderRadius: '50%'}}
                    />
                    <p>All</p>
                </div>
                {categorylist.map((item, i) => (
                    <div
                        onClick={() => setCategory(prev => (prev === item.name ? "All" : item.name))}
                        key={i}
                        className='explore-menu-list-item'
                    >
                        <img
                            className={category === item.name ? "active" : ""}
                            src={item.image}
                            alt="items"
                        />
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
            <hr />
        </section>
    );
};

export default ExploreMenu;
