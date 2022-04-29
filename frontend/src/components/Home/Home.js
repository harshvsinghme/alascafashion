import "./Home.css";
import MetaData from "../../utils/MetaData";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Product/ProductCard/ProductCard";
import { useEffect } from "react";
import { getProducts } from "../../actions/product";
import { getSubCats } from "../../actions/catandsubcat";
import { subcatImgs } from "../../utils/hardcoded";
import Loading from "../Design/Loading/Loading";
const Home = () => {
  const dispatch = useDispatch();
  const { loading, productsData } = useSelector((state) => state.product);
  const { subcats } = useSelector((state) => state.catandsubcat);
  useEffect(() => {
    dispatch(getProducts("sortBy=latest"));
    dispatch(getSubCats(""));
    // console.log(productsData, subcats);
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading show={true} />
      ) : (
        <MetaData title="India's Leading Fashion Store | Alasca Fashion" />
      )}
      <div>
        <div className="homeHeight"></div>
        <div className="homeTileDivDesk">
          <p className="homeTileText">Curated Exclusively For you</p>
          <p className="homeTileBtnPara">
            <Link to="/products?sortBy=latest" className="homeTileLink">
              View Catalogue
            </Link>
          </p>
        </div>
        <div className="homeTileDivPhon">
          <p className="homeTileText">Curated Exclusively For you</p>
          <p className="homeTileBtnPara">
            <Link to="/products?sortBy=latest" className="homeTileLink">
              View Catalogue
            </Link>
          </p>
        </div>
        <div className="homeTileDivTabl">
          <p className="homeTileText">Curated Exclusively For you</p>
          <p className="homeTileBtnPara">
            <Link to="/products?sortBy=latest" className="homeTileLink">
              View Catalogue
            </Link>
          </p>
        </div>
        <div>
          <p className="homeLastestTrends">LATEST TRENDS</p>
          <p className="homeNewLaunches">
            New launches every day, styles that promise to capture your heart
          </p>
        </div>
        <div className="dFlexWrap justfyeven">
          {productsData &&
            productsData.products.map((each, idx) => (
              <ProductCard key={idx} data={each} />
            ))}
        </div>
        {subcats && (
          <>
            <div>
              <p className="homeCatalogue">CATALOGUE</p>
              <p className="homeExplore">
                Explore ours catalogue to get your outfit that flatters your
                body{" "}
              </p>
            </div>
            <div className="dFlexWrap justfyeven">
              {subcats.map((each, idx) => (
                <Link
                  to={`/products?subcategory=${each._id}`}
                  key={idx}
                  className="homeSubcatLink"
                >
                  <img src={subcatImgs(each._id)} alt={each.label} />
                  <p className="homeSubcatLabel">{each.label}</p>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
