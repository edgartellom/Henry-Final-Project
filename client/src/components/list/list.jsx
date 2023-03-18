import { NavLink } from "react-router-dom";

const List = () => {
    return (<>
        <main className="container-fluid">
            <div className="grid">
                
                <section>

                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-6">

                        <div className="col">
                            <article className="item-list">

                                <img className="img-fluid" src="https://i0.wp.com/store.teslards.pe/wp-content/uploads/2023/03/r19vi1qiqo3trbcu_setting_xxx_0_90_end_800.png" />

                                <p><small>modelo : unicps cldcd cdcd cdcff</small></p>
                                <button role="button">Add to cart</button>
                                <button to="/detail" role="button">Detalles</button>

                            </article>
                        </div>
                        

                    </div>
                </section>
                <aside>
                    <h3 className="center"><small>Categorias</small></h3>
                </aside>
            </div>
        </main>
    </>)
}

export default List;