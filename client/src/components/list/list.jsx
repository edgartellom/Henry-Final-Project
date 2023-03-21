import { NavLink } from "react-router-dom";

const List = () => {
  return (
    <>
      <main className="container-fluid">
        <div className="grid">
          <section>
            <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4">
              <div className="col">
                <div className="item-list">
                  <NavLink to="/detail" role="link">
                    <img
                      className="img-fluid"
                      src="https://i0.wp.com/store.teslards.pe/wp-content/uploads/2023/03/r19vi1qiqo3trbcu_setting_xxx_0_90_end_800.png"
                    />
                    <sup>
                      <small>
                        MONITOR ASUS VG27VH1B 27″ VA FHD 165HZ 1MS CURVO
                        FREESYNC ADAPTIVESYNC
                      </small>
                    </sup>
                    <p className="center">
                      <small>
                        <i className="bi bi-star"></i>
                        <i className="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                      </small>
                    </p>
                    <p className="center">S/ 780.00</p>
                  </NavLink>

                  <div className="center footer-item">
                    <NavLink
                      to="/detail"
                      role="button"
                      className="primary"
                      data-tooltip="Add to Cart">
                      <i className="bi bi-cart-plus"></i>
                    </NavLink>
                    <NavLink
                      to="/detail"
                      role="button"
                      className="secondary"
                      data-tooltip="Details">
                      <i className="bi bi-card-list"></i>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="item-list">
                  <NavLink to="/detail" role="link">
                    <img
                      className="img-fluid"
                      src="https://i0.wp.com/store.teslards.pe/wp-content/uploads/2023/03/r19vi1qiqo3trbcu_setting_xxx_0_90_end_800.png"
                    />
                    <sup>
                      <small>
                        MONITOR ASUS VG27VH1B 27″ VA FHD 165HZ 1MS CURVO
                        FREESYNC ADAPTIVESYNC
                      </small>
                    </sup>
                    <p className="center">
                      <small>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                      </small>
                    </p>
                    <p className="center">S/ 780.00</p>
                  </NavLink>

                  <div className="center footer-item">
                    <NavLink
                      to="/detail"
                      role="button"
                      className="primary"
                      data-tooltip="Add to Cart">
                      <i className="bi bi-cart-plus"></i>
                    </NavLink>
                    <NavLink
                      to="/detail"
                      role="button"
                      className="secondary"
                      data-tooltip="Details">
                      <i className="bi bi-card-list"></i>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="item-list">
                  <NavLink to="/detail" role="link">
                    <img
                      className="img-fluid"
                      src="https://i0.wp.com/store.teslards.pe/wp-content/uploads/2023/03/r19vi1qiqo3trbcu_setting_xxx_0_90_end_800.png"
                    />
                    <sup>
                      <small>
                        MONITOR ASUS VG27VH1B 27″ VA FHD 165HZ 1MS CURVO
                        FREESYNC ADAPTIVESYNC
                      </small>
                    </sup>
                    <p className="center">
                      <small>
                        <i className="bi bi-star"></i>
                        <i className="bi bi-star"></i>
                        <i className="bi bi-star"></i>
                        <i className="bi bi-star"></i>
                      </small>
                    </p>
                    <p className="center">S/ 780.00</p>
                  </NavLink>

                  <div className="center footer-item">
                    <NavLink
                      to="/detail"
                      role="button"
                      className="primary"
                      data-tooltip="Add to Cart">
                      <i className="bi bi-cart-plus"></i>
                    </NavLink>
                    <NavLink
                      to="/detail"
                      role="button"
                      className="secondary"
                      data-tooltip="Details">
                      <i className="bi bi-card-list"></i>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <aside>
            <h3 className="center">
              <small>Filters</small>
            </h3>
            <ul>
              <li>Brands</li>
              <li>
                <input type="checkbox" />
                Samsung
              </li>
              <li>
                <input type="checkbox" />
                Kingston
              </li>
              <li>
                <input type="checkbox" />
                Toshiba
              </li>
              <li>Rango de precio</li>
            </ul>
          </aside>
        </div>
      </main>
    </>
  );
};

export default List;
