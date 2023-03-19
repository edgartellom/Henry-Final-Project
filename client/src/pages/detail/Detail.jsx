import { NavLink } from "react-router-dom";
import { Footer, Navbar } from "../../components";

const Detail = () => {
    return (<>
        <Navbar></Navbar>
        <main className="container">
            <div className="row">
                <div className="col">
                    <div className="images">
                        <img className="img-fluid" src="https://i0.wp.com/store.teslards.pe/wp-content/uploads/2023/03/r19vi1qiqo3trbcu_setting_xxx_0_90_end_800.png" />
                    </div>
                </div>
                <div className="col">
                    <hgroup>
                        <h3>Model : MONITOR ASUS VG27VH1B 27″ VA FHD</h3>
                        <h4>SKU: 453532121565</h4>
                    </hgroup>
                    <div className="rate">
                        <i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>
                    </div>
                    <p>desc: Monitor Gamer Curvo TUF Gaming VG27VH1B – 27 pulgadas Full HD (1920×1080), 165Hz (por encima de 144Hz), Extreme Low Motion Blur™, Adaptive-sync, FreeSync™ Premium, 1 ms (MPRT) </p>
                    <details>
                        <summary>Details</summary>
                        <ul>
                            <li>Monitor gamer de 27 pulgadas Full HD (1920×1080) 1500R con frecuencia de actualización ultrarrápida de 165Hz diseñada para jugadores profesionales y un juego inmersivo</li>
                            <li>La tecnología ASUS Extreme Low Motion Blur (ELMB™) permite un tiempo de respuesta de 1ms (MPRT) junto con sincronización adaptativa, eliminando el efecto fantasma y el desgarro para imágenes nítidas de juegos con altas velocidades de cuadros.</li>
                            <li>Tecnología FreeSync™ Premium para eliminar el desgarro de la pantalla y las velocidades de fotogramas entrecortadas.</li>
                        </ul>
                    </details>
                    <hgroup>
                        <h5>Categories</h5>
                        <h6>desktop monitores Asus Gaminig</h6>
                    </hgroup>
                    <p>Price: <strong>S/ 782.00</strong></p>
                    <div className="actions">
                    <div className="btn-inline">
                        <NavLink to="/detail" role="button" className="primary" data-tooltip="Add to Cart"><i className="bi bi-cart-plus"></i></NavLink>
                        <NavLink to="/detail" role="button" className="secondary" data-tooltip="Add to favorites"><i className="bi bi-heart"></i></NavLink>
                    </div>
                </div>
                </div>
                
            </div>

        </main>
        <Footer></Footer>
    </>)
}


export default Detail;