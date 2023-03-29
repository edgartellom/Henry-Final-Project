import { NavLink } from "react-router-dom";
import Card from "../card/Card";

const List = ({ products }) => {
  return (
    <>
      <main className="container-fluid">
        <div className="grid">
          <section>
            <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4">
              {products?.map((p) => (
                <Card
                  id={p.id}
                  feature={p.feature}
                  price={p.price}
                  image={p.image}
                  stock={p.stock}
                  key={p.id}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default List;
